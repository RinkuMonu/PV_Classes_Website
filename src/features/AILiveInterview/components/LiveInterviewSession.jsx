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
import { ttsServiceV2 } from '../../AIMockInterview/services/ttsServiceV2';
import { useLiveInterview } from '../../../hooks/useLiveInterview';

export default function LiveInterviewSession() {
  const searchParams = useSearchParams();
  const [durationParam, setDurationParam] = useState('20 Minutes');
  const [isMuted, setIsMuted] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraStatus, setCameraStatus] = useState("PENDING");
  const videoRef = useRef(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const {
    interviewState,
    startInterview,
    endInterview,
    startRecording,
    stopRecording,
    submitAnswer,
    isConnected,
    latency,
    isLoading,
    error
  } = useLiveInterview();

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

  const initSession = useCallback(() => {
    if (hasInitialized) return;
    setHasInitialized(true);
    
    let candidateName = "Candidate";
    let exam = "Unknown";
    let subject = "Unknown";
    let language = "English";
    let duration = "20 Minutes";
    let difficulty = "Medium";
    
    const storedConfig = sessionStorage.getItem('aiLiveInterviewSessionData');
    if (storedConfig) {
      try {
        const parsed = JSON.parse(storedConfig);
        if (parsed.config?.exam) exam = parsed.config.exam;
        if (parsed.config?.subject) subject = parsed.config.subject;
        if (parsed.config?.duration) duration = parsed.config.duration;
        if (parsed.config?.language) language = parsed.config.language;
        if (parsed.config?.difficulty) difficulty = parsed.config.difficulty;
        if (parsed.candidate?.name) candidateName = parsed.candidate.name;
      } catch(e) {}
    }
    
    setDurationParam(duration);

    startInterview({
      candidate_name: candidateName,
      candidate_email: "candidate@example.com",
      language,
      exam,
      subject,
      difficulty,
      interview_mode: "Normal Interview",
      duration: parseInt(duration) || 20,
      total_questions: 10,
      time_per_question_seconds: 60
    });

  }, [hasInitialized, startInterview]);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !hasInitialized) {
       initSession();
    }
  }, [hasInitialized, initSession]);

  const audioRef = useRef(null);

  useEffect(() => {
    if (interviewState.audioUrl && audioRef.current) {
      // audioUrl from backend is relative (e.g. "/uploads/audio/file.wav")
      // We need to prepend the backend URL so the browser fetches from the right server
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const fullUrl = interviewState.audioUrl.startsWith('http') 
        ? interviewState.audioUrl 
        : `${API_BASE}${interviewState.audioUrl}`;
      
      console.log('Playing audio from:', fullUrl);
      audioRef.current.src = fullUrl;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Playback started
        }).catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [interviewState.audioUrl]);

  const handleManualMicClick = () => {
    if (interviewState.status === "RECORDING") {
      // Currently recording -> stop
      stopRecording();
    } else if (!isAudioPlaying) {
      // Not recording and AI is not speaking -> start recording
      startRecording();
    }
  };

  const handleRestartClick = () => {
    if (confirm("Are you sure you want to restart the interview?")) {
      window.location.reload();
    }
  };

  const handleTimeUp = () => {
    endInterview();
  };

  const displayStatus = isAudioPlaying ? "AI Speaking" : interviewState.status.replace("_", " ");

  const defaultCandidate = { name: "Candidate", exam: "", subject: "", language: "", mode: "Voice" };
  const rawProfile = interviewState.candidateProfile;
  const candidate = rawProfile ? {
    name: rawProfile.name || "Candidate",
    exam: rawProfile.target_exam || "",
    subject: rawProfile.subject || "",
    language: searchParams?.get('language') || "English",
    mode: searchParams?.get('mode') || "Voice",
  } : defaultCandidate;

  const defaultScores = { overall: 0, communication: 0, subjectKnowledge: 0, confidence: 0, teachingSkills: 0 };
  const scores = interviewState.metrics ? {
    overall: Math.round((interviewState.metrics.communication + interviewState.metrics.subject_knowledge + interviewState.metrics.confidence) / 3),
    communication: interviewState.metrics.communication,
    subjectKnowledge: interviewState.metrics.subject_knowledge,
    confidence: interviewState.metrics.confidence,
    teachingSkills: interviewState.metrics.teaching_skill
  } : defaultScores;

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 md:p-6 bg-[#F8FAFC] relative">
      <audio 
        ref={audioRef} 
        className="hidden" 
        onPlay={() => setIsAudioPlaying(true)}
        onEnded={() => setIsAudioPlaying(false)} 
      />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 max-w-[1600px] mx-auto">
        
        {/* Left Column (20%) */}
        <div className="w-full xl:col-span-1 flex flex-col order-2 xl:order-1 h-fit xl:h-[calc(100vh-120px)] xl:sticky xl:top-4 gap-4 pb-4">
          <InterviewTimer durationString={durationParam} onTimeUp={handleTimeUp} />
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <InterviewProgress stages={[{ name: "Interview", status: "in-progress" }]} />
          </div>
          <FloatingVoiceDock 
            isMuted={isMuted} 
            onToggleMute={() => setIsMuted(p => !p)}
            onRestartClick={handleRestartClick}
            onEndClick={() => confirm("Are you sure you want to end the interview?") && (window.location.href = '/')}
          />
          <div className="bg-white p-3 rounded-xl shadow-sm text-center text-xs font-bold mt-2">
             <span className={isConnected ? "text-green-500" : "text-red-500"}>
               {isConnected ? `● Connected (${latency}ms)` : "○ Disconnected"}
             </span>
          </div>
        </div>

        {/* Center Column (60%) */}
        <div className="w-full xl:col-span-3 flex flex-col order-1 xl:order-2 gap-4">
          <InterviewTopBar status={displayStatus} contextUsed={candidate?.strengths || []} />
          
          <MainInteractionCard 
            candidate={candidate} 
            currentQuestion={{ text: interviewState.currentQuestion, difficulty: interviewState.difficulty }} 
            transcript={interviewState.transcript} 
            status={displayStatus} 
            internalState={isAudioPlaying ? "AI_SPEAKING" : interviewState.status}
            onMicClick={handleManualMicClick}
            onPlayAudioFallback={() => {
              if (audioRef.current) audioRef.current.play();
            }}
          />

          <div className="max-h-[300px] overflow-y-auto rounded-[1rem]">
            <ConversationTimeline conversation={[]} />
          </div>
        </div>

        {/* Right Column (20%) */}
        <div className="w-full xl:col-span-1 flex flex-col order-3 h-fit gap-4">
          <CandidateProfile candidate={candidate} />
          
          <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Proctoring Camera</h3>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            </div>
            <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-200 relative aspect-video">
               <WebcamMonitor videoRef={videoRef} status={cameraStatus} stream={cameraStream} retry={() => setCameraStatus("PENDING")} />
            </div>
          </div>

          <LiveScoreCard scores={scores} />
        </div>

      </div>

      {/* Completion Overlay / Report */}
      {interviewState.status === "COMPLETED" && (
        <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 max-w-2xl w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">
              ✓
            </div>
            <h1 className="text-4xl font-bold text-[#00316B] mb-2">Interview Completed</h1>
            <p className="text-gray-500 mb-8 text-lg">Your time is up and the session has successfully concluded.</p>
            
            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Overall Score</p>
                <div className="text-5xl font-black text-[#009FE3]">{scores.overall}%</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center flex flex-col gap-2 justify-center">
                 <div className="flex justify-between items-center text-sm font-bold text-gray-600">
                   <span>Communication</span>
                   <span className="text-[#009FE3]">{scores.communication}%</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-bold text-gray-600">
                   <span>Subject Knowledge</span>
                   <span className="text-[#009FE3]">{scores.subjectKnowledge}%</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-bold text-gray-600">
                   <span>Confidence</span>
                   <span className="text-[#009FE3]">{scores.confidence}%</span>
                 </div>
              </div>
            </div>

            <button 
              onClick={() => window.location.href = '/'}
              className="px-10 py-4 bg-[#009FE3] text-white font-bold rounded-full text-lg shadow-lg hover:bg-blue-600 hover:-translate-y-1 transition-all"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
