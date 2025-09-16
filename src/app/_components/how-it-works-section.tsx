'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Download, MousePointer } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
}

export default function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  const stepIcons = [MousePointer, Palette, Download];

  return (
    <section aria-labelledby="how-it-works-title" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            사용법
          </Badge>
          <h2 id="how-it-works-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            전문적인 리뷰 카드를
            <br />
            <span className="text-brand-charcoal">3단계로 간단하게</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-charcoal max-w-3xl mx-auto">
            우리의 간소화된 워크플로우로 고품질 리뷰 카드를 쉽게 만들어 
            랜딩페이지를 돋보이게 하세요.
          </p>
        </div>

        <div className="flex flex-col space-y-12 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            
            return (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-8">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-brand-charcoal/10 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-charcoal flex items-center justify-center">
                      <Icon className="w-8 h-8 text-brand-ivory" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <span className="text-2xl font-bold text-brand-charcoal">단계 {index + 1}</span>
                    <div className="w-8 h-px bg-brand-charcoal/20"></div>
                  </div>
                  <h3 className="text-2xl font-semibold text-brand-black mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-brand-charcoal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-lg text-brand-charcoal mb-8">
            첫 번째 리뷰 카드를 만들어볼 준비가 되셨나요?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-6 py-3 text-base">
              <MousePointer className="w-5 h-5 mr-2" />
              디자인 기술 불필요
            </Badge>
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-6 py-3 text-base">
              <Download className="w-5 h-5 mr-2" />
              모든 해상도로 내보내기
            </Badge>
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-6 py-3 text-base">
              <Palette className="w-5 h-5 mr-2" />
              완전 커스터마이징 가능
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
