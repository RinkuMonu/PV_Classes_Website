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

function App() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [questionText, setQuestionText] = useState("");
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startInterview = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setInterviewStarted(true);
      // Start the first question after a short delay
      setTimeout(() => {
        setCurrentQuestionIndex(0);
        setQuestionText(TEACHER_QUESTIONS[0]);
      }, 2000);
    } catch (error) {
      console.error("Error accessing media devices.", error);
      alert("Please allow camera and microphone permissions to start the interview.");
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, interviewStarted]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < TEACHER_QUESTIONS.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setQuestionText(TEACHER_QUESTIONS[nextIdx]);
    } else {
      setQuestionText("Thank you, the interview is now complete.");
      setCurrentQuestionIndex(TEACHER_QUESTIONS.length);
    }
  };

  return (
    <div className="app-container">
      {!interviewStarted && (
        <div className="start-screen">
          <h1>PV Classes AI Mock Interview</h1>
          <p>You are about to start a 5-question Teacher Interview. Make sure your microphone and camera are ready.</p>
          <button className="start-btn" onClick={startInterview}>Start Interview</button>
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
        <div className="session-chip">Session: 77dc1fde...</div>
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
                <Experience questionText={questionText} onSpeakEnd={() => {}} />
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
        <div className="right-column">
          <div className="card progress-card">
            <div className="progress-header">
              <span>QUESTION {Math.max(1, Math.min(currentQuestionIndex + 1, 5))} OF 5</span>
              <span>{Math.round(((Math.max(0, currentQuestionIndex)) / 5) * 100)}% COMPLETED</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${((Math.max(0, currentQuestionIndex)) / 5) * 100}%` }}
              ></div>
            </div>
            <div className="badges-container">
              <div className="level-badge">LEVEL: MEDIUM</div>
              <div className="score-badge">SCORE <span>0</span></div>
            </div>
          </div>

          <div className="card mic-card">
            <div className="mic-status-container">
              <div className="mic-status">
                <div className="mic-dot" style={{ backgroundColor: '#00d26a' }}></div>
                Microphone Active
              </div>
              <button className="start-mic-btn" onClick={handleNextQuestion}>
                {currentQuestionIndex >= 4 ? "Finish Interview" : "Next Question"}
              </button>
            </div>
            <textarea 
              className="input-area" 
              placeholder='Say your answer (e.g. "Option A" or "Lock B")...'
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
