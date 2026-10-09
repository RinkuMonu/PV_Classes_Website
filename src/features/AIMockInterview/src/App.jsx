import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

const TEACHER_QUESTIONS = [
  "Welcome to the interview. Could you start by telling us about your teaching philosophy?",
  "How do you handle a disruptive student in your classroom?",
  "What methods do you use to evaluate and track student progress?",
  "How do you incorporate technology into your lessons to engage students?",
  "Can you describe a time when you successfully collaborated with other teachers or parents?"
];

const InterviewState = {
  IDLE: "idle",
  AI_SPEAKING: "ai_speaking",
  LISTENING: "listening",
  TRANSCRIBING: "transcribing",
  EVALUATING: "evaluating",
  FINISHED: "finished"
};

function App() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [interviewId, setInterviewId] = useState("");
  const [avatarBehavior, setAvatarBehavior] = useState({ emotion: "neutral", posture: "relaxed", gaze: "eye_contact", gesture: "none" });
  
  const [interviewState, setInterviewState] = useState(InterviewState.IDLE);
  const [interviewState, setInterviewState] = useState(InterviewState.IDLE);
  const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [audioError, setAudioError] = useState("");
  
  const chatEndRef = useRef(null);
  
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  let avatarState = "idle";
  if (interviewState === InterviewState.AI_SPEAKING) avatarState = "speaking";
  else if (interviewState === InterviewState.LISTENING) avatarState = "listening";
  else if (interviewState === InterviewState.TRANSCRIBING || interviewState === InterviewState.EVALUATING) avatarState = "thinking";

  const playInterviewerAudio = (audioUrl) => {
    if (!audioUrl) {
      setInterviewState(InterviewState.IDLE);
      return;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    setInterviewState(InterviewState.AI_SPEAKING);
    const API_BASE = typeof window !== "undefined" ? `http://${window.location.hostname}:8000` : "http://localhost:8000";
    const fullUrl = audioUrl.startsWith('http') ? audioUrl : `${API_BASE}${audioUrl}`;
    
    audioRef.current = new Audio(fullUrl);
    audioRef.current.onended = () => {
      setInterviewState(InterviewState.IDLE);
    };
    audioRef.current.onerror = () => {
      setAudioError("Unable to play interviewer voice.");
      setInterviewState(InterviewState.IDLE);
    };
    audioRef.current.play().catch(err => {
      console.error("Audio playback error:", err);
      setAudioError("Unable to play interviewer voice.");
      setInterviewState(InterviewState.IDLE);
    });
  };

  const startInterview = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      
      setLoading(true);
      setErrorMsg("");
      const newInterviewId = crypto.randomUUID();
      setInterviewId(newInterviewId);

      const API_BASE = typeof window !== "undefined" ? `http://${window.location.hostname}:8000` : "http://localhost:8000";
      const response = await fetch(`${API_BASE}/api/live-interview/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interview_id: newInterviewId,
          candidate_message: "",
          exam: "KVS/NVS Special Educator",
          subject: "Special Education",
          language: "English",
          conversation_history: []
        })
      });

      if (!response.ok) {
        throw new Error("API Failed");
      }

      const data = await response.json();
      setLoading(false);
      setInterviewStarted(true);
      
      // Start the first question after a short delay
      setTimeout(() => {
        setMessages([{ id: Date.now().toString(), role: 'ai', text: data.interviewer_message }]);
        if (data.avatar_behavior) setAvatarBehavior(data.avatar_behavior);
        if (data.audio_url) playInterviewerAudio(data.audio_url);
        else setInterviewState(InterviewState.IDLE);
      }, 2000);
    } catch (error) {
      console.error("Error starting interview.", error);
      setLoading(false);
      setErrorMsg("Unable to generate interview question. Please try again.");
    }
  };


  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, interviewStarted]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, interviewState]);

  const chatWithAI = async (transcribedText) => {
    setInterviewState(InterviewState.EVALUATING);
    setAudioError("");

    const history = messages.map(m => ({ 
      role: m.role === 'ai' ? 'interviewer' : 'candidate', 
      content: m.text 
    }));

    try {
      const API_BASE = typeof window !== "undefined" ? `http://${window.location.hostname}:8000` : "http://localhost:8000";
      const response = await fetch(`${API_BASE}/api/live-interview/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interview_id: interviewId,
          candidate_message: transcribedText,
          exam: "KVS/NVS Special Educator",
          subject: "Special Education",
          language: "English",
          conversation_history: history
        })
      });

      if (!response.ok) throw new Error("Failed to get chat response");
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: data.interviewer_message }]);
      if (data.avatar_behavior) setAvatarBehavior(data.avatar_behavior);
      
      if (data.audio_url) playInterviewerAudio(data.audio_url);
      else setInterviewState(InterviewState.IDLE);
      
    } catch (err) {
      console.error(err);
      setAudioError("Chat failed. Please try again.");
      setInterviewState(InterviewState.IDLE);
    }
  };

  const handleEndInterview = () => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: "Thank you, the interview is now complete." }]);
    setInterviewState(InterviewState.FINISHED);
  };

  const startRecording = async () => {
    try {
      setAudioError("");
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(micStream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        if (audioBlob.size === 0) {
          setAudioError("Empty recording.");
          setInterviewState(InterviewState.IDLE);
          return;
        }

        setInterviewState(InterviewState.TRANSCRIBING);
        const formData = new FormData();
        formData.append("interview_id", interviewId);
        formData.append("question_number", messages.length);
        formData.append("question", "conversational_turn");
        formData.append("audio", audioBlob, "answer.webm");

        try {
          const API_BASE = typeof window !== "undefined" ? `http://${window.location.hostname}:8000` : "http://localhost:8000";
          const res = await fetch(`${API_BASE}/api/live-interview/transcribe`, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) throw new Error("Network failure");
          
          const result = await res.json();
          const parsedText = result.candidate_answer || result.transcript || "Answer processed successfully.";
          setMessages(prev => [...prev, { id: Date.now().toString(), role: 'candidate', text: parsedText }]);
          
          // Use setTimeout to ensure state updates before evaluation starts
          setTimeout(() => {
            chatWithAI(parsedText);
          }, 100);
        } catch (err) {
          console.error(err);
          setAudioError("Network failure. Please try again.");
          setInterviewState(InterviewState.IDLE);
        } finally {
          micStream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start();
      setInterviewState(InterviewState.LISTENING);
    } catch (err) {
      console.error(err);
      setAudioError("Permission denied. Could not access microphone.");
      setInterviewState(InterviewState.IDLE);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setInterviewState(InterviewState.TRANSCRIBING);
    }
  };

  return (
    <div className="app-container">
      {!interviewStarted && (
        <div className="start-screen">
          <h1>PV Classes AI Mock Interview</h1>
          <p>You are about to start a 5-question Teacher Interview. Make sure your microphone and camera are ready.</p>
          {errorMsg && (
            <div style={{ color: '#ff4d4d', marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' }}>
              {errorMsg}
            </div>
          )}
          <button className="start-btn" onClick={startInterview} disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" style={{ display: 'inline-block', width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                Loading...
              </>
            ) : (
              "Start Interview"
            )}
          </button>
        </div>
      )}

      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>📞 9251582702</span>
          <span>✉️ Pvclasses01@gmail.com</span>
          <span className="new-badge">NEW</span>
          <span>Offline Interview Registration</span>
        </div>
        <div className="top-bar-right">
          <input type="text" className="search-input" placeholder="Search courses..." />
          <span style={{cursor: 'pointer'}}>➔ Login</span>
          <span style={{cursor: 'pointer'}}>👤 Register</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="main-nav">
        <div className="logo-area">
          <div className="logo-circle">
            <span style={{color: '#8dc63f', fontWeight: 'bold', fontSize: '20px'}}>PV</span>
          </div>
        </div>
        <div className="nav-links">
          <span style={{cursor: 'pointer'}}>Home</span>
          <span style={{cursor: 'pointer'}}>All Exams ⌄</span>
          <span style={{cursor: 'pointer'}}>PYQs</span>
          <span style={{cursor: 'pointer'}}>Test Series</span>
          <span style={{cursor: 'pointer'}}>Books</span>
          <span style={{cursor: 'pointer'}}>Current Affairs</span>
          <span style={{cursor: 'pointer'}}>Notes</span>
        </div>
        <div className="nav-actions">
          <button className="contact-btn">Contact Us 📞</button>
          <div className="cart-icon">
            🛒
            <span className="cart-badge">1</span>
          </div>
        </div>
      </div>

      {/* Sub Header */}
      <div className="sub-header">
        <h2>PV Classes AI Mock Interview</h2>
        <div className="session-chip">Session: {interviewId || "Pending"}</div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="left-column">
          <div className="card coach-card">
            <div className="coach-header">
              <h3>AI Interview Coach</h3>
              <div className="online-badge">
                <div className="online-dot"></div>
                ONLINE
              </div>
            </div>
            
            <div className="canvas-container">
              <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
                <color attach="background" args={["#111827"]} />
                <Experience avatarState={avatarState} avatarBehavior={avatarBehavior} />
              </Canvas>
            </div>
            
            <button className="listening-btn">
              🎤 LISTENING...
            </button>
          </div>

          <div className="card monitoring-card">
            <h4>MONITORING</h4>
            <div className="camera-feed" style={{ padding: 0 }}>
              {stream ? (
                <video ref={videoRef} autoPlay playsInline muted className="video-feed" />
              ) : (
                <div className="camera-overlay">Face Detection Pending...</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column" style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '600px' }}>
          
          <div className="card chat-container" style={{ flex: 1, marginBottom: '16px', display: 'flex', flexDirection: 'column' }}>
            {messages.length === 0 && (
              <div style={{ margin: 'auto', color: '#94a3b8', fontStyle: 'italic', fontSize: '14px' }}>
                Conversation will appear here...
              </div>
            )}
            
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                <div className="chat-avatar">{msg.role === 'ai' ? '👤 AI Interviewer' : 'You'}</div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}

            {(interviewState === InterviewState.TRANSCRIBING || interviewState === InterviewState.EVALUATING) && (
              <div className="chat-message ai">
                <div className="chat-avatar">👤 AI Interviewer</div>
                <div className="chat-bubble typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="card mic-card" style={{ marginTop: 'auto', marginBottom: 0 }}>
            <div className="mic-status-container" style={{ marginBottom: 0 }}>
              <div className="mic-status">
                <div className="mic-dot" style={{ backgroundColor: 
                  interviewState === InterviewState.LISTENING ? '#ef4444' : 
                  interviewState === InterviewState.EVALUATING ? '#3b82f6' : 
                  interviewState === InterviewState.TRANSCRIBING ? '#f59e0b' : 
                  interviewState === InterviewState.AI_SPEAKING ? '#8b5cf6' : 
                  interviewState === InterviewState.FINISHED ? '#9ca3af' : '#00d26a' 
                }}></div>
                {
                  interviewState === InterviewState.LISTENING ? "Recording..." : 
                  interviewState === InterviewState.EVALUATING ? "AI is evaluating your answer..." : 
                  interviewState === InterviewState.TRANSCRIBING ? "Transcribing..." : 
                  interviewState === InterviewState.AI_SPEAKING ? "AI Speaking..." : 
                  interviewState === InterviewState.FINISHED ? "Finished" : "Microphone Ready"
                }
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                {interviewState !== InterviewState.LISTENING ? (
                  <button className="start-mic-btn" onClick={startRecording} disabled={interviewState !== InterviewState.IDLE || !interviewStarted}>
                    Start Recording
                  </button>
                ) : (
                  <button className="start-mic-btn" onClick={stopRecording} style={{ backgroundColor: '#ef4444', color: '#fff' }}>
                    Stop Recording
                  </button>
                )}
                
                <button className="start-mic-btn" onClick={handleEndInterview} disabled={interviewState === InterviewState.AI_SPEAKING || interviewState === InterviewState.LISTENING}>
                  End Interview
                </button>
              </div>
            </div>
            
            {audioError && <div style={{ color: '#ef4444', marginTop: '12px', fontSize: '13px', fontWeight: 'bold' }}>{audioError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
