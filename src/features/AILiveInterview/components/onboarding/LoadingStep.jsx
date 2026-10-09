import React, { useEffect, useState } from 'react';

export default function LoadingStep({ sessionData, onNext }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Secure Session...');

  useEffect(() => {
    // 4 second loading sequence
    const sequence = [
      { p: 20, s: 'Loading AI Interviewer Engine...', t: 500 },
      { p: 45, s: 'Generating First Question...', t: 1500 },
      { p: 70, s: 'Connecting Voice Engine...', t: 2500 },
      { p: 90, s: 'Preparing Evaluation System...', t: 3200 },
      { p: 100, s: 'Entering Interview Room...', t: 4000 }
    ];

    sequence.forEach(item => {
      setTimeout(() => {
        setProgress(item.p);
        setStatus(item.s);
      }, item.t);
    });

    // Auto next after 4.5 seconds
    const timer = setTimeout(() => {
      onNext(); // This will trigger the redirect in OnboardingWizard
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-[1.5rem] shadow-xl border border-gray-100 overflow-hidden text-center p-12 max-w-md mx-auto w-full animate-in zoom-in-95 duration-500">
      
      <div className="w-24 h-24 mx-auto mb-8 relative">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#009FE3] rounded-full border-t-transparent animate-spin"></div>
        
        {/* Inner static logo or icon */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          🤖
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#00316B] mb-2">Preparing Interview</h2>
      <p className="text-gray-500 font-medium h-6 animate-pulse">{status}</p>
      
      <div className="mt-8 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-[#009FE3] h-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
    </div>
  );
}
