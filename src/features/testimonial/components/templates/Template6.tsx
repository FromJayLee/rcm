'use client';

import { Star, CheckCircle } from 'lucide-react';
import { ExtendedTemplateProps } from '../../types';

export function Template6({ 
  quote, 
  author, 
  verified = false, 
  badges = [], 
  align = 'left',
  accentColor = '#374151',
  dark = false 
}: ExtendedTemplateProps) {
  const colors = {
    light: {
      card: '#FFFFFF',
      text: '#1F2937',
      secondary: '#6B7280',
      accent: '#9CA3AF',
    },
    dark: {
      card: '#1F2937',
      text: '#F9FAFB',
      secondary: '#9CA3AF',
      accent: '#6B7280',
    }
  };

  const currentColors = colors[dark ? 'dark' : 'light'];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div 
        className="relative rounded-2xl shadow-xl"
        style={{
          backgroundColor: currentColors.card,
          width: '400px',
          height: '200px',
          padding: '16px',
        }}
      >
        {/* 상단 액센트 바 제거 */}

        {/* 메인 콘텐츠 */}
        <div className="flex h-full">
          {/* 좌측 텍스트 영역 */}
          <div className="pr-8" style={{ width: '60%' }}>
            <div className="h-full flex flex-col justify-center">
              {/* 리뷰 텍스트 - 중간 정렬 */}
              <div className="flex items-center" style={{ height: '100%' }}>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ 
                    color: currentColors.text,
                    textAlign: align,
                    fontStyle: 'italic'
                  }}
                >
                  "{quote}"
                </p>
              </div>
            </div>
          </div>

          {/* 우측 별점 영역 */}
          <div className="flex flex-col items-center justify-center" style={{ gap: '16px' }}>
            <div className="text-center">
              <div 
                className="text-2xl font-bold"
                style={{ color: currentColors.accent }}
              >
                5.0
              </div>
              <div 
                className="text-xs"
                style={{ color: currentColors.secondary }}
              >
                out of 5
              </div>
            </div>

            {/* 별점 */}
            <div className="flex" style={{ gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= 5 ? 'fill-current' : ''}
                  style={{
                    color: star <= 5 ? '#F59E0B' : currentColors.secondary,
                  }}
                />
              ))}
            </div>

            {/* 배지들 */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${currentColors.accent}20`,
                      color: currentColors.accent,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
