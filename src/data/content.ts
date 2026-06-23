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
  issuer: string;
  year: string;
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
    groups: [
      {
        label: "Research",
        summary: "스포츠의학적 근거를 바탕으로 움직임과 회복을 해석합니다.",
        skills: ["스포츠의학", "문헌 리뷰", "임상 데이터"],
      },
      {
        label: "Data",
        summary: "헬스케어 데이터를 분석해 의사결정에 쓸 수 있는 인사이트로 전환합니다.",
        skills: ["SPSS", "MySQL", "통계 분석", "시각화"],
      },
      {
        label: "Digital Health",
        summary: "사용자 관점에서 디지털 헬스 서비스 경험을 설계합니다.",
        skills: ["Figma", "UX 리서치", "헬스 지표", "서비스 기획"],
      },
    ],
  },

  education: {
    sectionLabel: "Education",
    title: "학력",
    items: [
      {
        school: "성균관대학교",
        period: "2020 — 2025",
        major: "스포츠과학과 + 국제통상학전공 (복수전공)",
      },
    ],
  },

  experience: {
    sectionLabel: "Experience",
    title: "경험",
    items: [
      {
        organization: "가천대학교 산학협력단",
        role: "연구 보조 (Research Assistant)",
        project: "정부과제 노인 헬스케어 실증사업",
        achievements: [
          "노인 참여자 150명 대상 생체역학 측정 운영",
          "InBody 970 / FRA-510s 장비 직접 운용",
          "참여자 83% 유지율 달성",
          "Figma 기반 결과 대시보드 제작",
        ],
      },
    ],
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
    { name: "ADsP (데이터 분석 준전문가)", issuer: "한국데이터산업진흥원", year: "2025" },
    { name: "SQLD (SQL 개발자)", issuer: "한국데이터산업진흥원", year: "2025" },
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
