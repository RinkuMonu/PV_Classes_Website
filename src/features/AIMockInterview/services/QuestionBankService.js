import { interviewConfig } from '../config/interviewConfig';

const API_BASE_URL = interviewConfig.API_BASE_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:8000` : "http://localhost:8000");

/**
 * Fetches AI-generated mock interview questions from the backend Question Bank API.
 * 
 * @param {string} exam The target exam
 * @param {string} subject The target subject
 * @param {string} difficulty The difficulty level (Easy, Medium, Hard)
 * @param {string} language The language (English, Hindi)
 * @param {number} count The number of questions to fetch
 * @returns {Promise<Array>} List of generated questions mapping directly to the frontend's expected format
 */
export const fetchBackendQuestions = async (exam, subject, difficulty, language, count) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/mock-interview/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        exam,
        subject,
        difficulty,
        language,
        count
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch questions from backend: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate we got an array
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Backend returned an empty or invalid question list.");
    }
    
    return data;
  } catch (error) {
    console.error("[QuestionBankService] fetchBackendQuestions error:", error);
    throw error;
  }
};
