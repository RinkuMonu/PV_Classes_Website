"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import axiosInstance from "../app/axios/axiosInstance";
import { useCart } from "./context/CartContext";

/* ============================================================
   CONFIG — edit these to match PV Classes (Government Exam Coaching)
   ============================================================ */
const BOT_NAME = "Prachi";                 // chatbot's name
const COMPANY_NAME = "PV Classes";
const COMPANY_EMAIL = "Pvclasses01@gmail.com";
const COMPANY_PHONE = "9251582702";
const COMPANY_WHATSAPP = "919251582702";    // digits only, used for wa.me link (kept for text-contact fallback only)

const BRAND_PRIMARY = "#204972";   // deep academic indigo/blue (matches site navbar)
const BRAND_ACCENT = "#84CC16";    // lime/green — matches site's "NEW" badge & Add to Cart button
const BRAND_DARK = "#204972";

// Keep this low (close to 0) so the launcher sits at the very bottom-right
// corner of the screen instead of floating over mid-page content. If you
// also have a WhatsApp widget fixed at bottom-right, bump this up (e.g. 90)
// so Prachi's launcher sits above it instead of overlapping it.
const LAUNCHER_BOTTOM = 24; // px from bottom of screen — keep low so it floats at the very bottom and doesn't cover page content
const LAUNCHER_Z_INDEX = 10000; // higher than a typical WhatsApp widget (~9999)



// Preparation level — shown after city, per the lead-capture flow
const PREP_LEVELS = ["🌱 Beginner", "📈 Intermediate"];


// Real AI Q&A endpoint — calls Anthropic on the server with KNOWLEDGE as
// context (see src/app/api/chat/route.js). Falls back to local keyword
// matching automatically if this route isn't reachable.
const CHAT_API_ENDPOINT = "/api/chat";

// ── Auth ──
// TODO: point this at your REAL login endpoint (email + password).
// Expected response shape: { token: "...", user: { name, email, ... } }
// — adjust the field names inside doLogin() below if your API differs
// (e.g. res.data.data.token, res.data.accessToken, etc.)
const LOGIN_API_ENDPOINT = "/auth/login";
const AUTH_TOKEN_KEY = "pv_auth_token";
const AUTH_USER_KEY = "pv_auth_user";

// Where "Proceed to Checkout" should send the user — a real page redirect
// (not a new tab), so the browser navigates straight to your checkout page.
// Since the cart lives in localStorage under CART_STORAGE_KEY, as long as
// this chatbot and your checkout page are on the SAME domain, the cart
// will already be there waiting when the checkout page loads.
const CHECKOUT_URL = "/checkout"; // TODO: change if your checkout page lives elsewhere

// ── Local knowledge base — used as instant fallback / Anthropic context.
//    Edit this with your real info (fees, batch timings, faculty, results).
const COMPANY_KNOWLEDGE = [
  {
    keywords: ["course", "courses", "classes", "what do you teach", "offer", "exam list", "which exams"],
    answer:
      `${COMPANY_NAME} offers preparation for Government Exams — including Central Level Exams like DSSSB, KVS-NVS, as well as Rajasthan Exams such as RPSC, Patwari, Police, and REET. We provide Test Series, PYQs (Previous Year Questions), Books, Notes, and daily Current Affairs. Which exam are you preparing for?`,
  },
  {
    keywords: ["dsssb"],
    answer:
      `Our DSSSB General Paper Complete Batch 2026 covers the full syllabus with expert faculty, live interactive classes, PDF notes & study material, test series & mock papers, previous year discussion, and doubt-solving sessions. There's currently a limited-time offer running — want me to add it to your cart?`,
  },
  {
    keywords: ["kvs", "nvs", "navodaya", "kendriya vidyalaya"],
    answer:
      `We offer dedicated KVS (Kendriya Vidyalaya) and NVS (Navodaya Vidyalaya) exam preparation under our Central Level Exam category, with structured notes, test series, and PYQs. Want me to add this course to your cart?`,
  },
  {
    keywords: ["rpsc", "patwari", "rajasthan police", "reet", "rajasthan exam"],
    answer:
      `Under Rajasthan Exams, we cover RPSC, Patwari, Rajasthan Police, REET, and other state-level exams — with test series, PYQs, notes, and current affairs updates tailored to the Rajasthan syllabus.`,
  },
  {
    keywords: ["fee", "fees", "price", "pricing", "cost", "charges", "installment", "discount", "offer"],
    answer:
      `Fees vary by exam (DSSSB, KVS-NVS, RPSC, Patwari, etc.) and course type. We currently have a flat discount running for a limited time. Share which exam you're targeting and I'll show you the exact price and an Add to Cart button.`,
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
      `Registration for our current batches (like the DSSSB General Paper Complete Batch 2026) is open now with limited seats. Tell me which exam you're preparing for and I'll show you the course card so you can add it to your cart.`,
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

/* ============================================================
   PRICING — always derive price from the /courses API response,
   never a hardcoded/dummy number.

   The API returns several price-related fields per course:
     - price          → base price set for the course
     - discountPrice   → sometimes used as an original/MRP price
     - discountPercent → % discount applied
     - finalPrice      → the ACTUAL amount the student should pay
                         (already computed server-side from the
                         above three fields)
     - isFree          → NOT reliable for pricing in this API (some
                         paid courses come back with isFree: true),
                         so we never use it to decide the price —
                         we only look at the real numeric amount.

   Rule: show `finalPrice` if present, otherwise fall back to
   `price`. If the resulting amount is 0, show "Free" — everything
   else shows the real ₹ amount from the API.
   ============================================================ */
function getCoursePrice(course) {
  if (!course) return { amount: 0, text: "Free" };
  // Accept multiple field names that the API might use.
  const pickNumber = (obj, keys) => {
    for (const k of keys) {
      const v = obj?.[k];
      if (typeof v === "number") return v;
      if (v && typeof v === "object") {
        // support nested { amount: 123 } or { value: 123 }
        if (typeof v.amount === "number") return v.amount;
        if (typeof v.value === "number") return v.value;
      }
    }
    return null;
  };

  const amount =
    pickNumber(course, ["finalPrice", "final_price", "final", "sellingPrice"]) ??
    pickNumber(course, ["price", "amount", "coursePrice"]) ?? 0;

  const text = amount > 0 ? `₹${amount}` : "Free";
  return { amount, text };
}

/* ============================================================
   PURCHASE-INTENT DETECTION
   Lets a user type things like "buy a course of RPSC" and get a
   full course breakdown + a real "Add to Cart" button that adds
   the course to a persisted cart (localStorage) and syncs it to
   your backend cart endpoint if you have one.
   ============================================================ */
const PURCHASE_KEYWORDS = [
  "buy", "purchase", "enroll", "enrol", "admission", "join",
  "register", "sign up", "signup", "book a course", "want to buy",
  "i want to join", "get this course", "take this course", "add to cart",
  "cart",
];

// Fallback destination if a specific course URL isn't set below.
const COURSES_PAGE_URL = "https://www.pvclasses.com/courses"; // TODO: replace with your real "All Exams"/courses listing URL

// Local persisted-cart key (see CART INTEGRATION note below).
const CART_STORAGE_KEY = "pv_cart_items";

// Matches a course from the fetched API list by checking if any words
// from the user's text appear in the course title.
function detectCourseFromApi(lowerText, coursesList) {
  if (!coursesList || !coursesList.length) return null;
  return coursesList.find((c) => {
    const title = (c.title || c.name || "").toLowerCase();
    return title.split(/\s+/).some((word) => word.length > 2 && lowerText.includes(word));
  }) || null;
}

function hasPurchaseIntent(lowerText) {
  return PURCHASE_KEYWORDS.some((k) => lowerText.includes(k));
}

/* ============================================================
   CART INTEGRATION
   Reads/writes a real cart in localStorage under CART_STORAGE_KEY,
   and also best-effort POSTs to /api/cart so a backend cart (if you
   have one) stays in sync too. Every cart item stores BOTH the
   numeric `amount` (for totals) and the display `price` string
   (for the confirmation bubble) — both taken straight from the API,
   never hardcoded.

   TO FULLY WIRE THIS INTO YOUR SITE:
   1. Make sure the cart page/badge on your main site (pvclasses.com)
      reads from the SAME localStorage key ("pv_cart_items") — or
   2. Replace readCart/writeCart below with calls to your site's real
      cart API/context if you already have one, so both the chatbot
      and your product pages update the same cart.
   ============================================================ */
function readCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Cart read failed:", err);
    return [];
  }
}

