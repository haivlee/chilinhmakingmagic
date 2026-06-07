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

/** Mobile / tablet auto-flow; desktop (xl+) reserves last-row cells for dots + CL after posters. */
const DESKTOP_COLS = 8;
const DESKTOP_ROWS = 5;
const RESERVED_CONTROL_CELLS = 3;
const PAGE_SIZE = DESKTOP_COLS * DESKTOP_ROWS - RESERVED_CONTROL_CELLS;
const MIN_DOT_COUNT = 2;
/** Last desktop row: posters cols 1–5, dots cols 6–7, monogram col 8. */
const LAST_ROW_POSTER_SLOTS = DESKTOP_COLS - RESERVED_CONTROL_CELLS;

type DesktopPosterCell = {
  row: number;
  col: number;
};

/** Pack posters so the final row always has images first, then room for 2 dots + CL. */
function getDesktopPosterCells(count: number): DesktopPosterCell[] {
  if (count <= 0) return [];

  const cells: DesktopPosterCell[] = [];
  let remaining = count;
  let row = 1;

  while (remaining > LAST_ROW_POSTER_SLOTS) {
    const chunk = Math.min(DESKTOP_COLS, remaining - LAST_ROW_POSTER_SLOTS);
    for (let col = 1; col <= chunk; col += 1) {
      cells.push({ row, col });
    }
    remaining -= chunk;
    row += 1;
  }

  for (let col = 1; col <= remaining; col += 1) {
    cells.push({ row, col });
  }

  return cells;
}

function getDesktopControlRow(count: number): number {
  if (count <= 0) return 1;
  return getDesktopPosterCells(count).at(-1)?.row ?? 1;
}

/**
 * Featured posters sit in the main column (~5-across), not full viewport width.
 * Fixed `px` hints on md+ avoid undersizing vs `vw` of the whole window.
 */
const POSTER_IMAGE_SIZES =
  "(min-width: 1280px) 320px, (min-width: 1024px) 220px, (min-width: 640px) 180px, 22vw";

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

  const desktopPosterCells = getDesktopPosterCells(pageItems.length);
  const desktopControlRow = getDesktopControlRow(pageItems.length);
  const lastRowPosterCount =
    desktopPosterCells.filter((cell) => cell.row === desktopControlRow).length;
  const controlGridVars = {
    "--poster-desktop-cols": String(DESKTOP_COLS),
    "--poster-dots-column": `${lastRowPosterCount + 1} / span ${MIN_DOT_COUNT}`,
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
          className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-6 xl:gap-2 xl:[grid-template-columns:repeat(var(--poster-desktop-cols),minmax(0,1fr))]"
          style={controlGridVars}
          {...pageMotion}
        >
          {pageItems.map((p, index) => {
            const desktopCell = desktopPosterCells[index];

            return (
            <div
              key={p.id}
              className="group relative z-0 aspect-[2/3] overflow-hidden rounded-[14px] border border-black/10 bg-black/5 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:z-10 hover:scale-[1.06] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:shadow-sm md:rounded-[20px] xl:[grid-column:var(--poster-cell-column)] xl:[grid-row:var(--poster-cell-row)]"
              style={
                desktopCell
                  ? ({
                      "--poster-cell-column": String(desktopCell.col),
                      "--poster-cell-row": String(desktopCell.row),
                    } as CSSProperties)
                  : undefined
              }
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
            );
          })}
          {pageCount > 1 ? (
            <nav
              className="col-span-full flex items-center justify-center gap-3 pt-3 max-xl:pl-0 xl:col-span-2 xl:justify-start xl:self-end xl:pl-3 xl:pt-0 xl:[grid-column:var(--poster-dots-column)] xl:[grid-row:var(--poster-control-row)]"
              aria-label="Poster pages"
            >
              {Array.from({ length: MIN_DOT_COUNT }, (_, i) => {
                const targetPage =
                  pageCount === MIN_DOT_COUNT ? i : activePage + (i === 0 ? -1 : 1);

                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={
                      pageCount === MIN_DOT_COUNT
                        ? `Page ${i + 1} of ${pageCount}`
                        : i === 0
                          ? "Previous poster page"
                          : "Next poster page"
                    }
                    aria-current={
                      pageCount === MIN_DOT_COUNT && i === activePage
                        ? "page"
                        : undefined
                    }
                    onClick={() =>
                      setPage(
                        Math.max(
                          0,
                          Math.min(pageCount - 1, targetPage),
                        ),
                      )
                    }
                    disabled={
                      pageCount > MIN_DOT_COUNT &&
                      ((i === 0 && activePage === 0) ||
                        (i === 1 && activePage === pageCount - 1))
                    }
                    className="h-4 w-4 shrink-0 rounded-full bg-[#d9d9d9] transition-colors hover:bg-[var(--color-muted)] disabled:opacity-40 md:h-6 md:w-6 aria-[current=page]:bg-[var(--color-fg)]"
                  />
                );
              })}
            </nav>
          ) : (
            <div
              className="col-span-full flex items-center justify-center gap-3 pt-3 max-xl:pl-0 xl:col-span-2 xl:justify-start xl:self-end xl:pl-3 xl:pt-0 xl:[grid-column:var(--poster-dots-column)] xl:[grid-row:var(--poster-control-row)]"
              aria-hidden
            >
              {Array.from({ length: MIN_DOT_COUNT }, (_, i) => (
                <span
                  key={i}
                  className="h-4 w-4 shrink-0 rounded-full bg-[#d9d9d9] md:h-6 md:w-6"
                />
              ))}
            </div>
          )}
          <div className="hidden xl:block xl:self-end xl:justify-self-end xl:[grid-column:var(--poster-monogram-column)] xl:[grid-row:var(--poster-control-row)]">
            <MonogramCL />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
