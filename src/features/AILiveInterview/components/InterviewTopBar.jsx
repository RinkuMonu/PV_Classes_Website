"use client";

import React from 'react';
import MemoryContextChip from './MemoryContextChip';

export default function InterviewTopBar({ status, contextUsed }) {
  let colorClass = "text-gray-500 bg-gray-50";
  let pulse = false;
  let statusText = "Ready";

  if (status === "Listening" || status === "Recording") {
    colorClass = "text-red-500 bg-red-50/50";
    pulse = true;
    statusText = "Listening";
  } else if (status === "Thinking" || status === "Evaluating Answer" || status === "Generating Next Question") {
    colorClass = "text-yellow-600 bg-yellow-50/50";
    pulse = true;
    statusText = "Thinking";
  } else if (status === "AI Speaking") {
    colorClass = "text-[#009FE3] bg-blue-50/50";
    statusText = "Speaking";
  }

  return (
    <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 h-auto py-3 px-6 flex justify-center items-center relative">
      
      {/* Center Status */}
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider ${colorClass}`}>
        {pulse ? (
          <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
        ) : (
          <span className="w-2 h-2 rounded-full bg-current"></span>
        )}
        {statusText}
      </div>

      {/* Right Context Chip */}
      <div className="absolute right-6">
        <MemoryContextChip contextList={contextUsed} />
      </div>

    </div>
  );
}
