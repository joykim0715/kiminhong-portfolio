/**
 * 프로젝트/작업 목록 — 제목, 카테고리, 이미지, 상세 설명(팝업)을 여기서 수정합니다.
 * 이미지: public/works/ 폴더에 파일 업로드 후 image 경로 지정 (예: "/works/01.jpg")
 */
export type Work = {
  id: string;
  title: string;
  category: string;
  image?: string;
  /** 카드 클릭 시 팝업에 표시되는 상세 설명 */
  description: string;
  /** 팝업 부가 정보 (기간, 역할, 성과 등) */
  details?: string[];
};

export const works: Work[] = [
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
    title: "국대스마터즈 스포츠마케팅",
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
];
