"use client";

import { useState } from "react";
import Link from "next/link";
import { MBTITypeInfo, getTypeInfo } from "@/data/types";

interface ResultContentProps {
  info: MBTITypeInfo;
}

// 찌니 MBTI 상세 결과 컴포넌트 (클라이언트 인터랙션: 주소 복사 공유 등 포함)
export default function ResultContent({ info }: ResultContentProps) {
  // 주소 복사 완료 알림 표시 여부 상태
  const [copied, setCopied] = useState<boolean>(false);

  /**
   * 결과 공유하기: 현재 URL을 클립보드에 복사하고 안내 메시지를 띄우는 함수
   */
  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        // 2.5초 후 복사 완료 안내 숨김
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // 클립보드 API가 차단된 환경일 경우 fallback 알림
      alert("주소를 복사했습니다: " + window.location.href);
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
      <div className="w-full flex flex-col items-center text-center pt-2 mb-6">
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
          "{info.nickname}"
        </h2>
      </div>

      {/* 2. 캐릭터 자리 (대표 색상 배경의 둥근 상자 + 캐릭터 이름) */}
      <div
        className="w-full rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center border shadow-inner mb-6 relative overflow-hidden transition-all"
        style={{
          backgroundColor: `${info.color}18`,
          borderColor: `${info.color}40`,
        }}
      >
        {/* 캐릭터 아이콘 원형 박스 */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-3 shadow-sm"
          style={{ backgroundColor: `${info.color}35` }}
        >
          🐾
        </div>

        {/* 캐릭터 이름 */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 mb-1">
          {info.character.name}
        </h3>

        {/* 동물 종류 표시 */}
        <span className="text-xs font-semibold text-slate-500 mb-3">
          ({info.character.animal})
        </span>

        {/* 3D 캐릭터 도입 예정 안내 뱃지 */}
        <span
          className="px-3 py-1 text-[11px] font-medium rounded-full bg-white/80 shadow-xs border text-slate-600"
          style={{ borderColor: `${info.color}50` }}
        >
          ✨ 귀여운 3D 캐릭터가 다음 단계에서 찾아옵니다!
        </span>
      </div>

      {/* 3. 한 줄 소개 및 성격 상세 설명 카드 */}
      <div className="w-full bg-white/95 border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm mb-5">
        {/* 한 줄 소개 강조 인용구 */}
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

        {/* 3~4문장의 성격 설명 본문 */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
          {info.description}
        </p>
      </div>

      {/* 4. 강점 목록 & 조심할 점 목록 */}
      <div className="w-full space-y-4 mb-6">
        {/* 4-1. 강점 카드 */}
        <div className="bg-white/90 border border-emerald-100/80 rounded-3xl p-5 shadow-sm">
          <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mb-3">
            <span>✨</span>
            <span>나만의 특별한 강점</span>
          </h4>
          <ul className="space-y-2">
            {info.strengths.map((strength, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 break-keep"
              >
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4-2. 조심할 점 카드 */}
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

      {/* 5. 잘 맞는 유형 2개 (누르면 해당 결과 페이지로 바로 이동) */}
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

      {/* 6. 하단 버튼 2개: "다시 검사하기", "결과 공유하기" */}
      <div className="w-full space-y-3 pt-2 pb-4">
        {/* 결과 공유하기 버튼 */}
        <button
          onClick={handleShare}
          className="w-full py-4 px-6 text-center text-sm sm:text-base font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl shadow-sm hover:shadow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>🔗</span>
          <span>결과 공유하기</span>
        </button>

        {/* 다시 검사하기 버튼 */}
        <Link
          href="/test"
          className="block w-full py-4 px-6 text-center text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl shadow-lg shadow-emerald-400/30 active:scale-[0.98] transition-all"
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
