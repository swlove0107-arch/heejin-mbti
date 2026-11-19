"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions, TraitType } from "@/data/questions";
import { calculateMBTI } from "@/lib/mbti";

// 찌니 MBTI 검사 진행 화면 (/test)
export default function TestPage() {
  const router = useRouter();

  // 현재 진행 중인 질문 번호 인덱스 (0 ~ 11)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 사용자가 고른 답변들을 저장하는 배열 (인덱스 0~11에 각각 TraitType 저장)
  const [answers, setAnswers] = useState<TraitType[]>([]);

  // 현재 표시할 질문 객체
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // 진행률 퍼센트 계산 (예: 1번째 질문이면 약 8.3%, 12번째면 100%)
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  /**
   * 사용자가 선택지를 클릭했을 때 실행되는 핸들러 함수
   * @param selectedType 선택한 선택지의 성향 지표 ('E', 'I', 'S', ...)
   */
  const handleSelectChoice = (selectedType: TraitType) => {
    // 현재 질문 위치에 선택한 답변 기록
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedType;
    setAnswers(updatedAnswers);

    // 아직 마지막 질문이 아닌 경우: 다음 질문으로 이동
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 12번째 마지막 질문을 선택한 경우: 최종 MBTI 계산 후 결과 페이지로 이동
      const finalMBTI = calculateMBTI(updatedAnswers);
      router.push(`/result/${finalMBTI}`);
    }
  };

  /**
   * "이전" 버튼을 눌렀을 때 앞선 질문으로 돌아가는 함수
   */
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-2">
      {/* 1. 상단: 진행 상황 표시 (진행 숫자 및 게이지 바) */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2 px-1">
          <span className="text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
            질문 {currentQuestion.id}
          </span>
          <span className="font-bold text-emerald-800">
            {currentIndex + 1} <span className="text-slate-400 font-normal">/ {totalQuestions}</span>
          </span>
        </div>

        {/* 진행 게이지 막대 */}
        <div className="w-full h-2.5 bg-emerald-100/60 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. 중단: 질문 내용 카드 */}
      <div className="my-auto py-4">
        <div className="bg-white/90 border border-emerald-100/80 rounded-3xl p-6 sm:p-7 shadow-sm text-center mb-6">
          <span className="inline-block text-3xl mb-3">💬</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug break-keep">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 선택지 2개: 큼직하고 누르기 편한 버튼 */}
        <div className="space-y-3.5">
          {currentQuestion.choices.map((choice, index) => {
            const isSelected = answers[currentIndex] === choice.type;

            return (
              <button
                key={index}
                onClick={() => handleSelectChoice(choice.type)}
                className={`w-full min-h-[76px] p-4 text-left sm:text-center text-sm sm:text-base font-semibold rounded-2xl border transition-all active:scale-[0.98] shadow-sm flex items-center justify-center leading-relaxed break-keep ${
                  isSelected
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200/50"
                    : "bg-white/95 text-slate-700 border-emerald-100/80 hover:bg-emerald-50/60 hover:border-emerald-300/80 hover:shadow-md"
                }`}
              >
                {choice.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 하단: 이전 질문으로 돌아가기 버튼 (첫 번째 질문에서는 공간만 유지하거나 숨김) */}
      <div className="pt-6 pb-2 min-h-[52px] flex items-center justify-start">
        {currentIndex > 0 ? (
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 px-3 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            <span>←</span>
            <span>이전 질문으로</span>
          </button>
        ) : (
          <div className="h-6" />
        )}
      </div>
    </div>
  );
}
