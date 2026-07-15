/** 배포 URL. 커스텀 도메인 연결 후 Vercel 환경변수 NEXT_PUBLIC_SITE_URL 로 덮어쓰세요. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://kiminhong-portfolio.vercel.app";
