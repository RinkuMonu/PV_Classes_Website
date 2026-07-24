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

  // Prevent dynamic import errors for new/unpopulated exams
  if (exam === "KVS/NVS Special Educator") {
    const fallbackDifficulty = difficulty ?
      (difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()) as "Easy" | "Medium" | "Hard" :
      "Medium";

    return Array.from({ length: numQuestions }).map((_, i) => ({
      id: i + 1,
      question_en: `Sample question ${i + 1} for ${subject}?`,
      question_hi: `${subject} के लिए नमूना प्रश्न ${i + 1}?`,
      options_en: ["Option A", "Option B", "Option C", "Option D"],
      options_hi: ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
      correctAnswer: 0,
      explanation_en: "This is a placeholder explanation for demo mode.",
      explanation_hi: "यह डेमो मोड के लिए एक प्लेसहोल्डर स्पष्टीकरण है।",
      difficulty: fallbackDifficulty
    }));
  }

  let questions: interviewQuestion[] = [];

  try {
    // Dynamic import to lazy-load the static question chunk
    // Note: The bundler will create chunks for all matching files in the directory
    const questionModule = await import(`./questions/${examPath}/${subjectPath}.ts`);
    questions = questionModule.questions;
  } catch (error) {
    console.warn(`Static questions not found for ${examPath}/${subjectPath}. Falling back to dummy questions.`);
    const fallbackDifficulty = difficulty ?
      (difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()) as "Easy" | "Medium" | "Hard" :
      "Medium";


    return Array.from({ length: numQuestions }).map((_, i) => ({
      id: i + 1,
      question_en: `Sample question ${i + 1} for ${subject}?`,
      question_hi: `${subject} के लिए नमूना प्रश्न ${i + 1}?`,
      options_en: ["Option A", "Option B", "Option C", "Option D"],
      options_hi: ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
      correctAnswer: 0,
      explanation_en: "This is a placeholder explanation for demo mode.",
      explanation_hi: "यह डेमो मोड के लिए एक प्लेसहोल्डर स्पष्टीकरण है।",
      difficulty: fallbackDifficulty
    }));
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
