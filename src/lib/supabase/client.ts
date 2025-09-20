import { createBrowserClient } from "@supabase/ssr";
import { validateSupabaseEnv } from "../env";

/**
 * 브라우저 환경에서 사용할 Supabase 클라이언트 생성
 * 클라이언트 컴포넌트에서 사용
 * @returns Supabase 브라우저 클라이언트
 */
export function createSupabaseBrowserClient() {
  try {
    const { url, anonKey } = validateSupabaseEnv(false);
    
    // URL과 키가 유효한지 추가 검증
    if (!url || url === 'https://placeholder.supabase.co' || !anonKey || anonKey === 'placeholder_anon_key') {
      console.warn('[Supabase] Using placeholder values. Supabase features will not work properly.');
      console.warn('[Supabase] Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
    }
    
    return createBrowserClient(url, anonKey);
  } catch (error) {
    console.error('[Supabase] Failed to create browser client:', error);
    // 환경변수 오류 시에도 기본 클라이언트 반환 (오류 방지)
    return createBrowserClient('https://placeholder.supabase.co', 'placeholder_anon_key');
  }
}

/**
 * @deprecated getBrowserSupabase 대신 createSupabaseBrowserClient 사용
 * 하위 호환성을 위해 유지
 */
export function getBrowserSupabase() {
  return createSupabaseBrowserClient();
}
