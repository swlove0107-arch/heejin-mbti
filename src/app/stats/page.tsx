/**
 * 통계 페이지 (/stats)
 *
 * - 로그인 여부와 관계없이 누구나 볼 수 있는 전체 유형 통계
 * - DB 함수 get_type_stats() 를 호출하여 유형별 저장된 개수를 가져온다
 * - 상단: 전체 집계된 결과 개수 (예: "지금까지 128개의 결과가 모였어요")
 * - 1위 유형의 3D 캐릭터 및 별명 강조
 * - 16개 유형 전체를 많은 순으로 정렬한 가로 막대 그래프 (순수 HTML/CSS)
 * - 저장된 결과가 없을 경우 빈 화면 안내
 */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { mbtiTypes, getTypeInfo } from "@/data/types";
import CharacterViewer from "@/components/3d/CharacterViewer";

// RPC 반환 데이터 타입
interface StatItem {
  mbti_type: string;
  count: number;
}

// 화면 렌더링용 통계 아이템 (16개 전체)
interface FormattedStat {
  code: string;
  count: number;
  percentage: number;
  nickname: string;
  color: string;
  animal: string;
  characterName: string;
}

export default function StatsPage() {
  const [stats, setStats] = useState<FormattedStat[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        // Supabase DB 함수 get_type_stats() 호출
        const { data, error } = await supabase.rpc("get_type_stats");

        // DB에서 가져온 개수 맵 매핑
        const countMap = new Map<string, number>();
        if (!error && Array.isArray(data)) {
          (data as StatItem[]).forEach((row) => {
            countMap.set(row.mbti_type.toUpperCase(), Number(row.count));
          });
        }

        // 전체 저장 개수 계산
        let total = 0;
        countMap.forEach((cnt) => {
          total += cnt;
        });
        setTotalCount(total);

        // 16개 전체 유형을 배열로 만들고 개수 많은 순서대로 정렬
        const allTypesList: FormattedStat[] = Object.keys(mbtiTypes).map((code) => {
          const info = getTypeInfo(code)!;
          const count = countMap.get(code) || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;

          return {
            code,
            count,
            percentage,
            nickname: info.nickname,
            color: info.color,
            animal: info.character.animal,
            characterName: info.character.name,
          };
        });

        // 1) 개수 내림차순, 2) 동일 개수 시 유형 코드 알파벳순 정렬
        allTypesList.sort((a, b) => {
          if (b.count !== a.count) {
            return b.count - a.count;
          }
          return a.code.localeCompare(b.code);
        });

        setStats(allTypesList);
      } catch (err) {
        console.error("통계 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  // 불러오는 중 상태
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-400 text-sm">
        <span className="text-2xl mb-2 animate-bounce">📊</span>
        <span>통계를 불러오는 중...</span>
      </div>
    );
  }

  // 1위 유형 (저장된 결과가 있을 때만)
  const topType = totalCount > 0 && stats.length > 0 && stats[0].count > 0 ? stats[0] : null;

  return (
    <div className="flex-1 flex flex-col items-center py-2">
      {/* 1. 상단 통계 헤더 영역 */}
      <div className="w-full text-center pt-2 mb-6">
        <span className="px-3.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full mb-3 inline-block">
          실시간 유형 통계
        </span>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
          어떤 유형이 가장 많을까요?
        </h1>
        <p className="text-sm font-semibold text-emerald-600">
          {totalCount > 0
            ? `지금까지 ${totalCount.toLocaleString()}개의 결과가 모였어요!`
            : "아직 모인 결과가 없어요"}
        </p>
      </div>

      {/* 2. 저장된 결과가 하나도 없을 때 안내 */}
      {totalCount === 0 ? (
        <div className="w-full bg-white/80 border border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center my-6">
          <span className="text-4xl mb-3">🌱</span>
          <h3 className="text-base font-bold text-slate-700 mb-1">
            아직 모인 결과가 없어요
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            가장 먼저 검사를 완료하고 첫 번째 결과를 등록해 보세요!
          </p>
          <Link
            href="/test"
            className="py-3 px-6 rounded-2xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 shadow-md shadow-emerald-400/30 transition-all active:scale-95"
          >
            검사하러 가기
          </Link>
        </div>
      ) : (
        <>
          {/* 3. 1위 유형 3D 캐릭터 하이라이트 카드 */}
          {topType && (
            <div
              className="w-full rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center border shadow-inner mb-6 relative overflow-hidden transition-all"
              style={{
                backgroundColor: `${topType.color}15`,
                borderColor: `${topType.color}40`,
              }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200/50 shadow-xs mb-2">
                <span className="text-amber-500 text-xs">👑</span>
                <span className="text-xs font-bold text-slate-700">가장 많은 유형 1위</span>
              </div>

              {/* 3D 캐릭터 뷰어 */}
              <div className="w-full h-[240px] relative">
                <CharacterViewer typeCode={topType.code} />
              </div>

              <div className="mt-2">
                <h2
                  className="text-2xl font-black tracking-wider mb-0.5"
                  style={{ color: topType.color }}
                >
                  {topType.code}
                </h2>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {topType.characterName} ({topType.animal})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  &ldquo;{topType.nickname}&rdquo;
                </p>
                <div className="mt-2 text-xs font-bold text-emerald-600 bg-white/80 px-3 py-1 rounded-full border border-emerald-100 inline-block">
                  총 {topType.count}명 ({topType.percentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          )}

          {/* 4. 16개 유형 전체 가로 막대 그래프 */}
          <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 shadow-xs mb-6">
            <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center justify-between">
              <span>📊 전체 16가지 유형 순위</span>
              <span className="text-[11px] font-medium text-slate-400">
                비율순 정렬
              </span>
            </h3>

            <div className="space-y-3.5">
              {stats.map((item, index) => {
                // 막대 그래프 최대 너비 (1위 기준 비율 또는 전체 비율 기준)
                const barWidth = Math.max(item.percentage, 2); // 0%라도 아주 얇게 시각적 최소 너비

                return (
                  <Link
                    key={item.code}
                    href={`/result/${item.code}`}
                    className="block group"
                  >
                    {/* 상단 라벨: 순위 + 유형코드 + 별명 / 개수 + 퍼센트 */}
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-4 font-bold text-slate-400 text-[11px]">
                          {index + 1}
                        </span>
                        <span
                          className="font-black tracking-wide"
                          style={{ color: item.color }}
                        >
                          {item.code}
                        </span>
                        <span className="text-slate-600 font-medium truncate text-[11px] group-hover:text-emerald-600 transition-colors">
                          {item.characterName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 text-[11px]">
                        <span className="font-bold text-slate-700">
                          {item.count}명
                        </span>
                        <span className="text-slate-400 font-semibold w-10 text-right">
                          {item.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* 가로 막대 바 트랙 및 채움 */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex items-center p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${item.percentage > 0 ? barWidth : 0}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
