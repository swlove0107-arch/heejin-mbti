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

// 웹 페이지의 기본 메타데이터 설정 (검색엔진 및 브라우저 탭 제목)
export const metadata: Metadata = {
  title: "찌니 MBTI - 나의 성격 유형 알아보기",
  description: "12개 질문으로 알아보는 16가지 성격 유형과 귀여운 3D 동물 캐릭터",
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
