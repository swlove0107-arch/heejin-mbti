-- ==============================================
-- 찌니 MBTI — 전체 유형별 통계 함수
-- Supabase 대시보드 → SQL Editor 에 붙여 넣어 실행한다
-- 두 번 실행해도 오류가 나지 않는다 (CREATE OR REPLACE 사용)
-- ==============================================

-- ① 유형별 저장된 결과 개수를 집계하는 함수
-- 보안(RLS) 때문에 일반 클라이언트에서는 다른 회원의 개별 행을 볼 수 없으므로,
-- 회원 정보나 개별 데이터 없이 오직 "유형 코드"와 "개수"만 집계하여 반환한다.
CREATE OR REPLACE FUNCTION public.get_type_stats()
RETURNS TABLE (
  mbti_type text,
  count bigint
)
LANGUAGE sql
SECURITY DEFINER                 -- 함수 작성자 권한으로 실행 (안전하게 집계만 수행)
SET search_path = ''             -- 스키마 하이재킹 방지를 위해 search_path 를 비움
AS $$
  SELECT
    t.mbti_type,
    COUNT(*)::bigint AS count
  FROM public.test_results t
  GROUP BY t.mbti_type
  ORDER BY count DESC;
$$;

-- ② 권한 부여
-- 로그인하지 않은 방문자(anon)와 로그인한 회원(authenticated) 모두가 통계를 조회할 수 있도록 허용한다.
GRANT EXECUTE ON FUNCTION public.get_type_stats() TO anon, authenticated;
