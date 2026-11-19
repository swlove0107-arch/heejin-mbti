import Link from "next/link";

// 찌니 MBTI 첫 화면 (홈 화면: /)
export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center py-2">
      {/* 1. 상단 타이틀 및 소개 영역 */}
      <div className="w-full flex flex-col items-center pt-2">
        {/* 귀여운 동물 이모지 심볼 */}
        <div className="inline-flex items-center justify-center w-24 h-24 mb-5 rounded-3xl bg-emerald-100/70 shadow-inner text-5xl select-none">
          🐣
        </div>

        {/* 한 줄 소개 뱃지 */}
        <span className="px-3.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100/70 rounded-full mb-3">
          12가지 질문으로 만나는 나의 3D 동물 친구
        </span>

        {/* 큰 제목 */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          나는 어떤 유형일까?
        </h1>

        {/* 한 줄 소개 문구 */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-[290px] leading-relaxed">
          간단한 질문에 솔직하게 답하고, 나를 쏙 빼닮은 포근한 3D 캐릭터와 성격 분석을 만나보세요!
        </p>
      </div>

      {/* 2. 특징 카드 3개 (부드러운 파스텔 톤) */}
      <div className="w-full my-6 space-y-3">
        {/* 특징 카드 1: 12문항 · 2분 */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100/80 shadow-sm transition-all hover:shadow-md">
          <div className="w-11 h-11 rounded-xl bg-amber-200/60 flex items-center justify-center text-2xl flex-shrink-0">
            ⏱️
          </div>
          <div className="text-left">
            <h2 className="text-sm sm:text-base font-bold text-slate-800">12문항 · 2분</h2>
            <p className="text-xs text-slate-500 mt-0.5">핵심 질문만 추려 빠르고 가볍게 검사해요</p>
          </div>
        </div>

        {/* 특징 카드 2: 16가지 유형 */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100/80 shadow-sm transition-all hover:shadow-md">
          <div className="w-11 h-11 rounded-xl bg-rose-200/60 flex items-center justify-center text-2xl flex-shrink-0">
            🧩
          </div>
          <div className="text-left">
            <h2 className="text-sm sm:text-base font-bold text-slate-800">16가지 유형</h2>
            <p className="text-xs text-slate-500 mt-0.5">나의 숨겨진 성향과 성격을 16가지로 분석해요</p>
          </div>
        </div>

        {/* 특징 카드 3: 유형별 3D 캐릭터 */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100/80 shadow-sm transition-all hover:shadow-md">
          <div className="w-11 h-11 rounded-xl bg-teal-200/60 flex items-center justify-center text-2xl flex-shrink-0">
            🦊
          </div>
          <div className="text-left">
            <h2 className="text-sm sm:text-base font-bold text-slate-800">유형별 3D 캐릭터</h2>
            <p className="text-xs text-slate-500 mt-0.5">유형마다 준비된 사랑스러운 동물 친구를 만나요</p>
          </div>
        </div>
      </div>

      {/* 3. 하단 버튼 및 안내 문구 */}
      <div className="w-full space-y-3.5 pt-2">
        {/* 한층 더 큼직해진 검사 시작하기 버튼 (연한 민트 테마와 조화로운 에메랄드/틸 그라데이션) */}
        <Link
          href="/test"
          className="block w-full py-5 px-6 text-center text-lg font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl shadow-xl shadow-emerald-400/30 active:scale-[0.98] transition-all tracking-wide"
        >
          검사 시작하기
        </Link>

        {/* 맨 아래 작은 안내 문구 */}
        <p className="text-[11px] text-slate-400 tracking-tight">
          이 검사는 재미로 보는 간이 검사이며, 공식 MBTI® 검사가 아닙니다.
        </p>
      </div>
    </div>
  );
}
