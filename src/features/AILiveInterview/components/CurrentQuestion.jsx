"use client";

import React from 'react';
import MemoryContextChip from './MemoryContextChip';

export default function CurrentQuestion({ question, contextUsed }) {
  if (!question) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center h-full relative">
      {contextUsed && contextUsed.length > 0 && (
        <div className="absolute top-4 right-4">
          <MemoryContextChip contextList={contextUsed} />
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl">🤖</span>
        <span className="text-xs font-bold text-[#009FE3] uppercase tracking-wider">AI Interviewer</span>
      </div>
      
      <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium">
        "{question}"
      </p>
    </div>
  );
}