function writeCart(cart) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Lets a cart icon/badge elsewhere on the page update itself live,
    // since the native "storage" event only fires in OTHER tabs.
    window.dispatchEvent(new CustomEvent("pv-cart-updated", { detail: cart }));
  } catch (err) {
    console.error("Cart write failed:", err);
  }
}
// ─────────────────────────────────────────────────────────

/* ============================================================
   AUTH INTEGRATION
   Simple email + password login. Persists the token/user in
   localStorage (so it survives refreshes) and also sets it as
   the default Authorization header on axiosInstance so every
   other API call (courses, contacts, etc.) is authenticated too.
   ============================================================ */
function readAuth() {
  if (typeof window === "undefined") return { token: null, user: null };
  try {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    const rawUser = window.localStorage.getItem(AUTH_USER_KEY);
    return { token: token || null, user: rawUser ? JSON.parse(rawUser) : null };
  } catch (err) {
    console.error("Auth read failed:", err);
    return { token: null, user: null };
  }
}

function writeAuth(token, user) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user || {}));
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    window.dispatchEvent(new CustomEvent("pv-auth-updated", { detail: { token, user } }));
  } catch (err) {
    console.error("Auth write failed:", err);
  }
}

function clearAuth() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.localStorage.removeItem(AUTH_USER_KEY);
    delete axiosInstance.defaults.headers.common["Authorization"];
    window.dispatchEvent(new CustomEvent("pv-auth-updated", { detail: { token: null, user: null } }));
  } catch (err) {
    console.error("Auth clear failed:", err);
  }
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

const CartIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="21" r="1.4" fill="currentColor" />
    <circle cx="18" cy="21" r="1.4" fill="currentColor" />
    <path d="M2 3h2l2.6 12.3a2 2 0 002 1.7h8.2a2 2 0 002-1.6L21 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4.5 20c1.4-3.8 4.5-5.5 7.5-5.5s6.1 1.7 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Format markdown-lite ── */
const formatText = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");

/* ============================================================
   VALIDATION
   - Phone: normalizes +91 / leading 0, then requires a proper
     10-digit Indian mobile number starting with 6-9. Also
     rejects obviously fake numbers (all same digit, or a
     straight sequential run like 1234567890 / 0123456789).
   - Email: standard RFC-ish pattern, trimmed + lowercased.
   ============================================================ */
const normalizePhone = (v) => {
  let digits = String(v).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
};

const isValidPhone = (v) => {
  const digits = normalizePhone(v);
  if (!/^[6-9]\d{9}$/.test(digits)) return false; // valid Indian mobile pattern
  if (/^(\d)\1{9}$/.test(digits)) return false;   // e.g. 9999999999
  const ascending = "0123456789";
  const descending = "9876543210";
  if (ascending.includes(digits) || descending.includes(digits)) return false; // e.g. 1234567890
  return true;
};

const isValidEmail = (v) => {
  const val = v.trim().toLowerCase();
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!re.test(val)) return false;
  if (val.includes("..")) return false; // no consecutive dots
  return true;
};

