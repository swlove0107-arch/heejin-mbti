/**
 * ResultContent — MBTI 상세 결과 페이지 컴포넌트
 *
 * - 3D 인터랙티브 캐릭터 및 성격 상세 분석 제공
 * - "내 기록에 저장" 기능: 로그인 회원은 DB에 저장, 비로그인은 로그인 페이지로 안내
 * - "결과 공유하기" (클립보드 주소 복사)
 * - "다시 검사하기" (/test 이동)
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MBTITypeInfo, getTypeInfo } from "@/data/types";
import CharacterViewer from "@/components/3d/CharacterViewer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface ResultContentProps {
  info: MBTITypeInfo;
}

export default function ResultContent({ info }: ResultContentProps) {
  const { user } = useAuth();
  const router = useRouter();

  // 주소 복사 완료 알림 표시 여부 상태
  const [copied, setCopied] = useState<boolean>(false);

  // 결과 저장 상태 관리
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>("");

  /**
   * 결과 공유하기: 현재 URL을 클립보드에 복사
   */
  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      alert("주소를 복사했습니다: " + window.location.href);
    }
  };

  /**
   * 내 기록에 저장하기:
   * - 로그인 상태: test_results 테이블에 mbti_type 저장 (user_id, created_at 은 DB 기본값)
   * - 로그아웃 상태: /login?next=/result/유형코드 로 이동
   */
  const handleSaveResult = async () => {
    // 1) 비로그인 상태일 때는 로그인 후 돌아올 수 있도록 next 파라미터와 함께 이동
    if (!user) {
      router.push(`/login?next=/result/${info.code}`);
      return;
    }

    // 2) 로그인 상태면 저장 진행
    setIsSaving(true);
    setSaveError("");

    try {
      const { error } = await supabase.from("test_results").insert({
        mbti_type: info.code,
      });

      if (error) {
        setSaveError("결과를 저장하지 못했어요: " + error.message);
      } else {
        setIsSaved(true);
      }
    } catch {
      setSaveError("네트워크 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center py-2 relative">
      {/* 0. 대표 색상 배경 은은한 광채 효과 */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none -z-10 opacity-30"
        style={{ backgroundColor: info.color }}
      />

      {/* 1. 상단 타이틀 영역: '당신의 유형은' + 유형 코드 + 한글 별명 */}
      <div className="w-full flex flex-col items-center text-center pt-2 mb-4">
        <span className="px-3.5 py-1 text-xs font-semibold text-slate-500 bg-white/80 border border-slate-200/60 rounded-full mb-3 shadow-xs">
          당신의 유형은
        </span>

        {/* 큼직한 MBTI 유형 코드 */}
        <h1
          className="text-5xl sm:text-6xl font-black tracking-wider mb-2 drop-shadow-xs"
          style={{ color: info.color }}
        >
          {info.code}
        </h1>

        {/* 새로 창작한 한글 별명 */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 break-keep">
          &ldquo;{info.nickname}&rdquo;
        </h2>
      </div>

      {/* 2. 3D 인터랙티브 캐릭터 영역 */}
      <div
        className="w-full rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center text-center border shadow-inner mb-6 relative overflow-hidden transition-all"
        style={{
          backgroundColor: `${info.color}15`,
          borderColor: `${info.color}40`,
        }}
      >
        {/* 3D 캔버스 뷰어 */}
        <div className="w-full h-[290px] sm:h-[320px] relative">
          <CharacterViewer typeCode={info.code} />
        </div>

        {/* 캐릭터 이름 및 힌트 라벨 */}
        <div className="mt-2 text-center">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center justify-center gap-1.5">
            <span>🐾</span>
            <span>{info.character.name}</span>
            <span className="text-xs font-medium text-slate-400">({info.character.animal})</span>
          </h3>
          <span className="text-[11px] text-slate-400 mt-1 block">
            💡 드래그하여 360도로 돌려보거나 탭하여 점프시켜 보세요!
          </span>
        </div>
      </div>

      {/* 3. 한 줄 소개 및 성격 상세 설명 카드 */}
      <div className="w-full bg-white/95 border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm mb-5">
        <div
          className="p-3.5 rounded-2xl mb-4 text-center font-bold text-sm sm:text-base border-l-4 break-keep"
          style={{
            backgroundColor: `${info.color}15`,
            borderColor: info.color,
            color: "#1e293b",
          }}
        >
          💡 {info.summary}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
          {info.description}
        </p>
      </div>

      {/* 4. 강점 목록 & 조심할 점 목록 */}
      <div className="w-full space-y-4 mb-6">
        {/* 강점 카드 */}
        <div className="bg-white/90 border border-pink-100/80 rounded-3xl p-5 shadow-sm">
          <h4 className="text-xs font-bold text-pink-700 flex items-center gap-1.5 mb-3">
            <span>✨</span>
            <span>나만의 특별한 강점</span>
          </h4>
          <ul className="space-y-2">
            {info.strengths.map((strength, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 break-keep"
              >
                <span className="text-pink-500 font-bold mt-0.5">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 조심할 점 카드 */}
        <div className="bg-white/90 border border-amber-100/80 rounded-3xl p-5 shadow-sm">
          <h4 className="text-xs font-bold text-amber-700 flex items-center gap-1.5 mb-3">
            <span>💡</span>
            <span>이런 점은 조심해요</span>
          </h4>
          <ul className="space-y-2">
            {info.cautions.map((caution, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 break-keep"
              >
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>{caution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. 잘 맞는 유형 2개 */}
      <div className="w-full bg-white/95 border border-slate-100 rounded-3xl p-5 shadow-sm mb-6">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-3">
          <span>💖</span>
          <span>나와 잘 맞는 단짝 유형</span>
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {info.compatibleTypes.map((targetCode) => {
            const targetInfo = getTypeInfo(targetCode);
            if (!targetInfo) return null;

            return (
              <Link
                key={targetCode}
                href={`/result/${targetCode}`}
                className="p-3.5 rounded-2xl border text-center transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] flex flex-col items-center"
                style={{
                  backgroundColor: `${targetInfo.color}15`,
                  borderColor: `${targetInfo.color}40`,
                }}
              >
                <span
                  className="text-lg font-black tracking-wider mb-0.5"
                  style={{ color: targetInfo.color }}
                >
                  {targetCode}
                </span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1 mb-0.5">
                  {targetInfo.character.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  {targetInfo.character.animal}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 6. 하단 액션 버튼 영역 */}
      <div className="w-full space-y-3 pt-2 pb-4">
        {/* 내 기록에 저장 버튼 */}
        <button
          onClick={handleSaveResult}
          disabled={isSaved || isSaving}
          className={`w-full py-4 px-6 text-center text-sm sm:text-base font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 ${
            isSaved
              ? "bg-rose-50 text-rose-700 border border-rose-200 cursor-default"
              : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-rose-300/40 shadow-md active:scale-[0.98]"
          } disabled:opacity-80`}
        >
          {isSaved ? (
            <>
              <span>✓</span>
              <span>내 기록에 저장했어요</span>
            </>
          ) : isSaving ? (
            <span>저장하는 중...</span>
          ) : (
            <>
              <span>💾</span>
              <span>내 기록에 저장</span>
            </>
          )}
        </button>

        {/* 저장 실패 시 에러 안내 */}
        {saveError && (
          <p className="text-xs text-red-500 font-medium text-center bg-red-50 py-2 px-3 rounded-xl border border-red-100">
            {saveError}
          </p>
        )}

        {/* 결과 공유하기 */}
        <button
          onClick={handleShare}
          className="w-full py-4 px-6 text-center text-sm sm:text-base font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl shadow-sm hover:shadow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>🔗</span>
          <span>결과 공유하기</span>
        </button>

        {/* 다시 검사하기 */}
        <Link
          href="/test"
          className="block w-full py-4 px-6 text-center text-sm sm:text-base font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl active:scale-[0.98] transition-all"
        >
          다시 검사하기
        </Link>
      </div>

      {/* 주소 복사 완료 알림 팝업 토스트 */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/90 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md animate-fade-in z-50 flex items-center gap-2">
          <span>✓</span>
          <span>주소를 복사했어요! 친구들에게 공유해보세요.</span>
        </div>
      )}
    </div>
  );
}
