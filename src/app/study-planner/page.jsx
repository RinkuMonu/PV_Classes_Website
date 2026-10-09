"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import StudyPlannerPanel from '../../features/AITutor/components/StudyPlanner/StudyPlannerPanel';

function StudyPlannerContent() {
  const sp = useSearchParams();

  const exam       = sp.get('exam')       || '';
  const difficulty = sp.get('difficulty') || '';
  const subject    = sp.get('subject')    || '';
  const score      = parseInt(sp.get('score')   || '0', 10);
  const correct    = parseInt(sp.get('correct') || '0', 10);
  const total      = parseInt(sp.get('total')   || '0', 10);
  const weakRaw    = sp.get('weak')    || '';
  const strongRaw  = sp.get('strong')  || '';
  const auto       = sp.get('auto') === 'true';

  const accuracy      = total > 0 ? Math.round((correct / total) * 100) : 0;
  const weakSubjects  = weakRaw  ? weakRaw.split(',').filter(Boolean)
    : (subject && accuracy < 50)  ? [subject] : [];
  const strongSubjects = strongRaw ? strongRaw.split(',').filter(Boolean)
    : (subject && accuracy >= 70) ? [subject] : [];

  const interviewRecord = exam ? {
    exam, subject, difficulty: difficulty || 'Beginner',
    strongSubjects, weakSubjects, score, correct, total,
  } : null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex flex-col">
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3
        bg-[#0d1220] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <span className="text-sm font-black text-white tracking-wide">AI Study Planner</span>
        </div>
        {exam && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/30">Exam:</span>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15
              border border-emerald-500/25 px-2 py-0.5 rounded-full">{exam}</span>
            {total > 0 && (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border
                ${accuracy >= 70 ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25'
                : accuracy >= 40 ? 'text-yellow-400 bg-yellow-500/15 border-yellow-500/25'
                :                  'text-red-400 bg-red-500/15 border-red-500/25'}`}>
                {accuracy}% accuracy
              </span>
            )}
          </div>
        )}
        <a href="/ai-mock-interview"
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors">
          ← Back to Interview
        </a>
      </div>

      {/* Main panel */}
      <div className="flex-1 max-w-3xl w-full mx-auto py-6 px-4">
        <div className="h-[calc(100vh-120px)] bg-[#0f1420] rounded-2xl border border-white/6
          shadow-2xl overflow-hidden">
          <StudyPlannerPanel
            interviewRecord={interviewRecord}
            autoGenerate={auto}
          />
        </div>
      </div>
    </div>
  );
}

export default function StudyPlannerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
        <p className="text-white/30 text-sm">Loading…</p>
      </div>
    }>
      <StudyPlannerContent />
    </Suspense>
  );
}
