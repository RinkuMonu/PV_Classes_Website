import { interviewConfig } from '../config/interviewConfig';

const API_BASE_URL = interviewConfig.API_BASE_URL;

// Helper for generic API calls
const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
};

// Map bilingual fields safely
const mapBilingual = (en, hi, fallback = '') => ({
  english: en || fallback,
  hindi: hi || en || fallback
});

// Map question from backend format to frontend format
const mapQuestionData = (backendQ) => {
  if (!backendQ) return null;
  
  // Try to parse options, fallback to empty
  const optionKeys = ['A', 'B', 'C', 'D'];
  const optionsMap = {};
  
  if (Array.isArray(backendQ.options)) {
    backendQ.options.forEach((opt, idx) => {
      const key = opt.key || opt.id || optionKeys[idx];
      const en = opt.text?.en || opt.text_en || opt.english || opt;
      const hi = opt.text?.hi || opt.text_hi || opt.hindi || opt;
      optionsMap[key] = mapBilingual(en, hi);
    });
  } else if (typeof backendQ.options === 'object') {
    Object.entries(backendQ.options).forEach(([key, opt]) => {
      optionsMap[key] = typeof opt === 'string' 
        ? mapBilingual(opt, opt) 
        : mapBilingual(opt.text_en || opt.english, opt.text_hi || opt.hindi);
    });
  } else {
    // Fallback if backend doesn't provide options immediately (unexpected)
    optionKeys.forEach(k => { optionsMap[k] = mapBilingual('Option ' + k, 'विकल्प ' + k); });
  }

  return {
    id: backendQ.id || backendQ.question_id || Date.now(),
    question: mapBilingual(
      backendQ.question_text?.en || backendQ.question_en || backendQ.english || backendQ.question, 
      backendQ.question_text?.hi || backendQ.question_hi || backendQ.hindi || backendQ.question
    ),
    options: optionsMap,
    difficulty: backendQ.difficulty || 'Medium',
    time_limit_seconds: backendQ.time_limit_seconds || backendQ.timePerQuestion || 60
  };
};

export const startInterview = async (config) => {
  const data = await fetchApi('/api/v1/interviews/start', {
    method: 'POST',
    body: JSON.stringify(config)
  });
  
  // Backend should return { sessionId: '...', data: {...} }
  // We adapt if it returns differently
  return {
    sessionId: data.sessionId || data.id,
    data: data.sessionData || data
  };
};

export const getNextQuestion = async (sessionId) => {
  const data = await fetchApi(`/api/v1/interviews/${sessionId}/next`);
  
  if (data.status === 'COMPLETED' || data.status === 'COMPLETED_NO_MORE_QUESTIONS') {
    return { status: 'COMPLETED' };
  }
  
  return {
    status: 'OK',
    question: mapQuestionData(data.question || data),
    backendMeta: data.meta || {}
  };
};

export const submitAnswer = async (sessionId, payload) => {
  const data = await fetchApi(`/api/v1/interviews/${sessionId}/answer`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  
  return {
    isCorrect: !!data.isCorrect,
    correctOption: data.correctOption || data.correct_option || 'A',
    explanation: mapBilingual(
      data.explanation?.en || data.explanation_en || data.explanation, 
      data.explanation?.hi || data.explanation_hi || data.explanation
    ),
    pointsAwarded: data.pointsAwarded || data.points_awarded || (data.isCorrect ? 10 : 0),
    newDifficulty: data.newDifficulty || data.new_difficulty || 'Medium',
    status: 'OK'
  };
};

export const getInterviewReport = async (sessionId) => {
  const data = await fetchApi(`/api/v1/interviews/${sessionId}/report`);
  
  // Ensure we have a performance level
  if (!data.performanceLevel) {
    const total = (data.correctCount || 0) + (data.wrongCount || 0);
    let level = 'Needs Improvement';
    if (total > 0) {
      const acc = ((data.correctCount || 0) / total) * 100;
      if (acc >= 90) level = 'Excellent';
      else if (acc >= 75) level = 'Good';
      else if (acc >= 50) level = 'Average';
    }
    data.performanceLevel = level;
  }
  
  return data;
};

export const logCameraEvent = async (sessionId, eventPayload) => {
  try {
    await fetchApi(`/api/v1/interviews/${sessionId}/camera-event`, {
      method: 'POST',
      body: JSON.stringify(eventPayload)
    });
    return { success: true };
  } catch (e) {
    // Non-critical, just fail silently
    return { success: false };
  }
};
