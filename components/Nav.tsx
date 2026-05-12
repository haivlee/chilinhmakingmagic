"use client";

import { useEffect, useRef, useState } from "react";

import { pageEdgeClass } from "@/lib/contentShell";

/** Section anchors — `selectedHref` (optional) must match one of these `href` values. */
const links = [
  { href: "#featured", label: "Featured Projects" },
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#contact", label: "Contact" },
] as const;

export type NavSelectedHref = (typeof links)[number]["href"];

const NAV_FALLBACK = 100 ;

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
  const [activeFromScroll, setActiveFromScroll] = useState<NavSelectedHref>();
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedHref = selectedHrefProp ?? activeFromScroll;
  const scrollSpyEnabled = selectedHrefProp === undefined;

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!scrollSpyEnabled) return;

    let raf = 0;

    const scrollY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const computeActive = (): NavSelectedHref | undefined => {
      const nav = navRef.current;
      let offset: number;
      if (nav) {
        const rect = nav.getBoundingClientRect();
        offset = rect.bottom > 0 ? rect.bottom : 24;
      } else {
        offset = NAV_FALLBACK;
      }
      let current: NavSelectedHref | undefined;
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
      className={`relative z-10 w-full transition-colors duration-300 ${
        scrolled
          ? `border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 ${
              mobileOpen ? "" : "backdrop-blur-sm"
            }`
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`flex items-start justify-between gap-3 pb-4 pt-0 ${pageEdgeClass}`}
      >
      <a
        href="#top"
        className="font-display font-ultrabold font-[800] flex h-[93px] w-fit min-w-[33px] shrink-0 items-end justify-center bg-[var(--color-fg)] px-2 pb-2 text-[24px] uppercase leading-none tracking-normal text-[var(--color-bg)] selection:bg-[var(--color-bg)] selection:text-[var(--color-fg)]"
        aria-label="Chi-Linh Tran home"
      >
        CL
      </a>

      <div className="relative pt-14 font-sans text-[16px] font-extralight uppercase leading-none tracking-normal text-[var(--color-fg)]">
        <div className="hidden gap-3 md:flex md:flex-col md:items-end md:gap-2">
          {links.map((link) => {
            const selected = link.href === selectedHref;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={selected ? "true" : undefined}
                className={`px-1.5 py-0.5 font-extralight transition-colors selection:bg-[var(--color-bg)] selection:font-extrabold selection:text-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:font-extrabold hover:text-[var(--color-bg)] ${
                  selected
                    ? "bg-[var(--color-fg)] font-extrabold text-[var(--color-bg)]"
                    : ""
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-[var(--color-fg)] text-[var(--color-fg)] md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="nav-mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {mobileOpen ? (
              <>
                <path d="M6 18L18 6M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </>
            )}
          </svg>
        </button>

        {mobileOpen ? (
          <>
            <div
              className="fixed inset-0 z-[60] bg-[var(--color-fg)]/15 md:hidden"
              aria-hidden
              onClick={closeMobile}
            />
            <div
              id="nav-mobile-menu"
              aria-label="Page sections"
              className="absolute right-0 top-full z-[70] mt-2 flex w-[min(calc(100vw-2.5rem),20rem)] flex-col gap-1 border border-[var(--color-border)] bg-[var(--color-bg)] py-2 shadow-md md:hidden"
            >
              {links.map((link) => {
                const selected = link.href === selectedHref;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={selected ? "true" : undefined}
                    onClick={closeMobile}
                    className={`px-4 py-3 text-right transition-colors hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] ${
                      selected
                        ? "bg-[var(--color-fg)] font-extrabold text-[var(--color-bg)]"
                        : ""
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      </div>
    </nav>
  );
}
