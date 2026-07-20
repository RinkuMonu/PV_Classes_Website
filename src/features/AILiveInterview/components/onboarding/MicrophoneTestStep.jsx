import React, { useState, useEffect } from 'react';

export default function MicrophoneTestStep({ sessionData, onNext, onBack }) {
  const [recording, setRecording] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let interval;
    if (recording) {
      // Mock volume level changes
      interval = setInterval(() => {
        setVolume(Math.random() * 100);
      }, 100);

      // Auto stop recording after 3 seconds for mock
      setTimeout(() => {
        setRecording(false);
        setTestComplete(true);
        setVolume(0);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const handleStartRecording = () => {
    setRecording(true);
    setTestComplete(false);
  };

  const handleContinue = () => {
    onNext({ verification: { ...sessionData.verification, micReady: true } });
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-[#00316B] px-8 py-6 text-white flex items-center gap-4">
        <span className="text-3xl">🎙️</span>
        <div>
          <h2 className="text-2xl font-bold">Microphone Test</h2>
          <p className="text-blue-200 text-sm mt-1">Verify that your voice is captured clearly.</p>
        </div>
      </div>
      
      <div className="p-8 flex flex-col items-center">
        
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 w-full max-w-md text-center mb-8">
          <p className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-3">Please Read Aloud</p>
          <h3 className="text-xl font-medium text-gray-800 italic">
            "Hello, this is my interview test."
          </h3>
        </div>

        {/* Mic Control */}
        <button 
          onClick={handleStartRecording}
          disabled={recording}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-md transition-all duration-300 mb-6 relative ${
            recording ? 'bg-red-50 text-red-500 animate-pulse' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-[#009FE3]'
          }`}
        >
          🎤
          {recording && (
            <span className="absolute inset-0 rounded-full border-4 border-red-500/30 animate-ping"></span>
          )}
        </button>
        
        {/* Visualizer */}
        <div className="w-full max-w-xs h-8 bg-gray-100 rounded-full overflow-hidden mb-4 relative">
          <div 
            className="h-full bg-[#009FE3] transition-all duration-100"
            style={{ width: `${volume}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase tracking-widest mix-blend-difference">
            {recording ? 'Recording...' : 'Input Level'}
          </div>
        </div>

        {testComplete && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full font-bold text-sm animate-in zoom-in">
            <span>✅</span> Microphone Quality: Excellent
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-8 pb-8 pt-4 flex justify-between items-center border-t border-gray-100 bg-gray-50/50">
        <button 
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
        >
          ← Back
        </button>
        
        <button 
          onClick={handleContinue}
          disabled={!testComplete}
          className="px-8 py-3 bg-[#009FE3] hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
        >
          Continue <span>→</span>
        </button>
      </div>
    </div>
  );
}
