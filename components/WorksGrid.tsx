"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
const WORK_BOTTOM_TILE_WIDTH =
  "w-full md:min-w-[260px] md:w-[min(92vw,440px)] lg:w-[440px]";
const WORK_BOTTOM_LOOP_COPIES = 3;

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
  onSelect?: (image: WorkImage) => void;
  /** Extra classes on `<figure>` (e.g. fixed width for horizontal strip). */
  figureClassName?: string;
}) {
  const { image, layout, priority = false, onSelect, figureClassName } = props;

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
      <button
        type="button"
        aria-label={`Open ${image.alt}`}
        onClick={() => onSelect?.(image)}
        className="absolute inset-0 z-10 cursor-zoom-in touch-pan-x focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
      />
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

function WorkRowRenderer({
  row,
  index,
  onSelectImage,
}: {
  row: WorkRow;
  index: number;
  onSelectImage: (image: WorkImage) => void;
}) {
  if (row.type === "caption") {
    return <CaptionRow text={row.text} />;
  }

  if (row.type === "full") {
    return (
      <WorkTile
        image={row.image}
        layout="full"
        priority={index < 2}
        onSelect={onSelectImage}
      />
    );
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
            onSelect={onSelectImage}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:grid-cols-3">
      {row.images.map((image, i) => (
        <WorkTile
          key={`${image.src}-${i}`}
          image={image}
          layout="third"
          onSelect={onSelectImage}
        />
      ))}
    </div>
  );
}

function WorksBottomDragStrip({
  bottomWorks,
  onSelectImage,
}: {
  bottomWorks: WorkImage[];
  onSelectImage: (image: WorkImage) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopGroupRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const mouseDragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const momentumFrameRef = useRef<number | null>(null);
  const pendingMouseSelectRef = useRef<WorkImage | null>(null);

  const normalizeScrollLoop = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) return;

    let shift = 0;
    if (el.scrollLeft < loopWidth * 0.5) {
      shift = loopWidth;
    } else if (el.scrollLeft > loopWidth * 1.5) {
      shift = -loopWidth;
    }

    if (shift !== 0) {
      el.scrollLeft += shift;
      if (mouseDragRef.current.active) {
        mouseDragRef.current.startScroll += shift;
      }
    }
  }, []);

  const stopMomentum = useCallback(() => {
    if (momentumFrameRef.current == null) return;
    cancelAnimationFrame(momentumFrameRef.current);
    momentumFrameRef.current = null;
  }, []);

  const startMomentum = useCallback(
    (initialVelocity: number) => {
      const el = scrollerRef.current;
      let velocity = Math.max(-3.2, Math.min(3.2, initialVelocity * 1.18));
      let previousTime = performance.now();

      if (!el || Math.abs(velocity) < 0.02) return;
      stopMomentum();

      const step = (time: number) => {
        const scroller = scrollerRef.current;
        if (!scroller) {
          momentumFrameRef.current = null;
          return;
        }

        const deltaTime = Math.min(time - previousTime, 32);
        previousTime = time;
        scroller.scrollLeft += velocity * deltaTime;
        normalizeScrollLoop();

        velocity *= Math.pow(0.94, deltaTime / 16.67);
        if (Math.abs(velocity) < 0.02) {
          momentumFrameRef.current = null;
          return;
        }

        momentumFrameRef.current = requestAnimationFrame(step);
      };

      momentumFrameRef.current = requestAnimationFrame(step);
    },
    [normalizeScrollLoop, stopMomentum],
  );

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const syncLoopMetrics = () => {
      const loopWidth = loopGroupRef.current?.getBoundingClientRect().width ?? 0;
      loopWidthRef.current = loopWidth;

      if (loopWidth > 0) {
        el.scrollLeft = loopWidth;
      }
    };

    const ro = new ResizeObserver(() => {
      syncLoopMetrics();
    });
    ro.observe(el);
    ro.observe(track);

    requestAnimationFrame(syncLoopMetrics);

    return () => ro.disconnect();
  }, [bottomWorks]);

  useEffect(() => stopMomentum, [stopMomentum]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    stopMomentum();

    const target = event.target instanceof HTMLElement ? event.target : null;
    const imageIndex = target
      ?.closest("[data-slider-image-index]")
      ?.getAttribute("data-slider-image-index");

    pendingMouseSelectRef.current =
      imageIndex == null ? null : bottomWorks[Number(imageIndex)] ?? null;
    mouseDragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!mouseDragRef.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;

    const deltaX = event.clientX - mouseDragRef.current.startX;
    if (Math.abs(deltaX) > 6) {
      mouseDragRef.current.moved = true;
    }

    el.scrollLeft = mouseDragRef.current.startScroll - deltaX;
    const now = performance.now();
    const timeDelta = Math.max(now - mouseDragRef.current.lastTime, 1);
    mouseDragRef.current.velocity =
      -(event.clientX - mouseDragRef.current.lastX) / timeDelta;
    mouseDragRef.current.lastX = event.clientX;
    mouseDragRef.current.lastTime = now;
    normalizeScrollLoop();
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!mouseDragRef.current.active) return;
    const pendingImage = pendingMouseSelectRef.current;
    const shouldSelect = !mouseDragRef.current.moved;

    mouseDragRef.current.active = false;
    pendingMouseSelectRef.current = null;
    scrollerRef.current?.releasePointerCapture(event.pointerId);

    if (pendingImage && shouldSelect) {
      onSelectImage(pendingImage);
    } else if (mouseDragRef.current.moved) {
      startMomentum(mouseDragRef.current.velocity);
    }

    requestAnimationFrame(normalizeScrollLoop);
  };

  const onPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!mouseDragRef.current.active) return;
    mouseDragRef.current.active = false;
    pendingMouseSelectRef.current = null;
    scrollerRef.current?.releasePointerCapture(event.pointerId);
    stopMomentum();
    requestAnimationFrame(normalizeScrollLoop);
  };

  if (bottomWorks.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="More works - drag sideways to scroll"
      className="relative left-1/2 w-screen -translate-x-1/2 select-none"
    >
      <div
        ref={scrollerRef}
        onScroll={normalizeScrollLoop}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className="cursor-grab touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 py-1 active:cursor-grabbing [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:px-[100px] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max shrink-0 pr-6 md:pr-[100px]"
        >
          {Array.from({ length: WORK_BOTTOM_LOOP_COPIES }, (_, copyIndex) => (
            <div
              key={copyIndex}
              ref={copyIndex === 0 ? loopGroupRef : undefined}
              className="flex shrink-0 gap-1 pr-1 md:gap-2 md:pr-2"
            >
              {bottomWorks.map((image, i) => (
                <div
                  key={`${copyIndex}-${image.src}-${i}`}
                  data-slider-image-index={i}
                  className="shrink-0"
                >
                  <WorkTile
                    image={image}
                    layout="bottom"
                    onSelect={onSelectImage}
                    figureClassName={WORK_BOTTOM_TILE_WIDTH}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorksBottomImageRow({
  images,
  onSelectImage,
}: {
  images: WorkImage[];
  onSelectImage: (image: WorkImage) => void;
}) {
  if (images.length === 0) return null;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 px-6 md:overflow-x-auto md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
      <div className="grid grid-cols-3 gap-1 md:flex md:w-max md:shrink-0 md:gap-2 lg:mx-auto">
        {images.map((image, i) => (
          <WorkTile
            key={`${image.src}-${i}`}
            image={image}
            layout="bottom"
            onSelect={onSelectImage}
            figureClassName={WORK_BOTTOM_TILE_WIDTH}
          />
        ))}
      </div>
    </div>
  );
}

function WorksImageLightbox({
  image,
  onClose,
}: {
  image: WorkImage | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!image) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  const lightboxLeftText = image.lightboxLeftText ?? "Personal Project";
  const lightboxRightText = image.lightboxRightText ?? "all aspect";
  const lightboxLeftTextClass =
    image.lightboxLeftTextColor === "black" ? "text-black" : "text-white";
  const lightboxRightTextClass =
    image.lightboxRightTextColor === "black" ? "text-black" : "text-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4 py-10"
    >
      <div
        className="relative h-[min(72vh,760px)] w-[min(calc(100vw-3rem),1450px)] overflow-hidden rounded-[8px] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1450px) 1450px, calc(100vw - 3rem)"
          quality={92}
          className="object-cover"
        />

        <button
          type="button"
          aria-label="Close image"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center text-white/90 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-4 pb-4 pt-14 text-white md:px-6 md:pb-5">
          <p
            className={`font-sans text-[12px] font-regular font-[400] leading-none tracking-normal ${lightboxLeftTextClass}`}
          >
            {lightboxLeftText}
          </p>
          <p
            className={`font-sans text-[12px] font-regular font-[400] leading-none tracking-normal ${lightboxRightTextClass}`}
          >
            {lightboxRightText}
          </p>
        </div>
      </div>
    </div>
  );
}

type WorksGridProps = {
  workRows: WorkRow[];
  bottomRowWorks: WorkImage[];
  bottomSliderWorks: WorkImage[];
};

export default function WorksGrid({
  workRows,
  bottomRowWorks,
  bottomSliderWorks,
}: WorksGridProps) {
  const reduce = useReducedMotion();
  const [selectedImage, setSelectedImage] = useState<WorkImage | null>(null);
  const mobileBottomWorks = useMemo(
    () => [...bottomRowWorks, ...bottomSliderWorks],
    [bottomRowWorks, bottomSliderWorks],
  );

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <section id="works" className={sectionPaddingClass}>
      <div className="border-b border-[var(--color-border)] pb-4 text-center">
        <h2 className="font-display text-center text-[clamp(2.3rem,12vw,6rem)] uppercase leading-[1.1] tracking-normal text-[var(--color-fg)] md:leading-[1.5]">
          My Works
        </h2>
        <p className="mt-3 border-t border-[var(--color-border)] pt-3 text-center font-sans font-extralight text-[18px] font-[275] leading-[100%] tracking-normal text-[var(--color-fg)] md:mt-5 md:pt-4">
          Frames that tell more than just a story.
        </p>
      </div>

      <div className={`mt-10 md:mt-16 ${contentShellClass}`}>
        <div className="grid items-stretch gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6 lg:gap-8">
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
                <WorkRowRenderer
                  row={row}
                  index={index}
                  onSelectImage={setSelectedImage}
                />
              </motion.div>
            ))}
          </div>
          <SideLabelMarquee flip={false} />
        </div>
      </div>

      <div id="works-sticky-stop" className="h-px w-full" aria-hidden />

      <div className="mt-10 hidden md:block md:mt-16">
        <WorksBottomImageRow
          images={bottomRowWorks}
          onSelectImage={setSelectedImage}
        />
      </div>

      <div className="mt-3 hidden md:block">
        <WorksBottomDragStrip
          bottomWorks={bottomSliderWorks}
          onSelectImage={setSelectedImage}
        />
      </div>

      <div className="mt-8 md:hidden">
        <WorksBottomImageRow
          images={mobileBottomWorks}
          onSelectImage={setSelectedImage}
        />
      </div>

      <WorksImageLightbox image={selectedImage} onClose={closeLightbox} />
    </section>
  );
}
