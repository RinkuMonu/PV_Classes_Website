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
  
  // Voice State Machine: INITIALIZING -> AI_SPEAKING -> LISTENING -> RECORDING -> UPLOADING -> PROCESSING -> AI_SPEAKING
  const [interviewState, setInterviewState] = useState("INITIALIZING");
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("Preparing session...");
  
  // Camera State
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraStatus, setCameraStatus] = useState("PENDING");

  // State Refs for stable access in async callbacks
  const stateRef = useRef({
    sessionId: null,
    interviewState: "INITIALIZING",
    activeAudio: null,
    activeRecorder: null,
    audioContext: null,
    animationFrameId: null,
    hasInitialized: false
  });

  const videoRef = useRef(null);

  const updateInterviewState = useCallback((newState) => {
    stateRef.current.interviewState = newState;
    setInterviewState(newState);
  }, []);

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
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  // API Callbacks
  const updateUIFromBackend = useCallback((apiResponse, turnTranscript) => {
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

    if (apiResponse.conversation && turnTranscript) {
       setData(prev => ({
         ...prev,
         conversation: [
           ...prev.conversation,
           { id: Date.now(), role: "candidate", text: turnTranscript },
           { id: Date.now()+1, role: "interviewer", text: apiResponse.next_question }
         ]
       }));
    }
    
    if (apiResponse.status === "completed") {
      setData(prev => ({...prev, status: "completed"}));
    }
  }, []);

  const uploadAndProcessRecording = async (audioBlob) => {
    updateInterviewState("PROCESSING");
    setLiveTranscript("Analyzing answer...");
    
    const formData = new FormData();
    formData.append("file", audioBlob, "answer.webm");

    try {
      const res = await fetch(`${API_BASE}/api/live-interview/session/${stateRef.current.sessionId}/voice`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

      const result = await res.json();
      
      if (result.voice_state === "ERROR") {
          throw new Error(result.error?.message || "Backend Voice Error");
      }

      console.log("✓ Recording Uploaded");
      console.log(`✓ Transcript Received: "${result.transcript}"`);
      setLiveTranscript(result.transcript);
      updateUIFromBackend(result, result.transcript);
      
      if (!result.next_question || !result.audio_url) {
         throw new Error("Invalid backend response: missing next_question or audio_url");
      }

      console.log(`✓ Next Question Received: ${result.next_question.substring(0, 60)}...`);
      console.log(`✓ Audio URL Received: ${result.audio_url}`);
      console.log("✓ Loop Continued");
      
      playAudioLoop(result.audio_url);

    } catch (e) {
        console.error("[Upload] Error processing recording", e);
        setLiveTranscript(`Processing Error: ${e.message}`);
        updateInterviewState("ERROR");
    }
  };

  const startRecordingWithSilenceDetection = async () => {
    const currentState = stateRef.current.interviewState;
    if (currentState !== "LISTENING" && currentState !== "RECORDING") return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("✓ Recording Started");
      updateInterviewState("RECORDING");
      setLiveTranscript("Recording audio... (speak now)");

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      stateRef.current.activeRecorder = mediaRecorder;
      const audioChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      stateRef.current.audioContext = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      let silenceStart = Date.now();
      const SILENCE_THRESHOLD = 5; // Very low threshold to capture any speech
      const MAX_SILENCE_DURATION = 3500; // 3.5 seconds
      const MAX_RECORDING_DURATION = 60000; // 60 seconds
      const recordingStartTime = Date.now();

      const checkSilence = () => {
        if (mediaRecorder.state !== "recording") return;

        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
        const average = sum / bufferLength;

        if (average > SILENCE_THRESHOLD) {
          silenceStart = Date.now();
        }

        const silenceDuration = Date.now() - silenceStart;
        const totalDuration = Date.now() - recordingStartTime;

        if (silenceDuration > MAX_SILENCE_DURATION || totalDuration > MAX_RECORDING_DURATION) {
          console.log(`[Recording] Auto-stopping. Silence: ${silenceDuration}ms, Total: ${totalDuration}ms`);
          mediaRecorder.stop();
        } else {
          stateRef.current.animationFrameId = requestAnimationFrame(checkSilence);
        }
      };

      mediaRecorder.onstop = async () => {
        if (stateRef.current.animationFrameId) {
            cancelAnimationFrame(stateRef.current.animationFrameId);
        }
        updateInterviewState("UPLOADING");
        setLiveTranscript("Uploading response...");
        
        stream.getTracks().forEach(track => track.stop());
        if (audioContext.state !== "closed") audioContext.close();

        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        await uploadAndProcessRecording(audioBlob);
      };

      mediaRecorder.start(250);
      checkSilence();

    } catch (e) {
      console.error("Microphone Permission Denied or Error:", e);
      setLiveTranscript(`Microphone Error: ${e.message}`);
      updateInterviewState("ERROR");
    }
  };

  const playAudioLoop = async (audioUrl) => {
    if (!audioUrl) return;
    
    if (stateRef.current.activeAudio) {
       stateRef.current.activeAudio.pause();
       stateRef.current.activeAudio.src = "";
    }

    const fullUrl = audioUrl.startsWith('http') ? audioUrl : `${API_BASE}${audioUrl}`;
    console.log(`[Audio] Creating new Audio object for URL: ${fullUrl}`);
    const audio = new Audio(fullUrl);
    stateRef.current.activeAudio = audio;

    audio.onloadeddata = () => {
        console.log("✓ Audio Loaded (onloadeddata)");
        setLiveTranscript("Audio downloaded, starting playback...");
    };
    audio.oncanplay = () => console.log("✓ Audio Ready (oncanplay)");
    audio.onpause = () => console.log("[Audio Event] onpause");
    
    audio.onplay = () => {
       console.log("✓ Audio Playing (onplay)");
       console.log("✓ Avatar Speaking");
       updateInterviewState("AI_SPEAKING");
       setLiveTranscript("Interviewer is speaking...");
    };

    audio.onended = () => {
       console.log("✓ Audio Finished (onended)");
       console.log("✓ Listening Started");
       updateInterviewState("LISTENING");
       startRecordingWithSilenceDetection();
    };

    audio.onerror = (e) => {
       const errorMsg = audio.error ? `Code: ${audio.error.code}, Message: ${audio.error.message}` : "Unknown error";
       console.error(`[Audio Pipeline] onerror fired: ${errorMsg}`);
       setLiveTranscript(`Audio Error: ${errorMsg}`);
       updateInterviewState("ERROR");
    };

    try {
      audio.load();
      await audio.play();
    } catch (e) {
      console.error("[Audio Pipeline] audio.play() rejected", e);
      if (e.name === "NotAllowedError") {
         setLiveTranscript("Autoplay Blocked. Please click the Play button below.");
         updateInterviewState("AUTOPLAY_BLOCKED");
      } else {
         setLiveTranscript(`${e.name}: ${e.message}`);
         updateInterviewState("ERROR");
      }
    }
  };

  const initSession = async () => {
    if (stateRef.current.hasInitialized) return;
    stateRef.current.hasInitialized = true;
    
    let candidateName = "Candidate";
    let exam = searchParams.get('exam') || "KVS PRT";
    let subject = searchParams.get('subject') || "English";
    let language = searchParams.get('language') || "English";
    let duration = searchParams.get('duration') || "20 Minutes";
    
    const storedConfig = sessionStorage.getItem('aiLiveInterviewSessionData');
    if (storedConfig) {
      try {
        const parsed = JSON.parse(storedConfig);
        if (parsed.config?.exam) exam = parsed.config.exam;
        if (parsed.config?.subject) subject = parsed.config.subject;
        if (parsed.config?.duration) duration = parsed.config.duration;
        if (parsed.config?.language) language = parsed.config.language;
        if (parsed.candidate?.name) candidateName = parsed.candidate.name;
      } catch(e) {}
    }
    
    setDurationParam(duration);
    setData(prev => ({
      ...prev,
      candidate: { name: candidateName, exam, subject, language, mode: "Voice" }
    }));

    try {
      console.log("[Init] Starting new session via POST /api/live-interview/start");
      setLiveTranscript("Connecting to backend...");
      const res = await fetch(`${API_BASE}/api/live-interview/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidate_name: candidateName,
          exam: exam,
          subject: subject,
          language: language,
          difficulty: "Medium",
          interview_mode: "Voice",
          duration: parseInt(duration) || 20
        })
      });
      
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      
      const sessionData = await res.json();
      
      // STEP 1: Verify frontend receives session_id, first_question, audio_url
      if (!sessionData.session_id || !sessionData.first_question || !sessionData.audio_url) {
         console.error("Missing required fields in response:", sessionData);
         throw new Error("Missing session_id, first_question, or audio_url in start response");
      }

      console.log("✓ Interview Started");
      console.log(`✓ Session Created: ${sessionData.session_id}`);
      console.log(`✓ Question Received: ${sessionData.first_question.substring(0, 60)}...`);
      console.log(`✓ Audio URL Received: ${sessionData.audio_url}`);
      
      setLiveTranscript("Session created! Loading audio stream...");
      setSessionId(sessionData.session_id);
      stateRef.current.sessionId = sessionData.session_id;
      
      setData(prev => ({
        ...prev,
        candidate: sessionData.candidate || prev.candidate,
        currentQuestion: { text: sessionData.first_question, difficulty: "Medium" }
      }));
      
      // STEP 2: Create audio player and start loop
      playAudioLoop(sessionData.audio_url);

    } catch (e) {
      console.error("[Init] Start failed", e);
      setLiveTranscript(`Initialization Error: ${e.message}`);
      updateInterviewState("ERROR");
    }
  };

  // Run initialization once on mount
  useEffect(() => {
    let mounted = true;
    if (typeof window !== 'undefined' && !stateRef.current.sessionId) {
       initSession();
    }
    return () => {
       mounted = false;
       // Cleanup audio and mic on unmount
       if (stateRef.current.activeAudio) {
          stateRef.current.activeAudio.pause();
       }
       if (stateRef.current.activeRecorder && stateRef.current.activeRecorder.state !== "inactive") {
          stateRef.current.activeRecorder.stop();
       }
       if (stateRef.current.animationFrameId) {
          cancelAnimationFrame(stateRef.current.animationFrameId);
       }
    };
  }, []);

  const handlePlayAudioFallback = () => {
    if (stateRef.current.activeAudio) {
      stateRef.current.activeAudio.play().catch(e => {
         setLiveTranscript(`Fallback Play Error: ${e.message}`);
      });
    }
  };

  const handleManualMicClick = () => {
    if (interviewState === "LISTENING" || interviewState === "ERROR") {
        startRecordingWithSilenceDetection();
    } else if (interviewState === "RECORDING" && stateRef.current.activeRecorder) {
        stateRef.current.activeRecorder.stop();
    }
  };

  // Keyboard Spacebar Push-to-Talk (manual override)
  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
      e.preventDefault();
      if (interviewState === "LISTENING") startRecordingWithSilenceDetection();
    } else if (e.code === 'KeyM') {
      setIsMuted(prev => !prev);
    } else if (e.code === 'Escape') {
      if (confirm("Are you sure you want to end the interview?")) window.location.href = '/';
    }
  }, [interviewState]);

  const handleKeyUp = useCallback((e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (interviewState === "RECORDING" && stateRef.current.activeRecorder) {
        stateRef.current.activeRecorder.stop();
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

  const handleRestartClick = () => {
    if (confirm("Are you sure you want to restart the interview?")) {
      if (stateRef.current.activeAudio) stateRef.current.activeAudio.pause();
      if (stateRef.current.activeRecorder && stateRef.current.activeRecorder.state !== "inactive") stateRef.current.activeRecorder.stop();
      if (stateRef.current.animationFrameId) cancelAnimationFrame(stateRef.current.animationFrameId);
      
      sessionStorage.removeItem("ai_live_session_id");
      stateRef.current.sessionId = null;
      stateRef.current.hasInitialized = false;
      setSessionId(null);
      updateInterviewState("INITIALIZING");
      setLiveTranscript("Initializing session...");
      setData(prev => ({ ...prev, currentQuestion: { text: "Initializing...", difficulty: "" }, conversation: [], stages: [] }));
      
      initSession();
    }
  };

  // Map state to UI
  let displayStatus = interviewState.replace("_", " ");
  if (interviewState === "PROCESSING") displayStatus = "Evaluating Answer";
  if (interviewState === "UPLOADING") displayStatus = "Uploading Response";
  if (interviewState === "INITIALIZING") displayStatus = "Waking up Interviewer...";
  if (interviewState === "PREPARING_AUDIO") displayStatus = "Loading Audio...";
  if (interviewState === "AI_SPEAKING") displayStatus = "Interviewer Speaking";
  if (interviewState === "AUTOPLAY_BLOCKED") displayStatus = "Interaction Required";
  if (interviewState === "ERROR") displayStatus = "Error Encountered";

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 md:p-6 bg-[#F8FAFC] relative">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 max-w-[1600px] mx-auto">
        
        {/* Left Column (20%) */}
        <div className="w-full xl:col-span-1 flex flex-col order-2 xl:order-1 h-fit xl:h-[calc(100vh-120px)] xl:sticky xl:top-4 gap-4 pb-4">
          <InterviewTimer durationString={durationParam} />
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <InterviewProgress stages={data.stages} />
          </div>
          <FloatingVoiceDock 
            isMuted={isMuted} 
            onToggleMute={() => setIsMuted(p => !p)}
            onSettingsClick={() => setShowSettings(true)}
            onRestartClick={handleRestartClick}
            onEndClick={() => confirm("Are you sure you want to end the interview?") && (window.location.href = '/')}
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
            onMicClick={handleManualMicClick}
            onPlayAudioFallback={handlePlayAudioFallback}
          />

          <div className="max-h-[300px] overflow-y-auto rounded-[1rem]">
            <ConversationTimeline conversation={data.conversation} />
          </div>
        </div>

        {/* Right Column (20%) */}
        <div className="w-full xl:col-span-1 flex flex-col order-3 h-fit gap-4">
          <CandidateProfile candidate={data.candidate} />
          
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
