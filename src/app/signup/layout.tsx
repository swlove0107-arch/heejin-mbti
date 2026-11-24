import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
  description: "희진 MBTI 회원가입하고 검사 결과를 저장해보세요.",
  openGraph: {
    title: "회원가입 | 희진 MBTI",
    description: "희진 MBTI 회원가입하고 검사 결과를 저장해보세요.",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
