'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('처리 중...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('=== Client-side OAuth Callback ===');
        console.log('Current URL:', window.location.href);
        
        // URL 해시에서 토큰 추출
        const urlHash = window.location.hash.substring(1); // # 제거
        console.log('URL Hash:', urlHash);
        
        if (urlHash) {
          const hashParams = new URLSearchParams(urlHash);
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          const expiresAt = hashParams.get('expires_at');
          
          console.log('Extracted tokens:', { 
            accessToken: !!accessToken, 
            refreshToken: !!refreshToken, 
            expiresAt 
          });
          
          if (accessToken) {
            setStatus('세션 설정 중...');
            
            // access_token으로 세션 설정
            const supabase = createSupabaseBrowserClient();
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });
            
            console.log('Session set result:', { data, error });
            
            if (!error && data.session) {
              console.log('OAuth success, redirecting to editor');
              setStatus('로그인 성공! 에디터로 이동 중...');
              
              // URL에서 해시 제거
              window.history.replaceState({}, document.title, window.location.pathname);
              
              // 에디터로 리다이렉트
              router.replace('/app/editor');
            } else {
              console.error('Session set failed:', error);
              setError(`세션 설정 실패: ${error?.message || 'Unknown error'}`);
            }
          } else {
            setError('access_token을 찾을 수 없습니다.');
          }
        } else {
          // URL 파라미터에서 code 확인
          const code = searchParams.get('code');
          console.log('Code parameter:', code);
          
          if (code) {
            setStatus('코드 교환 중...');
            
            const supabase = createSupabaseBrowserClient();
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            
            console.log('Code exchange result:', { data, error });
            
            if (!error && data.session) {
              console.log('OAuth success with code, redirecting to editor');
              setStatus('로그인 성공! 에디터로 이동 중...');
              router.replace('/app/editor');
            } else {
              console.error('Code exchange failed:', error);
              setError(`코드 교환 실패: ${error?.message || 'Unknown error'}`);
            }
          } else {
            setError('OAuth 코드나 토큰을 찾을 수 없습니다.');
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(`인증 처리 중 오류: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#F8F8F4] border-[#D9D7CF]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-black">
            인증 처리 중
          </CardTitle>
          <CardDescription className="text-[#222222]">
            {status}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#F8F8F4] border-[#D9D7CF]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-black">
              로딩 중...
            </CardTitle>
            <CardDescription className="text-[#222222]">
              인증을 처리하고 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
