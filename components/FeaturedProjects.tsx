import Image from "next/image";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
  return (
    <section
      id="featured"
      className="overflow-hidden border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 md:grid-cols-[250px_minmax(0,1fr)] md:px-12">
        <div className="md:pt-20">
          <h2 className="font-display text-[clamp(3rem,5vw,5rem)] uppercase leading-[0.85] tracking-normal">
            Featured
            <br />
            Projects
          </h2>
          <p className="mt-4 max-w-52 text-sm text-[var(--color-muted)]">
            Crafted pixels. Cinematic moments.
          </p>
          <a
            href="https://www.imdb.com"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-xs font-semibold uppercase tracking-widest hover:underline"
          >
            IMDb
          </a>
        </div>

        <div>
          <div className="md:hidden">
            <ul className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-3">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="relative aspect-[2/3] w-[112px] flex-none snap-start overflow-hidden rounded-lg border border-black/10 bg-black/5"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} poster placeholder`}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden h-[600px] md:block">
            {projects.map((project) => {
              const { rotate, zIndex, ...position } = project.style;

              return (
                <article
                  key={project.id}
                  className="poster-card absolute aspect-[2/3] overflow-hidden rounded-xl border border-black/10 bg-black/5 shadow-sm transition-transform duration-300"
                  style={
                    {
                      ...position,
                      width: project.width,
                      "--poster-rotate": rotate ?? "0deg",
                      "--poster-z": zIndex ?? 1,
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} poster placeholder`}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </article>
              );
            })}
            <div className="absolute bottom-2 left-[52%] flex -translate-x-1/2 gap-3">
              <span className="h-4 w-4 rounded-full bg-[var(--color-border)]" />
              <span className="h-4 w-4 rounded-full bg-[var(--color-border)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden border-y border-[var(--color-border)] py-2 text-[0.68rem] uppercase tracking-widest text-[var(--color-muted)]">
        <div className="credit-marquee flex w-max gap-8 whitespace-nowrap">
          <span>
            Compositing - CG Generalist - Digital Matte Painting - Modeling -
            Environment - Concept Art -
          </span>
          <span>
            Compositing - CG Generalist - Digital Matte Painting - Modeling -
            Environment - Concept Art -
          </span>
        </div>
      </div>
    </section>
  );
}
