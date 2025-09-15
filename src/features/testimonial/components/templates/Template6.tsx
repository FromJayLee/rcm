'use client';

import { Star, CheckCircle } from 'lucide-react';
import { ExtendedTemplateProps, formatRating } from '../../types';

export function Template6({ 
  quote, 
  author, 
  rating = 5, 
  verified = false, 
  badges = [], 
  align = 'left',
  accentColor = '#374151',
  dark = false 
}: ExtendedTemplateProps) {
  const roundedRating = formatRating(rating);
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
        className="relative rounded-2xl shadow-xl overflow-hidden"
        style={{
          backgroundColor: currentColors.card,
          width: 'clamp(500px, 80%, 800px)',
          height: 'clamp(200px, 60%, 300px)',
          padding: '48px',
        }}
      >
        {/* 상단 액센트 바 */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: currentColors.accent }}
        />

        {/* 메인 콘텐츠 */}
        <div className="flex h-full">
          {/* 좌측 텍스트 영역 */}
          <div className="flex-1 pr-16">
            <div className="h-full flex flex-col">
              {/* 상단 여백 */}
              <div className="flex-1"></div>
              
              {/* 리뷰 텍스트 - 중간 위치 */}
              <div className="flex items-center mb-10">
                <p 
                  className="text-lg leading-relaxed"
                  style={{ 
                    color: currentColors.text,
                    textAlign: align,
                    fontStyle: 'italic'
                  }}
                >
                  "{quote}"
                </p>
              </div>

              {/* 하단 정보 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* 아바타 */}
                  {author.avatarUrl ? (
                    <img 
                      src={author.avatarUrl} 
                      alt={author.name}
                      className="w-12 h-12 rounded-full object-cover"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: currentColors.accent }}
                    >
                      {author.name.charAt(0)}
                    </div>
                  )}

                  {/* 작성자 정보 */}
                  <div>
                    <div 
                      className="font-bold text-lg"
                      style={{ color: currentColors.text }}
                    >
                      {author.name}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: currentColors.secondary }}
                    >
                      {author.role} {author.company && `at ${author.company}`}
                    </div>
                  </div>
                </div>

                {/* 인증 배지 */}
                {verified && (
                  <div className="flex items-center space-x-1">
                    <CheckCircle size={16} style={{ color: currentColors.accent }} />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: currentColors.accent }}
                    >
                      Verified
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 우측 별점 영역 */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <div 
                className="text-4xl font-bold"
                style={{ color: currentColors.accent }}
              >
                {roundedRating}
              </div>
              <div 
                className="text-sm"
                style={{ color: currentColors.secondary }}
              >
                out of 5
              </div>
            </div>

            {/* 별점 */}
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
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
