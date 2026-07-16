import { renderBilingualText } from '../utils/languageHelpers';

export default function AIExplanations({ explanation, languageMode, isCorrect, isTimeout }) {
  if (!explanation) return null;

  return (
    <div className={`mt-6 p-5 rounded-xl border ${isTimeout ? 'border-yellow-200 bg-yellow-50' : (isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50')} animate-in slide-in-from-bottom-4 duration-500`}>
      <h4 className={`font-bold mb-2 flex items-center ${isTimeout ? 'text-yellow-700' : (isCorrect ? 'text-green-700' : 'text-red-700')}`}>
        <span className="mr-2 text-xl">
          {isTimeout ? '⏱️' : (isCorrect ? '✅' : '❌')}
        </span>
        {isTimeout ? (languageMode === 'Hindi' ? 'समय समाप्त' : 'Time Expired') 
          : (isCorrect ? (languageMode === 'Hindi' ? 'बिल्कुल सही जवाब!' : 'Excellent Answer!') 
          : (languageMode === 'Hindi' ? 'गलत जवाब। चलिए समीक्षा करते हैं।' : 'Incorrect. Let\'s review.'))}
      </h4>
      
      <div className="text-gray-800 bg-white/60 p-4 rounded-lg mt-3">
        <h5 className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">
          {languageMode === 'Hindi' ? 'एआई स्पष्टीकरण' : 'AI Explanation'}
        </h5>
        {renderBilingualText(explanation, languageMode)}
      </div>
    </div>
  );
}
