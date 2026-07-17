import { useEffect } from 'react';

export default function VoiceAnswerInput({ 
  isSupported, 
  isListening, 
  transcript, 
  onStartListening, 
  onStopListening,
  isDisabled 
}) {
  
  if (!isSupported) {
    return (
      <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm border border-yellow-200">
        Voice recognition is not supported in this browser. Please use the click buttons.
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border transition-all ${isListening ? 'border-[#009FE3] bg-blue-50/50 shadow-inner' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="font-bold text-sm text-gray-700">
            {isListening ? 'Listening...' : 'Microphone Paused'}
          </span>
        </div>
        
        <button
          onClick={isListening ? onStopListening : onStartListening}
          disabled={isDisabled}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            isDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
            isListening ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-[#00316B] text-white hover:bg-[#00224d]'
          }`}
        >
          {isListening ? 'Stop Mic' : 'Start Mic'}
        </button>
      </div>
      
      <div className="min-h-[2.5rem] bg-white rounded border border-gray-100 p-2 text-gray-600 text-sm italic break-words flex items-center">
        {transcript ? `"${transcript}"` : <span className="text-gray-400">Say your answer (e.g. "Option A" or "Lock B")...</span>}
      </div>
    </div>
  );
}
