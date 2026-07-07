"use client";

import { useState, useRef, useEffect } from "react";

const MOCK_INTERVIEW_API_ENDPOINT = "/api/mock-interview";

const BRAND_PRIMARY = "#204972";
const BRAND_ACCENT = "#84CC16";
const BRAND_DARK = "#204972";
const BRAND_YELLOW = "#f4c430";

const POST_OPTIONS = [
  { value: "KVS-NVS PRT Special Educator", label: "KVS-NVS — PRT Special Educator" },
  { value: "DSSSB TGT/PRT", label: "DSSSB — TGT / PRT" },
  { value: "EMRS TGT/PRT", label: "EMRS — TGT / PRT" },
  { value: "Rajasthan REET/Third Grade Teacher", label: "Rajasthan — REET / Third Grade Teacher" },
  { value: "General Teaching Post", label: "General Teaching Post (any board)" },
];

const ROUND_OPTIONS = [
  { value: 4, label: "4 questions (quick, ~10 min)" },
  { value: 6, label: "6 questions (standard, ~15 min)" },
  { value: 8, label: "8 questions (full mock, ~20 min)" },
];

// ── Dummy question bank (used when API is unavailable) ──
const DUMMY_QUESTIONS = {
  "KVS-NVS PRT Special Educator": [
    "Introduce yourself and tell us why you want to become a Special Educator.",
    "How would you create an Individualized Education Plan (IEP) for a child with intellectual disability?",
    "What strategies would you use to include a child with autism in a mainstream classroom activity?",
    "How do you assess the progress of students with special needs?",
    "Describe a challenging situation you faced with a special needs student and how you handled it.",
    "What is your understanding of the Rights of Persons with Disabilities Act 2016?",
    "How would you communicate a child's progress to parents who are unaware of their child's disability?",
    "What assistive technologies are you familiar with for helping children with learning disabilities?",
  ],
  "DSSSB TGT/PRT": [
    "Tell us about your teaching philosophy and approach in the classroom.",
    "How would you handle a class of 40+ students with diverse learning abilities?",
    "Describe how you would teach a difficult concept using activity-based learning.",
    "What is the role of formative assessment in your teaching practice?",
    "How do you ensure that slow learners are not left behind in your classroom?",
    "What is the importance of co-curricular activities in a student's holistic development?",
    "How would you deal with a student who is frequently absent and falling behind?",
    "What is NEP 2020 and how does it impact primary education?",
  ],
  "EMRS TGT/PRT": [
    "Why do you want to teach in an Eklavya Model Residential School?",
    "How would you adapt your teaching methods to suit tribal students' cultural background?",
    "What challenges do you anticipate in a residential school setting and how would you address them?",
    "How would you motivate students from remote areas who have limited exposure to technology?",
    "Describe your experience or approach to mother-tongue based multilingual education.",
    "How would you promote value education along with academic learning?",
    "What role does a teacher play beyond academics in a residential school?",
    "How would you handle homesickness among young residential students?",
  ],
  "Rajasthan REET/Third Grade Teacher": [
    "Introduce yourself and explain your motivation for becoming a government teacher.",
    "How would you teach Hindi reading and comprehension to Class 3 students effectively?",
    "What is the importance of the Right to Education Act for primary schooling in Rajasthan?",
    "How would you make your classroom child-friendly and joyful for young learners?",
    "Describe an activity-based lesson plan for teaching Mathematics to Class 2 students.",
    "How would you handle students who are unable to read even after Class 3?",
    "What is the role of School Management Committees (SMC) under the RTE Act?",
    "How do you involve parents in their children's learning, especially in rural areas?",
  ],
  "General Teaching Post": [
    "Introduce yourself and describe your teaching experience so far.",
    "What teaching methodology do you prefer and why?",
    "How do you incorporate technology in your daily classroom teaching?",
    "Describe how you manage classroom discipline while keeping students engaged.",
    "How would you differentiate instruction for students of varying abilities?",
    "What is the significance of continuous and comprehensive evaluation (CCE)?",
    "How do you build a positive and inclusive classroom environment?",
    "Where do you see yourself as a teacher in the next five years?",
  ],
};

