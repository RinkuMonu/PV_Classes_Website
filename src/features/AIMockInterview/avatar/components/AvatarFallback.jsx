"use client";
import React from 'react';

export default function AvatarFallback({ error }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900 text-white p-6 rounded-xl border border-blue-500/30">
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
        <span className="text-2xl font-bold text-blue-400">👩</span>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-center">Waiting for Human Avatar (.glb)</h3>
      <p className="text-sm text-slate-400 text-center max-w-md">
        Please ensure /models/interviewer.glb is available.
      </p>
    </div>
  );
}
