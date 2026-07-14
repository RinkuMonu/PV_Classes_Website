"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BRAND_PRIMARY = "#204972";
const BRAND_ACCENT = "#84CC16";

/**
 * Floating Action Button — "Tap to Speak"
 * Placed site-wide via app/layout.js  (<TapToSpeakCTA variant="floating" />)
 * Hidden on the /mock-interview page itself.
 */
export default function TapToSpeakCTA({
  variant = "button",
  label = "Tap to Speak",
  href = "/ai-mock-interview",
}) {
  const pathname = usePathname();
  const isFloating = variant === "floating";
  const isOnPage = isFloating && pathname === href;

  // Fade-out: when we arrive on the linked page, fade out over 800ms then hide
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (isOnPage) {
      setOpacity(0);
      const t = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(t);
    } else {
      setVisible(true);
      setOpacity(1);
    }
  }, [isOnPage]);

  if (isFloating && !visible) return null;

  if (!isFloating) {
    // Inline / navbar version
    return (
      <>
        <Link href={href} className="ttsc-button">
          <span className="ttsc-icon" aria-hidden="true">🎤</span>
          <span>{label}</span>
        </Link>
        <style>{`
          .ttsc-button {
            display: inline-flex; align-items: center; gap: 8px;
            background: ${BRAND_ACCENT}; color: ${BRAND_PRIMARY};
            padding: 12px 22px; border-radius: 999px; font-weight: 700; font-size: 14.5px;
            text-decoration: none; font-family: 'Inter', -apple-system, sans-serif;
            transition: transform .12s ease, box-shadow .12s ease;
          }
          .ttsc-button:hover { box-shadow: 0 6px 18px rgba(132,204,22,.4); transform: translateY(-1px); }
          .ttsc-icon { font-size: 17px; }
        `}</style>
      </>
    );
  }

  // ── Floating Action Button ──
  return (
    <>
      <Link
        href={href}
        className="ttsc-fab"
        aria-label="Tap to Speak — Mock Interview"
        style={{ opacity, transition: "opacity 0.8s ease" }}
      >
        {/* Pulse ring */}
        <span className="ttsc-pulse" aria-hidden="true" />
        {/* Mic icon */}
        <span className="ttsc-fab-icon" aria-hidden="true">🎤</span>
        {/* Tooltip label shown on hover */}
        <span className="ttsc-fab-label">{label} — Mock Interview</span>
      </Link>

      <style>{`
        /* ── FAB container ── */
        .ttsc-fab {
          position: fixed;
          left: 24px;
          bottom: 100px;          /* sits above WhatsApp / chatbot widgets */
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${BRAND_PRIMARY} 0%, #2d6db5 100%);
          color: #fff;
          text-decoration: none;
          box-shadow: 0 6px 22px rgba(32,73,114,.45);
          transition: width .25s ease, border-radius .25s ease,
                      box-shadow .2s ease, transform .15s ease;
          overflow: hidden;
          white-space: nowrap;
        }

        /* Expand into a pill on hover to reveal label */
        .ttsc-fab:hover {
          width: 220px;
          border-radius: 999px;
          box-shadow: 0 10px 32px rgba(32,73,114,.55);
          transform: translateY(-2px);
        }

        /* ── Pulse ring animation ── */
        .ttsc-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(132,204,22,.7);
          animation: ttsc-ring 2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes ttsc-ring {
          0%   { transform: scale(1);   opacity: .8; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }

        /* ── Mic icon ── */
        .ttsc-fab-icon {
          font-size: 22px;
          flex-shrink: 0;
          transition: transform .2s ease;
          position: relative;
          z-index: 1;
        }
        .ttsc-fab:hover .ttsc-fab-icon {
          transform: scale(1.15);
        }

        /* ── Hover label ── */
        .ttsc-fab-label {
          font-size: 13px;
          font-weight: 700;
          font-family: 'Inter', -apple-system, sans-serif;
          letter-spacing: .01em;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-width .25s ease, opacity .2s ease .05s, margin .25s ease;
          position: relative;
          z-index: 1;
        }
        .ttsc-fab:hover .ttsc-fab-label {
          max-width: 160px;
          opacity: 1;
          margin-left: 8px;
        }

        /* ── Mobile: icon-only, slightly smaller ── */
        @media (max-width: 480px) {
          .ttsc-fab { width: 52px; height: 52px; left: 16px; bottom: 88px; }
          .ttsc-fab:hover { width: 52px; border-radius: 50%; }
          .ttsc-fab-label { display: none; }
        }
      `}</style>
    </>
  );
}