import { InterviewQuestion } from "./config/types";
import { DIFFICULTY } from "../features/AIMockInterview/constants/interviewConstants";

const sanitizeForPath = (str: string) => {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_$/, "");
};

const getExamPath = (examName: string) => {
  const parts = examName.toLowerCase().split(" ");
  if (parts.length >= 2) {
    return `${parts[0]}/${parts[1]}`;
  }
  return sanitizeForPath(examName);
};

export const loadQuestions = async (
  exam: string,
  subject: string,
  difficulty: string,
  numQuestions: number
): Promise<InterviewQuestion[]> => {
  const examPath = getExamPath(exam);
  const subjectPath = sanitizeForPath(subject);

  let questions: InterviewQuestion[] = [];

  try {
    // Dynamic import to lazy-load the static question chunk
    // Note: The bundler will create chunks for all matching files in the directory
    const module = await import(`./questions/${examPath}/${subjectPath}.ts`);
    questions = module.questions;
  } catch (error) {
    console.error(`Failed to load questions for ${examPath}/${subjectPath}`, error);
    // Fallback if the static file hasn't been created yet by the user
    return [];
  }

  // Filter by difficulty if provided (Easy, Medium, Hard)
  // Our interview constants uses 'Easy', 'Medium', 'Hard'
  let filteredQuestions = questions;
  
  if (difficulty) {
    const diffCapitalized = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
    const diffMatch = questions.filter(q => q.difficulty === diffCapitalized);
    if (diffMatch.length > 0) {
      filteredQuestions = diffMatch;
    }
    // If no questions match the specific difficulty, fallback to all questions
  }

  // Shuffle the questions
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);

  // Take the required amount
  return shuffled.slice(0, numQuestions);
};
