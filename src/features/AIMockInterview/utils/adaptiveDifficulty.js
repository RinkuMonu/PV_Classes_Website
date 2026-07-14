import { DIFFICULTY } from '../constants/interviewConstants';

/**
 * Calculates the next difficulty based on consecutive right/wrong answers.
 * Phase 1: Simple transparent rule-based adaptive logic.
 */
export const calculateNextDifficulty = (currentDifficulty, isCorrect, correctStreak, wrongStreak) => {
  if (isCorrect) {
    // Correct answer -> check streak
    if (correctStreak + 1 >= 2) {
      if (currentDifficulty === DIFFICULTY.EASY) return DIFFICULTY.MEDIUM;
      if (currentDifficulty === DIFFICULTY.MEDIUM) return DIFFICULTY.HARD;
    }
  } else {
    // Wrong answer -> check streak
    if (wrongStreak + 1 >= 2) {
      if (currentDifficulty === DIFFICULTY.HARD) return DIFFICULTY.MEDIUM;
      if (currentDifficulty === DIFFICULTY.MEDIUM) return DIFFICULTY.EASY;
    }
  }
  return currentDifficulty; // No change
};

/**
 * Selects the next question that matches subject/exam and the new difficulty.
 * If none found, tries to fallback to any available difficulty for that topic.
 */
export const selectNextQuestion = (allQuestions, usedIds, subject, exam, targetDifficulty) => {
  // Try finding exact match
  let candidates = allQuestions.filter(q => 
    !usedIds.includes(q.id) &&
    q.subject === subject &&
    q.difficulty === targetDifficulty
  );

  // Fallback 1: Any difficulty for that subject
  if (candidates.length === 0) {
    candidates = allQuestions.filter(q => 
      !usedIds.includes(q.id) &&
      q.subject === subject
    );
  }

  // Fallback 2: Any question at all that hasn't been used
  if (candidates.length === 0) {
    candidates = allQuestions.filter(q => !usedIds.includes(q.id));
  }

  if (candidates.length === 0) return null; // No more questions

  // Return a random candidate
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
};
