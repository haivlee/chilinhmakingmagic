"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_SCROLL_Y = 360;

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL_Y);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={scrollToTop}
      className={`fixed right-4 bottom-20 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-fg)] bg-transparent text-[var(--color-fg)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fg)] md:right-8 md:bottom-8 md:h-14 md:w-14 ${
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 md:h-6 md:w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}