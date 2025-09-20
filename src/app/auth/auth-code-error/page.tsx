'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function AuthCodeErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'session_exchange_failed':
        return '세션 교환에 실패했습니다. OAuth 코드가 유효하지 않거나 만료되었습니다.';
      case 'callback_error':
        return '콜백 처리 중 오류가 발생했습니다.';
      case 'no_code':
        return 'OAuth 코드가 전달되지 않았습니다. 이는 Supabase 리다이렉트 설정 문제일 수 있습니다.';
      case 'oauth_provider_error':
        return 'OAuth 제공자(Google/GitHub)에서 오류가 발생했습니다.';
      default:
        return 'OAuth 인증 과정에서 문제가 발생했습니다.';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#F8F8F4] border-[#D9D7CF]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-black">
            인증 오류
          </CardTitle>
          <CardDescription className="text-[#222222]">
            로그인 중 오류가 발생했습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-[#222222] text-center">
              {getErrorMessage(error)}
            </p>
            {error && (
              <div className="bg-[#D9D7CF] p-3 rounded-lg">
                <h4 className="font-semibold text-black text-sm mb-2">오류 코드:</h4>
                <p className="text-xs text-[#222222] font-mono">{error}</p>
              </div>
            )}
            <div className="bg-[#D9D7CF] p-3 rounded-lg">
              <h4 className="font-semibold text-black text-sm mb-2">가능한 원인:</h4>
              <ul className="text-xs text-[#222222] space-y-1">
                <li>• Google OAuth 설정이 완료되지 않음</li>
                <li>• Supabase URL Configuration 설정 오류</li>
                <li>• 환경 변수 설정 문제</li>
                <li>• 네트워크 연결 문제</li>
              </ul>
            </div>
            <p className="text-xs text-[#222222] text-center">
              문제가 지속되면 개발자에게 문의해주세요.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full bg-black hover:bg-[#111111] text-white transition-all duration-200">
              <Link href="/auth/login">로그인 페이지로 돌아가기</Link>
            </Button>
            <Button asChild className="w-full bg-black hover:bg-[#111111] text-white transition-all duration-200">
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthCodeErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#F8F8F4] border-[#D9D7CF]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-black">
              로딩 중...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="animate-pulse bg-[#D9D7CF] h-4 rounded"></div>
            <div className="animate-pulse bg-[#D9D7CF] h-4 rounded"></div>
            <div className="animate-pulse bg-[#D9D7CF] h-4 rounded"></div>
          </CardContent>
        </Card>
      </div>
    }>
      <AuthCodeErrorContent />
    </Suspense>
  );
}
