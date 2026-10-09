"use client";

import React, { useState, useEffect } from 'react';

export default function InterviewTimer({ durationString, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(15 * 60 + 15); // Default for mockup

  useEffect(() => {
    if (durationString) {
      const mins = parseInt(String(durationString).split(' ')[0]) || 20;
      setTimeLeft(mins * 60);
    }
  }, [durationString]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-3 xl:p-4 flex flex-wrap justify-center xl:justify-between items-center gap-3 h-auto mb-4">
      <div className="flex items-center gap-1.5">
        <span className="text-gray-500 text-base">⏱️</span>
        <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Remaining:</span>
        <span className="text-base sm:text-lg font-bold text-[#00316B]">
          {formatTime(timeLeft)}
        </span>
      </div>
      
      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
        <span className="font-bold text-gray-500 uppercase tracking-wider">Question:</span>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-bold whitespace-nowrap border border-gray-200/60">
          1 / Dynamic
        </span>
      </div>
    </div>
  );
}
