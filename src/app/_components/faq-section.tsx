'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export default function FAQSection({ items }: FAQSectionProps) {
  return (
    <section aria-labelledby="faq-title" className="py-20 bg-brand-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            자주 묻는 질문
          </Badge>
          <h2 id="faq-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            자주 묻는
            <br />
            <span className="text-brand-charcoal">질문들</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-charcoal max-w-3xl mx-auto">
            우리 도구로 증언 카드를 만드는 데 필요한 모든 정보를 확인하세요. 
            찾고 계신 답변이 없나요? 지원팀에 문의하세요.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg border border-brand-charcoal/20 px-6"
              >
                <AccordionTrigger 
                  className="text-left hover:no-underline py-6"
                  aria-label={`질문 ${index + 1}: ${item.question}`}
                >
                  <span className="text-lg font-semibold text-brand-black">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-brand-charcoal leading-relaxed text-base">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 border border-brand-charcoal/20 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black mb-4">
              아직도 궁금한 점이 있나요?
            </h3>
            <p className="text-lg text-brand-charcoal mb-8">
              지원팀이 증언 카드 생성기를 최대한 활용할 수 있도록 도와드립니다.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-brand-black hover:bg-brand-black/90 text-brand-ivory h-12 px-8 text-base">
                <Link href="/contact">
                  문의하기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
