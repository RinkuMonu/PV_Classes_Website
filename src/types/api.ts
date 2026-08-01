export interface CandidateProfile {
  name: string;
  education?: string;
  target_exam?: string;
  subject?: string;
  motivation?: string;
  strengths?: string[];
  weaknesses?: string[];
  communication_level?: string;
  confidence_level?: string;
  inconsistencies?: string[];
}

export interface LiveInterviewStartRequest {
  candidate_name?: string;
  candidate_email?: string;
  language: string;
  exam: string;
  subject: string;
  difficulty: string;
  interview_mode?: string;
  duration?: number;
  total_questions?: number;
  time_per_question_seconds?: number;
}

export interface LiveInterviewStartResponse {
  session_id: string;
  status: string;
  first_question: string;
  current_stage: string;
  audio_url?: string;
  candidate: {
    name: string;
    email?: string;
    exam: string;
    subject: string;
    language: string;
    mode: string;
    difficulty: string;
    duration: number;
  };
  stages: Array<{ name: string; status: string }>;
}

export interface InterviewMetrics {
  communication: number;
  confidence: number;
  subject_knowledge: number;
  teaching_skill: number;
  clarity: number;
  consistency: number;
}

export interface LiveInterviewAnswerRequest {
  session_id: string;
  answer_text: string;
  timing?: any;
}

export interface LiveInterviewAnswerResponse {
  session_id: string;
  next_question: string;
  current_stage: string;
  current_difficulty: string;
  candidate_profile: CandidateProfile;
  metrics: InterviewMetrics;
  conversation_length: number;
  audio_url?: string;
}

export interface VoiceStateResponse {
  voice_state: string;
  transcript: string;
  next_question?: string;
  audio_url?: string;
  metrics?: InterviewMetrics;
  profile?: CandidateProfile;
  conversation?: any[];
  error?: { message: string };
  status?: string;
}

export interface WebSocketEvent {
  type: string;
  payload: any;
}
