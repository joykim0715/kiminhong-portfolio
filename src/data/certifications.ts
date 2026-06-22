export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  { name: "ADsP (데이터 분석 준전문가)", issuer: "한국데이터산업진흥원", year: "2025" },
  { name: "SQLD (SQL 개발자)", issuer: "한국데이터산업진흥원", year: "2025" },
];
