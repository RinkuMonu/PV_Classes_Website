import React from 'react';

export default function AvatarStatus({ statusText, glowColor, isModelLoaded }) {
  // Professional HUD overlay for rendering status
  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20 pointer-events-none">
      
      {/* Left side: Engine Status HUD */}
      <div className="flex flex-col gap-1.5 opacity-80 backdrop-blur-md bg-white/40 p-2.5 rounded-lg border border-white/50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
          <span className="text-xs font-semibold text-gray-700 tracking-wider">Three.js Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
          <span className="text-xs font-semibold text-gray-700 tracking-wider">Render Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isModelLoaded ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-orange-400 animate-pulse'}`}></div>
          <span className="text-xs font-semibold text-gray-700 tracking-wider">Avatar Ready {isModelLoaded ? '' : '(Pending)'}</span>
        </div>
      </div>

      {/* Right side: Interview Context Status */}
      <div className={`px-5 py-2.5 rounded-full bg-white/90 shadow-lg backdrop-blur-md border-2 ${glowColor} transition-all duration-300`}>
        <span className="text-sm font-bold text-[#00316B] uppercase tracking-widest">{statusText}</span>
      </div>
      
    </div>
  );
}
