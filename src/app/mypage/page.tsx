/**
 * 마이페이지 (/mypage)
 *
 * - 로그인한 회원 전용 페이지 (비로그인 시 /login?next=/mypage 로 리다이렉트)
 * - 상단: 회원 닉네임과 이메일 표시
 * - 가장 최근에 검사한 유형의 3D 동물 캐릭터 표시
 * - 검사 결과 목록 (최신순): 저장 날짜, 유형 코드, 한글 별명, 결과 페이지 이동 링크, 삭제 기능
 * - 저장된 결과가 없을 경우 안내 및 검사 시작 버튼 표시
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { getTypeInfo } from "@/data/types";
import CharacterViewer from "@/components/3d/CharacterViewer";

// DB test_results 테이블의 행 인터페이스
interface TestResultItem {
  id: number;
  user_id: string;
  mbti_type: string;
  created_at: string;
}

// 날짜 포맷 함수 (2026.11.17 형식)
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  } catch {
    return dateStr;
  }
}

export default function MyPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [results, setResults] = useState<TestResultItem[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  // 1) 로그인 확인 및 비로그인 접근 차단
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?next=/mypage");
    }
  }, [user, authLoading, router]);

  // 2) 회원의 검사 결과 목록 가져오기 (최신순)
  useEffect(() => {
    if (!user) return;

    async function fetchResults() {
      setDataLoading(true);
      const { data, error } = await supabase
        .from("test_results")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setResults(data as TestResultItem[]);
      }
      setDataLoading(false);
    }

    fetchResults();
  }, [user]);

  // 3) 결과 삭제 처리
  const handleDelete = async (id: number, typeCode: string) => {
    const confirmed = window.confirm(
      `[${typeCode}] 검사 기록을 정말 삭제하시겠어요?`
    );
    if (!confirmed) return;

    const { error } = await supabase.from("test_results").delete().eq("id", id);
    if (error) {
      alert("삭제하는 중 오류가 발생했습니다: " + error.message);
    } else {
      // 목록에서 즉시 제거
      setResults((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 인증 상태 확인 중이거나 비로그인 리다이렉트 대기 중
  if (authLoading || (!user && authLoading)) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 text-slate-400 text-sm">
        불러오는 중...
      </div>
    );
  }

  // 비로그인 상태일 때는 화면을 비우고 리다이렉트를 기다린다
  if (!user) {
    return null;
  }

  // 닉네임 가져오기 (가입 시 저장한 metadata 우선, 없으면 이메일 앞자리)
  const nickname =
    user.user_metadata?.nickname || user.email?.split("@")[0] || "회원";

  // 가장 최근에 저장한 검사 결과
  const latestResult = results.length > 0 ? results[0] : null;
  const latestInfo = latestResult ? getTypeInfo(latestResult.mbti_type) : null;

  return (
    <div className="flex-1 flex flex-col items-center py-2">
      {/* 1. 상단 프로필 헤더 영역 */}
      <div className="w-full bg-white/90 border border-pink-100/80 rounded-3xl p-5 shadow-sm mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600 text-xl mb-3 shadow-inner">
          👤
        </div>
        <h1 className="text-xl font-extrabold text-slate-800 mb-1">
          <span className="text-pink-600">{nickname}</span> 님의 기록
        </h1>
        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
      </div>

      {/* 2. 가장 최근 결과 3D 캐릭터 또는 빈 상태 */}
      {dataLoading ? (
        <div className="w-full py-16 flex items-center justify-center text-slate-400 text-sm">
          기록을 불러오는 중...
        </div>
      ) : results.length === 0 ? (
        // 결과가 아직 없는 경우
        <div className="w-full bg-white/80 border border-dashed border-pink-200/80 rounded-3xl p-8 flex flex-col items-center text-center my-6">
          <span className="text-4xl mb-3">🧭</span>
          <h3 className="text-base font-bold text-slate-700 mb-1">
            아직 저장한 결과가 없어요
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            12개 질문에 답하고 나만의 3D 동물 캐릭터를 찾아보세요!
          </p>
          <Link
            href="/test"
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-400/30 transition-all active:scale-95"
          >
            검사하러 가기
          </Link>
        </div>
      ) : (
        // 결과가 있는 경우: 최근 캐릭터 + 목록
        <div className="w-full flex flex-col items-center">
          {latestInfo && (
            <div
              className="w-full rounded-3xl p-4 flex flex-col items-center text-center border shadow-inner mb-6 relative overflow-hidden"
              style={{
                backgroundColor: `${latestInfo.color}15`,
                borderColor: `${latestInfo.color}40`,
              }}
            >
              <div className="w-full flex items-center justify-between px-2 mb-1">
                <span className="text-[11px] font-bold text-slate-500 bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200/50">
                  최근 검사한 유형
                </span>
                <span
                  className="text-xs font-black tracking-wider"
                  style={{ color: latestInfo.color }}
                >
                  {latestInfo.code}
                </span>
              </div>

              {/* 3D 캐릭터 뷰어 */}
              <div className="w-full h-[220px] relative">
                <CharacterViewer typeCode={latestInfo.code} />
              </div>

              <div className="mt-1">
                <h3 className="text-sm font-extrabold text-slate-800">
                  {latestInfo.character.name} ({latestInfo.character.animal})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  &ldquo;{latestInfo.nickname}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* 3. 내 검사 기록 목록 */}
          <div className="w-full mb-6">
            <h2 className="text-sm font-extrabold text-slate-700 mb-3 flex items-center justify-between">
              <span>📋 검사 기록 목록</span>
              <span className="text-xs font-semibold text-pink-600">
                총 {results.length}개
              </span>
            </h2>

            <div className="space-y-2.5">
              {results.map((item) => {
                const typeInfo = getTypeInfo(item.mbti_type);
                const color = typeInfo?.color || "#ec4899";
                const nicknameStr = typeInfo?.nickname || "성격 유형";

                return (
                  <div
                    key={item.id}
                    className="w-full bg-white border border-slate-100 hover:border-pink-200 rounded-2xl p-3.5 shadow-xs transition-all flex items-center justify-between gap-3"
                  >
                    {/* 클릭 시 결과 페이지로 이동하는 링크 영역 */}
                    <Link
                      href={`/result/${item.mbti_type}`}
                      className="flex-1 flex items-center gap-3 min-w-0"
                    >
                      {/* 유형 뱃지 */}
                      <span
                        className="text-xs font-black px-2.5 py-1.5 rounded-xl border shrink-0 text-center"
                        style={{
                          backgroundColor: `${color}15`,
                          borderColor: `${color}40`,
                          color: color,
                        }}
                      >
                        {item.mbti_type}
                      </span>

                      {/* 날짜와 별명 */}
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          &ldquo;{nicknameStr}&rdquo;
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {formatDate(item.created_at)}
                        </span>
                      </div>
                    </Link>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => handleDelete(item.id, item.mbti_type)}
                      className="text-xs font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors shrink-0"
                      title="기록 삭제"
                    >
                      삭제
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
