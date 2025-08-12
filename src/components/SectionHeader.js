"use client";
import { useEffect, useRef, useState } from "react";

const DEFAULT_ITEMS = [
  "Government Exam",
  "Nursing",
  "School",
  "Agriculture",
  "NEET/JEE",
  "Defence",
  "CLAT & Law Exams",
  "Engineering",
  "CUET",
];

/**
 * Props (all optional):
 * - items?: string[]
 * - value?: string            // controlled value
 * - onChange?: (v: string) => void
 */
export default function SectionHeader({
  items = DEFAULT_ITEMS,
  value,
  onChange,
}) {
  // Uncontrolled fallback
  const [internal, setInternal] = useState(items[0] || "Select");
  const selected = value ?? internal;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, items.findIndex((x) => x === selected))
  );

  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (
        !menuRef.current?.contains(e.target) &&
        !btnRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Focus first/active item when opening
  useEffect(() => {
    if (!open) return;
    const el = menuRef.current?.querySelector(
      `[data-index="${activeIndex}"]`
    );
    el?.focus();
  }, [open, activeIndex]);

  const commit = (label) => {
    onChange ? onChange(label) : setInternal(label);
    setOpen(false);
  };

  const onKeyDownMenu = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(items.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(items[activeIndex]);
    }
  };

  return (
    <header className="mx-auto max-w-7xl px-20 pt-6 pb-2">
      {/* Title row with dropdown button */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            ref={btnRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-2 text-[30px] font-bold rounded-md hover:bg-neutral-50 px-0 py-1"
          >
            {selected}
            <svg
              className={`h-4 w-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.853a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              ref={menuRef}
              role="menu"
              tabIndex={-1}
              onKeyDown={onKeyDownMenu}
              className="absolute z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl ring-1 ring-black/5"
            >
              {/* Top heading-like item (disabled) */}
              <div className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-50">
                {items[0]}
              </div>
              <div className="divide-y divide-neutral-100">
                {items.slice(1).map((label, i) => {
                  const idx = i + 1;
                  const isActive = idx === activeIndex;
                  const isSelected = selected === label;
                  return (
                    <button
                      key={label}
                      data-index={idx}
                      role="menuitemradio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => commit(label)}
                      className={`block w-full text-left px-4 py-2 text-[15px] focus:outline-none ${
                        isActive ? "bg-neutral-100" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-800">{label}</span>
                        {isSelected && (
                          <span className="text-amber-600">✓</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Small description under the heading */}
      <p className="mt-1 text-sm text-neutral-600">
        Choose your exam category
      </p>
    </header>
  );
}
