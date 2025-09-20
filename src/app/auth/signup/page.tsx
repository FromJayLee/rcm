'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Github, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const next = searchParams.get('next') || '/app/editor';

  const signupWithGoogle = async () => {
    setIsLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo: `${window.location.origin}/auth/callback` 
        }
      });
    } catch (error) {
      toast({
        title: '오류 발생',
        description: 'Google 회원가입 중 오류가 발생했습니다',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const signupWithGithub = async () => {
    setIsLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { 
          redirectTo: `${window.location.origin}/auth/callback` 
        }
      });
    } catch (error) {
      toast({
        title: '오류 발생',
        description: 'GitHub 회원가입 중 오류가 발생했습니다',
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
            회원가입
          </CardTitle>
          <CardDescription className="text-[#222222]">
            새 계정을 만들어 에디터를 사용하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              className="w-full bg-black hover:bg-[#111111] text-white transition-all duration-200"
              onClick={signupWithGoogle}
              disabled={isLoading}
            >
              <Mail className="w-4 h-4 mr-2" />
              구글로 회원가입하기
            </Button>
            <Button
              type="button"
              className="w-full bg-black hover:bg-[#111111] text-white transition-all duration-200"
              onClick={signupWithGithub}
              disabled={isLoading}
            >
              <Github className="w-4 h-4 mr-2" />
              깃허브로 회원가입하기
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-[#222222]">이미 계정이 있으신가요? </span>
            <Link
              href="/auth/login"
              className="text-black hover:underline font-medium"
            >
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
