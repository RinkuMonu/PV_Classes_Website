import React, { useMemo } from 'react';
import { INTERVIEW_STATUS } from '../../constants/interviewConstants';
import AvatarCanvas from './AvatarCanvas';

export default function HumanAvatarStage({ status, isCorrect = null }) {

  // 1. Determine HUD Status and Colors
  const { borderClass, glowClass, statusText, showSpinner } = useMemo(() => {
    if (isCorrect === true) {
      return { borderClass: 'border-green-500', glowClass: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]', statusText: 'Correct Answer!', showSpinner: false };
    }
    if (isCorrect === false) {
      return { borderClass: 'border-red-400', glowClass: 'shadow-[0_0_20px_rgba(248,113,113,0.2)]', statusText: 'Incorrect', showSpinner: false };
    }

    switch (status) {
      case INTERVIEW_STATUS.IDLE:
      case INTERVIEW_STATUS.SETUP:
        return { borderClass: 'border-blue-200', glowClass: 'shadow-lg', statusText: 'Ready...', showSpinner: false };
      case INTERVIEW_STATUS.LISTENING:
        return { borderClass: 'border-blue-300', glowClass: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]', statusText: '🎤 Listening...', showSpinner: false };
      case INTERVIEW_STATUS.WAITING:
        return { borderClass: 'border-blue-300', glowClass: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]', statusText: 'Waiting for Candidate', showSpinner: false };
      case INTERVIEW_STATUS.SPEAKING:
        return { borderClass: 'border-[#009FE3]', glowClass: 'shadow-[0_0_25px_rgba(0,159,227,0.4)]', statusText: '🟢 AI Speaking...', showSpinner: false };
      case INTERVIEW_STATUS.PROCESSING:
      case INTERVIEW_STATUS.ANSWER_LOCKED:
        return { borderClass: 'border-indigo-400', glowClass: 'shadow-[0_0_20px_rgba(99,102,241,0.3)]', statusText: '🧠 Evaluating...', showSpinner: true };
      case INTERVIEW_STATUS.TIMEOUT:
        return { borderClass: 'border-gray-300', glowClass: 'shadow-sm', statusText: '⌛ Time Expired', showSpinner: false };
      default:
        return { borderClass: 'border-blue-200', glowClass: 'shadow-sm', statusText: 'Preparing Interview...', showSpinner: false };
    }
  }, [status, isCorrect]);

  return (
    <div className="flex flex-col w-full p-5 bg-white rounded-2xl shadow-sm border border-blue-50/50">

      {/* TOP: Professional Title & Online Badge */}
      <div className="flex justify-between items-center mb-5 px-1">
        <h2 className="text-[17px] font-bold text-[#00316B] tracking-tight">
          AI Interview Coach
        </h2>
        <div className="flex items-center gap-2 bg-[#F0F7FF] px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[11px] font-bold text-[#00316B] uppercase tracking-widest">Online</span>
        </div>
      </div>

      {/* CENTER: Large Human Interviewer Area (4:3 3D Canvas Container) */}
      <div className={`relative w-full aspect-[4/3] min-h-[300px] rounded-xl overflow-hidden bg-[#0F172A] border-4 transition-all duration-500 ${borderClass} ${glowClass}`}>
        <AvatarCanvas status={status} />
      </div>

      {/* BOTTOM: Interview Status Badge */}
      <div className="flex justify-center mt-6 mb-1">
        <div className={`px-8 py-2.5 rounded-full bg-white shadow-md border border-gray-100 transition-all duration-300 ${glowClass} flex items-center justify-center gap-2`}>
          {showSpinner && (
            <div className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          )}
          <span className="text-[13px] font-bold text-[#00316B] uppercase tracking-widest">{statusText}</span>
        </div>
      </div>

    </div>
  );
}
