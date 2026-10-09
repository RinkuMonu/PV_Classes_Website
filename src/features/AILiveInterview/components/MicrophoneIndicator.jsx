"use client";

import React from 'react';

export default function MicrophoneIndicator({ status }) {
  // Status: "Listening" | "Recording" | "Processing" | "AI Speaking" | "Evaluating Answer"
  
  const isListening = status === "Listening" || status === "Recording";
  const isProcessing = status === "Processing" || status === "Evaluating Answer" || status === "Thinking";
  const isAI = status === "AI Speaking" || status === "Generating Next Question";

  let icon = "🎤";
  let text = "Tap to Speak";
  let bgClass = "bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer";
  let pulseClass = "";

  if (isListening) {
    icon = "🎤";
    text = "Listening...";
    bgClass = "bg-red-500 text-white shadow-lg shadow-red-200 cursor-pointer";
    pulseClass = "animate-pulse";
  } else if (isProcessing) {
    icon = "⏳";
    text = "Processing...";
    bgClass = "bg-yellow-500 text-white cursor-not-allowed";
    pulseClass = "animate-spin-slow"; // Optional custom class or just standard spin if it's an SVG
  } else if (isAI) {
    icon = "🤖";
    text = "AI is Speaking";
    bgClass = "bg-[#009FE3] text-white cursor-not-allowed shadow-lg shadow-blue-200";
    pulseClass = "animate-pulse";
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
      <button 
        disabled={isProcessing || isAI}
        className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all hover:scale-105 active:scale-95 ${bgClass} ${pulseClass}`}
      >
        {icon}
      </button>
      <span className="mt-4 text-sm font-bold text-gray-600 uppercase tracking-wider">{text}</span>
    </div>
  );
}
