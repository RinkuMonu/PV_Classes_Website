"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  BookOpen, CalendarDays, Clock, ChevronDown, ChevronUp,
  CheckCircle2, Circle, Sparkles, Trophy, Loader2, AlertCircle,
  RefreshCw, Flame, Lightbulb, AlertTriangle, Timer, Target,
  Brain, BarChart2, Zap, Star, TrendingUp, Award
} from "lucide-react";
import { EXAMS } from "../../../../mockInterview/config/exams";
import { SUBJECT_MAPPING } from "../../../../mockInterview/config/subjectMapping";
import { generateLocalPlan } from "../../utils/localPlanGenerator";

const aiAxios = axios.create({ baseURL: "http://127.0.0.1:8000/api" });
const LEVELS  = ["Beginner", "Intermediate", "Advanced"];
const SUBJECTS = [...new Set(Object.values(SUBJECT_MAPPING).flat())].sort();

function computeStreak(tasks) {
  if (!tasks?.length) return 0;
  const days = tasks.filter(t => t.completed).map(t => t.day).sort((a,b) => b-a);
  if (!days.length) return 0;
  let s = 0, ex = days[0];
  for (const d of days) { if (d === ex) { s++; ex--; } else break; }
  return s;
}

/* ── Animated ring progress ─────────────────────────────────────────────── */
function RingProgress({ pct = 0, size = 88, stroke = 7, color = "#10b981" }) {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} stroke="rgba(255,255,255,0.08)" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} stroke={color}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease, stroke 0.4s" }} />
      </svg>
      <span className="text-xl font-black text-white z-10">{pct}%</span>
    </div>
  );
}

