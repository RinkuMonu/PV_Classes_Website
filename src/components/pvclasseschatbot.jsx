"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/* ============================================================
   CONFIG — edit these to match PV Classes (Government Exam Coaching)
   ============================================================ */
const BOT_NAME = "Prachi";                 // chatbot's name
const COMPANY_NAME = "PV Classes";
const COMPANY_EMAIL = "Pvclasses01@gmail.com";
const COMPANY_PHONE = "9251582702";
const COMPANY_WHATSAPP = "919251582702";    // digits only, used for wa.me link

const BRAND_PRIMARY = "#1E3A8A";   // deep academic indigo/blue (matches site navbar)
const BRAND_ACCENT = "#84CC16";    // lime/green — matches site's "NEW" badge & buttons
const BRAND_DARK = "#0F1A33";

// Keep this low (close to 0) so the launcher sits at the very bottom-right
// corner of the screen instead of floating over mid-page content. If you
// also have a WhatsApp widget fixed at bottom-right, bump this up (e.g. 90)
// so Prachi's launcher sits above it instead of overlapping it.
const LAUNCHER_BOTTOM = 24; // px from bottom of screen — keep low so it floats at the very bottom and doesn't cover page content
const LAUNCHER_Z_INDEX = 10000; // higher than a typical WhatsApp widget (~9999)

// ── Government exam categories PV Classes actually prepares students for ──
const EXAM_CATEGORIES = [
  "🏛️ Central Level Exam (DSSSB / KVS-NVS)",
  "🌅 Rajasthan Exams",
  "📝 Test Series Only",
  "🤔 Not sure yet",
];

// Specific exams within "Central Level" — shown as a follow-up if relevant
const CENTRAL_EXAMS = [
  "DSSSB General Paper",
  "KVS (Kendriya Vidyalaya)",
  "NVS (Navodaya Vidyalaya)",
  "Other Central Exam",
];

const RAJASTHAN_EXAMS = [
  "RPSC",
  "Rajasthan Patwari",
  "Rajasthan Police",
  "REET",
  "Other Rajasthan Exam",
];

const MODES = ["💻 Online", "📝 Test Series Access Only", "🤝 Either works"];

// Where captured leads get sent — point this at your backend / CRM / Sheet.
const LEAD_API_ENDPOINT = "/api/leads";

// Real AI Q&A endpoint — calls Anthropic on the server with KNOWLEDGE as
// context (see src/app/api/chat/route.js). Falls back to local keyword
// matching automatically if this route isn't reachable.
const CHAT_API_ENDPOINT = "/api/chat";

