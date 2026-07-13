/**
 * 사이트 전체 텍스트·콘텐츠 — 이 파일만 수정하면 사이트에 반영됩니다.
 *
 * 섹션: meta, nav, hero, bridge, values, skills, education, experience,
 *       works, certifications, story, about, socialLinks
 */

export type Work = {
  id: string;
  title: string;
  category: string;
  image?: string;
  description: string;
  panel: ProjectPanel;
};

export type ProjectPanelMetric = {
  label: string;
  value: string;
  note?: string;
};

export type ProjectPanelBlock = {
  id: string;
  title: string;
  summary?: string;
  bullets: string[];
};

export type ProjectPanel = {
  sectionLabel: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  metrics?: ProjectPanelMetric[];
  blocks: ProjectPanelBlock[];
};

export type Certification = {
  name: string;
  fullName: string;
  issuer: string;
  date: string;
  type: "cert" | "award";
  description: string;
};

export type SkillItem = {
  id: string;
  category: string;
  tools: string;
  proficiency: number;
  details: string[];
};

export type ExperienceSection = {
  title: string;
  points: string[];
};

export type EmploymentType = "정규직" | "계약직" | "인턴" | "아르바이트";

export type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  employmentType: EmploymentType;
  sections: ExperienceSection[];
};

export const siteContent = {
  meta: {
    title: "김인홍 — Healthcare Portfolio",
    description:
      "헬스케어 신입 김인홍의 포트폴리오. 스포츠과학, 데이터 분석, 디지털 헬스케어 프로젝트를 소개합니다.",
  },

  nav: {
    siteName: "김인홍",
    contactCta: "Contact",
    sections: [
      { id: "hero", label: "Home" },
      { id: "values", label: "Values" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" },
      { id: "experience", label: "Experience" },
      { id: "works", label: "Work" },
      { id: "story", label: "Story" },
      { id: "contact", label: "Contact" },
    ],
  },

  hero: {
    name: "김인홍",
    tagline: "스포츠과학 × 디지털헬스 신입",
    headline: "Finding the value of movement",
    bio: "헬스케어·디지털 헬스 분야에서 스포츠과학적 전문성과 데이터 분석으로 솔루션을 탐색합니다.",
    profileImage: "/images/profile.png",
    cutoutImage: "/images/hero-cutout-v6.png",
    profileGallery: [
      { src: "/images/profile.png", alt: "김인홍 프로필", variant: "formal" as const },
      { src: "/images/profile-field-1.png", alt: "현장 상담", variant: "field" as const },
      { src: "/images/profile-field-2.png", alt: "디바이스 시연", variant: "field" as const },
    ],
    profileHint: {
      desktop: "마우스를 올려 사진을 둘러보세요",
      mobile: "탭해서 사진 둘러보기",
    },
    resumeCtaLabel: "이력서 확인하기",
    resumeUrl: "#",
    noProfileImage: "프로필 이미지 없음",
  },

  bridge: {
    line1: "스포츠과학과 디지털헬스의 교차점에서,",
    line2: "건강한 삶의 가치를 함께 찾아갑니다.",
  },

  values: {
    sectionLabel: "Values",
    title: "움직임과 데이터로 건강의 가치를 만듭니다",
    description:
      "스포츠의학적 전문성과 데이터 분석 역량을 결합해, 신뢰할 수 있는 헬스케어 인사이트를 제공합니다.",
    items: [
      "근거 기반(Evidence-based) 의사결정",
      "사용자 중심의 디지털 헬스 경험",
      "데이터로 읽는 움직임과 회복",
      "연구와 현장을 잇는 실용적 솔루션",
    ],
  },

  skills: {
    sectionLabel: "Skills",
    title: "주요 역량",
    description: "보유하고 있는 역량입니다.",
    items: [
      {
        id: "oa",
        category: "OA",
        tools: "MS Word, Excel, Powerpoint",
        proficiency: 90,
        details: ["데이터 관리 및 시각화", "페이퍼워크 작업", "기타 자료 제작"],
      },
      {
        id: "data",
        category: "Data Analysis",
        tools: "SPSS, MySQL",
        proficiency: 70,
        details: ["가설 검정과 회귀 분석 등 다각도 통계 검정", "효율적인 데이터 추출 쿼리 작성 및 관리"],
      },
      {
        id: "viz",
        category: "Visualization",
        tools: "Figma, Looker Studio",
        proficiency: 65,
        details: ["UX 중심 레이아웃 설계", "컴포넌트 기반 UI 프로토타이핑"],
      },
      {
        id: "ai",
        category: "Generative AI",
        tools: "Claude, Cursor, Gemini",
        proficiency: 85,
        details: ["MCP 기반 업무 자동화", "비주얼 에셋 생성", "바이브코딩"],
      },
    ] satisfies SkillItem[],
  },

  education: {
    sectionLabel: "Education",
    title: "학력",
    items: [
      {
        school: "성균관대학교",
        period: "2020 ~ 2025.08 (졸업)",
        major: "스포츠과학부 원전공 + 국제통상학과 복수전공",
      },
      {
        school: "기흥고등학교",
        period: "2017 ~ 2020 (졸업)",
        major: "인문계",
      },
    ],
  },

  experience: {
    sectionLabel: "Experience",
    title: "경험",
    items: [
      {
        organization: "AAL 지능형 홈케어 기반구축사업단",
        role: "데이터 플랫폼 센터 연구원",
        period: "2025.03 ~ 2026.03",
        employmentType: "계약직",
        sections: [
          {
            title: "① 고령자 건강 데이터 수집 및 참여자 이탈 관리",
            points: [
              "150명 시니어 대상 건강 데이터 6.9만 건 수집",
              "데이터 유실(Blackout) 구간 현장 밀착 관리로 분석 유효성 85% 확보",
            ],
          },
          {
            title: "② 전문 장비 활용 운동 역학 및 신체 기능 검사 수행",
            points: [
              "InBody 970 / FRA-510s 직접 운용",
              "최종 서비스 참여 유지율 83% 달성",
            ],
          },
          {
            title: "③ 사업 홍보 및 의사결정 지원용 인터랙티브 콘텐츠 기획",
            points: [
              "Figma 기반 대시보드 프로토타이핑",
              "B2B 용역 체결 의사결정 지원 5건",
            ],
          },
        ],
      },
      {
        organization: "신성태권도 미금점",
        role: "보조사범",
        period: "2023.04 ~ 2023.12",
        employmentType: "아르바이트",
        sections: [],
      },
      {
        organization: "mvm휘트니스 성복점",
        role: "CS매니저",
        period: "2021.02 ~ 2022.08",
        employmentType: "아르바이트",
        sections: [],
      },
    ] satisfies ExperienceItem[],
  },

  works: {
    sectionLabel: "Portfolio",
    title: "Major projects & Certificates",
    tabs: {
      projects: "Projects",
      certifications: "Certifications",
    },
    stackLabels: {
      projects: "프로젝트",
      certifications: "자격증",
    },
    scrollHint: "스크롤하여 {label} 탐색 ·",
    openHint: "탭하여 상세 보기",
    projects: [
      {
        id: "01",
        title: "시니어 헬스케어 실증사업 데이터 운영",
        category: "Digital Health",
        image: "/works/01.jpg",
        description:
          "시니어 헬스케어 실증사업에서 건강 데이터 수집·운영 전 과정을 담당했습니다. 참여자 이탈과 데이터 blackout을 현장 중심으로 관리해 분석 유효성 85%, 리텐션 83%를 확보했습니다.",
        panel: {
          sectionLabel: "Case Study",
          subtitle:
            "224명 대상 1년 실증에서 수집·운영·현장 관리를 맡아, 분석 가능한 데이터 품질과 참여 유지를 동시에 확보한 사례입니다.",
          meta: [
            { label: "역할", value: "연구원 / 데이터 플랫폼 센터" },
            { label: "소속", value: "가천대학교 산학협력단 지능형 홈케어 기반구축 사업단" },
            { label: "기간", value: "2025.03 ~ 2026.03" },
            { label: "도구", value: "SQL, SPSS, Figma" },
          ],
          metrics: [
            { label: "수집 데이터", value: "6.9만 건", note: "스마트링·워치 기반" },
            { label: "분석 유효성", value: "85%", note: "blackout 구간 관리 후" },
            { label: "참여 유지율", value: "83%", note: "최종 서비스 기준" },
            { label: "실제 참여", value: "150명", note: "224명 중 67%" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "장기 실증에서 데이터의 ‘양’보다 ‘연속성’이 핵심 과제였습니다.",
              bullets: [
                "224명 대상 1년 운영 중 참여자 이탈로 건강 데이터가 끊기는 구간이 반복 발생",
                "웨어러블 미착용·충전 누락 등 blackout으로 분석에 쓸 수 없는 공백 데이터 누적",
                "현장 상황과 플랫폼 데이터 사이 품질 격차로 분석 신뢰도가 떨어짐",
                "사업 성과와 운영 현황을 이해관계자에게 설명할 가시화 수단이 부족함",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              summary: "수집 운영, 현장 관리, 분석 지원을 연결하는 허브 역할을 맡았습니다.",
              bullets: [
                "스마트링·워치 기반 건강 데이터 수집 파이프라인 운영 및 품질 모니터링",
                "참여자 이탈·blackout 구간 식별 후 현장 밀착 관리로 데이터 연속성 확보",
                "InBody 970, FRA-510s 등 전문 장비 검사 수행 및 결과 기록",
                "사업 홍보·B2B 의사결정을 위한 Figma 대시보드 프로토타입 기획",
              ],
            },
            {
              id: "method",
              title: "방법",
              summary: "SQL·SPSS로 데이터를 읽고, 운영 프로세스로 현장을 움직였습니다.",
              bullets: [
                "blackout 구간을 운영 기준에 맞게 정의하고, 누락 패턴을 주기적으로 점검",
                "이탈 신호가 보이는 참여자에게 우선 follow-up하는 현장 대응 루틴 운영",
                "수집 데이터를 SQL로 추출·정제하고 SPSS로 분석 가능 여부를 검증",
                "의사결정자가 한눈에 보는 사업 현황판을 Figma로 프로토타이핑해 공유",
              ],
            },
            {
              id: "results",
              title: "결과",
              summary: "참여 규모·데이터 품질·유지율을 동시에 끌어올렸습니다.",
              bullets: [
                "6.9만 건 건강 데이터 수집 및 운영 체계 안정화",
                "blackout 구간 현장 관리로 분석 유효성 85% 확보",
                "참여자 리텐션 83% 달성, 150명(67%)이 끝까지 서비스 참여",
                "대시보드 프로토타입으로 B2B 용역 체결 의사결정 지원 5건",
              ],
            },
            {
              id: "insights",
              title: "인사이트",
              bullets: [
                "헬스케어 실증에서 리텐션은 기술 문제이기 전에 운영·신뢰 문제다",
                "데이터가 많아도 blackout이 많으면 분석 가치는 급격히 떨어진다",
                "대시보드는 꾸밈이 아니라, 현장과 의사결정을 잇는 커뮤니케이션 도구다",
              ],
            },
            {
              id: "learnings",
              title: "배운 점",
              bullets: [
                "초기에 blackout·이탈 기준을 표준화하면 후반 운영 부담이 크게 줄어든다",
                "다음에는 리스크 참여자를 자동 태깅하는 룰을 SQL·대시보드에 붙이고 싶다",
                "현장 경험과 데이터 분석을 함께 가져가는 인력이 디지털 헬스에서 특히 필요하다",
              ],
            },
          ],
        },
      },
      {
        id: "02",
        title: "de:light — fNIRS 기반 식습관 관리 링",
        category: "Digital Health",
        image: "/works/02.jpg",
        description:
          "fNIRS 센서 기반 웨어러블 링과 앱 서비스를 기획하고, UX 플로우와 프로토타입을 설계한 프로젝트입니다.",
        panel: {
          sectionLabel: "Project Detail",
          subtitle:
            "뇌 활동 신호를 활용한 식습관 관리 웨어러블 링과 앱 경험을 기획·프로토타이핑한 디지털 헬스 프로젝트입니다.",
          meta: [
            { label: "역할", value: "팀원 / 기획·UX" },
            { label: "소속", value: "SKKU-삼성생명 라이프놀로지랩 1기" },
            { label: "기간", value: "2024.10 ~ 2025.01" },
            { label: "도구", value: "Figma, Runway Gen, Fixcap" },
          ],
          blocks: [
            {
              id: "overview",
              title: "개요",
              summary: "식습관 개입을 위한 웨어러블·앱 통합 서비스를 팀 단위로 설계했습니다.",
              bullets: [
                "fNIRS 센서 기반 웨어러블 링과 모바일 앱의 사용자 여정을 정의",
                "헬스케어 디바이스의 착용성과 데이터 신뢰를 고려한 UX 방향 설정",
                "라이프놀로지랩 프로그램 내 디지털 헬스 서비스 기획 실습 프로젝트",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              bullets: [
                "앱 핵심 화면 플로우와 인터랙션 시나리오 기획",
                "프로토타입 제작 및 팀 내 사용자 시나리오 정리",
                "서비스 컨셉 영상·비주얼 에셋 제작 지원",
              ],
            },
            {
              id: "method",
              title: "방법",
              bullets: [
                "Figma로 앱 와이어프레임·프로토타입 제작",
                "Runway Gen, Fixcap으로 서비스 설명용 비주얼 제작",
                "팀 워크숍에서 페르소나·사용 맥락 기반 피드백 반영",
              ],
            },
            {
              id: "outcome",
              title: "성과",
              bullets: [
                "웨어러블-앱 연동 UX 플로우 완성",
                "서비스 컨셉을 설명할 수 있는 프로토타입·비주얼 산출물 확보",
                "디지털 헬스 기획 프로세스 전반 경험",
              ],
            },
          ],
        },
      },
      {
        id: "03",
        title: "교내 도서관 리모델링 설문·기획",
        category: "Research",
        image: "/works/03.jpg",
        description:
          "학생 설문 데이터를 수집·분석하여 공간 리모델링 방향을 도출하고, 이해관계자 의견을 조율한 프로젝트입니다.",
        panel: {
          sectionLabel: "Project Detail",
          subtitle:
            "학생 설문 데이터를 기반으로 도서관 공간 리모델링 방향을 도출하고 이해관계자 의견을 조율한 프로젝트입니다.",
          meta: [
            { label: "역할", value: "인권복지국원" },
            { label: "소속", value: "성균관대학교 제55대 총학생회" },
            { label: "기간", value: "2022.11 ~ 2023.11" },
          ],
          metrics: [
            { label: "설문 응답", value: "800명" },
            { label: "공간 만족도", value: "87%" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "공간 개선 필요성은 있었지만, 학생 니즈가 정량적으로 정리되지 않았습니다.",
              bullets: [
                "도서관 이용 경험에 대한 학생 의견이 분산되어 있어 우선순위 설정이 어려움",
                "리모델링 방향을 뒷받침할 설문·분석 체계 필요",
                "학생회·학교 측 의사결정을 위한 근거 데이터 부족",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              bullets: [
                "설문 설계 및 응답 데이터 수집·정리",
                "분석 결과를 공간 기획안에 반영",
                "이해관계자 간 의견 조율 및 개선안 커뮤니케이션",
              ],
            },
            {
              id: "results",
              title: "결과",
              bullets: [
                "약 800명 설문 분석 완료",
                "공간 만족도 87% 이상을 목표로 한 개선 방향 도출",
                "데이터 기반 리모델링 기획 근거 마련",
              ],
            },
          ],
        },
      },
      {
        id: "04",
        title: "학과 맞춤형 기업 제휴 사업",
        category: "Business Planning",
        image: "/works/04.jpg",
        description:
          "재학생 니즈 분석을 바탕으로 학과 맞춤형 기업 제휴를 기획·추진한 프로젝트입니다.",
        panel: {
          sectionLabel: "Project Detail",
          subtitle:
            "재학생 니즈 분석을 바탕으로 학과 맞춤형 기업 제휴를 기획·추진한 사업 기획 프로젝트입니다.",
          meta: [
            { label: "역할", value: "대외협력국 차장" },
            { label: "소속", value: "성균관대학교 스포츠과학대학 학생회" },
            { label: "기간", value: "2021.10 ~ 2022.10" },
          ],
          metrics: [
            { label: "설문 분석", value: "200명" },
            { label: "제휴 물량", value: "+30%" },
          ],
          blocks: [
            {
              id: "overview",
              title: "개요",
              summary: "학생 니즈를 데이터로 정리해 기업 제휴 협상의 근거를 만들었습니다.",
              bullets: [
                "재학생 대상 니즈 조사 후 제휴 우선순위 도출",
                "학과 특성에 맞는 기업 제휴 모델 기획",
                "학생회 대외협력 업무의 기획·실행 전 과정 경험",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              bullets: [
                "설문 설계 및 200명 응답 데이터 분석",
                "제휴 제안서·협상 자료 작성 지원",
                "학생회-기업 간 커뮤니케이션 조율",
              ],
            },
            {
              id: "results",
              title: "결과",
              bullets: [
                "제휴 물품 수량 기존 대비 30% 증가",
                "학생 니즈 기반 제휴 구조로 전환",
                "기획-협상-실행 사이클 경험",
              ],
            },
          ],
        },
      },
      {
        id: "05",
        title: "대한체육회 국대스마터즈 1기",
        category: "Sports Marketing",
        image: "/works/05.jpg",
        description:
          "스포츠 종목 홍보 콘텐츠를 기획·제작하고, 디지털 채널 기반 마케팅 전략을 수행한 프로젝트입니다.",
        panel: {
          sectionLabel: "Project Detail",
          subtitle:
            "스포츠 종목 홍보 콘텐츠를 기획·제작하고 디지털 채널 마케팅을 수행한 대외활동 프로젝트입니다.",
          meta: [
            { label: "역할", value: "대외활동 팀원" },
            { label: "소속", value: "대한체육회 국대스마터즈 1기 (수영)" },
            { label: "기간", value: "2022.04 ~ 2022.11" },
          ],
          blocks: [
            {
              id: "overview",
              title: "개요",
              summary: "수영 종목의 대중적 이해와 관심을 높이기 위한 홍보 활동에 참여했습니다.",
              bullets: [
                "디지털 채널 중심 스포츠 마케팅 콘텐츠 기획",
                "종목의 매력을 전달하는 스토리텔링 중심 접근",
                "팀 협업 기반 콘텐츠 제작·배포",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              bullets: [
                "홍보 콘텐츠 아이디어 도출 및 제작 지원",
                "디지털 채널 업로드·운영 보조",
                "캠페인 메시지 정리 및 팀 내 피드백 반영",
              ],
            },
            {
              id: "outcome",
              title: "성과",
              bullets: [
                "종목 홍보용 콘텐츠 다수 제작",
                "스포츠 마케팅 실무 프로세스 경험",
                "대외 협력·콘텐츠 기획 역량 강화",
              ],
            },
          ],
        },
      },
      {
        id: "06",
        title: "사업 홍보용 인터랙티브 대시보드 기획",
        category: "Data Analysis",
        image: "/works/06.jpg",
        description:
          "사업 추진 현황을 한눈에 파악할 수 있도록 데이터 기반 인터랙티브 대시보드를 기획한 프로젝트입니다.",
        panel: {
          sectionLabel: "Project Detail",
          subtitle:
            "사업 추진 현황을 한눈에 파악할 수 있도록 데이터 기반 인터랙티브 대시보드를 기획한 프로젝트입니다.",
          meta: [
            { label: "역할", value: "연구원 / 기획" },
            { label: "기간", value: "2025.03 ~ 2026.03" },
            { label: "도구", value: "Figma" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "사업 성과를 설명할 때 수치가 분산되어 의사결정이 느렸습니다.",
              bullets: [
                "운영 데이터가 여러 보고 형식으로 흩어져 한눈에 보기 어려움",
                "B2B 미팅·홍보 상황에서 즉시 설명 가능한 시각 자료 부족",
                "참여자·데이터·성과 지표를 연결한 스토리텔링 필요",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              bullets: [
                "대시보드 정보 구조(IA) 및 화면 흐름 설계",
                "핵심 KPI 선정 및 시각화 우선순위 정의",
                "Figma 기반 인터랙티브 프로토타입 제작",
              ],
            },
            {
              id: "outcome",
              title: "성과",
              bullets: [
                "사업 현황을 설명하는 대시보드 프로토타입 완성",
                "B2B 용역 체결 의사결정 지원에 활용",
                "데이터 기획·시각화 역량을 연결한 산출물 확보",
              ],
            },
          ],
        },
      },
    ] satisfies Work[],
  },

  certifications: [
    {
      name: "ADsP",
      fullName: "데이터 분석 준전문가",
      issuer: "한국데이터산업진흥원",
      date: "2026.06.05",
      type: "cert",
      description: "R Studio와 SQL을 활용한 데이터 필터링·분석 역량 보유",
    },
    {
      name: "AI-POT 2급",
      fullName: "AI 프롬프트 활용능력",
      issuer: "관련 발급기관",
      date: "2026.04.30",
      type: "cert",
      description: "역설계 프롬프팅 및 커넥터·MCP 기반 업무 자동화 역량",
    },
    {
      name: "AIBT 2급",
      fullName: "AI 비즈니스 활용",
      issuer: "관련 발급기관",
      date: "2026.04.02",
      type: "cert",
      description: "AI 기술의 비즈니스 적용 원리 이해 및 실무 자동화 역량",
    },
    {
      name: "Google Analytics Certification",
      fullName: "구글 애널리틱스 인증",
      issuer: "Google",
      date: "2026.02.03",
      type: "cert",
      description: "이벤트 기반 사용자 행동 패턴 및 유입 경로 분석 역량",
    },
    {
      name: "스마트홈 헬스케어 지도사 2급",
      fullName: "스마트홈 헬스케어 지도사",
      issuer: "관련 발급기관",
      date: "2025.11.14",
      type: "cert",
      description: "스마트홈 기술과 보건 의료 서비스 결합, 시니어 맞춤 기획 역량",
    },
    {
      name: "우수 포스터상",
      fullName: "2025 추계 한국운동재활학회 우수 포스터상",
      issuer: "한국운동재활학회",
      date: "2025.11",
      type: "award",
      description: "학술대회 포스터 발표 부문 우수 연구 성과로 선정",
    },
    {
      name: "성균 우등 졸업상",
      fullName: "학업 우수 표창",
      issuer: "성균관대학교",
      date: "2025.08.25",
      type: "award",
      description: "스포츠과학 및 국제통상 전공 전 과정 학업 우수자 선정",
    },
    {
      name: "ROTC 우수후보생 표창",
      fullName: "총장 표창",
      issuer: "성균관대학교",
      date: "2022.08.25",
      type: "award",
      description: "군사교육단 대표 후보생으로서 리더십과 책임감 인정",
    },
  ] satisfies Certification[],

  story: {
    sectionLabel: "Story",
    title: "움직임을 연구하고, 삶을 설계합니다",
    paragraphs: [
      "스포츠과학과 헬스케어 데이터 분석을 통해 사람들이 더 건강하게 움직일 수 있는 방법을 탐구해 왔습니다.",
      "연구실과 현장, 디지털 서비스 사이를 오가며 실질적인 인사이트를 만들어내는 것이 저의 목표입니다.",
    ],
    photos: [
      { id: "p1", label: "Research", image: "/images/rs_p4_0.png" },
      { id: "p2", label: "Field", image: "/images/rs_p2_1.png" },
      { id: "p3", label: "Data", image: "/images/rs_p4_2.png" },
    ],
  },

  about: {
    sectionLabel: "About",
    headline: "건강한 삶의 가치를 함께 찾겠습니다.",
    bio: "헬스케어 신입 김인홍입니다. 스포츠과학 전문성과 데이터 문해력을 바탕으로 차세대 헬스케어 시장을 이끌겠습니다.",
    email: "recead0715@naver.com",
    phone: "010-4272-3945",
    copyright: "김인홍",
    ctaButton: "Get in touch",
    rightsReserved: "All rights reserved.",
  },

  socialLinks: [
    { label: "Saramin", href: "https://www.saramin.co.kr" },
    { label: "Email", href: "mailto:recead0715@naver.com" },
  ],
};
