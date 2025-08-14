// "use client";

// import { useEffect, useMemo, useState } from "react";
// import SectionHeader from "../../components/SectionHeader";
// import ExamToolbar from "../../components/ExamToolbar";
// import CourseCard from "../../components/CourseCard";
// import CourseHero from "../../components/CourseHero";
// import FilterDrawer from "../../components/FilterDrawer";

// /* ---------- Sample data ---------- */
// const COURSES = [
//   {
//     id: "upsc-cse-2025",
//     title: "UPSC Civil Services Examination 2025 (Prelims + Mains + Interview)",
//     shortTitle: "UPSC CSE 2025",
//     thumbnail: "/Image/1exam.webp",
//     category: "UPSC",
//     tags: ["Syllabus", "Eligibility", "Current Affairs", "GS", "CSAT"],
//     rating: 4.8,
//     language: "Bilingual",
//     mode: "Online",
//     durationHours: 480,
//     validityDays: 200,
//     price: 24999,
//     discountedPrice: 14999,
//     isFree: false,
//     lastUpdated: "2025-07-10",
//   },
//   {
//     id: "ssc-cgl-2025",
//     title: "SSC CGL 2025 (Tier I + Tier II) Complete Prep",
//     shortTitle: "SSC CGL 2025",
//     thumbnail: "/Image/1exam.webp",
//     category: "SSC",
//     tags: ["Quant", "Reasoning", "English", "GA", "Mock Tests"],
//     rating: 4.6,
//     language: "Hindi",
//     mode: "Online",
//     durationHours: 260,
//     validityDays: 365,
//     isFree: true,
//     lastUpdated: "2025-07-01",
//   },
//   {
//     id: "rrb-ntpc-2025",
//     title: "RRB NTPC 2025 Crash + Mock Combo",
//     shortTitle: "RRB NTPC 2025",
//     thumbnail: "/Image/1exam.webp",
//     category: "Railway",
//     tags: ["Maths", "Reasoning", "GS", "PYQ"],
//     rating: 4.4,
//     language: "English",
//     mode: "Online",
//     durationHours: 120,
//     validityDays: 180,
//     price: 3999,
//     discountedPrice: 2499,
//     isFree: false,
//     lastUpdated: "2025-06-20",
//   },
//   {
//     id: "ssc-gd-2025",
//     title: "SSC GD 2025 Target Batch",
//     shortTitle: "SSC GD 2025",
//     thumbnail: "/Image/1exam.webp",
//     category: "SSC",
//     tags: ["Syllabus", "Class PDF", "Test Series"],
//     rating: 4.5,
//     language: "Hindi",
//     mode: "Online",
//     validityDays: 500,
//     isFree: true,
//     lastUpdated: "2025-06-18",
//   },
//   {
//     id: "upsc-ca-revision",
//     title: "January to June 2025 Current Affairs Revision",
//     shortTitle: "CA Revision (Jan–Jun 2025)",
//     thumbnail: "/Image/1exam.webp",
//     category: "UPSC",
//     tags: ["Current Affairs", "Monthly MCQ"],
//     rating: 4.7,
//     language: "Bilingual",
//     mode: "Online",
//     validityDays: 150,
//     isFree: true,
//     lastUpdated: "2025-06-10",
//   },
//   {
//     id: "railway-express-2025",
//     title: "Railway NTPC Gaurav Express Batch",
//     shortTitle: "Railway Express 2025",
//     thumbnail: "/Image/1exam.webp",
//     category: "Railway",
//     tags: ["Hindi Medium", "Class PDF", "Test Series"],
//     rating: 4.3,
//     language: "Hindi",
//     mode: "Online",
//     validityDays: 500,
//     isFree: true,
//     lastUpdated: "2025-06-05",
//   },
// ];

// /* ---------- Helpers ---------- */
// const formatINR = (n) =>
//   typeof n === "number"
//     ? new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency: "INR",
//         maximumFractionDigits: 0,
//       }).format(n)
//     : "—";

