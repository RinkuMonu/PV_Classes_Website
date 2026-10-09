export const interviewConfig = {
  MODE: process.env.NEXT_PUBLIC_INTERVIEW_MODE || 'demo', // 'api' or 'demo'
  API_BASE_URL: process.env.NEXT_PUBLIC_AI_INTERVIEW_API_URL || 'http://127.0.0.1:8000'
};