const DUMMY_FEEDBACK = [
  "Good answer! You covered the key points. Try to be more specific with examples from your experience.",
  "Decent response. Remember to structure your answer using the STAR method (Situation, Task, Action, Result) for better impact.",
  "You've shown a good understanding of the concept. Adding a real-life classroom example will strengthen your answer further.",
  "Well answered! The panel would appreciate your clarity. Try to also mention any relevant policy or framework to support your point.",
  "Your response shows genuine passion for teaching. Practice keeping your answers concise — ideally under 2 minutes.",
];

// Helper: get shuffled dummy questions for a post
function getDummyQuestions(post) {
  const bank = DUMMY_QUESTIONS[post] || DUMMY_QUESTIONS["General Teaching Post"];
  return [...bank].sort(() => Math.random() - 0.5);
}

// In-memory dummy session state (resets on remount — fine for demo)
let _dummyQueue = [];
let _dummyQIndex = 0;

async function callMockInterviewApi(payload) {
  try {
    const res = await fetch(MOCK_INTERVIEW_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || "API error");
    return data;
  } catch (err) {
    // ── Fallback: use dummy questions/feedback when API is unavailable ──
    console.warn("Mock Interview API unavailable, using demo mode:", err.message);

    if (payload.action === "ask") {
      _dummyQueue = getDummyQuestions(payload.post || "General Teaching Post");
      _dummyQIndex = 0;
      return { question: _dummyQueue[_dummyQIndex++] };
    }

    if (payload.action === "eval") {
      const randomScore = Math.floor(Math.random() * 3) + 6; // 6–8
      const feedbackText = DUMMY_FEEDBACK[Math.floor(Math.random() * DUMMY_FEEDBACK.length)];
      const nextQuestion = _dummyQueue[_dummyQIndex] ? _dummyQueue[_dummyQIndex++] : null;
      return {
        score: randomScore,
        feedback: feedbackText,
        next_question: nextQuestion,
      };
    }

    if (payload.action === "report") {
      const avg = payload.history?.length
        ? Math.round(payload.history.reduce((a, h) => a + (h.score || 0), 0) / payload.history.length)
        : 7;
      return {
        overall_score: avg,
        strengths: [
          "You demonstrated good subject knowledge throughout the interview.",
          "Your communication was clear and structured.",
          "You showed genuine enthusiasm for teaching.",
        ],
        improvements: [
          "Try to add specific examples from your experience to strengthen answers.",
          "Practice keeping each answer within 90–120 seconds.",
          "Mention relevant policies (NEP 2020, RTE Act) to showcase awareness.",
        ],
      };
    }

    throw new Error("Unknown action");
  }
}


