import { useState, useEffect } from 'react';
import OptionButton from './OptionButton';
import LockAnswerModal from './LockAnswerModal';
import AIExplanations from './AIExplanations';
import { renderBilingualText } from '../../utils/languageHelpers';

export default function AdaptiveMCQInterface({ 
  question, 
  languageMode, 
  onAnswerSubmit, 
  onNextQuestion, 
  isTimeout,
  showResultProp,
  resultDataProp
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  
  // These props come back from the server/service after submit
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsModalOpen(false);
    setIsLocked(false);
    setShowResult(false);
    setResultData(null);
  }, [question?.id]);

  // Handle external timeout trigger
  useEffect(() => {
    if (isTimeout && !isLocked && !showResult) {
      setIsLocked(true);
      setIsModalOpen(false);
      handleAutomaticSubmit(null, true);
    }
  }, [isTimeout]);

  const handleOptionClick = (optionKey) => {
    if (isLocked || showResult || isTimeout) return;
    setSelectedOption(optionKey);
  };

  const handleLockClick = () => {
    if (!selectedOption || isLocked) return;
    setIsModalOpen(true);
  };

  const handleConfirmLock = async () => {
    setIsModalOpen(false);
    setIsLocked(true);
    await handleAutomaticSubmit(selectedOption, false);
  };

  const handleAutomaticSubmit = async (optionKey, timeoutFlag) => {
    const result = await onAnswerSubmit(optionKey, timeoutFlag);
    setResultData(result);
    setShowResult(true);
  };

  if (!question) return <div className="p-8 text-center animate-pulse text-gray-500">Loading next question...</div>;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
      
      {/* Question Text */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#00316B] leading-relaxed">
          {renderBilingualText(question.question, languageMode)}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 flex-1">
        {Object.entries(question.options).map(([key, content]) => (
          <OptionButton 
            key={key}
            label={key}
            content={content}
            languageMode={languageMode}
            isSelected={selectedOption === key}
            isLocked={isLocked || isTimeout}
            isCorrect={showResult && resultData?.correctOption === key}
            showResult={showResult}
            onSelect={() => handleOptionClick(key)}
          />
        ))}
      </div>

      {/* Action Area */}
      <div className="mt-auto">
        {!showResult ? (
          <button 
            onClick={handleLockClick}
            disabled={!selectedOption || isLocked}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md
              ${(!selectedOption || isLocked) 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#009FE3] text-white hover:bg-blue-600 hover:shadow-lg active:scale-[0.98]'}`}
          >
            🔒 Lock Answer
          </button>
        ) : (
          <div className="space-y-4">
            <AIExplanations 
              explanation={resultData?.explanation} 
              languageMode={languageMode} 
              isCorrect={resultData?.isCorrect}
              isTimeout={isTimeout}
            />
            
            <button 
              onClick={onNextQuestion}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md bg-[#00316B] text-white hover:bg-[#00224d]"
            >
              Next Question ➡️
            </button>
          </div>
        )}
      </div>

      <LockAnswerModal 
        isOpen={isModalOpen}
        selectedOption={selectedOption}
        onConfirm={handleConfirmLock}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
