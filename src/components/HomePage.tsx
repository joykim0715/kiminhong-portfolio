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
import {
  naverResumePagePath,
  siteContent,
  type SiteContent,
} from "@/data/content";

export type RecruitSafeOptions = {
  resumeUrl: string;
  resumeCtaLabel: string;
  homeHref?: string;
};

type HomePageProps = {
  /**
   * true → 네이버용 기본값
   * 객체 → 기업별 이력서 CTA 지정 (예: 와이즐리)
   */
  recruitSafe?: boolean | RecruitSafeOptions;
  locale?: Locale;
  content?: SiteContent;
};

function resolveRecruitSafe(recruitSafe: boolean | RecruitSafeOptions | undefined) {
  if (!recruitSafe) {
    return {
      enabled: false,
      resumeUrl: "",
      resumeCtaLabel: "",
      homeHref: "/",
    };
  }
  if (recruitSafe === true) {
    return {
      enabled: true,
      resumeUrl: naverResumePagePath,
      resumeCtaLabel: siteContent.hero.naverResumeCtaLabel,
      homeHref: "/naver",
    };
  }
  return {
    enabled: true,
    resumeUrl: recruitSafe.resumeUrl,
    resumeCtaLabel: recruitSafe.resumeCtaLabel,
    homeHref: recruitSafe.homeHref ?? "/",
  };
}

export default function HomePage({
  recruitSafe = false,
  locale = "ko",
  content = siteContent,
}: HomePageProps) {
  const recruit = resolveRecruitSafe(recruitSafe);

  return (
    <ContentProvider locale={locale} content={content}>
      <RecruitSafeProvider
        enabled={recruit.enabled}
        resumeUrl={recruit.resumeUrl}
        resumeCtaLabel={recruit.resumeCtaLabel}
        homeHref={recruit.homeHref}
      >
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
