"use client";

import React from 'react';

export default function InterviewStatus({ status }) {
  // E.g. AI Speaking, Listening, Thinking, Generating Next Question, Evaluating Answer

  let colorClass = "text-gray-500 border-gray-200 bg-gray-50";
  let pulse = false;

  if (status === "Listening" || status === "Recording") {
    colorClass = "text-red-500 border-red-200 bg-red-50";
    pulse = true;
  } else if (status === "Thinking" || status === "Evaluating Answer" || status === "Generating Next Question") {
    colorClass = "text-yellow-600 border-yellow-200 bg-yellow-50";
    pulse = true;
  } else if (status === "AI Speaking") {
    colorClass = "text-[#009FE3] border-blue-200 bg-blue-50";
  }

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold uppercase tracking-wider ${colorClass}`}>
      {pulse && <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>}
      {status || "Ready"}
    </div>
  );
}
