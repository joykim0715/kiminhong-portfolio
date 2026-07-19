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
import { RecruitSafeProvider } from "@/components/RecruitSafeProvider";

type HomePageProps = {
  /** true면 사진·연락처·이력서 링크를 숨긴 채용 제출용 뷰 */
  recruitSafe?: boolean;
};

export default function HomePage({ recruitSafe = false }: HomePageProps) {
  return (
    <RecruitSafeProvider enabled={recruitSafe}>
      <Navbar />
      <main id="main-content" className="relative z-[3]">
        <Hero />
        <GradientTransition />
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
    </RecruitSafeProvider>
  );
}
