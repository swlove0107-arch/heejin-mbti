/**
 * ClientLayout — 클라이언트 컴포넌트로 분리한 레이아웃 본문
 *
 * - AuthProvider 로 로그인 상태를 앱 전체에 공급한다
 * - 헤더에서 로그인/로그아웃 메뉴를 조건부로 보여준다
 * - 로그인 상태 확인 중에는 메뉴 자리를 비워서 깜빡임을 방지한다
 */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";

// 헤더 오른쪽 메뉴 (로그인 상태에 따라 바뀜)
function HeaderAuthMenu() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // 로그인 상태를 확인하는 동안에는 자리만 차지하고 비워 둔다
  // → 메뉴가 깜빡이지 않는다
  if (loading) {
    return <span className="w-14 h-7" aria-hidden />;
  }

  if (user) {
    // 로그인 상태: "로그아웃" 버튼
    return (
      <button
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
      >
        로그아웃
      </button>
    );
  }

  // 로그아웃 상태: "로그인" 링크
  return (
    <Link
      href="/login"
      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
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
        {/* 상단 헤더: 서비스 이름(왼쪽)과 메뉴(오른쪽) */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 px-4 py-3.5 flex items-center justify-between">
          {/* 왼쪽: 서비스 이름 (누르면 홈으로 이동) */}
          <Link
            href="/"
            className="text-lg font-extrabold tracking-tight text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
          >
            <span className="text-xl">🐾</span>
            <span>찌니 MBTI</span>
          </Link>

          {/* 오른쪽 메뉴: 유형 도감 + 로그인/로그아웃 */}
          <nav className="flex items-center gap-1.5">
            <Link
              href="/types"
              className="text-xs font-semibold px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all active:scale-95"
            >
              유형 도감
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
