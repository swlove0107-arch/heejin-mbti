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
    default: "희진 MBTI | 3D 동물 캐릭터 성격 유형 검사",
    template: "%s | 희진 MBTI",
  },
  description:
    "12개 질문을 통과하면 나와 꼭 닮은 3D 동물 캐릭터와 16가지 성격 유형을 알려주는 희진 MBTI",
  openGraph: {
    title: "희진 MBTI | 3D 동물 캐릭터 성격 유형 검사",
    description:
      "12개 질문을 통과하면 나와 꼭 닮은 3D 동물 캐릭터와 16가지 성격 유형을 알려주는 희진 MBTI",
    siteName: "희진 MBTI",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "희진 MBTI | 3D 동물 캐릭터 성격 유형 검사",
    description:
      "12개 질문을 통과하면 나와 꼭 닮은 3D 동물 캐릭터와 16가지 성격 유형을 알려주는 희진 MBTI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <body className="min-h-dvh bg-gradient-to-br from-pink-100/80 via-rose-50 to-pink-100/70 text-slate-800 flex justify-center">
        {/* ClientLayout 에 AuthProvider, 헤더, 메뉴가 모두 들어 있다 */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
