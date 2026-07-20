"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import WebcamMonitor from '../../AIMockInterview/components/WebcamMonitor';

// UI Components
import InterviewProgress from './InterviewProgress';
import InterviewTimer from './InterviewTimer';
import CandidateProfile from './CandidateProfile';
import LiveScoreCard from './LiveScoreCard';
import InterviewTopBar from './InterviewTopBar';
import MainInteractionCard from './MainInteractionCard';
import ConversationTimeline from './ConversationTimeline';
import FloatingVoiceDock from './FloatingVoiceDock';
import VoiceSettingsModal from './VoiceSettingsModal';

const API_BASE = "http://localhost:8001";

export default function LiveInterviewSession() {
  const searchParams = useSearchParams();
  
  // Base Data State
  const [data, setData] = useState({
    candidate: { name: "Candidate", exam: "", subject: "", mode: "Voice" },
    stages: [
      { name: "Introduction", status: "pending" }
    ],
    currentQuestion: {
      text: "Initializing...",
      difficulty: "Medium"
    },
    scores: {
      overall: 0,
      communication: 0,
      knowledge: 0,
      confidence: 0
    },
    conversation: [],
    contextUsed: []
  });

  const [sessionId, setSessionId] = useState(null);
  const [durationParam, setDurationParam] = useState('20 Minutes');
  
  // Voice State Machine: INITIALIZING -> AI_SPEAKING -> LISTENING -> RECORDING -> PROCESSING -> EVALUATING -> GENERATING_NEXT_QUESTION
  const [interviewState, setInterviewState] = useState("INITIALIZING");
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  
  // Camera State
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraStatus, setCameraStatus] = useState("PENDING");

  // Refs for media
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const videoRef = useRef(null);

  // Initialize Camera
  useEffect(() => {
    let stream = null;
    const initCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setCameraStream(stream);
        setCameraStatus("ACTIVE");
      } catch (err) {
        console.error("Camera error:", err);
        setCameraStatus("DENIED");
      }
    };
    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Initialize Session
  useEffect(() => {
    const initSession = async () => {
      let storedSessionId = sessionStorage.getItem("ai_live_session_id");
      
      let candidateName = "Candidate";
      let exam = searchParams.get('exam') || "KVS PRT";
      let subject = searchParams.get('subject') || "English";
      let duration = searchParams.get('duration') || "20 Minutes";
      
      // Load config if passed from onboarding
      const storedConfig = sessionStorage.getItem('aiLiveInterviewSessionData');
      if (storedConfig) {
        try {
          const parsed = JSON.parse(storedConfig);
          if (parsed.config?.exam) exam = parsed.config.exam;
          if (parsed.config?.subject) subject = parsed.config.subject;
          if (parsed.config?.duration) duration = parsed.config.duration;
          if (parsed.candidate?.name) candidateName = parsed.candidate.name;
        } catch(e) {}
      }
      
      setDurationParam(duration);
      // Immediately populate UI with what we know
      setData(prev => ({
        ...prev,
        candidate: { name: candidateName, exam, subject, language: "English", mode: "Voice" }
      }));

      if (storedSessionId) {
        // Resume logic
        try {
          const res = await fetch(`${API_BASE}/api/live-interview/resume/${storedSessionId}`);
          if (res.ok) {
            const sessionData = await res.json();
            setSessionId(storedSessionId);
            updateUIFromBackend(sessionData, null);
            setInterviewState("LISTENING");
            return;
          } else {
            sessionStorage.removeItem("ai_live_session_id");
          }
        } catch(e) {
          console.error("Resume failed", e);
        }
      }

      // Start new session
      try {
        const res = await fetch(`${API_BASE}/api/live-interview/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            candidate_name: candidateName,
            exam: exam,
            subject: subject,
            language: "English",
            difficulty: "Medium",
            interview_mode: "Voice",
            duration: parseInt(duration) || 20
          })
        });
        
        if (res.ok) {
          const sessionData = await res.json();
          setSessionId(sessionData.session_id);
          sessionStorage.setItem("ai_live_session_id", sessionData.session_id);
          
          setData(prev => ({
            ...prev,
            candidate: sessionData.candidate || { name: candidateName, exam, subject, language: "English", mode: "Voice" },
            currentQuestion: { text: sessionData.first_question, difficulty: "Medium" }
          }));
          
          if (sessionData.audio_url) {
            setCurrentAudioUrl(`${API_BASE}${sessionData.audio_url}`);
            setInterviewState("AI_SPEAKING");
          } else {
            setInterviewState("LISTENING");
          }
        } else {
          const errorData = await res.json();
          console.error("Backend returned error:", errorData);
          setInterviewState("ERROR");
        }
      } catch (e) {
        console.error("Start failed", e);
        setInterviewState("ERROR");
      }
    };

    if (typeof window !== 'undefined' && !sessionId && interviewState === "INITIALIZING") {
      initSession();
    }
  }, [searchParams, sessionId, interviewState]);

  // Audio Playback Effect
  useEffect(() => {
    if (currentAudioUrl && audioRef.current && interviewState === "AI_SPEAKING") {
      audioRef.current.src = currentAudioUrl;
      audioRef.current.play().catch(e => {
        console.error("Audio autoplay blocked", e);
        // Fallback to listening if blocked
        setInterviewState("LISTENING");
      });
    }
  }, [currentAudioUrl, interviewState]);

  const handleAudioEnded = () => {
    if (data.status === "completed") {
      window.location.href = '/'; // Or redirect to report
    } else {
      setInterviewState("LISTENING");
    }
  };

  const updateUIFromBackend = (apiResponse, turnTranscript) => {
    if (apiResponse.profile) {
       setData(prev => ({
         ...prev,
         scores: {
           overall: apiResponse.profile.confidence_level === "High" ? 85 : 70,
           communication: apiResponse.profile.communication_level === "Excellent" ? 90 : 75,
           knowledge: 80,
           confidence: 75
         },
         contextUsed: apiResponse.profile.strengths || []
       }));
    }
    
    if (apiResponse.next_question) {
       setData(prev => ({
         ...prev,
         currentQuestion: { text: apiResponse.next_question, difficulty: apiResponse.current_difficulty || "Medium" }
       }));
    }

    if (apiResponse.conversation) {
       // if resuming, it provides full conversation. If turn, we manually push.
       // For now, let's just append the turn if transcript provided
       if (turnTranscript) {
         setData(prev => ({
           ...prev,
           conversation: [
             ...prev.conversation,
             { id: Date.now(), role: "candidate", text: turnTranscript },
             { id: Date.now()+1, role: "interviewer", text: apiResponse.next_question }
           ]
         }));
       }
    }
    
    if (apiResponse.status === "completed") {
      setData(prev => ({...prev, status: "completed"}));
    }
  };

  // Recording Logic
  const startRecording = async () => {
    if (interviewState !== "LISTENING") return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      setLiveTranscript("Recording audio...");
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setInterviewState("PROCESSING");
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Stop all mic tracks
        stream.getTracks().forEach(track => track.stop());

        const formData = new FormData();
        formData.append("file", audioBlob, "answer.webm");

        try {
          const res = await fetch(`${API_BASE}/api/live-interview/session/${sessionId}/voice`, {
            method: "POST",
            body: formData
          });

          if (res.ok) {
            const result = await res.json();
            
            if (result.voice_state === "ERROR") {
                setLiveTranscript(result.error_detail || "Error occurred");
                setInterviewState("LISTENING");
                return;
            }

            setLiveTranscript(result.transcript);
            updateUIFromBackend(result, result.transcript);
            
            if (result.audio_url) {
              setCurrentAudioUrl(`${API_BASE}${result.audio_url}`);
              setInterviewState("AI_SPEAKING");
            } else {
              setInterviewState("LISTENING");
            }

          } else {
            console.error("Backend error");
            setInterviewState("LISTENING");
            setLiveTranscript("Network error. Try again.");
          }
        } catch (e) {
            console.error("Upload failed", e);
            setInterviewState("LISTENING");
            setLiveTranscript("Upload failed. Try again.");
        }
      };

      mediaRecorderRef.current.start();
      setInterviewState("RECORDING");
    } catch (e) {
      console.error("Mic access denied", e);
      alert("Microphone access is required.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  // Keyboard Spacebar Push-to-Talk
  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.code === 'Space') {
      e.preventDefault();
      if (interviewState === "LISTENING") {
        startRecording();
      }
    } else if (e.code === 'KeyM') {
      setIsMuted(prev => !prev);
    } else if (e.code === 'Escape') {
      if (confirm("Are you sure you want to end the interview?")) {
        window.location.href = '/';
      }
    }
  }, [interviewState]);

  const handleKeyUp = useCallback((e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (interviewState === "RECORDING") {
        stopRecording();
      }
    }
  }, [interviewState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleToggleMute = () => setIsMuted(prev => !prev);
  const handleEndClick = () => {
    if (confirm("Are you sure you want to end the interview?")) {
      window.location.href = '/';
    }
  };

  // Map state to UI
  let displayStatus = interviewState.replace("_", " ");
  if (interviewState === "PROCESSING") displayStatus = "Evaluating Answer";
  if (interviewState === "INITIALIZING") displayStatus = "Waking up Interviewer...";
  if (interviewState === "AI_SPEAKING") displayStatus = "Interviewer Speaking";

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 md:p-6 bg-[#F8FAFC] relative">
      
      {/* Hidden Audio Element for TTS */}
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 max-w-[1600px] mx-auto">
        
        {/* Left Column (20%) */}
        <div className="w-full xl:col-span-1 flex flex-col order-2 xl:order-1 h-fit xl:h-[calc(100vh-120px)] xl:sticky xl:top-4 gap-4 pb-4">
          <InterviewTimer durationString={durationParam} />
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <InterviewProgress stages={data.stages} />
          </div>
          <FloatingVoiceDock 
            isMuted={isMuted} 
            onToggleMute={handleToggleMute}
            onSettingsClick={() => setShowSettings(true)}
            onEndClick={handleEndClick}
          />
        </div>

        {/* Center Column (60%) */}
        <div className="w-full xl:col-span-3 flex flex-col order-1 xl:order-2 gap-4">
          
          <InterviewTopBar status={displayStatus} contextUsed={data.contextUsed} />
          
          <MainInteractionCard 
            candidate={data.candidate} 
            currentQuestion={data.currentQuestion} 
            transcript={liveTranscript} 
            status={displayStatus} 
            internalState={interviewState}
            onMicClick={() => {
              if (interviewState === "LISTENING") startRecording();
              else if (interviewState === "RECORDING") stopRecording();
            }}
          />

          <div className="max-h-[300px] overflow-y-auto rounded-[1rem]">
            <ConversationTimeline conversation={data.conversation} />
          </div>

        </div>

        {/* Right Column (20%) */}
        <div className="w-full xl:col-span-1 flex flex-col order-3 h-fit gap-4">
          <CandidateProfile candidate={data.candidate} />
          
          {/* Camera Monitoring */}
          <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Proctoring Camera</h3>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            </div>
            <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-200 relative aspect-video">
               <WebcamMonitor videoRef={videoRef} status={cameraStatus} stream={cameraStream} retry={() => setCameraStatus("PENDING")} />
            </div>
          </div>

          <LiveScoreCard scores={data.scores} />
        </div>

      </div>

      <VoiceSettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

    </div>
  );
}
