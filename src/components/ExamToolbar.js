// "use client";
// import Link from "next/link";
// import { SlidersHorizontal } from "lucide-react";
// import { useEffect, useMemo, useRef, useState } from "react";


// const SUB_FILTERS_DEFAULT = [
//     { label: "All Cources", href: "/courses" },
//     { label: "Rajasthan Exams", href: "/courses?exam=689c8a951914a3c05b945988" },
//     { label: "Current Affairs", href: "/current-affairs" },
//     { label: "3rd Grade Exams", href: "/courses?exam=68ad4356255f962ce73719c2" },
// ];


// export default function ExamToolbar({
//     categories,
//     subFilters = SUB_FILTERS_DEFAULT,
//     selected,
//     onSelect,
//     mode = "Online",              // "Online" | "Offline"
//     onModeChange,
//     search = "",
//     onSearch,
//     onOpenFilters,
// }) {
//     const railRef = useRef(null);
//     const [showL, setShowL] = useState(false);
//     const [showR, setShowR] = useState(false);

//     const check = () => {
//         const el = railRef.current;
//         if (!el) return;
//         setShowL(el.scrollLeft > 4);
//         setShowR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
//     };
//     useEffect(() => {
//         const el = railRef.current;
//         check();
//         const onScroll = () => check();
//         el?.addEventListener("scroll", onScroll, { passive: true });
//         window.addEventListener("resize", check);
//         return () => {
//             el?.removeEventListener("scroll", onScroll);
//             window.removeEventListener("resize", check);
//         };
//     }, []);

//     return (
//         <section className="mx-auto max-w-7xl md:px-20 px-6">
//             {/* Row 2: sub filters + search + filter icon */}
//             <div className="mt-3 flex items-center justify-between w-full">
//                 {/* Left Side: Sub Filters */}
//                 <div className="flex flex-wrap items-center gap-2">
//                     {subFilters.map((t) => (
//                         <Link
//                             key={t.label}
//                             href={t.href}
//                             className="rounded-full border text-start border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 hover:border-neutral-400"
//                         >
//                             {t.label}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* Right Side: Search + Filter Button */}
//                 <div className="flex items-center w-full max-w-sm ml-auto">
//                     {/* Search */}
//                     <div className="relative flex-1">
//                         <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
//                             🔍
//                         </span>
//                         <input
//                             value={search}
//                             onChange={(e) => onSearch?.(e.target.value)}
//                             placeholder="Search"
//                             className="w-full rounded-full border border-neutral-300 bg-white pl-9 pr-10 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-black/60"
//                         />
//                     </div>

//                     {/* Filter Button */}
//                     <button
//                         type="button"
//                         onClick={() => onOpenFilters?.()}
//                         className="ml-3 inline-flex h-10 w-10 p-2 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 cursor-pointer"
//                         title="Filters / Sort"
//                         aria-haspopup="dialog"
//                     >
//                         <SlidersHorizontal />
//                     </button>
//                 </div>
//             </div>

//         </section>
//     );
// }





"use client";
import Link from "next/link";
import { SlidersHorizontal, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const SUB_FILTERS_DEFAULT = [
  { label: "All Courses", href: "/courses" },
  { label: "Rajasthan Exams", href: "/courses?exam=689c8a951914a3c05b945988" },
  { label: "Current Affairs", href: "/current-affairs" },
  { label: "3rd Grade Exams", href: "/courses?exam=68ad4356255f962ce73719c2" },
];

export default function ExamToolbar({
  categories,
  subFilters = SUB_FILTERS_DEFAULT,
  selected,
  onSelect,
  mode = "Online",
  onModeChange,
  search = "",
  onSearch,
  onOpenFilters,
}) {
  const railRef = useRef(null);
  const [showL, setShowL] = useState(false);
  const [showR, setShowR] = useState(false);

  const check = () => {
    const el = railRef.current;
    if (!el) return;
    setShowL(el.scrollLeft > 4);
    setShowR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  
  const scroll = (direction) => {
    const el = railRef.current;
    if (el) {
      el.scrollBy({ left: direction === 'right' ? 200 : -200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = railRef.current;
    check();
    const onScroll = () => check();
    el?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl md:px-6 px-4 py-4">
      {/* Row 1: Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
       
      </div>

      {/* Row 2: sub filters + search + filter icon */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
        {/* Left Side: Sub Filters with scroll arrows */}
        <div className="relative flex-1 w-full md:w-auto">
          <div className="flex items-center">
            {showL && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 z-10 h-8 w-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 text-[#00316B] hover:bg-[#F5F7FA]"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <ChevronLeft size={16} />
              </button>
            )}
            
            <div 
              ref={railRef}
              className="flex overflow-x-auto scrollbar-hide space-x-2 py-1 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {subFilters.map((t, index) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="min-w-max rounded-full border text-start border-[#0281AD] bg-white px-4 py-2.5 text-sm font-medium text-[#00316B] transition-colors hover:bg-[#009FE3] hover:text-white hover:border-[#009FE3] whitespace-nowrap"
                >
                  {t.label}
                </Link>
              ))}
            </div>
            
            {showR && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 z-10 h-8 w-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 text-[#00316B] hover:bg-[#F5F7FA]"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Search + Filter Button */}
        <div className="flex items-center w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:flex-initial md:w-64">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#616602]">
              <Search size={18} />
            </span>
            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-full border border-[#0281AD] bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={() => onOpenFilters?.()}
            className="ml-3 inline-flex h-11 w-11 p-2 items-center justify-center rounded-full border border-[#0281AD] bg-white text-[#00316B] transition-colors hover:bg-[#009FE3] hover:text-white cursor-pointer"
            title="Filters / Sort"
            aria-haspopup="dialog"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}