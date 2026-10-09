"use client";

import React from 'react';
import AIInterviewer from '../../AIMockInterview/components/AIInterviewer';

export default function MainInteractionCard({ candidate, currentQuestion, transcript, status, internalState, onMicClick, onPlayAudioFallback }) {
  const isListening = status === "Listening" || status === "Recording" || internalState === "LISTENING" || internalState === "RECORDING";
  const isSpeaking = status === "Interviewer Speaking" || status === "AI Speaking" || internalState === "AI_SPEAKING";
  const isUserSpeaking = internalState === "RECORDING";
  const isProcessing = internalState === "PROCESSING";
  
  const questionText = typeof currentQuestion === 'object' ? currentQuestion?.text : currentQuestion;

  return (
    <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 flex flex-col md:flex-row h-auto overflow-hidden">
      
      {/* Left Half: AI Avatar */}
      <div className="w-full md:w-[40%] bg-[#F5F8FC] p-3 relative flex flex-col items-center justify-center border-r border-gray-100">
        <div className="absolute top-4 left-4 bg-[#009FE3] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase shadow-sm z-10">
          Live Interviewer
        </div>
        <div className="w-full max-w-[360px] mt-4">
           <AIInterviewer isSpeaking={isSpeaking} languageMode={candidate?.language} />
        </div>
      </div>

      {/* Right Half: Interaction */}
      <div className="w-full md:w-[60%] p-4 flex flex-col justify-center">
        
        {/* Title */}
        <div className="flex items-center gap-2 mb-3 justify-center">
          <span className="text-xl">🤖</span>
          <span className="text-sm font-bold text-[#009FE3] uppercase tracking-wider">AI Interviewer</span>
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-medium text-gray-800 text-center leading-snug">
            {questionText}
          </h2>
          
          {/* Animated Waveform (CSS only) */}
          <div className="flex items-center justify-center h-8 gap-1 mt-4">
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 rounded-full ${
                  isSpeaking ? 'bg-[#009FE3] animate-waveform' : 
                  isUserSpeaking ? 'bg-green-500 animate-waveform' : 
                  'bg-gray-300 h-1'
                }`}
                style={(isSpeaking || isUserSpeaking) ? { animationDelay: `${(i % 5) * 0.1}s`, height: '10px' } : {}}
              ></div>
            ))}
          </div>
        </div>

        {/* Transcript Box */}
        <div className="w-full border border-red-200/60 rounded-xl p-3 relative bg-[#FAFAFA]/50 mt-auto">
          <div className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live Transcript</span>
            {isListening && (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                Recording
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center pt-2 gap-4">
            {transcript ? (
              <p className="text-gray-700 italic text-center w-full">{transcript}</p>
            ) : (
              <p className="text-gray-400 italic text-center w-full">
                {isSpeaking ? "AI is speaking..." : isProcessing ? "Analyzing answer..." : "Listening to your response..."}
              </p>
            )}

            {/* Large Central Microphone or Play Button */}
            <div className="mt-4 flex flex-col items-center">
              
              {internalState === "AUTOPLAY_BLOCKED" ? (
                <button 
                  onClick={onPlayAudioFallback}
                  className="px-6 py-3 rounded-full bg-[#009FE3] text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-500 hover:-translate-y-1 transition-all animate-bounce"
                >
                  ▶ Click to Hear Question
                </button>
              ) : (
                <>
                  <button 
                    onClick={onMicClick}
                    disabled={isSpeaking || isProcessing}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-md transition-all duration-300 relative ${
                  isSpeaking ? 'bg-gray-200 cursor-not-allowed opacity-50' :
                  isProcessing ? 'bg-yellow-100 text-yellow-600' :
                  internalState === 'RECORDING' ? 'bg-red-50 text-red-500 animate-pulse' :
                  internalState === 'LISTENING' ? 'bg-blue-50 text-[#009FE3] animate-pulse shadow-[0_0_15px_rgba(0,159,227,0.4)]' :
                  'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {isProcessing ? '⏳' : '🎤'}
              </button>
              
              <span className={`text-[10px] font-bold uppercase tracking-wider mt-3 ${
                isSpeaking ? 'text-gray-400' :
                isProcessing ? 'text-yellow-600' :
                internalState === 'RECORDING' ? 'text-red-500' :
                internalState === 'LISTENING' ? 'text-[#009FE3]' :
                'text-gray-400'
              }`}>
                {isSpeaking ? 'AI Speaking' : 
                 isProcessing ? 'Processing' : 
                 internalState === 'RECORDING' ? 'Recording' : 
                 internalState === 'LISTENING' ? 'Tap to Speak' : 
                 'Idle'}
              </span>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
      
      {/* CSS for waveform animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes waveform {
          0% { height: 10px; opacity: 0.5; }
          50% { height: 32px; opacity: 1; }
          100% { height: 10px; opacity: 0.5; }
        }
        .animate-waveform {
          animation: waveform 1s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
