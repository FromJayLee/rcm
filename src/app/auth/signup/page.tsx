'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { signupSchema, type SignupFormData } from '@/lib/auth/schemas';
import { getBrowserSupabase } from '@/lib/supabase/client';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const next = searchParams.get('next') || '/app/editor';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const supabase = getBrowserSupabase();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          title: '회원가입 실패',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '회원가입 성공',
          description: '이메일을 확인하여 계정을 활성화해주세요',
        });
        router.push('/auth/login');
      }
    } catch (error) {
      toast({
        title: '오류 발생',
        description: '회원가입 중 오류가 발생했습니다',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      const supabase = getBrowserSupabase();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      if (error) {
        toast({
          title: 'OAuth 회원가입 실패',
          description: error.message,
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: '오류 발생',
        description: 'OAuth 회원가입 중 오류가 발생했습니다',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const continueAsGuest = () => {
    document.cookie = 'guest=true; path=/; max-age=86400';
    router.push('/app/editor');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
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
              variant="outline"
              className="w-full border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all duration-300"
              onClick={() => handleOAuth('google')}
              disabled={isLoading}
            >
              <Mail className="w-4 h-4 mr-2" />
              Google로 계속하기
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all duration-300"
              onClick={() => handleOAuth('github')}
              disabled={isLoading}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub로 계속하기
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#222222]">또는</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                className="bg-[#D9D7CF] border-[#222222] focus:border-black"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력하세요"
                  {...register('password')}
                  className="bg-[#D9D7CF] border-[#222222] focus:border-black pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-[#222222]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#222222]" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력하세요"
                  {...register('confirmPassword')}
                  className="bg-[#D9D7CF] border-[#222222] focus:border-black pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-[#222222]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#222222]" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-white hover:text-black hover:border-black border-2 border-black text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? '회원가입 중...' : '회원가입'}
            </Button>
          </form>

          {/* Guest Mode */}
          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={continueAsGuest}
              className="text-[#222222] hover:text-black hover:bg-[#222222]/10 transition-all duration-300"
            >
              게스트로 계속하기
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
