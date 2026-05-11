"use client";

import { motion, useReducedMotion } from "framer-motion";

import LinkCaret from "@/components/LinkCaret";
import { MonogramCL } from "@/components/MonogramCL";
import { contentShellClass, pageEdgeClass } from "@/lib/contentShell";

const roles = ["VFX Artist", "Digital Matte Painter", "Environment Generalist"];

export default function Hero() {
  const reduce = useReducedMotion();

  const fromLeft = {
    hidden: { opacity: 0, x: reduce ? 0 : -24 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-115px)] flex-col justify-start"
    >
      <div
        className={`flex flex-1 flex-col justify-center ${contentShellClass} py-6 md:py-8`}
      >
        <div>
          {roles.map((role, index) => (
            <motion.p
              key={role}
              variants={fromLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, delay: 0.18 * index }}
              className="font-sans text-[clamp(1.25rem,3.8vw,2.5rem)] font-[250] uppercase leading-none tracking-normal text-black"
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
        className="min-w-0 w-full border-y border-[var(--color-fg)] bg-[#e7e7e5]"
      >
        <div className={`@container min-w-0 w-full ${contentShellClass} py-5 md:py-6`}>
          <div className="w-full overflow-x-clip">
            <h1 className="w-full min-w-0 text-center font-display whitespace-nowrap text-[clamp(1rem,7cqw,150px)] uppercase leading-[1.05] tracking-normal md:leading-[1.25]">
              CHI–LINH{" "}
              (KR
              <span className="relative inline-block align-baseline text-inherit">
                <span
                  className="pointer-events-none absolute bottom-full left-1/2 -mb-[10px] h-[0.15em] w-[0.15em] min-h-[7px] min-w-[7px] -translate-x-1/2 translate-y-[0.1em] rounded-full bg-[#5c5c5c]"
                  aria-hidden
                />
                I
              </span>
              ST) TRAN
            </h1>
          </div>
        </div>
      </motion.div>

      <div
        className={`flex w-full flex-1 justify-between gap-y-6 ${contentShellClass} py-6 text-[var(--color-fg)] md:py-8`}
      >
        <MonogramCL className="self-start" />
        <div className="flex flex-col items-end gap-2 md:gap-2.5">
          <a
            className="font-sans flex items-center gap-2 text-[20px] font-bold leading-[100%] tracking-normal text-[var(--color-bg)] uppercase bg-[var(--color-fg)] px-2 py-0.5"
            href="https://chilinhtran.artstation.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="inline-flex items-center bg-[var(--color-fg)] px-2 py-0.5 text-[12px] font-bold uppercase text-[var(--color-bg)]">
              <LinkCaret className="text-[var(--color-bg)]" />
              Artstation
            </span>
          </a>
          <a
            className="group font-sans flex items-center gap-2 text-[20px] font-normal leading-[100%] tracking-normal uppercase text-[var(--color-fg)] hover:underline"
            href="#https://vimeo.com/899392906"
            target="_blank"
            rel="noreferrer"
          >
            <span className="inline-flex items-center gap-1 uppercase">
              <LinkCaret className="text-[var(--color-fg)] transition-transform group-hover:translate-y-px" />
              Portfolio
            </span>
          </a>
          <a
            className="group font-sans flex items-center gap-2 text-[20px] font-normal leading-[100%] tracking-normal uppercase text-[var(--color-fg)] hover:underline"
            href="https://www.imdb.com/name/nm14247434/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="inline-flex items-center gap-1 uppercase">
              <LinkCaret className="text-[var(--color-fg)] transition-transform group-hover:translate-y-px" />
              IMDb
            </span>
          </a>
        </div>
      </div>

      <div
        className={`flex items-center justify-between border-[var(--color-fg)] ${pageEdgeClass} pb-3`}
      >
        <a
          href="mailto:chilinh2708@gmail.com"
          className="text-[var(--color-fg)] transition-opacity hover:opacity-70"
          aria-label="Email Chi-Linh Tran"
        >
          <svg
            className="h-5 w-6"
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
        </a>
        <p
          className="flex items-center gap-2 [font-family:var(--font-display)] text-[16px] font-light uppercase leading-[100%] tracking-normal text-[var(--color-fg)] [writing-mode:vertical-rl]"
          aria-label="© 20 — 2X"
        >
          <span>©20</span>
          <span
            className="inline-block h-[33px] w-0 shrink-0 self-center border-l border-[var(--color-fg)]"
            aria-hidden
          />
          <span>2x</span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-5" aria-hidden>
        <div className="h-px w-full shrink-0 bg-[var(--color-fg)]" />
        <div className="h-px w-full shrink-0 bg-[var(--color-fg)]" />
      </div>
    </section>
  );
}
