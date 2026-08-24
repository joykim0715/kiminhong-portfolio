import { siteContent, type SiteContent } from "./content";

/**
 * 와이즐리 헬스팀(프로덕트) 지원용 카피.
 * 프로젝트·경력 데이터는 원본과 동일하고, 히어로·Values·About만 JD 톤에 맞춤.
 */
export const siteContentWisely: SiteContent = {
  ...siteContent,
  meta: {
    title: "김인홍 — Portfolio (와이즐리 지원용)",
    description:
      "고객 조사·데이터 기반 제품기획 경험을 담은 포트폴리오. 헬스케어 실무에서 니즈 검증과 실행으로 성과를 만든 과정을 소개합니다. (사진·연락처 미포함)",
  },
  hero: {
    ...siteContent.hero,
    tagline: "고객 조사 × 데이터 기반 제품기획 | 헬스케어 실무 1년",
    headline: "From customer insight\nto product action",
    bio: "건기식·헬스케어 맥락에서 고객·시장을 데이터로 읽고, 실행 가능한 제품·서비스 개선으로 연결합니다.",
  },
  bridge: {
    line1: "취향이 아니라 데이터로 니즈를 검증하고,",
    line2: "오너십으로 제품 가치를 끝까지 실행합니다.",
  },
  values: {
    sectionLabel: "Values",
    title: "데이터로 니즈를 읽고,\n실행으로 제품 가치를 만듭니다",
    description:
      "시장·고객을 근거로 문제를 정의하고, 가설을 검증한 뒤 현장과 협업으로 결과까지 밀어붙입니다. 연차보다 실행력, 직급보다 오너십을 기준으로 일합니다.",
    items: [
      "근거·데이터로 논리 구조를 세우는 의사결정",
      "설문·현장 관찰로 잠재 니즈를 검증",
      "문제 정의부터 개선 실행까지 오너십",
      "헬스케어·건강 도메인과 시장을 함께 읽는 시각",
    ],
  },
  skills: {
    ...siteContent.skills,
    description:
      "고객·시장 조사, 데이터 분석, AI 활용, 유관부서·파트너 커뮤니케이션에 쓰는 역량입니다.",
  },
  about: {
    ...siteContent.about,
    headline: "가성비와 품질의 간극을,\n데이터와 실행으로 줄이겠습니다.",
    bio: "시니어 헬스케어 실증에서 고객 맥락을 읽고 데이터로 검증해 리텐션 83%를 만든 경험이 있습니다. 와이즐리 헬스팀에서 조사·기획·실행을 한 사이클로 돌리며 카테고리 성장에 기여하고 싶습니다.",
  },
};
