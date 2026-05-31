import Image from "next/image";

import { contentShellClass, sectionPaddingClass } from "@/lib/contentShell";

const items = [
  {
    id: "about-me",
    title: "About Me",
    text:
      "I was born and raised in Hanoi, Vietnam. Young as I am, I have great aspirations with arts which have motivated me to make strenuous efforts everyday.",
  },
  {
    id: "background",
    title: "My Skills",
    text: (
      <>
        I am capable of working across multiple stages of the VFX pipeline,
        including all aspects of <b className="font-extrabold">3D Environment</b> creation,{" "}
        <b className="font-extrabold">Concept Art</b>, <b className="font-extrabold">Digital Matte Painting</b>, and{" "}
        <b className="font-extrabold">Compositing</b>.
      </>
    ),
  },
];

const AVATAR_W = 279;
const AVATAR_H = 385;
const GREY_BAND_OFFSET_PX = 36;
const ABOUT_XL_SIDE_GAP_PX = 139;
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
        ["--about-xl-side-gap" as string]: `${ABOUT_XL_SIDE_GAP_PX}px`,
      }}
    >
      <div className={`bg-[var(--color-bg)] ${contentShellClass}`}>
        <div className="grid items-center justify-items-center gap-5 md:grid-cols-[279px_minmax(0,1fr)] md:items-start md:justify-items-start md:gap-x-12 md:[height:var(--avatar-row-height)] lg:gap-x-16 xl:gap-x-[var(--about-xl-side-gap)]">
          <div className="relative z-20 w-[178px] max-w-full shrink-0 justify-self-center md:w-[279px] md:justify-self-start md:[margin-bottom:calc(-1*var(--avatar-overlap))]">
            <div
              className="relative overflow-hidden rounded-[167.5px] border border-[var(--color-fg)] bg-[#d9d9d9]"
              style={{ width: "100%", aspectRatio: `${AVATAR_W} / ${AVATAR_H}` }}
            >
              <Image
                src="/images/about-avatar.png"
                alt="Chi-Linh Tran"
                fill
                sizes="(min-width: 768px) 279px, 178px"
                quality={92}
                className="object-cover scale-x-[-1]"
                priority
              />
            </div>
          </div>
          <div className="pb-3 text-center md:pb-10 md:text-left">
            <p className="font-sans text-[36px] leading-[90%] font-[250] tracking-normal text-[var(--color-muted)] md:leading-[24px]">
              I&apos;m
            </p>
            <h2 className="mt-1.5 font-display text-[42px] leading-[90%] tracking-normal text-[var(--color-fg)] md:mt-3 md:leading-[24px]">
              Chí-Linh
            </h2>
          </div>
        </div>
      </div>

      <div className="relative z-0 -mt-4 border-y border-[var(--color-fg)] bg-[#e7e7e5]">
        <div className={`py-8 md:py-0 md:[height:var(--grey-band-height)] ${contentShellClass}`}>
          <div className="grid md:h-full md:grid-cols-[279px_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16 xl:gap-x-[var(--about-xl-side-gap)]">
            <div className="hidden min-h-0 md:block" aria-hidden />
            <div className="flex flex-col gap-7 md:grid md:h-full md:grid-rows-2 md:gap-0">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`grid gap-3 md:h-full md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:grid-rows-[1fr_auto_1fr] md:gap-x-8 lg:gap-x-10 ${
                    item.id === "background" ? "md:-translate-y-18" : "md:-translate-y-4"
                  }`}
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
                  <p className="max-w-[48ch] font-sans text-[16px] font-light leading-relaxed tracking-normal text-[var(--color-fg)] md:row-start-2 md:max-w-[50ch] md:self-center">
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
