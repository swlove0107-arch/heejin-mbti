/**
 * Supabase 클라이언트 (브라우저 전용)
 *
 * - 앱 전체에서 이 파일의 클라이언트 하나만 사용한다
 * - 브라우저에서 supabase-js 로 Supabase 를 직접 호출한다
 * - @supabase/ssr, 미들웨어, 서버 액션, 서버 쪽 인증은 사용하지 않는다
 * - 비밀 키(sb_secret_, service_role)는 절대 넣지 않는다
 */

import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 Supabase 접속 정보를 가져온다
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Supabase 클라이언트를 하나만 만들어서 내보낸다
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
