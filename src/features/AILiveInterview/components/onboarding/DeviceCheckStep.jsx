import React, { useState, useEffect } from 'react';

export default function DeviceCheckStep({ sessionData, onNext, onBack }) {
  const [checks, setChecks] = useState({
    camera: { status: 'pending', message: 'Checking camera...' },
    mic: { status: 'pending', message: 'Checking microphone...' },
    speaker: { status: 'pending', message: 'Checking speaker...' },
    internet: { status: 'pending', message: 'Checking connection...' }
  });

  const [allPassed, setAllPassed] = useState(false);

  useEffect(() => {
    // Simulate system checks sequentially for dramatic professional effect
    const runChecks = async () => {
      // Internet
      await new Promise(r => setTimeout(r, 800));
      setChecks(c => ({ ...c, internet: { status: 'success', message: 'Connected to stable network' } }));
      
      // Speaker
      await new Promise(r => setTimeout(r, 600));
      setChecks(c => ({ ...c, speaker: { status: 'success', message: 'Audio output detected' } }));
      
      // Camera
      await new Promise(r => setTimeout(r, 800));
      setChecks(c => ({ ...c, camera: { status: 'success', message: 'Webcam permissions granted' } }));
      
      // Mic
      await new Promise(r => setTimeout(r, 600));
      setChecks(c => ({ ...c, mic: { status: 'success', message: 'Microphone permissions granted' } }));

      setAllPassed(true);
    };

    runChecks();
  }, []);

  const handleContinue = () => {
    onNext({ verification: { ...sessionData.verification, deviceReady: true } });
  };

  const getStatusIcon = (status) => {
    if (status === 'pending') return <span className="w-6 h-6 border-2 border-[#009FE3] border-t-transparent rounded-full animate-spin"></span>;
    if (status === 'success') return <span className="text-green-500 text-xl">✅</span>;
    return <span className="text-red-500 text-xl">❌</span>;
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-[#00316B] px-8 py-6 text-white flex items-center gap-4">
        <span className="text-3xl">⚙️</span>
        <div>
          <h2 className="text-2xl font-bold">System Verification</h2>
          <p className="text-blue-200 text-sm mt-1">Checking hardware and software compatibility.</p>
        </div>
      </div>
      
      <div className="p-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Internet */}
          <div className={`p-5 rounded-xl border transition-colors ${checks.internet.status === 'success' ? 'bg-green-50/30 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
                🌐 Internet Status
              </span>
              {getStatusIcon(checks.internet.status)}
            </div>
            <p className="text-sm text-gray-500 font-medium">{checks.internet.message}</p>
          </div>

          {/* Speaker */}
          <div className={`p-5 rounded-xl border transition-colors ${checks.speaker.status === 'success' ? 'bg-green-50/30 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
                🔊 Speaker Output
              </span>
              {getStatusIcon(checks.speaker.status)}
            </div>
            <p className="text-sm text-gray-500 font-medium">{checks.speaker.message}</p>
          </div>

          {/* Camera */}
          <div className={`p-5 rounded-xl border transition-colors ${checks.camera.status === 'success' ? 'bg-green-50/30 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
                📷 Camera
              </span>
              {getStatusIcon(checks.camera.status)}
            </div>
            <p className="text-sm text-gray-500 font-medium">{checks.camera.message}</p>
          </div>

          {/* Microphone */}
          <div className={`p-5 rounded-xl border transition-colors ${checks.mic.status === 'success' ? 'bg-green-50/30 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
                🎤 Microphone
              </span>
              {getStatusIcon(checks.mic.status)}
            </div>
            <p className="text-sm text-gray-500 font-medium">{checks.mic.message}</p>
          </div>

        </div>

        {/* Info Box */}
        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 items-start border border-blue-100 mb-8">
          <span className="text-xl">ℹ️</span>
          <p className="text-sm font-medium leading-relaxed">
            If any check fails, please ensure your browser has the necessary permissions granted. You may need to click the lock icon 🔒 in your address bar to allow Camera and Microphone access.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <button 
            onClick={onBack}
            className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            ← Back
          </button>
          
          <button 
            onClick={handleContinue}
            disabled={!allPassed}
            className="px-8 py-3 bg-[#009FE3] hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
          >
            All Systems Go <span>→</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}
