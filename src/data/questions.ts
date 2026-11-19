// 성향 지표 유형 (에너지 방향, 인식 기능, 판단 기능, 생활 양식)
export type Dimension = "EI" | "SN" | "TF" | "JP";

// 각 지표별 8가지 세부 성향 문자
export type TraitType = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

// 질문 내 개별 선택지 인터페이스
export interface QuestionChoice {
  text: string;      // 선택지 문구
  type: TraitType;   // 선택 시 획득하는 성향 지표
}

// 1개 문항 인터페이스
export interface Question {
  id: number;                                // 문항 번호 (1 ~ 12)
  dimension: Dimension;                      // 측정 지표
  question: string;                          // 일상 속 상황 질문 (부드러운 존댓말, 한 문장)
  choices: [QuestionChoice, QuestionChoice]; // 2개의 선택지
}

// 찌니 MBTI 12문항 데이터 (EI, SN, TF, JP 지표가 순환 배치되어 연속 출제되지 않음)
export const questions: Question[] = [
  // 1. 에너지 방향 (E / I) - 1
  {
    id: 1,
    dimension: "EI",
    question: "주말에 갑자기 약속이 취소되어 하루가 텅 비었을 때 나는?",
    choices: [
      {
        text: "오히려 좋아! 집에서 혼자만의 시간을 편안하게 즐겨요.",
        type: "I",
      },
      {
        text: "아쉬운데? 다른 친구에게 연락해서 약속을 잡아요.",
        type: "E",
      },
    ],
  },

  // 2. 인식 기능 (S / N) - 1
  {
    id: 2,
    dimension: "SN",
    question: "버스나 지하철 창밖을 바라보며 이동할 때 나는?",
    choices: [
      {
        text: "지나가는 간판이나 오가는 사람들의 모습을 구경해요.",
        type: "S",
      },
      {
        text: "꼬리를 무는 엉뚱한 상상에 빠져 시간 가는 줄 몰라요.",
        type: "N",
      },
    ],
  },

  // 3. 판단 기능 (T / F) - 1
  {
    id: 3,
    dimension: "TF",
    question: "친구가 힘든 일이 있다며 울먹이며 전화했을 때 나는?",
    choices: [
      {
        text: "무슨 일이야? 왜 울어? 상황부터 묻고 해결책을 고민해요.",
        type: "T",
      },
      {
        text: "많이 힘들었구나... 따뜻하게 위로하며 감정에 먼저 공감해요.",
        type: "F",
      },
    ],
  },

  // 4. 생활 양식 (J / P) - 1
  {
    id: 4,
    dimension: "JP",
    question: "여행 떠나기 전날 밤, 짐을 챙길 때 나의 모습은?",
    choices: [
      {
        text: "준비물 체크리스트를 보며 빠짐없이 꼼꼼하게 정리해요.",
        type: "J",
      },
      {
        text: "당장 필요한 것 위주로 가방에 쏙쏙 담고 가볍게 떠나요.",
        type: "P",
      },
    ],
  },

  // 5. 에너지 방향 (E / I) - 2
  {
    id: 5,
    dimension: "EI",
    question: "새로운 사람들이 많은 모임이나 파티에 갔을 때 나는?",
    choices: [
      {
        text: "처음 본 사람들과도 자연스럽게 어울리며 대화를 나눠요.",
        type: "E",
      },
      {
        text: "낯가림이 발동해 친한 사람 곁에 머물거나 조용히 지켜봐요.",
        type: "I",
      },
    ],
  },

  // 6. 인식 기능 (S / N) - 2
  {
    id: 6,
    dimension: "SN",
    question: "새로운 취미를 배울 때 더 편하게 느껴지는 방식은?",
    choices: [
      {
        text: "정해진 안내서와 기본 규칙대로 차근차근 따라 하기",
        type: "S",
      },
      {
        text: "내 느낌대로 이것저것 자유롭게 응용해 보기",
        type: "N",
      },
    ],
  },

  // 7. 판단 기능 (T / F) - 2
  {
    id: 7,
    dimension: "TF",
    question: "함께 준비하던 일에서 예상치 못한 실수가 생겼을 때 나는?",
    choices: [
      {
        text: "원인이 무엇인지 따져보고 다음 대안을 먼저 세워요.",
        type: "T",
      },
      {
        text: "당황했을 상대방의 마음을 먼저 다독이고 안심시켜요.",
        type: "F",
      },
    ],
  },

  // 8. 생활 양식 (J / P) - 2
  {
    id: 8,
    dimension: "JP",
    question: "쉬는 날 꼭 가보고 싶었던 카페가 문을 닫았을 때 나의 반응은?",
    choices: [
      {
        text: "미리 알아봐 둔 플랜 B 카페로 곧장 발걸음을 옮겨요.",
        type: "J",
      },
      {
        text: "오히려 좋아! 근처에 마음에 드는 아무 곳이나 들어가 봐요.",
        type: "P",
      },
    ],
  },

  // 9. 에너지 방향 (E / I) - 3
  {
    id: 9,
    dimension: "EI",
    question: "하루 종일 밖에서 바쁘게 보내고 집에 돌아왔을 때 나는?",
    choices: [
      {
        text: "휴대폰도 내려놓고 방에서 혼자 조용히 있어야 충전돼요.",
        type: "I",
      },
      {
        text: "친구에게 전화해서 오늘 있었던 일들을 수다로 풀어요.",
        type: "E",
      },
    ],
  },

  // 10. 인식 기능 (S / N) - 3
  {
    id: 10,
    dimension: "SN",
    question: "길을 걷다 독특한 모양의 건물을 마주쳤을 때 드는 생각은?",
    choices: [
      {
        text: "건물 외벽의 독특한 소재나 창문 구조를 눈여겨봐요.",
        type: "S",
      },
      {
        text: "'저 안에는 비밀스러운 공간이 있을까?' 상상을 펼쳐요.",
        type: "N",
      },
    ],
  },

  // 11. 판단 기능 (T / F) - 3
  {
    id: 11,
    dimension: "TF",
    question: "고민을 털어놓는 친구에게 가장 전하고 싶은 답변은?",
    choices: [
      {
        text: "문제를 실질적으로 해결해 줄 수 있는 현실적인 조언",
        type: "T",
      },
      {
        text: "온전히 친구의 편이 되어 마음을 안아주는 따뜻한 위로",
        type: "F",
      },
    ],
  },

  // 12. 생활 양식 (J / P) - 3
  {
    id: 12,
    dimension: "JP",
    question: "다음 주 마감인 일이나 과제가 생겼을 때 나의 스타일은?",
    choices: [
      {
        text: "일정별로 할 일을 미리 나누어 계획대로 차근차근 끝내요.",
        type: "J",
      },
      {
        text: "마감 직전 집중력이 폭발할 때 한 번에 몰아서 끝내요.",
        type: "P",
      },
    ],
  },
];
