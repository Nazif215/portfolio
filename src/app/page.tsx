import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Photogrammetry } from "@/components/sections/Photogrammetry";
import { MyJourney } from "@/components/sections/MyJourney";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Photogrammetry />
      <MyJourney />
      <Contact />
    </main>
  );
}
