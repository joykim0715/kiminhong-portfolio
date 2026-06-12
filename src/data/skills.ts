import { helixItems } from "./helixItems";

export const skillsContent = {
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
};

export const certificationLabels = helixItems
  .filter((item) => item.type === "Certification")
  .map((item) => item.title);
