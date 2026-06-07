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
const MOBILE_AVATAR_W = 178;
const mobileAvatarOverlapPx = Math.round(
  (MOBILE_AVATAR_W * AVATAR_H) / AVATAR_W * 0.42,
);

export default function About() {
  return (
    <section
      id="about"
      className={`overflow-x-clip border-[var(--color-border)] ${sectionPaddingClass}`}
      style={{
        ["--avatar-overlap" as string]: `${avatarOverlapPx}px`,
        ["--avatar-overlap-mobile" as string]: `${mobileAvatarOverlapPx}px`,
        ["--avatar-row-height" as string]: `${avatarRowHeightPx}px`,
        ["--grey-band-height" as string]: `${greyBandHeightPx}px`,
        ["--about-xl-side-gap" as string]: `${ABOUT_XL_SIDE_GAP_PX}px`,
      }}
    >
      <div className={`bg-[var(--color-bg)] ${contentShellClass} max-md:pb-0`}>
        <div className="grid items-center justify-items-center gap-3 max-md:grid-cols-1 md:grid-cols-[279px_minmax(0,1fr)] md:items-start md:justify-items-start md:gap-x-12 md:gap-y-5 md:[height:var(--avatar-row-height)] lg:gap-x-16 xl:gap-x-[var(--about-xl-side-gap)]">
          <div className="relative z-20 order-2 w-[178px] max-w-full shrink-0 justify-self-center max-md:-mb-[var(--avatar-overlap-mobile)] md:order-1 md:mb-0 md:w-[279px] md:justify-self-start md:[margin-bottom:calc(-1*var(--avatar-overlap))]">
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
          <div className="order-1 max-md:pt-1 max-md:pb-0 text-center md:order-2 md:pb-10 md:pt-0 md:text-left">
            <p className="font-sans text-[28px] leading-[90%] font-[250] tracking-normal text-[var(--color-muted)] md:text-[36px] md:leading-[24px]">
              I&apos;m
            </p>
            <h2 className="mt-1 font-display text-[clamp(2.5rem,11vw,2.625rem)] leading-none tracking-normal text-[var(--color-fg)] md:text-[42px]">
              Chí-Linh
            </h2>
          </div>
        </div>
      </div>

      <div className="relative z-0 border-y border-[var(--color-fg)] bg-[#e7e7e5] md:-mt-4">
        <div
          className={`max-md:pt-[calc(var(--avatar-overlap-mobile)+0.75rem)] py-8 md:min-h-[var(--grey-band-height)] md:py-10 xl:py-12 ${contentShellClass}`}
        >
          <div className="grid md:grid-cols-[279px_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16 xl:h-full xl:gap-x-[var(--about-xl-side-gap)]">
            <div className="hidden min-h-0 md:block" aria-hidden />
            <div className="flex min-w-0 flex-col gap-8 md:gap-10 xl:grid xl:h-full xl:grid-rows-2 xl:gap-y-10">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex min-w-0 flex-col gap-3 max-md:items-start md:gap-4 xl:grid xl:grid-cols-[minmax(0,240px)_minmax(0,1fr)] xl:items-end xl:gap-x-12"
                >
                  <h3 className="flex items-center gap-3 font-display text-xl uppercase leading-[100%] tracking-normal text-[var(--color-fg)] xl:text-[28px]">
                    <span
                      className="h-3 w-3 shrink-0 self-center rounded-full bg-[#bfbfbd]"
                      aria-hidden
                    />
                    <span
                      className={
                        item.id === "background" ? "xl:whitespace-nowrap" : ""
                      }
                    >
                      {item.title}
                    </span>
                  </h3>
                  <p className="min-w-0 w-full font-sans text-[16px] font-light leading-relaxed tracking-normal text-[var(--color-fg)] xl:col-start-2 xl:self-center">
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
