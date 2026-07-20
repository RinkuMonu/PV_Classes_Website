"use client";

import { useState } from 'react';
import MCQSetup from './MCQSetup';
import LiveInterviewSetup from '../../AILiveInterview/components/LiveInterviewSetup';

export default function InterviewSetupTabs() {
  const [activeTab, setActiveTab] = useState('MCQ'); // 'MCQ' | 'LIVE'

  return (
    <div className="w-full">
      {/* Tabs Container */}
      <div className="max-w-2xl mx-auto mb-6 flex rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <button
          onClick={() => setActiveTab('MCQ')}
          className={`flex-1 py-4 text-center font-semibold text-lg transition-colors ${
            activeTab === 'MCQ'
              ? 'bg-[#00316B] text-white'
              : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          MCQ Mock Interview
        </button>
        <button
          onClick={() => setActiveTab('LIVE')}
          className={`flex-1 py-4 text-center font-semibold text-lg transition-colors ${
            activeTab === 'LIVE'
              ? 'bg-[#009FE3] text-white'
              : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          AI Live Interview
        </button>
      </div>

      {/* Render Active Setup */}
      {activeTab === 'MCQ' && <MCQSetup />}
      {activeTab === 'LIVE' && <LiveInterviewSetup />}
    </div>
  );
}
