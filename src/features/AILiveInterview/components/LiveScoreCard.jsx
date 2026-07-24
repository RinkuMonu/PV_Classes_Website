"use client";

import React from 'react';

export default function LiveScoreCard({ scores }) {
  if (!scores) return null;

  const scoreItems = [
    { label: 'Communication', value: scores.communication, colorText: 'text-green-500', bg: 'bg-green-500' },
    { label: 'Confidence', value: scores.confidence, colorText: 'text-yellow-500', bg: 'bg-yellow-500' },
    { label: 'Subject Knowledge', value: scores.subjectKnowledge, colorText: 'text-orange-500', bg: 'bg-orange-500' },
    { label: 'Teaching Skills', value: scores.teachingSkills, colorText: 'text-blue-500', bg: 'bg-blue-500' }
  ];

  return (
    <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-4 mb-4">
      <h3 className="text-sm font-bold text-[#00316B] mb-5">Live Performance</h3>
      
      <div className="space-y-5">
        {scoreItems.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[13px] font-bold text-gray-800">{item.label}</span>
              <span className={`text-[13px] font-bold ${item.colorText}`}>
                {item.value > 0 ? `${item.value}%` : '--'}
              </span>
            </div>
            {/* Extremely rounded bars */}
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.bg} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${item.value > 0 ? item.value : 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
