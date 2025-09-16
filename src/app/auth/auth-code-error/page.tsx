import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-black">
            인증 오류
          </CardTitle>
          <CardDescription className="text-[#222222]">
            로그인 중 오류가 발생했습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#222222] text-center">
            인증 과정에서 문제가 발생했습니다. 다시 시도해주세요.
          </p>
          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full bg-black hover:bg-white hover:text-black hover:border-black border-2 border-black text-white transition-all duration-300">
              <Link href="/auth/login">로그인 페이지로 돌아가기</Link>
            </Button>
            <Button asChild variant="outline" className="w-full border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white transition-all duration-300">
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