// /** Map the big top category chip to course.category values */
// function matchesTopCategory(course, topCat) {
//   if (topCat === "All India Exams") return ["UPSC", "SSC", "Railway", "Banking"].includes(course.category);
//   if (topCat === "Rajasthan Exams") return course.category === "Rajasthan";
//   if (topCat === "Uttar Pradesh Exams") return course.category === "UP";
//   if (topCat === "UGC NET JRF") return course.category === "UGC NET";
//   if (topCat === "Madhya Pradesh Exam") return course.category === "MP";
//   if (topCat === "Bihar Exams") return course.category === "Bihar";
//   if (topCat === "Haryana Exams") return course.category === "Haryana";
//   if (topCat === "Jharkhand Exams") return course.category === "Jharkhand";
//   return true;
// }

// /** Language matcher used by the drawer */
// function langMatch(courseLang, filterLang) {
//   if (filterLang === "All") return true;
//   if (filterLang === "English") return ["English", "Bilingual"].includes(courseLang);
//   if (filterLang === "Hindi") return ["Hindi", "Bilingual"].includes(courseLang);
//   return courseLang === filterLang;
// }

// const TOP_CATEGORIES = [
//   "All India Exams",
//   "Rajasthan Exams",
//   "Uttar Pradesh Exams",
//   "UGC NET JRF",
//   "Madhya Pradesh Exam",
//   "Bihar Exams",
//   "Haryana Exams",
//   "Jharkhand Exams",
// ];

// export default function Page() {
//   /* ---------- State ---------- */
//   const [mode, setMode] = useState("Online");
//   const [cat, setCat] = useState("All India Exams");
//   const [q, setQ] = useState("");
//   const [page, setPage] = useState(1);
//   const perPage = 8;

//   // Drawer state
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [lang, setLang] = useState("All");
//   const [freeOnly, setFreeOnly] = useState(false);

//   /* ---------- Filter / Search ---------- */
//   const filtered = useMemo(() => {
//     let items = COURSES.slice();

//     if (cat) items = items.filter((c) => matchesTopCategory(c, cat));
//     if (mode) items = items.filter((c) => c.mode === mode);
//     if (lang !== "All") items = items.filter((c) => langMatch(c.language, lang));
//     if (freeOnly) items = items.filter((c) => c.isFree);

//     if (q.trim()) {
//       const s = q.toLowerCase();
//       items = items.filter(
//         (c) =>
//           c.title.toLowerCase().includes(s) ||
//           (c.shortTitle || "").toLowerCase().includes(s) ||
//           c.category.toLowerCase().includes(s) ||
//           c.tags.some((t) => t.toLowerCase().includes(s))
//       );
//     }

//     items.sort((a, b) => +new Date(b.lastUpdated || 0) - +new Date(a.lastUpdated || 0));
//     return items;
//   }, [cat, mode, q, lang, freeOnly]); // <-- include freeOnly

//   const pages = Math.max(1, Math.ceil(filtered.length / perPage));
//   const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

//   // clamp page safely when filters change
//   useEffect(() => {
//     if (page > pages) setPage(1);
//   }, [pages, page]);

//   return (
//     <main className="min-h-screen bg-white">
//       <CourseHero />  {/* your banner hero */}
//       <SectionHeader />

//       <ExamToolbar
//         categories={TOP_CATEGORIES}
//         selected={cat}
//         onSelect={(c) => {
//           setCat(c);
//           setPage(1);
//         }}
//         mode={mode}
//         onModeChange={(m) => {
//           setMode(m);
//           setPage(1);
//         }}
//         search={q}
//         onSearch={(val) => {
//           setQ(val);
//           setPage(1);
//         }}
//         onOpenFilters={() => setFilterOpen(true)}  // <-- open the drawer
//       />

