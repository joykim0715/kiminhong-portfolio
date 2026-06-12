import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GradientTransition from "@/components/GradientTransition";
import Values from "@/components/Values";
import SkillsDial from "@/components/SkillsDial";
import WorkGallery from "@/components/WorkGallery";
import StorySection from "@/components/StorySection";
import InspirationGallery from "@/components/InspirationGallery";
import ContactCTA from "@/components/ContactCTA";
import PageLoadEntrance from "@/components/PageLoadEntrance";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-[3]">
        <Hero />
        <GradientTransition />
        <Values />
        <SkillsDial />
        <WorkGallery />
        <StorySection />
        <InspirationGallery />
        <ContactCTA />
      </main>
      <PageLoadEntrance />
    </>
  );
}
