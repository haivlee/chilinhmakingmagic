"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 py-4 transition-colors duration-300 md:px-12 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#top"
        className="flex h-8 w-8 items-center justify-center bg-[var(--color-fg)] text-[0.7rem] font-black leading-none text-[var(--color-bg)]"
        aria-label="Chi-Linh Tran home"
      >
        CL
      </a>

      <div className="flex gap-3 text-[0.68rem] font-semibold uppercase tracking-widest text-[var(--color-fg)] md:flex-col md:items-end md:gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`px-1.5 py-0.5 transition-colors hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] ${
              link.label === "Works"
                ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
                : ""
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
