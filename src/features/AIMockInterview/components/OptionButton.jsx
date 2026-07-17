import { renderBilingualText } from '../utils/languageHelpers';

export default function OptionButton({ 
  label, // A, B, C, D
  content, 
  languageMode, 
  isSelected, 
  isLocked, 
  isCorrect, 
  showResult, 
  onSelect 
}) {
  
  let baseClasses = "flex items-center w-full p-4 border-2 rounded-xl text-left transition-all duration-200 min-h-[80px]";
  let colorClasses = "border-gray-200 hover:border-[#009FE3] bg-white hover:bg-blue-50";

  if (isSelected && !isLocked) {
    colorClasses = "border-[#009FE3] bg-blue-50 shadow-md ring-2 ring-blue-200";
  }

  if (showResult) {
    if (isCorrect) {
      colorClasses = "border-green-500 bg-green-50 shadow-sm ring-2 ring-green-200";
    } else if (isSelected && !isCorrect) {
      colorClasses = "border-red-500 bg-red-50 shadow-sm ring-2 ring-red-200";
    } else {
      colorClasses = "border-gray-200 bg-gray-50 opacity-60"; // fade out others
    }
  }

  return (
    <button 
      onClick={onSelect}
      disabled={isLocked || showResult}
      className={`${baseClasses} ${colorClasses} ${isLocked || showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg shrink-0 mr-4 
        ${isSelected || showResult ? 'bg-white shadow' : 'bg-gray-100 text-gray-500'}`}>
        {label}
      </div>
      <div className="flex-1 text-gray-800 text-base md:text-lg">
        {renderBilingualText(content, languageMode)}
      </div>
    </button>
  );
}
