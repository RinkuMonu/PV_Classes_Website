export interface InterviewQuestion {
  id: number;
  question_en: string;
  question_hi: string;
  options_en: string[];
  options_hi: string[];
  correctAnswer: number;
  explanation_en: string;
  explanation_hi: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

