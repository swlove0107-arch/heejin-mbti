import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "16가지 유형 도감",
  description: "16가지 MBTI 성격 유형과 귀여운 3D 동물 친구들의 성격, 특징을 한눈에 살펴보세요.",
  openGraph: {
    title: "16가지 유형 도감 | 희진 MBTI",
    description: "16가지 MBTI 성격 유형과 귀여운 3D 동물 친구들의 성격, 특징을 한눈에 살펴보세요.",
  },
};

export default function TypesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
