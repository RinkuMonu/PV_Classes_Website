"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";

// =============================
// Small UI helpers
// =============================
const Dot = () => (
  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-neutral-400" />
);

const Star = ({ filled = true }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor">
    <path d="M12 2l2.09 6.26L20 10.27l-6 4.36L16.18 22 12 18.9 7.82 22 10 14.63l-6-4.36 5.91-2.01L12 2z" />
  </svg>
);

const Rating = ({ value }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1 text-yellow-500" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < full || (half && i === full)} />
      ))}
    </div>
  );
};

// =============================
// Types
// =============================
// NOTE: TypeScript type annotations are not valid in .js files.
// If you want to use types, rename this file to .ts or .tsx and use the type below.
// Otherwise, you can use JSDoc for type hints in JS files, e.g.:
/**
 * @typedef {Object} CourseItem
 * @property {string} id
 * @property {string} title
 * @property {string} duration - e.g. "01:54"
 * @property {string} [previewUrl] - if present -> playable preview
 * @property {boolean} [locked] - if true -> show lock
 * @property {{description?: string, points?: string[]}} [details]
 */
function IconPlay(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
    </svg>
  );
}

function IconLock(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3H9Z"
      />
    </svg>
  );
}

function IconChevron(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// =============================
// Simple Video Modal
// =============================
function VideoModal({ open, onClose, src, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[min(92vw,960px)] rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="truncate pr-4 text-lg font-semibold">{title ?? "Preview"}</h3>
          <button onClick={onClose} className="rounded-full px-3 py-1 text-sm hover:bg-neutral-100">
            Close
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-b-2xl bg-black">
          {src ? (
            <video key={src} className="h-full w-full" src={src} controls autoPlay playsInline />
          ) : (
            <div className="grid h-full w-full place-items-center text-white/70">No preview available</div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================
// Demo data (replace with your API data)
// =============================
const demoSections = [
  {
    title: "Introduction",
    meta: "2 lectures • 3m 55s",
    items: [
      {
        id: "v1",
        title: "Start Here First (Important Course Details)",
        duration: "01:54",
        previewUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        details: {
          description: "Orientation to the course, structure, and how to get the most value in minimum time.",
          points: [
            "How the course is organized",
            "Where to find resources & updates",
            "Suggested learning path",
          ],
        },
      },
      {
        id: "v2",
        title: "Sneak Peek of What's to Come + 185 Page E‑Book",
        duration: "02:01",
        previewUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        details: {
          description: "Quick tour of the toolkit and the companion e‑book.",
          points: [
            "Download the e‑book from Resources",
            "Top 5 workflows you'll build",
            "How to ask for help",
          ],
        },
      },
    ],
  },
  {
    title: "Getting Started",
    meta: "3 lectures • 12m 10s",
    items: [
      { id: "v3", title: "Setup & Tools", duration: "04:45", locked: true, details: { description: "Install the basics and validate access.", points: ["Create accounts", "API keys overview"] } },
      { id: "v4", title: "Your First Build", duration: "03:12", locked: true, details: { description: "Hello world workflow and export.", points: ["Prompt template", "Export to doc"] } },
      { id: "v5", title: "Pro Tips", duration: "04:13", locked: true, details: { description: "Speed & safety tips before scaling.", points: ["Guardrails", "Iteration loops"] } },
    ],
  },
];

// =============================
// Accordion (named export)
// =============================
export function CourseAccordion({ sections }) {
  sections = sections || demoSections;
  const [open, setOpen] = React.useState([0]);
  const [playing, setPlaying] = React.useState(null);
  const [itemOpen, setItemOpen] = React.useState({});

  const allOpen = React.useMemo(() => open.length === sections.length, [open.length, sections.length]);

  const toggle = (i) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].sort((a, b) => a - b)));

  const toggleItem = (id) => setItemOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  const expandAll = () => setOpen(sections.map((_, i) => i));
  const collapseAll = () => setOpen([]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Course content</h2>
          <p className="text-sm text-neutral-600">
            {sections.length} sections • {sections.reduce((acc, s) => acc + s.items.length, 0)} lectures
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-sm underline" onClick={allOpen ? collapseAll : expandAll}>
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      </div>

      <div className="mt-4 divide-y">
        {sections.map((s, i) => {
          const isOpen = open.includes(i);
          return (
            <div key={s.title} className="py-3">
              <button onClick={() => toggle(i)} className="flex w-full items-center justify-between gap-3 text-left" aria-expanded={isOpen}>
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border transition-colors ${
                      isOpen ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                  <span className="font-semibold">{s.title}</span>
                </div>
                <span className="text-sm text-neutral-600">{s.meta}</span>
              </button>

              <div className={`overflow-hidden transition-all ${isOpen ? "mt-3" : "max-h-0"}`}>
                <ul className="space-y-2">
                  {s.items.map((it) => {
                    const isItemOpen = !!itemOpen[it.id];
                    return (
                      <li key={it.id} className="rounded-xl border">
                        {/* Row */}
                        <div className="flex items-center justify-between px-3 py-2 text-sm">
                          {/* Left: expand + icon + title + badges */}
                          <button
                            onClick={() => toggleItem(it.id)}
                            className="flex min-w-0 items-center gap-2 text-left text-neutral-800"
                            aria-expanded={isItemOpen}
                          >
                            <IconChevron className={`h-4 w-4 text-neutral-400 transition-transform ${isItemOpen ? "rotate-180" : "rotate-0"}`} />
                            {it.locked ? (
                              <IconLock className="h-4 w-4 text-neutral-400" />
                            ) : (
                              <IconPlay className="h-4 w-4 text-neutral-500" />
                            )}
                            <span className="truncate" title={it.title}>
                              {it.title}
                            </span>
                            {!it.locked && it.previewUrl && (
                              <span className="ml-2 shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">Preview</span>
                            )}
                            {it.locked && (
                              <span className="ml-2 shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">Locked</span>
                            )}
                          </button>

                          {/* Right: duration + play */}
                          <div className="ml-3 flex shrink-0 items-center gap-3">
                            <span className="tabular-nums text-neutral-500">{it.duration}</span>
                            {!it.locked ? (
                              <button
                                onClick={() => setPlaying({ src: it.previewUrl, title: it.title })}
                                disabled={!it.previewUrl}
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                  it.previewUrl ? "bg-neutral-900 text-white hover:bg-neutral-800" : "cursor-not-allowed bg-neutral-200 text-neutral-500"
                                }`}
                              >
                                {it.previewUrl ? "Play" : "No preview"}
                              </button>
                            ) : (
                              <button disabled className="cursor-not-allowed rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500" title="Enroll to unlock">
                                Enroll to watch
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Nested accordion content */}
                        <div className={`overflow-hidden transition-all ${isItemOpen ? "max-h-[420px]" : "max-h-0"}`}>
                          <div className="mx-3 mb-3 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-700">
                            {it.details?.description && <p className="mb-2">{it.details.description}</p>}
                            {it.details?.points && it.details.points.length > 0 && (
                              <ul className="list-disc space-y-1 pl-5">
                                {it.details.points.map((p, idx) => (
                                  <li key={idx}>{p}</li>
                                ))}
                              </ul>
                            )}
                            {!it.details && <div className="text-neutral-500">No extra details for this topic.</div>}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <VideoModal open={!!playing} onClose={() => setPlaying(null)} src={playing?.src} title={playing?.title} />
    </div>
  );
}

// =============================
// Left blocks
// =============================
const LearnList = () => {
  const points = [
    "Create content & synthesize info with prompt engineering",
    "Turn creativity into paid work using ChatGPT",
    "Use 50+ AI tools for marketing & growth",
    "Plan/prioritize tasks with AI to save hours",
    "Improve communication & leadership with AI feedback",
    "Generate ads, newsletters & campaigns",
    "Create AI voiceovers for any use-case",
    "Automate research & note-taking",
  ];
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">What you'll learn</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(show ? points : points.slice(0, 6)).map((t, i) => (
          <div key={i} className="flex items-start gap-3 text-[15px] text-neutral-800">
            <Dot />
            <span>{t}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setShow((s) => !s)} className="mt-4 text-sm font-semibold underline">
        {show ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

// const Requirements = () => (
//   <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
//     <h2 className="text-xl font-bold">Requirements</h2>
//     <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-800">
//       <li>No prior AI experience needed</li>
//       <li>A computer with internet access</li>
//       <li>Curiosity to experiment and iterate</li>
//     </ul>
//   </div>
// );

const Description = () => {
  const [more, setMore] = useState(false);
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Description</h2>
      <div className="prose prose-neutral mt-3 max-w-none text-[15px]">
        <p>
          This course is a practical, business-focused guide to using ChatGPT and modern generative AI tools. You'll move
          from fundamentals to workflows that 10x productivity, content and decision‑making.
        </p>
        {more && (
          <>
            <p>
              We'll cover prompt patterns, structured outputs, marketing use‑cases, research automation and safety. Each
              module ends with projects you can ship immediately.
            </p>
            <p>By the end, you'll have reusable prompts and mini-systems that compound over time.</p>
          </>
        )}
        <button onClick={() => setMore((m) => !m)} className="mt-2 text-sm font-semibold underline">
          {more ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
};

const Instructors = () => (
  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-bold">Instructors</h2>
    <div className="mt-4 flex items-start gap-4">
      <div className="h-14 w-14 rounded-full bg-neutral-200" />
      <div>
        <h3 className="font-semibold">Julian Melanson • Benza Maman</h3>
        <p className="text-sm text-neutral-600">AI educator, entrepreneur</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-neutral-700">
          <span className="flex items-center gap-1">
            <Star /> 4.6 instructor rating
          </span>
          <span>294k students</span>
          <span>20 courses</span>
        </div>
      </div>
    </div>
  </div>
);

const Feedback = () => (
  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-bold">Student feedback</h2>
    <div className="mt-4 grid items-center gap-6 md:grid-cols-3">
      <div className="text-center">
        <div className="text-5xl font-extrabold">4.5</div>
        <div className="mt-1 flex items-center justify-center gap-2">
          <Rating value={4.5} />
        </div>
        <div className="mt-1 text-sm text-neutral-600">51,338 ratings</div>
      </div>
      <div className="md:col-span-2 space-y-3 text-sm">
        {[
          { l: "5 stars", p: 62 },
          { l: "4 stars", p: 25 },
          { l: "3 stars", p: 8 },
          { l: "2 stars", p: 3 },
          { l: "1 star", p: 2 },
        ].map((r) => (
          <div key={r.l} className="flex items-center gap-3">
            <span className="w-16 text-right text-neutral-600">{r.l}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
              <div className="h-full bg-neutral-900" style={{ width: `${r.p}%` }} />
            </div>
            <span className="w-8 text-right">{r.p}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// =============================
// Right sticky sidebar
// =============================
const SidebarCard = () => {
  const [tab, setTab] = useState("personal");

  const TabBtn = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`relative py-3 text-[15px] font-semibold ${tab === id ? "text-neutral-900" : "text-neutral-600"}`}
      aria-selected={tab === id}
      role="tab"
    >
      {label}
      {tab === id && <span className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-neutral-900" />}
    </button>
  );

  return (
    <aside className="h-fit space-y-4 lg:sticky lg:top-36">
      <div className="bg-blue-100" />
      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
        {/* Tabs header */}
        <div className="px-4 pt-3">
          <div className="grid grid-cols-2 border-b" role="tablist">
            <TabBtn id="personal" label="Personal" />
            <TabBtn id="teams" label="Teams" />
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {tab === "personal" ? (
            <>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                <span>This Premium course is included in plans</span>
              </div>

              <h3 className="mt-4 text-[22px] font-extrabold leading-6">Subscribe to PV Classes top courses</h3>
              <p className="mt-1 text-sm text-neutral-700">
                Get this course, plus 26,000+ of our top-rated courses, with Personal Plan. <a href="#" className="underline">Learn more</a>
              </p>

              <button className="mt-4 w-full rounded-md bg-violet-700 py-3 font-semibold text-white transition hover:bg-violet-800">Start subscription</button>
              <div className="mt-2 text-center text-xs text-neutral-600">
                Starting at <span className="line-through">₹500</span> <span className="font-semibold text-neutral-900">₹400</span> per month
              </div>
              <div className="text-center text-xs text-neutral-600">Cancel anytime</div>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-200" />
                <span className="text-xs text-neutral-500">or</span>
                <div className="h-px flex-1 bg-neutral-200" />
              </div>

              <div className="text-2xl font-bold">
                ₹509 <span className="text-sm font-medium text-neutral-500 line-through">₹2,739</span> <span className="text-sm font-semibold text-emerald-600">81% off</span>
              </div>

              <button className="mt-3 w-full rounded-md bg-violet-700 py-3 font-semibold text-white hover:bg-violet-800">Add to cart</button>
              <button className="mt-3 w-full rounded-md border border-violet-600 py-3 font-semibold text-violet-700 hover:bg-violet-50">Buy now</button>

              <div className="mt-4 text-center text-xs text-neutral-600">
                <div>30-Day Money-Back Guarantee</div>
                <div>Full Lifetime Access</div>
              </div>
              <div className="mt-4 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-3 text-sm">
                <div>
                  <span className="font-semibold">NVDIN35</span> is applied
                </div>
                <div className="-mt-0.5 text-xs text-neutral-500">PV Classes coupon</div>
              </div>

              <div className="mt-3 flex gap-2">
                <input type="text" placeholder="Enter Coupon" className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500" />
                <button className="rounded-md bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800">Apply</button>
              </div>
            </>
          ) : (
            // TEAMS TAB CONTENT
            <>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                <span>This Premium course is included in plans</span>
              </div>

              <div className="mt-4 text-2xl font-extrabold tracking-tight">
                <span className="mr-1">PV CLasses</span>
                <span className="text-violet-700">business</span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">Subscribe to this course and 30,000+ top-rated PV CLasses courses for your organization.</p>

              <button className="mt-4 w-full rounded-md bg-violet-700 py-3 font-semibold text-white transition hover:bg-violet-800">Try PV CLasses</button>

              <ul className="mt-4 space-y-3 text-sm text-neutral-800">
                {["For teams of 2 or more users", "30,000+ fresh & in-demand courses", "Learning Engagement tools", "SSO and LMS Integrations"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19l10.29-10.29-1.41-1.41z" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* This course includes */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold">This course includes</h3>
        <ul className="mt-3 space-y-2 text-sm text-neutral-800">
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            5 hours on-demand video
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24 24" fill="currentColor">
              <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            </svg>
            12 downloadable resources
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
            Certificate of completion
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Access on mobile and TV
          </li>
        </ul>
      </div>
    </aside>
  );
};

// =============================
// Public component to use below your hero
// =============================
export default function CourseBody() {
  return (
    <section className="relative z-10 pt-10 md:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh] bg-[#0f0f13]" />

      <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* LEFT */}
        <div className="space-y-6">
          <main>
            <section className="relative mb-20 min-h-screen text-white sm:min-h-[calc(100svh-200px)] md:min-h-[calc(100dvh-200px)]">
              <div className="mb-10 max-w-3xl px-4 py-8 md:py-12">
                <nav className="text-xs text-neutral-400 md:text-sm">
                  <ol className="flex flex-wrap items-center gap-2">
                    <li>
                      <Link href="/" className="hover:underline">
                        Home
                      </Link>
                    </li>
                    <li>›</li>
                    <li>
                      <Link href="/courses" className="hover:underline">
                        Courses
                      </Link>
                    </li>
                    <li>›</li>
                    <li>
                      <a href="#" className="">
                        GK &amp; GS Shiv Shakti Batch By Kumar Gaurav Sir
                      </a>
                    </li>
                  </ol>
                </nav>

                <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-[44px] md:leading-[1.15]">
                  The Complete AI Guide: Learn ChatGPT,
                  <br className="hidden md:block" />
                  Generative AI &amp; More
                </h1>

                <p className="mt-3 max-w-4xl text-base text-neutral-300 md:text-lg">
                  50+ Generative AI Tools to 10x Business, Productivity, Creativity | ChatGPT, Artificial Intelligence, Prompt Engineering
                </p>

                <div className="mt-4 mb-20 flex flex-wrap items-center gap-3">
                  <span className="rounded-md bg-emerald-700/20 px-3 py-1 text-xs font-semibold text-emerald-300">Code: 20575</span>
                  <span className="rounded-md bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">Validity: 200 Days</span>
                </div>
              </div>
            </section>
          </main>

          <LearnList />
          <CourseAccordion />
          {/* <Requirements /> */}
          <Description />
          <Instructors />
          <Feedback />
        </div>

        {/* RIGHT */}
        <SidebarCard />
      </div>
      <div className="h-10" />
    </section>
  );
}
