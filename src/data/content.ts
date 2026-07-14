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
  /** @deprecated images 배열을 사용하세요 */
  image?: string;
  images?: string[];
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
    tagline: "스포츠과학 × 디지털헬스 경력 1년차",
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
        title: "시니어 헬스케어 국책사업 데이터 수집 및 관리",
        category: "Digital Health",
        image: "/works/01.jpg",
        description:
          "시니어 헬스케어 국책사업에서 건강 데이터 수집·관리 과정을 담당했습니다. 참여자와 데이터 유실을 현장 중심으로 관리해 분석 유효성 85%, 리텐션 83%를 확보했습니다.",
        panel: {
          sectionLabel: "Case Study",
          subtitle:
            "인천광역시 거주 중인 65세 이상 액티브 시니어를 대상으로 건강 데이터를 수집하고 관리했습니다. 분석 가능한 데이터 품질과 참여 유지를 동시에 확보한 사례입니다.",
          meta: [
            { label: "역할", value: "연구원 / 데이터 플랫폼 센터" },
            { label: "소속", value: "취약계층 지능형 홈케어 기반구축 사업단" },
            { label: "기간", value: "2025.03 ~ 2026.03" },
            { label: "도구", value: "MySQL, SPSS, Figma" },
          ],
          metrics: [
            { label: "수집 데이터", value: "6.9만 건", note: "디바이스 및 현장 측정" },
            { label: "분석 유효성", value: "85%", note: "blackout 구간 관리 후" },
            { label: "참여 유지율", value: "83%", note: "연구 참여 동의자 기준" },
            { label: "실제 참여", value: "150명", note: "224명 중 67%" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "장기 실증에서 데이터의 ‘연속성’이 핵심 과제였습니다.",
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
                "FRA-510s, SPPB, TUG 등 기능·이학 검사 수행",
                "사업 홍보·B2B 의사결정을 위한 Figma 대시보드 프로토타이핑",
              ],
            },
            {
              id: "method",
              title: "방법",
              summary: "SQL·SPSS로 데이터를 읽고, 현장과 사람들 속에서 답을 찾고자 움직였습니다.",
              bullets: [
                "현장에 상주하며 이탈 전조 참여자와 면담을 통해 VoC 수집",
                "귀찮음과 기기 오류에 대한 트러블슈팅 부재가 원인임을 파악, 해결 가이드 제작 후 배포",
                "수집된 데이터를 SQL로 추출하고 SPSS로 통계분석 진행",
                "사업 현황과 데이터 파악을 위한 대시보드를 Figma로 프로토타이핑해 공유",
              ],
            },
            {
              id: "results",
              title: "결과",
              summary: "참여 규모·데이터 품질·유지율을 동시에 끌어올렸습니다.",
              bullets: [
                "6.9만 건 건강 데이터 수집 및 운영 체계 안정화",
                "blackout 구간 현장 관리로 분석 유효성 85% 확보",
                "참여자 최종 유지율 83% 달성",
                "대시보드 프로토타입으로 B2B 용역 체결 의사결정 지원 5건",
              ],
            },
            {
              id: "insights",
              title: "인사이트",
              bullets: [
                "헬스케어 실증에서 리텐션은 기술 문제이기 전에 운영·신뢰 문제다",
                "데이터가 많아도 blackout이 많으면 분석 가치는 급격히 떨어진다",
                "대시보드는 심미성 확보 이전에, 현장과 의사결정을 잇는 커뮤니케이션 도구가 될 수 있다",
              ],
            },
            {
              id: "learnings",
              title: "배운 점",
              bullets: [
                "초기에 blackout·이탈 기준을 표준화하면 후반 운영 부담이 크게 줄어든다",
                "다음에는 리스크 참여자를 자동 태깅하는 룰을 SQL·대시보드에 추가해보고 싶다",
                "현장 경험과 데이터 분석을 함께 가져가는 인력이 디지털 헬스에서 특히 필요하다",
              ],
            },
          ],
        },
      },
      {
        id: "02",
        title: "삼성생명 산학협력 프로젝트 '라이프놀로지 랩 1기'",
        category: "Digital Health",
        image: "/works/02.jpg",
        description:
          "fNIRS 센서 기반 웨어러블 링과 앱 서비스 'de:light'를 기획하고, UX 플로우와 프로토타입을 설계한 산학 협력 프로젝트입니다.",
        panel: {
          sectionLabel: "UX Case Study",
          subtitle:
            "fNIRS 센서를 활용한 웨어러블 링과 연동 앱 서비스를 팀 단위로 기획·프로토타이핑한 디지털 헬스 프로젝트입니다.",
          meta: [
            { label: "역할", value: "팀원 / 기획·UX" },
            { label: "소속", value: "SKKU-삼성생명 라이프놀로지랩 1기" },
            { label: "기간", value: "2024.10 ~ 2025.01" },
            { label: "도구", value: "Figma, Runway Gen, Fixcap" },
          ],
          metrics: [
            { label: "프로그램", value: "라이프놀로지랩 1기", note: "SKKU × 삼성생명" },
            { label: "산출물", value: "앱 프로토타입", note: "웨어러블 연동 UX" },
            { label: "핵심 센서", value: "fNIRS", note: "기능적 근적외선 분광법 기반" },
            { label: "서비스 영역", value: "식습관", note: "개입·관리" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "식습관 개입은 의지보다 '인지 시점'을 포착하는 경험 설계가 핵심이었습니다.",
              bullets: [
                "단순 칼로리 기록 앱은 식욕이 올라오는 순간을 놓치기 쉬움",
                "fNIRS 센서 데이터를 일반 사용자가 이해·신뢰할 수 있는 UX가 필요",
                "웨어러블 링 착용성과 앱 사용 맥락을 동시에 고려해야 함",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              summary: "초기 기획과 경험 설계, 목업 설계 등을 맡아 팀 산출물의 중심 흐름을 잡았습니다.",
              bullets: [
                "식습관 개입 시나리오별 앱 핵심 화면 플로우·인터랙션 기획",
                "Figma 프로토타입 제작 및 팀 내 사용자 여정 정리",
                "Runway Gen·Fixcap으로 서비스 컨셉 영상·비주얼 에셋 제작 지원",
              ],
            },
            {
              id: "method",
              title: "방법",
              summary: "페르소나 기반 워크숍과 프로토타이핑을 반복하며 서비스 경험을 구체화했습니다.",
              bullets: [
                "fNIRS 신호 → 식욕 알림 → 개입 가이드로 이어지는 사용자 여정 정의",
                "Figma로 와이어프레임·클릭 가능 프로토타입 제작",
                "팀 워크숍에서 페르소나·사용 맥락 피드백을 반영해 UX 수정",
              ],
            },
            {
              id: "outcome",
              title: "성과",
              summary: "웨어러블-앱 연동 경험을 설명할 수 있는 기획 산출물을 완성했습니다.",
              bullets: [
                "웨어러블 링 ↔ 모바일 앱 연동 UX 플로우 완성",
                "서비스 컨셉을 전달하는 프로토타입·비주얼 산출물 확보",
                "디지털 헬스 기기 기획 프로세스 전반 경험",
              ],
            },
          ],
        },
      },
      {
        id: "03",
        title: "총학생회 인권복지국원 활동",
        category: "Teamwork",
        images: ["/works/03.jpg", "/works/03-b.jpg"],
        description:
          "총학생회 소속으로 학생 설문 데이터를 수집·분석하여 도서관 리모델링 방향을 도출하고, 배리어프리맵 설계 의견을 조율한 프로젝트입니다.",
        panel: {
          sectionLabel: "Research Case",
          subtitle:
            "약 800명 학생 설문을 설계·분석해 도서관 리모델링 우선순위를 도출하고, 학생회-학교 간 의견을 조율한 공간 연구 프로젝트입니다.",
          meta: [
            { label: "역할", value: "인권복지국원" },
            { label: "소속", value: "성균관대학교 제55대 총학생회" },
            { label: "기간", value: "2022.11 ~ 2023.11" },
            { label: "도구", value: "Google Forms, Excel" },
          ],
          metrics: [
            { label: "설문 응답", value: "800명", note: "재학생 대상" },
            { label: "목표 만족도", value: "87%", note: "공간 개선 후" },
            { label: "조사 기간", value: "1년", note: "기획·집행" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "리모델링 필요성은 공감되지만, 학생 니즈가 정량적으로 정리되지 않았습니다.",
              bullets: [
                "좌석·조명·소음 등 불만은 많았으나 개선 우선순위 근거가 부족",
                "학생회 제안과 학교 예산·일정 사이에서 객관적 데이터가 필요",
                "설문 설계 없이 진행하면 대표성 없는 의견에 치우칠 위험",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              summary: "설문 전 과정과 분석 결과의 기획 반영을 담당했습니다.",
              bullets: [
                "이용 목적·불편 요인·개선 희망 항목 중심 설문 문항 설계",
                "응답 데이터 수집·정제 및 항목별 빈도·교차 분석",
                "분석 결과를 공간 기획안에 반영하고 이해관계자 간 의견 조율",
              ],
            },
            {
              id: "method",
              title: "방법",
              summary: "설문 설계 → 수집 → 분석 → 기획 반영의 연구 프로세스로 진행했습니다.",
              bullets: [
                "좌석 밀도, 소음, 콘센트, 개방감 등 공간 요소별 문항 구성",
                "응답자 학년·이용 빈도별 교차 분석으로 우선순위 도출",
                "분석 결과를 시각 자료로 정리해 학생회·학교 미팅에 제시",
              ],
            },
            {
              id: "results",
              title: "결과",
              summary: "데이터 기반 리모델링 방향을 확정하는 근거를 마련했습니다.",
              bullets: [
                "약 800명 설문 분석 완료",
                "공간 만족도 87% 이상을 목표로 한 개선 항목·우선순위 도출",
                "학생 니즈가 반영된 리모델링 기획 근거 문서화",
              ],
            },
          ],
        },
      },
      {
        id: "04",
        title: "스포츠과학대학 학생회-학과 맞춤형 기업 제휴 사업",
        category: "Teamwork",
        description:
          "재학생 니즈 분석을 바탕으로 학과 맞춤형 기업 제휴를 기획·추진한 프로젝트입니다.",
        panel: {
          sectionLabel: "Business Case",
          subtitle:
            "200명 재학생 니즈 조사로 제휴 우선순위를 정하고, 학과 맞춤형 기업 제휴를 기획·협상·실행한 사업 기획 프로젝트입니다.",
          meta: [
            { label: "역할", value: "대외협력국 차장" },
            { label: "소속", value: "성균관대학교 스포츠과학대학 학생회" },
            { label: "기간", value: "2021.10 ~ 2022.10" },
            { label: "도구", value: "Google Forms, Excel" },
          ],
          metrics: [
            { label: "설문 분석", value: "200명", note: "재학생 대상" },
            { label: "제휴 물량", value: "+30%", note: "기존 대비" },
            { label: "업무 범위", value: "기획~실행", note: "전 과정" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "기존 제휴는 관행 중심이라 학생 실제 니즈와 맞지 않는 항목이 많았습니다.",
              bullets: [
                "운동용품·보조제·시설 할인 등 니즈가 분산되어 협상 포인트가 불명확",
                "기업 측에 제시할 학생 수요 근거 자료 부족",
                "학생회 차원의 제휴 물량·조건 개선 필요",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              summary: "니즈 조사부터 협상 자료 작성, 기업 커뮤니케이션까지 대외협력 전반을 담당했습니다.",
              bullets: [
                "운동용품·시설·교육 등 카테고리별 설문 설계 및 200명 응답 분석",
                "분석 결과 기반 제휴 제안서·협상 자료 작성",
                "학생회-기업 간 미팅 일정·조건 조율 및 실행 follow-up",
              ],
            },
            {
              id: "method",
              title: "방법",
              summary: "니즈 조사 → 우선순위 도출 → 제안서 작성 → 협상의 사이클로 진행했습니다.",
              bullets: [
                "학년·운동 종목별 니즈 교차 분석으로 제휴 우선순위 설정",
                "수요 상위 항목을 중심으로 기업별 맞춤 제안서 구성",
                "협상 결과를 실행 일정·물량 배분에 반영",
              ],
            },
            {
              id: "results",
              title: "결과",
              summary: "학생 니즈 기반 제휴 구조로 전환하며 물량도 늘렸습니다.",
              bullets: [
                "제휴 물품 수량 기존 대비 30% 증가",
                "설문 근거 기반 제휴 구조로 전환",
                "기획-협상-실행 사이클 전 과정 경험",
              ],
            },
          ],
        },
      },
      {
        id: "05",
        title: "대한체육회 국대스마터즈 1기",
        category: "Sports Marketing",
        images: ["/works/05.jpg", "/works/05-b.jpg"],
        description:
          "스포츠 종목 홍보 콘텐츠를 기획·제작하고, 디지털 채널 기반 마케팅 전략을 수행한 프로젝트입니다.",
        panel: {
          sectionLabel: "Marketing Case",
          subtitle:
            "수영 종목의 매력을 대중에게 전달하기 위해 디지털 채널 홍보 콘텐츠를 기획·제작·배포한 스포츠 마케팅 대외활동입니다.",
          meta: [
            { label: "역할", value: "대외활동 팀원" },
            { label: "소속", value: "대한체육회 국대스마터즈 1기 (수영)" },
            { label: "기간", value: "2022.04 ~ 2022.11" },
            { label: "채널", value: "SNS·디지털 미디어" },
          ],
          metrics: [
            { label: "담당 종목", value: "수영", note: "국대스마터즈 1기" },
            { label: "활동 기간", value: "8개월", note: "2022.04~11" },
            { label: "콘텐츠", value: "다수 제작", note: "영상·카드뉴스" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "수영은 대중적 관심이 낮아 종목의 매력을 쉽게 전달할 채널이 필요했습니다.",
              bullets: [
                "경기 규칙·선수 스토리가 대중에게 잘 전달되지 않음",
                "오프라인 행사만으로는 지속적 노출·관심 유도가 어려움",
                "팀 단위로 일관된 캠페인 메시지가 필요",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              summary: "콘텐츠 기획부터 채널 운영 보조까지 홍보 실행에 참여했습니다.",
              bullets: [
                "선수 인터뷰·훈련 현장 기반 홍보 콘텐츠 아이디어 도출",
                "카드뉴스·숏폼 등 채널별 포맷에 맞춘 제작 지원",
                "디지털 채널 업로드·운영 보조 및 캠페인 메시지 정리",
              ],
            },
            {
              id: "method",
              title: "방법",
              summary: "스토리텔링 중심으로 종목 이해를 높이는 콘텐츠를 제작했습니다.",
              bullets: [
                "선수 일상·훈련·경기 하이라이트를 연결한 스토리 라인 구성",
                "채널별(인스타·유튜브 등) 포맷·톤앤매너에 맞춘 콘텐츠 제작",
                "팀 피드백 라운드로 메시지·비주얼 방향 조율",
              ],
            },
            {
              id: "outcome",
              title: "성과",
              summary: "수영 종목 홍보 콘텐츠를 다수 제작하며 마케팅 실무를 경험했습니다.",
              bullets: [
                "종목 홍보용 콘텐츠 다수 제작·배포",
                "스포츠 마케팅 기획-제작-배포 프로세스 경험",
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
          sectionLabel: "Data Viz Case",
          subtitle:
            "시니어 헬스케어 실증사업의 참여·데이터·성과 지표를 한 화면에 모아, B2B 미팅과 홍보에서 즉시 설명 가능한 인터랙티브 대시보드를 Figma로 기획한 프로젝트입니다.",
          meta: [
            { label: "역할", value: "연구원 / 기획" },
            { label: "소속", value: "가천대학교 산학협력단 지능형 홈케어 기반구축 사업단" },
            { label: "기간", value: "2025.03 ~ 2026.03" },
            { label: "도구", value: "Figma, Looker Studio" },
          ],
          metrics: [
            { label: "B2B 지원", value: "5건", note: "의사결정 지원" },
            { label: "핵심 KPI", value: "4종", note: "참여·데이터·성과" },
            { label: "산출물", value: "프로토타입", note: "Figma 인터랙티브" },
          ],
          blocks: [
            {
              id: "problem",
              title: "문제",
              summary: "사업 성과를 설명할 때 수치가 엑셀·보고서에 흩어져 의사결정이 느렸습니다.",
              bullets: [
                "참여자 수·리텐션·데이터 유효성 등 KPI가 파일마다 다른 형식으로 존재",
                "B2B 미팅·홍보 현장에서 즉시 보여줄 시각 자료가 없음",
                "운영 현황과 성과를 하나의 스토리로 연결하는 도구 부재",
              ],
            },
            {
              id: "role",
              title: "내 역할",
              summary: "대시보드 IA 설계부터 KPI 정의, Figma 프로토타입 제작까지 기획 전반을 담당했습니다.",
              bullets: [
                "참여자·데이터 품질·성과 지표를 연결하는 대시보드 정보 구조(IA) 설계",
                "B2B 미팅 맥락에 맞는 핵심 KPI 선정 및 시각화 우선순위 정의",
                "Figma 기반 인터랙티브 프로토타입 제작 및 이해관계자 공유",
              ],
            },
            {
              id: "method",
              title: "방법",
              summary: "현장 운영 데이터를 읽고, 의사결정자 시선에서 화면을 설계했습니다.",
              bullets: [
                "운영팀·연구팀이 자주 쓰는 지표를 인터뷰·회의로 수집",
                "Overview → 참여 현황 → 데이터 품질 → 성과 순 화면 흐름 구성",
                "Figma 컴포넌트로 필터·드릴다운 인터랙션을 프로토타이핑",
              ],
            },
            {
              id: "outcome",
              title: "성과",
              summary: "사업 현황을 한눈에 설명하는 대시보드 프로토타입을 완성했습니다.",
              bullets: [
                "사업 현황·성과를 설명하는 인터랙티브 대시보드 프로토타입 완성",
                "B2B 용역 체결 의사결정 지원 5건에 활용",
                "데이터 기획과 시각화 역량을 연결한 실무 산출물 확보",
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
