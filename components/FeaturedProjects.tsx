import { FeaturedPosterGrid } from "@/components/FeaturedPosterGrid";
import LinkCaret from "@/components/LinkCaret";
import { MonogramCL } from "@/components/MonogramCL";
import { contentShellClass } from "@/lib/contentShell";
import { getPosterItems } from "@/lib/posters";

export default async function FeaturedProjects() {
  const posters = getPosterItems();

  return (
    <section
      id="featured"
      className="overflow-hidden border-[var(--color-border)] py-20 md:py-28"
    >
      <div
        className={`grid items-stretch gap-12 md:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16 ${contentShellClass}`}
      >
        <div className="flex min-h-0 flex-col justify-between gap-10 md:min-h-full md:gap-16 md:pt-2">
          <div>
            <h2 className="font-display text-[60px] uppercase leading-[100%] tracking-normal">
              Featured
              <br />
              Projects
            </h2>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Crafted pixels. Cinematic moments.
            </p>
            <a
              href="https://www.imdb.com"
              target="_blank"
              rel="noreferrer"
              className="group font-sans mt-2 flex items-center gap-2 self-start text-[20px] font-normal uppercase leading-[100%] tracking-normal text-[var(--color-fg)] hover:underline"
            >
              <LinkCaret className="text-[var(--color-fg)] transition-transform group-hover:translate-y-px" />
              IMDb
            </a>
          </div>
          <div className="flex flex-col gap-6">
            <MonogramCL className="self-start" />

          </div>
        </div>

        <FeaturedPosterGrid posters={posters} />
      </div>

    </section>
  );
}
