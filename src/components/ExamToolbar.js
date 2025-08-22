"use client";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

// const SUB_FILTERS_DEFAULT = [
//     "GK & GS Kumar Gaurav Sir",
//     "UPSC(IAS)",
//     "SSC Foundation(CGL CHSL)",
//     "SSC GD (Constable)",
// ];

const SUB_FILTERS_DEFAULT = [
  "All India Exams",
  "Rajasthan Exams",
  "current Affairs",
  "3 grade Exams",
];




export default function ExamToolbar({
    categories,
    subFilters = SUB_FILTERS_DEFAULT,
    selected,
    onSelect,
    mode = "Online",              // "Online" | "Offline"
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
        <section className="mx-auto max-w-7xl md:px-20 px-6">
            {/* Row 1: big category tabs + Online/Offline switch */}
            <div className="mt-4 flex items-center justify-between gap-3">
                <div className="relative flex-1">
                    <div
                        ref={railRef}
                        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4"
                    >
                        {categories.map((c) => {
                            const active = selected === c;
                            return (
                                <button
                                    key={c}
                                    onClick={() => onSelect?.(c)}
                                    className={[
                                        "whitespace-nowrap rounded-full border px-3.5 py-2 text-sm transition",
                                        active
                                            ? "border-black bg-black text-white"
                                            : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400",
                                    ].join(" ")}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>

                    {/* subtle scroll hints like the ref page */}
                    {showL && (
                        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
                    )}
                    {showR && (
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
                    )}
                </div>

                {/* Online / Offline segmented switch */}
                {/* <div className="shrink-0 rounded-lg border border-neutral-300 bg-white p-1">
          {["Online", "Offline"].map((m) => (
            <button
              key={m}
              onClick={() => onModeChange?.(m)}
              className={[
                "px-3 py-1.5 text-sm rounded-md",
                mode === m ? "bg-amber-200/60 text-amber-900" : "text-neutral-700",
              ].join(" ")}
            >
              {m}
            </button>
          ))}
        </div> */}
            </div>

            {/* Row 2: sub filters + search + filter icon */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
                {subFilters.map((t) => (
                    <button
                        key={t}
                        className="rounded-full border text-start w-100 border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 hover:border-neutral-400"
                    >
                        {t}
                    </button>
                ))}

                <div className="md:ms-auto flex items-center gap-2">
                    <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
                        <input
                            value={search}
                            onChange={(e) => onSearch?.(e.target.value)}
                            placeholder="Search"
                            className="w-48 rounded-full border border-neutral-300 bg-white pl-9 pr-10 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-black/60"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => onOpenFilters?.()}          
                        className="inline-flex h-10 w-10 p-2 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                        title="Filters / Sort"
                        aria-haspopup="dialog"
                    >
                        <SlidersHorizontal />
                    </button>
                </div>
            </div>
        </section>
    );
}