// ── Local knowledge base — used as instant fallback / Anthropic context.
//    Edit this with your real info (fees, batch timings, faculty, results).
//    Rewritten to match PV Classes' actual offering: government exam
//    coaching (Central Level: DSSSB/KVS-NVS, Rajasthan Exams), PYQs,
//    Test Series, Books, Current Affairs, and Notes.
const COMPANY_KNOWLEDGE = [
  {
    keywords: ["course", "courses", "classes", "what do you teach", "offer", "exam list", "which exams"],
    answer:
      `${COMPANY_NAME} offers preparation for Government Exams — including Central Level Exams like DSSSB, KVS-NVS, as well as Rajasthan Exams such as RPSC, Patwari, Police, and REET. We provide Test Series, PYQs (Previous Year Questions), Books, Notes, and daily Current Affairs. Which exam are you preparing for?`,
  },
  {
    keywords: ["dsssb"],
    answer:
      `Our DSSSB General Paper Complete Batch 2026 covers the full syllabus with expert faculty, live interactive classes, PDF notes & study material, test series & mock papers, previous year discussion, and doubt-solving sessions. There's currently a limited-time offer running — want me to note your details so our counsellor can share the enrollment link?`,
  },
  {
    keywords: ["kvs", "nvs", "navodaya", "kendriya vidyalaya"],
    answer:
      `We offer dedicated KVS (Kendriya Vidyalaya) and NVS (Navodaya Vidyalaya) exam preparation under our Central Level Exam category, with structured notes, test series, and PYQs. Want me to share more details or book a callback?`,
  },
  {
    keywords: ["rpsc", "patwari", "rajasthan police", "reet", "rajasthan exam"],
    answer:
      `Under Rajasthan Exams, we cover RPSC, Patwari, Rajasthan Police, REET, and other state-level exams — with test series, PYQs, notes, and current affairs updates tailored to the Rajasthan syllabus.`,
  },
  {
    keywords: ["fee", "fees", "price", "pricing", "cost", "charges", "installment", "discount", "offer"],
    answer:
      `Fees vary by exam (DSSSB, KVS-NVS, RPSC, Patwari, etc.) and course type. We currently have a flat discount running for a limited time. Share which exam you're targeting and our counsellor will share the exact pricing on a quick call.`,
  },
  {
    keywords: ["demo", "trial", "free class", "trial class"],
    answer:
      `Yes! We offer access to sample classes so you can experience our teaching style before enrolling. Want me to arrange that for you?`,
  },
  {
    keywords: ["faculty", "teacher", "teachers", "who teaches", "experience"],
    answer:
      `Our faculty are experienced subject experts with a strong track record in government exam selections. Many have years of experience teaching for DSSSB, KVS-NVS, and Rajasthan-level exams.`,
  },
  {
    keywords: ["result", "results", "toppers", "rank", "selection", "success rate"],
    answer:
      `${COMPANY_NAME} has helped many students clear DSSSB, KVS-NVS, and Rajasthan government exams. Our counsellor can share detailed results and student testimonials on a call.`,
  },
  {
    keywords: ["timing", "batch", "schedule", "timetable", "when do classes", "registration"],
    answer:
      `Registration for our current batches (like the DSSSB General Paper Complete Batch 2026) is open now with limited seats. Tell me which exam you're preparing for and I'll note your preferred timing for our counsellor.`,
  },
  {
    keywords: ["location", "address", "where are you", "center", "branch"],
    answer:
      `Our office is located at Plot No. 97, Dakshinpuri-I, Shrikishan, Sanganer, Jagatpura, Jaipur, Rajasthan - 302017. We also offer Online classes if you're not nearby.`,
  },
  {
    keywords: ["contact", "phone", "number", "reach", "call"],
    answer: `You can reach us at ${COMPANY_EMAIL} or ${COMPANY_PHONE}. I can also have our counsellor call you directly — just share your number.`,
  },
  {
    keywords: ["who are you", "what is pv classes", "about", "company"],
    answer: `${COMPANY_NAME} is a coaching platform focused on Government Exam preparation — covering Central Level Exams (DSSSB, KVS-NVS) and Rajasthan Exams (RPSC, Patwari, Police, REET) — known for expert faculty, test series, and strong results.`,
  },
  {
    keywords: ["material", "notes", "books", "study material", "pdf"],
    answer: `We provide structured PDF notes, smart/quick-revision notes, books, and practice sheets covering the full syllabus for each exam — included with every course.`,
  },
  {
    keywords: ["pyq", "previous year", "test", "exam", "mock test", "assessment", "test series"],
    answer: `We offer dedicated Test Series, PYQs (Previous Year Questions), and regular mock papers with detailed performance analysis, so your exam readiness is tracked throughout the course.`,
  },
  {
    keywords: ["current affairs", "ca", "daily current affairs"],
    answer: `We publish daily Current Affairs updates relevant to government exams, which you can access on our website alongside your course material.`,
  },
];

function localAnswer(text) {
  const lower = text.toLowerCase();
  for (const entry of COMPANY_KNOWLEDGE) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry.answer;
  }
  return null;
}
// ─────────────────────────────────────────────────────────

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const greetingMessage = () => ({
  id: 1,
  role: "assistant",
  content: `Hi! 👋 I'm **${BOT_NAME}**, ${COMPANY_NAME}'s admissions assistant for Government Exam preparation (DSSSB, KVS-NVS, RPSC, Patwari & more).\n\nI can help you find the right course, share test series details, or answer any questions. First — what's your name?`,
  time: now(),
});

