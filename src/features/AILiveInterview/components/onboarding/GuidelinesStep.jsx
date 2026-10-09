import React from 'react';

export default function GuidelinesStep({ sessionData, onNext, onBack }) {

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-[#00316B] px-8 py-6 text-white flex items-center gap-4">
        <span className="text-3xl">📘</span>
        <div>
          <h2 className="text-2xl font-bold">Interview Guidelines</h2>
          <p className="text-blue-200 text-sm mt-1">Understand the flow of the AI assessment.</p>
        </div>
      </div>
      
      <div className="p-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-4">How it works</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-[#009FE3] font-bold">1.</span>
                <p className="text-gray-600 text-sm font-medium">The AI Interviewer will greet you and ask the first question.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-[#009FE3] font-bold">2.</span>
                <p className="text-gray-600 text-sm font-medium">Wait until the AI finishes speaking before you start answering.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-[#009FE3] font-bold">3.</span>
                <p className="text-gray-600 text-sm font-medium">Speak naturally. The system will automatically detect when you stop speaking and evaluate your answer.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-[#009FE3] font-bold">4.</span>
                <p className="text-gray-600 text-sm font-medium">Do not interrupt the interviewer. Let the conversation flow smoothly.</p>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col justify-center">
            <h3 className="font-bold text-gray-800 text-sm text-center mb-6 uppercase tracking-wider">Interaction Flow</h3>
            
            <div className="flex flex-col items-center gap-2 relative">
              <div className="bg-white border border-[#00316B] text-[#00316B] px-4 py-2 rounded-lg font-bold shadow-sm z-10 w-48 text-center text-sm">
                AI Asks Question
              </div>
              
              <div className="h-6 w-0.5 bg-gray-300"></div>
              
              <div className="bg-[#009FE3] text-white px-4 py-2 rounded-lg font-bold shadow-sm z-10 w-48 text-center text-sm">
                You Answer
              </div>
              
              <div className="h-6 w-0.5 bg-gray-300"></div>
              
              <div className="bg-white border border-[#00316B] text-[#00316B] px-4 py-2 rounded-lg font-bold shadow-sm z-10 w-48 text-center text-sm">
                AI Evaluates
              </div>
              
              <div className="h-6 w-0.5 bg-gray-300"></div>
              
              <div className="bg-white border border-[#00316B] text-[#00316B] px-4 py-2 rounded-lg font-bold shadow-sm z-10 w-48 text-center text-sm">
                Next Question
              </div>
            </div>
          </div>

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
            onClick={() => onNext()}
            className="px-8 py-3 bg-[#009FE3] hover:bg-blue-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
          >
            I Understand <span>→</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}
