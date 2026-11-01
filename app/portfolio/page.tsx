import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Contact from "@/components/Contact";
import ReelSection from "@/components/ReelSection";
const contactEmail = "chilinh2708@gmail.com";
const contactPhone = "(+84) 904 905 047";
const phoneHref = "+84904905047";
const portfolioShellClass =
  "mx-auto w-full max-w-[1500px] px-3 min-[360px]:px-4 md:px-[clamp(64px,8vw,100px)]";

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
        src: "/data/img/portfolio/1a.webp",
        alt: "Toy city matte painting for Silver and the Book of Dreams.",
      },
      {
        src: "/data/img/portfolio/1b.webp",
        alt: "Clockwork tower concept keyframe with warm mechanical lighting.",
        objectPosition: "center 52%",
      },
      {
        src: "/data/img/portfolio/1c.webp",
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
    title: "Silver and the book of dreams (2023)",
    credit:
      "Cyclo VFX - Concept Artist - Digital Matte Painter - Bending Sea Sequence",
    images: [
      {
        src: "/data/img/portfolio/2a.webp",
        alt: "Toy city matte painting for Silver and the Book of Dreams.",
      },
      {
        src: "/data/img/portfolio/2b.webp",
        alt: "Clockwork tower concept keyframe with warm mechanical lighting.",
        objectPosition: "center 52%",
      },
      {
        src: "/data/img/portfolio/2c.webp",
        alt: "Portrait close-up against a stormy mountain backdrop.",
      },
    ],
    features: [
      "Designed an horizon-bending sea to emphasize scale and visual immersion.",
      "Created beach extension to seamlessly expand the environment.",
      "Developed sky matte painting to define the sky’s bending cloud.",
    ],
    challenges: [
      "Defining depth and scale was challenging due to the lack of environmental reference objects.",
      "Blending the curved horizon seamlessly into the sky across multiple camera angles required significant shot-by-shot refinement.",
      "The curved cloud formations further complicated the creation of a convincing horizon line.",
    ],
  },
  {
    title: "Goodbye Earth (2024)",
    credit:
      "Cyclo VFX - Concept Artist - Digital Matte Painter - Meteor Sequence",
    images: [
      {
        src: "/data/img/portfolio/3a.webp",
        alt: "Goodbye Earth key art with meteor impact.",
      },
      {
        src: "/data/img/portfolio/3b.webp",
        alt: "Meteor sequence concept keyframe with dramatic lighting.",
        objectPosition: "center 52%",
      },
      {
        src: "/data/img/portfolio/3c.webp",
        alt: "Wide shot of the meteor impact on the city.",
      },
    ],
    features: [
      "Created matte paintings for the distant landscape, mountain ranges, and sky.",
      "Produced composited key visuals to define the final look, mood, and atmosphere of the sequence.",
    ],
    challenges: [
      "Seamlessly integrating matte-painted environments with CG elements.",
      "Integrated meteor light interactions across the sky and cloud layers to create realistic atmospheric illumination and reinforce the sequence's visual storytelling.",
    ],
  },
  {
    title: "Helgoland 513 (2024)",
    credit:
      "Cyclo VFX - Digital Matte Painter - Post-apocalyptic Hamburg",
    images: [
      {
        src: "/data/img/portfolio/4a.webp",
        alt: "Helgoland 513 key art with meteor impact.",
      },
      {
        src: "/data/img/portfolio/4b.webp",
        alt: "Meteor sequence concept keyframe with dramatic lighting.",
        objectPosition: "center 52%",
      },
      {
        src: "/data/img/portfolio/4c.webp",
        alt: "Wide shot of the meteor impact on the city.",
      },
    ],
    features: [
      "Created matte-painted environments featuring damaged buildings, overgrown vegetation, and abandoned streets to convey a sense of decay, abandonment, and post-apocalyptic storytelling.",
    ],
    challenges: [
      "Creating believable environmental storytelling through architecture, decay, and vegetation.",
      "Maintaining consistency of destruction and aging across the environment.",
      "Creating parallaxed vines with convincing depth while ensuring they conformed naturally to the building's surfaces, edges, and architectural corners.",
    ],
  },
  {
    title: "Turbulence (2025)",
    credit:
      "Cyclo VFX - Concept Artist - Digital Matte Painter - Cloudscape",
    images: [
      {
        src: "/data/img/portfolio/5a.webp",
        alt: "Turbulence key art with dramatic cloudscape.",
      },
      {
        src: "/data/img/portfolio/5b.webp",
        alt: "Concept keyframe of turbulent clouds with dynamic lighting.",
        objectPosition: "center 52%",
      },
      {
        src: "/data/img/portfolio/5c.webp",
        alt: "Wide shot of the turbulent cloudscape.",
      },
    ],
    features: [
      "Created aerial cloud matte paintings to establish the large-scale atmosphere and visual mood of the sequence.",
      "Developed parallax cloud layers that could be reused across multiple shots, improving shot continuity and production efficiency.",
      "Produced multiple cloud formations and weather stages to support different compositions, camera angles, and storytelling requirements throughout the sequence.",
    ],
    challenges: [
      "Achieving convincing depth and scale in vast cloud environments with limited spatial reference points.",
      "Creating reusable parallax cloud systems that remained flexible across multiple shots while maintaining realism and continuity.",
      "Preserving detail and image quality in both wide aerial shots and closer camera views.",
    ],
  },
  {
    title: "Em va trinh (2022)",
    credit:
      "Freelance Digital Matte Painter - Historic Scenes",
    images: [
      {
        src: "/data/img/portfolio/6a.webp",
        alt: "Em va trinh key art with historic Vietnamese setting.",
        objectPosition: "center 58%",
      },
      {
        src: "/data/img/portfolio/6b.webp",
        alt: "Above-cloud environment shot with a red balloon.",
      },
      {
        src: "/data/img/portfolio/6c.webp",
        alt: "Large wave matte painting with a boat on the shore.",
      },
    ],
    features: [
      "Recreated historic Vietnamese locations through a combination of 3D environment work and digital matte painting.",
      "Integrated 3D matte painting techniques with 2D matte painting to achieve a seamless and photorealistic final environment.",
      "Produced set extensions to expand the practical set and enhance the scale, scope, and historical authenticity of the scene.",
    ],
    challenges: [
      "Researching and accurately recreating historical Vietnamese architecture, materials, and environmental details with limited visual references.",
      "Maintaining historical authenticity while adapting environments to meet cinematic composition and storytelling requirements.",
      "Matching weathering, aging, and architectural details across multiple sources and techniques.",
    ],
  },
  {
    title: "Day Dreamers (2023)",
    credit:
      "Cyclo VFX - Concept Artist - Digital Matte Painter - Night City",
    images: [
      {
        src: "/data/img/portfolio/7a.webp",
        alt: "Day Dreamers key art with night cityscape.",
        objectPosition: "center 58%",
      },
      {
        src: "/data/img/portfolio/7b.webp",
        alt: "Above-cloud environment shot with a red balloon.",
      },
        {
          src: "/data/img/portfolio/7c.webp",
          alt: "Large wave matte painting with a boat on the shore.",
        },
    ],
    features: [
      "Built a full 3D night city for matte painting and set extension work.",
      "Created matte paintings for the distant skyline, atmospheric city layers, and fantasy moon.",
      "Produced DMP enhancements across multiple sequences throughout the film.",
      "Developed key visuals for various set extension shots.",
    ],
    challenges: [
      "Matching 3D environments with matte-painted extensions.",
      "Created designs that supported and reinforced the project's storytelling.",
      "Keeping visual consistency across multiple sequences and camera angles.",
    ],
  },
  {
    title: "No Way Up (2023)",
    credit:
      "Cyclo VFX - Digital Matte Painter - Above Cloud, CG Enhancement",
    images: [
      {
        src: "/data/img/portfolio/8a.webp",
        alt: "No Way Up key art with submerged airplane and shark.",
        objectPosition: "center 58%",
      },
      {
        src: "/data/img/portfolio/8b.webp",
        alt: "Above-cloud environment shot with a red balloon.",
      },
      {
        src: "/data/img/portfolio/8c.webp",
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
  title: "Showreel Breakdown | Chi-Linh Tran",
  description:
    "Showreel and project breakdowns for Chi-Linh Tran, VFX Artist and Digital Matte Painter.",
};

function PageHeader() {
  return (
    <header className="relative border-t-2 border-black bg-white text-black">
      <Link
        href="/"
        className="absolute left-4 top-0 flex h-[93px] w-fit min-w-[40px] shrink-0 items-end justify-center bg-black px-1.5 pb-1.5 font-display text-[28px] font-ultrabold font-[800] uppercase leading-none tracking-normal text-white md:left-[clamp(24px,5vw,100px)] md:min-w-[33px] md:px-2 md:pb-2 md:text-[24px]"
        aria-label="Back to Chi-Linh Tran home"
      >
        CL
      </Link>

      <div className={`${portfolioShellClass} flex min-h-[96px] items-start justify-between gap-6 md:min-h-[118px] md:items-center`}>
        <div className="min-w-0 flex-1 pl-[42px] pt-[21px] text-center md:flex-none md:pl-[56px] md:pt-0 md:text-left min-[1560px]:!pl-0">
          <p className="max-w-full whitespace-normal font-display text-[clamp(1.25rem,8vw,2rem)] uppercase leading-[0.9] tracking-normal min-[360px]:whitespace-nowrap min-[360px]:text-[clamp(26px,8vw,32px)] md:text-[clamp(2rem,7vw,2.75rem)]">
            Chi-Linh Tran
          </p>
          <p className="mt-0.5 max-w-full whitespace-normal font-sans text-[clamp(0.5rem,3.35vw,0.75rem)] font-normal uppercase leading-none tracking-normal text-[#777777] min-[360px]:whitespace-nowrap min-[360px]:text-[clamp(10px,2.8vw,12px)] md:mt-1 md:text-[20px]">
            VFX Generalist - Digital Matte Painter
          </p>
        </div>

        <address className="ml-auto hidden shrink-0 text-right font-sans text-[16px] font-normal not-italic leading-[1.8] text-[#333333] md:block">
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <br />
          <a href={`tel:${phoneHref}`}>{contactPhone}</a>
        </address>
      </div>
    </header>
  );
}

function BreakdownCard({ breakdown }: { breakdown: Breakdown }) {
  return (
    <article className="border-b border-[#2f2f2f] py-14 first:pt-0 last:border-b-0 md:py-[74px]">
      <div className="md:hidden">
        <h2 className="font-display text-[20px] leading-none tracking-normal min-[360px]:text-[22px]">
          {breakdown.title}
        </h2>
        <p className="mt-1.5 font-sans text-[12px] font-light leading-[1.25] text-[#2f2f2f] min-[360px]:text-[13px]">
          {breakdown.credit}
        </p>

        <div className="mt-5 space-y-3">
          {breakdown.images.slice(0, 2).map((image) => (
            <div
              key={image.src}
              className="relative aspect-[1.96/1] overflow-hidden rounded-[15px] bg-[#111]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: image.objectPosition }}
              />
            </div>
          ))}
        </div>

        <section className="mt-5 font-sans text-[14px] font-normal leading-[1.5] text-black">
          <h3 className="pl-4 font-sans text-[14px] font-bold leading-none">
            Features:
          </h3>
          <ul className="mt-1 list-disc space-y-1 pl-4">
            {breakdown.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        {breakdown.images[2] && (
          <div className="relative mt-5 aspect-[1.96/1] overflow-hidden rounded-[15px] bg-[#111]">
            <Image
              src={breakdown.images[2].src}
              alt={breakdown.images[2].alt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: breakdown.images[2].objectPosition }}
            />
          </div>
        )}

        <section className="mt-5 font-sans text-[14px] font-normal leading-[1.5] text-black">
          <h3 className="pl-4 font-sans text-[14px] font-bold leading-none">
            Challenges:
          </h3>
          <ul className="mt-1 list-disc space-y-1 pl-4">
            {breakdown.challenges.map((challenge) => (
              <li key={challenge}>{challenge}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="hidden md:block">
        <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] xl:gap-6 xl:grid-cols-[532px_minmax(0,1fr)]">
          <div className="relative aspect-[1.97/1] overflow-hidden rounded-[15px] bg-[#111]">
            <Image
              src={breakdown.images[0].src}
              alt={breakdown.images[0].alt}
              fill
              sizes="(min-width: 1280px) 532px, (min-width: 768px) 46vw, 100vw"
              className="object-cover"
              style={{ objectPosition: breakdown.images[0].objectPosition }}
            />
          </div>

          <div className="flex h-full min-w-0 flex-col">
            <h2 className="font-display text-[22px] leading-none tracking-normal md:text-[26px]">
              {breakdown.title}
            </h2>
            <p className="mt-1.5 font-sans text-[13px] font-light leading-[1.25] text-[#2f2f2f] md:text-[16px]">
              {breakdown.credit}
            </p>

            <div className="mt-auto grid grid-cols-2 gap-5">
              {breakdown.images.slice(1).map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[1.96/1] overflow-hidden rounded-[15px] bg-[#111]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 372px, (min-width: 768px) 26vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: image.objectPosition }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 font-sans text-[16px] font-normal leading-[1.5] text-black md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] xl:gap-6 xl:grid-cols-[532px_minmax(0,1fr)]">
          <section className="xl:w-[664px]">
            <h3 className="pl-4 font-sans text-[16px] font-bold leading-none">
              Features:
            </h3>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              {breakdown.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="xl:pl-[132px]">
            <h3 className="pl-4 font-sans text-[16px] font-bold leading-none">
              Challenges:
            </h3>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              {breakdown.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </section>
        </div>
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
    <section className="bg-white pt-12 pb-12 text-center min-[360px]:pt-16 min-[360px]:pb-16 md:pt-20 md:pb-[70px]">
      <div className={portfolioShellClass}>
        <h2 className="font-display text-[clamp(1.65rem,9vw,2.5rem)] uppercase leading-none tracking-normal">
          Interested In My Works ?
        </h2>
        <p className="mt-1 font-sans text-[15px] font-normal leading-none text-[#333333] min-[360px]:text-[16px]">
          Save my information for further conversation !
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 min-[360px]:gap-6 sm:flex-row">
          <a
            href="/Chi-Linh_Portfolio_2025.pdf"
            download
            className="flex h-[52px] w-full max-w-[280px] items-center justify-center border border-[#111] bg-white font-sans text-[16px] font-bold uppercase leading-none text-black transition-colors hover:bg-black hover:text-white min-[360px]:h-[57px]"
          >
            Download CV
          </a>
          <a
            href="/Chi-Linh_Portfolio_2025.pdf"
            download
            className="flex h-[52px] w-full max-w-[280px] items-center justify-center border border-[#111] bg-white font-sans text-[16px] font-bold uppercase leading-none text-black transition-colors hover:bg-black hover:text-white min-[360px]:h-[57px]"
          >
            Download Breakdown
          </a>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <PageHeader />

      <section className="bg-black py-2 text-white md:py-3">
        <div className={`${portfolioShellClass} [container-type:inline-size]`}>
          <h1 className="w-full whitespace-nowrap font-display text-[7.54cqw] uppercase leading-none tracking-normal">
            Portfolio Breakdown
          </h1>
        </div>
      </section>

      <section className="bg-white md:pt-14">
        <div className={`${portfolioShellClass} pt-7 pb-16 min-[360px]:pt-9 min-[360px]:pb-28 md:pt-[50px] md:pb-[126px]`}>
          <ReelSection />
        </div>
      </section>
      <BreakdownLoop />
      <InterestSection />
      <Contact />
    </main>
  );
}
