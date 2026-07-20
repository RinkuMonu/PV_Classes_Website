"use client";

import React from 'react';

export default function InterviewControls() {
  return (
    <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-4">
      <h3 className="text-sm font-bold text-[#00316B] mb-5">Controls</h3>
      
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 bg-gray-50 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Mute</span>
        </div>

        <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 bg-gray-50 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Settings</span>
        </div>

        <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 rounded-full border border-red-200 flex items-center justify-center text-red-500 bg-red-50 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">End</span>
        </div>
      </div>
    </div>
  );
}
