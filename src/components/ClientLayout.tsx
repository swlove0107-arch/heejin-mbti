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
          className="text-[11px] sm:text-xs font-semibold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all active:scale-95"
        >
          마이페이지
        </Link>
        <button
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
          className="text-[11px] sm:text-xs font-semibold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
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
      className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
    >
      로그인
    </Link>
  );
}

// 전체 레이아웃 본문
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {/* 전체 화면을 감싸는 모바일 규격 컨테이너: 최대 너비 480px */}
      <div className="w-full max-w-[480px] min-h-screen bg-white/95 backdrop-blur-sm shadow-xl shadow-emerald-100/40 flex flex-col border-x border-emerald-100/60">
        {/* 상단 헤더 */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
          {/* 왼쪽: 로고 */}
          <Link
            href="/"
            className="text-base sm:text-lg font-extrabold tracking-tight text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 shrink-0"
          >
            <span className="text-lg">🐾</span>
            <span className="hidden min-[360px]:inline">찌니 MBTI</span>
          </Link>

          {/* 오른쪽 메뉴: 유형 도감, 통계, 로그인/마이페이지 */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <Link
              href="/types"
              className="text-[11px] sm:text-xs font-semibold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all active:scale-95"
            >
              도감
            </Link>
            <Link
              href="/stats"
              className="text-[11px] sm:text-xs font-semibold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all active:scale-95"
            >
              통계
            </Link>
            <HeaderAuthMenu />
          </nav>
        </header>

        {/* 메인 본문 콘텐츠 영역 */}
        <main className="flex-1 flex flex-col px-5 py-6">{children}</main>
      </div>
    </AuthProvider>
  );
}
