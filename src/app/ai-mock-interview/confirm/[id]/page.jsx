"use client";

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useInterviewSession } from '../../../../features/AIMockInterview/hooks/useInterviewSession';
import '../../../../features/AIMockInterview/src/index.css';

export default function ConfirmInterviewPage({ params }) {
  const { id: sessionId } = use(params);
  const router = useRouter();
  const { session, loading } = useInterviewSession(sessionId);

  const handleStart = () => {
    router.push(`/ai-mock-interview/session/${sessionId}`);
  };

  if (loading || !session) {
    return (
      <div className="start-screen">
        <p>Loading your interview session...</p>
      </div>
    );
  }

  const config = session.config || {};

  return (
    <div className="start-screen">
      <h1 className="text-center">PV Classes AI Mock Interview</h1>
      
      <div className="mb-8 text-center text-lg bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/10 max-w-lg w-full">
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="opacity-70">Target Exam:</div>
          <div className="font-semibold">{config.exam}</div>
          
          <div className="opacity-70">Subject:</div>
          <div className="font-semibold">{config.subject}</div>
          
          <div className="opacity-70">Questions:</div>
          <div className="font-semibold">{config.numQuestions} Questions</div>
          
          <div className="opacity-70">Time Limit:</div>
          <div className="font-semibold">{config.timePerQuestion}s / question</div>
        </div>
      </div>
      
      <p className="mb-8 opacity-80 flex items-center gap-2 text-center max-w-md">
        <span>📸</span> Make sure your camera is positioned correctly and <span>🎤</span> speak clearly into your microphone.
      </p>
      
      <button className="start-btn" onClick={handleStart}>
        Start Interview
      </button>
    </div>
  );
}
