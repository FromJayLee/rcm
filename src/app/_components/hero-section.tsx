'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
}

export default function HeroSection({ ctaPrimaryLabel, ctaSecondaryLabel }: HeroSectionProps) {
  const features = [
    '60초 이내에 생성',
    '9개의 전문적인 템플릿',
    '모든 해상도로 내보내기',
    '디자인 기술 불필요'
  ];

  return (
    <section aria-labelledby="hero-title" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Content */}
          <div className="space-y-8 max-w-4xl">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal w-fit mx-auto">
                신규: 9개의 전문적인 템플릿
              </Badge>
              
              <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-black leading-tight tracking-tight">
                리뷰 카드를
                <br />
                <span className="text-brand-charcoal">1분 이내에 완성하세요</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-brand-charcoal leading-relaxed max-w-3xl mx-auto">
                픽셀 완벽하고 브랜드 일관성 있는, 즉시 사용 가능한 리뷰 카드를 SaaS 창업자들을 위해 제공합니다. 
                디자인 기술이 필요 없습니다 - 선택하고, 커스터마이징하고, 내보내기만 하면 됩니다.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto ml-auto pl-24">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-brand-charcoal flex-shrink-0" />
                  <span className="text-brand-charcoal text-base leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-black hover:bg-brand-black/90 text-brand-ivory h-12 px-8 text-base">
                <Link href="/app/editor">
                  {ctaPrimaryLabel}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              {ctaSecondaryLabel && (
                <Button asChild variant="outline" size="lg" className="border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal/10 h-12 px-8 text-base">
                  <Link href="/pricing">
                    {ctaSecondaryLabel}
                  </Link>
                </Button>
              )}
            </div>

          </div>

          {/* Preview Image */}
          <div className="relative w-full max-w-4xl">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-brand-charcoal/10">
              {/* Mock Editor Preview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-brand-black text-lg">리뷰 미리보기</h3>
                </div>
                
                {/* Mock Testimonial Card */}
                <div className="bg-brand-ivory rounded-lg p-6 border border-brand-charcoal/20">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-brand-charcoal rounded-full flex items-center justify-center">
                      <span className="text-brand-ivory font-bold text-lg">S</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black">김지영</h4>
                      <p className="text-sm text-brand-charcoal">제품 매니저, 테크코프</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  
                  <p className="text-brand-black italic">
                    "이 제품이 우리의 워크플로우를 완전히 바꿔놓았습니다. 
                    모든 SaaS 팀에게 강력히 추천합니다!"
                  </p>
                </div>
                
                {/* Mock Controls */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-brand-charcoal/5 rounded p-3 text-center">
                    <div className="text-xs text-brand-charcoal">템플릿</div>
                    <div className="text-sm font-medium text-brand-black">9개의 템플릿</div>
                  </div>
                  <div className="bg-brand-charcoal/5 rounded p-3 text-center">
                    <div className="text-xs text-brand-charcoal">배경</div>
                    <div className="text-sm font-medium text-brand-black">다양한 배경 요소</div>
                  </div>
                  <div className="bg-brand-charcoal/5 rounded p-3 text-center">
                    <div className="text-xs text-brand-charcoal">내보내기</div>
                    <div className="text-sm font-medium text-brand-black">원하는 리뷰 텍스트</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
