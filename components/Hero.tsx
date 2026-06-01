"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import LinkCaret from "@/components/LinkCaret";
import { contentShellClass, pageEdgeClass } from "@/lib/contentShell";

const roles = ["VFX Artist", "Digital Matte Painter", "Environment Generalist"];
const heroNameLabel = "CHI-LINH (KRIST) TRAN";
const heroNameMeasureSize = 100;
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function HeroNameText() {
  return (
    <>
      {"CHI-LINH (KR"}
      <span className="relative inline-block align-baseline leading-none text-inherit">
        <span
          className="pointer-events-none absolute left-1/2 top-[0.04em] h-[clamp(7px,0.22em,24px)] w-[clamp(7px,0.22em,24px)] -translate-x-1/2 -translate-y-full rounded-full bg-[#777777]"
          aria-hidden
        />
        I
      </span>
      {"ST) TRAN"}
    </>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const heroNameShellRef = useRef<HTMLDivElement>(null);
  const heroNameMeasureRef = useRef<HTMLSpanElement>(null);

  const fromLeft = {
    hidden: { opacity: 0, x: reduce ? 0 : -24 },
    visible: { opacity: 1, x: 0 },
  };

  useIsomorphicLayoutEffect(() => {
    const shell = heroNameShellRef.current;
    const measure = heroNameMeasureRef.current;

    if (!shell || !measure) {
      return;
    }

    let isMounted = true;
    let animationFrame = 0;

    const updateHeroNameSize = () => {
      const shellWidth = shell.clientWidth;
      const measuredWidth = measure.getBoundingClientRect().width;

      if (!shellWidth || !measuredWidth) {
        return;
      }

      const fittedSize = (shellWidth / measuredWidth) * heroNameMeasureSize;
      shell.style.setProperty("--hero-name-size", `${fittedSize}px`);
    };

    const requestUpdate = () => {
      if (!isMounted) {
        return;
      }

      cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateHeroNameSize);
    };

    updateHeroNameSize();

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(shell);
    void document.fonts.ready.then(requestUpdate);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-76px)] flex-col justify-start md:min-h-[calc(100svh-115px)]"
    >
      <div
        className={`flex flex-col justify-center ${contentShellClass} pt-0 pb-4`}
      >
        <div className="flex flex-col gap-6">
          {roles.map((role, index) => (
            <motion.p
              key={role}
              variants={fromLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, delay: 0.18 * index }}
              className="font-sans text-[clamp(2rem,7vw,2.5rem)] font-extralight font-[250] uppercase leading-none tracking-normal text-[var(--color-muted)]"
            >
              {role}
            </motion.p>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex min-h-[190px] min-w-0 w-full items-center border-y border-[var(--color-fg)] bg-[#e7e7e5] md:min-h-0 md:block"
      >
        <div
          className={`@container min-w-0 w-full ${contentShellClass} py-2 md:py-6`}
        >
          <div
            ref={heroNameShellRef}
            className="relative w-full overflow-x-clip text-center"
            style={
              {
                "--hero-name-size": "clamp(1rem,7cqw,150px)",
              } as CSSProperties
            }
          >
            <span
              ref={heroNameMeasureRef}
              className="pointer-events-none absolute left-0 top-0 hidden whitespace-nowrap font-display text-[100px] uppercase leading-[1.05] tracking-normal opacity-0 md:inline-block md:leading-[1.25]"
              aria-hidden
            >
              <HeroNameText />
            </span>
            <h1
              className="mx-auto block w-full min-w-0 whitespace-normal text-center font-display uppercase leading-[0.98] tracking-normal md:inline-block md:w-auto md:max-w-none md:whitespace-nowrap md:text-[length:var(--hero-name-size)] md:leading-[1.25]"
              aria-label={heroNameLabel}
            >
              <span className="md:hidden">
                <span className="block whitespace-nowrap text-[min(18cqw,6rem)] leading-[1.25]">
                  CHI-LINH
                </span>
                <span className="block whitespace-nowrap text-[min(13.5cqw,4rem)] leading-[1.25]">
                  (KRIST) TRAN
                </span>
              </span>
              <span className="hidden md:inline">
                <HeroNameText />
              </span>
            </h1>
          </div>
        </div>
      </motion.div>

      <div
        className={`mt-6 flex w-full flex-col gap-5 text-[var(--color-fg)] md:flex-row md:justify-between md:gap-y-6 ${contentShellClass}`}
      >
        <p className="min-w-0 w-full max-w-[62ch] self-start font-sans text-[16px] font-[300] leading-[150%] tracking-normal text-[#444444]">
          3D Artist &amp; VFX Artist specializing in cinematic environments,
          concept art, digital matte painting, compositing and photoreal CG for
          films, commercials, and game cinematics.
        </p>
        <div className="flex flex-col items-start gap-4 md:items-end md:gap-2.5">
          <a
            className="group font-sans flex w-full items-center justify-start gap-2 text-[20px] font-normal leading-[100%] tracking-normal text-[var(--color-fg)] md:justify-end"
            href="https://chilinhtran.artstation.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="inline-flex items-center gap-1 md:px-2 py-1 transition-colors group-hover:bg-[var(--color-fg)] group-hover:text-[var(--color-bg)] group-focus-visible:bg-[var(--color-fg)] group-focus-visible:text-[var(--color-bg)]">
              <LinkCaret className="transition-transform group-hover:translate-y-px" />
              Artstation
            </span>
          </a>
          <a
            className="group font-sans flex items-center gap-2 text-[20px] font-normal leading-[100%] tracking-normal text-[var(--color-fg)]"
            href="https://vimeo.com/899392906"
            target="_blank"
            rel="noreferrer"
          >
            <span className="inline-flex items-center gap-1 md:px-2 py-1 transition-colors group-hover:bg-[var(--color-fg)] group-hover:text-[var(--color-bg)] group-focus-visible:bg-[var(--color-fg)] group-focus-visible:text-[var(--color-bg)]">
              <LinkCaret className="transition-transform group-hover:translate-y-px" />
              Portfolio
            </span>
          </a>
          <a
            className="group font-sans flex items-center gap-2 text-[20px] font-normal leading-[100%] tracking-normal text-[var(--color-fg)]"
            href="https://www.imdb.com/name/nm14247434/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="inline-flex items-center gap-1 md:px-2 py-1 transition-colors group-hover:bg-[var(--color-fg)] group-hover:text-[var(--color-bg)] group-focus-visible:bg-[var(--color-fg)] group-focus-visible:text-[var(--color-bg)]">
              <LinkCaret className="transition-transform group-hover:translate-y-px" />
              IMDb
            </span>
          </a>
        </div>
      </div>

      <div
        className={`mt-9 flex items-end justify-between border-[var(--color-fg)] ${pageEdgeClass} pt-2 pb-3`}
      >
        <a
          href="mailto:chilinh2708@gmail.com"
          className="group relative inline-flex text-[var(--color-fg)]"
          aria-label="Email Chi-Linh Tran"
        >
          <svg
            className="h-5 w-6 transition-opacity group-hover:opacity-70 group-focus-visible:opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <span className="pointer-events-none absolute top-full left-0 mt-2 hidden items-center gap-1.5 whitespace-nowrap bg-black px-2 py-1 font-sans text-[16px] font-normal leading-none tracking-normal text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:inline-flex">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="5" width="18" height="14" rx="1" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            chilinh2708@gmail.com
          </span>
          <span className="pointer-events-none absolute top-full left-0 mt-2 inline-flex items-center gap-1.5 whitespace-nowrap bg-black px-2 py-1 font-sans text-[14px] font-normal leading-none tracking-normal text-white opacity-0 transition-opacity group-focus-visible:opacity-100 active:opacity-100 md:hidden">
            chilinh2708@gmail.com
          </span>
        </a>
        <p
          className="flex items-center gap-2 [font-family:var(--font-display)] text-[16px] font-light uppercase leading-[100%] tracking-normal text-[var(--color-fg)] md:[writing-mode:vertical-rl]"
          aria-label="© 20 — 2X"
        >
          <span>©20</span>
          <span
            className="inline-block h-0 w-[33px] shrink-0 self-center border-t border-[var(--color-fg)] md:h-[33px] md:w-0 md:border-l md:border-t-0"
            aria-hidden
          />
          <span>2x</span>
        </p>
      </div>

      <div className="mt-[20px] md:mt-[60px] flex w-full flex-col gap-6" aria-hidden>
        <div className="h-px w-full shrink-0 bg-[var(--color-fg)]" />
        <div className="h-px w-full shrink-0 bg-[var(--color-fg)]" />
      </div>
    </section>
  );
}
