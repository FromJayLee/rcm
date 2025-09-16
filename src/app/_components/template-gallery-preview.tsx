'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTemplateMetas } from '@/features/testimonial/components/templates/registry';
import { TemplateRenderer } from '@/features/testimonial/components/templates/registry';

export default function TemplateGalleryPreview() {
  const templateMetas = getAllTemplateMetas();
  
  const templates = templateMetas.map((template, index) => ({
    id: template.id,
    name: template.name,
    description: getTemplateDescription(template.name),
    category: getTemplateCategory(template.tags),
    image: `https://picsum.photos/300/200?random=${index + 1}`,
    features: template.tags.slice(0, 3)
  }));

  function getTemplateDescription(name: string): string {
    const descriptions: { [key: string]: string } = {
      'Classic Center': '중앙 정렬된 클래식한 디자인',
      'Left Aligned': '좌측 정렬된 깔끔한 레이아웃',
      'Wide Format': '와이드 포맷의 전문적인 스타일',
      'Profile Focus': '프로필 중심의 모던한 디자인',
      'Rating Distribution': '평점 분석이 포함된 데이터 중심',
      'Quote Highlight': '인용구가 강조된 와이드 스타일',
      'Profile Card': '프로필 카드 형태의 우아한 디자인',
      'Badge Showcase': '배지와 성과를 보여주는 프리미엄 스타일',
      'Social Style': '소셜 미디어에 최적화된 스퀘어 포맷'
    };
    return descriptions[name] || '전문적인 리뷰 카드 템플릿';
  }

  function getTemplateCategory(tags: string[]): string {
    if (tags.includes('minimal') || tags.includes('clean')) return '미니멀';
    if (tags.includes('professional') || tags.includes('elegant')) return '전문적';
    if (tags.includes('social') || tags.includes('interactive')) return '소셜';
    if (tags.includes('wide') || tags.includes('landscape')) return '와이드';
    if (tags.includes('profile') || tags.includes('image')) return '프로필';
    if (tags.includes('rating') || tags.includes('data')) return '데이터';
    if (tags.includes('badges') || tags.includes('premium')) return '프리미엄';
    return '일반';
  }

  return (
    <section aria-labelledby="templates-title" className="py-20 bg-brand-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            템플릿
          </Badge>
          <h2 id="templates-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            9개의 전문적인
            <br />
            <span className="text-brand-charcoal">증언 템플릿 중에서 선택하세요</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-charcoal max-w-3xl mx-auto">
            각 템플릿은 고객 증언을 효과적으로 보여주도록 신중하게 디자인되었습니다. 
            모든 템플릿은 완전히 커스터마이징 가능하며 다양한 사용 사례에 최적화되어 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template) => {
            const templateMeta = templateMetas.find(t => t.id === template.id);
            return (
              <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 border-brand-charcoal/20 overflow-hidden">
                <div className="relative">
                  <div className="w-full h-48 bg-white flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300">
                    {templateMeta && (
                      <div className={`w-full h-full ${template.id === 'template-5' ? 'scale-[0.8]' : 'scale-75'}`}>
                        <TemplateRenderer 
                          templateId={templateMeta.id} 
                          data={templateMeta.defaultData} 
                        />
                      </div>
                    )}
                  </div>
                  <Badge className="absolute top-3 left-3 bg-brand-black text-brand-ivory">
                    {template.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-semibold text-brand-black mb-2">
                    {template.name}
                  </h3>
                  <p className="text-brand-charcoal mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-brand-charcoal/30 text-brand-charcoal"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
