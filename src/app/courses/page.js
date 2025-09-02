// app/courses/page.js
"use client";
import { Suspense } from "react";
import CoursesClient from "./CoursesClient";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "../axios/axiosInstance";
import CourseHero from "../../components/CourseHero";
import FilterDrawer from "../../components/FilterDrawer";
import ExamToolbar from "../../components/ExamToolbar";
import { useCart } from "../../components/context/CartContext";

const formatINR = (n) =>
  typeof n === "number"
    ? new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n)
    : "—";

export default function CoursesPage() {
  const { addToCart, isOpen, openCart, closeCart } = useCart();

  const searchParams = useSearchParams();
  const examId = searchParams?.get("exam");

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [mode, setMode] = useState("");
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
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // ✅ agar examId hai to filter karke laao warna sabhi courses
        const url = examId ? `/courses?exam=${examId}` : `/courses`;
        const res = await axiosInstance.get(url);
        let data = res?.data || [];

        // Dummy fields inject for demo
        data = data?.map((c, idx) => ({
          ...c,
          language: c?.language || (idx % 2 === 0 ? "English" : "Hindi"),
          mode: c?.mode || (idx % 2 === 0 ? "Online" : "Offline"),
        }));

        console.log("Fetched courses:", data);
        setCourses(data || []);
      } catch (err) {
        console.error("Error fetching courses", err?.response?.data || err?.message);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [examId]);
  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();
    const response = await addToCart({
      itemType,
      itemId,
    });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const filtered = courses
    ?.filter((c) => (mode ? c?.mode === mode : true))
    // ?.filter((c) => (lang === "All" ? true : c?.language === lang))
    ?.filter((c) => {
      if (lang === "All") return true;
      // normalize both selected language & course languages
      const courseLangs = (c?.language || "")
        .split(",")                    // split by comma
        .map((l) => l.trim().toLowerCase()); // clean + lowercase
      return courseLangs.includes(lang.toLowerCase());
    })

    ?.filter((c) => (freeOnly ? c?.isFree : true))
    ?.filter((c) =>
      q?.trim()
        ? c?.title?.toLowerCase()?.includes(q?.toLowerCase()) ||
        (c?.shortTitle || "")?.toLowerCase()?.includes(q?.toLowerCase())
        : true
    );

  const pages = Math.max(1, Math.ceil((filtered?.length || 0) / perPage));
  const pageItems = filtered?.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > pages) setPage(1);
  }, [pages, page]);


  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("courses");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <CourseHero />
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
      {cart?.length > 0 && (
        <section className="bg-gray-100 p-4">
          <h2 className="text-lg font-bold mb-2">Your Cart</h2>
          <ul className="space-y-2">
            {cart?.map((item) => (
              <li
                key={item?.id}
                className="flex items-center justify-between bg-white shadow p-2 rounded"
              >
                <span>{item?.title || "Untitled"}</span>
                <span className="font-semibold">{formatINR(item?.price)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* COURSES */}
      <section id="courses" className="mx-auto max-w-7xl md:px-20 mb-5  px-6 pt-10 pb-8 bg-green-50 shadow-lg rounded-lg">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : pageItems?.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pageItems?.map((c) => (
                <a
                  key={c?._id}
                  href={`/courses/${c?._id}`}
                  className="rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col"
                >
                  <img
                    src={c?.full_image?.[0] || "/vercel.svg"}
                    // src={`http://localhost:5000${c?.images?.[0]}`}
                    alt={c?.title || "Course"}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">{c?.title || "Untitled Course"}</h3>
                    <p className="text-sm text-gray-500 mb-4">{c?.overview || ""}</p>
                    <div className="mt-auto">
                      {/* <div className="flex items-center gap-2 mb-3">
                        {c?.discount_price > 0 ? (
                          <>
                            <span className="text-lg font-bold text-green-600">
                              {formatINR(c?.discount_price)}
                            </span>
                            <span className="text-sm line-through text-gray-400">
                              {formatINR(c?.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-800">
                            {formatINR(c?.price)}
                          </span>
                        )}
                      </div> */}


                      {/* // Add to Cart button temporarily removed, as all courses are free now */}
                      {/* <button
                        onClick={(e) => {
                          handleAdd(e, "course", c?._id);
                          openCart();
                        }}
                        className="w-full bg-[#204972] text-white py-2 rounded hover:bg-[#616602]"
                      >
                        Add to Cart
                      </button> */}

                      <button

                        className="w-full bg-[#204972] text-white py-2 rounded hover:bg-[#616602]"
                      >
                        Free Preview
                      </button>

                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-4">
              {page > 1 && (
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                  ◂ Previous
                </button>
              )}

              {page < pages && (
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                  onClick={() => setPage((p) => Math.min(p + 1, pages))}
                >
                  View more ▾
                </button>
              )}
            </div>

          </>
        ) : (
          <p className="text-center">No courses found.</p>
        )}
      </section>
    </main>
  );
}
