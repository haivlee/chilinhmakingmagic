"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { type CSSProperties, useMemo, useState } from "react";

import { MonogramCL } from "@/components/MonogramCL";
import type { PosterItem } from "@/lib/posters";

/** One shared timing curve for enter + exit — avoids uneven “fast out / slow in” feel. */
const PAGE_EASE = [0.4, 0, 0.2, 1] as const;

/** Same duration for both directions so pagination always reads the same. */
const PAGE_DURATION = 0.28;

/** Mobile rows auto-flow; desktop reserves the final row cells for dots + C___L. */
const MOBILE_COLS = 4;
const DESKTOP_COLS = 8;
const DESKTOP_ROWS = 5;
const RESERVED_CONTROL_CELLS = 3;
const PAGE_SIZE = DESKTOP_COLS * DESKTOP_ROWS - RESERVED_CONTROL_CELLS;
const MIN_DOT_COUNT = 2;

/**
 * Featured posters sit in the main column (~5-across), not full viewport width.
 * Fixed `px` hints on md+ avoid undersizing vs `vw` of the whole window.
 */
const POSTER_IMAGE_SIZES =
  "(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 768px) 28vw, 56vw";

type Props = {
  posters: PosterItem[];
};

export function FeaturedPosterGrid({ posters }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const pageCount = Math.max(1, Math.ceil(posters.length / PAGE_SIZE));
  const [page, setPage] = useState(0);
  const activePage = Math.min(page, pageCount - 1);
  const pageItems = useMemo(
    () =>
      posters.slice(
        activePage * PAGE_SIZE,
        activePage * PAGE_SIZE + PAGE_SIZE,
      ),
    [posters, activePage],
  );

  const pageTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: PAGE_DURATION, ease: PAGE_EASE };

  const pageMotion = prefersReducedMotion
    ? {
        initial: false,
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: pageTransition,
      };

  const lastDesktopRowPosterCount =
    pageItems.length % DESKTOP_COLS || DESKTOP_COLS;
  const desktopControlRow = Math.ceil(pageItems.length / DESKTOP_COLS);
  const controlGridVars = {
    "--poster-mobile-cols": String(MOBILE_COLS),
    "--poster-desktop-cols": String(DESKTOP_COLS),
    "--poster-dots-column": `${Math.min(
      lastDesktopRowPosterCount + 1,
      DESKTOP_COLS - 2,
    )} / span 2`,
    "--poster-monogram-column": `${DESKTOP_COLS} / span 1`,
    "--poster-control-row": String(desktopControlRow),
  } as CSSProperties;

  if (posters.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-black/[0.03] px-6 py-16 text-center text-sm text-[var(--color-muted)]">
        Add poster images to{" "}
        <span className="font-mono text-[var(--color-fg)]">
          public/data/img/posters
        </span>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activePage}
          className="grid gap-1.5 [grid-template-columns:repeat(var(--poster-mobile-cols),minmax(0,1fr))] md:gap-2 md:[grid-template-columns:repeat(var(--poster-desktop-cols),minmax(0,1fr))]"
          style={controlGridVars}
          {...pageMotion}
        >
          {pageItems.map((p) => (
            <div
              key={p.id}
              className="group relative z-0 aspect-[2/3] overflow-hidden rounded-[20px] border border-black/10 bg-black/5 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:z-10 hover:scale-[1.06] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:shadow-sm"
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                sizes={POSTER_IMAGE_SIZES}
                quality={92}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
          ))}
          {pageCount > 1 ? (
            <nav
              className="col-span-2 flex items-center gap-3 self-end pl-3 md:[grid-column:var(--poster-dots-column)] md:[grid-row:var(--poster-control-row)]"
              aria-label="Poster pages"
            >
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Page ${i + 1} of ${pageCount}`}
                  aria-current={i === activePage ? "page" : undefined}
                  onClick={() => setPage(i)}
                  className="h-6 w-6 shrink-0 rounded-full bg-[#d9d9d9] transition-colors hover:bg-[var(--color-muted)]"
                />
              ))}
            </nav>
          ) : (
            <div
              className="col-span-2 flex items-center gap-3 self-end pl-3 md:[grid-column:var(--poster-dots-column)] md:[grid-row:var(--poster-control-row)]"
              aria-hidden
            >
              {Array.from({ length: MIN_DOT_COUNT }, (_, i) => (
                <span
                  key={i}
                  className="h-6 w-6 shrink-0 rounded-full bg-[#d9d9d9]"
                />
              ))}
            </div>
          )}
          <div className="self-end justify-self-end md:[grid-column:var(--poster-monogram-column)] md:[grid-row:var(--poster-control-row)]">
            <MonogramCL />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
