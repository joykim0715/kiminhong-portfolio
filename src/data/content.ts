/**
 * 사이트 전체 텍스트 — 여기서 수정하면 Hero / Gallery / About 등에 반영됩니다.
 */
export const siteContent = {
  meta: {
    title: "김인홍 — Healthcare Portfolio",
    description:
      "헬스케어 신입 김인홍의 포트폴리오. 스포츠과학, 데이터 분석, 디지털 헬스케어 프로젝트를 소개합니다.",
  },
  hero: {
    tagline: "senior healthcare researcher",
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
    saraminCtaLabel: "이력서 확인하기",
    saraminUrl: "https://www.saramin.co.kr",
  },
  bridge: {
    line1: "스포츠과학과 디지털헬스의 교차점에서,",
    line2: "건강한 삶의 가치를 함께 찾아갑니다.",
  },
  works: {
    sectionLabel: "Portfolio",
    title: "Major projects & Certificates",
  },
  gallery: {
    sectionLabel: "Inspiration",
    title: "Beyond the screen",
    description:
      "Travel, nature, lifestyle, and photography — moments that shape perspective.",
  },
  about: {
    sectionLabel: "About",
    headline: "건강한 삶의 가치를 함께 찾겠습니다.",
    bio: "헬스케어 신입 김인홍입니다. 스포츠과학 전문성과 데이터 문해력을 바탕으로 차세대 헬스케어 시장을 이끌겠습니다.",
    email: "recead0715@naver.com",
    phone: "010-4272-3945",
    copyright: "김인홍",
  },
  socialLinks: [
    { label: "Saramin", href: "https://www.saramin.co.kr" },
    { label: "Email", href: "mailto:recead0715@naver.com" },
  ],
};
