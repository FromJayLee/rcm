/**
 * 환경변수 검증 및 관리 유틸리티
 * 지연 가드 방식으로 모듈 로드 시 throw하지 않음
 */

/**
 * 공개 환경변수 읽기 함수 (모듈 로드 시 throw하지 않음)
 * @returns 공개 환경변수 객체
 */
export function getPublicEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

/**
 * 공개 환경변수 존재 여부 확인
 * @returns 환경변수가 모두 존재하는지 여부
 */
export function hasPublicEnv() {
  const { url, anonKey } = getPublicEnv();
  return Boolean(url && anonKey);
}

/**
 * 서버 환경변수 읽기 함수
 * @returns 서버 환경변수 객체
 */
export function getServerEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

/**
 * 서버 환경변수 존재 여부 확인
 * @returns 서버 환경변수가 모두 존재하는지 여부
 */
export function hasServerEnv() {
  const { url, anonKey, serviceRoleKey } = getServerEnv();
  return Boolean(url && anonKey && serviceRoleKey);
}

/**
 * 환경변수 존재 여부 확인 (오류 없이)
 * @param key 환경변수 키
 * @returns 존재 여부
 */
export const hasEnv = (key: string): boolean => {
  const value = process.env[key];
  return !!(value && value.trim() !== '');
};

/**
 * Supabase 관련 필수 환경변수 검증 (지연 가드)
 * @param isServer 서버 환경인지 여부
 * @returns Supabase 설정 객체
 * @throws 환경변수가 없을 때만 오류
 */
export const validateSupabaseEnv = (isServer: boolean = false) => {
  const { url, anonKey } = getPublicEnv();
  
  if (!url || !anonKey) {
    const missing = [];
    if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!anonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    
    throw new Error(
      `[SupabaseError] Missing required environment variables: ${missing.join(', ')}. ` +
      'Please set these in Vercel Environment Variables and redeploy.'
    );
  }
  
  const result = {
    url,
    anonKey,
    serviceRoleKey: null as string | null,
  };
  
  // 서버 환경에서만 서비스 롤 키 확인
  if (isServer) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceRoleKey) {
      result.serviceRoleKey = serviceRoleKey;
    }
  }
  
  return result;
};