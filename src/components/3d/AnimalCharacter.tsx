"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mbtiTypes } from "@/data/types";

interface AnimalCharacterProps {
  typeCode: string;
}

// 16가지 MBTI 동물 3D 캐릭터 컴포넌트:
// 공통 몸체 구조를 공유하면서 각 동물의 뚜렷한 외형적 특징과 성격 맞춤 애니메이션을 제공합니다.
export default function AnimalCharacter({ typeCode }: AnimalCharacterProps) {
  const upperCode = (typeCode || "ISFJ").toUpperCase();
  const info = mbtiTypes[upperCode] || mbtiTypes.ISFJ;
  const animal = info.character.animal;

  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  // 탭(클릭) 시 폴짝 뛰어오르는 점프 인터랙션 상태
  const [jumpTime, setJumpTime] = useState<number | null>(null);

  const handlePointerDown = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setJumpTime(Date.now());
  };

  // 각 동물별 자연스럽고 뚜렷한 색상 설정
  const getAnimalPalette = () => {
    switch (animal) {
      case "부엉이": // INTJ
        return { body: "#6366f1", belly: "#e0e7ff", sub: "#4338ca", beak: "#f59e0b", blush: "#c7d2fe" };
      case "고양이": // INTP
        return { body: "#a78bfa", belly: "#f5f3ff", sub: "#7c3aed", nose: "#ec4899", blush: "#fbcfe8", whisker: "#6d28d9" };
      case "사자": // ENTJ
        return { body: "#fb923c", belly: "#ffedd5", sub: "#c2410c", mane: "#ea580c", blush: "#fed7aa" };
      case "여우": // ENTP
        return { body: "#f97316", belly: "#ffffff", sub: "#ffffff", nose: "#1e1b18", blush: "#fca5a5" };
      case "사슴": // INFJ
        return { body: "#38bdf8", belly: "#e0f2fe", horn: "#b45309", nose: "#0284c7", blush: "#bae6fd" };
      case "토끼": // INFP
        return { body: "#f472b6", belly: "#fdf2f8", inner: "#fbcfe8", nose: "#db2777", blush: "#fce7f3" };
      case "강아지": // ENFJ
        return { body: "#fbbf24", belly: "#fef3c7", ear: "#d97706", tongue: "#f43f5e", blush: "#fde68a" };
      case "다람쥐": // ENFP
        return { body: "#f59e0b", belly: "#fef3c7", tail: "#d97706", cheek: "#fcd34d", blush: "#fca5a5" };
      case "거북이": // ISTJ
        return { body: "#10b981", belly: "#d1fae5", shell: "#047857", bellyPlate: "#a7f3d0", blush: "#6ee7b7" };
      case "곰": // ISFJ
        return { body: "#b88358", belly: "#faeed9", sub: "#f3b99f", nose: "#1a1816", blush: "#fca5a5" };
      case "펭귄": // ESTJ
        return { body: "#334155", belly: "#ffffff", beak: "#f59e0b", feet: "#f59e0b", blush: "#cbd5e1" };
      case "양": // ESFJ
        return { body: "#fbcfe8", wool: "#ffffff", skin: "#fde8e8", ear: "#f9a8d4", blush: "#fda4af" };
      case "고슴도치": // ISTP
        return { body: "#0d9488", belly: "#ccfbf1", spines: "#115e59", nose: "#134e4a", blush: "#99f6e4" };
      case "판다": // ISFP
        return { body: "#ffffff", black: "#1e293b", belly: "#f1f5f9", eyePatch: "#1e293b", blush: "#fca5a5" };
      case "원숭이": // ESTP
        return { body: "#d97706", belly: "#fef3c7", ear: "#fbbf24", face: "#fde68a", blush: "#fcd34d" };
      case "앵무새": // ESFP
        return { body: "#ec4899", belly: "#fef08a", wing: "#3b82f6", beak: "#f59e0b", crest: "#10b981" };
      default:
        return { body: info.color, belly: "#ffffff", sub: info.color, blush: "#fca5a5" };
    }
  };

  const p = getAnimalPalette();

  // 프레임마다 성격별 애니메이션 및 점프 인터랙션 적용
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    let basePosY = 0;
    let baseScaleY = 1;
    let baseRotZ = 0;
    let headRotY = 0;
    let headRotX = 0;

    // 1. 유형별 고유 성격 애니메이션
    switch (upperCode) {
      case "ENFP": // 다람쥐: 신나게 통통 뜀
        basePosY = Math.abs(Math.sin(t * 6)) * 0.16;
        baseScaleY = 1 + Math.sin(t * 6) * 0.04;
        break;
      case "ISTJ": // 거북이: 천천히 진중하게 고개 끄덕임
        basePosY = Math.sin(t * 1.2) * 0.03;
        headRotX = Math.sin(t * 1.5) * 0.09;
        break;
      case "ESFP": // 앵무새: 신나게 좌우로 춤추는 모션
        basePosY = Math.abs(Math.sin(t * 4)) * 0.08;
        baseRotZ = Math.sin(t * 4) * 0.12;
        break;
      case "INTP": // 고양이: 갸우뚱하며 꼬리 살랑임
        headRotY = Math.sin(t * 1.5) * 0.15;
        baseRotZ = Math.sin(t * 1.5) * 0.06;
        break;
      case "ENTJ": // 사자: 늠름하게 가슴을 펴는 호흡
        baseScaleY = 1 + Math.sin(t * 2) * 0.04;
        basePosY = Math.sin(t * 2) * 0.04;
        break;
      case "INFP": // 토끼: 깡충깡충 귀여운 호기심
        basePosY = Math.abs(Math.sin(t * 5)) * 0.1;
        break;
      case "ENFJ": // 강아지: 반갑게 꼬리 흔들기
        basePosY = Math.sin(t * 3) * 0.05;
        headRotY = Math.sin(t * 3) * 0.08;
        break;
      case "ESTP": // 원숭이: 재치 넘치는 들썩임
        basePosY = Math.abs(Math.sin(t * 4.5)) * 0.09;
        baseRotZ = Math.sin(t * 3) * 0.08;
        break;
      default: // 기본: 부드러운 호흡과 둥실거림
        basePosY = Math.sin(t * 2) * 0.05;
        baseScaleY = 1 + Math.sin(t * 2.5) * 0.025;
        break;
    }

    // 2. 탭(클릭) 시 폴짝 뛰어오르는 점프 물리 효과 (0.42초 지속)
    if (jumpTime !== null) {
      const elapsed = (Date.now() - jumpTime) / 1000;
      if (elapsed < 0.42) {
        const jumpProgress = elapsed / 0.42;
        const jumpHeight = Math.sin(jumpProgress * Math.PI) * 0.45;
        basePosY += jumpHeight;
        baseScaleY *= 1 + Math.sin(jumpProgress * Math.PI) * 0.12;
      }
    }

    if (groupRef.current) {
      groupRef.current.position.y = basePosY;
      groupRef.current.scale.set(1, baseScaleY, 1);
      groupRef.current.rotation.z = baseRotZ;
    }

    if (headRef.current) {
      headRef.current.rotation.y = headRotY;
      headRef.current.rotation.x = headRotX;
    }

    // 3. 눈 깜빡임 제어
    const blinkCycle = t % 3.6;
    const isBlinking = blinkCycle < 0.12;
    const eyeScaleY = isBlinking ? 0.08 : 1;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScaleY;

    // 4. 꼬리 살랑임
    if (tailRef.current) {
      const wagSpeed = animal === "강아지" ? 10 : 4;
      tailRef.current.rotation.y = Math.sin(t * wagSpeed) * 0.35;
    }

    // 5. 날개 또는 팔 펄럭임
    if (leftArmRef.current && rightArmRef.current) {
      const armSway = Math.sin(t * 3) * 0.08;
      leftArmRef.current.rotation.z = 0.35 + armSway;
      rightArmRef.current.rotation.z = -0.35 - armSway;
    }
  });

  return (
    <group ref={groupRef} onPointerDown={handlePointerDown}>
      {/* ========================================================
          1. 머리 영역 (동물마다 다른 귀, 뿔, 부리, 볼, 갈기 등)
      ======================================================== */}
      <group ref={headRef} position={[0, 0.72, 0]}>
        {/* 머리 기본 구형 (판다의 경우 얼굴은 하얗게) */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.76, 28, 28]} />
          <meshStandardMaterial
            color={animal === "판다" ? "#ffffff" : p.body}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>

        {/* --- [사자 갈기] --- */}
        {animal === "사자" && (
          <group position={[0, 0, -0.15]}>
            <mesh castShadow>
              <torusGeometry args={[0.78, 0.28, 16, 28]} />
              <meshStandardMaterial color={p.mane || "#ea580c"} roughness={0.6} />
            </mesh>
          </group>
        )}

        {/* --- [양 몽글몽글 털 머리관] --- */}
        {animal === "양" && (
          <group position={[0, 0.62, 0]}>
            {[
              [-0.32, 0.05, 0.15],
              [0, 0.12, 0.2],
              [0.32, 0.05, 0.15],
              [-0.2, 0.15, -0.1],
              [0.2, 0.15, -0.1],
            ].map(([x, y, z], i) => (
              <mesh key={i} position={[x, y, z]}>
                <sphereGeometry args={[0.2, 14, 14]} />
                <meshStandardMaterial color={p.wool || "#ffffff"} roughness={0.7} />
              </mesh>
            ))}
          </group>
        )}

        {/* --- [동물별 귀 / 깃 / 볏] --- */}
        {/* 1. 둥근 귀 (곰, 사자, 다람쥐) */}
        {(animal === "곰" || animal === "사자" || animal === "다람쥐") && (
          <>
            <mesh position={[-0.56, 0.58, 0]} castShadow>
              <sphereGeometry args={[0.25, 18, 18]} />
              <meshStandardMaterial color={p.body} roughness={0.35} />
            </mesh>
            <mesh position={[0.56, 0.58, 0]} castShadow>
              <sphereGeometry args={[0.25, 18, 18]} />
              <meshStandardMaterial color={p.body} roughness={0.35} />
            </mesh>
          </>
        )}

        {/* 2. 판다의 까만 둥근 귀 */}
        {animal === "판다" && (
          <>
            <mesh position={[-0.56, 0.58, 0]} castShadow>
              <sphereGeometry args={[0.25, 18, 18]} />
              <meshStandardMaterial color={p.black || "#1e293b"} roughness={0.35} />
            </mesh>
            <mesh position={[0.56, 0.58, 0]} castShadow>
              <sphereGeometry args={[0.25, 18, 18]} />
              <meshStandardMaterial color={p.black || "#1e293b"} roughness={0.35} />
            </mesh>
          </>
        )}

        {/* 3. 뾰족 세모 귀 (고양이, 여우) */}
        {(animal === "고양이" || animal === "여우") && (
          <>
            <group position={[-0.48, 0.68, 0]} rotation={[0, 0, -0.25]}>
              <mesh castShadow>
                <coneGeometry args={[0.24, 0.42, 16]} />
                <meshStandardMaterial color={p.body} roughness={0.35} />
              </mesh>
              {/* 귀 안쪽 핑크 포인트 */}
              <mesh position={[0, -0.04, 0.08]} scale={[0.6, 0.6, 0.4]}>
                <coneGeometry args={[0.22, 0.35, 12]} />
                <meshStandardMaterial color="#fbcfe8" roughness={0.5} />
              </mesh>
            </group>
            <group position={[0.48, 0.68, 0]} rotation={[0, 0, 0.25]}>
              <mesh castShadow>
                <coneGeometry args={[0.24, 0.42, 16]} />
                <meshStandardMaterial color={p.body} roughness={0.35} />
              </mesh>
              {/* 귀 안쪽 핑크 포인트 */}
              <mesh position={[0, -0.04, 0.08]} scale={[0.6, 0.6, 0.4]}>
                <coneGeometry args={[0.22, 0.35, 12]} />
                <meshStandardMaterial color="#fbcfe8" roughness={0.5} />
              </mesh>
            </group>
          </>
        )}

        {/* 4. 부엉이 뾰족 귀깃 (헤드에 꼭 맞게 다듬어진 콘) */}
        {animal === "부엉이" && (
          <>
            <mesh position={[-0.42, 0.68, 0.05]} rotation={[0, 0, -0.28]} castShadow>
              <coneGeometry args={[0.16, 0.36, 14]} />
              <meshStandardMaterial color={p.sub || "#4338ca"} roughness={0.4} />
            </mesh>
            <mesh position={[0.42, 0.68, 0.05]} rotation={[0, 0, 0.28]} castShadow>
              <coneGeometry args={[0.16, 0.36, 14]} />
              <meshStandardMaterial color={p.sub || "#4338ca"} roughness={0.4} />
            </mesh>
          </>
        )}

        {/* 5. 토끼의 길쭉한 귀 (상단이 잘리지 않도록 비례 최적화) */}
        {animal === "토끼" && (
          <>
            <group position={[-0.28, 0.78, 0]} rotation={[0.06, 0, -0.1]}>
              <mesh castShadow scale={[0.75, 1.6, 0.5]}>
                <sphereGeometry args={[0.22, 18, 18]} />
                <meshStandardMaterial color={p.body} roughness={0.35} />
              </mesh>
              <mesh position={[0, 0, 0.06]} scale={[0.45, 1.25, 0.25]}>
                <sphereGeometry args={[0.18, 14, 14]} />
                <meshStandardMaterial color={p.inner || "#fbcfe8"} roughness={0.5} />
              </mesh>
            </group>
            <group position={[0.28, 0.78, 0]} rotation={[0.06, 0, 0.1]}>
              <mesh castShadow scale={[0.75, 1.6, 0.5]}>
                <sphereGeometry args={[0.22, 18, 18]} />
                <meshStandardMaterial color={p.body} roughness={0.35} />
              </mesh>
              <mesh position={[0, 0, 0.06]} scale={[0.45, 1.25, 0.25]}>
                <sphereGeometry args={[0.18, 14, 14]} />
                <meshStandardMaterial color={p.inner || "#fbcfe8"} roughness={0.5} />
              </mesh>
            </group>
          </>
        )}

        {/* 6. 강아지의 아래로 처진 귀 */}
        {animal === "강아지" && (
          <>
            <mesh position={[-0.66, 0.4, 0.1]} rotation={[0, 0, 0.35]} scale={[0.85, 1.4, 0.55]}>
              <sphereGeometry args={[0.26, 18, 18]} />
              <meshStandardMaterial color={p.ear || "#d97706"} roughness={0.4} />
            </mesh>
            <mesh position={[0.66, 0.4, 0.1]} rotation={[0, 0, -0.35]} scale={[0.85, 1.4, 0.55]}>
              <sphereGeometry args={[0.26, 18, 18]} />
              <meshStandardMaterial color={p.ear || "#d97706"} roughness={0.4} />
            </mesh>
          </>
        )}

        {/* 7. 양의 옆으로 처진 귀 */}
        {animal === "양" && (
          <>
            <mesh position={[-0.68, 0.28, 0.05]} rotation={[0, 0, 0.4]} scale={[1.3, 0.55, 0.55]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color={p.ear || "#f9a8d4"} roughness={0.5} />
            </mesh>
            <mesh position={[0.68, 0.28, 0.05]} rotation={[0, 0, -0.4]} scale={[1.3, 0.55, 0.55]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color={p.ear || "#f9a8d4"} roughness={0.5} />
            </mesh>
          </>
        )}

        {/* 8. 사슴 가지 모양 뿔 (상단 잘림 없는 아름다운 높이) */}
        {animal === "사슴" && (
          <group position={[0, 0.65, 0.05]}>
            {/* 왼쪽 뿔 */}
            <mesh position={[-0.34, 0.26, 0]} rotation={[0, 0, -0.25]}>
              <cylinderGeometry args={[0.035, 0.055, 0.45, 10]} />
              <meshStandardMaterial color={p.horn || "#b45309"} roughness={0.4} />
            </mesh>
            <mesh position={[-0.42, 0.34, 0.04]} rotation={[0, 0, -0.65]}>
              <cylinderGeometry args={[0.025, 0.035, 0.2, 8]} />
              <meshStandardMaterial color={p.horn || "#b45309"} roughness={0.4} />
            </mesh>
            {/* 오른쪽 뿔 */}
            <mesh position={[0.34, 0.26, 0]} rotation={[0, 0, 0.25]}>
              <cylinderGeometry args={[0.035, 0.055, 0.45, 10]} />
              <meshStandardMaterial color={p.horn || "#b45309"} roughness={0.4} />
            </mesh>
            <mesh position={[0.42, 0.34, 0.04]} rotation={[0, 0, 0.65]}>
              <cylinderGeometry args={[0.025, 0.035, 0.2, 8]} />
              <meshStandardMaterial color={p.horn || "#b45309"} roughness={0.4} />
            </mesh>
          </group>
        )}

        {/* 9. 원숭이 얼굴 옆 큰 둥근 귀 */}
        {animal === "원숭이" && (
          <>
            <mesh position={[-0.76, 0.08, 0]} scale={[0.35, 1.15, 1.15]}>
              <sphereGeometry args={[0.3, 18, 18]} />
              <meshStandardMaterial color={p.ear || "#fbbf24"} roughness={0.4} />
            </mesh>
            <mesh position={[0.76, 0.08, 0]} scale={[0.35, 1.15, 1.15]}>
              <sphereGeometry args={[0.3, 18, 18]} />
              <meshStandardMaterial color={p.ear || "#fbbf24"} roughness={0.4} />
            </mesh>
          </>
        )}

        {/* 10. 앵무새 머리 위 볏깃 */}
        {animal === "앵무새" && (
          <group position={[0, 0.72, 0.05]}>
            <mesh rotation={[-0.25, 0, 0]} scale={[0.45, 1.25, 0.75]}>
              <sphereGeometry args={[0.16, 14, 14]} />
              <meshStandardMaterial color={p.crest || "#10b981"} roughness={0.3} />
            </mesh>
          </group>
        )}

        {/* --- [눈 / 눈가 무늬] --- */}
        {/* 판다 검은 눈가 패치 */}
        {animal === "판다" && (
          <>
            <mesh position={[-0.26, 0.04, 0.65]} rotation={[0, 0, -0.3]} scale={[1.2, 0.9, 0.4]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color={p.eyePatch || "#1e293b"} />
            </mesh>
            <mesh position={[0.26, 0.04, 0.65]} rotation={[0, 0, 0.3]} scale={[1.2, 0.9, 0.4]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color={p.eyePatch || "#1e293b"} />
            </mesh>
          </>
        )}

        {/* 부엉이 동그랗고 큰 눈테 */}
        {animal === "부엉이" && (
          <>
            <mesh position={[-0.26, 0.04, 0.66]}>
              <ringGeometry args={[0.11, 0.19, 24]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.26, 0.04, 0.66]}>
              <ringGeometry args={[0.11, 0.19, 24]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
          </>
        )}

        {/* 왼쪽 눈 */}
        <group ref={leftEyeRef} position={[-0.26, 0.04, 0.68]}>
          <mesh>
            <sphereGeometry args={[0.082, 18, 18]} />
            <meshStandardMaterial color="#1a1816" roughness={0.1} />
          </mesh>
          <mesh position={[0.03, 0.03, 0.065]}>
            <sphereGeometry args={[0.026, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* 오른쪽 눈 */}
        <group ref={rightEyeRef} position={[0.26, 0.04, 0.68]}>
          <mesh>
            <sphereGeometry args={[0.082, 18, 18]} />
            <meshStandardMaterial color="#1a1816" roughness={0.1} />
          </mesh>
          <mesh position={[0.03, 0.03, 0.065]}>
            <sphereGeometry args={[0.026, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* --- [주둥이 / 부리 / 수염] --- */}
        {/* 1. 새 종류 (부엉이, 펭귄, 앵무새)의 부리: 확실하게 앞/아래를 향하도록 회전 설정 */}
        {(animal === "부엉이" || animal === "펭귄" || animal === "앵무새") ? (
          <mesh
            position={[0, -0.1, 0.76]}
            rotation={[Math.PI / 2 + (animal === "앵무새" ? 0.35 : 0.18), 0, 0]}
          >
            <coneGeometry args={[0.12, 0.28, 16]} />
            <meshStandardMaterial color={p.beak || "#f59e0b"} roughness={0.3} />
          </mesh>
        ) : animal === "여우" ? (
          /* 2. 여우의 뾰족한 주둥이와 검은 코 */
          <group position={[0, -0.14, 0.72]}>
            <mesh rotation={[Math.PI / 2 + 0.1, 0, 0]} scale={[1, 0.9, 1]}>
              <coneGeometry args={[0.18, 0.36, 18]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            {/* 코끝 */}
            <mesh position={[0, 0.02, 0.22]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#1a1816" roughness={0.2} />
            </mesh>
          </group>
        ) : (
          /* 3. 일반 포유류 주둥이와 코 */
          <group position={[0, -0.16, 0.64]}>
            <mesh scale={[1.2, 0.88, 0.8]}>
              <sphereGeometry args={[0.25, 20, 20]} />
              <meshStandardMaterial color={p.belly || "#ffffff"} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.1, 0.18]} scale={[1.2, 0.8, 1]}>
              <sphereGeometry args={[0.085, 14, 14]} />
              <meshStandardMaterial color={p.nose || "#1a1816"} roughness={0.2} />
            </mesh>
            {/* 강아지 내민 혀 */}
            {animal === "강아지" && (
              <mesh position={[0, -0.12, 0.18]} rotation={[0.4, 0, 0]} scale={[0.8, 1.2, 0.3]}>
                <sphereGeometry args={[0.09, 12, 12]} />
                <meshStandardMaterial color={p.tongue || "#f43f5e"} roughness={0.2} />
              </mesh>
            )}
          </group>
        )}

        {/* --- [고양이 수염 4가닥] --- */}
        {animal === "고양이" && (
          <group position={[0, -0.16, 0.68]}>
            {/* 왼쪽 수염 2가닥 */}
            <mesh position={[-0.32, 0.04, 0]} rotation={[0, 0, 0.12]}>
              <boxGeometry args={[0.26, 0.016, 0.016]} />
              <meshBasicMaterial color="#581c87" />
            </mesh>
            <mesh position={[-0.32, -0.05, 0]} rotation={[0, 0, -0.1]}>
              <boxGeometry args={[0.26, 0.016, 0.016]} />
              <meshBasicMaterial color="#581c87" />
            </mesh>
            {/* 오른쪽 수염 2가닥 */}
            <mesh position={[0.32, 0.04, 0]} rotation={[0, 0, -0.12]}>
              <boxGeometry args={[0.26, 0.016, 0.016]} />
              <meshBasicMaterial color="#581c87" />
            </mesh>
            <mesh position={[0.32, -0.05, 0]} rotation={[0, 0, 0.1]}>
              <boxGeometry args={[0.26, 0.016, 0.016]} />
              <meshBasicMaterial color="#581c87" />
            </mesh>
          </group>
        )}

        {/* 다람쥐 볼록한 볼 */}
        {animal === "다람쥐" && (
          <>
            <mesh position={[-0.48, -0.16, 0.52]} scale={[1.1, 1, 0.8]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color={p.cheek || "#fcd34d"} roughness={0.35} />
            </mesh>
            <mesh position={[0.48, -0.16, 0.52]} scale={[1.1, 1, 0.8]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color={p.cheek || "#fcd34d"} roughness={0.35} />
            </mesh>
          </>
        )}

        {/* 핑크 볼터치 */}
        <mesh position={[-0.42, -0.14, 0.6]} rotation={[0, -0.3, 0]} scale={[1, 0.65, 0.4]}>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial color={p.blush} transparent opacity={0.65} roughness={0.8} />
        </mesh>
        <mesh position={[0.42, -0.14, 0.6]} rotation={[0, 0.3, 0]} scale={[1, 0.65, 0.4]}>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial color={p.blush} transparent opacity={0.65} roughness={0.8} />
        </mesh>
      </group>

      {/* ========================================================
          2. 몸통 영역 (동물별 배 패치, 등딱지, 가시, 등 점 등)
      ======================================================== */}
      <group position={[0, -0.22, 0]}>
        <mesh castShadow receiveShadow scale={[1.05, 1.1, 0.95]}>
          <sphereGeometry args={[0.58, 24, 24]} />
          <meshStandardMaterial
            color={animal === "판다" ? p.black || "#1e293b" : p.body}
            roughness={0.35}
          />
        </mesh>

        {/* 둥근 배 패치 */}
        <mesh position={[0, -0.04, 0.45]} scale={[1.1, 1.15, 0.35]}>
          <sphereGeometry args={[0.33, 18, 18]} />
          <meshStandardMaterial color={p.belly || "#ffffff"} roughness={0.4} />
        </mesh>

        {/* --- [거북이 등딱지] --- */}
        {/* 몸통보다 훨씬 넓게 만들어서 앞에서 봐도 양옆으로 불쑥 튀어나오도록 함 */}
        {animal === "거북이" && (
          <group position={[0, 0.05, -0.1]}>
            {/* 메인 등딱지: x 방향으로 크게 늘려서 옆면이 앞에서도 보이게 */}
            <mesh castShadow scale={[1.75, 1.2, 0.7]}>
              <sphereGeometry args={[0.55, 20, 20]} />
              <meshStandardMaterial color={p.shell || "#047857"} roughness={0.4} />
            </mesh>
            {/* 등딱지 무늬: 중앙 육각형 느낌 */}
            <mesh position={[0, 0.05, 0.3]} scale={[0.9, 0.85, 0.3]}>
              <sphereGeometry args={[0.38, 12, 12]} />
              <meshStandardMaterial color="#065f46" roughness={0.5} />
            </mesh>
          </group>
        )}

        {/* --- [고슴도치 등의 가시들 (등 뒤를 향하도록 각도 조정)] --- */}
        {animal === "고슴도치" && (
          <group position={[0, 0.1, -0.25]}>
            {[
              [-0.28, 0.28, -0.05],
              [0, 0.35, -0.05],
              [0.28, 0.28, -0.05],
              [-0.2, 0.1, -0.2],
              [0.2, 0.1, -0.2],
              [-0.25, -0.18, -0.05],
              [0.25, -0.18, -0.05],
              [0, -0.1, -0.2],
            ].map(([x, y, z], i) => (
              <mesh key={i} position={[x, y, z]} rotation={[-0.7, 0, 0]}>
                <coneGeometry args={[0.11, 0.38, 10]} />
                <meshStandardMaterial color={p.spines || "#115e59"} roughness={0.5} />
              </mesh>
            ))}
          </group>
        )}

        {/* --- [사슴 등의 하얀 점] --- */}
        {animal === "사슴" && (
          <group position={[0, 0.15, -0.42]}>
            {[-0.18, 0, 0.18].map((x, i) => (
              <mesh key={i} position={[x, 0.08 - i * 0.08, 0]}>
                <sphereGeometry args={[0.045, 10, 10]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            ))}
          </group>
        )}
      </group>

      {/* ========================================================
          3. 꼬리 영역
      ======================================================== */}
      <group ref={tailRef} position={[0, -0.45, -0.5]}>
        {/* 다람쥐 풍성한 꼬리 */}
        {animal === "다람쥐" && (
          <group position={[0, 0.38, -0.18]} rotation={[-0.4, 0, 0]}>
            <mesh castShadow scale={[1.1, 1.7, 1.2]}>
              <sphereGeometry args={[0.38, 20, 20]} />
              <meshStandardMaterial color={p.tail || "#d97706"} roughness={0.4} />
            </mesh>
          </group>
        )}

        {/* 여우 끝이 하얀 꼬리 */}
        {animal === "여우" && (
          <group position={[0, 0.2, -0.18]} rotation={[-0.6, 0, 0]}>
            <mesh castShadow scale={[0.8, 1.45, 0.8]}>
              <sphereGeometry args={[0.28, 18, 18]} />
              <meshStandardMaterial color={p.body} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.32, 0]} scale={[0.6, 0.65, 0.6]}>
              <sphereGeometry args={[0.2, 14, 14]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          </group>
        )}

        {/* 토끼 솜뭉치 꼬리 */}
        {animal === "토끼" && (
          <mesh castShadow position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.15, 14, 14]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
        )}

        {/* 고양이 / 원숭이 긴 꼬리 */}
        {(animal === "고양이" || animal === "원숭이") && (
          <group rotation={[-0.4, 0, 0]}>
            <mesh castShadow position={[0, 0.22, -0.1]} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.055, 0.075, 0.55, 12]} />
              <meshStandardMaterial color={p.body} roughness={0.4} />
            </mesh>
          </group>
        )}

        {/* 사자 털 뭉치 달린 꼬리 */}
        {animal === "사자" && (
          <group rotation={[-0.4, 0, 0]}>
            <mesh castShadow position={[0, 0.18, -0.1]}>
              <cylinderGeometry args={[0.045, 0.065, 0.45, 12]} />
              <meshStandardMaterial color={p.body} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.42, -0.1]}>
              <sphereGeometry args={[0.11, 14, 14]} />
              <meshStandardMaterial color={p.mane || "#ea580c"} roughness={0.5} />
            </mesh>
          </group>
        )}

        {/* 강아지 흔드는 꼬리 */}
        {animal === "강아지" && (
          <mesh castShadow position={[0, 0.18, -0.1]} rotation={[-0.5, 0, 0]}>
            <capsuleGeometry args={[0.075, 0.28, 10, 10]} />
            <meshStandardMaterial color={p.body} roughness={0.4} />
          </mesh>
        )}
      </group>

      {/* ========================================================
          4. 팔 / 날개 영역
      ======================================================== */}
      {(animal === "부엉이" || animal === "펭귄" || animal === "앵무새") ? (
        <>
          <group ref={leftArmRef} position={[-0.58, -0.15, 0.05]} rotation={[0.2, 0, 0.35]}>
            <mesh castShadow scale={[0.45, 1.35, 0.85]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color={animal === "앵무새" ? p.wing || "#3b82f6" : p.body} roughness={0.35} />
            </mesh>
          </group>
          <group ref={rightArmRef} position={[0.58, -0.15, 0.05]} rotation={[0.2, 0, -0.35]}>
            <mesh castShadow scale={[0.45, 1.35, 0.85]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color={animal === "앵무새" ? p.wing || "#3b82f6" : p.body} roughness={0.35} />
            </mesh>
          </group>
        </>
      ) : (
        <>
          <group ref={leftArmRef} position={[-0.56, -0.12, 0.08]} rotation={[0.2, 0, 0.35]}>
            <mesh castShadow scale={[0.85, 1.25, 0.85]}>
              <sphereGeometry args={[0.21, 16, 16]} />
              <meshStandardMaterial color={animal === "판다" ? p.black || "#1e293b" : p.body} roughness={0.35} />
            </mesh>
          </group>
          <group ref={rightArmRef} position={[0.56, -0.12, 0.08]} rotation={[0.2, 0, -0.35]}>
            <mesh castShadow scale={[0.85, 1.25, 0.85]}>
              <sphereGeometry args={[0.21, 16, 16]} />
              <meshStandardMaterial color={animal === "판다" ? p.black || "#1e293b" : p.body} roughness={0.35} />
            </mesh>
          </group>
        </>
      )}

      {/* ========================================================
          5. 다리 영역 (짧고 앙증맞은 발 2개)
      ======================================================== */}
      <group position={[-0.32, -0.74, 0.1]} rotation={[0.08, 0, 0]}>
        <mesh castShadow scale={[1.1, 0.88, 1.3]}>
          <sphereGeometry args={[0.21, 16, 16]} />
          <meshStandardMaterial
            color={animal === "판다" ? p.black || "#1e293b" : animal === "펭귄" ? p.feet || "#f59e0b" : p.body}
            roughness={0.35}
          />
        </mesh>
      </group>
      <group position={[0.32, -0.74, 0.1]} rotation={[0.08, 0, 0]}>
        <mesh castShadow scale={[1.1, 0.88, 1.3]}>
          <sphereGeometry args={[0.21, 16, 16]} />
          <meshStandardMaterial
            color={animal === "판다" ? p.black || "#1e293b" : animal === "펭귄" ? p.feet || "#f59e0b" : p.body}
            roughness={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}