const isValidCity = (v) => {
  const val = v.trim();
  return val.length >= 2 && /^[a-zA-Z\s.'-]+$/.test(val);
};

const firstName = (n) => (n || "").trim().split(" ")[0] || "there";

export default function PVClassesChatbot() {
  // ── Website cart integration (CartContext) ──
  const { addToCart: addToCartContext, fetchCart } = useCart();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([greetingMessage()]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [badge, setBadge] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [apiCategories, setApiCategories] = useState([]);
  const [apiExamsList, setApiExamsList] = useState([]);
  const [apiStates, setApiStates] = useState([]);
  const [apiCoursesList, setApiCoursesList] = useState([]);

  // ── Cart (visible in the chatbot itself) ──
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // ── Auth (email + password login gate) ──
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  // Holds whatever action (checkout, etc.) was waiting on a login, so it
  // can resume automatically right after successful login.
  const pendingActionRef = useRef(null);

  // ── Lead-capture flow ──
  // ASK_NAME -> ASK_PHONE -> ASK_EMAIL -> ASK_CATEGORY -> ASK_EXAM
  // -> (city buttons) -> ASK_CITY_OTHER (only if "Other City" tapped) -> ASK_LEVEL -> CHAT
  const [step, setStep] = useState("ASK_NAME");
  const [lead, setLead] = useState({
    name: "", phone: "", email: "", category: "", exam: "", city: "", level: "",
  });
  const [optionSet, setOptionSet] = useState(null);

  const categoryOptions = apiCategories;

  const inputLocked = optionSet !== null;
  const isChatMode = step === "CHAT";

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const leadRef = useRef(lead);
  useEffect(() => { leadRef.current = lead; }, [lead]);

  // Keep live refs of open/minimized so the global cart-click handler
  // (registered once) always sees the latest values, not stale ones.
  const openRef = useRef(open);
  const minimizedRef = useRef(minimized);
  useEffect(() => { openRef.current = open; }, [open]);
  useEffect(() => { minimizedRef.current = minimized; }, [minimized]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load the cart on mount, and keep it live-synced whenever anything
  // (this widget, another tab, or your site's own cart page) updates it.
  useEffect(() => {
    setCartItems(readCart());
    const onCartUpdate = (e) => setCartItems(e.detail || readCart());
    const onStorage = (e) => {
      if (e.key === CART_STORAGE_KEY) setCartItems(readCart());
    };
    window.addEventListener("pv-cart-updated", onCartUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("pv-cart-updated", onCartUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Load auth (if the user already logged in on your site / a previous
  // session) on mount, and keep it live-synced across tabs too.
  useEffect(() => {
    const { token, user } = readAuth();
    if (token) {
      setAuthToken(token);
      setAuthUser(user);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const onAuthUpdate = (e) => {
      setAuthToken(e.detail?.token || null);
      setAuthUser(e.detail?.user || null);
    };
    const onStorage = (e) => {
      if (e.key === AUTH_TOKEN_KEY || e.key === AUTH_USER_KEY) {
        const next = readAuth();
        setAuthToken(next.token);
        setAuthUser(next.user);
      }
    };
    window.addEventListener("pv-auth-updated", onAuthUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("pv-auth-updated", onAuthUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    const fetchChatCategories = async () => {
      try {
        const res = await axiosInstance.get("/exams");
        const data = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : [];
        setApiExamsList(data);
        const categories = data
          .map((item) => item?.examType?.name || "")
          .filter((name, index, arr) => name && arr.indexOf(name) === index);
        if (categories.length) {
          setApiCategories(categories);
        }
      } catch (err) {
        console.error("Chatbot category fetch failed:", err);
      }
    };

    const fetchStates = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" })
        });
        const json = await res.json();
        if (json?.data?.states) {
          const statesList = json.data.states.map(s => s.name);
          setApiStates(statesList);
        }
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    };

    // Pulls the REAL course catalog (with real price / discountPercent /
    // finalPrice) from your API so every price shown anywhere in the
    // chatbot comes straight from here — no hardcoded numbers.
    const fetchCoursesData = async () => {
      try {
        // Use the public API endpoint directly so the chatbot shows the
        // same catalog as the website: https://api.pvclasses.in/api/courses
        const res = await axiosInstance.get("https://api.pvclasses.in/api/courses");
        const data = Array.isArray(res?.data) ? res.data : res?.data?.data || [];
        setApiCoursesList(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchChatCategories();
    fetchStates();
    fetchCoursesData();
  }, []);

  useEffect(() => {
    if (open && !minimized && !cartOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, optionSet, open, minimized, cartOpen]);

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

  const addBotMessage = (content, opts, variant) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role: "assistant", content, time: now(), variant },
    ]);
    if (opts) setOptionSet(opts);
  };

  const addUserMessage = (content) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role: "user", content, time: now() },
    ]);
  };

  const botSay = (content, opts, delay = 600, variant) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addBotMessage(content, opts, variant);
      if (!open || minimized) setBadge((n) => n + 1);
    }, delay);
  };

  const clearChat = () => {
    setMessages([greetingMessage()]);
    setStep("ASK_NAME");
    setLead({ name: "", phone: "", email: "", category: "", exam: "", city: "", level: "" });
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

  const submitLead = async (finalLead) => {
    console.log("LEAD CAPTURED:", finalLead);
    try {
      await axiosInstance.post("/contacts", finalLead);
    } catch (err) {
      console.error("Lead submission failed:", err);
    }
  };

  // ── Cart helpers (used by the visible cart panel) ──
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.amount || 0) * (item.qty || 1), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  const removeFromCart = (key) => {
    const updated = cartItems.filter((item) => item.key !== key);
    writeCart(updated);
    setCartItems(updated);
  };

  const changeQty = (key, delta) => {
    const updated = cartItems
      .map((item) => (item.key === key ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item))
      .filter(Boolean);
    writeCart(updated);
    setCartItems(updated);
  };

  // ── Auth gate ──
  // Call this to wrap any action that needs a logged-in user. Only
  // checkout is gated behind login now — browsing, selecting a course,
  // and adding to cart are all allowed without an account so the user
  // only hits the login/password screen right before payment.
  const requireLogin = (action) => {
    if (authToken) {
      action();
      return;
    }
    // If your main site has a profile/login page, redirect there so the
    // user can enter email+password on the full website (per request).
    // Fallback: also try to open any global login modal if present.
    try {
      window.dispatchEvent(new Event("openLoginModal"));
    } catch (e) {
      // ignore
    }
    setCartOpen(false);
    setOpen(false); // Optionally close the chatbot too
    if (typeof window !== "undefined") {
      // `profile` page exists in this project — redirecting there is a
      // sensible default for a login/email page.
      window.location.href = "/profile";
    }
  };

  const doLogin = async () => {
    const email = loginEmail.trim().toLowerCase();
    if (!email || !loginPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }
    if (!isValidEmail(email)) {
      setLoginError("Please enter a valid email address.");
      return;
    }
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await axiosInstance.post(LOGIN_API_ENDPOINT, {
        email,
        password: loginPassword,
      });
      // Adjust these to match your real API's response shape if needed.
      const payload = res?.data?.data || res?.data || {};
      const token = payload.token || payload.accessToken || payload.authToken;
      const user = payload.user || payload.profile || { email };
      if (!token) throw new Error("Login response did not include a token");

      writeAuth(token, user);
      setAuthToken(token);
      setAuthUser(user);
      setLoginEmail("");
      setLoginPassword("");
      setLoginOpen(false);

      const pending = pendingActionRef.current;
      pendingActionRef.current = null;
      if (pending) pending();
    } catch (err) {
      console.error("Login failed:", err);
      setLoginError(
        err?.response?.data?.message ||
          "Login failed. Please check your email & password and try again."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    setAuthToken(null);
    setAuthUser(null);
    setShowLogoutConfirm(false);
  };

  // Real page redirect (not a new tab) straight to the checkout page.
  // We let the /checkout page handle login gating (matching the main website cart).
  const handleCheckout = () => {
    window.location.href = CHECKOUT_URL;
  };

  // Actually adds a course to the persisted cart (see CART INTEGRATION
  // note above) using the REAL price from the /courses API, syncs it to
  // a backend endpoint if present, and confirms in-chat with a
  // "View Cart" button that opens the cart panel inside this widget.
  // No login required here — browsing and adding to cart is open to
  // everyone; login is only requested at checkout time.
  const addCourseToCart = async (courseId) => {
    const course = apiCoursesList.find((c) => c._id === courseId || c.slug === courseId);
    if (!course) return;

    const name = course.title || course.name || "Untitled";
    const { amount, text: priceText } = getCoursePrice(course);
    const url = course.slug ? `/courses/${course.slug}` : null;
    const itemId = course._id || courseId;

    // ✅ Add to website's main CartContext (updates header cart badge + /cart API)
    await addToCartContext({ itemType: "course", itemId, quantity: 1 });
    // Refresh the CartContext so header badge updates immediately
    fetchCart();

    // Also keep the chatbot's own internal cart in sync (for the in-chat cart panel)
    const cart = readCart();
    const existing = cart.find((item) => item.key === courseId);
    if (existing) {
      existing.qty += 1;
      existing.amount = amount;
      existing.price = priceText;
    } else {
      cart.push({ key: courseId, name, price: priceText, amount, url, qty: 1 });
    }
    writeCart(cart);
    setCartItems(cart);

    submitLead({
      ...leadRef.current,
      interestedCourse: name,
      intent: "add_to_cart",
      note: "Course added to cart during chat",
    });

    addBotMessage(
      `✅ **${name}** (${priceText}) has been added to your cart!\n\n` +
        `<button type="button" onclick="window.__pvOpenCart && window.__pvOpenCart()" class="pv-addcart-btn">🛒 View Cart (${cart.reduce((s, i) => s + (i.qty || 1), 0)})</button>`
    );
    if (!openRef.current || minimizedRef.current) setBadge((n) => n + 1);
  };

  // Exposes addCourseToCart / openCart on window so inline buttons
  // rendered via dangerouslySetInnerHTML (see showPurchaseInfo /
  // addCourseToCart above) can call them with a plain onclick="" attribute.
  // Registered once.
  useEffect(() => {
    window.__pvAddToCart = (key) => addCourseToCart(key);
    window.__pvOpenCart = () => {
      setMinimized(false);
      setOpen(true);
      setCartOpen(true);
    };
    window.__pvChatbotAddMessage = (content, role = "assistant", variant = null) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), role, content, time: now(), variant },
      ]);
      if (!openRef.current || minimizedRef.current) {
        setBadge((n) => n + 1);
      }
    };

    return () => {
      if (window.__pvAddToCart) delete window.__pvAddToCart;
      if (window.__pvOpenCart) delete window.__pvOpenCart;
      if (window.__pvChatbotAddMessage) delete window.__pvChatbotAddMessage;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCoursesList]);

  // Builds the full course breakdown + a real "Add to Cart" button using
  // data fetched from the /courses API — price shown is always the
  // course's real finalPrice/price from the API.
  const showPurchaseInfo = (course) => {
    if (!course) {
      botSay(
        `Thanks! Here's our full course catalog — you can browse and add any course to your cart:\n\n` +
          `<a href="${COURSES_PAGE_URL}" target="_blank" rel="noopener noreferrer" class="pv-addcart-btn">🛒 View Courses & Add to Cart</a>`
      );
      return;
    }

    const name = course.title || course.name || "Untitled";
    const { text: priceText } = getCoursePrice(course);
    const featuresList = (course.features || []).map((f) => `• ${f}`).join("\n");
    const courseUrl = course.slug ? `/courses/${course.slug}` : null;
    const courseId = course._id || course.slug;

    const reply =
      `Great choice! Here's what's included in **${name}**:\n${featuresList}\n\n` +
      `💰 **${priceText}**\n\n` +
      `<button type="button" onclick="window.__pvAddToCart && window.__pvAddToCart('${courseId}')" class="pv-addcart-btn">🛒 Add to Cart — ${priceText}</button>` +
      (courseUrl
        ? `\n<a href="${courseUrl}" target="_blank" rel="noopener noreferrer" class="pv-details-link">View full course page →</a>`
        : "");

    botSay(reply);
  };

  // Render a list of courses as rich HTML cards inside the chat bubble.
  const showCoursesList = (courses) => {
    if (!Array.isArray(courses) || courses.length === 0) {
      botSay("No courses available right now.");
      return;
    }

    const cards = courses.map((c) => {
      const title = c.title || c.name || c.course_name || "Untitled";
      const { text: priceText } = getCoursePrice(c);
      const start = c.startDate || c.start_date || c.starts_on || "";
      const validity = c.validityDays || c.validity || c.validity_in_days || (c.courseValidity && c.courseValidity + " days") || "";
      const discountRaw = c.discountPercent ?? c.discount ?? c.discount_percent ?? c.discountPrice ?? c.discount_price ?? null;
      let discount = "";
      if (typeof discountRaw === "number") discount = discountRaw;
      else {
        // if API provides both price and finalPrice, derive percent
        const basePrice = (typeof c.price === "number") ? c.price : (c.price && typeof c.price.amount === "number" ? c.price.amount : null);
        const finalPrice = (typeof c.finalPrice === "number") ? c.finalPrice : (c.final_price && typeof c.final_price === "number" ? c.final_price : null);
        if (basePrice && finalPrice && basePrice > finalPrice) {
          discount = Math.round(((basePrice - finalPrice) / basePrice) * 100);
        }
      }
      const img = c.banner || c.image || c.thumbnail || (c.media && c.media[0] && c.media[0].url) || "";
      const id = c._id || c.slug || c.id || title;
      const link = c.slug ? `/courses/${c.slug}` : (c.url || c.courseUrl || c.link || "#");

      return `
        <div style="border-radius:12px;background:#fff;padding:10px;margin:8px 0;box-shadow:0 6px 18px rgba(5,20,53,0.06);display:flex;gap:10px;align-items:flex-start;">
          ${img ? `<div style="width:110px;height:62px;flex-shrink:0;border-radius:8px;overflow:hidden"><img src="${img}" alt="${title}" style="width:100%;height:100%;object-fit:cover"/></div>` : ""}
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;color:#14213d;margin-bottom:6px">${title}</div>
            <div style="color:#6b7280;font-size:13px;margin-bottom:6px">${start ? `Starts on ${start}` : ""}${start && validity ? " · " : ""}${validity ? `Validity ${validity}` : ""}</div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <div style="font-weight:800;color:#0f172a">${priceText}</div>
              ${discount ? `<div style="color:#16a34a;font-weight:700">${discount}% Off</div>` : ""}
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              <button onclick="window.__pvAddToCart && window.__pvAddToCart('${id}')" class="pv-addcart-btn" style="padding:8px 10px;border-radius:10px;font-weight:700">Buy Now</button>
              <a href="${link}" target="_blank" rel="noopener noreferrer" style="color:#204972;font-weight:700;text-decoration:underline">View</a>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const wrapper = `
      <div>
        <div style="margin-bottom:8px;font-weight:700;color:#14213d">Here are some available courses — tap Buy Now to add to cart:</div>
        ${cards}
      </div>
    `;

    botSay(wrapper);
  };

  const answerFreeText = async (question) => {
    const lower = question.toLowerCase();

    // Purchase-intent check runs first — e.g. "buy a course of KVS"
    // Browsing/selecting a course does NOT require login — the user can
    // see details and tap "Add to Cart" freely. Login is only asked for
    // when they hit "Proceed to Checkout".
    if (hasPurchaseIntent(lower)) {
      const matched = detectCourseFromApi(lower, apiCoursesList);
      if (matched) {
        showPurchaseInfo(matched);
      } else {
        // If we already have course data, display full course cards.
        if (Array.isArray(apiCoursesList) && apiCoursesList.length) {
          showCoursesList(apiCoursesList.slice(0, 8));
        } else {
          const courseNames = apiCoursesList.map((c) => c.title || c.name || "Untitled");
          botSay("Sure! Which course would you like to buy?", {
            type: "purchaseExam",
            options: courseNames.length ? courseNames : ["View all courses"],
          });
        }
      }
      return;
    }

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

  const finalizeAndSubmit = (finalLead) => {
    botSay(
      `🎉 Thank you, ${firstName(finalLead.name)}! Here's a quick summary:\n` +
        `• Exam Category: **${finalLead.category}**\n` +
        `• Preferred Course: **${finalLead.exam}**\n` +
        `• City: **${finalLead.city}**\n` +
        `• Level: **${finalLead.level}**\n` +
        `• We'll call you on: **${finalLead.phone}**\n` +
        `• Email: **${finalLead.email}**\n\n` +
        `Our counsellor will reach out shortly to share batch details and the current discount offer. Meanwhile, ask me anything about ${COMPANY_NAME} — or say "buy a course" any time to see full course details and add it to your cart! 💬`
    );
    submitLead(finalLead);
    setStep("CHAT");
  };

  // Ask the state question with tappable buttons instead of free text.
  const askCity = (introText) => {
    setStep("ASK_CITY"); // informational only — the answer arrives via pickOption, not typing
    botSay(introText.replace(/city/gi, "state"), { 
      type: "city", 
      options: apiStates.length ? apiStates : ["Rajasthan", "Delhi", "Uttar Pradesh", "Other State"] 
    });
  };

  // Fetch categories if needed and ask category with API-provided options when available
  const askCategory = async () => {
    setStep("ASK_CATEGORY");
    if (!apiCategories.length) {
      try {
        const res = await axiosInstance.get("/exams");
        const data = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [];
        setApiExamsList(data);
        const categories = data
          .map((item) => item?.examType?.name || "")
          .filter((name, index, arr) => name && arr.indexOf(name) === index);
        if (categories.length) {
          setApiCategories(categories);
          botSay("Which government exam category are you preparing for?", {
            type: "category",
            options: categories,
          });
          return;
        }
      } catch (err) {
        console.error("Chatbot category fetch failed when asking:", err);
      }
    }

    // fallback
    botSay("Which government exam category are you preparing for?", {
      type: "category",
      options: categoryOptions.length ? categoryOptions : ["Other"],
    });
  };

  const pickOption = async (value) => {
    if (!optionSet) return;
    addUserMessage(value);
    const type = optionSet.type;
    setOptionSet(null);

    // If user selected a 'courses' option, fetch course list from backend
    try {
      const lower = String(value || "").toLowerCase();
      if (lower === "courses" || lower.includes("course")) {
        botSay("Fetching available courses...", undefined, 400);
        try {
          const res = await axiosInstance.get("https://api.pvclasses.in/api/courses");
          const data = Array.isArray(res?.data) ? res.data : res?.data?.data || [];
          if (Array.isArray(data) && data.length > 0) {
            // Display full course cards in-chat with Buy buttons
            showCoursesList(data.slice(0, 8));
          } else {
            addBotMessage("No courses found right now. Please try again later.");
          }
        } catch (err) {
          console.error("Failed to fetch courses:", err);
          addBotMessage("Failed to load courses. Please try again later.");
        }
        return;
      }
    } catch (e) {
      console.error("pickOption course-check error:", e);
    }

    if (type === "category") {
      const updated = { ...lead, category: value };
      setLead(updated);

      const examsForCategory = apiExamsList
        .filter((item) => item?.examType?.name === value)
        .map((item) => item.name);

      if (examsForCategory.length > 0) {
        setStep("ASK_EXAM");
        botSay(`Got it — ${value}. Which exam specifically?`, {
          type: "exam",
          options: examsForCategory,
        });
      } else {
        const withExam = { ...updated, exam: value };
        setLead(withExam);
        askCity(`No problem — which city are you in? (This helps us guide you on online vs center options.)`);
      }
      return;
    }

    if (type === "exam") {
      const updated = { ...lead, exam: value };
      setLead(updated);
      askCity(`Great choice — ${value}. Which city are you in?`);
      return;
    }

    if (type === "city") {
      if (value === "Other State" || value === "Other City") {
        setStep("ASK_CITY_OTHER");
        botSay("No problem — please type your state name:");
        return;
      }
      const updated = { ...lead, city: value };
      setLead(updated);
      setStep("ASK_LEVEL");
      botSay(`Great — ${value}. Last question — what's your current preparation level?`, {
        type: "level",
        options: PREP_LEVELS,
      });
      return;
    }

    if (type === "level") {
      const finalLead = { ...lead, level: value };
      setLead(finalLead);
      finalizeAndSubmit(finalLead);
      return;
    }

    // Tapped a course name after saying "buy a course" without naming one.
    if (type === "purchaseExam") {
      // If `value` is a course object (from the new course-list buttons),
      // add it to cart directly. Otherwise try to find a matching course
      // by title and show details.
      if (value && typeof value === "object" && (value.id || value._id)) {
        const courseId = value.id || value._id;
        addCourseToCart(courseId);
        return;
      }
      const matched = apiCoursesList.find((c) => (c.title || c.name) === value);
      showPurchaseInfo(matched || null);
      return;
    }

    // If user clicked a course object provided directly as a quick option
    if (value && typeof value === "object" && (value.id || value._id) && !type) {
      const courseId = value.id || value._id;
      addCourseToCart(courseId);
      return;
    }
  };

  const send = async (text) => {
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
      botSay(`Nice to meet you, ${firstName(msg)}! Could you share your 10-digit phone number so our counsellor can reach you?`);
      return;
    }

    if (step === "ASK_PHONE") {
      if (!isValidPhone(msg)) {
        botSay(
          "⚠️ Invalid phone number. Please enter a valid 10-digit Indian mobile number (e.g. 98XXXXXXXX).",
          undefined,
          600,
          "warning"
        );
        return;
      }
      setLead((l) => ({ ...l, phone: normalizePhone(msg) }));
      setStep("ASK_EMAIL");
      botSay("Thanks! What's your email address?");
      return;
    }

    if (step === "ASK_EMAIL") {
      if (!isValidEmail(msg)) {
        botSay(
          "⚠️ Invalid email address. Please enter a correct email format (e.g. name@example.com).",
          undefined,
          600,
          "warning"
        );
        return;
      }
      setLead((l) => ({ ...l, email: msg.trim().toLowerCase() }));
      await askCategory();
      return;
    }

    // Only reached when the user tapped "Other City" and is now typing their city.
    if (step === "ASK_CITY_OTHER") {
      if (!isValidCity(msg)) {
        botSay(
          "⚠️ Please enter a valid city name (letters only, at least 2 characters).",
          undefined,
          600,
          "warning"
        );
        return;
      }
      setLead((l) => ({ ...l, city: msg.trim() }));
      setStep("ASK_LEVEL");
      botSay(`Got it — ${msg.trim()}. Last question — what's your current preparation level?`, {
        type: "level",
        options: PREP_LEVELS,
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
          transition: background 0.15s, color 0.15s; position: relative;
        }
        .pv-hbtn:hover { background: rgba(255,255,255,0.2); color: white; }
        .pv-hbtn.pv-clear-btn:hover { background: rgba(239, 68, 68, 0.3); color: #ff8b8b; }
        .pv-hbtn.pv-cart-btn.active { background: rgba(132,204,22,0.3); color: ${BRAND_ACCENT}; }
        .pv-cart-count {
          position: absolute; top: -4px; right: -4px; min-width: 16px; height: 16px;
          background: ${BRAND_ACCENT}; border-radius: 8px; border: 2px solid ${BRAND_DARK};
          font-size: 9px; font-weight: 800; color: ${BRAND_DARK};
          display: flex; align-items: center; justify-content: center; padding: 0 3px;
        }
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
        .pv-bubble.bot a {
          display: inline-block; margin-top: 6px; color: ${BRAND_PRIMARY}; font-weight: 700;
          text-decoration: underline; text-underline-offset: 2px;
        }
        .pv-bubble.bot a:hover { color: #2747a8; }
        /* Add to Cart button/link — styled to match the site's lime "Add to cart" button.
           Shared by both <button> (real add-to-cart action) and <a> (view cart / catalog link). */
        .pv-bubble.bot .pv-addcart-btn {
          display: block; width: 100%; margin-top: 10px; text-align: center; text-decoration: none;
          background: ${BRAND_ACCENT}; color: #14213d; font-weight: 700; font-size: 13px;
          padding: 11px 14px; border-radius: 12px; box-shadow: 0 4px 12px rgba(132,204,22,0.35);
          border: none; cursor: pointer; font-family: inherit;
          transition: opacity 0.15s, transform 0.15s;
        }
        .pv-bubble.bot .pv-addcart-btn:hover { opacity: 0.9; color: #14213d; transform: scale(1.02); }
        .pv-bubble.bot a.pv-details-link {
          display: inline-block; margin-top: 8px; font-size: 12px; font-weight: 600;
          color: ${BRAND_PRIMARY}; text-decoration: underline; text-underline-offset: 2px;
        }
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

        /* ── Inline warning message (red line) for validation errors ── */
        .pv-bubble.pv-bubble-warning {
          background: #fff5f5;
          border-left: 4px solid #ef4444;
          color: #b91c1c;
          font-weight: 500;
        }
        .pv-bubble.pv-bubble-warning strong { color: #b91c1c; }

        /* ── Cart panel ── */
        .pv-cart-panel {
          flex: 1; overflow-y: auto; background: #f5f7fb; padding: 14px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .pv-cart-empty {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 10px; color: #9aa1b5; text-align: center; padding: 40px 20px;
        }
        .pv-cart-empty svg { opacity: 0.35; }
        .pv-cart-item {
          background: #fff; border-radius: 14px; padding: 12px; display: flex; gap: 10px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06); align-items: flex-start;
        }
        .pv-cart-item-info { flex: 1; min-width: 0; }
        .pv-cart-item-name { font-size: 13px; font-weight: 700; color: #14213d; line-height: 1.35; }
        .pv-cart-item-price { font-size: 12.5px; color: ${BRAND_PRIMARY}; font-weight: 700; margin-top: 3px; }
        .pv-cart-item-qty {
          display: flex; align-items: center; gap: 8px; margin-top: 8px;
        }
        .pv-qty-btn {
          width: 22px; height: 22px; border-radius: 6px; border: 1px solid #e4e7f2; background: #f5f7fb;
          color: ${BRAND_PRIMARY}; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 13px; line-height: 1;
        }
        .pv-qty-btn:hover { background: #eceef6; }
        .pv-qty-val { font-size: 12.5px; font-weight: 700; color: #14213d; min-width: 14px; text-align: center; }
        .pv-cart-remove {
          background: none; border: none; cursor: pointer; color: #cbd0de; padding: 4px;
          display: flex; align-items: center; justify-content: center; transition: color 0.15s;
        }
        .pv-cart-remove:hover { color: #ef4444; }
        .pv-cart-summary {
          background: #fff; border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 8px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
        }
        .pv-cart-summary-row { display: flex; justify-content: space-between; font-size: 13px; color: #55607a; }
        .pv-cart-summary-row.total { font-size: 15px; font-weight: 800; color: #14213d; padding-top: 6px; border-top: 1px dashed #e4e7f2; }
        .pv-cart-checkout {
          display: block; width: 100%; text-align: center; text-decoration: none; margin-top: 4px;
          background: ${BRAND_ACCENT}; color: #14213d; font-weight: 700; font-size: 13px;
          padding: 12px 14px; border-radius: 12px; box-shadow: 0 4px 12px rgba(132,204,22,0.35);
          border: none; cursor: pointer; font-family: inherit;
          transition: opacity 0.15s, transform 0.15s;
        }
        .pv-cart-checkout:hover { opacity: 0.9; transform: scale(1.01); }
        .pv-cart-back {
          display: block; width: 100%; text-align: center; margin-top: 2px; background: none; border: none;
          color: ${BRAND_PRIMARY}; font-weight: 600; font-size: 12.5px; cursor: pointer; padding: 8px;
        }

        /* ── Login panel ── */
        .pv-login-box {
          background: #fff; border-radius: 14px; padding: 18px 16px; display: flex; flex-direction: column;
          gap: 4px; box-shadow: 0 1px 6px rgba(0,0,0,0.06);
        }
        .pv-login-title { font-size: 15px; font-weight: 800; color: #14213d; margin-bottom: 2px; }
        .pv-login-sub { font-size: 12px; color: #7a8194; line-height: 1.5; margin-bottom: 10px; }
        .pv-login-label { font-size: 11.5px; font-weight: 700; color: #55607a; margin-top: 8px; margin-bottom: 4px; }
        .pv-login-input {
          width: 100%; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #e4e7f2; background: #f5f7fb;
          font-size: 13.5px; color: #14213d; outline: none; font-family: inherit; transition: border-color 0.15s, background 0.15s;
        }
        .pv-login-input:focus { border-color: ${BRAND_PRIMARY}; background: #fff; }
        .pv-login-input:disabled { background: #ececf2; color: #aaa; }
        .pv-login-error {
          margin-top: 10px; background: #fff5f5; border-left: 4px solid #ef4444; color: #b91c1c;
          font-size: 12px; font-weight: 500; padding: 8px 10px; border-radius: 6px;
        }
        .pv-login-submit {
          margin-top: 14px; width: 100%; padding: 11px 14px; border-radius: 12px; border: none; cursor: pointer;
          background: linear-gradient(135deg, ${BRAND_PRIMARY}, #2747a8); color: #fff; font-weight: 700; font-size: 13.5px;
          box-shadow: 0 4px 12px rgba(30,58,138,0.35); transition: opacity 0.15s;
        }
        .pv-login-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .pv-login-submit:hover:not(:disabled) { opacity: 0.9; }
        .pv-login-signup {
          display: block; text-align: center; margin-top: 12px; font-size: 12px; font-weight: 600;
          color: ${BRAND_PRIMARY}; text-decoration: underline; text-underline-offset: 2px;
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
                {!minimized && loginOpen && (
                  <div className="pv-header-sub">🔒 Login required</div>
                )}
                {!minimized && !loginOpen && !cartOpen && (
                  <div className="pv-header-sub">
                    <span className="pv-online-dot" />
                    {authToken
                      ? `Logged in as ${authUser?.name || authUser?.email || "you"}`
                      : `Online · ${isChatMode ? "Ask me anything" : "Admissions assistant"}`}
                  </div>
                )}
                {!minimized && !loginOpen && cartOpen && (
                  <div className="pv-header-sub">
                    🛒 {cartCount} item{cartCount === 1 ? "" : "s"} in cart
                  </div>
                )}
                {!minimized && !loginOpen && !cartOpen && (
                  <div className="pv-ai-badge">
                    <SparkleIcon /> {isChatMode ? "Ask anything" : "Find your government exam batch"}
                  </div>
                )}
              </div>

              <div className="pv-header-btns">
                {!minimized && !loginOpen && authToken && (
                  <button
                    className="pv-hbtn"
                    onClick={() => setShowLogoutConfirm((v) => !v)}
                    aria-label="Logout"
                    title="Logout"
                  >
                    <LogoutIcon />
                  </button>
                )}
                {!minimized && !loginOpen && !authToken && (
                  <button
                    className="pv-hbtn"
                    onClick={() => requireLogin(() => {})}
                    aria-label="Login"
                    title="Login"
                  >
                    <UserIcon />
                  </button>
                )}
                {!minimized && !loginOpen && (
                  <button
                    className={`pv-hbtn pv-cart-btn ${cartOpen ? "active" : ""}`}
                    onClick={() => { setCartOpen((v) => !v); setShowClearConfirm(false); }}
                    aria-label="View cart"
                    title="View cart"
                  >
                    <CartIcon />
                    {cartCount > 0 && <span className="pv-cart-count">{cartCount}</span>}
                  </button>
                )}
                {!minimized && !cartOpen && !loginOpen && (
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

              {showLogoutConfirm && (
                <div className="pv-clear-confirm">
                  <span>Log out of your account?</span>
                  <div className="pv-clear-confirm-btns">
                    <button className="pv-confirm-yes" onClick={handleLogout}>Logout</button>
                    <button className="pv-confirm-no" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {!minimized && cartOpen && !loginOpen && (
              <div className="pv-cart-panel">
                {cartItems.length === 0 ? (
                  <div className="pv-cart-empty">
                    <CartIcon size={40} />
                    <div>Your cart is empty.<br/>Ask me about a course and tap "Add to Cart"!</div>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div className="pv-cart-item" key={item.key}>
                        <div className="pv-cart-item-info">
                          <div className="pv-cart-item-name">{item.name}</div>
                          <div className="pv-cart-item-price">
                            {item.amount > 0 ? `₹${item.amount}` : "Free"} {item.qty > 1 && item.amount > 0 ? `× ${item.qty} = ₹${item.amount * item.qty}` : ""}
                          </div>
                          <div className="pv-cart-item-qty">
                            <button className="pv-qty-btn" onClick={() => changeQty(item.key, -1)}>−</button>
                            <span className="pv-qty-val">{item.qty}</span>
                            <button className="pv-qty-btn" onClick={() => changeQty(item.key, 1)}>+</button>
                          </div>
                        </div>
                        <button className="pv-cart-remove" onClick={() => removeFromCart(item.key)} aria-label="Remove item">
                          <TrashIcon />
                        </button>
                      </div>
                    ))}

                    <div className="pv-cart-summary">
                      <div className="pv-cart-summary-row">
                        <span>Items</span>
                        <span>{cartCount}</span>
                      </div>
                      <div className="pv-cart-summary-row total">
                        <span>Total</span>
                        <span>{cartTotal > 0 ? `₹${cartTotal}` : "Free"}</span>
                      </div>
                      {/* Real page redirect straight to your checkout page — gated behind login. */}
                      <button className="pv-cart-checkout" onClick={handleCheckout}>
                        Proceed to Checkout →
                      </button>
                    </div>
                  </>
                )}
                <button className="pv-cart-back" onClick={() => setCartOpen(false)}>← Back to chat</button>
              </div>
            )}

            {!minimized && loginOpen && (
              <div className="pv-cart-panel">
                <div className="pv-login-box">
                  <div className="pv-login-title">🔒 Please login to continue</div>
                  <div className="pv-login-sub">
                    Login with your {COMPANY_NAME} account to complete your checkout and payment.
                  </div>

                  <label className="pv-login-label">Email</label>
                  <input
                    type="email"
                    className="pv-login-input"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={loginLoading}
                  />

                  <label className="pv-login-label">Password</label>
                  <input
                    type="password"
                    className="pv-login-input"
                    placeholder="Your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") doLogin(); }}
                    disabled={loginLoading}
                  />

                  {loginError && <div className="pv-login-error">⚠️ {loginError}</div>}

                  <button className="pv-login-submit" onClick={doLogin} disabled={loginLoading}>
                    {loginLoading ? "Logging in..." : "Login"}
                  </button>

                  <a
                    className="pv-login-signup"
                    href={COURSES_PAGE_URL.replace(/\/courses\/?$/, "/register")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    New here? Create an account →
                  </a>
                </div>
                <button
                  className="pv-cart-back"
                  onClick={() => { setLoginOpen(false); pendingActionRef.current = null; }}
                >
                  ← Back to chat
                </button>
              </div>
            )}

            {!minimized && !cartOpen && !loginOpen && (
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
                          className={`pv-bubble ${msg.role === "user" ? "user" : "bot"} ${msg.variant === "warning" ? "pv-bubble-warning" : ""}`}
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
                          <button
                            key={opt && typeof opt === "object" ? opt.id || opt._id || opt.label : opt}
                            className="pv-qbtn"
                            onClick={() => pickOption(opt)}
                          >
                            {opt && typeof opt === "object" ? opt.label || opt.name : opt}
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
                        : step === "ASK_CITY_OTHER"
                        ? "Type your city..."
                        : isChatMode
                        ? "Ask anything, or say 'buy a course'..."
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