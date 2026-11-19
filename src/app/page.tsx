"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CharacterViewer from "@/components/3d/CharacterViewer";
import { mbtiTypes } from "@/data/types";

// 첫 화면에서 3초마다 순환하며 등장할 16가지 성격 유형 목록
const ROTATING_CODES = [
  "ISFJ", // 곰
  "ENFP", // 다람쥐
  "INTJ", // 부엉이
  "ESFP", // 앵무새
  "INTP", // 고양이
  "ENTJ", // 사자
  "INFJ", // 사슴
  "ISTP", // 고슴도치
  "ESFJ", // 양
  "ESTP", // 원숭이
  "INFP", // 토끼
  "ESTJ", // 펭귄
  "ISFP", // 판다
  "ENTP", // 여우
  "ISTJ", // 거북이
  "ENFJ", // 강아지
];

// 찌니 MBTI 첫 화면 (홈 화면: /)
export default function HomePage() {
  // 3초마다 바뀔 현재 캐릭터 인덱스 상태
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // 3초마다 다음 유형으로 자동 변경되는 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % ROTATING_CODES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const currentCode = ROTATING_CODES[currentIdx];
  const currentInfo = mbtiTypes[currentCode] || mbtiTypes.ISFJ;

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center py-2">
      {/* 1. 상단: 타이틀 및 한 줄 소개 문구 */}
      <div className="w-full flex flex-col items-center pt-1 mb-3">
        {/* 한 줄 소개 뱃지 */}
        <span className="px-3.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100/70 rounded-full mb-2">
          🐾 12가지 질문으로 만나는 3D 동물 친구
        </span>

        {/* 큰 메인 제목 */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-1.5">
          나는 어떤 유형일까?
        </h1>

        {/* 소개 문구 */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-[290px] leading-relaxed">
          간단한 질문에 답하고 나를 쏙 빼닮은 포근한 3D 캐릭터와 성격 분석을 만나보세요!
        </p>
      </div>

      {/* 2. 제목 아래: 3D 캐릭터 쇼케이스 (3초마다 다른 유형 동물로 자동 변경) */}
      <div
        className="w-full rounded-3xl p-3 sm:p-4 border shadow-xl mb-5 flex flex-col items-center transition-all duration-500"
        style={{
          backgroundColor: `${currentInfo.color}15`,
          borderColor: `${currentInfo.color}45`,
          boxShadow: `0 10px 25px -8px ${currentInfo.color}35`,
        }}
      >
        {/* 상단 현재 동물 소개 뱃지 */}
        <div className="w-full flex items-center justify-between mb-1 px-1">
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white shadow-xs transition-colors duration-300"
            style={{ backgroundColor: currentInfo.color }}
          >
            {currentInfo.code} · {currentInfo.character.animal}
          </span>
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <span>⏱️</span> 3초마다 변신 중
          </span>
        </div>

        {/* 단 1개의 가벼운 3D 캔버스 영역 (휴대폰에서도 매끄럽게 구동) */}
        <div className="w-full h-[220px] sm:h-[240px] relative rounded-2xl overflow-hidden">
          <CharacterViewer typeCode={currentCode} />
        </div>

        {/* 하단 캐릭터 이름 및 조작 팁 */}
        <div className="mt-1 text-center">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-800">
            {currentInfo.character.name}
          </h2>
          <span className="text-[10px] text-slate-400">
            드래그해서 360도로 돌려보거나 탭해 보세요!
          </span>
        </div>
      </div>

      {/* 3. 특징 카드 3개 */}
      <div className="w-full space-y-2.5 mb-5">
        {/* 특징 카드 1 */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-100/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-200/60 flex items-center justify-center text-xl flex-shrink-0">
            ⏱️
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800">12문항 · 2분</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">핵심 질문만 추려 빠르고 가볍게 검사해요</p>
          </div>
        </div>

        {/* 특징 카드 2 */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-rose-50/70 border border-rose-100/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-rose-200/60 flex items-center justify-center text-xl flex-shrink-0">
            🧩
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800">16가지 유형</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">나의 숨겨진 성향과 성격을 16가지로 분석해요</p>
          </div>
        </div>

        {/* 특징 카드 3 */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-teal-50/70 border border-teal-100/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-200/60 flex items-center justify-center text-xl flex-shrink-0">
            🦊
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800">유형별 3D 캐릭터</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">유형마다 준비된 사랑스러운 동물 친구를 만나요</p>
          </div>
        </div>
      </div>

      {/* 4. 하단 검사 시작 버튼 및 안내 문구 */}
      <div className="w-full space-y-3 pt-1 pb-1">
        <Link
          href="/test"
          className="block w-full py-4 px-6 text-center text-lg font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl shadow-xl shadow-emerald-400/30 active:scale-[0.98] transition-all tracking-wide"
        >
          검사 시작하기
        </Link>

        <p className="text-[11px] text-slate-400 tracking-tight">
          이 검사는 재미로 보는 간이 검사이며, 공식 MBTI® 검사가 아닙니다.
        </p>
      </div>
    </div>
  );
}
