"use client";

import { useEffect, useState } from "react";
import CharacterCanvas from "./CharacterCanvas";

interface CharacterViewerProps {
  typeCode?: string;
  className?: string;
}

// 3D 캐릭터 뷰어 컴포넌트
// dynamic import 대신 마운트 가드를 사용하여 GitHub Pages 등 서브패스 환경에서도
// 비동기 청크 경로 누락 없이 즉시 안정적으로 3D 캔버스를 렌더링합니다.
export default function CharacterViewer({
  typeCode = "ISFJ",
  className = "",
}: CharacterViewerProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center text-xs font-bold text-pink-600 animate-pulse select-none">
        <span className="text-3xl mb-2">🐾</span>
        <span>캐릭터 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <CharacterCanvas typeCode={typeCode} />
    </div>
  );
}
