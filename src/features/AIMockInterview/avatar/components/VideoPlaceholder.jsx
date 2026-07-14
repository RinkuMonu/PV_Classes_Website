import React from 'react';

export default function VideoPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0F172A] to-[#001E42] text-white rounded-2xl p-8 text-center shadow-inner overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent animate-pulse"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-6xl mb-4 filter drop-shadow-lg animate-bounce duration-[2000ms]">👩</div>
        <h3 className="text-2xl font-bold mb-2 tracking-wide text-blue-50">AI Interviewer</h3>
        <p className="text-md text-blue-200/80 mb-6 font-medium">Waiting for interviewer.mp4</p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-sm text-gray-400 mb-1">Place file here</p>
          <code className="text-xs font-mono text-[#009FE3] bg-[#001E42] px-2 py-1 rounded">public/videos/avatar/</code>
        </div>
      </div>
    </div>
  );
}
