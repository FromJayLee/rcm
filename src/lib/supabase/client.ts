import { createBrowserClient } from "@supabase/ssr";
import { getPublicEnv } from "../env";

/**
 * 브라우저 환경에서 사용할 Supabase 클라이언트 생성
 * 클라이언트 컴포넌트에서 사용
 * @returns Supabase 브라우저 클라이언트 또는 null (환경변수 없을 때)
 */
export function createSupabaseBrowserClient() {
  const { url, anonKey } = getPublicEnv();
  
  if (!url || !anonKey) {
    return null;
  }
  
  return createBrowserClient(url, anonKey);
}

/**
 * @deprecated getBrowserSupabase 대신 createSupabaseBrowserClient 사용
 * 하위 호환성을 위해 유지
 */
export function getBrowserSupabase() {
  return createSupabaseBrowserClient();
}
