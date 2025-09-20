/**
 * 환경변수 검증 및 관리 유틸리티
 * 클라이언트/서버 경계를 명확히 하고 누락 시 명확한 오류 메시지 제공
 */

/**
 * 환경변수가 존재하고 비어있지 않은지 검증
 * @param key 환경변수 키
 * @returns 환경변수 값
 * @throws Error 환경변수가 누락되거나 비어있는 경우
 */
export const requireEnv = (key: string): string => {
  const value = process.env[key];
  
  if (!value || value.trim() === '') {
    const isPublic = key.startsWith('NEXT_PUBLIC_');
    const hint = isPublic 
      ? 'Vercel의 Environment Variables에서 Client(브라우저) 접근이 필요한 키입니다.'
      : '서버 전용 키입니다(브라우저에 노출 금지).';
    
    // 개발 환경에서는 더 친화적인 오류 메시지
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[EnvWarning] ${key} is not set. Please create .env.local file with Supabase configuration.`);
      console.warn(`Required: ${key}=your_${key.toLowerCase().replace('next_public_', '')}_value`);
      console.warn('For now, using placeholder values. This will cause authentication to fail.');
      
      // 개발 환경에서는 플레이스홀더 값 반환
      if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
        return 'https://placeholder.supabase.co';
      }
      if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
        return 'placeholder_anon_key';
      }
      if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
        return 'placeholder_service_role_key';
      }
    }
    
    throw new Error(
      `[EnvMissing] ${key} is required. ${hint} 설정 후 재배포하세요.`
    );
  }
  
  return value;
};

/**
 * 클라이언트에서 접근 가능한 환경변수 검증
 * @param key NEXT_PUBLIC_ 접두사가 있는 환경변수 키
 * @returns 환경변수 값
 */
export const requirePublicEnv = (key: string): string => {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    throw new Error(
      `[EnvError] ${key} must start with NEXT_PUBLIC_ for client access`
    );
  }
  
  return requireEnv(key);
};

/**
 * 서버에서만 접근 가능한 환경변수 검증
 * @param key 서버 전용 환경변수 키
 * @returns 환경변수 값
 */
export const requireServerEnv = (key: string): string => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    throw new Error(
      `[EnvError] ${key} should not start with NEXT_PUBLIC_ for server-only access`
    );
  }
  
  return requireEnv(key);
};

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
 * Supabase 관련 필수 환경변수 검증
 * @param isServer 서버 환경인지 여부
 * @returns Supabase 설정 객체
 */
export const validateSupabaseEnv = (isServer: boolean = false) => {
  const url = requirePublicEnv('NEXT_PUBLIC_SUPABASE_URL');
  const anonKey = requirePublicEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  const result = {
    url,
    anonKey,
    serviceRoleKey: null as string | null,
  };
  
  // 서버 환경에서만 서비스 롤 키 확인
  if (isServer) {
    if (hasEnv('SUPABASE_SERVICE_ROLE_KEY')) {
      result.serviceRoleKey = requireServerEnv('SUPABASE_SERVICE_ROLE_KEY');
    } else if (hasEnv('SUPABASE_ANON_KEY')) {
      // 서비스 롤 키가 없으면 anon 키 사용 (권한 제한됨)
      result.serviceRoleKey = requireServerEnv('SUPABASE_ANON_KEY');
    }
  }
  
  return result;
};
