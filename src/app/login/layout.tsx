import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "희진 MBTI에 로그인하여 나만의 성격 유형 검사 결과를 안전하게 보관하세요.",
  openGraph: {
    title: "로그인 | 희진 MBTI",
    description: "희진 MBTI에 로그인하여 나만의 성격 유형 검사 결과를 안전하게 보관하세요.",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
