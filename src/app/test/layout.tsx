import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "성격 유형 검사",
  description: "12개 간단한 질문에 답하고 나의 MBTI 유형과 3D 동물 캐릭터를 찾아보세요.",
  openGraph: {
    title: "성격 유형 검사 | 희진 MBTI",
    description: "12개 간단한 질문에 답하고 나의 MBTI 유형과 3D 동물 캐릭터를 찾아보세요.",
  },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
