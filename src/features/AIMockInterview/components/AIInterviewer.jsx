import { INTERVIEW_STATUS } from '../../constants/interviewConstants';

export default function AIInterviewer({ status }) {
  // Determine placeholder visuals based on status
  let pulseClass = '';
  let statusText = 'AI Interviewer';
  
  if (status === INTERVIEW_STATUS.SPEAKING) {
    pulseClass = 'animate-pulse bg-[#009FE3]/20';
    statusText = 'AI is speaking...';
  } else if (status === INTERVIEW_STATUS.WAITING) {
    statusText = 'Waiting for your answer...';
  } else if (status === INTERVIEW_STATUS.ANSWER_LOCKED) {
    statusText = 'Evaluating...';
  } else if (status === INTERVIEW_STATUS.TIMEOUT) {
    statusText = 'Time Expired';
  }

  return (
    <div className={`bg-white rounded-lg shadow-inner border border-gray-200 relative aspect-video flex flex-col items-center justify-center p-6 ${pulseClass} transition-colors duration-500`}>
      
      {/* Reusing existing PV avatar styling pattern as requested */}
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full bg-[#00316B] flex items-center justify-center text-white text-3xl shadow-lg z-10 relative">
          PV
        </div>
        {status === INTERVIEW_STATUS.SPEAKING && (
          <div className="absolute inset-0 rounded-full border-4 border-[#009FE3] animate-ping opacity-75"></div>
        )}
      </div>

      <h3 className="text-lg font-bold text-[#00316B]">{statusText}</h3>
      <p className="text-sm text-gray-500 mt-2 text-center max-w-[80%]">
        {status === INTERVIEW_STATUS.WAITING && "Take your time to read the question carefully."}
        {status === INTERVIEW_STATUS.ANSWER_LOCKED && "Analyzing your response..."}
        {status === INTERVIEW_STATUS.TIMEOUT && "Moving to the next question..."}
      </p>

      {/* TODO: Future TTS Audio Element placeholder */}
    </div>
  );
}
