"use client";
import { useEffect, useState } from "react";

const LANGUAGES = [
  "All","English","Hindi","Kannada","Malayalam","Marathi","Odia","Sanskrit","Tamil","Urdu"
];

export default function FilterDrawer({
  open,
  onClose,
  initialLanguage = "All",
  initialFreeOnly = false,
  onApply,
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [freeOnly, setFreeOnly] = useState(initialFreeOnly);

  // sync when opening
  useEffect(() => {
    if (open) {
      setLanguage(initialLanguage);
      setFreeOnly(initialFreeOnly);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open, initialLanguage, initialFreeOnly]);

  const reset = () => {
    setLanguage("All");
    setFreeOnly(false);
    onApply?.({ language: "All", freeOnly: false });
    onClose?.();
  };

  const apply = () => {
    onApply?.({ language, freeOnly });
    onClose?.();
  };

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity  ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed left-0 top-0 z-[61] w-[340px]   max-w-[86vw] transform rounded-md border-r border-neutral-200 bg-white shadow-xl transition-transform ${
          open ? "translate-x-0 m-3.5" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between  px-5 py-4">
          <h3 className="text-base font-semibold">Filter List</h3>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-neutral-500 hover:bg-neutral-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="h-[calc(100vh-217px)] overflow-y-auto px-5 pt-2 scrollbar">
          {/* Language */}
          <div>
            <p className="mb-3 text-sm font-semibold">Select Language</p>
            <ul className="space-y-3">
              {LANGUAGES.map((l) => (
                <li key={l} className="flex items-center gap-3">
                  <input
                    id={`lang-${l}`}
                    type="checkbox"
                    checked={l === "All" ? language === "All" : language === l}
                    onChange={() => setLanguage(l)}
                    className="h-4 w-4 rounded border-neutral-300"
                  />
                  <label htmlFor={`lang-${l}`} className="text-sm">{l}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Mode */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">Mode</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <input
                  id="mode-all"
                  type="checkbox"
                  checked={!freeOnly}
                  onChange={() => setFreeOnly(false)}
                  className="h-4 w-4 rounded border-neutral-300"
                />
                <label htmlFor="mode-all" className="text-sm">All</label>
              </li>
              <li className="flex items-center gap-3">
                <input
                  id="mode-free"
                  type="checkbox"
                  checked={freeOnly}
                  onChange={() => setFreeOnly(true)}
                  className="h-4 w-4 rounded border-neutral-300"
                />
                <label htmlFor="mode-free" className="text-sm">Free</label>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t px-5 py-4">
          <button
            onClick={apply}
            className="mb-3 w-full rounded-md bg-yellow-200 px-4 py-2.5 text-sm font-semibold text-black hover:bg-yellow-400"
          >
            Apply Filters
          </button>
          <button
            onClick={reset}
            className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-medium hover:bg-neutral-100"
          >
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
}
