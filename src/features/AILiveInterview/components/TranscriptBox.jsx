"use client";

import React from 'react';

export default function TranscriptBox({ transcript, status }) {
  const isListening = status === "Listening" || status === "Recording";
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Transcript</h3>
        {isListening && (
          <span className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Recording
          </span>
        )}
      </div>
      
      <div className={`w-full bg-gray-50 rounded-lg p-6 min-h-[120px] border border-gray-200 transition-colors ${isListening ? 'border-red-200 bg-red-50/30' : ''}`}>
        {transcript ? (
          <p className="text-gray-800 text-lg leading-relaxed">{transcript}</p>
        ) : (
          <p className="text-gray-400 italic text-center mt-6">
            {isListening ? "Listening to your response..." : "Your transcribed response will appear here..."}
          </p>
        )}
      </div>
    </div>
  );
}
