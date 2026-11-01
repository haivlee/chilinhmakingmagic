import { FeaturedPosterGrid } from "@/components/FeaturedPosterGrid";
import LinkCaret from "@/components/LinkCaret";
import { contentShellClass, sectionPaddingClass } from "@/lib/contentShell";
import { getPosterItems } from "@/lib/posters";

export default async function FeaturedProjects() {
  const posters = getPosterItems();

  return (
    <section
      id="featured"
      className={`overflow-hidden border-[var(--color-border)] ${sectionPaddingClass}`}
    >
      <div
        className={`grid items-stretch gap-8 xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] xl:gap-x-12 2xl:gap-x-16 ${contentShellClass}`}
      >
        <div className="min-h-0 md:pt-2">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,13vw,3.75rem)] uppercase leading-[92%] tracking-normal md:text-[60px] md:leading-[100%]">
              Featured
              <br />
              Projects
            </h2>
            <p className="mt-2 whitespace-nowrap font-sans font-extralight font-[275] text-[20px] text-black md:text-[18px]">
              Crafted pixels. Cinematic moments.
            </p>
            <a
              href="https://www.imdb.com/name/nm14247434/"
              target="_blank"
              rel="noreferrer"
              className="group mt-1.5 flex items-center gap-2 self-start font-sans text-[20px] font-normal uppercase leading-[100%] tracking-normal text-[var(--color-fg)] md:mt-2"
            >
              <span className="inline-flex items-center gap-2 px-1.5 py-0.5 transition-colors group-hover:bg-[var(--color-fg)] group-hover:text-[var(--color-bg)] group-focus-visible:bg-[var(--color-fg)] group-focus-visible:text-[var(--color-bg)]">
                <LinkCaret className="origin-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-px group-hover:rotate-45 group-focus-visible:translate-y-px group-focus-visible:rotate-45 motion-reduce:transition-none" />
                IMDb
              </span>
            </a>

            <div className="mt-20 hidden space-y-7 font-sans text-[16px] font-light leading-[1.3] tracking-normal text-[#444] xl:block">
              <div>
                <p className="font-medium text-black">CG Generalist | Sparta VFX</p>
                <p>Compositing, 3D Modeling and Lookdev, Environment</p>
                <p>Vietnam, Apr 2018 - May 2021</p>
              </div>
              <div>
                <p className="font-medium text-black">CG Generalist | Cyclo VFX</p>
                <p>Digital Matte Painting, 3D Environment</p>
                <p>Vietnam, June 2021 - now</p>
              </div>
            </div>
          </div>
        </div>

        <FeaturedPosterGrid posters={posters} />
      </div>

    </section>
  );
}