/* ── Mini bar ────────────────────────────────────────────────────────────── */
function MiniBar({ pct, color = "bg-emerald-500" }) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ── Stat card ───────────────────────────────────────────────────────────── */
function StatCard({ label, value, sub, color, icon: Icon, bg }) {
  return (
    <div className={`rounded-2xl p-4 border ${bg} flex flex-col gap-1`}>
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-black uppercase tracking-widest ${color} opacity-70`}>{label}</span>
        {Icon && <Icon size={14} className={color} />}
      </div>
      <span className={`text-2xl font-black ${color}`}>{value}</span>
      {sub && <span className="text-[11px] text-white/30">{sub}</span>}
    </div>
  );
}

/* ── Setup Form ──────────────────────────────────────────────────────────── */
function SetupForm({ interviewRecord, onPlanReady }) {
  const defaultDate = useMemo(() => {
    const d = new Date(); d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  }, []);

  const [form, setForm] = useState({
    goal:            interviewRecord?.exam        || "",
    current_level:   interviewRecord?.difficulty  || "Beginner",
    daily_hours:     3,
    target_date:     defaultDate,
    language:        "en",
    strong_subjects: interviewRecord?.strongSubjects || [],
    weak_subjects:   interviewRecord?.weakSubjects   || [],
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const toggle = (type, s) => {
    const key = type === "strong" ? "strong_subjects" : "weak_subjects";
    setForm(p => ({
      ...p,
      [key]: p[key].includes(s) ? p[key].filter(x => x !== s) : [...p[key], s],
    }));
  };

  /* Subject list filtered by selected exam */
  const examSubjects = form.goal ? (SUBJECT_MAPPING[form.goal] || SUBJECTS.slice(0, 12)) : SUBJECTS.slice(0, 12);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!form.goal) { setError("Please select a target exam."); return; }
    setError(null);
    setLoading(true);

    /* 1. Try backend first */
    try {
      const res = await aiAxios.post("/ai-tutor/create-study-plan", {
        ...form, daily_hours: Number(form.daily_hours),
      });
      if (res.data?.success && res.data?.data) {
        onPlanReady(res.data.data);
        return;
      }
    } catch { /* fall through to local */ }

    /* 2. Local generation — always works */
    const localPlan = generateLocalPlan({
      exam:           form.goal,
      subject:        interviewRecord?.subject || examSubjects[0] || "",
      weakSubjects:   form.weak_subjects,
      strongSubjects: form.strong_subjects,
      difficulty:     form.current_level,
      dailyHours:     Number(form.daily_hours),
      targetDate:     form.target_date,
      score:          interviewRecord?.score   || 0,
      correct:        interviewRecord?.correct || 0,
      total:          interviewRecord?.total   || 0,
    });
    onPlanReady(localPlan);
    setLoading(false);
  };

  const sel = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-colors appearance-none";

  return (
    <div className="h-full overflow-y-auto bg-[#0b0f1a] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden px-6 pt-8 pb-6 bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-[#0b0f1a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_70%)]" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles size={18} className="text-emerald-400" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">AI Study Planner</span>
            </div>
            <h1 className="text-2xl font-black text-white leading-tight">
              Build Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Personalized Plan
              </span>
            </h1>
            <p className="text-white/40 text-xs mt-2">Based on your interview performance · Generates in seconds</p>
          </div>
          {/* Interview score badge */}
          {interviewRecord?.exam && (
            <div className="text-right bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <p className="text-[10px] text-white/40 uppercase tracking-wide mb-1">Interview Data</p>
              <p className="text-base font-black text-white">{interviewRecord.exam}</p>
              {interviewRecord.total > 0 && (
                <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                  {interviewRecord.correct}/{interviewRecord.total} correct
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleGenerate} className="px-6 pb-8 space-y-5 mt-2">
        {/* Interview pre-fill notice */}
        {interviewRecord?.exam && !loading && (
          <div className="flex items-start gap-2.5 bg-blue-500/10 border border-blue-500/25 rounded-xl px-4 py-3">
            <AlertCircle size={14} className="text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-300 leading-relaxed">
              Pre-filled from your interview — <strong>{interviewRecord.exam}</strong>. Adjust if needed, then generate.
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
            <AlertCircle size={14} className="text-red-400 shrink-0" />
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        {/* Target Exam */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Target Exam <span className="text-red-400">*</span></label>
          <select value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} className={sel}>
            <option value="" className="bg-[#1a1d27]">Choose exam…</option>
            {EXAMS.map(ex => <option key={ex} value={ex} className="bg-[#1a1d27]">{ex}</option>)}
          </select>
        </div>

        {/* Level + Hours */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Level</label>
            <select value={form.current_level} onChange={e => setForm({ ...form, current_level: e.target.value })} className={sel}>
              {LEVELS.map(l => <option key={l} value={l} className="bg-[#1a1d27]">{l}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Daily Hours</label>
            <input type="number" min={1} max={12} value={form.daily_hours}
              onChange={e => setForm({ ...form, daily_hours: e.target.value })}
              className={sel} />
          </div>
        </div>

        {/* Target Date */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Target Date <span className="text-red-400">*</span></label>
          <input type="date" value={form.target_date} min={new Date().toISOString().split("T")[0]}
            onChange={e => setForm({ ...form, target_date: e.target.value })} className={sel} />
        </div>

        {/* Strong Subjects */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
            <Star size={11} className="text-emerald-400" /> Strong Subjects
          </label>
          <div className="flex flex-wrap gap-1.5">
            {examSubjects.map(s => (
              <button key={s} type="button" onClick={() => toggle("strong", s)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer
                  ${form.strong_subjects.includes(s)
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-900/50"
                    : "bg-white/4 text-white/50 border-white/10 hover:border-emerald-500/40 hover:text-white/80"}`}>
                {form.strong_subjects.includes(s) ? "✓ " : ""}{s}
              </button>
            ))}
          </div>
        </div>

        {/* Weak Subjects */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
            <AlertTriangle size={11} className="text-red-400" /> Weak Subjects
          </label>
          <div className="flex flex-wrap gap-1.5">
            {examSubjects.map(s => (
              <button key={s} type="button" onClick={() => toggle("weak", s)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer
                  ${form.weak_subjects.includes(s)
                    ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-900/50"
                    : "bg-white/4 text-white/50 border-white/10 hover:border-red-500/40 hover:text-white/80"}`}>
                {form.weak_subjects.includes(s) ? "✗ " : ""}{s}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="flex gap-2">
          {["en", "hi"].map(lang => (
            <button key={lang} type="button" onClick={() => setForm({ ...form, language: lang })}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer
                ${form.language === lang ? "bg-emerald-500 text-white border-emerald-500" : "bg-white/4 text-white/40 border-white/10 hover:border-white/20"}`}>
              {lang === "hi" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button type="submit" disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-sm
            hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2
            shadow-xl shadow-emerald-900/40 disabled:opacity-50 cursor-pointer">
          {loading
            ? <><Loader2 size={18} className="animate-spin" /> Generating your plan…</>
            : <><Sparkles size={18} /> Generate AI Study Plan</>}
        </button>
      </form>
    </div>
  );
}

/* ── Task Card ───────────────────────────────────────────────────────────── */
function TaskCard({ task, isActive, onToggle, onComplete, completing }) {
  const statusColor = task.completed
    ? "border-emerald-500/30 bg-emerald-500/5"
    : isActive
      ? "border-white/20 bg-white/6"
      : "border-white/8 bg-white/3 hover:border-white/14";

  return (
    <div className={`border rounded-2xl transition-all duration-200 overflow-hidden ${statusColor}`}>
      {/* Row */}
      <div className="flex items-center gap-3 px-4 py-3.5 cursor-pointer" onClick={onToggle}>
        {/* Checkbox */}
        <button type="button" disabled={task.completed || completing}
          onClick={e => { e.stopPropagation(); onComplete(); }}
          className={`shrink-0 transition-all cursor-pointer disabled:cursor-default
            ${task.completed ? "text-emerald-500" : "text-white/20 hover:text-emerald-400"}`}>
          {completing ? <Loader2 size={20} className="animate-spin text-emerald-400" />
            : task.completed ? <CheckCircle2 size={20} />
            : <Circle size={20} />}
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full shrink-0">
              Day {task.day}
            </span>
            {task.completed && (
              <span className="text-[10px] text-emerald-500 font-bold">✓ Done</span>
            )}
          </div>
          <p className={`text-sm font-semibold truncate ${task.completed ? "text-white/30 line-through" : "text-white/90"}`}>
            {task.title}
          </p>
        </div>

        {isActive ? <ChevronUp size={14} className="text-white/30 shrink-0" />
          : <ChevronDown size={14} className="text-white/30 shrink-0" />}
      </div>

      {/* Expanded Detail */}
      {isActive && (
        <div className="px-4 pb-4 space-y-2.5 border-t border-white/6 pt-3">
          {/* What to study */}
          {task.what_to_study && (
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <BookOpen size={12} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">What to Study</span>
              </div>
              <p className="text-xs text-blue-200/80 leading-relaxed whitespace-pre-line">{task.what_to_study}</p>
            </div>
          )}

          {/* How to study */}
          {task.how_to_study && (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Lightbulb size={12} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">How to Study</span>
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed whitespace-pre-line">{task.how_to_study}</p>
            </div>
          )}

          {/* Weakness / tip */}
          {task.weakness && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <AlertTriangle size={12} className="text-red-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Common Weakness</span>
              </div>
              <p className="text-xs text-red-200/80 leading-relaxed">{task.weakness}</p>
            </div>
          )}

          {/* Description fallback */}
          {!task.what_to_study && !task.how_to_study && task.description && (
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              <p className="text-xs text-white/60 leading-relaxed">{task.description}</p>
            </div>
          )}

          {!task.completed && (
            <button type="button" onClick={e => { e.stopPropagation(); onComplete(); }}
              disabled={completing}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors w-fit">
              <CheckCircle2 size={13} /> Mark Day {task.day} Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Plan View ───────────────────────────────────────────────────────────── */
function PlanView({ plan, onReset, onComplete, completing }) {
  const [activeTask, setActiveTask] = useState(null);
  const [filter, setFilter] = useState("all"); // all | pending | done

  const tasks        = plan?.tasks || [];
  const completedCnt = tasks.filter(t => t.completed).length;
  const totalCnt     = tasks.length;
  const progress     = totalCnt > 0 ? Math.round((completedCnt / totalCnt) * 100) : 0;
  const streak       = computeStreak(tasks);
  const currentTask  = tasks.find(t => !t.completed) || tasks[0];

  const progressColor = progress >= 80 ? "#10b981" : progress >= 50 ? "#f59e0b" : "#3b82f6";
  const daysLeft = (() => {
    if (!plan?.target_date) return null;
    const diff = Math.ceil((new Date(plan.target_date) - new Date()) / 86400000);
    return diff > 0 ? diff : 0;
  })();

  const filtered = filter === "pending" ? tasks.filter(t => !t.completed)
    : filter === "done" ? tasks.filter(t => t.completed)
    : tasks;

  return (
    <div className="h-full flex flex-col bg-[#0b0f1a] text-white overflow-hidden">

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900/40 via-teal-900/20 to-[#0b0f1a] px-5 pt-5 pb-4 shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.12),transparent_60%)]" />
        <div className="relative z-10">
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {plan?.isLocal && (
                  <span className="text-[9px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                    AI Generated
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-white leading-tight">{plan?.goal}</h2>
              <div className="flex items-center flex-wrap gap-3 text-xs text-white/40 mt-1">
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} />
                  Target: {plan?.target_date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {plan?.daily_hours}h/day
                </span>
                <span className="capitalize text-white/50 font-semibold">{plan?.current_level}</span>
                {daysLeft !== null && (
                  <span className={`font-semibold ${daysLeft <= 7 ? "text-red-400" : "text-white/50"}`}>
                    {daysLeft} days left
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onReset} title="New Plan"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors cursor-pointer">
                <RefreshCw size={13} className="text-white/40" />
              </button>
              <RingProgress pct={progress} size={72} stroke={6} color={progressColor} />
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2">
            <StatCard label="Done"      value={`${completedCnt}/${totalCnt}`}
              color="text-white"   bg="bg-white/5 border-white/8"      icon={CheckCircle2} />
            <StatCard label="Strengths" value={plan?.strong_subjects?.length || 0}
              color="text-emerald-400" bg="bg-emerald-500/10 border-emerald-500/20" icon={TrendingUp} />
            <StatCard label="Weak"      value={plan?.weak_subjects?.length || 0}
              color="text-red-400"    bg="bg-red-500/10 border-red-500/20"     icon={AlertTriangle} />
            <StatCard label="Streak"    value={`${streak}d`}
              color="text-orange-400" bg="bg-orange-500/10 border-orange-500/20" icon={Flame} />
          </div>

          {/* Interview score row (if available) */}
          {plan?.interview_total > 0 && (
            <div className="mt-3 flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5">
              <BarChart2 size={14} className="text-blue-400 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wide">Interview Accuracy</span>
                  <span className="text-xs font-black text-white">
                    {plan.interview_correct}/{plan.interview_total} ({plan.interview_accuracy}%)
                  </span>
                </div>
                <MiniBar pct={plan.interview_accuracy}
                  color={plan.interview_accuracy >= 70 ? "bg-emerald-500" : plan.interview_accuracy >= 40 ? "bg-yellow-400" : "bg-red-500"} />
              </div>
            </div>
          )}

          {/* Subject chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {plan?.strong_subjects?.map(s => (
              <span key={s} className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-400 text-[11px] rounded-full border border-emerald-500/25 font-semibold">
                ✓ {s}
              </span>
            ))}
            {plan?.weak_subjects?.map(s => (
              <span key={s} className="px-2.5 py-0.5 bg-red-500/15 text-red-400 text-[11px] rounded-full border border-red-500/25 font-semibold">
                ✗ {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Current Task Highlight ────────────────────────────────────────── */}
      {currentTask && completedCnt < totalCnt && (
        <div className="px-5 pt-3 pb-1 shrink-0">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border border-emerald-500/30 px-4 py-3">
            <div className="flex items-center gap-2 mb-0.5">
              <Zap size={13} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Today's Focus</span>
            </div>
            <p className="text-sm font-bold text-white">Day {currentTask.day}: {currentTask.title}</p>
          </div>
        </div>
      )}

      {/* Completion banner */}
      {progress === 100 && (
        <div className="mx-5 mt-3 shrink-0 flex items-center gap-3 bg-yellow-500/15 border border-yellow-500/30 rounded-2xl px-4 py-3">
          <Trophy size={18} className="text-yellow-400" />
          <div>
            <p className="text-sm font-black text-yellow-300">🎉 Plan Completed!</p>
            <p className="text-xs text-yellow-400/70">You've completed all tasks. Start a new plan to continue.</p>
          </div>
        </div>
      )}

      {/* ── Filter tabs + Task list ───────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pb-5 min-h-0">
        <div className="flex items-center justify-between py-3 sticky top-0 bg-[#0b0f1a] z-10">
          <div className="flex gap-1.5">
            {[["all","All"], ["pending","Pending"], ["done","Done"]].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer
                  ${filter === v ? "bg-emerald-500 text-white" : "bg-white/6 text-white/40 hover:bg-white/10"}`}>
                {l}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-white/30">{filtered.length} tasks</span>
        </div>

        <div className="space-y-2">
          {filtered.map(task => (
            <TaskCard key={task.day} task={task}
              isActive={activeTask === task.day}
              onToggle={() => setActiveTask(activeTask === task.day ? null : task.day)}
              onComplete={() => onComplete(task.day)}
              completing={completing === task.day} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Root Export ─────────────────────────────────────────────────────────── */
export default function StudyPlannerPanel({ interviewRecord = null, autoGenerate = false }) {
  const [view, setView]           = useState("loading");
  const [plan, setPlan]           = useState(null);
  const [completing, setCompleting] = useState(null);
  const [error, setError]         = useState(null);

  /* On mount: if we have interview data always show form (fresh context).
     Otherwise try to load existing plan from backend. */
  useEffect(() => {
    if (interviewRecord?.exam) {
      if (autoGenerate) {
        handleAutoGenerate();
      } else {
        setView("form");
      }
    } else {
      loadExisting();
    }
  }, []); // eslint-disable-line

  const loadExisting = async () => {
    setView("loading");
    try {
      const res = await aiAxios.get("/ai-tutor/my-study-plan");
      const data = res.data;
      if (data?.tasks?.length) {
        setPlan(data);
        setView("plan");
      } else {
        setView("form");
      }
    } catch {
      setView("form");
    }
  };

  const handleAutoGenerate = async () => {
    setView("loading");
    try {
      const res = await aiAxios.post("/ai-tutor/create-study-plan", {
        goal:            interviewRecord.exam,
        current_level:   interviewRecord.difficulty  || "Beginner",
        daily_hours:     3,
        target_date:     (() => { const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().split("T")[0]; })(),
        language:        "en",
        strong_subjects: interviewRecord.strongSubjects || [],
        weak_subjects:   interviewRecord.weakSubjects   || [],
      });
      if (res.data?.success && res.data?.data) {
        setPlan(res.data.data); setView("plan"); return;
      }
    } catch { /* fall through */ }

    /* Local fallback */
    const local = generateLocalPlan({
      exam:           interviewRecord.exam,
      subject:        interviewRecord.subject || "",
      weakSubjects:   interviewRecord.weakSubjects   || [],
      strongSubjects: interviewRecord.strongSubjects || [],
      difficulty:     interviewRecord.difficulty  || "Beginner",
      dailyHours:     3,
      score:          interviewRecord.score   || 0,
      correct:        interviewRecord.correct || 0,
      total:          interviewRecord.total   || 0,
    });
    setPlan(local); setView("plan");
  };

  const handlePlanReady = (p) => { setPlan(p); setView("plan"); };
  const handleReset     = ()  => { setPlan(null); setView("form"); };

  const handleComplete = async (day) => {
    if (completing) return;
    setCompleting(day);
    try {
      if (!plan?.isLocal && plan?._id) {
        await aiAxios.patch(`/ai-tutor/complete-task/${plan._id}/${day}`);
      }
    } catch { /* ignore — update UI anyway */ }
    setPlan(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.day === day ? { ...t, completed: true } : t),
    }));
    setCompleting(null);
  };

  /* ── Views ── */
  if (view === "loading") return (
    <div className="h-full flex flex-col items-center justify-center gap-4 bg-[#0b0f1a]">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <Sparkles size={24} className="text-emerald-400" />
        </div>
        <Loader2 size={14} className="absolute -bottom-1 -right-1 animate-spin text-emerald-400" />
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-white/60">Loading Study Planner</p>
        <p className="text-xs text-white/25 mt-0.5">Preparing your personalized plan…</p>
      </div>
    </div>
  );

  if (view === "form") return (
    <SetupForm interviewRecord={interviewRecord} onPlanReady={handlePlanReady} />
  );

  return (
    <PlanView plan={plan} onReset={handleReset}
      onComplete={handleComplete} completing={completing} />
  );
}
