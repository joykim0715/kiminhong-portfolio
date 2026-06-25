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
  details?: string[];
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
        proficiency: 80,
        details: ["데이터 관리 및 시각화", "페이퍼워크 작업", "기타 자료 제작"],
      },
      {
        id: "data",
        category: "Data Analysis",
        tools: "SPSS, MySQL",
        proficiency: 78,
        details: ["가설 검정과 회귀 분석 등 다각도 통계 검정", "효율적인 데이터 추출 쿼리 작성 및 관리"],
      },
      {
        id: "viz",
        category: "Visualization",
        tools: "Figma, Looker Studio",
        proficiency: 82,
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
    projects: [
      {
        id: "01",
        title: "시니어 헬스케어 실증사업 데이터 운영",
        category: "Digital Health",
        image: "/works/01.jpg",
        description:
          "시니어 헬스케어 실증 데이터를 수집·운영하고, 사용자 리텐션과 서비스 운영 전략을 설계한 프로젝트입니다.",
        details: [
          "역할: 연구원 / 데이터 플랫폼 센터",
          "소속: 가천대학교 산학협력단 지능형 홈케어 기반구축 사업단",
          "기간: 2025.03 ~ 2026.03",
          "성과: 224명 대상 1년 운영, 150명 참여(67%), 리텐션 83%",
          "성과: 스마트링·워치 기반 건강 데이터 6.9만 건 수집, 분석 유효성 85%",
          "도구: SQL, SPSS, Figma",
        ],
      },
      {
        id: "02",
        title: "de:light — fNIRS 기반 식습관 관리 링",
        category: "Digital Health",
        image: "/works/02.jpg",
        description:
          "fNIRS 센서 기반 웨어러블 링과 앱 서비스를 기획하고, UX 플로우와 프로토타입을 설계한 프로젝트입니다.",
        details: [
          "역할: 팀원 / 기획·UX",
          "소속: SKKU-삼성생명 라이프놀로지랩 1기",
          "기간: 2024.10 ~ 2025.01",
          "도구: Figma, Runway Gen, Fixcap",
        ],
      },
      {
        id: "03",
        title: "교내 도서관 리모델링 설문·기획",
        category: "Research",
        image: "/works/03.jpg",
        description:
          "학생 설문 데이터를 수집·분석하여 공간 리모델링 방향을 도출하고, 이해관계자 의견을 조율한 프로젝트입니다.",
        details: [
          "역할: 인권복지국원",
          "소속: 성균관대학교 제55대 총학생회",
          "기간: 2022.11 ~ 2023.11",
          "성과: 약 800명 설문 분석, 공간 만족도 87% 이상",
        ],
      },
      {
        id: "04",
        title: "학과 맞춤형 기업 제휴 사업",
        category: "Business Planning",
        image: "/works/04.jpg",
        description:
          "재학생 니즈 분석을 바탕으로 학과 맞춤형 기업 제휴를 기획·추진한 프로젝트입니다.",
        details: [
          "역할: 대외협력국 차장",
          "소속: 성균관대학교 스포츠과학대학 학생회",
          "기간: 2021.10 ~ 2022.10",
          "성과: 200명 설문 분석, 제휴 물품 수량 기존 대비 30% 증가",
        ],
      },
      {
        id: "05",
        title: "대한체육회 국대스마터즈 1기",
        category: "Sports Marketing",
        image: "/works/05.jpg",
        description:
          "스포츠 종목 홍보 콘텐츠를 기획·제작하고, 디지털 채널 기반 마케팅 전략을 수행한 프로젝트입니다.",
        details: [
          "역할: 대외활동 팀원",
          "소속: 대한체육회 국대스마터즈 1기 (수영)",
          "기간: 2022.04 ~ 2022.11",
        ],
      },
      {
        id: "06",
        title: "사업 홍보용 인터랙티브 대시보드 기획",
        category: "Data Analysis",
        image: "/works/06.jpg",
        description:
          "사업 추진 현황을 한눈에 파악할 수 있도록 데이터 기반 인터랙티브 대시보드를 기획한 프로젝트입니다.",
        details: [
          "역할: 연구원 / 기획",
          "기간: 2025.03 ~ 2026.03",
          "도구: Figma",
        ],
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
