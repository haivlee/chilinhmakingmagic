"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

import type { PosterItem } from "@/lib/posters";

/** One shared timing curve for enter + exit — avoids uneven “fast out / slow in” feel. */
const PAGE_EASE = [0.4, 0, 0.2, 1] as const;

/** Same duration for both directions so pagination always reads the same. */
const PAGE_DURATION = 0.28;

/** Grid dimensions — `PAGE_SIZE` and column count follow these only. */
const COLS = 5;
const ROWS = 3;
const PAGE_SIZE = COLS * ROWS;

const gridStyle = {
  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
} as const;

/**
 * Featured posters sit in the main column (~5-across), not full viewport width.
 * Fixed `px` hints on md+ avoid undersizing vs `vw` of the whole window.
 */
const POSTER_IMAGE_SIZES =
  "(min-width: 1280px) 280px, (min-width: 1024px) 240px, (min-width: 768px) 24vw, 50vw";

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
          className="grid gap-1.5 md:gap-2"
          style={gridStyle}
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
        </motion.div>
      </AnimatePresence>

      {pageCount > 1 ? (
        <nav
          className="mt-5 flex justify-center gap-2.5 md:mt-6"
          aria-label="Poster pages"
        >
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Page ${i + 1} of ${pageCount}`}
              aria-current={i === activePage ? "page" : undefined}
              onClick={() => setPage(i)}
              className={
                i === activePage
                  ? "h-2.5 w-2.5 rounded-full bg-[var(--color-fg)] transition-transform"
                  : "h-2 w-2 rounded-full bg-[var(--color-border)] transition-colors hover:bg-[var(--color-muted)]"
              }
            />
          ))}
        </nav>
      ) : null}
    </div>
  );
}
