'use client';

import { Badge } from '@/components/ui/badge';
import { PricingCard } from './PricingCard';
import { PRICING_PLANS } from '@/lib/pricing/plans';

export function PricingSection() {
  return (
    <section 
      id="pricing" 
      className="py-20 bg-brand-ivory" 
      aria-labelledby="pricing-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[920px]">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            가격
          </Badge>
          <h2 
            id="pricing-title" 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-6"
          >
            간단하고 투명한
            <br />
            <span className="text-brand-charcoal">사용량 기반 가격</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-charcoal max-w-3xl mx-auto">
            저렴한 가격으로 사용한 만큼만 지불하세요. 
            증언 카드 하나 내보내기에 1토큰만 필요합니다.
          </p>
        </div>

        {/* Pricing Plans Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan} 
              highlighted={plan.id === 'basic'} 
            />
          ))}
        </div>

        {/* Free Trial Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 border border-brand-charcoal/20 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black mb-4">
              먼저 무료로 체험해보세요.
            </h3>
            <div className="flex justify-center">
              <a 
                href="/app/editor"
                className="inline-flex items-center justify-center px-8 py-3 border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal/10 rounded-lg text-base font-medium transition-colors"
              >
                무료 체험 시작
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-brand-charcoal text-base">
            모든 플랜에는 9개의 템플릿 접근과 상업적 사용 권리가 포함됩니다. 
            토큰은 만료되지 않으며 언제든지 사용할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
