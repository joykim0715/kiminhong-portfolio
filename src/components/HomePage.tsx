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
import HashScroll from "@/components/HashScroll";
import { RecruitSafeProvider } from "@/components/RecruitSafeProvider";
import { ContentProvider, type Locale } from "@/components/ContentProvider";
import { siteContent, type SiteContent } from "@/data/content";

type HomePageProps = {
  /** true면 사진·연락처·이력서 링크를 숨긴 채용 제출용 뷰 */
  recruitSafe?: boolean;
  locale?: Locale;
  content?: SiteContent;
};

export default function HomePage({
  recruitSafe = false,
  locale = "ko",
  content = siteContent,
}: HomePageProps) {
  return (
    <ContentProvider locale={locale} content={content}>
      <RecruitSafeProvider enabled={recruitSafe}>
        <HashScroll />
        <Navbar />
        <main id="main-content" lang={locale === "en" ? "en" : "ko"} className="relative z-[3]">
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
    </ContentProvider>
  );
}
