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
const STICKY_STOP_MARKER_ID = "works-sticky-stop";
const STICKY_STOP_VIEWPORT_OFFSET_PX = 48;
const STICKY_STOP_HYSTERESIS_PX = 12;

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
  const [stickyEnabled, setStickyEnabled] = useState(true);
  const [activeFromScroll, setActiveFromScroll] = useState<NavSelectedHref>();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileEntered, setMobileEntered] = useState(false);

  const selectedHref = selectedHrefProp ?? activeFromScroll;
  const scrollSpyEnabled = selectedHrefProp === undefined;

  const closeMobile = () => setMobileOpen(false);

  const handleMobileMenuTransitionEnd = (
    e: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (e.propertyName !== "transform" || mobileOpen) return;
    setShowMobileMenu(false);
  };

  useEffect(() => {
    if (!mobileOpen) {
      setMobileEntered(false);
      const fallbackId = window.setTimeout(() => {
        setShowMobileMenu(false);
      }, 320);
      return () => window.clearTimeout(fallbackId);
    }

    setShowMobileMenu(true);
    setMobileEntered(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMobileEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => {
      if (mq.matches) {
        setMobileOpen(false);
        setShowMobileMenu(false);
        setMobileEntered(false);
      }
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
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
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

  useEffect(() => {
    let raf = 0;

    const updateStickyEnabled = () => {
      const marker = document.getElementById(STICKY_STOP_MARKER_ID);
      if (!marker) {
        setStickyEnabled(true);
        return;
      }

      const markerTop = marker.getBoundingClientRect().top;
      const stopLine = window.innerHeight - STICKY_STOP_VIEWPORT_OFFSET_PX;

      setStickyEnabled((previouslySticky) => {
        if (previouslySticky) {
          return markerTop > stopLine - STICKY_STOP_HYSTERESIS_PX;
        }

        return markerTop > stopLine + STICKY_STOP_HYSTERESIS_PX;
      });
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateStickyEnabled);
    };

    updateStickyEnabled();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className={`z-50 w-full border-none bg-transparent ${stickyEnabled ? "md:sticky md:top-0" : "md:relative md:top-auto"}`}
    >
      <div
        className={`flex items-start justify-between gap-3 pb-4 pt-0 md:pb-4 ${pageEdgeClass}`}
      >
        <a
          href="#top"
          className="font-display font-ultrabold font-[800] flex h-[93px] w-fit min-w-[40px] shrink-0 items-end justify-center bg-[var(--color-fg)] px-1.5 pb-1.5 text-[28px] uppercase leading-none tracking-normal text-[var(--color-bg)] selection:bg-[var(--color-bg)] selection:text-[var(--color-fg)] md:h-[93px] md:min-w-[33px] md:px-2 md:pb-2 md:text-[24px]"
          aria-label="Chi-Linh Tran home"
        >
          CL
        </a>

        <div className="relative min-h-14 min-w-14 shrink-0 pt-4 font-sans text-[16px] font-extralight uppercase leading-none tracking-normal text-[var(--color-fg)] md:min-h-0 md:min-w-0 md:pt-14">
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
          className="flex min-h-14 min-w-14 items-center justify-center rounded-sm text-[#9a9a9a] max-md:fixed max-md:right-4 max-md:top-4 max-md:z-[60] md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="nav-mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        {showMobileMenu ? (
          <div
            id="nav-mobile-menu"
            aria-label="Page sections"
            aria-hidden={!mobileOpen}
            onTransitionEnd={handleMobileMenuTransitionEnd}
            className={`fixed inset-0 z-[100] flex flex-col bg-[var(--color-bg)] transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
              mobileEntered ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              className={`flex items-start justify-between pb-4 pt-0 ${pageEdgeClass}`}
            >
              <a
                href="#top"
                onClick={closeMobile}
                className="font-display font-ultrabold font-[800] flex h-[93px] w-fit min-w-[40px] shrink-0 items-end justify-center bg-[var(--color-fg)] px-1.5 pb-1.5 text-[28px] uppercase leading-none tracking-normal text-[var(--color-bg)]"
                aria-label="Chi-Linh Tran home"
              >
                CL
              </a>
              <button
                type="button"
                className="flex min-h-14 min-w-14 items-center justify-center rounded-sm pt-4 text-[#9a9a9a]"
                aria-label="Close menu"
                onClick={closeMobile}
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center pb-[20vh]">
              <div className="w-full border-t border-[#9a9a9a]">
                {links.map((link) => {
                  const selected = link.href === selectedHref;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-current={selected ? "true" : undefined}
                      onClick={closeMobile}
                      className={`block border-b border-[#9a9a9a] py-8 text-center font-sans font-thin text-[30px] font-[250] uppercase leading-[100%] tracking-normal text-black transition-colors hover:opacity-70 ${
                        selected ? "font-normal" : ""
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      </div>
    </nav>
  );
}
