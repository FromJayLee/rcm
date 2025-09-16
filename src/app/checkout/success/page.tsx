'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function CheckoutSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Simulate loading and token balance update
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would fetch the updated token balance here
      setTokenBalance(20); // Example balance
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, router]);

  const handleGoToEditor = () => {
    router.push('/app/editor');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-semibold text-black">
            결제 성공!
          </CardTitle>
          <CardDescription className="text-[#222222]">
            토큰이 성공적으로 충전되었습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#222222]">토큰을 충전하고 있습니다...</p>
            </div>
          ) : (
            <>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-green-800 font-medium">
                  토큰이 계정에 성공적으로 추가되었습니다!
                </p>
                {tokenBalance && (
                  <p className="text-green-600 text-sm mt-1">
                    현재 잔액: {tokenBalance} 토큰
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleGoToEditor}
                  className="w-full bg-black hover:bg-white hover:text-black hover:border-black border-2 border-black text-white transition-all duration-300"
                  size="lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  에디터로 이동
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  onClick={() => router.push('/checkout')}
                  variant="outline"
                  className="w-full border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all duration-300"
                >
                  추가 구매
                </Button>
              </div>

              <div className="text-center text-sm text-[#222222]">
                <p>
                  이메일로 결제 확인서를 받으실 수 있습니다.
                </p>
                <p className="mt-1">
                  문제가 있으시면 고객지원팀에 문의해주세요.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
