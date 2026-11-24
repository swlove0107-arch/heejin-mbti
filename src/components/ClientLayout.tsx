/**
 * ClientLayout — 클라이언트 컴포넌트로 분리한 레이아웃 본문
 *
 * - AuthProvider 로 로그인 상태를 앱 전체에 공급한다
 * - 헤더 메뉴: 유형 도감, 통계, 마이페이지(로그인 시), 로그인/로그아웃
 * - 휴대폰 너비(375px)에서도 줄바꿈 없이 한 줄에 들어오도록 컴팩트한 여백 적용
 */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";

// 헤더 오른쪽 인증 관련 메뉴 (로그인 상태에 따라 바뀜)
function HeaderAuthMenu() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // 로그인 상태 확인 중 깜빡임 방지용 스켈레톤 공간
  if (loading) {
    return <span className="w-10 h-6" aria-hidden />;
  }

  if (user) {
    // 로그인 상태: "마이페이지" + "로그아웃"
    return (
      <div className="flex items-center gap-1">
        <Link
          href="/mypage"
          className="text-[11px] sm:text-xs font-bold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-all active:scale-95 shadow-2xs"
        >
          마이페이지
        </Link>
        <button
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
          className="text-[11px] sm:text-xs font-bold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-white/80 text-slate-600 hover:bg-white transition-all active:scale-95 shadow-2xs"
        >
          로그아웃
        </button>
      </div>
    );
  }

  // 로그아웃 상태: "로그인" 링크
  return (
    <Link
      href="/login"
      className="text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/80 text-slate-600 hover:bg-white transition-all active:scale-95 shadow-2xs"
    >
      로그인
    </Link>
  );
}

// 전체 레이아웃 본문
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {/* 써니 MBTI 디자인의 컨테이너: 최대 너비 480px, 따뜻한 핑크-로즈 그라데이션 */}
      <div className="w-full max-w-[480px] min-h-dvh flex flex-col bg-gradient-to-b from-[#fff5f8] via-[#ffecf2] to-[#ffe4ed] shadow-[0_8px_32px_rgba(236,72,153,0.12)] sm:border-x sm:border-pink-200/60">
        {/* 상단 헤더: 블러 효과와 핑크빛 테두리 */}
        <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-pink-200/70 px-2.5 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-1">
            {/* 왼쪽: 로고 (해님 ☀️ 뱃지 + 희진 MBTI) */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-1 sm:gap-1.5 whitespace-nowrap text-[13px] sm:text-lg font-extrabold tracking-tight text-slate-800 hover:text-pink-600 transition-colors"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-200 to-rose-200 text-xs sm:text-base shadow-xs"
              >
                ☀️
              </span>
              <span>희진 MBTI</span>
            </Link>

            {/* 오른쪽 메뉴: 유형 도감, 통계, 로그인/마이페이지 */}
            <nav aria-label="주요 메뉴" className="flex items-center gap-1 sm:gap-1.5">
              <Link
                href="/types"
                className="inline-flex items-center whitespace-nowrap rounded-full bg-pink-100 px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-pink-700 shadow-2xs hover:bg-pink-200/80 active:scale-95 transition-all"
              >
                유형 도감
              </Link>
              <Link
                href="/stats"
                className="inline-flex items-center whitespace-nowrap rounded-full bg-purple-100 px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-purple-700 shadow-2xs hover:bg-purple-200/80 active:scale-95 transition-all"
              >
                통계
              </Link>
              <HeaderAuthMenu />
            </nav>
          </div>
        </header>

        {/* 메인 본문 콘텐츠 영역 */}
        <main className="flex-1 flex flex-col px-5 py-6">{children}</main>
      </div>
    </AuthProvider>
  );
}
