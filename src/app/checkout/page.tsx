'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Coins, Check, Zap, Star, Crown } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { Header } from '@/components/layout/header';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface TokenPlan {
  id: string;
  name: string;
  tokens: number;
  price: number;
  pricePerToken: number;
  popular?: boolean;
  icon: React.ReactNode;
  description: string;
  features: string[];
  note?: string;
}

const tokenPlans: TokenPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tokens: 25,
    price: 0,
    pricePerToken: 0,
    icon: <Coins className="w-6 h-6" />,
    description: '무료로 시작하기',
    features: ['9개의 전문적인 템플릿', 'PNG & JPG 형식'],
    note: '무료 플랜의 내보내기에는 워터마크가 포함됩니다.'
  },
  {
    id: 'basic',
    name: 'Basic',
    tokens: 50,
    price: 9,
    pricePerToken: 0.18,
    popular: true,
    icon: <Zap className="w-6 h-6" />,
    description: '소규모 팀에 최적',
    features: ['9개의 전문적인 템플릿', '워터마크 없음', '상업적 사용 가능', 'PNG & JPG 형식']
  },
  {
    id: 'premium',
    name: 'Premium',
    tokens: 110,
    price: 19,
    pricePerToken: 0.17,
    icon: <Crown className="w-6 h-6" />,
    description: '대규모 팀과 기업용',
    features: ['9개의 전문적인 템플릿', '워터마크 없음', '상업적 사용 가능', 'PNG & JPG 형식', '이미지 배경 설정 가능']
  }
];

export default function CheckoutPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { tokenBalance, refetchTokenBalance } = useTokenBalance();

  useEffect(() => {
    const getUser = async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user as User);
        } else {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error getting user:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handlePurchase = async (plan: TokenPlan) => {
    setIsProcessing(true);
    try {
      // TODO: 실제 결제 처리 로직
      console.log('Purchasing plan:', plan);
      
      // 임시로 토큰 잔액 업데이트 (실제로는 결제 완료 후 처리)
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
      
      // 결제 성공 시 토큰 잔액 새로고침
      refetchTokenBalance();
      
      // 성공 페이지로 이동
      router.push('/checkout/success');
    } catch (error) {
      console.error('Purchase error:', error);
      // 에러 처리
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center">
        <div className="animate-pulse bg-[#D9D7CF] h-8 w-8 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F8F4]">
      <Header variant="app" />
      <div className="p-4">
        <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-8 ml-16">
          <h1 className="text-3xl font-bold text-black">토큰 구입</h1>
          <p className="text-[#222222]">더 많은 증언카드를 생성하세요</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tokenPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative border-2 transition-all duration-300 hover:shadow-xl bg-[#F8F8F4] flex flex-col ${
                plan.popular 
                  ? 'border-black shadow-lg scale-105' 
                  : 'border-[#222222]/20 hover:border-[#222222]/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-black text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    추천
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-black">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-black">${plan.price}</span>
                    <span className="text-[#222222] ml-2">
                      {plan.price === 0 ? '무료' : '일회성'}
                    </span>
                  </div>
                  <p className="text-[#222222] mt-2">
                    {plan.tokens}개 토큰 제공
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 flex flex-col flex-grow">
                <div className="space-y-4 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-[#222222]">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {plan.note && (
                  <div className="mb-6">
                    <p className="text-sm text-[#222222]/70 text-center">
                      {plan.note}
                    </p>
                  </div>
                )}
              </CardContent>
              
              <div className="p-6 pt-0 mt-auto">
                <Button
                  onClick={() => handlePurchase(plan)}
                  disabled={isProcessing}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-black hover:bg-white hover:text-black hover:border-black border-2 border-black text-white'
                      : 'bg-[#222222] hover:bg-white hover:text-[#222222] hover:border-[#222222] border-2 border-[#222222] text-white'
                  } transition-all duration-300`}
                  size="lg"
                >
                  {isProcessing ? '처리 중...' : (
                    plan.id === 'free' ? '무료로 시작하기' : plan.name
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Purchase History */}
        <div className="mt-16 max-w-5xl mx-auto">
          <Card className="bg-[#F8F8F4] border-[#D9D7CF]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black">결제 내역</CardTitle>
            <CardDescription className="text-[#222222]">
              최근 구매한 토큰 내역을 확인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#D9D7CF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-[#222222]" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">아직 결제 내역이 없습니다</h3>
              <p className="text-[#222222]/70">첫 번째 토큰을 구매해보세요!</p>
            </div>
          </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
}