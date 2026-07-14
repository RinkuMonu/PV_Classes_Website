"use client";

import { useState, useEffect, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useInterviewSession } from '../../../../features/AIMockInterview/hooks/useInterviewSession';
import { useWebcamMonitor } from '../../../../features/AIMockInterview/hooks/useWebcamMonitor';
import { useInterviewTimer } from '../../../../features/AIMockInterview/hooks/useInterviewTimer';
import { useTextToSpeech } from '../../../../features/AIMockInterview/hooks/useTextToSpeech';
import { useVoiceAnswer } from '../../../../features/AIMockInterview/hooks/useVoiceAnswer';
import { useBrowserMonitoring } from '../../../../features/AIMockInterview/hooks/useBrowserMonitoring';
import { getNextQuestion, submitAnswer } from '../../../../features/AIMockInterview/services/aiMockInterviewService';
import { INTERVIEW_STATUS } from '../../../../features/AIMockInterview/constants/interviewConstants';

import AIInterviewer from '../../../../features/AIMockInterview/components/AIInterviewer';
import WebcamMonitor from '../../../../features/AIMockInterview/components/WebcamMonitor';
import InterviewTimer from '../../../../features/AIMockInterview/components/InterviewTimer';
import InterviewProgress from '../../../../features/AIMockInterview/components/InterviewProgress';
import ScorePanel from '../../../../features/AIMockInterview/components/ScorePanel';
import AdaptiveMCQInterface from '../../../../features/AIMockInterview/components/AdaptiveMCQInterface';

import { useInterviewTracking } from '../../../../components/Hocks/UseInterviewTracking';
import { PostureEyeTracker } from '../../../../components/PostureEyeTracking';
import { CameraPreview } from '../../../../components/CameraPreview';
import { FeedbackBadges } from '../../../../components/FeedbackBadges';

