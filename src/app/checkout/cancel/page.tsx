'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-semibold text-black">
            결제가 취소되었습니다
          </CardTitle>
          <CardDescription className="text-[#222222]">
            결제 과정이 중단되었습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-red-800 font-medium">
              결제가 완료되지 않았습니다.
            </p>
            <p className="text-red-600 text-sm mt-1">
              언제든지 다시 시도하실 수 있습니다.
            </p>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full bg-black hover:bg-white hover:text-black hover:border-black border-2 border-black text-white transition-all duration-300">
              <Link href="/checkout">
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도하기
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all duration-300">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>

          <div className="text-center text-sm text-[#222222]">
            <p>
              결제에 문제가 있으셨나요?
            </p>
            <p className="mt-1">
              고객지원팀에 문의해주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