export default function MockInterview({ initialScreen = "promo" }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [screen, setScreen] = useState(initialScreen); // "promo" | "setup" | "interview" | "report"
  const [post, setPost] = useState(POST_OPTIONS[0].value);
  const [totalRounds, setTotalRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [history, setHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionLoading, setQuestionLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [micSupported, setMicSupported] = useState(true);

  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setMicSupported(false);
      return;
    }
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      let finalText = "";
      for (let i = 0; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript + " ";
      }
      setTranscript(finalText.trim());
    };
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);

    recognitionRef.current = recognition;
    return () => {
      try {
        recognition.stop();
      } catch (e) {}
    };
  }, []);

  const toggleMic = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (isRecording) {
      recognition.stop();
    } else {
      setTranscript("");
      recognition.start();
      setIsRecording(true);
    }
  };

  function speak(text) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.98;
    utter.pitch = 1.0;
    window.speechSynthesis.speak(utter);
  }

  const startInterview = async () => {
    setCurrentRound(0);
    setHistory([]);
    setFeedback(null);
    setTranscript("");
    setLoadError("");
    setScreen("interview");
    setQuestionLoading(true);

    try {
      const result = await callMockInterviewApi({ action: "ask", post });
      setCurrentQuestion(result.question);
      speak(result.question);
    } catch (e) {
      setLoadError(e.message || "Couldn't load first question.");
      setScreen("setup");
    } finally {
      setQuestionLoading(false);
    }
  };

  const handleSubmit = async (skipped) => {
    const answer = skipped ? "(Candidate skipped this question)" : transcript.trim() || "(No answer given)";
    setSubmitting(true);
    setFeedback(null);
    setLoadError("");

    const isLast = currentRound >= totalRounds - 1;

    try {
      const result = await callMockInterviewApi({
        action: "eval",
        post,
        history,
        currentQuestion,
        answer,
        isLast,
      });

      const newHistory = [
        ...history,
        { question: currentQuestion, answer, score: result.score, feedback: result.feedback },
      ];
      setHistory(newHistory);
      setFeedback({ score: result.score, text: result.feedback });

      if (isLast || !result.next_question) {
        setTimeout(() => {
          setSubmitting(false);
          showReport(newHistory);
        }, 1800);
      } else {
        setTimeout(() => {
          setCurrentRound((r) => r + 1);
          setCurrentQuestion(result.next_question);
          setTranscript("");
          setFeedback(null);
          speak(result.next_question);
          setSubmitting(false);
        }, 1800);
      }
    } catch (e) {
      setLoadError(e.message || "Couldn't evaluate that answer — please try submitting again.");
      setSubmitting(false);
    }
  };

  const showReport = async (finalHistory) => {
    setScreen("report");
    setReportLoading(true);
    setReport(null);

    try {
      const result = await callMockInterviewApi({ action: "report", post, history: finalHistory });
      setReport(result);
    } catch (e) {
      const avg =
        Math.round(finalHistory.reduce((a, h) => a + (h.score || 0), 0) / finalHistory.length) || 0;
      setReport({ overall_score: avg, strengths: ["Completed your targeted practice session."], improvements: ["Review individual questions below."] });
    } finally {
      setReportLoading(false);
    }
  };

  const retry = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setScreen("setup");
    setTranscript("");
    setReport(null);
    setLoadError("");
  };

  if (!mounted) return null;

  const progressPct = ((currentRound + 1) / totalRounds) * 100;

  return (
    <div className="mi-wrap">
      <style>{`
        .mi-wrap *{ box-sizing:border-box; }
        .mi-wrap{
          max-width: 760px; margin: 0 auto; padding: 28px 20px 60px;
          font-family: 'Inter', -apple-system, sans-serif; color:#1b2430;
        }
        .mi-display{ font-family: 'Poppins', 'Inter', sans-serif; }
        .mi-brandbar{ display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; }
        .mi-brand{ display:flex; align-items:center; gap:10px; }
        .mi-brand-mark{
          width:38px;height:38px;border-radius:50%;
          background: conic-gradient(from 200deg, ${BRAND_ACCENT}, ${BRAND_YELLOW}, ${BRAND_PRIMARY});
          display:flex;align-items:center;justify-content:center; color:#fff;font-weight:700;font-size:15px;
        }
        .mi-brand-name{ font-weight:700; font-size:15px; color:${BRAND_PRIMARY}; line-height:1.15; }
        .mi-brand-sub{ font-size:11.5px; color:#5b6672; }
        .mi-badge{
          background:${BRAND_DARK}; color:${BRAND_YELLOW}; font-size:11px; font-weight:700;
          letter-spacing:.04em; padding:5px 11px; border-radius:999px; text-transform:uppercase;
        }
        .mi-hero{
          background: ${BRAND_DARK};
          background-image: radial-gradient(circle at 88% -10%, rgba(132,204,22,.35), transparent 55%);
          color:#fff; border-radius:20px; padding:30px 26px; margin-bottom:18px; position:relative; overflow:hidden;
        }
        .mi-hero h1{ font-size:25px; margin:0 0 8px; line-height:1.25; }
        .mi-hero p{ margin:0; color:rgba(255,255,255,.78); font-size:14.5px; max-width:46ch; }
        .mi-orb{ position:absolute; right:-30px; bottom:-40px; width:150px; height:150px; border-radius:50%; border:1.5px solid rgba(255,255,255,.15); }
        .mi-orb::after{ content:""; position:absolute; inset:22px; border-radius:50%; border:1.5px solid rgba(132,204,22,.4); }

        .mi-card{ background:#fff; border:1px solid #e1e5df; border-radius:14px; padding:22px; margin-bottom:16px; }
        .mi-label{ display:block; font-size:12.5px; font-weight:700; color:${BRAND_PRIMARY}; text-transform:uppercase; letter-spacing:.03em; margin-bottom:8px; }
        .mi-select, .mi-textarea{
          width:100%; font-family:inherit; font-size:15px; padding:12px 14px; border-radius:10px;
          border:1.5px solid #e1e5df; background:#fff; color:#1b2430;
        }
        .mi-select:focus, .mi-textarea:focus{ outline:2.5px solid ${BRAND_ACCENT}; outline-offset:1px; }

        .mi-btn{
          display:inline-flex; align-items:center; justify-content:center; gap:8px; border:none;
          border-radius:999px; padding:13px 24px; font-size:15px; font-weight:700; cursor:pointer;
          transition: transform .12s ease, box-shadow .12s ease; font-family:inherit;
        }
        .mi-btn:active{ transform: scale(.97); }
        .mi-btn-primary{ background:${BRAND_ACCENT}; color:${BRAND_DARK}; }
        .mi-btn-primary:hover{ box-shadow: 0 6px 18px rgba(132,204,22,.4); }
        .mi-btn-primary:disabled{ background:#cfd6c8; color:#8a9184; cursor:not-allowed; box-shadow:none; }
        .mi-btn-outline{ background:transparent; border:1.5px solid #e1e5df; color:${BRAND_PRIMARY}; }
        .mi-btn-outline:hover{ border-color:${BRAND_PRIMARY}; }
        .mi-btn-block{ width:100%; }

        .mi-btn-mic{ background:${BRAND_DARK}; color:#fff; width:64px; height:64px; border-radius:50%; font-size:22px; flex-shrink:0; border:none; cursor:pointer; }
        .mi-btn-mic.recording{ background:#c0392b; animation: mi-pulse 1.4s infinite; }
        .mi-btn-mic:disabled{ opacity:.4; cursor:not-allowed; }
        @keyframes mi-pulse{
          0%{ box-shadow: 0 0 0 0 rgba(192,57,43,.5); }
          70%{ box-shadow: 0 0 0 16px rgba(192,57,43,0); }
          100%{ box-shadow: 0 0 0 0 rgba(192,57,43,0); }
        }

        .mi-progress-row{ display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .mi-progress-label{ font-size:12.5px; font-weight:700; color:#5b6672; text-transform:uppercase; letter-spacing:.03em; }
        .mi-progress-track{ height:6px; background:#e1e5df; border-radius:999px; overflow:hidden; margin-top:6px; }
        .mi-progress-fill{ height:100%; background: linear-gradient(90deg, ${BRAND_PRIMARY}, ${BRAND_ACCENT}); border-radius:999px; transition: width .4s ease; }

        .mi-question-eyebrow{ font-size:11.5px; font-weight:700; color:${BRAND_ACCENT}; text-transform:uppercase; letter-spacing:.05em; margin-bottom:6px; }
        .mi-question-text{ font-size:19px; line-height:1.45; color:${BRAND_DARK}; margin:0 0 18px; }

        .mi-answer-row{ display:flex; gap:14px; align-items:flex-start; }
        .mi-transcript-box{
          flex:1; min-height:110px; border:1.5px dashed #e1e5df; border-radius:12px; padding:14px;
          font-size:14.5px; color:#1b2430; background:#fbfcfa; resize:vertical; font-family:inherit;
        }
        .mi-mic-col{ display:flex; flex-direction:column; align-items:center; gap:6px; }
        .mi-mic-hint{ font-size:11px; color:#5b6672; text-align:center; width:70px; }

        .mi-feedback-note{
          margin-top:14px; background:#f1f6ec; border-left:3px solid ${BRAND_PRIMARY}; border-radius:0 10px 10px 0;
          padding:12px 14px; font-size:13.5px; color:#1b2430;
        }
        .mi-error-note{
          margin-top:14px; background:#fff5f5; border-left:3px solid #ef4444; border-radius:0 10px 10px 0;
          padding:12px 14px; font-size:13.5px; color:#b91c1c;
        }
        .mi-score-chip{
          display:inline-block; background:${BRAND_DARK}; color:${BRAND_YELLOW}; font-weight:700; font-size:12px;
          padding:2px 9px; border-radius:999px; margin-right:8px;
        }
        .mi-actions{ display:flex; gap:10px; margin-top:20px; }

        .mi-report-score{ text-align:center; padding:10px 0 22px; }
        .mi-report-score .mi-num{ font-size:52px; font-weight:700; color:${BRAND_PRIMARY}; line-height:1; }
        .mi-report-score .mi-of{ font-size:15px; color:#5b6672; }
        .mi-report-section h3{ font-size:13px; text-transform:uppercase; letter-spacing:.03em; color:${BRAND_ACCENT}; margin:18px 0 8px; }
        .mi-report-section ul{ margin:0; padding-left:20px; font-size:14.5px; line-height:1.7; }
        .mi-qa-item{ border-top:1px solid #e1e5df; padding:14px 0; }
        .mi-qa-item:first-child{ border-top:none; }
        .mi-qa-q{ font-weight:700; font-size:14.5px; color:${BRAND_DARK}; margin-bottom:4px; }
        .mi-qa-a{ font-size:13.5px; color:#5b6672; margin-bottom:6px; font-style:italic; }
        .mi-qa-f{ font-size:13.5px; }

        .mi-center-note{ text-align:center; color:#5b6672; font-size:13px; margin-top:10px; }
        .mi-loading-dots::after{ content:""; animation: mi-dots 1.2s steps(4,end) infinite; }
        @keyframes mi-dots{ 0%{content:"";} 25%{content:".";} 50%{content:"..";} 75%{content:"...";} }

        /* PROMO/LAUNCH CARD STYLES */
        .mi-chat-action-card {
          background: #ffffff;
          border: 1.5px solid #e1e5df;
          border-radius: 14px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(32, 73, 114, 0.05);
        }
        .mi-chat-heading {
          font-size: 18px;
          font-weight: 700;
          color: ${BRAND_PRIMARY};
          margin: 0 0 6px 0;
        }
        .mi-chat-subtext {
          font-size: 13.5px;
          color: #5b6672;
          margin: 0 0 20px 0;
        }
      `}</style>

      <div className="mi-brandbar">
        <div className="mi-brand">
          <div className="mi-brand-mark">PV</div>
          <div>
            <div className="mi-brand-name">PV Classes</div>
            <div className="mi-brand-sub">Mock Interview Coach</div>
          </div>
        </div>
        <div className="mi-badge">AI Powered</div>
      </div>

      {loadError && <div className="mi-error-note" style={{ marginBottom: 16 }}>⚠️ {loadError}</div>}

      {/* 1. INITIAL PROMO/LAUNCH SCREEN STATE */}
      {screen === "promo" && (
        <div className="mi-chat-action-card">
          <h2 className="mi-chat-heading mi-display">Ready for your Teaching Interview?</h2>
          <p className="mi-chat-subtext">Start an interactive voice or text mock interview panel custom curated for your target exam.</p>
          <button 
            className="mi-btn mi-btn-primary mi-btn-block"
            style={{ padding: "14px 28px", fontSize: "16px", backgroundColor: BRAND_ACCENT }}
            onClick={() => setScreen("setup")}
          >
            🎙️ Start Mock Interview (Tap to Speak)
          </button>
        </div>
      )}

      {/* 2. SETUP SCREEN STATE */}
      {screen === "setup" && (
        <div>
          <div className="mi-hero">
            <div className="mi-orb"></div>
            <h1 className="mi-display">
              Practice your interview.
              <br />
              Speak it out loud.
            </h1>
            <p>
              Get asked real interview questions for your exam, answer by voice or text, and get
              instant feedback with a score — just like the panel would give you.
            </p>
          </div>

          <div className="mi-card">
            <label className="mi-label" htmlFor="mi-post-select">
              Choose your post / exam
            </label>
            <select
              id="mi-post-select"
              className="mi-select"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            >
              {POST_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div style={{ height: 14 }} />

            <label className="mi-label" htmlFor="mi-rounds-select">
              Number of questions
            </label>
            <select
              id="mi-rounds-select"
              className="mi-select"
              value={totalRounds}
              onChange={(e) => setTotalRounds(parseInt(e.target.value, 10))}
            >
              {ROUND_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div style={{ height: 20 }} />
            <button 
              className="mi-btn mi-btn-primary mi-btn-block" 
              onClick={startInterview}
              disabled={questionLoading}
            >
              {questionLoading ? "Setting up interview panels..." : "🎤 Start Mock Interview"}
            </button>
            {!micSupported && (
              <div className="mi-center-note">
                Your browser doesn't support voice input — you can still type answers.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. INTERVIEW LIVE ROUNDS */}
      {screen === "interview" && (
        <div className="mi-card">
          <div className="mi-progress-row">
            <span className="mi-progress-label">
              Question {currentRound + 1} of {totalRounds}
            </span>
            <span className="mi-progress-label" style={{ color: BRAND_PRIMARY }}>
              {post}
            </span>
          </div>
          <div className="mi-progress-track">
            <div className="mi-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>

          <div style={{ height: 20 }} />

          <div className="mi-question-eyebrow">Interviewer asks</div>
          <p className="mi-question-text">
            {questionLoading ? (
              <>
                Loading your interview scenario<span className="mi-loading-dots"></span>
              </>
            ) : (
              currentQuestion
            )}
          </p>

          <div className="mi-answer-row">
            <textarea
              className="mi-transcript-box"
              placeholder="Tap the mic and speak your answer, or type it here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              disabled={questionLoading || submitting}
            />
            <div className="mi-mic-col">
              <button
                className={`mi-btn-mic ${isRecording ? "recording" : ""}`}
                onClick={toggleMic}
                disabled={!micSupported || questionLoading || submitting}
                title="Record answer"
              >
                🎤
              </button>
              <span className="mi-mic-hint">
                {isRecording ? "Listening..." : "Tap to speak"}
              </span>
            </div>
          </div>

          {feedback && (
            <div className="mi-feedback-note">
              <span className="mi-score-chip">{feedback.score}/10</span>
              <span>{feedback.text}</span>
            </div>
          )}

          <div className="mi-actions">
            <button
              className="mi-btn mi-btn-outline"
              onClick={() => handleSubmit(true)}
              disabled={questionLoading || submitting}
            >
              Skip
            </button>
            <button
              className="mi-btn mi-btn-primary"
              style={{ flex: 1 }}
              onClick={() => handleSubmit(false)}
              disabled={questionLoading || submitting || (!transcript.trim() && !isRecording)}
            >
              {submitting ? "Evaluating Answer..." : "Submit Answer"}
            </button>
          </div>
        </div>
      )}

      {/* 4. FINAL REPORT SUMMARY */}
      {screen === "report" && (
        <div className="mi-card">
          <div className="mi-report-score">
            <div className="mi-num">{reportLoading ? "..." : report?.overall_score ?? "--"}</div>
            <div className="mi-of">out of 10 — overall performance</div>
          </div>

          <div className="mi-report-section">
            <h3>Strengths</h3>
            <ul>
              {(report?.strengths || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="mi-report-section">
            <h3>Work on this</h3>
            <ul>
              {(report?.improvements || []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="mi-report-section">
            <h3>Question-by-question review</h3>
            {history.map((h, i) => (
              <div className="mi-qa-item" key={i}>
                <div className="mi-qa-q">
                  Q{i + 1}. {h.question}
                </div>
                <div className="mi-qa-a">"{h.answer}"</div>
                <div className="mi-qa-f">
                  <span className="mi-score-chip">{h.score}/10</span>
                  {h.feedback}
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 24 }} />
          <button className="mi-btn mi-btn-primary mi-btn-block" onClick={retry}>
            Try Another Mock Interview
          </button>
        </div>
      )}
    </div>
  );
}