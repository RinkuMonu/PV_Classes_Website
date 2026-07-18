import { interviewConfig } from '../config/interviewConfig';
import * as apiClient from './interviewApi';
import { loadQuestions } from '../../../mockInterview/questionLoader';

// ==========================================
// DEMO MODE IMPLEMENTATIONS
// ==========================================

const demoStartInterview = async (config) => {
  try {
    const sessionId = 'demo-' + Date.now();
    const numQuestions = config.numQuestions || 10;
    
    const questions = await loadQuestions(config.exam, config.subject, config.difficulty, numQuestions);
    
    if (questions.length === 0) {
      throw new Error(`No mock questions available yet for ${config.exam} - ${config.subject}.`);
    }
    
    const sessionData = {
      sessionId: sessionId,
      config: { ...config, isDemo: true },
      currentQuestionIndex: 0,
      currentDifficulty: config.difficulty || 'Medium',
      score: 0,
      status: 'READY',
      demoQuestions: questions,
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
    
    if (activeQuestion.options_en && activeQuestion.options_hi) {
      activeQuestion.options_en.forEach((text_en, index) => {
        const key = optionKeys[index];
        optionsMap[key] = {
          english: text_en,
          hindi: activeQuestion.options_hi[index] || text_en
        };
      });
    } else if (activeQuestion.options && typeof activeQuestion.options[0] === 'object') {
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
    
    let correctKey = 'A';
    if (typeof activeQuestion.correctAnswer === 'number') {
      correctKey = optionKeys[activeQuestion.correctAnswer];
    } else if (activeQuestion.correctAnswer) {
      correctKey = activeQuestion.correctAnswer;
    } else if (activeQuestion.answer && activeQuestion.options) {
      activeQuestion.options.forEach((optText, index) => {
        if (optText === activeQuestion.answer) {
          correctKey = optionKeys[index];
        }
      });
    } else if (activeQuestion.answer && activeQuestion.options_en) {
      activeQuestion.options_en.forEach((optText, index) => {
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
