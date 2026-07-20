"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DIFFICULTY, LANGUAGE_MODE } from '../../AIMockInterview/constants/interviewConstants';
import { EXAMS } from '../../../mockInterview/config/exams';
import { SUBJECT_MAPPING } from '../../../mockInterview/config/subjectMapping';

export default function LiveInterviewSetup() {
  const router = useRouter();

  const getFocusOptions = (examName) => {
    if (!examName) return ['Subject Knowledge', 'Mixed'];
    const examLower = examName.toLowerCase();
    
    if (examLower.includes('ssc')) {
      return ['Subject Knowledge', 'Current Affairs', 'General Awareness', 'Mixed'];
    } else if (examLower.includes('prt')) {
      return ['Teaching Skills', 'Pedagogy', 'Classroom Management', 'Subject Knowledge', 'Mixed'];
    } else if (examLower.includes('tgt')) {
      return ['Subject Knowledge', 'Teaching Methodology', 'Pedagogy', 'Classroom Management', 'Mixed'];
    } else if (examLower.includes('pgt')) {
      return ['Advanced Subject Knowledge', 'Teaching Methodology', 'Practical Concepts', 'Pedagogy', 'Mixed'];
    }
    // Default fallback for any other exams (like DSSSB, UPSC, Banking, etc)
    return ['Subject Knowledge', 'Teaching Skills', 'Pedagogy', 'Classroom Management', 'Mixed'];
  };

  const initialExam = EXAMS[0];
  const initialFocusOptions = getFocusOptions(initialExam);
  
  const [subjectsList, setSubjectsList] = useState(SUBJECT_MAPPING[initialExam] || []);

  const [config, setConfig] = useState({
    exam: initialExam,
    subject: subjectsList[0] || '',
    language: LANGUAGE_MODE.HINDI,       // Interview language default
    voiceLanguage: LANGUAGE_MODE.HINDI,  // AI Interviewer Voice language
    difficulty: DIFFICULTY.MEDIUM,
    interviewMode: 'Normal Interview',
    duration: '20 Minutes',
    interviewFocus: initialFocusOptions[0],
    questionDepth: 'Moderate',
    cameraRequired: true
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!config.exam || !config.subject) {
      setErrors(["Please select both Target Exam and Subject."]);
      return;
    }

    setLoading(true);
    try {
      // For now, no backend integration. Just route to the placeholder session page.
      const query = new URLSearchParams({
        exam: config.exam,
        subject: config.subject,
        mode: config.interviewMode,
        duration: config.duration,
        focus: config.interviewFocus,
        depth: config.questionDepth
      }).toString();
      
      router.push(`/ai-live-interview/onboarding?${query}`);
    } catch (err) {
      setErrors([err.message || 'Failed to start live interview']);
      setLoading(false);
    }
  };

  const currentFocusOptions = getFocusOptions(config.exam);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-10">
      <h1 className="text-3xl font-bold text-center text-[#009FE3] mb-8">
        AI Live Interview Setup
      </h1>

      {errors.length > 0 && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          <ul className="list-disc pl-5">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Target Exam */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Exam</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.exam}
            onChange={e => {
              const newExam = e.target.value;
              const newSubjects = [...(SUBJECT_MAPPING[newExam] || [])];
              const newFocusOptions = getFocusOptions(newExam);
              
              setSubjectsList(newSubjects);
              
              setConfig({ 
                ...config, 
                exam: newExam, 
                subject: newSubjects[0] || '',
                interviewFocus: newFocusOptions[0]
              });
            }}
          >
            {EXAMS.map(exam => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.subject}
            onChange={e => setConfig({ ...config, subject: e.target.value })}
          >
            {subjectsList.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Interview Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Interview Language</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.language}
            onChange={e => setConfig({ ...config, language: e.target.value })}
          >
            <option value={LANGUAGE_MODE.HINDI}>Hindi (हिन्दी)</option>
            <option value={LANGUAGE_MODE.ENGLISH}>English</option>
            <option value={LANGUAGE_MODE.BOTH}>Bilingual</option>
          </select>
        </div>

        {/* AI Voice Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            AI Interviewer Voice Language
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.voiceLanguage}
            onChange={e => setConfig({ ...config, voiceLanguage: e.target.value })}
          >
            <option value={LANGUAGE_MODE.HINDI}>Hindi (हिन्दी)</option>
            <option value={LANGUAGE_MODE.ENGLISH}>English</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.difficulty}
            onChange={e => setConfig({ ...config, difficulty: e.target.value })}
          >
            <option value={DIFFICULTY.EASY}>Easy</option>
            <option value={DIFFICULTY.MEDIUM}>Medium</option>
            <option value={DIFFICULTY.HARD}>Hard</option>
          </select>
        </div>

        {/* Interview Mode */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Interview Mode
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.interviewMode}
            onChange={e => setConfig({ ...config, interviewMode: e.target.value })}
          >
            <option value="Normal Interview">Normal Interview</option>
            <option value="Personality Assessment">Personality Assessment</option>
            <option value="Viva Mode">Viva Mode</option>
          </select>
        </div>

        {/* Interview Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Interview Duration
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.duration}
            onChange={e => setConfig({ ...config, duration: e.target.value })}
          >
            <option value="10 Minutes">10 Minutes</option>
            <option value="20 Minutes">20 Minutes</option>
            <option value="30 Minutes">30 Minutes</option>
            <option value="45 Minutes">45 Minutes</option>
            <option value="60 Minutes">60 Minutes</option>
          </select>
        </div>

        {/* Interview Focus */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Interview Focus
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.interviewFocus}
            onChange={e => setConfig({ ...config, interviewFocus: e.target.value })}
          >
            {currentFocusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Question Depth */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Question Depth
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] outline-none"
            value={config.questionDepth}
            onChange={e => setConfig({ ...config, questionDepth: e.target.value })}
          >
            <option value="Basic">Basic (Short questions)</option>
            <option value="Moderate">Moderate (Moderate explanations)</option>
            <option value="Advanced">Advanced (Deep follow-up questions)</option>
          </select>
        </div>

      </div>

      {/* Camera monitoring */}
      <div className="flex items-center mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <input
          type="checkbox"
          id="cameraLive"
          checked={config.cameraRequired}
          onChange={e => setConfig({ ...config, cameraRequired: e.target.checked })}
          className="w-5 h-5 text-[#009FE3] rounded focus:ring-[#009FE3]"
        />
        <label htmlFor="cameraLive" className="ml-3 font-medium text-gray-700 cursor-pointer">
          Require Camera Monitoring (Anti-cheat)
        </label>
      </div>

      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full bg-[#009FE3] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors disabled:opacity-70 flex justify-center items-center shadow-md hover:shadow-lg"
      >
        {loading ? (
          <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          'Start AI Live Interview'
        )}
      </button>
    </div>
  );
}
