"use client";

import React, { useState } from 'react';

export default function MemoryContextChip({ contextList }) {
  const [isHovered, setIsHovered] = useState(false);

  // Note: Only visible in dev mode or as a debug tool per requirements
  return (
    <div 
      className="relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold cursor-help border border-purple-100 hover:bg-purple-100 transition-colors">
        <span>🧠</span>
        <span>Context Active</span>
      </div>

      {isHovered && contextList && contextList.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 text-white text-xs p-3 rounded-lg shadow-xl">
          <div className="font-semibold text-gray-300 mb-2 uppercase tracking-wider">Context Used:</div>
          <ul className="space-y-1">
            {contextList.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-purple-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
