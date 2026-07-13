import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DIFFICULTY, LANGUAGE_MODE } from '../../constants/interviewConstants';
import { startInterview } from '../../services/aiMockInterviewService';
import { validateSetupConfig } from '../../utils/interviewHelpers';

export default function InterviewSetup() {
  const router = useRouter();
  
  const [config, setConfig] = useState({
    exam: 'SSC CGL',
    subject: 'General Awareness',
    language: LANGUAGE_MODE.BOTH,
    voiceLanguage: 'English',
    difficulty: DIFFICULTY.MEDIUM,
    numQuestions: 10,
    timePerQuestion: 60,
    cameraRequired: true
  });
  
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    const validationErrors = validateSetupConfig(config);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      const { sessionId } = await startInterview(config);
      router.push(`/ai-mock-interview/session/${sessionId}`);
    } catch (err) {
      setErrors([err.message || 'Failed to start interview']);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-10">
      <h1 className="text-3xl font-bold text-center text-[#00316B] mb-8">AI-Powered Mock Interview Setup</h1>
      
      {errors.length > 0 && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          <ul className="list-disc pl-5">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Exam</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00316B] outline-none"
            value={config.exam}
            onChange={e => setConfig({...config, exam: e.target.value})}
          >
            <option>SSC CGL</option>
            <option>Railway NTPC</option>
            <option>Banking</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00316B] outline-none"
            value={config.subject}
            onChange={e => setConfig({...config, subject: e.target.value})}
          >
            <option>General Awareness</option>
            <option>Quantitative Aptitude</option>
            <option>Computer Awareness</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Display Language</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00316B] outline-none"
            value={config.language}
            onChange={e => setConfig({...config, language: e.target.value})}
          >
            <option value={LANGUAGE_MODE.ENGLISH}>English Only</option>
            <option value={LANGUAGE_MODE.HINDI}>Hindi Only</option>
            <option value={LANGUAGE_MODE.BOTH}>Both (Bilingual)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty (Starting)</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00316B] outline-none"
            value={config.difficulty}
            onChange={e => setConfig({...config, difficulty: e.target.value})}
          >
            <option value={DIFFICULTY.EASY}>Easy</option>
            <option value={DIFFICULTY.MEDIUM}>Medium</option>
            <option value={DIFFICULTY.HARD}>Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Time Per Question</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00316B] outline-none"
            value={config.timePerQuestion}
            onChange={e => setConfig({...config, timePerQuestion: parseInt(e.target.value)})}
          >
            <option value={30}>30 Seconds</option>
            <option value={60}>60 Seconds</option>
            <option value={90}>90 Seconds</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Questions</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00316B] outline-none"
            value={config.numQuestions}
            onChange={e => setConfig({...config, numQuestions: parseInt(e.target.value)})}
          >
            <option value={5}>5 Questions (Demo)</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
            <option value={20}>20 Questions</option>
          </select>
        </div>
      </div>

      <div className="flex items-center mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <input 
          type="checkbox" 
          id="camera" 
          checked={config.cameraRequired}
          onChange={e => setConfig({...config, cameraRequired: e.target.checked})}
          className="w-5 h-5 text-[#00316B] rounded focus:ring-[#00316B]"
        />
        <label htmlFor="camera" className="ml-3 font-medium text-gray-700 cursor-pointer">
          Require Camera Monitoring (Anti-cheat)
        </label>
      </div>

      <button 
        onClick={handleStart}
        disabled={loading}
        className="w-full bg-[#00316B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#00224d] transition-colors disabled:opacity-70 flex justify-center items-center"
      >
        {loading ? (
          <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "Start AI Mock Interview"
        )}
      </button>
    </div>
  );
}
