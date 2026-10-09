"use client";

import React from 'react';

export default function FloatingVoiceDock({ isMuted, onToggleMute, onRestartClick, onEndClick }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50 p-3 flex flex-row justify-between gap-2 w-full mt-auto">
      
      {/* Mute Button */}
      <button 
        onClick={onToggleMute}
        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 group relative ${
          isMuted ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
        }`}
        aria-label={isMuted ? "Unmute Microphone" : "Mute Microphone"}
      >
        <span className="text-xl mb-0.5">{isMuted ? '🔇' : '🎤'}</span>
        <span className="text-[9px] font-bold uppercase tracking-wider">{isMuted ? 'Muted' : 'Mute'}</span>
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-3 px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
          {isMuted ? "Unmute (M)" : "Mute (M)"}
        </div>
      </button>

      {/* Restart Button */}
      <button 
        onClick={onRestartClick}
        className="w-12 h-12 rounded-xl flex flex-col items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 group relative"
        aria-label="Restart Interview"
      >
        <span className="text-xl mb-0.5">🔄</span>
        <span className="text-[9px] font-bold uppercase tracking-wider">Restart</span>
        
        <div className="absolute bottom-full mb-3 px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
          Restart Interview
        </div>
      </button>


      {/* Divider */}
      <div className="w-px bg-gray-200 h-8 mx-1 my-auto"></div>

      {/* End Button */}
      <button 
        onClick={onEndClick}
        className="w-12 h-12 rounded-xl flex flex-col items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 transition-all hover:scale-105 active:scale-95 group relative"
        aria-label="End Interview"
      >
        <span className="text-xl mb-0.5">🛑</span>
        <span className="text-[9px] font-bold uppercase tracking-wider">End</span>
        
        <div className="absolute bottom-full mb-3 px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
          End Interview (Esc)
        </div>
      </button>

    </div>
  );
}
