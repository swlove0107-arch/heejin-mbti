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
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

// 환경변수가 플레이스홀더이거나 유효한 URL이 아닐 때 정적 빌드(prerendering) 실패를 방지하기 위한 대체값
const isValidUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://");
const supabaseUrl = isValidUrl ? rawUrl : "https://placeholder-project.supabase.co";
const supabasePublishableKey = rawKey && !rawKey.includes("여기에") ? rawKey : "placeholder-key";

// Supabase 클라이언트를 하나만 만들어서 내보낸다
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
