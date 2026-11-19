import { TraitType } from "@/data/questions";

/**
 * 사용자가 선택한 성향 답변 목록을 받아 최종 4글자 MBTI 유형 코드를 계산하는 함수
 * @param answers 사용자가 선택한 12개의 TraitType 배열 (예: ['I', 'N', 'F', 'P', ...])
 * @returns 4자리 MBTI 문자열 (예: 'INFP', 'ESTJ')
 */
export function calculateMBTI(answers: TraitType[]): string {
  // 각 지표별 선택 횟수를 세기 위한 카운터 객체
  const counts: Record<TraitType, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  // 전달받은 모든 답변의 횟수를 누적
  for (const answer of answers) {
    if (counts[answer] !== undefined) {
      counts[answer]++;
    }
  }

  // 각 지표마다 더 많이 선택된 글자를 결정 (동점일 경우 앞선 글자를 기본값으로 채택)
  const ei = counts.E >= counts.I ? "E" : "I";
  const sn = counts.S >= counts.N ? "S" : "N";
  const tf = counts.T >= counts.F ? "T" : "F";
  const jp = counts.J >= counts.P ? "J" : "P";

  // 4글자를 조합하여 최종 MBTI 유형 반환
  return `${ei}${sn}${tf}${jp}`;
}
