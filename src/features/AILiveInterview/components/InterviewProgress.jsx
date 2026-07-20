"use client";

import React from 'react';

export default function InterviewProgress({ stages }) {
  return (
    <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-4 mb-4 relative">
      <h3 className="text-sm font-bold text-[#00316B] mb-4">Interview Progress</h3>
      
      <div className="relative pl-2">
        {/* Continuous vertical line for the stepper */}
        <div className="absolute left-[13px] top-3 bottom-4 w-0.5 bg-gray-200 z-0"></div>

        <div className="space-y-5 relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';
            const isUpcoming = stage.status === 'upcoming';

            return (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Dot */}
                  <div className="flex items-center justify-center w-[10px] h-[10px] rounded-full bg-white z-10 shrink-0 outline outline-4 outline-white">
                    {isCompleted || isCurrent ? (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full border-2 border-green-500"></div>
                    ) : (
                      <div className="w-[10px] h-[10px] bg-white rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>

                  {/* Label */}
                  <span className={`text-[13px] font-medium ${isCurrent ? 'text-[#009FE3] font-bold' : (isCompleted ? 'text-gray-600' : 'text-gray-400')}`}>
                    {stage.name}
                  </span>
                </div>

                {/* Current Chip */}
                {isCurrent && (
                  <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Current
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
