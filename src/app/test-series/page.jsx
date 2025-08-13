"use client";
import FilterDrawer from "../../components/FilterDrawer";
import ExamToolbar from "../../components/ExamToolbar";
import TestSeriesCard from "../../components/TestCard";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";

function Page() {
const testSeriesData = [
  {
    title: "Prayas JEE Hindi 2026",
    subtitle: "Test Series",
    tests: 20,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 50,
    category: "All India Exams",
    mode: "Online",
    language: "Hindi",
    isFree: false,
    tags: ["jee", "prayas", "hindi"],
  },
  {
    title: "NEET Rank Booster 2025",
    subtitle: "Full Syllabus",
    tests: 25,
    price: 999,
    originalPrice: 1999,
    validity: 365,
    image: "/test1.webp",
    badge: "ONLINE ENGLISH",
    discount: 50,
    category: "All India Exams",
    mode: "Online",
    language: "English",
    isFree: false,
    tags: ["neet", "rank booster"],
  },
  {
    title: "Foundation Class 10 2025",
    subtitle: "Test Series",
    tests: 15,
    price: 599,
    originalPrice: 1299,
    validity: 150,
    image: "/test1.webp",
    badge: "OFFLINE HINDI",
    discount: 54,
    category: "Rajasthan Exams",
    mode: "Offline",
    language: "Hindi",
    isFree: true,
    tags: ["foundation", "class 10"],
  },
  {
    title: "UPSC Prelims 2025",
    subtitle: "General Studies Paper 1",
    tests: 30,
    price: 1499,
    originalPrice: 2999,
    validity: 365,
    image: "/test1.webp",
    badge: "ONLINE ENGLISH",
    discount: 50,
    category: "All India Exams",
    mode: "Online",
    language: "English",
    isFree: false,
    tags: ["upsc", "prelims", "gs"],
  },
  {
    title: "SSC CGL Tier 1 2025",
    subtitle: "Mock Test Series",
    tests: 40,
    price: 0,
    originalPrice: 999,
    validity: 90,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 100,
    category: "All India Exams",
    mode: "Online",
    language: "Hindi",
    isFree: true,
    tags: ["ssc", "cgl", "mock tests"],
  },
  {
    title: "Railway Group D 2025",
    subtitle: "Complete Syllabus",
    tests: 20,
    price: 499,
    originalPrice: 999,
    validity: 120,
    image: "/test1.webp",
    badge: "OFFLINE HINDI",
    discount: 50,
    category: "All India Exams",
    mode: "Offline",
    language: "Hindi",
    isFree: false,
    tags: ["railway", "group d"],
  },
  {
    title: "UGC NET JRF Commerce 2025",
    subtitle: "Paper 1 + Paper 2",
    tests: 25,
    price: 1299,
    originalPrice: 2599,
    validity: 365,
    image: "/test1.webp",
    badge: "ONLINE ENGLISH",
    discount: 50,
    category: "UGC NET JRF",
    mode: "Online",
    language: "English",
    isFree: false,
    tags: ["ugc net", "commerce"],
  },
  {
    title: "MP Police Constable 2025",
    subtitle: "Full Syllabus Test Series",
    tests: 15,
    price: 0,
    originalPrice: 599,
    validity: 180,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 100,
    category: "Madhya Pradesh Exam",
    mode: "Online",
    language: "Hindi",
    isFree: true,
    tags: ["mp police", "constable"],
  },
  {
    title: "Bihar Teacher Eligibility Test 2025",
    subtitle: "Paper 1 & Paper 2",
    tests: 18,
    price: 799,
    originalPrice: 1599,
    validity: 180,
    image: "/test1.webp",
    badge: "OFFLINE HINDI",
    discount: 50,
    category: "Bihar Exams",
    mode: "Offline",
    language: "Hindi",
    isFree: false,
    tags: ["bihar tet", "teacher"],
  },
  {
    title: "Haryana Civil Services 2025",
    subtitle: "Prelims Test Series",
    tests: 20,
    price: 999,
    originalPrice: 1999,
    validity: 365,
    image: "/test1.webp",
    badge: "ONLINE ENGLISH",
    discount: 50,
    category: "Haryana Exams",
    mode: "Online",
    language: "English",
    isFree: false,
    tags: ["haryana", "civil services"],
  },
  {
    title: "Jharkhand SSC 2025",
    subtitle: "CGL Test Series",
    tests: 12,
    price: 599,
    originalPrice: 1299,
    validity: 150,
    image: "/test1.webp",
    badge: "ONLINE HINDI",
    discount: 54,
    category: "Jharkhand Exams",
    mode: "Online",
    language: "Hindi",
    isFree: false,
    tags: ["jharkhand", "ssc"],
  },
];


  const TOP_CATEGORIES = [
    "All India Exams",
    "Rajasthan Exams",
    "Uttar Pradesh Exams",
    "UGC NET JRF",
    "Madhya Pradesh Exam",
    "Bihar Exams",
    "Haryana Exams",
    "Jharkhand Exams",
  ];

  const langMatch = (itemLang, selectedLang) =>
    selectedLang === "All" || itemLang.toLowerCase() === selectedLang.toLowerCase();

  const [mode, setMode] = useState("Online");
  const [cat, setCat] = useState("All India Exams");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [filterOpen, setFilterOpen] = useState(false);
  const [lang, setLang] = useState("All");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    let items = testSeriesData.slice();

    if (cat) items = items.filter((c) => c.category === cat);
    if (mode) items = items.filter((c) => c.mode === mode);
    if (lang !== "All") items = items.filter((c) => langMatch(c.language, lang));
    if (freeOnly) items = items.filter((c) => c.isFree);

    if (q.trim()) {
      const s = q.toLowerCase();
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(s) ||
          c.subtitle.toLowerCase().includes(s) ||
          c.category.toLowerCase().includes(s) ||
          c.tags.some((t) => t.toLowerCase().includes(s))
      );
    }

    return items;
  }, [cat, mode, q, lang, freeOnly]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > pages) setPage(1);
  }, [pages, page]);

  return (
    <>
      <section className="relative w-full bg-[#00316B] text-white mb-10">
            <div className="absolute inset-0">
              <Image
                src="/book.jpg"
                alt="Banner"
                fill
                className="object-cover object-center opacity-70"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col items-center text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Government Exams Preparation & Download PDFs
              </h1>
              <p className="mt-4 text-lg sm:text-xl max-w-2xl">
                Prepare for your exams with the latest resources, mock tests, and study materials.
              </p>
            </div>
          </section>
      <ExamToolbar
        categories={TOP_CATEGORIES}
        selected={cat}
        onSelect={(c) => {
          setCat(c);
          setPage(1);
        }}
        mode={mode}
        onModeChange={(m) => {
          setMode(m);
          setPage(1);
        }}
        search={q}
        onSearch={(val) => {
          setQ(val);
          setPage(1);
        }}
        onOpenFilters={() => setFilterOpen(true)}
      />

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initialLanguage={lang}
        initialFreeOnly={freeOnly}
        onApply={({ language, freeOnly }) => {
          setLang(language);
          setFreeOnly(freeOnly);
          setPage(1);
        }}
      />

      <div className="px-3 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
          {pageItems.map((series, index) => (
            <TestSeriesCard key={index} {...series} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
