import questionsData from '../data/demoQuestions.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_AI_INTERVIEW_API_URL || 'http://127.0.0.1:8001';

// Helper to shuffle array
const shuffle = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const startInterview = async (config) => {
  try {
    // Generate a unique demo session ID
    const sessionId = 'demo-' + Date.now();
    
    // Select and shuffle questions based on config.numQuestions (default 10)
    const numQuestions = config.numQuestions || 10;
    const shuffledQuestions = shuffle(questionsData).slice(0, numQuestions);
    
    const sessionData = {
      sessionId: sessionId,
      config: { ...config, isDemo: true },
      currentQuestionIndex: 0,
      currentDifficulty: 'Medium',
      score: 0,
      status: 'READY',
      demoQuestions: shuffledQuestions,
      correctCount: 0,
      wrongCount: 0,
      unansweredCount: 0
    };
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(sessionId, JSON.stringify(sessionData));
    }

    return { sessionId, data: sessionData };
  } catch (error) {
    console.error("Start interview error:", error);
    throw error;
  }
};

export const getNextQuestion = async (sessionId) => {
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  const session = JSON.parse(rawData);

  if (session.currentQuestionIndex >= session.config.numQuestions) {
    return { status: 'COMPLETED' };
  }

  try {
    const activeQuestion = session.demoQuestions[session.currentQuestionIndex];
    
    // Map JSON options array to A, B, C, D format
    const optionKeys = ['A', 'B', 'C', 'D'];
    const optionsMap = {};
    
    if (activeQuestion.options && typeof activeQuestion.options[0] === 'object') {
      activeQuestion.options.forEach((opt, index) => {
        const key = opt.key || optionKeys[index];
        optionsMap[key] = {
          english: opt.text_en,
          hindi: opt.text_hi
        };
      });
    } else if (activeQuestion.options) {
      activeQuestion.options.forEach((optText, index) => {
        optionsMap[optionKeys[index]] = {
          english: optText,
          hindi: optText
        };
      });
    }

    const mappedQuestion = {
      id: activeQuestion.id,
      question: activeQuestion.question_en ? {
        english: activeQuestion.question_en,
        hindi: activeQuestion.question_hi
      } : {
        english: activeQuestion.question,
        hindi: activeQuestion.question
      },
      options: optionsMap,
      difficulty: activeQuestion.difficulty,
      time_limit_seconds: session.config.timePerQuestion || 60
    };

    return { status: 'OK', question: mappedQuestion, backendMeta: {} };
  } catch (error) {
    console.error("Fetch question error:", error);
    throw error;
  }
};

export const submitAnswer = async (sessionId, payload) => {
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  const session = JSON.parse(rawData);

  try {
    const activeQuestion = session.demoQuestions[session.currentQuestionIndex];
    
    const optionKeys = ['A', 'B', 'C', 'D'];
    
    // Find the correct option key
    let correctKey = activeQuestion.correctAnswer || 'A';
    if (!activeQuestion.correctAnswer && activeQuestion.answer) {
      activeQuestion.options.forEach((optText, index) => {
        if (optText === activeQuestion.answer) {
          correctKey = optionKeys[index];
        }
      });
    }

    let isCorrect = false;
    if (payload.isTimeout) {
      session.unansweredCount += 1;
    } else {
      isCorrect = (payload.selectedOption === correctKey);
      if (isCorrect) {
        session.score += 10;
        session.correctCount += 1;
      } else {
        session.wrongCount += 1;
      }
    }

    session.currentQuestionIndex += 1;
    sessionStorage.setItem(sessionId, JSON.stringify(session));

    const explanationObj = activeQuestion.explanation_en ? {
      english: activeQuestion.explanation_en,
      hindi: activeQuestion.explanation_hi
    } : {
      english: activeQuestion.explanation,
      hindi: activeQuestion.explanation
    };

    return {
      isCorrect: isCorrect,
      correctOption: correctKey,
      explanation: explanationObj,
      pointsAwarded: isCorrect ? 10 : 0,
      newDifficulty: session.currentDifficulty,
      status: 'OK'
    };
  } catch (error) {
    console.error("Submit answer error:", error);
    throw error;
  }
};

export const getInterviewReport = async (sessionId) => {
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  const report = JSON.parse(rawData);
  
  // Calculate performance level
  const totalAttempted = report.correctCount + report.wrongCount;
  let performanceLevel = 'Needs Improvement';
  if (totalAttempted > 0) {
    const accuracy = (report.correctCount / totalAttempted) * 100;
    if (accuracy >= 90) performanceLevel = 'Excellent';
    else if (accuracy >= 75) performanceLevel = 'Good';
    else if (accuracy >= 50) performanceLevel = 'Average';
  }
  
  report.performanceLevel = performanceLevel;
  
  return report;
};

export const logCameraEvent = async (sessionId, eventPayload) => {
  console.log(`[Demo Backend] Camera event logged for session ${sessionId}:`, eventPayload);
  return { success: true };
};
