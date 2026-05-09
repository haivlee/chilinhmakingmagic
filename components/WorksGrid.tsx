"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  bottomWorks,
  type WorkImage,
  workRows,
  type WorkRow,
} from "@/data/works";

const sideLabel =
  "Environment - CG Generalist - Compositing - Modeling - Digital Matte Painting - Concept Art";

function WorkTile({
  image,
  priority = false,
}: {
  image: WorkImage;
  priority?: boolean;
}) {
  return (
    <figure className="group relative aspect-video overflow-hidden rounded-lg border border-black/10 bg-black/5">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </figure>
  );
}

function CaptionRow({ text }: { text: string }) {
  return (
    <div className="grid items-center gap-5 py-3 text-center text-sm leading-6 md:grid-cols-[1fr_minmax(260px,560px)_1fr]">
      <span className="hidden h-px bg-[var(--color-border)] md:block" />
      <p>{text}</p>
      <span className="hidden h-px bg-[var(--color-border)] md:block" />
    </div>
  );
}

function WorkRowRenderer({ row, index }: { row: WorkRow; index: number }) {
  if (row.type === "caption") {
    return <CaptionRow text={row.text} />;
  }

  if (row.type === "full") {
    return <WorkTile image={row.image} priority={index < 2} />;
  }

  if (row.type === "half") {
    return (
      <div className="grid gap-2 md:grid-cols-2">
        {row.images.map((image) => (
          <WorkTile key={image.src} image={image} priority={index < 2} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:grid-cols-3">
      {row.images.map((image) => (
        <WorkTile key={image.src} image={image} />
      ))}
    </div>
  );
}

export default function WorksGrid() {
  const reduce = useReducedMotion();

  return (
    <section id="works" className="overflow-hidden pb-20 pt-10 md:pb-28">
      <div className="border-y border-[var(--color-border)] py-10 text-center">
        <h2 className="font-display text-[clamp(4rem,8vw,8rem)] uppercase leading-[0.85] tracking-normal">
          My Works
        </h2>
        <p className="mt-5 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-muted)]">
          Frames that tell more than just a story.
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-[1180px] px-6 md:px-20">
        <div className="pointer-events-none absolute left-2 top-0 hidden h-full md:block">
          <div className="sticky top-24 [writing-mode:vertical-rl] rotate-180 text-[0.68rem] uppercase tracking-widest text-[var(--color-muted)]">
            {sideLabel}
          </div>
        </div>
        <div className="pointer-events-none absolute right-2 top-0 hidden h-full md:block">
          <div className="sticky top-24 [writing-mode:vertical-rl] text-[0.68rem] uppercase tracking-widest text-[var(--color-muted)]">
            {sideLabel}
          </div>
        </div>

        <div className="space-y-2">
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
      </div>

      <div className="mt-16 grid grid-cols-2 gap-2 px-4 md:grid-cols-4 lg:grid-cols-8">
        {bottomWorks.map((image) => (
          <WorkTile key={image.src} image={image} />
        ))}
      </div>
    </section>
  );
}
