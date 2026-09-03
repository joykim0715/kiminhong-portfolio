import SectionBlend from "@/components/SectionBlend";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrackProofBar from "@/components/TrackProofBar";
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
import { TrackProvider } from "@/components/TrackProvider";
import { siteContent, type SiteContent } from "@/data/content";
import { TRACK_HREF, TRACK_LAYOUT, type TrackId, type TrackSectionId } from "@/data/tracks";

type HomePageProps = {
  /** true면 사진·연락처를 숨긴 채용 제출용 뷰 */
  recruitSafe?: boolean;
  locale?: Locale;
  content?: SiteContent;
  track?: TrackId;
};

function TrackSection({ id }: { id: TrackSectionId }) {
  switch (id) {
    case "hero":
      return <Hero />;
    case "proof":
      return <TrackProofBar />;
    case "gradient":
      return <GradientTransition />;
    case "cases":
      return <WorkGallery mode="featured" />;
    case "values":
      return <Values />;
    case "skills":
      return <SkillsDial />;
    case "education":
      return <Education />;
    case "experience":
      return <Experience />;
    case "works":
      return <WorkGallery mode="full" />;
    case "blend":
      return <SectionBlend variant="works-story" />;
    case "story":
      return <StorySection />;
    case "contact":
      return <ContactCTA />;
    default:
      return null;
  }
}

export default function HomePage({
  recruitSafe = false,
  locale = "ko",
  content = siteContent,
  track = "research",
}: HomePageProps) {
  const homeHref = locale === "en" ? "/en" : TRACK_HREF[track];
  const layout = TRACK_LAYOUT[track];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute("data-track",${JSON.stringify(track)});`,
        }}
      />
      <TrackProvider track={track}>
        <ContentProvider locale={locale} content={content} homeHref={homeHref}>
          <RecruitSafeProvider enabled={recruitSafe}>
            <HashScroll />
            <Navbar />
            <main id="main-content" lang={locale === "en" ? "en" : "ko"} className="relative z-[3]">
              {layout.sections.map((id) => (
                <TrackSection key={id} id={id} />
              ))}
            </main>
            <PageLoadEntrance />
          </RecruitSafeProvider>
        </ContentProvider>
      </TrackProvider>
    </>
  );
}
