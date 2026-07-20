import React, { useState } from 'react';

export default function EnvironmentCheckStep({ sessionData, onNext, onBack }) {
  const [checks, setChecks] = useState({
    quiet: false,
    singlePerson: false,
    lighting: false,
    stable: false
  });

  const allChecked = Object.values(checks).every(v => v === true);

  const toggleCheck = (key) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    onNext({ verification: { ...sessionData.verification, envReady: true } });
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-[#00316B] px-8 py-6 text-white flex items-center gap-4">
        <span className="text-3xl">🏠</span>
        <div>
          <h2 className="text-2xl font-bold">Environment Check</h2>
          <p className="text-blue-200 text-sm mt-1">Please confirm your physical surroundings.</p>
        </div>
      </div>
      
      <div className="p-8">
        
        <p className="text-gray-600 mb-6 font-medium">To ensure a fair and distraction-free assessment, please verify the following conditions are met:</p>

        <div className="space-y-4 mb-8">
          
          <label className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${checks.quiet ? 'bg-blue-50/50 border-[#009FE3]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
            <input 
              type="checkbox" checked={checks.quiet} onChange={() => toggleCheck('quiet')}
              className="w-5 h-5 text-[#009FE3] bg-white border-gray-300 rounded focus:ring-[#009FE3]" 
            />
            <span className="font-bold text-gray-800">I am in a quiet environment without background noise.</span>
          </label>

          <label className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${checks.singlePerson ? 'bg-blue-50/50 border-[#009FE3]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
            <input 
              type="checkbox" checked={checks.singlePerson} onChange={() => toggleCheck('singlePerson')}
              className="w-5 h-5 text-[#009FE3] bg-white border-gray-300 rounded focus:ring-[#009FE3]" 
            />
            <span className="font-bold text-gray-800">I am the only person visible in the camera frame.</span>
          </label>

          <label className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${checks.lighting ? 'bg-blue-50/50 border-[#009FE3]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
            <input 
              type="checkbox" checked={checks.lighting} onChange={() => toggleCheck('lighting')}
              className="w-5 h-5 text-[#009FE3] bg-white border-gray-300 rounded focus:ring-[#009FE3]" 
            />
            <span className="font-bold text-gray-800">My face is clearly lit and visible.</span>
          </label>

          <label className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${checks.stable ? 'bg-blue-50/50 border-[#009FE3]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
            <input 
              type="checkbox" checked={checks.stable} onChange={() => toggleCheck('stable')}
              className="w-5 h-5 text-[#009FE3] bg-white border-gray-300 rounded focus:ring-[#009FE3]" 
            />
            <span className="font-bold text-gray-800">My device is placed on a stable surface.</span>
          </label>

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
            disabled={!allChecked}
            className="px-8 py-3 bg-[#009FE3] hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
          >
            Confirm <span>→</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}