export default function InterviewSessionPage({ params }) {
  const { id: sessionId } = use(params);
  const router = useRouter();

  const {
    posture,
    eyeContact,
    communication,
    questionScores,
    overallPosture,
    overallEye,
    overallCommunication,
    handlePostureUpdate,
    handleEyeContactUpdate,
    startQuestion,
    endQuestion,
  } = useInterviewTracking();

  const { session, loading: sessionLoading } = useInterviewSession(sessionId);
  const [question, setQuestion] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState(INTERVIEW_STATUS.SETUP);
  const [isTimeout, setIsTimeout] = useState(false);
  const hasSpokenIntro = useRef(false);

  const config = session?.config || {};
  const voiceLanguage = config.voiceLanguage || 'English';
  
  const { stream, status: camStatus, error: camError, videoRef, retry: retryCam } = useWebcamMonitor(!!config.cameraRequired);
  
  const { timeLeft, start: startTimer, stop: stopTimer } = useInterviewTimer(config.timePerQuestion || 60, () => {
    setIsTimeout(true);
    setInterviewStatus(INTERVIEW_STATUS.TIMEOUT);
  });

  const { isSpeaking, speakScriptPhase, cancelSpeech } = useTextToSpeech(voiceLanguage);

  const {
    isListening,
    isSupported: isVoiceSupported,
    transcript,
    parsedIntent,
    startListening,
    stopListening,
    resetIntent
  } = useVoiceAnswer(voiceLanguage, isSpeaking, question ? question.options : null); // Auto-pauses STT when TTS speaks

  // Browser Monitoring
  useBrowserMonitoring(sessionId, true);

  // Update AI Interviewer visual state based on TTS/STT hooks
  useEffect(() => {
    if (isSpeaking) {
      setInterviewStatus(INTERVIEW_STATUS.SPEAKING);
    } else if (isListening) {
      setInterviewStatus(INTERVIEW_STATUS.LISTENING);
    } else if (!isSpeaking && !isListening && interviewStatus === INTERVIEW_STATUS.SPEAKING) {
      setInterviewStatus(INTERVIEW_STATUS.IDLE);
    }
  }, [isSpeaking, isListening]);

  // Load first question on mount if session is valid
  useEffect(() => {
    if (!sessionLoading && session) {
      if (session.currentQuestionIndex >= session.config.numQuestions) {
        completeInterview();
        return;
      }
      fetchNextQuestion();
    } else if (!sessionLoading && !session) {
      router.push('/ai-mock-interview');
    }
  }, [sessionLoading, session?.currentQuestionIndex]);

  const completeInterview = async () => {
    await speakScriptPhase('COMPLETED');
    router.push(`/ai-mock-interview/report/${sessionId}`);
  };

  const fetchNextQuestion = async () => {
    try {
      setInterviewStatus(INTERVIEW_STATUS.PROCESSING);
      setIsTimeout(false);
      
      const res = await getNextQuestion(sessionId);
      
      if (res.status === 'COMPLETED' || res.status === 'COMPLETED_NO_MORE_QUESTIONS') {
        completeInterview();
        return;
      }

      setQuestion(res.question);
      startQuestion(session.currentQuestionIndex);
      
      // Orchestrate TTS
      setInterviewStatus(INTERVIEW_STATUS.SPEAKING);
      
      if (!hasSpokenIntro.current && session.currentQuestionIndex === 0) {
        await speakScriptPhase('WELCOME');
        hasSpokenIntro.current = true;
      }
      
      await speakScriptPhase('QUESTION_INTRO');
      await speakScriptPhase('QUESTION_TEXT', res.question.question);
      
      startTimer(config.timePerQuestion || 60);
      setInterviewStatus(INTERVIEW_STATUS.LISTENING);
      
    } catch (err) {
      console.error(err);
      alert("Error fetching question.");
    }
  };

  const handleAnswerSubmit = async (selectedOptionKey, timeoutFlag) => {
    endQuestion();
    stopTimer();
    stopListening(); // Stop voice recognition explicitly upon submit
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
    cancelSpeech();
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

      <PostureEyeTracker 
        videoStream={stream}
        onPostureUpdate={handlePostureUpdate}
        onEyeContactUpdate={handleEyeContactUpdate}
        active={!!stream && camStatus === 'ACTIVE'}
      />
      <CameraPreview 
        videoStream={stream}
        posture={posture}
        eyeContact={eyeContact}
        visible={!!stream && camStatus === 'ACTIVE'}
      />
      <FeedbackBadges 
        posture={posture}
        eyeContact={eyeContact}
        visible={!!stream && camStatus === 'ACTIVE'}
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Camera & AI */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AIInterviewer
            status={interviewStatus}
            questionText={question?.question || ''}
            onSpeakEnd={() => {}}
          />
          
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Behavior Scoreboard</h3>
            <div className="flex flex-col gap-4 mb-4">
               <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                  <p className="text-xs text-blue-500 uppercase font-bold">Overall Posture</p>
                  <p className="text-2xl font-extrabold text-blue-900">{overallPosture}%</p>
               </div>
               <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                  <p className="text-xs text-green-500 uppercase font-bold">Overall Eye Contact</p>
                  <p className="text-2xl font-extrabold text-green-900">{overallEye}%</p>
               </div>
               <div className="bg-purple-50 p-4 rounded-lg flex items-center justify-between">
                  <p className="text-xs text-purple-500 uppercase font-bold">Overall Communication</p>
                  <p className="text-2xl font-extrabold text-purple-900">{overallCommunication}%</p>
               </div>
            </div>
            {questionScores.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Question-wise Breakdown</h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {questionScores.map((score, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border border-gray-100">
                       <span className="font-semibold text-gray-600">Q{score.questionIndex + 1}</span>
                       <div className="flex gap-4">
                         <span className="text-blue-600 font-medium">Posture: {score.avgPosture}%</span>
                         <span className="text-green-600 font-medium">Eye: {score.avgEye}%</span>
                         <span className="text-purple-600 font-medium">Comm: {score.avgComm}%</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            // Voice Props
            isVoiceSupported={isVoiceSupported}
            isListening={isListening}
            transcript={transcript}
            parsedIntent={parsedIntent}
            onStartListening={startListening}
            onStopListening={stopListening}
            resetIntent={resetIntent}
            speakScriptPhase={speakScriptPhase}
          />
          
        </div>
      </div>
    </div>
  );
}
