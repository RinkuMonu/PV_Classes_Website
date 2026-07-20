import React, { useState, useEffect } from 'react';

export default function PracticeQuestionStep({ sessionData, onNext, onBack }) {
  const [stage, setStage] = useState('waiting'); // waiting -> speaking -> listening -> evaluating -> complete
  
  useEffect(() => {
    // Sequence
    const runPractice = async () => {
      setStage('speaking');
      await new Promise(r => setTimeout(r, 2000));
      setStage('listening');
      await new Promise(r => setTimeout(r, 4000)); // Simulate user answering
      setStage('evaluating');
      await new Promise(r => setTimeout(r, 2000));
      setStage('complete');
    };
    
    // Auto start the flow when the component loads, or we can use a button.
    // Let's use a button to start it.
  }, []);

  const startPractice = async () => {
    setStage('speaking');
    await new Promise(r => setTimeout(r, 2000));
    setStage('listening');
    
    // In a real scenario, this would use speech recognition.
    // For this mock, we just wait 4 seconds.
    setTimeout(async () => {
      setStage('evaluating');
      await new Promise(r => setTimeout(r, 2000));
      setStage('complete');
    }, 4000);
  };

  const handleContinue = () => {
    onNext({ verification: { ...sessionData.verification, practiceCompleted: true } });
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-[#00316B] px-8 py-6 text-white flex items-center gap-4">
        <span className="text-3xl">🎯</span>
        <div>
          <h2 className="text-2xl font-bold">Practice Question</h2>
          <p className="text-blue-200 text-sm mt-1">An unscored warm-up to ensure your setup is perfect.</p>
        </div>
      </div>
      
      <div className="p-8 flex flex-col items-center">
        
        {stage === 'waiting' && (
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4 border-blue-100">
              💬
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Ready for a quick test?</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
              The AI will ask you a simple question: "Please introduce yourself." Answer it naturally. This is NOT scored.
            </p>
            <button 
              onClick={startPractice}
              className="px-6 py-2.5 bg-[#00316B] text-white rounded-lg font-bold shadow-sm hover:bg-blue-900 transition-colors"
            >
              Start Practice Round
            </button>
          </div>
        )}

        {stage === 'speaking' && (
          <div className="text-center w-full max-w-md animate-in zoom-in duration-300">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#009FE3] overflow-hidden relative">
              <img src="/placeholder-avatar.png" alt="AI" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#009FE3]/20"></div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#009FE3] animate-pulse"></span>
              <span className="text-sm font-bold text-[#009FE3] uppercase tracking-wider">AI is speaking...</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-gray-800 font-medium italic">"Please introduce yourself."</p>
            </div>
          </div>
        )}

        {stage === 'listening' && (
          <div className="text-center w-full max-w-md animate-in zoom-in duration-300">
            <div className="w-24 h-24 rounded-full bg-blue-50 mx-auto mb-4 border-4 border-[#009FE3] flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(0,159,227,0.3)] animate-pulse">
              🎤
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Your turn to speak</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Answer the question naturally...</p>
          </div>
        )}

        {stage === 'evaluating' && (
          <div className="text-center w-full max-w-md animate-in zoom-in duration-300">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#00316B] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="font-bold text-[#00316B] text-lg uppercase tracking-wider">Evaluating Audio...</h3>
            <p className="text-gray-500 text-sm">Processing speech recognition data</p>
          </div>
        )}

        {stage === 'complete' && (
          <div className="text-center w-full max-w-md animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-green-500">
              ✅
            </div>
            <h3 className="font-bold text-green-600 text-xl mb-2">Practice Complete!</h3>
            <p className="text-gray-700 font-medium bg-gray-50 p-4 border border-gray-200 rounded-xl">
              Your audio was captured perfectly. You are now ready for the actual interview.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-8 pb-8 pt-4 flex justify-between items-center border-t border-gray-100 bg-gray-50/50">
        <button 
          onClick={onBack}
          disabled={stage !== 'waiting' && stage !== 'complete'}
          className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          ← Back
        </button>
        
        <button 
          onClick={handleContinue}
          disabled={stage !== 'complete'}
          className="px-8 py-3 bg-[#009FE3] hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
        >
          Enter Interview Room <span>→</span>
        </button>
      </div>
    </div>
  );
}
