import About from "@/components/About";
import Contact from "@/components/Contact";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import WorksGrid from "@/components/WorksGrid";
import { resolveBottomWorks, resolveWorkRows } from "@/data/works";
import { getArtworkSrcs } from "@/lib/artworks";

export default function Home() {
  const artworkSrcs = getArtworkSrcs();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedProjects />
        <About />
        <WorksGrid
          workRows={resolveWorkRows(artworkSrcs)}
          bottomWorks={resolveBottomWorks(artworkSrcs)}
        />
        <Contact />
      </main>
    </>
  );
}
