import React, { useState } from 'react';

export default function TermsStep({ sessionData, onNext, onBack }) {
  const [accepted, setAccepted] = useState(sessionData.verification.termsAccepted);

  const handleContinue = () => {
    onNext({ verification: { ...sessionData.verification, termsAccepted: true } });
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-[#00316B] px-8 py-6 text-white flex items-center gap-4">
        <span className="text-3xl">📜</span>
        <div>
          <h2 className="text-2xl font-bold">Interview Instructions & Declaration</h2>
          <p className="text-blue-200 text-sm mt-1">Please read all instructions carefully.</p>
        </div>
      </div>
      
      <div className="p-8">
        
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-[#009FE3] text-lg">✅</span>
              <p className="text-gray-700 leading-relaxed font-medium">Keep your face visible throughout the interview. Ensure you are in a well-lit room.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#009FE3] text-lg">✅</span>
              <p className="text-gray-700 leading-relaxed font-medium">Do not switch browser tabs or open other applications during the live session.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#009FE3] text-lg">✅</span>
              <p className="text-gray-700 leading-relaxed font-medium">Ensure a stable internet connection before proceeding to the next steps.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#009FE3] text-lg">✅</span>
              <p className="text-gray-700 leading-relaxed font-medium">Speak clearly and loudly. Do not use headphones unless specifically instructed.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#009FE3] text-lg">✅</span>
              <p className="text-gray-700 leading-relaxed font-medium">Camera and microphone permissions are mandatory for the AI evaluation system.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#009FE3] text-lg">✅</span>
              <p className="text-gray-700 leading-relaxed font-medium">The AI will evaluate communication skills, subject knowledge, and confidence in real-time.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-[#009FE3] text-lg">✅</span>
              <p className="text-gray-700 leading-relaxed font-medium">This mock interview may be recorded for generating your final evaluation report.</p>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <label className="flex items-start gap-4 cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="pt-1">
              <input 
                type="checkbox" 
                checked={accepted} 
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-6 h-6 text-[#009FE3] bg-gray-100 border-gray-300 rounded focus:ring-[#009FE3] focus:ring-2 cursor-pointer" 
              />
            </div>
            <div>
              <span className="font-bold text-gray-800 text-lg">Candidate Declaration</span>
              <p className="text-gray-500 text-sm mt-1">I have read and agree to all the instructions mentioned above. I understand that violating these rules may lead to disqualification from the mock assessment.</p>
            </div>
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
            disabled={!accepted}
            className="px-8 py-3 bg-[#009FE3] hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
          >
            Agree & Continue <span>→</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}
