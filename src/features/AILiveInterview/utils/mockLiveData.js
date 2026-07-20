export const initialMockData = {
  currentQuestion: "Tell me about yourself.",
  status: "Listening", // "AI Speaking" | "Listening" | "Thinking" | "Generating Next Question" | "Evaluating Answer"
  currentStage: "Introduction",
  stages: [
    { name: "Introduction", status: "current" }, // "completed" | "current" | "upcoming"
    { name: "Motivation", status: "upcoming" },
    { name: "Subject Knowledge", status: "upcoming" },
    { name: "Teaching Skills", status: "upcoming" },
    { name: "Classroom Management", status: "upcoming" },
    { name: "Pedagogy", status: "upcoming" },
    { name: "Current Affairs", status: "upcoming" },
    { name: "Closing", status: "upcoming" }
  ],
  candidate: {
    name: "Candidate",
    education: "Loading...",
    exam: "SSC CGL",
    subject: "Mixed",
    language: "English",
    mode: "Normal Interview"
  },
  scores: {
    communication: 82,
    confidence: 78,
    subjectKnowledge: 74,
    teachingSkills: 0 // Will dynamically update
  },
  conversation: [
    {
      id: "msg-1",
      role: "assistant",
      message: "Welcome to your Live AI Interview. Tell me about yourself.",
      timestamp: "10:00 AM"
    }
  ],
  contextUsed: [
    "Exam: SSC CGL",
    "Mode: Normal Interview",
    "First Question"
  ]
};
