import { LANGUAGE_MODE } from '../constants/interviewConstants';

export const renderBilingualText = (textObj, mode) => {
  if (!textObj) return null;
  
  const { english, hindi } = textObj;

  if (mode === LANGUAGE_MODE.ENGLISH) {
    return <span className="block">{english}</span>;
  }
  
  if (mode === LANGUAGE_MODE.HINDI) {
    return <span className="block font-hind">{hindi}</span>;
  }

  // BOTH mode
  return (
    <div className="flex flex-col gap-1">
      <span className="block text-gray-800">{english}</span>
      <span className="block text-gray-600 font-hind">{hindi}</span>
    </div>
  );
};
