"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { WorkImage, WorkRow } from "@/data/works";
import { contentShellClass, sectionPaddingClass } from "@/lib/contentShell";

const sideLabelParts = [
  "Environment",
  "CG Generalist",
  "Compositing",
  "Modeling",
  "Digital Matte Painting",
  "Concept Art",
] as const;

/** Per-strip repeats; 8 strips tile seamlessly with translateY(calc(-100% / 8)). */
const SIDE_LABEL_REPEATS = 14;
const sideLabelTrackParts = Array.from(
  { length: SIDE_LABEL_REPEATS },
  () => sideLabelParts,
).flat();

const SIDE_MARQUEE_SEGMENTS = 8;

/**
 * Declared layout widths for `sizes` (Next picks srcset from these + DPR).
 * Slightly above measurable CSS width so 2× / 2.5× and hover scale don’t pick a soft asset.
 */
const WORK_IMAGE_SIZES = {
  full: "(min-width: 1536px) 1400px, (min-width: 1280px) 1280px, (min-width: 1024px) 96vw, (min-width: 768px) 98vw, 100vw",
  half: "(min-width: 1536px) 720px, (min-width: 1280px) 650px, (min-width: 1024px) 48vw, (min-width: 768px) 49vw, 100vw",
  third:
    "(min-width: 1536px) 480px, (min-width: 1280px) 440px, (min-width: 1024px) 33vw, (min-width: 768px) 34vw, 100vw",
  bottom:
    "(min-width: 768px) 420px, (min-width: 1024px) 440px, 90vw",
} as const;

type WorkTileLayout = keyof typeof WORK_IMAGE_SIZES;

/** Fixed strip height so full-row and half-row tiles match (aspect-ratio scales height with width). */
const WORK_MAIN_TILE_HEIGHT = "h-[clamp(192px,24vw,304px)] w-full";

function SideLabelDot() {
  return (
    <span
      className="inline-block h-[7px] w-[7px] shrink-0 rotate-0 rounded-full bg-[var(--color-muted)] opacity-100 [margin-inline:0.65em]"
      aria-hidden
    />
  );
}

function SideLabelTrackSegment() {
  return (
    <span className="shrink-0 whitespace-nowrap">
      {sideLabelTrackParts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part.replace(/ /g, "\u00A0")}
          <SideLabelDot />
        </span>
      ))}
    </span>
  );
}

function SideLabelMarquee({ flip }: { flip: boolean }) {
  const trackClass =
    "works-side-marquee-y flex flex-row gap-0 whitespace-nowrap [font-family:var(--font-display)] text-[16px] font-light uppercase leading-[100%] tracking-normal text-[var(--color-fg)] [writing-mode:vertical-rl]";

  return (
    <div
      className="pointer-events-none relative hidden min-h-0 w-6 shrink-0 overflow-hidden sm:w-7 md:block"
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {/* Rotate on a wrapper: keyframes only set translateY and would override rotate-180 on the same node. */}
          <div
            className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden ${flip ? "origin-center rotate-180" : ""}`}
          >
            <div className={trackClass}>
              {Array.from({ length: SIDE_MARQUEE_SEGMENTS }, (_, i) => (
                <SideLabelTrackSegment key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkTile(props: {
  image: WorkImage;
  layout: WorkTileLayout;
  priority?: boolean;
  /** Extra classes on `<figure>` (e.g. fixed width for horizontal strip). */
  figureClassName?: string;
}) {
  const { image, layout, priority = false, figureClassName } = props;

  const isMainStrip = layout === "full" || layout === "half";
  const frameClass = isMainStrip
    ? WORK_MAIN_TILE_HEIGHT
    : figureClassName
      ? "aspect-[2/1] shrink-0"
      : "aspect-[2/1] w-full";

  return (
    <figure
      className={`group relative overflow-hidden rounded-[16px] border border-black/10 bg-black/5 ${frameClass} ${figureClassName ?? ""}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={WORK_IMAGE_SIZES[layout]}
        quality={92}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </figure>
  );
}

function CaptionRow({ text }: { text: string }) {
  return (
    <div className="grid items-center gap-5 py-3 md:grid-cols-[1fr_minmax(260px,700px)_1fr]">
      <span className="hidden h-px bg-[var(--color-border)] md:block" />
      <p className="text-center [font-family:var(--font-display)] text-[20px] font-normal leading-[24px] tracking-normal text-[var(--color-fg)]">
        {text}
      </p>
      <span className="hidden h-px bg-[var(--color-border)] md:block" />
    </div>
  );
}

