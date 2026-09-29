import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/effects/Preloader";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Hero } from "@/components/sections/Hero";
import { PipelineDivider, TechMarquee } from "@/components/sections/TechMarquee";
import { Domain } from "@/components/sections/Domain";
import { Components } from "@/components/sections/Components";
import { Architecture } from "@/components/sections/Architecture";
import { Metrics } from "@/components/sections/Metrics";
import { Milestones } from "@/components/sections/Milestones";
import { Downloads } from "@/components/sections/Downloads";
import { Team } from "@/components/sections/Team";
import { Highlights } from "@/components/sections/Highlights";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <MotionProvider>
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <TechMarquee />
        <PipelineDivider />
        <Domain />
        <Components />
        <Architecture />
        <PipelineDivider label="// running evaluation suite" />
        <Metrics />
        <Milestones />
        <Downloads />
        <Team />
        <Highlights />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
