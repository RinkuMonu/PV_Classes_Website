"use client";

import { useState } from 'react';
import MCQSetup from './MCQSetup';
import LiveInterviewSetup from '../../AILiveInterview/components/LiveInterviewSetup';
import { GraduationCap, X, Sparkles } from 'lucide-react';
import DoubtSolverLayout from '../../AITutor/components/DoubtSolver/index';

export default function InterviewSetupTabs() {
  const [activeTab, setActiveTab] = useState('MCQ'); // 'MCQ' | 'LIVE'
  const [isDoubtSolverOpen, setIsDoubtSolverOpen] = useState(false);

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

      {/* ── Floating Action Button — AI Doubt Solver only ── */}
      <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-40">
        <button
          onClick={() => setIsDoubtSolverOpen(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-[#00316B] to-[#009FE3] text-white px-5 py-3.5 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20"
          title="Ask AI Doubt Solver"
        >
          <Sparkles className="animate-pulse text-yellow-300" size={22} />
          <span className="font-bold text-sm tracking-wide">AI Doubt Solver</span>
        </button>
      </div>

      {/* ── Doubt Solver Modal ── */}
      {isDoubtSolverOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-[#00316B]" size={24} />
                <h2 className="text-lg font-bold text-[#00316B]">AI Doubt Solver</h2>
              </div>
              <button
                onClick={() => setIsDoubtSolverOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <DoubtSolverLayout isModal={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