function WorkRowRenderer({ row, index }: { row: WorkRow; index: number }) {
  if (row.type === "caption") {
    return <CaptionRow text={row.text} />;
  }

  if (row.type === "full") {
    return <WorkTile image={row.image} layout="full" priority={index < 2} />;
  }

  if (row.type === "half") {
    return (
      <div className="grid gap-2 md:grid-cols-2">
        {row.images.map((image, i) => (
          <WorkTile
            key={`${image.src}-${i}`}
            image={image}
            layout="half"
            priority={index < 2}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:grid-cols-3">
      {row.images.map((image, i) => (
        <WorkTile key={`${image.src}-${i}`} image={image} layout="third" />
      ))}
    </div>
  );
}

function WorksBottomDragStrip({ bottomWorks }: { bottomWorks: WorkImage[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const stripCardClass =
    "min-w-[260px] w-[min(92vw,440px)] sm:min-w-[300px] md:w-[400px] lg:w-[440px]";

  const updateScrollEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) {
      setAtStart(true);
      setAtEnd(true);
      return;
    }
    const sl = el.scrollLeft;
    setAtStart(sl <= 2);
    setAtEnd(sl >= max - 2);
  }, []);

  const getScrollStepPx = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | undefined;
    if (!first) return 420;
    const gap =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches
        ? 16
        : 12;
    return Math.round(first.getBoundingClientRect().width + gap);
  }, []);

  const scrollStrip = useCallback(
    (direction: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const step = getScrollStepPx();
      el.scrollBy({
        left: direction * step,
        behavior: "auto",
      });
      requestAnimationFrame(updateScrollEdges);
    },
    [getScrollStepPx, updateScrollEdges],
  );

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    el.scrollLeft = 0;

    const ro = new ResizeObserver(() => {
      updateScrollEdges();
    });
    ro.observe(el);
    ro.observe(track);

    requestAnimationFrame(updateScrollEdges);

    return () => ro.disconnect();
  }, [bottomWorks, updateScrollEdges]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = dragRef.current.startScroll - (e.clientX - dragRef.current.startX);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    scrollerRef.current?.releasePointerCapture(e.pointerId);
    requestAnimationFrame(updateScrollEdges);
  };

  if (bottomWorks.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="More works — use arrows or drag sideways to scroll"
      className="relative -mx-6 select-none md:-mx-[100px]"
    >
      <div
        ref={scrollerRef}
        onScroll={updateScrollEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="cursor-grab touch-pan-x overflow-x-auto overflow-y-hidden py-1 active:cursor-grabbing [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--color-border)]"
      >
        <div ref={trackRef} className="flex w-max shrink-0 gap-3 pr-3 md:gap-4 md:pr-4">
          {bottomWorks.map((image, i) => (
            <WorkTile
              key={`${image.src}-${i}`}
              image={image}
              layout="bottom"
              figureClassName={stripCardClass}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        <button
          type="button"
          aria-label="Scroll works left"
          aria-disabled={atStart}
          disabled={atStart}
          onClick={(e) => {
            e.stopPropagation();
            scrollStrip(-1);
          }}
          className="pointer-events-auto absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-white/35 text-[var(--color-fg)] shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-[transform,background-color,box-shadow] hover:bg-white/55 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fg)] disabled:pointer-events-none disabled:opacity-35 lg:left-4 lg:h-12 lg:w-12"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Scroll works right"
          aria-disabled={atEnd}
          disabled={atEnd}
          onClick={(e) => {
            e.stopPropagation();
            scrollStrip(1);
          }}
          className="pointer-events-auto absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-white/35 text-[var(--color-fg)] shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-[transform,background-color,box-shadow] hover:bg-white/55 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fg)] disabled:pointer-events-none disabled:opacity-35 lg:right-4 lg:h-12 lg:w-12"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

type WorksGridProps = {
  workRows: WorkRow[];
  bottomWorks: WorkImage[];
};

export default function WorksGrid({ workRows, bottomWorks }: WorksGridProps) {
  const reduce = useReducedMotion();

  return (
    <section id="works" className={sectionPaddingClass}>
      <div className="border-b border-[var(--color-border)] pb-4 text-center">
        <h2 className="font-display text-center text-[clamp(4rem,6vw,6rem)] uppercase leading-[1.5] tracking-normal text-[var(--color-fg)]">
          My Works
        </h2>
        <p className="mt-5 border-t border-[var(--color-border)] pt-4 text-center font-sans font-extralight text-[18px] font-[275] leading-[100%] tracking-normal text-[var(--color-fg)]">
          Frames that tell more than just a story.
        </p>
      </div>

      <div className={`mt-16 ${contentShellClass}`}>
        <div className="grid items-stretch gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6 lg:gap-8">
          <SideLabelMarquee flip />
          <div className="min-w-0 space-y-2">
            {workRows.map((row, index) => (
              <motion.div
                key={`${row.type}-${index}`}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <WorkRowRenderer row={row} index={index} />
              </motion.div>
            ))}
          </div>
          <SideLabelMarquee flip={false} />
        </div>
      </div>

      <div className={`mt-16 ${contentShellClass}`}>
        <WorksBottomDragStrip bottomWorks={bottomWorks} />
      </div>
    </section>
  );
}
