export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const validateSetupConfig = (config) => {
  const errors = [];
  if (!config.exam) errors.push("Exam is required.");
  if (!config.subject) errors.push("Subject is required.");
  return errors;
};

export const calculateAccuracy = (correct, totalAttempted) => {
  if (totalAttempted === 0) return 0;
  return Math.round((correct / totalAttempted) * 100);
};
