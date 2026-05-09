"use client";

import { motion, useReducedMotion } from "framer-motion";

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
      className="relative flex min-h-screen flex-col justify-center border-b border-[var(--color-fg)] pt-24"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-6 pb-12 pt-16 md:px-16">
        <div className="mb-8 md:mb-10">
          {roles.map((role, index) => (
            <motion.p
              key={role}
              variants={fromLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, delay: 0.18 * index }}
              className="text-[clamp(1.45rem,3vw,2.4rem)] font-light uppercase leading-[1.2] text-[var(--color-muted)]"
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
        className="border-y border-[var(--color-fg)] bg-[#e7e7e5]"
      >
        <div className="mx-auto max-w-[1320px] px-6 py-4 md:px-16">
          <h1 className="font-display text-[clamp(3.8rem,10.4vw,10rem)] uppercase leading-[0.86] tracking-normal">
            CHI-LINH (KRÏST) TRAN
          </h1>
        </div>
      </motion.div>

      <div className="mx-auto grid w-full max-w-[1320px] flex-1 grid-cols-2 px-6 py-8 text-[0.72rem] uppercase tracking-widest text-[var(--color-fg)] md:grid-cols-3 md:px-16">
        <div className="self-start">C&nbsp;&nbsp;&mdash;&nbsp;&nbsp;L</div>
        <div className="hidden self-end justify-self-center md:block">Scroll</div>
        <div className="justify-self-end text-right leading-7">
          <a
            className="block bg-[var(--color-fg)] px-2 text-[var(--color-bg)]"
            href="https://www.artstation.com"
            target="_blank"
            rel="noreferrer"
          >
            Artstation
          </a>
          <a className="block hover:underline" href="#featured">
            Portfolio
          </a>
          <a
            className="block hover:underline"
            href="https://www.imdb.com"
            target="_blank"
            rel="noreferrer"
          >
            IMDb
          </a>
        </div>
      </div>
    </section>
  );
}
