'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Github, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const next = searchParams.get('next') || '/app/editor';

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Supabase OAuth 사용 (원래 방식)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error('Google OAuth error:', error);
        toast({
          title: '오류 발생',
          description: 'Google 로그인 중 오류가 발생했습니다',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Google OAuth exception:', error);
      toast({
        title: '오류 발생',
        description: 'Google 로그인 중 오류가 발생했습니다',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    setIsLoading(true);
    try {
      // 직접 OAuth URL 생성
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const redirectTo = encodeURIComponent(`${window.location.origin}/auth/callback`);
      const oauthUrl = `${supabaseUrl}/auth/v1/authorize?provider=github&redirect_to=${redirectTo}`;
      
      console.log('Direct OAuth URL:', oauthUrl);
      window.location.href = oauthUrl;
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      toast({
        title: '오류 발생',
        description: 'GitHub 로그인 중 오류가 발생했습니다',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#F8F8F4] border-[#D9D7CF]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-black">
            로그인
          </CardTitle>
          <CardDescription className="text-[#222222]">
            계정에 로그인하여 에디터를 사용하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              className="w-full bg-black hover:bg-[#111111] text-white transition-all duration-200"
              onClick={loginWithGoogle}
              disabled={isLoading}
            >
              <Mail className="w-4 h-4 mr-2" />
              구글로 로그인하기
            </Button>
            <Button
              type="button"
              className="w-full bg-black hover:bg-[#111111] text-white transition-all duration-200"
              onClick={loginWithGithub}
              disabled={isLoading}
            >
              <Github className="w-4 h-4 mr-2" />
              깃허브로 로그인하기
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-[#222222]">계정이 없으신가요? </span>
            <Link
              href="/auth/signup"
              className="text-black hover:underline font-medium"
            >
              회원가입
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
