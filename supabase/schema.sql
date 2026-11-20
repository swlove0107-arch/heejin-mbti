-- ==============================================
-- 찌니 MBTI — 검사 결과 테이블
-- Supabase 대시보드 → SQL Editor 에 붙여 넣어 실행한다
-- 두 번 실행해도 오류가 나지 않는다 (IF NOT EXISTS 사용)
-- ==============================================


-- ① 테이블 만들기
-- 이미 있으면 건너뛴다
CREATE TABLE IF NOT EXISTS public.test_results (

  -- 자동으로 1씩 늘어나는 고유 번호 (기본 키)
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- 결과를 저장한 회원 (auth.users 의 id 를 참조)
  -- 회원이 삭제되면 그 회원의 결과도 함께 삭제된다
  -- 기본값 auth.uid() : 앱이 따로 보내지 않아도 로그인한 회원의 id 가 들어간다
  user_id     uuid NOT NULL DEFAULT auth.uid()
              REFERENCES auth.users (id) ON DELETE CASCADE,

  -- 유형 코드 4글자 (예: ENFP, ISTJ)
  -- E/I, S/N, T/F, J/P 조합만 허용한다
  mbti_type   text NOT NULL,

  -- 저장한 시각 (기본값: 현재 시각)
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ② 유형 코드 형식을 검사하는 제약 조건
-- 이미 있으면 건너뛴다
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'test_results_mbti_type_check'
  ) THEN
    ALTER TABLE public.test_results
      ADD CONSTRAINT test_results_mbti_type_check
      CHECK (mbti_type ~ '^[EI][SN][TF][JP]$');
  END IF;
END
$$;


-- ③ 인덱스: 내 기록을 최신순으로 빨리 찾는다
-- 이미 있으면 건너뛴다
CREATE INDEX IF NOT EXISTS idx_test_results_user_created
  ON public.test_results (user_id, created_at DESC);


-- ④ 행 수준 보안(RLS) 켜기
-- 이미 켜져 있어도 오류가 나지 않는다
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;


-- ⑤ RLS 정책 3개: 로그인한 회원은 자기 데이터만 다룰 수 있다
-- 이미 있으면 먼저 삭제하고 다시 만든다 (두 번 실행해도 안전)

-- 정책 1) 조회: 자기 결과만 볼 수 있다
DROP POLICY IF EXISTS "자기 결과 조회" ON public.test_results;
CREATE POLICY "자기 결과 조회"
  ON public.test_results
  FOR SELECT
  TO authenticated                           -- 로그인한 회원만
  USING (auth.uid() = user_id);              -- 자기 user_id 와 일치하는 행만

-- 정책 2) 저장: 자기 이름으로만 저장할 수 있다
DROP POLICY IF EXISTS "자기 결과 저장" ON public.test_results;
CREATE POLICY "자기 결과 저장"
  ON public.test_results
  FOR INSERT
  TO authenticated                           -- 로그인한 회원만
  WITH CHECK (auth.uid() = user_id);         -- user_id 가 본인이어야 저장 허용

-- 정책 3) 삭제: 자기 결과만 삭제할 수 있다
DROP POLICY IF EXISTS "자기 결과 삭제" ON public.test_results;
CREATE POLICY "자기 결과 삭제"
  ON public.test_results
  FOR DELETE
  TO authenticated                           -- 로그인한 회원만
  USING (auth.uid() = user_id);              -- 자기 user_id 와 일치하는 행만


-- ⑥ 권한 부여
-- 로그인한 회원(authenticated)에게 조회·저장·삭제 권한을 준다
-- 로그인하지 않은 방문자(anon)에게는 아무 권한도 주지 않는다
GRANT SELECT, INSERT, DELETE ON public.test_results TO authenticated;

-- anon 역할의 기존 권한을 명시적으로 모두 회수한다 (혹시 있을 경우 대비)
REVOKE ALL ON public.test_results FROM anon;
