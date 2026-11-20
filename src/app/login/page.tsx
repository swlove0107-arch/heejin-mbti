/**
 * 로그인 페이지 (/login)
 *
 * - 이메일, 비밀번호 입력
 * - 로그인 성공 시 주소의 next 파라미터가 있으면 그곳으로 이동 (내부 경로만 허용)
 * - 없으면 홈(/)으로 이동
 * - 오류는 한국어로 친절하게 안내
 */
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Supabase 로그인 오류 메시지를 한국어로 변환
function translateError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials") || lower.includes("invalid credentials")) {
    return "이메일 또는 비밀번호가 일치하지 않아요.";
  }
  if (lower.includes("email not confirmed")) {
    return "이메일 인증이 완료되지 않았어요. 메일함을 확인해 주세요.";
  }
  if (lower.includes("rate limit")) {
    return "너무 많은 시도가 있었습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "로그인 중 오류가 발생했어요. 다시 시도해 주세요.";
}

// 실제 로그인 폼 컴포넌트 (useSearchParams 사용하므로 Suspense로 감쌈)
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // next 쿼리 파라미터 확인 및 안전한 내부 주소 검증
  const nextParam = searchParams.get("next");
  const redirectUrl =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(translateError(signInError.message));
      setLoading(false);
      return;
    }

    // 로그인 성공 시 대상 페이지로 이동
    router.push(redirectUrl);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      <h1 className="text-2xl font-extrabold text-emerald-700 mb-8">로그인</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        {/* 이메일 */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-600 mb-1">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition text-sm"
            required
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-600 mb-1">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition text-sm"
            required
          />
        </div>

        {/* 오류 메시지 */}
        {error && (
          <p className="text-sm text-red-500 font-medium bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "처리 중..." : "로그인"}
        </button>
      </form>

      {/* 회원가입 페이지 링크 */}
      <p className="mt-6 text-sm text-slate-500">
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className="text-emerald-600 font-semibold hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center py-12 text-sm text-slate-400">
          페이지 불러오는 중...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
