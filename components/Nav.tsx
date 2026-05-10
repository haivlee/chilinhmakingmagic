"use client";

import { useEffect, useRef, useState } from "react";

/** Section anchors — `selectedHref` (optional) must match one of these `href` values. */
const links = [
  { href: "#featured", label: "Featured Projects" },
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#contact", label: "Contact" },
] as const;

export type NavSelectedHref = (typeof links)[number]["href"];

const NAV_FALLBACK = 100;

type NavProps = {
  /**
   * Controlled selection: pass the `href` of the link to highlight (e.g. `"#works"`).
   * Omit to auto-highlight from scroll position (scroll spy).
   */
  selectedHref?: NavSelectedHref;
};

export default function Nav({ selectedHref: selectedHrefProp }: NavProps = {}) {
  const navRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeFromScroll, setActiveFromScroll] = useState<NavSelectedHref>(
    links[0].href,
  );

  const selectedHref = selectedHrefProp ?? activeFromScroll;
  const scrollSpyEnabled = selectedHrefProp === undefined;

  useEffect(() => {
    if (!scrollSpyEnabled) return;

    let raf = 0;

    const scrollY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const computeActive = (): NavSelectedHref => {
      const nav = navRef.current;
      let offset: number;
      if (nav) {
        const rect = nav.getBoundingClientRect();
        offset = rect.bottom > 0 ? rect.bottom : 24;
      } else {
        offset = NAV_FALLBACK;
      }
      let current: NavSelectedHref = links[0].href;
      for (const link of links) {
        const el = document.getElementById(link.href.slice(1));
        if (!el) continue;
        const sectionTop = el.getBoundingClientRect().top;
        if (sectionTop <= offset + 4) {
          current = link.href;
        }
      }
      return current;
    };

    const update = () => {
      setScrolled(scrollY() > 50);
      setActiveFromScroll(computeActive());
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    document.addEventListener("scroll", onScrollOrResize, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("hashchange", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      document.removeEventListener("scroll", onScrollOrResize, {
        capture: true,
      });
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("hashchange", update);
    };
  }, [scrollSpyEnabled]);

  useEffect(() => {
    if (scrollSpyEnabled) return;

    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollSpyEnabled]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className={`relative z-10 flex w-full items-start justify-between gap-3 pl-0 pr-5 pb-4 pt-0 transition-colors duration-300 md:pr-12 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#top"
        className="font-display flex h-[93px] ml-[80px] w-fit min-w-[33px] shrink-0 items-center justify-center bg-[var(--color-fg)] px-2 text-[24px] uppercase leading-none tracking-normal text-[var(--color-bg)] selection:bg-[var(--color-bg)] selection:text-[var(--color-fg)]"
        aria-label="Chi-Linh Tran home"
      >
        CL
      </a>

      <div className="flex gap-3 pt-4 text-[0.68rem] font-semibold uppercase tracking-widest text-[var(--color-fg)] md:flex-col md:items-end md:gap-2">
        {links.map((link) => {
          const selected = link.href === selectedHref;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={selected ? "true" : undefined}
              className={`px-1.5 py-0.5 transition-colors selection:bg-[var(--color-bg)] selection:text-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] ${
                selected ? "bg-[var(--color-fg)] text-[var(--color-bg)]" : ""
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
