import About from "@/components/About";
import Contact from "@/components/Contact";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import WorksGrid from "@/components/WorksGrid";
import {
  resolveBottomRowWorks,
  resolveBottomSliderWorks,
  resolveWorkRows,
} from "@/data/works";
import { getArtworkSrcs } from "@/lib/artworks";

export default function Home() {
  const artworkSrcs = getArtworkSrcs();

  return (
    <>
      <Nav />
      <main className="mt-10 md:mt-0 overflow-x-hidden">
        <Hero />
        <FeaturedProjects />
        <About />
        <WorksGrid
          workRows={resolveWorkRows(artworkSrcs)}
          bottomRowWorks={resolveBottomRowWorks(artworkSrcs)}
          bottomSliderWorks={resolveBottomSliderWorks(artworkSrcs)}
        />
        <Contact />
      </main>
    </>
  );
}
