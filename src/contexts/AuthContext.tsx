/**
 * AuthContext — 로그인 상태를 앱 전체에서 공유하는 컨텍스트
 *
 * - Supabase 의 onAuthStateChange 를 감시해서 로그인/로그아웃을 실시간 반영한다
 * - user, loading, signOut 을 자식 컴포넌트 어디서든 꺼내 쓸 수 있다
 * - 브라우저 전용 (클라이언트 컴포넌트)
 */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

// 컨텍스트에 담길 값의 형태
interface AuthContextValue {
  user: User | null; // 로그인한 회원 정보 (없으면 null)
  loading: boolean; // 로그인 상태를 아직 확인하는 중인지
  signOut: () => Promise<void>; // 로그아웃 함수
}

// 기본값으로 컨텍스트 생성
const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
});

// 다른 컴포넌트에서 useAuth() 로 꺼내 쓸 수 있도록 내보낸다
export function useAuth() {
  return useContext(AuthContext);
}

// 레이아웃에 감싸서 모든 페이지에 로그인 상태를 공급하는 Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) 현재 세션 확인 (새로고침 시에도 유지)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2) 로그인/로그아웃 이벤트를 감시한다
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 컴포넌트가 사라지면 감시를 해제한다
    return () => subscription.unsubscribe();
  }, []);

  // 로그아웃 함수
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
