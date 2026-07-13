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
                I was born and raised in Hanoi, Vietnam. Young as I am, I have
                great aspirations with arts which have motivated me to make
                strenuous efforts everyday.
              </p>
              <p>
                I am capable of working across multiple stages of the VFX
                pipeline, including all aspects of <b className="font-extrabold">3D Environment</b>{" "}
                creation, <b className="font-extrabold">Concept Art</b>,{" "}
                <b className="font-extrabold">Digital Matte Painting</b>, and{" "}
                <b className="font-extrabold">Compositing</b>.
              </p>
            </div>
            <button
              type="button"
              className="mx-auto mt-6 h-[50px] w-[210px] border border-[#313131] bg-transparent font-sans text-[15px] font-bold uppercase leading-none text-[var(--color-fg)] transition-colors hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] md:mx-0 md:h-[46px] md:w-[190px]"
            >
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
