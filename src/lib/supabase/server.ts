import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { validateSupabaseEnv } from "../env";

/**
 * 서버 환경에서 사용할 Supabase 클라이언트 생성 (쿠키 기반)
 * Server Component, Server Actions에서 사용
 * @returns Supabase 서버 클라이언트 (쿠키 지원)
 */
export async function createSupabaseServerClient() {
  const { url, anonKey } = validateSupabaseEnv(true);
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

/**
 * 서버 환경에서 사용할 순수 Supabase 클라이언트 생성 (쿠키 없음)
 * 서비스 롤 키를 사용하여 관리자 권한으로 작업할 때 사용
 * @returns Supabase 서버 클라이언트 (쿠키 없음, 서비스 롤 키 사용)
 */
export async function createSupabaseServiceClient() {
  const { url, serviceRoleKey } = validateSupabaseEnv(true);
  
  if (!serviceRoleKey) {
    throw new Error(
      '[SupabaseError] SUPABASE_SERVICE_ROLE_KEY is required for service client. ' +
      'Set SUPABASE_SERVICE_ROLE_KEY in your environment variables.'
    );
  }

  return createServerClient(url, serviceRoleKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {},
    },
  });
}

/**
 * @deprecated getServerSupabase 대신 createSupabaseServerClient 사용
 * 하위 호환성을 위해 유지
 */
export async function getServerSupabase() {
  return createSupabaseServerClient();
}

/**
 * @deprecated createPureClient 대신 createSupabaseServiceClient 사용
 * 하위 호환성을 위해 유지
 */
export async function createPureClient() {
  return createSupabaseServiceClient();
}