/* ── Icons ──────────────────────────────────────────── */
const GraduationIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 9L12 4 2 9l10 5 10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 9v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Format markdown-lite ── */
const formatText = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");

const isValidPhone = (v) => {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
};
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const firstName = (n) => (n || "").trim().split(" ")[0] || "there";

export default function PVClassesChatbot() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([greetingMessage()]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [badge, setBadge] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // ── Lead-capture flow ──
  // ASK_NAME -> ASK_PHONE -> ASK_EMAIL -> ASK_CATEGORY -> ASK_EXAM -> ASK_MODE -> CHAT
  const [step, setStep] = useState("ASK_NAME");
  const [lead, setLead] = useState({
    name: "", phone: "", email: "", category: "", exam: "", mode: "",
  });
  const [optionSet, setOptionSet] = useState(null);

  const inputLocked = optionSet !== null;
  const isChatMode = step === "CHAT";

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && !minimized) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, optionSet, open, minimized]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setBadge(0);
    }
  }, [open, minimized]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setBadge(1), 4000);
      return () => clearTimeout(t);
    }
  }, [open]);

  const addBotMessage = (content, opts) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role: "assistant", content, time: now() },
    ]);
    if (opts) setOptionSet(opts);
  };

  const addUserMessage = (content) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role: "user", content, time: now() },
    ]);
  };

  const botSay = (content, opts, delay = 600) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addBotMessage(content, opts);
      if (!open || minimized) setBadge((n) => n + 1);
    }, delay);
  };

  const clearChat = () => {
    setMessages([greetingMessage()]);
    setStep("ASK_NAME");
    setLead({ name: "", phone: "", email: "", category: "", exam: "", mode: "" });
    setOptionSet(null);
    setInput("");
    setShowClearConfirm(false);
    if (textareaRef.current) textareaRef.current.style.height = "44px";
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 100) + "px";
    }
  };

  const submitLead = (finalLead) => {
    console.log("LEAD CAPTURED:", finalLead);
    fetch(LEAD_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalLead),
    }).catch((err) => console.error("Lead submission failed:", err));
  };

  const answerFreeText = async (question) => {
    setLoading(true);
    try {
      const res = await fetch(CHAT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lead, knowledge: COMPANY_KNOWLEDGE }),
      });
      if (!res.ok) throw new Error("Chat API not available");
      const data = await res.json();
      setLoading(false);
      addBotMessage(
        data.reply || "Thanks for your question — our counsellor will follow up shortly!"
      );
    } catch (err) {
      const local = localAnswer(question);
      setLoading(false);
      addBotMessage(
        local ||
          `Thanks for asking! I've noted that down — our counsellor will follow up with details. You can also reach us directly at ${COMPANY_EMAIL}.`
      );
    }
    if (!open || minimized) setBadge((n) => n + 1);
  };

  const pickOption = (value) => {
    if (!optionSet) return;
    addUserMessage(value);
    const type = optionSet.type;
    setOptionSet(null);

    if (type === "category") {
      const updated = { ...lead, category: value };
      setLead(updated);

      if (value.includes("Central Level")) {
        setStep("ASK_EXAM");
        botSay(`Got it — Central Level Exam. Which one specifically?`, {
          type: "exam",
          options: CENTRAL_EXAMS,
        });
      } else if (value.includes("Rajasthan")) {
        setStep("ASK_EXAM");
        botSay(`Got it — Rajasthan Exams. Which one specifically?`, {
          type: "exam",
          options: RAJASTHAN_EXAMS,
        });
      } else {
        const finalLead = { ...lead, category: value, exam: value };
        setLead(finalLead);
        setStep("ASK_MODE");
        botSay(`No problem — would you prefer Online classes or Test Series access only?`, {
          type: "mode",
          options: MODES,
        });
      }
      return;
    }

    if (type === "exam") {
      const updated = { ...lead, exam: value };
      setLead(updated);
      setStep("ASK_MODE");
      botSay(`Great choice — ${value}. Would you prefer Online classes or Test Series access only?`, {
        type: "mode",
        options: MODES,
      });
      return;
    }

    if (type === "mode") {
      const finalLead = { ...lead, mode: value };
      setLead(finalLead);
      botSay(
        `✅ All set, ${firstName(finalLead.name)}! Here's a quick summary:\n` +
          `• Exam Category: **${finalLead.category}**\n` +
          `• Exam: **${finalLead.exam}**\n` +
          `• Mode: **${finalLead.mode}**\n` +
          `• We'll call you on: **${finalLead.phone}**\n\n` +
          `Our counsellor will reach out shortly to share batch details and the current discount offer. Meanwhile, ask me anything about ${COMPANY_NAME}! 💬`
      );
      submitLead(finalLead);
      setStep("CHAT");
    }
  };

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg || loading || inputLocked) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "44px";
    addUserMessage(msg);

    if (step === "ASK_NAME") {
      if (msg.length < 2) {
        botSay("Please enter your full name so I can address you correctly 🙂");
        return;
      }
      setLead((l) => ({ ...l, name: msg }));
      setStep("ASK_PHONE");
      botSay(`Nice to meet you, ${firstName(msg)}! Could you share your phone number so our counsellor can reach you?`);
      return;
    }

    if (step === "ASK_PHONE") {
      if (!isValidPhone(msg)) {
        botSay("That doesn't look like a valid number. Please enter a 10-digit phone number.");
        return;
      }
      setLead((l) => ({ ...l, phone: msg }));
      setStep("ASK_EMAIL");
      botSay("Thanks! What's your email address?");
      return;
    }

    if (step === "ASK_EMAIL") {
      if (!isValidEmail(msg)) {
        botSay("That doesn't look like a valid email. Please enter a valid email, e.g. name@example.com");
        return;
      }
      setLead((l) => ({ ...l, email: msg }));
      setStep("ASK_CATEGORY");
      botSay("Which government exam category are you preparing for?", {
        type: "category",
        options: EXAM_CATEGORIES,
      });
      return;
    }

    if (step === "CHAT") {
      answerFreeText(msg);
      return;
    }

    botSay("Thanks for the message! Our counsellor will follow up with you directly.");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <style>{`
        .pv-chat * {
          box-sizing: border-box;
          font-family: 'Inter', system-ui, sans-serif;
          margin: 0;
          padding: 0;
        }
        .pv-launcher {
          position: fixed; bottom: ${LAUNCHER_BOTTOM}px; right: 28px; z-index: ${LAUNCHER_Z_INDEX};
          cursor: pointer; border: none; background: none; padding: 0;
        }
        .pv-launcher-ring {
          width: 62px; height: 62px; border-radius: 50%;
          background: linear-gradient(135deg, ${BRAND_PRIMARY}, #2747a8);
          display: flex; align-items: center; justify-content: center; color: white;
          box-shadow: 0 6px 28px rgba(30,58,138,0.45), 0 2px 8px rgba(30,58,138,0.2);
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
          position: relative;
        }
        .pv-launcher-ring:hover { transform: scale(1.1); box-shadow: 0 10px 36px rgba(30,58,138,0.5); }
        .pv-badge {
          position: absolute; top: -3px; right: -3px; min-width: 20px; height: 20px;
          background: #ef4444; border-radius: 10px; border: 2px solid #fff;
          font-size: 10px; font-weight: 700; color: white;
          display: flex; align-items: center; justify-content: center; padding: 0 4px;
          animation: pv-pop 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes pv-pop { from { transform: scale(0); } to { transform: scale(1); } }
        .pv-window {
          position: fixed; bottom: ${LAUNCHER_BOTTOM + 76}px; right: 28px; width: 392px; max-height: 610px;
          z-index: ${LAUNCHER_Z_INDEX - 1}; display: flex; flex-direction: column; border-radius: 20px; overflow: hidden;
          background: #ffffff;
          box-shadow: 0 32px 80px rgba(0,0,0,0.16), 0 8px 24px rgba(30,58,138,0.1), 0 0 0 1px rgba(0,0,0,0.05);
          animation: pv-rise 0.32s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes pv-rise { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .pv-window.pv-mini { max-height: 70px; }
        .pv-header {
          background: linear-gradient(135deg, ${BRAND_DARK}, ${BRAND_PRIMARY});
          padding: 14px 16px; display: flex; align-items: center; gap: 12px;
          flex-shrink: 0; position: relative;
        }
        .pv-header::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, ${BRAND_ACCENT}, #d4f583, ${BRAND_ACCENT});
          background-size: 200% 100%; animation: pv-shimmer 2.5s linear infinite;
        }
        @keyframes pv-shimmer { from { background-position: 200% center; } to { background-position: -200% center; } }
        .pv-avatar {
          width: 42px; height: 42px; border-radius: 50%; background: ${BRAND_ACCENT};
          display: flex; align-items: center; justify-content: center; color: ${BRAND_DARK}; flex-shrink: 0; position: relative;
        }
        .pv-avatar-pulse {
          position: absolute; inset: -3px; border-radius: 50%; border: 2px solid ${BRAND_ACCENT};
          opacity: 0.4; animation: pv-pulse 2s infinite;
        }
        @keyframes pv-pulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.12); opacity: 0; } }
        .pv-header-text { flex: 1; overflow: hidden; }
        .pv-header-name { color: #fff; font-weight: 700; font-size: 15px; letter-spacing: -0.2px; }
        .pv-header-sub { color: rgba(255,255,255,0.6); font-size: 11.5px; display: flex; align-items: center; gap: 5px; margin-top: 1px; }
        .pv-online-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; animation: pv-blink 2s infinite; }
        @keyframes pv-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .pv-header-btns { display: flex; gap: 4px; align-items: center; }
        .pv-hbtn {
          width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.1); border: none;
          cursor: pointer; color: rgba(255,255,255,0.75); display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .pv-hbtn:hover { background: rgba(255,255,255,0.2); color: white; }
        .pv-hbtn.pv-clear-btn:hover { background: rgba(239, 68, 68, 0.3); color: #ff8b8b; }
        .pv-clear-confirm {
          position: absolute; top: 70px; right: 12px; background: ${BRAND_DARK};
          border: 1px solid rgba(132,204,22,0.3); border-radius: 12px; padding: 10px 14px; z-index: 10;
          display: flex; align-items: center; gap: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          animation: pv-pop 0.2s cubic-bezier(.34,1.56,.64,1); white-space: nowrap;
        }
        .pv-clear-confirm span { color: rgba(255,255,255,0.85); font-size: 12px; }
        .pv-clear-confirm-btns { display: flex; gap: 6px; }
        .pv-confirm-yes {
          padding: 4px 10px; border-radius: 6px; background: #ef4444; color: white; border: none;
          cursor: pointer; font-size: 12px; font-weight: 600; transition: opacity 0.15s;
        }
        .pv-confirm-yes:hover { opacity: 0.85; }
        .pv-confirm-no {
          padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.8);
          border: none; cursor: pointer; font-size: 12px; font-weight: 500; transition: background 0.15s;
        }
        .pv-confirm-no:hover { background: rgba(255,255,255,0.2); }
        .pv-ai-badge {
          display: inline-flex; align-items: center; gap: 4px; background: rgba(132,204,22,0.18); color: ${BRAND_ACCENT};
          border: 1px solid rgba(132,204,22,0.35); border-radius: 20px; padding: 2px 8px; font-size: 10px;
          font-weight: 600; letter-spacing: 0.3px; text-transform: uppercase; margin-top: 4px;
        }
        .pv-messages {
          flex: 1; overflow-y: auto; padding: 16px 14px; background: #f5f7fb;
          display: flex; flex-direction: column; gap: 14px; scroll-behavior: smooth;
        }
        .pv-messages::-webkit-scrollbar { width: 4px; }
        .pv-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
        .pv-date-divider { display: flex; align-items: center; gap: 10px; color: #bbb; font-size: 11px; }
        .pv-date-divider::before, .pv-date-divider::after { content: ''; flex: 1; height: 1px; background: #e4e7f0; }
        .pv-row { display: flex; align-items: flex-end; gap: 8px; }
        .pv-row.user { flex-direction: row-reverse; }
        .pv-msg-avatar {
          width: 30px; height: 30px; border-radius: 50%; background: ${BRAND_PRIMARY}; color: white;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 12px;
        }
        .pv-msg-col { display: flex; flex-direction: column; max-width: 76%; gap: 3px; }
        .pv-msg-col.user { align-items: flex-end; }
        .pv-bubble { padding: 11px 15px; border-radius: 18px; font-size: 13.5px; line-height: 1.55; word-break: break-word; }
        .pv-bubble.bot { background: #fff; color: #14213d; border-bottom-left-radius: 4px; box-shadow: 0 1px 6px rgba(0,0,0,0.07); }
        .pv-bubble.user { background: linear-gradient(135deg, ${BRAND_PRIMARY}, #2747a8); color: white; border-bottom-right-radius: 4px; }
        .pv-bubble.bot strong { color: ${BRAND_PRIMARY}; }
        .pv-time { font-size: 10.5px; color: #b7bdcc; padding: 0 2px; }
        .pv-typing {
          display: flex; gap: 5px; padding: 13px 16px; background: #fff; border-radius: 18px;
          border-bottom-left-radius: 4px; box-shadow: 0 1px 6px rgba(0,0,0,0.07); width: fit-content; align-items: center;
        }
        .pv-dot { width: 7px; height: 7px; border-radius: 50%; background: ${BRAND_PRIMARY}; opacity: 0.6; animation: pv-bounce 1.3s infinite; }
        .pv-dot:nth-child(2) { animation-delay: 0.18s; }
        .pv-dot:nth-child(3) { animation-delay: 0.36s; }
        @keyframes pv-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.6; } 30% { transform: translateY(-7px); opacity: 1; } }
        .pv-quick {
          padding: 10px 14px 12px; background: #f5f7fb; display: flex; flex-wrap: wrap; gap: 6px; border-top: 1px solid #eceef6;
        }
        .pv-qbtn {
          padding: 7px 13px; border-radius: 20px; border: 1.5px solid ${BRAND_PRIMARY}; background: white;
          color: ${BRAND_PRIMARY}; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .pv-qbtn:hover { background: ${BRAND_PRIMARY}; color: white; }
        .pv-input-area {
          padding: 10px 12px; background: white; border-top: 1px solid #eceef6;
          display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0;
        }
        .pv-textarea {
          flex: 1; min-height: 44px; max-height: 100px; background: #f5f7fb; border: 1.5px solid #e4e7f2;
          border-radius: 12px; padding: 11px 14px; font-size: 13.5px; line-height: 1.45; resize: none; outline: none;
          color: #14213d; font-family: 'Inter', sans-serif; transition: border-color 0.15s, background 0.15s; overflow-y: auto;
        }
        .pv-textarea:focus { border-color: ${BRAND_PRIMARY}; background: white; }
        .pv-textarea::placeholder { color: #a8aec2; }
        .pv-textarea:disabled { background: #ececf2; color: #aaa; }
        .pv-send {
          width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, ${BRAND_PRIMARY}, #2747a8); border: none; cursor: pointer;
          color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: opacity 0.15s, transform 0.15s; box-shadow: 0 4px 12px rgba(30,58,138,0.35);
        }
        .pv-send:hover:not(:disabled) { opacity: 0.88; transform: scale(1.05); }
        .pv-send:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
        .pv-footer {
          padding: 6px 0 7px; text-align: center; font-size: 10.5px; color: #b7bdcc; background: white;
          border-top: 1px solid #f2f3f8; letter-spacing: 0.1px;
        }
        .pv-footer a { color: ${BRAND_PRIMARY}; text-decoration: none; font-weight: 500; }
        @media (max-width: 440px) {
          .pv-window { left: 10px; right: 10px; width: auto; bottom: ${LAUNCHER_BOTTOM + 64}px; }
          .pv-launcher { bottom: ${LAUNCHER_BOTTOM}px; right: 18px; }
        }
      `}</style>

      <div className="pv-chat">
        {!open && (
          <button
            className="pv-launcher"
            onClick={() => { setOpen(true); setMinimized(false); }}
            aria-label={`Open chat with ${BOT_NAME}`}
          >
            <div className="pv-launcher-ring">
              <GraduationIcon size={26} />
              {badge > 0 && <span className="pv-badge">{badge}</span>}
            </div>
          </button>
        )}

        {open && (
          <div className={`pv-window ${minimized ? "pv-mini" : ""}`}>
            <div className="pv-header">
              <div className="pv-avatar">
                <div className="pv-avatar-pulse" />
                <GraduationIcon size={20} />
              </div>

              <div className="pv-header-text">
                <div className="pv-header-name">{BOT_NAME} · {COMPANY_NAME}</div>
                {!minimized && (
                  <div className="pv-header-sub">
                    <span className="pv-online-dot" />
                    Online · {isChatMode ? "Ask me anything" : "Admissions assistant"}
                  </div>
                )}
                {!minimized && (
                  <div className="pv-ai-badge">
                    <SparkleIcon /> {isChatMode ? "Ask anything" : "Find your government exam batch"}
                  </div>
                )}
              </div>

              <div className="pv-header-btns">
                {!minimized && (
                  <button
                    className="pv-hbtn pv-clear-btn"
                    onClick={() => setShowClearConfirm((v) => !v)}
                    aria-label="Clear chat"
                    title="Clear chat"
                  >
                    <TrashIcon />
                  </button>
                )}
                <button
                  className="pv-hbtn"
                  onClick={() => { setMinimized((m) => !m); setShowClearConfirm(false); }}
                  aria-label={minimized ? "Expand" : "Minimize"}
                >
                  <ChevronDown />
                </button>
                <button
                  className="pv-hbtn"
                  onClick={() => { setOpen(false); setShowClearConfirm(false); }}
                  aria-label="Close"
                >
                  <XIcon />
                </button>
              </div>

              {showClearConfirm && (
                <div className="pv-clear-confirm">
                  <span>Clear all messages?</span>
                  <div className="pv-clear-confirm-btns">
                    <button className="pv-confirm-yes" onClick={clearChat}>Clear</button>
                    <button className="pv-confirm-no" onClick={() => setShowClearConfirm(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {!minimized && (
              <>
                <div className="pv-messages">
                  <div className="pv-date-divider">Today</div>

                  {messages.map((msg) => (
                    <div key={msg.id} className={`pv-row ${msg.role === "user" ? "user" : ""}`}>
                      {msg.role === "assistant" && (
                        <div className="pv-msg-avatar"><GraduationIcon size={16} /></div>
                      )}
                      <div className={`pv-msg-col ${msg.role === "user" ? "user" : ""}`}>
                        <div
                          className={`pv-bubble ${msg.role === "user" ? "user" : "bot"}`}
                          dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                        />
                        <span className="pv-time">{msg.time}</span>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="pv-row">
                      <div className="pv-msg-avatar"><GraduationIcon size={16} /></div>
                      <div className="pv-typing">
                        <div className="pv-dot" /><div className="pv-dot" /><div className="pv-dot" />
                      </div>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {optionSet && (
                  <div className="pv-quick">
                    {optionSet.options.map((opt) => (
                      <button key={opt} className="pv-qbtn" onClick={() => pickOption(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                <div className="pv-input-area">
                  <textarea
                    ref={(el) => { inputRef.current = el; textareaRef.current = el; }}
                    className="pv-textarea"
                    placeholder={
                      inputLocked
                        ? "Choose an option above..."
                        : isChatMode
                        ? "Ask anything..."
                        : "Type your reply..."
                    }
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={onKeyDown}
                    rows={1}
                    disabled={loading || inputLocked}
                  />
                  <button
                    className="pv-send"
                    onClick={() => send()}
                    disabled={!input.trim() || loading || inputLocked}
                    aria-label="Send message"
                  >
                    <SendIcon />
                  </button>
                </div>

                <div className="pv-footer">
                  We respect your privacy · <a href={`mailto:${COMPANY_EMAIL}`}>Contact us directly</a>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}