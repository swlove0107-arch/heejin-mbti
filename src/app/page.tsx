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

// 희진 MBTI 첫 화면 (홈 화면: /)
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
    <div className="flex flex-1 flex-col justify-between gap-6 rounded-3xl bg-pink-100/45 p-3.5">
      {/* 1. 상단 히어로 카드: 3D 캐릭터 쇼케이스 & 검사 시작 */}
      <section className="relative overflow-hidden rounded-3xl border border-pink-200/80 bg-gradient-to-br from-pink-100 via-rose-100/90 to-pink-200/75 p-6 text-center shadow-[0_12px_30px_rgba(244,114,182,0.2)]">
        {/* 상단 뱃지 */}
        <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-bold text-pink-600 shadow-2xs">
          <span aria-hidden="true">✨</span>
          <span>나와 닮은 동물 친구 찾기</span>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-[28px] leading-tight font-extrabold tracking-tight text-slate-800">
          나는 어떤 유형일까?
        </h1>

        {/* 서브 설명 문구 */}
        <p className="mt-2 text-sm leading-relaxed font-medium text-slate-700 break-keep">
          12개의 질문으로 나의 성격 유형과 찰떡궁합인 3D 동물 캐릭터를 알아보세요!
        </p>

        {/* 3D 캔버스 영역 */}
        <div className="my-3 flex flex-col items-center">
          <div
            className="h-56 w-full rounded-3xl border border-white/80 shadow-inner transition-colors duration-500"
            style={{ backgroundColor: "#DCD6F766" }}
          >
            <div className="relative h-full w-full cursor-grab active:cursor-grabbing">
              <CharacterViewer typeCode={currentCode} />
            </div>
          </div>

          {/* 동물 캐릭터 라벨 뱃지 */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-extrabold text-slate-700 shadow-2xs">
            <span className="text-pink-600">{currentInfo.code}</span>
            <span aria-hidden="true">·</span>
            <span>
              {currentInfo.character.name} ({currentInfo.character.animal})
            </span>
          </div>
        </div>

        {/* 검사 시작하기 큰 버튼 */}
        <div className="mt-5">
          <Link
            href="/test"
            className="flex w-full items-center justify-center gap-2.5 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 px-8 py-5 text-xl font-extrabold text-white shadow-[0_10px_26px_rgba(236,72,153,0.42)] hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <span>검사 시작하기</span>
            <span aria-hidden="true" className="text-2xl leading-none">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* 2. 서비스 특징 카드 3개 */}
      <section aria-label="서비스 특징" className="flex flex-col gap-3">
        {/* 특징 1 */}
        <div className="flex items-start gap-3.5 rounded-2xl border p-4 shadow-[0_4px_14px_rgba(244,114,182,0.1)] backdrop-blur-xs bg-white/90 border-pink-200/80">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl shadow-2xs bg-pink-100 text-pink-700"
          >
            ⏱️
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-base font-extrabold text-slate-800">12문항 · 2분</h2>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600 break-keep">
              출퇴근길이나 쉬는 시간에 부담 없이 빠르게 답할 수 있어요.
            </p>
          </div>
        </div>

        {/* 특징 2 */}
        <div className="flex items-start gap-3.5 rounded-2xl border p-4 shadow-[0_4px_14px_rgba(244,114,182,0.1)] backdrop-blur-xs bg-white/90 border-rose-200/80">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl shadow-2xs bg-rose-100 text-rose-700"
          >
            🧩
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-base font-extrabold text-slate-800">16가지 유형</h2>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600 break-keep">
              나의 에너지 방향과 판단 기준을 조합해 16가지 성격 유형을 분석해요.
            </p>
          </div>
        </div>

        {/* 특징 3 */}
        <div className="flex items-start gap-3.5 rounded-2xl border p-4 shadow-[0_4px_14px_rgba(244,114,182,0.1)] backdrop-blur-xs bg-white/90 border-fuchsia-200/80">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl shadow-2xs bg-fuchsia-100 text-fuchsia-700"
          >
            🐾
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-base font-extrabold text-slate-800">유형별 3D 캐릭터</h2>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600 break-keep">
              내 성격 유형과 꼭 닮은 귀여운 3D 동물 캐릭터를 만날 수 있어요.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 하단 저작권 / 간이 검사 고지 */}
      <footer className="pt-2 pb-1 text-center">
        <p className="text-[11px] leading-relaxed text-rose-400/90 break-keep">
          이 검사는 재미로 보는 간이 검사이며, 공식 MBTI® 검사가 아닙니다.
        </p>
      </footer>
    </div>
  );
}
