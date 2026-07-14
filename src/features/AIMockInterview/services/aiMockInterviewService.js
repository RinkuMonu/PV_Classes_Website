import questionsData from '../data/demoQuestions.json';
import { interviewConfig } from '../config/interviewConfig';
import * as apiClient from './interviewApi';

// Helper to shuffle array for demo mode
const shuffle = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// ==========================================
// DEMO MODE IMPLEMENTATIONS
// ==========================================

const demoStartInterview = async (config) => {
  try {
    const sessionId = 'demo-' + Date.now();
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
    console.error("Demo Start interview error:", error);
    throw error;
  }
};

const demoGetNextQuestion = async (sessionId) => {
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  const session = JSON.parse(rawData);

  if (session.currentQuestionIndex >= session.config.numQuestions) {
    return { status: 'COMPLETED' };
  }

  try {
    const activeQuestion = session.demoQuestions[session.currentQuestionIndex];
    
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
    console.error("Demo Fetch question error:", error);
    throw error;
  }
};

const demoSubmitAnswer = async (sessionId, payload) => {
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  const session = JSON.parse(rawData);

  try {
    const activeQuestion = session.demoQuestions[session.currentQuestionIndex];
    const optionKeys = ['A', 'B', 'C', 'D'];
    
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
    console.error("Demo Submit answer error:", error);
    throw error;
  }
};

const demoGetInterviewReport = async (sessionId) => {
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  const report = JSON.parse(rawData);
  
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

const demoLogCameraEvent = async (sessionId, eventPayload) => {
  console.log(`[Demo Backend] Camera event logged for session ${sessionId}:`, eventPayload);
  return { success: true };
};

// ==========================================
// EXPORTED FACADE (Handles Routing to API vs Demo)
// ==========================================

export const startInterview = async (config) => {
  if (interviewConfig.MODE === 'api') {
    try {
      return await apiClient.startInterview(config);
    } catch (e) {
      console.warn("FastAPI startInterview failed. Falling back to Demo Mode.", e);
    }
  }
  return await demoStartInterview(config);
};

export const getNextQuestion = async (sessionId) => {
  if (interviewConfig.MODE === 'api' && !sessionId.startsWith('demo-')) {
    try {
      return await apiClient.getNextQuestion(sessionId);
    } catch (e) {
      console.warn("FastAPI getNextQuestion failed. Cannot fallback safely mid-session.", e);
      throw e;
    }
  }
  return await demoGetNextQuestion(sessionId);
};

export const submitAnswer = async (sessionId, payload) => {
  if (interviewConfig.MODE === 'api' && !sessionId.startsWith('demo-')) {
    try {
      return await apiClient.submitAnswer(sessionId, payload);
    } catch (e) {
      console.warn("FastAPI submitAnswer failed.", e);
      throw e;
    }
  }
  return await demoSubmitAnswer(sessionId, payload);
};

export const getInterviewReport = async (sessionId) => {
  if (interviewConfig.MODE === 'api' && !sessionId.startsWith('demo-')) {
    try {
      return await apiClient.getInterviewReport(sessionId);
    } catch (e) {
      console.warn("FastAPI getInterviewReport failed.", e);
      throw e;
    }
  }
  return await demoGetInterviewReport(sessionId);
};

export const logCameraEvent = async (sessionId, eventPayload) => {
  if (interviewConfig.MODE === 'api' && !sessionId.startsWith('demo-')) {
    return await apiClient.logCameraEvent(sessionId, eventPayload);
  }
  return await demoLogCameraEvent(sessionId, eventPayload);
};
