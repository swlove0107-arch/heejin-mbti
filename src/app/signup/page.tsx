/**
 * 회원가입 페이지 (/signup)
 *
 * - 닉네임, 이메일, 비밀번호, 비밀번호 확인 입력
 * - 닉네임은 user_metadata.nickname 에 저장한다
 * - 가입 성공 시 바로 로그인 → 홈으로 이동
 * - 이메일 인증이 켜져 있으면 안내 메시지 표시
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Supabase 에러 메시지를 한국어로 바꾼다
function translateError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("already registered") || lower.includes("already been registered"))
    return "이미 가입된 이메일이에요.";
  if (lower.includes("valid email"))
    return "올바른 이메일 형식을 입력해 주세요.";
  if (lower.includes("password") && (lower.includes("short") || lower.includes("at least")))
    return "비밀번호는 6자 이상이어야 해요.";
  if (lower.includes("signup is disabled"))
    return "현재 회원가입이 중단되어 있어요.";
  return message;
}

export default function SignupPage() {
  const router = useRouter();

  // 입력 필드 상태
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // UI 상태
  const [error, setError] = useState("");
  const [info, setInfo] = useState(""); // 이메일 인증 안내용
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    // 클라이언트 유효성 검사
    if (!nickname.trim()) {
      setError("닉네임을 입력해 주세요.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 해요.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호 확인이 일치하지 않아요.");
      return;
    }

    setLoading(true);

    // Supabase 회원가입 (닉네임을 user_metadata 에 함께 저장)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname: nickname.trim() },
      },
    });

    if (signUpError) {
      setError(translateError(signUpError.message));
      setLoading(false);
      return;
    }

    // 이메일 인증이 켜져 있으면 세션이 없을 수 있다
    if (data.session) {
      // 바로 로그인됨 → 홈으로 이동
      router.push("/");
    } else {
      // 이메일 인증 필요
      setInfo("가입 확인 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      <h1 className="text-2xl font-extrabold text-emerald-700 mb-8">회원가입</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        {/* 닉네임 */}
        <div>
          <label htmlFor="nickname" className="block text-sm font-semibold text-slate-600 mb-1">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="예: 찌니"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition text-sm"
            required
          />
        </div>

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
            비밀번호 (6자 이상)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition text-sm"
            required
            minLength={6}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-slate-600 mb-1">
            비밀번호 확인
          </label>
          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition text-sm"
            required
            minLength={6}
          />
        </div>

        {/* 오류 메시지 */}
        {error && (
          <p className="text-sm text-red-500 font-medium bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* 이메일 인증 안내 */}
        {info && (
          <p className="text-sm text-emerald-600 font-medium bg-emerald-50 rounded-lg px-3 py-2">
            {info}
          </p>
        )}

        {/* 가입 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "처리 중..." : "가입하기"}
        </button>
      </form>

      {/* 로그인 페이지로 가는 링크 */}
      <p className="mt-6 text-sm text-slate-500">
        이미 회원이신가요?{" "}
        <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
