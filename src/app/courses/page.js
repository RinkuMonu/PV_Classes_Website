
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axiosInstance from "../axios/axiosInstance";
// import CourseHero from "../../components/CourseHero";
// import FilterDrawer from "../../components/FilterDrawer";
// import ExamToolbar from "../../components/ExamToolbar";
// import SectionHeader from "../../components/SectionHeader";

// const formatINR = (n) =>
//   typeof n === "number"
//     ? new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(n)
//     : "—";

// export default function CoursesPage() {
//   const searchParams = useSearchParams();
//   const examId = searchParams.get("exam");

//   const [courses, setCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [mode, setMode] = useState(""); // optional if API supports it
//   const [cat, setCat] = useState("");
//   const [q, setQ] = useState("");
//   const [page, setPage] = useState(1);
//   const perPage = 8;

//   const [filterOpen, setFilterOpen] = useState(false);
//   const [lang, setLang] = useState("All");
//   const [freeOnly, setFreeOnly] = useState(false);

//   // Local cart state
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     if (!examId) return;
//     const fetchCourses = async () => {
//       setIsLoading(true);
//       try {
//         const res = await axiosInstance.get(`/courses?exam=${examId}`);
//         let data = res?.data || [];

//         // 👇 yaha dummy fields inject karenge
//         data = data.map((c, idx) => ({
//           ...c,
//           language: c.language || (idx % 2 === 0 ? "English" : "Hindi"), // alternate for demo
//           mode: c.mode || (idx % 2 === 0 ? "Online" : "Offline"),       // alternate for demo
//         }));

//         console.log("Fetched courses:", data);
//         setCourses(data);
//       } catch (err) {
//         console.error("Error fetching courses", err?.response?.data || err.message);
//         setCourses([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCourses();
//   }, [examId]);


//   const handleAddToCart = (course) => {
//     if (cart.some((item) => item.id === course.id)) {
//       alert("This course is already in your cart.");
//       return;
//     }
//     setCart([...cart, course]);
//   };


//   const filtered = courses
//     .filter((c) => (mode ? c.mode === mode : true))
//     .filter((c) => (lang === "All" ? true : c.language === lang))
//     .filter((c) => (freeOnly ? c.isFree : true))
//     .filter((c) =>
//       q.trim()
//         ? c.title.toLowerCase().includes(q.toLowerCase()) ||
//         (c.shortTitle || "").toLowerCase().includes(q.toLowerCase())
//         : true
//     );


//   const pages = Math.max(1, Math.ceil(filtered.length / perPage));
//   const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

//   useEffect(() => {
//     if (page > pages) setPage(1);
//   }, [pages, page]);

//   return (
//     <main className="min-h-screen bg-white">
//       <CourseHero />
//       {/* <SectionHeader /> */}

//       <ExamToolbar
//         categories={[]} // remove if not needed
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
//         onOpenFilters={() => setFilterOpen(true)}
//       />

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

//       {/* CART DISPLAY */}
//       {cart.length > 0 && (
//         <section className="bg-gray-100 p-4">
//           <h2 className="text-lg font-bold mb-2">Your Cart</h2>
//           <ul className="space-y-2">
//             {cart.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center justify-between bg-white shadow p-2 rounded"
//               >
//                 <span>{item.title}</span>
//                 <span className="font-semibold">{formatINR(item.price)}</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* COURSES */}
//       <section id="courses" className="mx-auto max-w-7xl px-20 pt-4 pb-8">
//         {isLoading ? (
//           <p className="text-center">Loading...</p>
//         ) : pageItems.length > 0 ? (
//           <>
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {pageItems.map((c) => (
//                 <a
//                   key={c._id}
//                   href={`/courses/${c._id}`}
//                   className="border rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col"
//                 >
//                   <img
//                     src={c.imagesFullPath?.[0]}
//                     alt={c.title}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                   />
//                   <div className="p-4 flex-1 flex flex-col">
//                     <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
//                     <p className="text-sm text-gray-500 mb-4">{c.overview}</p>
//                     <div className="mt-auto">
//                       <div className="flex items-center gap-2 mb-3">
//                         {c.discount_price > 0 ? (
//                           <>
//                             <span className="text-lg font-bold text-green-600">
//                               {formatINR(c.discount_price)}
//                             </span>
//                             <span className="text-sm line-through text-gray-400">
//                               {formatINR(c.price)}
//                             </span>
//                           </>
//                         ) : (
//                           <span className="text-lg font-bold text-gray-800">
//                             {formatINR(c.price)}
//                           </span>
//                         )}
//                       </div>
//                       <button
//                         // onClick={(e) => {
//                         //   e.preventDefault(); // link ko open hone se rokhega
//                         //   handleAddToCart(c);
//                         // }}
//                         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </a>
//               ))}

//             </div>
//             <div className="mt-6 flex justify-center">
//               {page < pages ? (
//                 <button
//                   className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
//                   onClick={() => setPage((p) => Math.min(p + 1, pages))}
//                 >
//                   View more <span>▾</span>
//                 </button>
//               ) : (
//                 <span className="text-sm text-neutral-500"></span>
//               )}
//             </div>
//           </>
//         ) : (
//           <p className="text-center">No courses found for this exam.</p>
//         )}
//       </section>
//     </main>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "../axios/axiosInstance";
import CourseHero from "../../components/CourseHero";
import FilterDrawer from "../../components/FilterDrawer";
import ExamToolbar from "../../components/ExamToolbar";

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
        data = data.map((c, idx) => ({
          ...c,
          language: c.language || (idx % 2 === 0 ? "English" : "Hindi"),
          mode: c.mode || (idx % 2 === 0 ? "Online" : "Offline"),
        }));

        console.log("Fetched courses:", data);
        setCourses(data);
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
                <a
                  key={c._id}
                  href={`/courses/${c._id}`}
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
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </a>
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
                <span className="text-sm text-neutral-500"></span>
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
