"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 3D 곰 캐릭터 컴포넌트: 기본 기하학적 도형(구, 캡슐, 원기둥)을 조합하여 귀여운 2등신 동물 인형을 구현
export default function BearCharacter() {
  // 전체 캐릭터 그룹 참조 (숨쉬기 및 둥실거림 애니메이션 제어)
  const characterGroupRef = useRef<THREE.Group>(null);
  // 눈 깜빡임 제어를 위한 왼쪽/오른쪽 눈 메쉬 참조
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);
  // 양팔 흔들림 애니메이션 참조
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  // 귀여운 곰 인형 색상 팔레트
  const furColor = "#b88358";       // 포근한 밀크초콜릿 갈색 털
  const snoutColor = "#faeed9";    // 주둥이 및 배 부분 아이보리 크림색
  const innerEarColor = "#f3b99f"; // 귀 안쪽 부드러운 살구색
  const eyeColor = "#1a1816";      // 반짝이는 까만 눈동자
  const noseColor = "#1a1816";     // 까만 코
  const blushColor = "#fca5a5";    // 양 볼의 은은한 핑크 볼터치

  // 프레임마다 자연스러운 생명력(숨쉬기, 둥실거리기, 눈 깜빡임) 부여
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (characterGroupRef.current) {
      // 1. 위아래로 천천히 둥실둥실 떠오르는 부유 모션
      characterGroupRef.current.position.y = Math.sin(t * 1.8) * 0.08;

      // 2. 숨을 들이쉬고 내쉬듯 살짝 커졌다 작아지는 호흡 모션
      const breathScale = 1 + Math.sin(t * 2.5) * 0.025;
      characterGroupRef.current.scale.set(breathScale, breathScale, breathScale);

      // 3. 고개가 가볍게 좌우로 갸우뚱거리는 귀여운 모션
      characterGroupRef.current.rotation.z = Math.sin(t * 1.2) * 0.03;
    }

    // 4. 가끔씩 깜빡이는 눈동자 애니메이션 (약 3.5초 주기 중 0.12초간 깜빡임)
    const blinkTimer = t % 3.5;
    const isBlinking = blinkTimer < 0.12;
    const eyeScaleY = isBlinking ? 0.08 : 1;

    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScaleY;

    // 5. 양팔의 살랑거리는 미세한 움직임
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.35 + Math.sin(t * 2) * 0.05;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.35 - Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group ref={characterGroupRef} position={[0, 0, 0]}>
      {/* ========================================================
          1. 머리 영역 (큰 둥근 머리, 귀, 눈, 주둥이, 코, 볼터치)
      ======================================================== */}
      <group position={[0, 0.75, 0]}>
        {/* 머리 본체: 둥글둥글하고 매끈한 장난감 느낌의 구 */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.78, 36, 36]} />
          <meshStandardMaterial
            color={furColor}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>

        {/* 왼쪽 귀 */}
        <group position={[-0.6, 0.62, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.27, 24, 24]} />
            <meshStandardMaterial color={furColor} roughness={0.35} />
          </mesh>
          {/* 왼쪽 귓속 살구색 포인트 */}
          <mesh position={[0.02, 0, 0.12]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={innerEarColor} roughness={0.5} />
          </mesh>
        </group>

        {/* 오른쪽 귀 */}
        <group position={[0.6, 0.62, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.27, 24, 24]} />
            <meshStandardMaterial color={furColor} roughness={0.35} />
          </mesh>
          {/* 오른쪽 귓속 살구색 포인트 */}
          <mesh position={[-0.02, 0, 0.12]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={innerEarColor} roughness={0.5} />
          </mesh>
        </group>

        {/* 주둥이 (아이보리색 통통한 입가) */}
        <mesh position={[0, -0.16, 0.65]} scale={[1.2, 0.9, 0.8]}>
          <sphereGeometry args={[0.26, 28, 28]} />
          <meshStandardMaterial color={snoutColor} roughness={0.4} />
        </mesh>

        {/* 코 (까맣고 매끈한 젤리 같은 코) */}
        <mesh position={[0, -0.06, 0.85]} scale={[1.2, 0.8, 1]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial color={noseColor} roughness={0.2} />
        </mesh>

        {/* 눈 깜빡임 제어용 왼쪽 눈 그룹 */}
        <group ref={leftEyeRef} position={[-0.26, 0.04, 0.68]}>
          {/* 까만 눈동자 */}
          <mesh>
            <sphereGeometry args={[0.085, 24, 24]} />
            <meshStandardMaterial color={eyeColor} roughness={0.15} />
          </mesh>
          {/* 눈 속 반짝이는 작은 하얀 하이라이트 빛 */}
          <mesh position={[0.03, 0.03, 0.065]}>
            <sphereGeometry args={[0.026, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* 눈 깜빡임 제어용 오른쪽 눈 그룹 */}
        <group ref={rightEyeRef} position={[0.26, 0.04, 0.68]}>
          {/* 까만 눈동자 */}
          <mesh>
            <sphereGeometry args={[0.085, 24, 24]} />
            <meshStandardMaterial color={eyeColor} roughness={0.15} />
          </mesh>
          {/* 눈 속 반짝이는 작은 하얀 하이라이트 빛 */}
          <mesh position={[0.03, 0.03, 0.065]}>
            <sphereGeometry args={[0.026, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* 왼쪽 볼터치 */}
        <mesh position={[-0.45, -0.16, 0.58]} rotation={[0, -0.3, 0]} scale={[1, 0.7, 0.4]}>
          <sphereGeometry args={[0.13, 18, 18]} />
          <meshStandardMaterial color={blushColor} transparent opacity={0.7} roughness={0.8} />
        </mesh>

        {/* 오른쪽 볼터치 */}
        <mesh position={[0.45, -0.16, 0.58]} rotation={[0, 0.3, 0]} scale={[1, 0.7, 0.4]}>
          <sphereGeometry args={[0.13, 18, 18]} />
          <meshStandardMaterial color={blushColor} transparent opacity={0.7} roughness={0.8} />
        </mesh>
      </group>

      {/* ========================================================
          2. 몸통 영역 (통통한 배와 아이보리 배 패치)
      ======================================================== */}
      <group position={[0, -0.22, 0]}>
        {/* 통통한 아기 곰 몸통 */}
        <mesh castShadow receiveShadow scale={[1.05, 1.1, 0.95]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color={furColor} roughness={0.35} />
        </mesh>

        {/* 배 앞쪽의 아이보리색 둥근 패치 */}
        <mesh position={[0, -0.05, 0.46]} scale={[1.1, 1.15, 0.35]}>
          <sphereGeometry args={[0.34, 24, 24]} />
          <meshStandardMaterial color={snoutColor} roughness={0.4} />
        </mesh>
      </group>

      {/* ========================================================
          3. 팔 영역 (짧고 통통한 양팔)
      ======================================================== */}
      {/* 왼팔 */}
      <group ref={leftArmRef} position={[-0.56, -0.12, 0.08]} rotation={[0.2, 0, 0.35]}>
        <mesh castShadow scale={[0.85, 1.25, 0.85]}>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial color={furColor} roughness={0.35} />
        </mesh>
      </group>

      {/* 오른팔 */}
      <group ref={rightArmRef} position={[0.56, -0.12, 0.08]} rotation={[0.2, 0, -0.35]}>
        <mesh castShadow scale={[0.85, 1.25, 0.85]}>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial color={furColor} roughness={0.35} />
        </mesh>
      </group>

      {/* ========================================================
          4. 다리 영역 (바닥을 딛는 짧고 앙증맞은 다리 2개)
      ======================================================== */}
      {/* 왼발 */}
      <group position={[-0.32, -0.76, 0.12]} rotation={[0.1, 0, 0]}>
        <mesh castShadow scale={[1.1, 0.9, 1.3]}>
          <sphereGeometry args={[0.24, 20, 20]} />
          <meshStandardMaterial color={furColor} roughness={0.35} />
        </mesh>
        {/* 발바닥 쿠션 패치 */}
        <mesh position={[0, -0.06, 0.1]} scale={[1, 0.2, 1]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={snoutColor} roughness={0.5} />
        </mesh>
      </group>

      {/* 오른발 */}
      <group position={[0.32, -0.76, 0.12]} rotation={[0.1, 0, 0]}>
        <mesh castShadow scale={[1.1, 0.9, 1.3]}>
          <sphereGeometry args={[0.24, 20, 20]} />
          <meshStandardMaterial color={furColor} roughness={0.35} />
        </mesh>
        {/* 발바닥 쿠션 패치 */}
        <mesh position={[0, -0.06, 0.1]} scale={[1, 0.2, 1]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={snoutColor} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
