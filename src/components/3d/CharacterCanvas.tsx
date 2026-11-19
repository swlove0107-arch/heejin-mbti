"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import AnimalCharacter from "./AnimalCharacter";

interface CharacterCanvasProps {
  typeCode?: string;
}

// 3D 캔버스 렌더러 컴포넌트: 조명, 그림자, 회전(OrbitControls) 및 동물 캐릭터 렌더링
// 캐릭터가 화면에 꽉 차고 돋보이도록 최적의 카메라 거리(3.4)와 높이(0.28)를 설정합니다.
export default function CharacterCanvas({ typeCode = "ISFJ" }: CharacterCanvasProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0.28, 3.4], fov: 45 }}
        // 배경 투명화로 페이지 배경색이 자연스럽게 투과됩니다.
        gl={{ alpha: true, antialias: true }}
        shadows
      >
        {/* ========================================================
            1. 조명 설정 (코드로만 구현된 부드러운 3점 조명)
        ======================================================== */}
        <ambientLight intensity={0.95} color="#fffaf5" />

        <directionalLight
          position={[3, 5, 4]}
          intensity={1.4}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <directionalLight
          position={[-3, 2, -2]}
          intensity={0.65}
          color="#d1fae5" // 부드러운 민트 반사광
        />

        <pointLight position={[0, -2, 2]} intensity={0.35} color="#fef3c7" />

        {/* ========================================================
            2. 전달받은 MBTI 유형 코드에 맞는 3D 동물 캐릭터 렌더링
        ======================================================== */}
        <AnimalCharacter typeCode={typeCode} />

        {/* 코드로 생성되는 자연스러운 접촉 바닥 그림자 */}
        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.45}
          scale={3.6}
          blur={1.8}
          far={2.5}
        />

        {/* ========================================================
            3. 사용자 인터랙션 컨트롤 (회전만 허용, 줌/팬 차단)
        ======================================================== */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.75}
        />
      </Canvas>
    </div>
  );
}
