import Image from "next/image";

import { contentShellClass, sectionPaddingClass } from "@/lib/contentShell";

const items = [
  {
    id: "about-me",
    title: "About Me",
    text: "I was born and raised in Hanoi, Vietnam.  Young as I am, I have great aspirations with arts which have motivated me to make strenuous efforts everyday.",
  },
  {
    id: "background",
    title: "My Background",
    text: "I started as a graphic designer, besides I also known as a caricature artist for a local newspaper. The more I work, the more I get.  I jumped into Visual effects in 2018, and ever since I learned and grown with making digital magic.",
  },
];

const AVATAR_W = 279;
const AVATAR_H = 385;
const GREY_BAND_OFFSET_PX = 36;
const avatarRowHeightPx = Math.round(AVATAR_H / 3);
const avatarOverlapPx = AVATAR_H - avatarRowHeightPx;
const greyBandHeightPx = avatarOverlapPx + GREY_BAND_OFFSET_PX;

export default function About() {
  return (
    <section
      id="about"
      className={`overflow-x-clip border-[var(--color-border)] ${sectionPaddingClass}`}
      style={{
        ["--avatar-overlap" as string]: `${avatarOverlapPx}px`,
        ["--avatar-row-height" as string]: `${avatarRowHeightPx}px`,
        ["--grey-band-height" as string]: `${greyBandHeightPx}px`,
      }}
    >
      <div className={`bg-[var(--color-bg)] ${contentShellClass}`}>
        <div className="grid items-start justify-items-start gap-10 md:grid-cols-[279px_minmax(0,1fr)] md:gap-x-12 md:[height:var(--avatar-row-height)] lg:gap-x-16">
          <div className="relative z-20 w-[279px] max-w-full shrink-0 justify-self-start md:[margin-bottom:calc(-1*var(--avatar-overlap))]">
            <div
              className="relative overflow-hidden rounded-[167.5px] border border-[var(--color-fg)] bg-[#d9d9d9]"
              style={{ width: AVATAR_W, height: AVATAR_H }}
            >
              <Image
                src="/images/about-avatar.png"
                alt="Chi-Linh Tran"
                fill
                sizes={`${AVATAR_W}px`}
                quality={92}
                className="object-cover scale-x-[-1]"
                priority
              />
            </div>
          </div>
          <div className="pb-4 text-center md:pb-10 md:text-left">
            <p className="font-sans text-[36px] leading-[24px] font-[250] tracking-normal text-[var(--color-muted)]">
              I&apos;m
            </p>
            <h2 className="mt-3 font-display text-[42px] leading-[24px] tracking-normal text-[var(--color-fg)]">
              Chí-Linh
            </h2>
          </div>
        </div>
      </div>

      <div className="relative z-0 -mt-4 border-y border-[var(--color-fg)] bg-[#e7e7e5]">
        <div className={`py-10 md:py-0 md:[height:var(--grey-band-height)] ${contentShellClass}`}>
          <div className="grid md:h-full md:grid-cols-[279px_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16">
            <div className="hidden min-h-0 md:block" aria-hidden />
            <div className="flex flex-col gap-5 md:grid md:h-full md:grid-rows-2 md:gap-0">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-3 md:h-full md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:grid-rows-[1fr_auto_1fr] md:gap-x-8 lg:gap-x-10"
                >
                  <h3 className="flex items-end gap-3 font-display text-2xl uppercase leading-[100%] tracking-normal text-[var(--color-fg)] md:row-start-2 md:self-end md:text-[28px]">
                    <span
                      className="h-3 w-3 shrink-0 self-center rounded-full bg-[#bfbfbd]"
                      aria-hidden
                    />
                    <span
                      className={
                        item.id === "background" ? "md:whitespace-nowrap" : ""
                      }
                    >
                      {item.title}
                    </span>
                  </h3>
                  <p className="font-sans text-[16px] font-light leading-relaxed tracking-normal text-[var(--color-fg)] md:row-start-2 md:self-center">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
