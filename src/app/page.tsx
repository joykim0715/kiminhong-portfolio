import SectionBlend from "@/components/SectionBlend";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GradientTransition from "@/components/GradientTransition";
import Values from "@/components/Values";
import SkillsDial from "@/components/SkillsDial";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import WorkGallery from "@/components/WorkGallery";
import StorySection from "@/components/StorySection";
import ContactCTA from "@/components/ContactCTA";
import PageLoadEntrance from "@/components/PageLoadEntrance";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-[3]">
        <Hero />
        <GradientTransition />
        <SectionBlend variant="bridge-values" />
        <Values />
        <SkillsDial />
        <Education />
        <Experience />
        <WorkGallery />
        <SectionBlend variant="works-story" />
        <StorySection />
        <ContactCTA />
      </main>
      <PageLoadEntrance />
    </>
  );
}
