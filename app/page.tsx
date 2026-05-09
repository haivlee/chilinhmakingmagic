import About from "@/components/About";
import Contact from "@/components/Contact";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import WorksGrid from "@/components/WorksGrid";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedProjects />
        <About />
        <WorksGrid />
        <Contact />
      </main>
    </>
  );
}
