# PV Classes AI Mock Interview - API Contract (Future Python FastAPI)

This document outlines the API request/response contracts for integrating the isolated Next.js frontend with the future Python FastAPI backend.

## Future Python Backend Responsibilities
- Session Management & Security (Prevent state manipulation).
- Authoritative timer validation (Preventing cheating by manipulating local clocks).
- AI/LLM Question Generation & Selection.
- Adaptive Difficulty computation based on historical performance models.
- AI Explanation Generation for incorrect/correct answers.
- Face Detection / Anti-Cheat log processing and flag creation.
- TTS (Text-to-Speech) Audio streaming for the AI Interviewer.
- Securely handling AI provider API keys.
- Permanent database persistence for history and reports.

---

## 1. Start Interview

**Endpoint:** `POST /api/v1/interviews/start`
**Description:** Initializes a new mock interview session in the database.

**Request Body:**
```json
{
  "config": {
    "exam": "SSC CGL",
    "subject": "General Awareness",
    "language": "Both",
    "voiceLanguage": "English",
    "difficulty": "medium",
    "numQuestions": 15,
    "timePerQuestion": 60,
    "cameraRequired": true
  }
}
```

**Response (200 OK):**
```json
{
  "sessionId": "abc-123-def",
  "status": "READY"
}
```

---

## 2. Get Next Question

**Endpoint:** `GET /api/v1/interviews/{sessionId}/next`
**Description:** Fetches the next adaptive question and starts the authoritative backend timer for the session.

**Response (200 OK):**
```json
{
  "status": "OK",
  "question": {
    "id": "q_987",
    "difficulty": "medium",
    "question": {
      "english": "What is the capital of India?",
      "hindi": "भारत की राजधानी क्या है?"
    },
    "options": {
      "A": { "english": "Mumbai", "hindi": "मुंबई" },
      "B": { "english": "New Delhi", "hindi": "नई दिल्ली" },
      "C": { "english": "Kolkata", "hindi": "कोलकाता" },
      "D": { "english": "Chennai", "hindi": "चेन्नई" }
    }
  }
}
```
*(Note: Correct answer is intentionally omitted to prevent frontend cheating).*

---

## 3. Submit Answer

**Endpoint:** `POST /api/v1/interviews/{sessionId}/answer`
**Description:** Submits the student's locked answer, evaluates it, generates AI explanation, and updates backend adaptive score.

**Request Body:**
```json
{
  "questionId": "q_987",
  "selectedOption": "B",
  "isTimeout": false,
  "timeTakenSec": 14
}
```

**Response (200 OK):**
```json
{
  "isCorrect": true,
  "correctOption": "B",
  "pointsAwarded": 10,
  "newDifficulty": "hard",
  "explanation": {
    "english": "New Delhi has been the capital since 1911.",
    "hindi": "नई दिल्ली 1911 से राजधानी है।"
  },
  "audioUrl": "https://storage.pvclasses.in/tts/q_987_exp.mp3"
}
```

---

## 4. Camera Event (Anti-Cheat)

**Endpoint:** `POST /api/v1/interviews/{sessionId}/camera-event`
**Description:** Logs webcam and browser violation events.

**Request Body:**
```json
{
  "eventType": "FACE_LOST", 
  "timestamp": "2026-07-10T12:00:00Z"
}
```
*(Event types: FACE_LOST, MULTIPLE_FACES, CAMERA_DENIED, TAB_SWITCH)*

**Response (200 OK):**
```json
{
  "success": true
}
```

---

## 5. Get Report

**Endpoint:** `GET /api/v1/interviews/{sessionId}/report`
**Description:** Returns the finalized interview report.

**Response (200 OK):**
```json
{
  "score": 140,
  "accuracy": 80,
  "correctCount": 12,
  "wrongCount": 3,
  "unansweredCount": 0,
  "topicAnalysis": [
    { "topic": "Indian History", "performance": "Strong" },
    { "topic": "Geography", "performance": "Weak" }
  ],
  "aiRecommendation": "Focus on Geography fundamentals before the actual exam."
}
```
