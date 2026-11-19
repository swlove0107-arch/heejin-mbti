import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
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
        {/* 전체 화면을 감싸는 모바일 규격 컨테이너: 최대 너비 480px, 부드러운 민트 테두리와 그림자 */}
        <div className="w-full max-w-[480px] min-h-screen bg-white/95 backdrop-blur-sm shadow-xl shadow-emerald-100/40 flex flex-col border-x border-emerald-100/60">
          {/* 상단 헤더: 서비스 이름(왼쪽)과 메뉴(오른쪽) */}
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 px-5 py-3.5 flex items-center justify-between">
            {/* 왼쪽: 서비스 이름 (누르면 홈으로 이동) */}
            <Link
              href="/"
              className="text-lg font-extrabold tracking-tight text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <span className="text-xl">🐾</span>
              <span>찌니 MBTI</span>
            </Link>

            {/* 오른쪽 메뉴: 현재는 유형 도감 하나만 배치 */}
            <nav className="flex items-center gap-2">
              <Link
                href="/types"
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all active:scale-95"
              >
                유형 도감
              </Link>
            </nav>
          </header>

          {/* 메인 본문 콘텐츠 영역 */}
          <main className="flex-1 flex flex-col px-5 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
