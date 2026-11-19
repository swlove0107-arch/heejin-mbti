"use client";

import dynamic from "next/dynamic";

// WebGL 브라우저 전용 3D 캔버스를 SSR에서 제외하여 동적 로드
const DynamicCharacterCanvas = dynamic(
  () => import("./CharacterCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-xs font-bold text-emerald-700/70 animate-pulse select-none">
        <span className="text-3xl mb-2">🐾</span>
        <span>캐릭터 불러오는 중...</span>
      </div>
    ),
  }
);

interface CharacterViewerProps {
  typeCode?: string;
  className?: string;
}

// 3D 캐릭터 뷰어 래퍼 컴포넌트
export default function CharacterViewer({ typeCode = "ISFJ", className = "" }: CharacterViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <DynamicCharacterCanvas typeCode={typeCode} />
    </div>
  );
}
