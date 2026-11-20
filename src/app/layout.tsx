import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

// Google Fonts에서 Noto Sans KR 폰트를 불러옵니다.
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

// 웹 페이지의 기본 메타데이터 및 Open Graph 설정
export const metadata: Metadata = {
  title: {
    default: "찌니 MBTI - 16가지 동물 캐릭터 성격 유형 검사",
    template: "%s | 찌니 MBTI",
  },
  description:
    "12개 질문에 답하면 16가지 성격 유형 중 하나와 귀여운 3D 동물 캐릭터를 알려드려요!",
  openGraph: {
    title: "찌니 MBTI - 16가지 동물 캐릭터 성격 유형 검사",
    description:
      "12개 질문에 답하면 16가지 성격 유형 중 하나와 귀여운 3D 동물 캐릭터를 알려드려요!",
    siteName: "찌니 MBTI",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "찌니 MBTI - 16가지 동물 캐릭터 성격 유형 검사",
    description:
      "12개 질문에 답하면 16가지 성격 유형 중 하나와 귀여운 3D 동물 캐릭터를 알려드려요!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <body className="min-h-screen bg-emerald-50/40 text-slate-800 antialiased flex flex-col items-center">
        {/* ClientLayout 에 AuthProvider, 헤더, 메뉴가 모두 들어 있다 */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
