"use client";

import React from 'react';

export default function CandidateProfile({ candidate }) {
  if (!candidate) return null;

  return (
    <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-700 shadow-sm border border-gray-200">
          {(candidate.name && candidate.name !== "Candidate") ? candidate.name.charAt(0).toUpperCase() : "?"}
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-800 leading-tight">{(candidate.name && candidate.name !== "Candidate") ? candidate.name : "Not Available"}</h3>
          <p className="text-xs text-gray-400 mt-1">Live Session Active</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Target Exam</div>
          <div className="text-xs font-semibold text-gray-700 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100">
            {candidate.exam || "Not Available"} - {candidate.subject || "Not Available"}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Language</div>
            <div className="text-xs font-semibold text-gray-700 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 truncate">
              {candidate.language || "Not Available"}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Mode</div>
            <div className="text-xs font-semibold text-gray-700 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 truncate">
              {candidate.mode || "Not Available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
