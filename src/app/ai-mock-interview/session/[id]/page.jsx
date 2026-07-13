"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useInterviewSession } from '../../../../features/AIMockInterview/hooks/useInterviewSession';
import { useWebcamMonitor } from '../../../../features/AIMockInterview/hooks/useWebcamMonitor';
import { useInterviewTimer } from '../../../../features/AIMockInterview/hooks/useInterviewTimer';
import { getNextQuestion, submitAnswer } from '../../../../features/AIMockInterview/services/aiMockInterviewService';
import { INTERVIEW_STATUS } from '../../../../features/AIMockInterview/constants/interviewConstants';

import AIInterviewer from '../../../../features/AIMockInterview/components/AIInterviewer';
import WebcamMonitor from '../../../../features/AIMockInterview/components/WebcamMonitor';
import InterviewTimer from '../../../../features/AIMockInterview/components/InterviewTimer';
import InterviewProgress from '../../../../features/AIMockInterview/components/InterviewProgress';
import ScorePanel from '../../../../features/AIMockInterview/components/ScorePanel';
import AdaptiveMCQInterface from '../../../../features/AIMockInterview/components/AdaptiveMCQInterface';

export default function InterviewSessionPage({ params }) {
  // Fix for Next.js 15: Unwrapping params correctly
  const { id: sessionId } = use(params);
  const router = useRouter();

  const { session, loading: sessionLoading } = useInterviewSession(sessionId);
  const [question, setQuestion] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState(INTERVIEW_STATUS.SETUP);
  const [isTimeout, setIsTimeout] = useState(false);

  // Initialize hooks conditionally later, but React requires unconditional hooks
  const config = session?.config || {};
  
  const { stream, status: camStatus, error: camError, videoRef, retry: retryCam } = useWebcamMonitor(!!config.cameraRequired);
  
  const { timeLeft, start: startTimer, stop: stopTimer } = useInterviewTimer(config.timePerQuestion || 60, () => {
    setIsTimeout(true);
    setInterviewStatus(INTERVIEW_STATUS.WAITING);
  });

  // Load first question on mount if session is valid
  useEffect(() => {
    if (!sessionLoading && session) {
      if (session.currentQuestionIndex >= session.config.numQuestions) {
        router.push(`/ai-mock-interview/report/${sessionId}`);
        return;
      }
      fetchNextQuestion();
    } else if (!sessionLoading && !session) {
      // Invalid session, go back to setup
      router.push('/ai-mock-interview');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLoading, session?.currentQuestionIndex]);

  const fetchNextQuestion = async () => {
    try {
      setInterviewStatus(INTERVIEW_STATUS.WAITING);
      setIsTimeout(false);
      
      const res = await getNextQuestion(sessionId);
      
      if (res.status === 'COMPLETED' || res.status === 'COMPLETED_NO_MORE_QUESTIONS') {
        router.push(`/ai-mock-interview/report/${sessionId}`);
        return;
      }

      setQuestion(res.question);
      startTimer(config.timePerQuestion || 60);
      setInterviewStatus(INTERVIEW_STATUS.WAITING);
    } catch (err) {
      console.error(err);
      alert("Error fetching question.");
    }
  };

  const handleAnswerSubmit = async (selectedOptionKey, timeoutFlag) => {
    stopTimer();
    setInterviewStatus(INTERVIEW_STATUS.ANSWER_LOCKED);
    
    try {
      const timeTaken = (config.timePerQuestion || 60) - timeLeft;
      
      const result = await submitAnswer(sessionId, {
        questionId: question.id,
        selectedOption: selectedOptionKey,
        isTimeout: timeoutFlag,
        timeTakenSec: timeTaken
      });

      return result;
    } catch (err) {
      console.error("Failed to submit answer", err);
      return null;
    }
  };

  const handleNextQuestion = () => {
    // Session state will update across renders, but triggering reload directly is safe for MVP
    window.location.reload(); 
  };

  if (sessionLoading || !session) return <div className="min-h-screen flex items-center justify-center">Loading Session...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-[#00316B] text-white py-4 px-6 shadow-md mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">PV Classes AI Mock Interview</h1>
          <div className="text-sm bg-white/20 px-3 py-1 rounded-full">Session: {sessionId.substring(0, 8)}...</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Camera & AI */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AIInterviewer status={interviewStatus} />
          
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Monitoring</h3>
            <WebcamMonitor 
              stream={stream} 
              status={camStatus} 
              videoRef={videoRef} 
              error={camError}
              retry={retryCam}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 text-center">Time Remaining</h3>
             <InterviewTimer timeLeft={timeLeft} totalTime={config.timePerQuestion || 60} />
          </div>
        </div>

        {/* RIGHT COLUMN: MCQ Interface */}
        <div className="lg:col-span-8 flex flex-col">
          
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100 mb-6">
            <InterviewProgress 
              current={session.currentQuestionIndex + 1} 
              total={config.numQuestions} 
            />
            
            <ScorePanel 
              score={session.score} 
              difficulty={session.currentDifficulty} 
            />
          </div>

          <AdaptiveMCQInterface 
            question={question}
            languageMode={config.language}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
            isTimeout={isTimeout}
          />
          
        </div>
      </div>
    </div>
  );
}
