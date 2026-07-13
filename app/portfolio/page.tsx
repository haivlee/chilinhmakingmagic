import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const contactEmail = "chilinh2708@gmail.com";
const contactPhone = "(+84) 904 905 047";
const phoneHref = "+84904905047";
const portfolioShellClass = "mx-auto w-full max-w-[1320px] px-5 md:px-0";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/CL.of.yesterday/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chi-linh-tran-364621139/",
  },
  { label: "Artstation", href: "https://chilinhtran.artstation.com/" },
  { label: "IMDb", href: "https://www.imdb.com/name/nm14247434/" },
];

type Breakdown = {
  title: string;
  credit: string;
  images: {
    src: string;
    alt: string;
    objectPosition?: string;
  }[];
  features: string[];
  challenges: string[];
};

const breakdowns: Breakdown[] = [
  {
    title: "Silver And The Book Of Dreams (2023)",
    credit:
      "Cyclo VFX - Concept Artist - Digital Matte Painter - Toy City Sequence",
    images: [
      {
        src: "/data/img/artworks/12.jpg",
        alt: "Toy city matte painting for Silver and the Book of Dreams.",
      },
      {
        src: "/data/img/artworks/WatchTower_CAM1_v01.jpg",
        alt: "Clockwork tower concept keyframe with warm mechanical lighting.",
        objectPosition: "center 52%",
      },
      {
        src: "/data/img/artworks/21.jpg",
        alt: "Portrait close-up against a stormy mountain backdrop.",
      },
    ],
    features: [
      "Designed a toy-like cityscape with a subtle sense of unease.",
      "Delivered city asset design packages and breakdowns for the modeling team.",
      "Developed matte painting, lighting and slapcomp as key visual concepts for sequences.",
    ],
    challenges: [
      "Built visuals across multiple camera angles while keeping composition, scale and storytelling consistent.",
      "Created a large library of hand-designed toy-inspired assets to support the environment identity.",
    ],
  },
  {
    title: "No Way Up (2023)",
    credit:
      "Cyclo VFX - Digital Matte Painter - Above Cloud, CG Enhancement",
    images: [
      {
        src: "/data/img/posters/NWU.jpg",
        alt: "No Way Up key art with submerged airplane and shark.",
        objectPosition: "center 58%",
      },
      {
        src: "/data/img/artworks/16.jpg",
        alt: "Above-cloud environment shot with a red balloon.",
      },
      {
        src: "/data/img/artworks/14.jpg",
        alt: "Large wave matte painting with a boat on the shore.",
      },
    ],
    features: [
      "Created a wide range of aerial cloudscapes and above-the-cloud environments for action sequences.",
      "Developed cloud projections to support compositing and environment integration.",
      "Enhanced CG assets through digital matte painting, adding details such as edge wear, damage, burn marks, and weathering.",
    ],
    challenges: [
      "Building cloud projections that worked reliably from different camera angles without revealing projection artifacts.",
      "Integration static matte painting into moving 3D assets while matching lighting, texture, and level of detail.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Portfolio Breakdown | Chi-Linh Tran",
  description:
    "Show reel and portfolio breakdowns for Chi-Linh Tran, VFX Artist and Digital Matte Painter.",
};

function PageHeader() {
  return (
    <header className="relative bg-white text-black">
      <Link
        href="/"
        className="absolute left-4 top-0 flex h-[58px] w-[30px] shrink-0 items-end justify-center bg-black px-1 pb-1.5 font-display text-[14px] font-[800] uppercase leading-none text-white md:left-14 md:h-[65px]"
        aria-label="Back to Chi-Linh Tran home"
      >
        CL
      </Link>

      <div className={`${portfolioShellClass} flex min-h-[70px] items-center justify-between gap-6 pl-16 md:min-h-[83px] md:pl-0`}>
        <div className="min-w-0">
          <p className="font-display text-[clamp(1.25rem,4vw,2.05rem)] uppercase leading-[0.9] tracking-normal">
            Chi-Linh Tran
          </p>
          <p className="mt-1 font-sans text-[9px] font-light uppercase leading-none tracking-normal text-[#575757] sm:text-[10px]">
            VFX Generalist - Digital Matte Painter
          </p>
        </div>

        <address className="hidden shrink-0 text-right font-sans text-[9px] font-light not-italic leading-[1.6] text-[#333333] sm:block">
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <br />
          <a href={`tel:${phoneHref}`}>{contactPhone}</a>
        </address>
      </div>
    </header>
  );
}

function ReelSection() {
  return (
    <section className="bg-white">
      <div className={`${portfolioShellClass} bg-[#fbfbfb] pt-9 pb-28 md:pt-11 md:pb-[126px]`}>
        <div className="relative aspect-video overflow-hidden rounded-md bg-black shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://player.vimeo.com/video/899392906?title=0&byline=0&portrait=0"
            title="Chi-Linh Tran show reel 2024"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function BreakdownCard({ breakdown }: { breakdown: Breakdown }) {
  return (
    <article className="border-b border-[#2f2f2f] py-14 first:pt-0 md:py-[74px]">
      <div className="grid gap-5 md:grid-cols-[532px_minmax(0,1fr)] md:gap-6">
        <div className="relative aspect-[1.97/1] overflow-hidden rounded-[15px] bg-[#111]">
          <Image
            src={breakdown.images[0].src}
            alt={breakdown.images[0].alt}
            fill
            sizes="(min-width: 1280px) 532px, (min-width: 768px) 42vw, 100vw"
            className="object-cover"
            style={{ objectPosition: breakdown.images[0].objectPosition }}
          />
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-[22px] uppercase leading-none tracking-normal md:text-[26px]">
            {breakdown.title}
          </h2>
          <p className="mt-1.5 font-sans text-[13px] font-light leading-[1.25] text-[#2f2f2f] md:text-[16px]">
            {breakdown.credit}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-5">
            {breakdown.images.slice(1).map((image) => (
              <div
                key={image.src}
                className="relative aspect-[1.96/1] overflow-hidden rounded-[15px] bg-[#111]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1280px) 372px, (min-width: 768px) 29vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: image.objectPosition }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 font-sans text-[14px] font-light leading-[1.45] text-black sm:grid-cols-2 md:grid-cols-[532px_minmax(0,1fr)] md:gap-6 md:text-[16px]">
        <section>
          <h3 className="font-sans text-[14px] font-bold leading-none md:text-[16px]">
            Features:
          </h3>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {breakdown.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="md:pl-[156px]">
          <h3 className="font-sans text-[14px] font-bold leading-none md:text-[16px]">
            Challenges:
          </h3>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {breakdown.challenges.map((challenge) => (
              <li key={challenge}>{challenge}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

function BreakdownLoop() {
  return (
    <section className="bg-white">
      <div className={portfolioShellClass}>
        {breakdowns.map((breakdown) => (
          <BreakdownCard key={breakdown.title} breakdown={breakdown} />
        ))}
      </div>
    </section>
  );
}

function InterestSection() {
  return (
    <section className="bg-white pt-4 pb-28 text-center md:pt-9 md:pb-[120px]">
      <div className={portfolioShellClass}>
        <h2 className="font-display text-[clamp(1.7rem,5vw,2.15rem)] uppercase leading-none tracking-normal">
          Interested In My Works ?
        </h2>
        <p className="mt-1 font-sans text-[11px] font-light leading-none text-[#333333]">
          Save my information for further conversation !
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="h-10 w-[200px] border border-[#696969] bg-white font-sans text-[11px] font-bold uppercase leading-none text-black transition-colors hover:bg-black hover:text-white"
          >
            Download CV
          </button>
          <button
            type="button"
            className="h-10 w-[200px] border border-[#696969] bg-white font-sans text-[11px] font-bold uppercase leading-none text-black transition-colors hover:bg-black hover:text-white"
          >
            Download Breakdown
          </button>
        </div>
      </div>
    </section>
  );
}

function PortfolioFooter() {
  return (
    <footer id="contact" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-0">
        <h2 className="font-display text-[clamp(3rem,8vw,4.6rem)] uppercase leading-none tracking-normal">
          Let&apos;s Chat !
        </h2>

        <div className="relative mt-4 h-[28px]">
          <div className="h-1 w-full bg-black" />
          <div
            className="absolute right-0 top-[12px] h-0 w-0 -rotate-90 border-b-[14px] border-l-[14px] border-b-black border-l-transparent"
            aria-hidden
          />
        </div>

        <div className="grid gap-8 pt-4 md:grid-cols-[150px_minmax(0,1fr)_300px] md:gap-8">
          <p className="font-display text-[20px] uppercase leading-none tracking-normal">
            Connect
          </p>

          <ul className="space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 font-sans text-[20px] font-bold leading-none text-[#777777] transition-colors hover:text-black"
                >
                  <span className="mt-1.5 h-0 w-0 shrink-0 border-l-[6px] border-t-[6px] border-l-transparent border-t-[#777777] transition-colors group-hover:border-t-black" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <address className="font-sans text-[10px] font-light not-italic leading-[1.7] md:justify-self-end">
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-baseline gap-2 hover:underline"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#bfbfbf]" />
              <span>
                <strong className="font-bold text-[#777777]">Email:</strong>{" "}
                {contactEmail}
              </span>
            </a>
            <a
              href={`tel:${phoneHref}`}
              className="mt-1 flex items-baseline gap-2 hover:underline"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#bfbfbf]" />
              <span>
                <strong className="font-bold text-[#777777]">Phone:</strong>{" "}
                {contactPhone}
              </span>
            </a>
          </address>
        </div>
      </div>

      <p className="mt-10 border-y border-black py-1 text-center font-sans text-[11px] font-extralight leading-none text-[#555555]">
        Chi-Linh@202x
      </p>
    </footer>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <PageHeader />

      <section className="bg-black py-3 text-white md:py-4">
        <div className={portfolioShellClass}>
          <h1 className="font-display text-[clamp(2.55rem,7vw,4.75rem)] uppercase leading-none tracking-normal">
            Portfolio Breakdown
          </h1>
        </div>
      </section>

      <ReelSection />
      <BreakdownLoop />
      <InterestSection />
      <PortfolioFooter />
    </main>
  );
}