//       {/* Off-canvas filter drawer */}
//       <FilterDrawer
//         open={filterOpen}
//         onClose={() => setFilterOpen(false)}
//         initialLanguage={lang}
//         initialFreeOnly={freeOnly}
//         onApply={({ language, freeOnly }) => {
//           setLang(language);
//           setFreeOnly(freeOnly);
//           setPage(1);
//         }}
//       />

//       <section id="courses" className="mx-auto max-w-7xl px-20 pt-4 pb-8">
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {pageItems.map((c) => (
//             <CourseCard key={c.id} course={c} formatINR={formatINR} />
//           ))}
//         </div>

//         <div className="mt-6 flex justify-center">
//           {page < pages ? (
//             <button
//               className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
//               onClick={() => setPage((p) => Math.min(p + 1, pages))}
//             >
//               View more <span>▾</span>
//             </button>
//           ) : (
//             <span className="text-sm text-neutral-500">No more results</span>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }



// ========================================================================================




"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "../axios/axiosInstance";
import CourseHero from "../../components/CourseHero";
import FilterDrawer from "../../components/FilterDrawer";
import ExamToolbar from "../../components/ExamToolbar";
import SectionHeader from "../../components/SectionHeader";

const formatINR = (n) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(n)
    : "—";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const examId = searchParams.get("exam");

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [mode, setMode] = useState(""); // optional if API supports it
  const [cat, setCat] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [filterOpen, setFilterOpen] = useState(false);
  const [lang, setLang] = useState("All");
  const [freeOnly, setFreeOnly] = useState(false);

  // Local cart state
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!examId) return;
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/courses?exam=${examId}`);
        console.log("Fetched courses:", res.data);
        setCourses(res?.data || []);
      } catch (err) {
        console.error("Error fetching courses", err?.response?.data || err.message);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [examId]);

  const handleAddToCart = (course) => {
    if (cart.some((item) => item.id === course.id)) {
      alert("This course is already in your cart.");
      return;
    }
    setCart([...cart, course]);
  };

  const filtered = courses
    .filter((c) => (mode ? c.mode === mode : true))
    .filter((c) => (lang === "All" ? true : c.language === lang))
    .filter((c) => (freeOnly ? c.isFree : true))
    .filter((c) =>
      q.trim()
        ? c.title.toLowerCase().includes(q.toLowerCase()) ||
          (c.shortTitle || "").toLowerCase().includes(q.toLowerCase())
        : true
    );

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > pages) setPage(1);
  }, [pages, page]);

  return (
    <main className="min-h-screen bg-white">
      <CourseHero />
      <SectionHeader />

      <ExamToolbar
        categories={[]} // remove if not needed
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

      {/* CART DISPLAY */}
      {cart.length > 0 && (
        <section className="bg-gray-100 p-4">
          <h2 className="text-lg font-bold mb-2">Your Cart</h2>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white shadow p-2 rounded"
              >
                <span>{item.title}</span>
                <span className="font-semibold">{formatINR(item.price)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* COURSES */}
      <section id="courses" className="mx-auto max-w-7xl px-20 pt-4 pb-8">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : pageItems.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col"
                >
                  <img
                    src={c.imagesFullPath?.[0]}
                    alt={c.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{c.overview}</p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3">
                        {c.discount_price > 0 ? (
                          <>
                            <span className="text-lg font-bold text-green-600">
                              {formatINR(c.discount_price)}
                            </span>
                            <span className="text-sm line-through text-gray-400">
                              {formatINR(c.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-800">
                            {formatINR(c.price)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(c)}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              {page < pages ? (
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                  onClick={() => setPage((p) => Math.min(p + 1, pages))}
                >
                  View more <span>▾</span>
                </button>
              ) : (
                <span className="text-sm text-neutral-500">No more results</span>
              )}
            </div>
          </>
        ) : (
          <p className="text-center">No courses found for this exam.</p>
        )}
      </section>
    </main>
  );
}
