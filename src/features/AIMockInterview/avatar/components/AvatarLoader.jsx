import React from 'react';

export default function AvatarLoader({ isLoaded }) {
  // If model is loaded, completely remove overlay
  if (isLoaded) return null;
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50 rounded-2xl transition-opacity duration-300">
      <div className="relative flex justify-center items-center mb-6">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00316B]"></div>
        <div className="animate-pulse absolute rounded-full h-10 w-10 bg-[#009FE3]/20"></div>
      </div>
      <h3 className="text-xl font-bold text-[#00316B] mb-2 shadow-sm">Three.js Engine Ready</h3>
      <p className="text-sm font-medium text-gray-500 animate-pulse">Waiting for Human Avatar Asset...</p>
    </div>
  );
}
