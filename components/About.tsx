"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const items = [
  {
    id: "about",
    title: "About Me",
    text: "I was born and raised in Hanoi, Vietnam. Young as I am, I have great aspirations with arts which have motivated me to make strenuous efforts everyday.",
  },
  {
    id: "background",
    title: "My Background",
    text: "I started as a graphic designer and caricature artist for a local newspaper. The more I work, the more I get immersed into visual effects, ever since I learned and grown with making digital magic.",
  },
];

export default function About() {
  const [open, setOpen] = useState("about");
  const reduce = useReducedMotion();

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6 md:px-12">
        <div className="mb-8 grid items-end gap-6 md:grid-cols-[360px_1fr]">
          <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full border border-[var(--color-fg)] bg-[#d9d9d9] md:mx-0 md:w-72">
            <Image
              src="https://i.pravatar.cc/420?img=12"
              alt="Chi-Linh Tran portrait placeholder"
              fill
              sizes="(min-width: 768px) 288px, 224px"
              className="object-cover"
            />
          </div>
          <div className="pb-4 text-center md:text-left">
            <p className="text-xl font-light text-[var(--color-muted)]">
              I&apos;m
            </p>
            <h2 className="font-display text-5xl uppercase leading-none tracking-normal">
              Chi-Linh
            </h2>
          </div>
        </div>
      </div>

      <div className="border-y border-[var(--color-fg)] bg-[#e2e2e0]">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-12 md:grid-cols-[360px_1fr] md:px-12">
          <div className="hidden md:block" />
          <div className="grid gap-5 md:grid-cols-[270px_1fr] md:gap-12">
            <div className="space-y-4">
              {items.map((item) => {
                const isOpen = open === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setOpen(isOpen ? "" : item.id)}
                    className="flex w-full items-center gap-3 text-left font-display text-3xl uppercase leading-none tracking-normal"
                    aria-expanded={isOpen}
                  >
                    <motion.span
                      animate={{ rotate: isOpen && !reduce ? 90 : 0 }}
                      className="h-4 w-4 rounded-full bg-[#bfbfbd]"
                    />
                    {item.title}
                  </button>
                );
              })}
            </div>

            <div className="min-h-36 text-sm leading-7 md:text-base">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={open === item.id ? "block" : "hidden"}
                >
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
