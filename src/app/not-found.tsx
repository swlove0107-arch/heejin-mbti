/**
 * 404 Not Found 페이지 (src/app/not-found.tsx)
 *
 * - 없는 주소로 접속했을 때 서비스 분위기(따뜻한 민트/파스텔톤, 발자국)에 맞춰 표시
 * - 홈으로 가기 버튼 및 검사하러 가기 버튼 제공
 */
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요",
  description: "요청하신 페이지가 존재하지 않거나 주소가 변경되었습니다.",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-4">
      {/* 귀여운 길 잃은 동물 아이콘 */}
      <div className="w-24 h-24 rounded-3xl bg-emerald-100/80 border border-emerald-200/60 flex items-center justify-center text-5xl mb-6 shadow-inner animate-pulse">
        🐾
      </div>

      <span className="px-3.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full mb-3">
        404 NOT FOUND
      </span>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
        길을 잃었어요!
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-[280px] leading-relaxed break-keep">
        존재하지 않는 페이지이거나 주소가 잘못 입력되었어요. 귀여운 동물 친구들이 있는 홈으로 돌아가 볼까요?
      </p>

      {/* 액션 버튼 2개 */}
      <div className="w-full max-w-xs space-y-3">
        <Link
          href="/"
          className="block w-full py-3.5 px-6 text-center text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl shadow-lg shadow-emerald-400/30 active:scale-[0.98] transition-all"
        >
          홈으로 가기
        </Link>
        <Link
          href="/test"
          className="block w-full py-3.5 px-6 text-center text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl active:scale-[0.98] transition-all"
        >
          검사 시작하기
        </Link>
      </div>
    </div>
  );
}
