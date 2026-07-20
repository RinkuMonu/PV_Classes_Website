"use client";

import React, { useState } from 'react';

export default function VoiceSettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [voice, setVoice] = useState('female');
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(80);
  const [autoMute, setAutoMute] = useState(false);
  const [noiseCancel, setNoiseCancel] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 id="settings-title" className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">⚙️</span> Voice Settings
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Voice Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">AI Voice</label>
            <div className="flex gap-3">
              <button 
                onClick={() => setVoice('female')}
                className={`flex-1 py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  voice === 'female' ? 'bg-[#00316B] border-[#00316B] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                👩 Female (Default)
              </button>
              <button 
                onClick={() => setVoice('male')}
                className={`flex-1 py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  voice === 'male' ? 'bg-[#00316B] border-[#00316B] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                👨 Male
              </button>
            </div>
          </div>

          {/* Speed & Pitch */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex justify-between text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                <span>Speed</span>
                <span className="text-[#009FE3]">{speed}x</span>
              </label>
              <input 
                type="range" min="0.5" max="2" step="0.1" 
                value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#009FE3]"
              />
            </div>
            <div>
              <label className="flex justify-between text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                <span>Pitch</span>
                <span className="text-[#009FE3]">{pitch}</span>
              </label>
              <input 
                type="range" min="0" max="2" step="0.1" 
                value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#009FE3]"
              />
            </div>
          </div>

          {/* Volume */}
          <div>
            <label className="flex justify-between text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              <span>Volume</span>
              <span className="text-[#009FE3]">{volume}%</span>
            </label>
            <input 
              type="range" min="0" max="100" 
              value={volume} onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#009FE3]"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Noise Cancellation</span>
              <div className={`w-11 h-6 rounded-full transition-colors relative ${noiseCancel ? 'bg-green-500' : 'bg-gray-300'}`}>
                <input type="checkbox" className="sr-only" checked={noiseCancel} onChange={() => setNoiseCancel(!noiseCancel)} />
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${noiseCancel ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </label>
            
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Auto-Mute while AI speaks</span>
              <div className={`w-11 h-6 rounded-full transition-colors relative ${autoMute ? 'bg-green-500' : 'bg-gray-300'}`}>
                <input type="checkbox" className="sr-only" checked={autoMute} onChange={() => setAutoMute(!autoMute)} />
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${autoMute ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </label>
          </div>

        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-[#00316B] text-white hover:bg-blue-900 transition-colors shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
