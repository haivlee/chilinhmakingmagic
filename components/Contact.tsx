"use client";

import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

import {
  contentShellClass,
  pageEdgeClass,
  sectionPaddingClass,
} from "@/lib/contentShell";

const emailAddress = "chilinh2708@gmail.com";
const phoneHref = "+84904905047";
type CopiedField = "email" | "phone" | null;

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/CL.of.yesterday/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chi-linh-tran-364621139/",
  },
  { label: "Artstation", href: "https://chilinhtran.artstation.com/" },
  { label: "IMDb", href: "https://www.imdb.com/name/nm14247434/" },
];

export default function Contact() {
  const [copiedField, setCopiedField] = useState<CopiedField>(null);

  useEffect(() => {
    if (!copiedField) {
      return;
    }

    const resetCopiedTimer = window.setTimeout(() => {
      setCopiedField(null);
    }, 1400);

    return () => {
      window.clearTimeout(resetCopiedTimer);
    };
  }, [copiedField]);

  const handleCopyClick = async (
    event: MouseEvent<HTMLAnchorElement>,
    valueToCopy: string,
    fallbackHref: string,
    field: Exclude<CopiedField, null>,
  ) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopiedField(field);
    } catch {
      window.location.href = fallbackHref;
    }
  };

  return (
    <footer id="contact" className="bg-[var(--color-bg)]">
      <div className={`${contentShellClass} ${sectionPaddingClass}`}>
        <h4 className="font-display text-[clamp(2.35rem,12vw,6rem)] font-extrabold uppercase leading-none tracking-normal">
          Let&apos;s Chat !
        </h4>

        <div className="relative mt-4 h-[22px] md:mt-7 md:h-[34px]">
          <div className="h-px w-full bg-[var(--color-fg)] md:h-1.5" />
          <div className="absolute right-0 top-[11px] h-0 w-0 -rotate-90 border-b-[10px] border-l-[10px] border-b-[var(--color-fg)] border-l-transparent md:top-[18px] md:border-b-[18px] md:border-l-[18px]" />
        </div>

        <div className="grid grid-cols-[minmax(110px,140px)_minmax(0,1fr)] gap-x-4 gap-y-8 pt-6 md:grid-cols-[180px_1fr_360px] md:gap-16 md:pt-8">
          <p className="font-display text-[34px] font-extrabold uppercase leading-none tracking-normal md:text-[32px]">
            Connect
          </p>

          <ul className="space-y-3 md:space-y-6">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 font-sans text-[18px] font-bold leading-none tracking-normal text-[#777777] transition-colors hover:text-[var(--color-fg)] md:text-[28px]"
                >
                  <span className="mt-1 h-0 w-0 border-l-[6px] border-t-[6px] border-l-transparent border-t-[#777777] transition-colors group-hover:border-t-[var(--color-fg)] md:border-l-[8px] md:border-t-[8px]" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="col-span-2 pt-1 font-sans text-[16px] leading-[1.45] tracking-normal md:col-span-1 md:justify-self-end">
            <a
              href={`mailto:${emailAddress}`}
              className="flex items-baseline gap-2 hover:underline"
              onClick={(event) =>
                handleCopyClick(event, emailAddress, `mailto:${emailAddress}`, "email")
              }
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#c8c8c8]" />
              <span>
                <strong className="font-bold text-[#777777]">Email:</strong>{" "}
                {emailAddress}
              </span>
              <span
                className={`rounded bg-black px-1.5 py-0.5 text-[12px] leading-none text-white transition-opacity ${
                  copiedField === "email" ? "opacity-100" : "opacity-0"
                }`}
                aria-live="polite"
              >
                Copied
              </span>
            </a>
            <a
              href={`tel:${phoneHref}`}
              className="mt-3 flex items-baseline gap-2 hover:underline"
              onClick={(event) =>
                handleCopyClick(event, phoneHref, `tel:${phoneHref}`, "phone")
              }
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#c8c8c8] rotate-0" />
              <span>
                <strong className="font-bold text-[#777777]">Phone:</strong>{" "}
                (+84) 904 905 047
              </span>
              <span
                className={`rounded bg-black px-1.5 py-0.5 text-[12px] leading-none text-white transition-opacity ${
                  copiedField === "phone" ? "opacity-100" : "opacity-0"
                }`}
                aria-live="polite"
              >
                Copied
              </span>
            </a>
          </div>
        </div>
      </div>
      <p
        className={`border-t border-[var(--color-fg)] py-1.5 text-center font-sans text-[18px] font-extralight leading-none tracking-normal md:py-2 md:text-[20px] ${pageEdgeClass}`}
      >
        Chi-Linh@202x
      </p>
    </footer>
  );
}
