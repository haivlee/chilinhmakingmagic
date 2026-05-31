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
        className={`grid items-stretch gap-8 md:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16 ${contentShellClass}`}
      >
        <div className="min-h-0 md:pt-2">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,13vw,3.75rem)] uppercase leading-[92%] tracking-normal md:text-[60px] md:leading-[100%]">
              Featured
              <br />
              Projects
            </h2>
            <p className="mt-2 whitespace-nowrap font-sans font-extralight font-[275] text-sm text-black md:text-[18px]">
              Crafted pixels. Cinematic moments.
            </p>
            <a
              href="https://www.imdb.com/name/nm14247434/"
              target="_blank"
              rel="noreferrer"
              className="group font-sans mt-1.5 flex items-center gap-2 self-start text-[20px] font-normal uppercase leading-[100%] tracking-normal text-[var(--color-fg)] hover:underline md:mt-2"
            >
              <LinkCaret className="text-[var(--color-fg)] transition-transform group-hover:translate-y-px" />
              IMDb
            </a>
          </div>
        </div>

        <FeaturedPosterGrid posters={posters} />
      </div>

    </section>
  );
}
