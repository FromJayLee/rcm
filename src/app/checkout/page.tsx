'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, ArrowRight, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface TokenPack {
  id: string;
  name: string;
  tokens: number;
  price: number;
  priceDisplay: string;
  popular: boolean;
  description: string;
}

const tokenPacks: TokenPack[] = [
  {
    id: 'VARIANT_ID_STARTER',
    name: '스타터',
    tokens: 20,
    price: 10,
    priceDisplay: '$10',
    popular: false,
    description: '개인 프로젝트에 적합',
  },
  {
    id: 'VARIANT_ID_PRO',
    name: '프로페셔널',
    tokens: 100,
    price: 40,
    priceDisplay: '$40',
    popular: true,
    description: '소규모 팀에 최적',
  },
  {
    id: 'VARIANT_ID_BUSINESS',
    name: '비즈니스',
    tokens: 300,
    price: 100,
    priceDisplay: '$100',
    popular: false,
    description: '대규모 마케팅 캠페인',
  },
];

export default function CheckoutPage() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const checkoutMutation = useMutation({
    mutationFn: async (variantId: string) => {
      const response = await fetch('/api/lemonsqueezy/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ variantId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout');
      }

      const data = await response.json();
      return data.url;
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: (error) => {
      toast({
        title: '결제 오류',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handlePurchase = () => {
    if (!selectedPack) {
      toast({
        title: '옵션 선택 필요',
        description: '구매할 토큰 팩을 선택해주세요.',
        variant: 'destructive',
      });
      return;
    }

    checkoutMutation.mutate(selectedPack);
  };

  if (!user) {
    router.push('/auth/login?next=/checkout');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F8F4] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            토큰 구매
          </h1>
          <p className="text-lg text-[#222222] max-w-2xl mx-auto">
            증언 카드를 내보낼 때마다 1토큰이 소모됩니다. 
            원하는 만큼 구매하여 언제든지 사용하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tokenPacks.map((pack) => (
            <Card
              key={pack.id}
              className={`relative border-2 transition-all duration-300 hover:shadow-xl cursor-pointer ${
                selectedPack === pack.id
                  ? 'border-black shadow-lg scale-105'
                  : pack.popular
                  ? 'border-[#222222] shadow-lg hover:border-black hover:bg-black hover:text-white'
                  : 'border-[#222222]/20 hover:border-black hover:bg-black hover:text-white'
              }`}
              onClick={() => setSelectedPack(pack.id)}
            >
              {pack.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-black text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    인기
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-black">
                  {pack.name}
                </CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-black">
                      {pack.priceDisplay}
                    </span>
                    <span className="text-[#222222] ml-2">일회성</span>
                  </div>
                  <p className="text-[#222222] mt-2">
                    {pack.tokens}개 증언 카드
                  </p>
                  <p className="text-sm text-[#222222] mt-1">
                    {pack.description}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#222222]">9개 전문 템플릿</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#222222]">모든 해상도 지원</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#222222]">PNG & JPG 형식</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#222222]">워터마크 없음</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#222222]">상업적 사용 가능</span>
                  </div>
                </div>
                
                <div className="text-center text-sm text-[#222222] mb-4">
                  ${(pack.price / pack.tokens).toFixed(2)} per testimonial
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Purchase Button */}
        <div className="mt-12 text-center">
            <Button
              onClick={handlePurchase}
              disabled={!selectedPack || checkoutMutation.isPending}
              size="lg"
              className="bg-black hover:bg-white hover:text-black hover:border-black border-2 border-black text-white px-8 py-4 text-lg transition-all duration-300"
            >
            {checkoutMutation.isPending ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                처리 중...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                {selectedPack ? '구매하기' : '토큰 팩을 선택하세요'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 border border-[#222222]/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              안전한 결제
            </h3>
            <p className="text-[#222222] mb-6">
              Lemonsqueezy를 통해 안전하게 결제하세요. 
              모든 결제는 암호화되어 처리됩니다.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-[#222222]">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>SSL 암호화</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>PCI 준수</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>환불 보장</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
