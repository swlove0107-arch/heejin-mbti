"use client";

import { useState } from "react";
import Link from "next/link";
import CharacterViewer from "@/components/3d/CharacterViewer";
import { mbtiTypes } from "@/data/types";

// 4줄 4칸 (4x4) 정렬을 위한 16가지 성격 유형 코드 배열
const TYPE_GRID = [
  ["INTJ", "INTP", "ENTJ", "ENTP"], // 1행: 직관·사고 (분석형)
  ["INFJ", "INFP", "ENFJ", "ENFP"], // 2행: 직관·감정 (이상형)
  ["ISTJ", "ISFJ", "ESTJ", "ESFJ"], // 3행: 감각·판단 (수호형)
  ["ISTP", "ISFP", "ESTP", "ESFP"], // 4행: 감각·인식 (모험형)
];

// 찌니 MBTI 유형 도감 화면 (/types)
export default function TypesPage() {
  // 현재 상단 3D 캔버스에 표시할 선택된 MBTI 유형 코드 상태 (기본값: ISFJ 곰)
  const [selectedCode, setSelectedCode] = useState<string>("ISFJ");

  // 현재 선택된 유형의 상세 데이터 조회
  const currentInfo = mbtiTypes[selectedCode] || mbtiTypes.ISFJ;

  return (
    <div className="flex-1 flex flex-col items-center py-2">
      {/* 1. 상단 타이틀 */}
      <div className="w-full text-center mb-4">
        <span className="px-3.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100/70 rounded-full mb-2 inline-block">
          찌니 3D 동물 도감
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-1">
          유형 도감
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          아래 버튼을 눌러 16가지 동물 친구들을 직접 돌려보고 탭해 보세요!
        </p>
      </div>

      {/* 2. 상단: 선택한 유형의 3D 캐릭터 캔버스 (화면 전체에서 3D 캔버스는 단 1개만 사용) */}
      <div
        className="w-full rounded-3xl p-4 sm:p-5 border-2 shadow-xl mb-4 flex flex-col items-center transition-all duration-300"
        style={{
          backgroundColor: `${currentInfo.color}15`,
          borderColor: `${currentInfo.color}50`,
          boxShadow: `0 12px 30px -10px ${currentInfo.color}40`,
        }}
      >
        {/* 상단 힌트 라벨 */}
        <div className="w-full flex items-center justify-between mb-1 px-1">
          <span
            className="text-xs font-black px-2.5 py-0.5 rounded-full text-white shadow-xs"
            style={{ backgroundColor: currentInfo.color }}
          >
            {currentInfo.character.animal}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            🔄 돌려보고 👆 탭하여 점프
          </span>
        </div>

        {/* 3D 캐릭터 렌더링 캔버스 영역 (화면에 꽉 차는 시원한 크기) */}
        <div className="w-full h-[310px] sm:h-[350px] relative rounded-2xl overflow-hidden">
          <CharacterViewer typeCode={selectedCode} />
        </div>
      </div>

      {/* 3. 중단: 선택한 캐릭터 상세 정보 및 '자세히 보기' 버튼 */}
      <div className="w-full bg-white/95 border border-slate-100 rounded-3xl p-5 shadow-sm mb-6 text-center">
        {/* 유형 코드 & 한글 별명 */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span
            className="text-2xl font-black tracking-wider"
            style={{ color: currentInfo.color }}
          >
            {currentInfo.code}
          </span>
          <span className="text-sm font-bold text-slate-700">
            &ldquo;{currentInfo.nickname}&rdquo;
          </span>
        </div>

        {/* 캐릭터 이름 */}
        <h2 className="text-lg font-black text-slate-800 mb-2">
          {currentInfo.character.name}
        </h2>

        {/* 한 줄 소개 */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-[340px] mx-auto leading-relaxed mb-4 break-keep">
          {currentInfo.summary}
        </p>

        {/* 자세히 보기 버튼 (/result/유형코드 이동) */}
        <Link
          href={`/result/${currentInfo.code}`}
          className="inline-flex items-center justify-center gap-1.5 w-full py-3.5 px-5 text-sm font-bold text-white rounded-2xl shadow-md transition-all active:scale-[0.98]"
          style={{
            backgroundColor: currentInfo.color,
            boxShadow: `0 8px 20px -6px ${currentInfo.color}60`,
          }}
        >
          <span>{currentInfo.code} 성격 분석 자세히 보기</span>
          <span>→</span>
        </Link>
      </div>

      {/* 4. 하단: 16개 유형 버튼 (4줄 4칸 그리드) */}
      <div className="w-full">
        <h3 className="text-xs font-bold text-slate-600 mb-2.5 px-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>🐾</span>
            <span>유형 선택 (4×4)</span>
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            원하는 버튼을 누르면 위 캐릭터가 변경됩니다
          </span>
        </h3>

        {/* 4줄 4칸 그리드 컨테이너 */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {TYPE_GRID.flat().map((code) => {
            const item = mbtiTypes[code];
            const isSelected = selectedCode === code;

            return (
              <button
                key={code}
                onClick={() => setSelectedCode(code)}
                className={`py-2.5 px-1 rounded-2xl border text-center transition-all flex flex-col items-center justify-center active:scale-95 ${
                  isSelected
                    ? "bg-white shadow-md scale-[1.03] ring-2 ring-offset-1"
                    : "bg-white/80 hover:bg-white text-slate-600 border-slate-200/70 hover:shadow-xs"
                }`}
                style={{
                  borderColor: isSelected ? item.color : undefined,
                  boxShadow: isSelected ? `0 0 0 2px ${item.color}80` : undefined,
                }}
              >
                {/* 유형 코드 */}
                <span
                  className="text-xs sm:text-sm font-black tracking-tight"
                  style={{ color: isSelected ? item.color : "#334155" }}
                >
                  {code}
                </span>

                {/* 동물 이름 */}
                <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {item.character.animal}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
