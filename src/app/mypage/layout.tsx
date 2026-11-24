import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "내가 저장한 MBTI 성격 유형 검사 결과 목록과 최근 캐릭터를 확인하세요.",
  openGraph: {
    title: "마이페이지 | 희진 MBTI",
    description: "내가 저장한 MBTI 성격 유형 검사 결과 목록과 최근 캐릭터를 확인하세요.",
  },
};

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
