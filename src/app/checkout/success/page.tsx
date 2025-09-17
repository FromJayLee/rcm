'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Coins, ArrowRight } from 'lucide-react';
import { useTokenBalance } from '@/hooks/useTokenBalance';

export default function CheckoutSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { tokenBalance } = useTokenBalance();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center">
        <div className="animate-pulse bg-[#D9D7CF] h-8 w-8 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#F8F8F4] border-[#D9D7CF]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-black">
            결제 완료!
          </CardTitle>
          <CardDescription className="text-[#222222]">
            토큰이 성공적으로 구입되었습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token Balance */}
          <div className="bg-[#D9D7CF] p-4 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Coins className="w-5 h-5 text-[#222222]" />
              <span className="text-sm text-[#222222]">현재 토큰 잔액</span>
            </div>
            <div className="text-3xl font-bold text-black">{tokenBalance} 토큰</div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <p className="text-sm text-[#222222]">
              이제 더 많은 증언카드를 생성할 수 있습니다!
            </p>
            <p className="text-xs text-[#222222]/70">
              카드 생성 시 5토큰이 소모됩니다.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/app/editor')}
              className="w-full bg-black hover:bg-[#111111] text-white transition-all duration-200"
            >
              카드 생성하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="w-full border-[#222222] text-[#222222] hover:bg-[#D9D7CF] transition-all duration-200"
            >
              Dashboard로 이동
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}