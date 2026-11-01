import Image from "next/image";

const AVATAR_W = 279;
const AVATAR_H = 385;

function Avatar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[167.5px] border border-[var(--color-fg)] bg-[#d9d9d9] ${className}`}
      style={{ aspectRatio: `${AVATAR_W} / ${AVATAR_H}` }}
    >
      <Image
        src="/images/about-avatar.png"
        alt="Chi-Linh Tran"
        fill
        sizes="(min-width: 768px) 279px, 190px"
        quality={92}
        className="object-cover scale-x-[-1]"
        priority
      />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-x-clip pt-[209px] md:pt-[84px]">
      <div className="absolute left-1/2 top-[60px] z-10 -translate-x-1/2 md:hidden">
        <Avatar className="w-[200px]" />
      </div>
      <div className="border-y border-[var(--color-fg)] bg-[#e7e7e5]">
        <div className="mx-auto grid min-h-[340px] w-full max-w-[1500px] px-7 md:grid-cols-[279px_minmax(0,1fr)] md:gap-x-[clamp(72px,10vw,120px)] md:px-[clamp(48px,5vw,100px)] md:py-0">
          <div className="hidden md:relative md:block">
            <Avatar className="md:absolute md:bottom-[70px] md:left-0 md:w-[279px]" />
          </div>

          <div className="flex min-w-0 flex-col justify-center pt-[166px] pb-11 text-left md:py-10">
            <h2 className="font-display text-[clamp(2rem,4vw,2.125rem)] leading-none tracking-normal text-[var(--color-fg)]">
              i&apos;m Chí–Linh
            </h2>
            <div className="mt-6 space-y-5 font-sans text-[16px] font-light leading-[1.45] tracking-normal text-[var(--color-fg)]">
              <p>
                I’m an Environment Generalist from Hanoi, Vietnam, 
                with 8 years in the film and commercial industry. 
                I began as a Compositor and Digital Matte Painter, 
                and that foundation still shapes how I work: 
                I build environments with the final frame in mind.
              </p>
              <p>
                Today I cover the full environment pipeline: concept art, 3D environment creation, digital matte painting and compositing. I care about clear storytelling, believable detail and clean, efficient handoffs to the team.
              </p>
            </div>
            <a
              href="/Chi-Linh_Portfolio_2025.pdf"
              download
              className="mx-auto mt-6 flex h-[50px] w-[210px] items-center justify-center border border-[#313131] bg-transparent font-sans text-[15px] font-bold uppercase leading-none text-[var(--color-fg)] transition-colors hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] md:mx-0 md:h-[46px] md:w-[190px]"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
