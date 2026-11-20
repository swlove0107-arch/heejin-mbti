import type { Metadata } from "next";
import Link from "next/link";
import { mbtiTypes, getTypeInfo } from "@/data/types";
import ResultContent from "./ResultContent";

// 16가지 전체 MBTI 유형에 대해 대소문자 모두 사전 정적 생성(Static Pre-rendering) 설정
export function generateStaticParams() {
  const codes = Object.keys(mbtiTypes);
  return [
    ...codes.map((code) => ({ type: code })),
    ...codes.map((code) => ({ type: code.toLowerCase() })),
  ];
}

interface ResultPageProps {
  params: Promise<{
    type: string;
  }>;
}

// 각 결과 페이지별 맞춤형 메타데이터(Title, Description, Open Graph) 동적 생성
export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const upperType = (resolvedParams.type || "").toUpperCase();
  const typeInfo = getTypeInfo(upperType);

  if (!typeInfo) {
    return {
      title: "알 수 없는 유형 | 찌니 MBTI",
      description: "존재하지 않거나 잘못된 성격 유형 결과입니다.",
    };
  }

  // 예: "ENFP 반짝이는 아이디어 뱅크 | 찌니 MBTI"
  const title = `${typeInfo.code} ${typeInfo.nickname} | 찌니 MBTI`;
  const description = `${typeInfo.summary} - ${typeInfo.character.name}(${typeInfo.character.animal}) 캐릭터와 성격 분석을 확인해보세요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "찌니 MBTI",
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// 찌니 MBTI 검사 결과 상세 페이지 (/result/[type])
export default async function ResultPage({ params }: ResultPageProps) {
  // Next.js 15+ 규격에 맞추어 params 비동기 해석
  const resolvedParams = await params;
  const rawType = resolvedParams.type || "";

  // 주소창에 소문자(예: /result/enfp)로 들어와도 대문자로 변환하여 조회
  const upperType = rawType.toUpperCase();
  const typeInfo = getTypeInfo(upperType);

  // 16가지에 등록되지 않은 잘못된 유형 코드일 경우 예외 화면 출력
  if (!typeInfo) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-4">
        {/* 오류 안내 아이콘 */}
        <div className="w-20 h-20 rounded-3xl bg-amber-100/80 flex items-center justify-center text-4xl mb-4 shadow-inner">
          🔍
        </div>

        {/* 안내 제목 */}
        <h1 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
          없는 유형이에요
        </h1>

        {/* 안내 설명 */}
        <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-[260px] leading-relaxed">
          올바른 MBTI 성격 유형 주소인지 다시 한번 확인해 주세요.
        </p>

        {/* 홈으로 돌아가기 버튼 */}
        <Link
          href="/"
          className="w-full max-w-[240px] py-4 px-6 text-center text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl shadow-lg shadow-emerald-400/30 active:scale-[0.98] transition-all"
        >
          홈으로 가기
        </Link>
      </div>
    );
  }

  // 등록된 정상 유형일 경우 상세 결과 콘텐츠 렌더링
  return <ResultContent info={typeInfo} />;
}
