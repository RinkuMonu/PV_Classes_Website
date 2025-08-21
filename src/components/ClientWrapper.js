"use client";
import { useEffect } from "react";

export default function ClientWrapper({ children }) {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable common DevTools shortcuts
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Detect if DevTools is open
    const checkDevTools = setInterval(() => {
      if (window.outerWidth - window.innerWidth > 100) {
        alert("DevTools detected! Closing page...");
        window.location.href = "about:blank";
      }
    }, 1000);

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(checkDevTools);
    };
  }, []);

  return <>{children}</>;
}
