'use client';

import { Star, Shield, Award } from 'lucide-react';
import { ExtendedTemplateProps, formatRating } from '../../types';

export function Template8({ 
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
      gradient: `linear-gradient(135deg, #9CA3AF15, #9CA3AF05)`,
    },
    dark: {
      card: '#1F2937',
      text: '#F9FAFB',
      secondary: '#9CA3AF',
      accent: '#6B7280',
      gradient: `linear-gradient(135deg, #6B728020, #6B728010)`,
    }
  };

  const currentColors = colors[dark ? 'dark' : 'light'];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div 
        className="relative rounded-3xl shadow-xl overflow-hidden"
        style={{
          backgroundColor: currentColors.card,
          width: 'clamp(450px, 80%, 650px)',
          height: 'clamp(350px, 85%, 450px)',
        }}
      >
        {/* 상단 액센트 바 */}
        <div 
          className="h-2 w-full"
          style={{ backgroundColor: currentColors.accent }}
        />
        
        {/* 메인 콘텐츠 */}
        <div className="p-6 h-full flex flex-col">
          {/* 상단 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {/* 아바타 */}
              {author.avatarUrl ? (
                <img 
                  src={author.avatarUrl} 
                  alt={author.name}
                  className="w-14 h-14 rounded-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: currentColors.accent }}
                >
                  {author.name.charAt(0)}
                </div>
              )}
              
              <div>
                <div 
                  className="text-xl font-bold"
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
              <div className="flex items-center space-x-1 px-2 py-1 rounded-full"
                style={{ backgroundColor: `${currentColors.accent}15` }}>
                <Shield size={14} style={{ color: currentColors.accent }} />
                <span 
                  className="text-xs font-medium"
                  style={{ color: currentColors.accent }}
                >
                  Verified
                </span>
              </div>
            )}
          </div>

          {/* 리뷰 텍스트 */}
          <div className="flex-1 flex items-center mb-4">
            <p 
              className="text-lg leading-relaxed italic"
              style={{ 
                color: currentColors.text,
                textAlign: align,
                fontWeight: '400'
              }}
            >
              "{quote}"
            </p>
          </div>

          {/* 하단 영역 */}
          <div className="flex items-center justify-between">
            {/* 별점 */}
            <div className="flex items-center space-x-2">
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
              <div 
                className="text-xl font-bold"
                style={{ color: currentColors.accent }}
              >
                {roundedRating}
              </div>
            </div>

            {/* 배지들 */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {badges.slice(0, 2).map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${currentColors.accent}15`,
                      border: `1px solid ${currentColors.accent}30`,
                    }}
                  >
                    <Award size={10} style={{ color: currentColors.accent }} />
                    <span 
                      className="text-xs font-medium"
                      style={{ color: currentColors.accent }}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
