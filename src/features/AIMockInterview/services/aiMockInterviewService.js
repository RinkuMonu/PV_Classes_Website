import { generateSessionId } from '../utils/interviewHelpers';
import { mockQuestions } from '../data/mockQuestions';
import { selectNextQuestion, calculateNextDifficulty } from '../utils/adaptiveDifficulty';

/**
 * AI Mock Interview Service (Phase 1 MVP - Frontend Only)
 * 
 * FUTURE ARCHITECTURE:
 * These functions will later make Axios calls to the Python FastAPI backend.
 * For now, they use local mock behavior and sessionStorage.
 */

// POST /api/v1/interviews/start
export const startInterview = async (config) => {
  const sessionId = generateSessionId();
  
  // Local persistence for Phase 1
  const sessionData = {
    sessionId,
    config,
    currentQuestionIndex: 0,
    currentDifficulty: config.difficulty,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    unansweredCount: 0,
    history: [],
    usedQuestionIds: [],
    correctStreak: 0,
    wrongStreak: 0,
    status: 'READY'
  };
  
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(sessionId, JSON.stringify(sessionData));
  }
  
  return { sessionId, data: sessionData };
};

// GET /api/v1/interviews/{sessionId}/next
export const getNextQuestion = async (sessionId) => {
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  const session = JSON.parse(rawData);

  // Check if we reached the max questions limit
  if (session.currentQuestionIndex >= session.config.numQuestions) {
    return { status: 'COMPLETED' };
  }

  // Find next question based on current difficulty
  const nextQ = selectNextQuestion(
    mockQuestions,
    session.usedQuestionIds,
    session.config.subject,
    session.config.exam,
    session.currentDifficulty
  );

  if (!nextQ) {
    // If no questions left in mock data, force complete
    return { status: 'COMPLETED_NO_MORE_QUESTIONS' };
  }

  return { status: 'OK', question: nextQ };
};

// POST /api/v1/interviews/{sessionId}/answer
export const submitAnswer = async (sessionId, payload) => {
  // payload: { questionId, selectedOption, isTimeout, timeTakenSec }
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  const session = JSON.parse(rawData);
  const question = mockQuestions.find(q => q.id === payload.questionId);
  
  if (!question) throw new Error("Question not found");

  let isCorrect = false;
  let pointsAwarded = 0;

  if (payload.isTimeout) {
    session.unansweredCount += 1;
    session.correctStreak = 0;
    session.wrongStreak = 0; // Timeout doesn't strictly drop difficulty
  } else {
    isCorrect = (payload.selectedOption === question.correctOption);
    if (isCorrect) {
      session.correctCount += 1;
      pointsAwarded = 10;
      session.correctStreak += 1;
      session.wrongStreak = 0;
    } else {
      session.wrongCount += 1;
      session.wrongStreak += 1;
      session.correctStreak = 0;
    }
  }

  session.score += pointsAwarded;
  session.usedQuestionIds.push(payload.questionId);
  
  // Calculate new difficulty based on streak
  session.currentDifficulty = calculateNextDifficulty(
    session.currentDifficulty,
    isCorrect,
    session.correctStreak,
    session.wrongStreak
  );

  session.history.push({
    questionId: payload.questionId,
    selectedOption: payload.selectedOption,
    isCorrect,
    isTimeout: payload.isTimeout,
    timeTakenSec: payload.timeTakenSec
  });

  session.currentQuestionIndex += 1;

  sessionStorage.setItem(sessionId, JSON.stringify(session));

  return {
    isCorrect,
    correctOption: question.correctOption,
    explanation: question.explanation,
    pointsAwarded,
    newDifficulty: session.currentDifficulty
  };
};

// GET /api/v1/interviews/{sessionId}/report
export const getInterviewReport = async (sessionId) => {
  if (typeof window === 'undefined') return null;
  const rawData = sessionStorage.getItem(sessionId);
  if (!rawData) throw new Error("Session not found");
  
  return JSON.parse(rawData);
};

// POST /api/v1/interviews/{sessionId}/camera-event
export const logCameraEvent = async (sessionId, eventPayload) => {
  // Mock endpoint for future "face lost", "multiple faces" events
  console.log(`[Mock Backend] Camera event logged for session ${sessionId}:`, eventPayload);
  return { success: true };
};
