import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "실시간 유형 통계",
  description: "어떤 성격 유형이 가장 많을까요? 참여자들의 실시간 유형 순위와 통계를 확인해보세요.",
  openGraph: {
    title: "실시간 유형 통계 | 희진 MBTI",
    description: "어떤 성격 유형이 가장 많을까요? 참여자들의 실시간 유형 순위와 통계를 확인해보세요.",
  },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
