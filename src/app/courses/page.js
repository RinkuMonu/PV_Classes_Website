"use client";
import { useMemo, useRef, useState } from "react";

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "all-india", name: "All India Exams" },
  { id: "rajasthan", name: "Rajasthan Exams" },
  { id: "up", name: "Uttar Pradesh Exams" },
  { id: "ugc-net", name: "UGC NET/JRF" },
  { id: "railway", name: "Railway" },
  { id: "ssc", name: "SSC" },
  { id: "bank", name: "Bank" },
  { id: "defence", name: "Defence" },
  { id: "current-affairs", name: "Current Affairs" },
  { id: "ncert", name: "NCERT" },
];

const COURSES = [
  {
    id: "c1",
    title: "Comprehensive GK & GS (Foundation)",
    tags: ["Recorded + Live", "PDFs", "Tests"],
    label: "Bestseller",
    mode: "Online",
    exams: ["All India", "SSC", "Bank"],
    thumb: "https://placehold.co/640x360/png",
    price: 1499,
    strikePrice: 3999,
    language: "Hindi + English",
    rating: 4.7,
  },
  {
    id: "c2",
    title: "Current Affairs Power Batch (6 Months)",
    tags: ["Weekly CA", "MCQs", "Mentorship"],
    label: "New",
    mode: "Online",
    exams: ["All India", "Railway", "State PSC"],
    thumb: "https://placehold.co/640x360/png",
    price: 999,
    strikePrice: 2499,
    language: "Hindi",
    rating: 4.8,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="container mx-auto px-4">
        <CategoryRail />
        <Filters />
        <CourseGrid />
      </section>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_50%_-50%,#e5e5e5,transparent)]" />
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-600">
              <span>New UI</span> <span className="opacity-60">•</span> <span>Fast & Accessible</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Learn GK & GS with <span className="underline decoration-neutral-300">Kumar Gaurav Sir</span>
            </h1>
            <p className="mt-4 max-w-xl text-neutral-600">
              Live + recorded classes, structured notes, quizzes, and tests.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#courses" className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">Browse Courses</a>
              <button className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-neutral-50">Download PDFs</button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <img src="https://placehold.co/800x450/png" alt="Course preview" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryRail() {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };
  return (
    <section className="py-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Choose your exam category</h2>
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => scroll("left")} className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-50">◀</button>
          <button onClick={() => scroll("right")} className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-50">▶</button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
        {CATEGORIES.map((c) => (
          <button key={c.id} className="snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm text-neutral-700 hover:border-black hover:text-black">
            {c.name}
          </button>
        ))}
      </div>
    </section>
  );
}

function Filters() {
  const [query, setQuery] = useState("");
  const [modes, setModes] = useState([]);
  const [lang, setLang] = useState(null);
  const toggleMode = (m) => setModes((list) => (list.includes(m) ? list.filter((x) => x !== m) : [...list, m]));
  return (
    <section className="mb-6 mt-2 rounded-xl border bg-white/60 p-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Search</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search courses, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-black/60"
            />
            <button className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-neutral-50">Search</button>
          </div>
        </div>
        <div>
          <span className="mb-1 block text-sm font-medium">Mode</span>
          <div className="flex flex-wrap gap-2">
            {["Online", "Offline", "Hybrid"].map((m) => (
              <button
                key={m}
                onClick={() => toggleMode(m)}
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${modes.includes(m) ? "border-black bg-black text-white" : "border-neutral-300 text-neutral-700"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="mb-1 block text-sm font-medium">Language</span>
          <div className="flex gap-2">
            {["Hindi", "English", "Hindi + English"].map((l) => (
              <button
                key={l}
                onClick={() => setLang((curr) => (curr === l ? null : l))}
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${lang === l ? "border-black bg-black text-white" : "border-neutral-300 text-neutral-700"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="sr-only">
        Current search: {query || "none"}. Modes: {modes.join(", ") || "any"}. Language: {lang || "any"}.
      </div>
    </section>
  );
}

function CourseGrid() {
  const [sort, setSort] = useState("popular");
  const [query] = useState("");
  const courses = useMemo(() => {
    let list = COURSES;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q));
    }
    if (sort === "price") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "new") list = [...list].sort((a, b) => (b.label === "New" ? 1 : -1));
    return list;
  }, [sort, query]);

  return (
    <section id="courses" className="pb-10">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Courses</h3>
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-600">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-2 py-1.5 text-sm"
          >
            <option value="popular">Popular</option>
            <option value="new">New</option>
            <option value="price">Price (Low to High)</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <article key={c.id} className="group overflow-hidden rounded-xl border bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative">
              <img src={c.thumb} alt="" className="h-40 w-full object-cover" />
              {c.label && (
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-black bg-black px-2.5 py-1 text-xs font-medium text-white">{c.label}</span>
              )}
            </div>
            <div className="p-4">
              <h4 className="line-clamp-2 text-base font-semibold">{c.title}</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-700">{t}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                  <span className="font-medium">{c.mode}</span> • {c.language || "—"}
                </div>
                {typeof c.rating === "number" && (
                  <div className="text-sm">⭐ {c.rating}</div>
                )}
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="text-xl font-bold">₹{c.price}</div>
                  {c.strikePrice && <div className="text-sm text-neutral-400 line-through">₹{c.strikePrice}</div>}
                </div>
                <button className="inline-flex items-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">Buy Now</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1 text-xs text-neutral-600">
                {c.exams.map((e) => (
                  <span key={e} className="rounded bg-neutral-100 px-2 py-1">{e}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
