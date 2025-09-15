'use client';

import { Star, Heart, MessageCircle, ThumbsUp } from 'lucide-react';
import { ExtendedTemplateProps, formatRating } from '../../types';

export function Template9({ 
  quote, 
  author, 
  rating = 5, 
  source,
  dateISO,
  align = 'center',
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
      social: '#F3F4F6',
    },
    dark: {
      card: '#1F2937',
      text: '#F9FAFB',
      secondary: '#9CA3AF',
      accent: '#6B7280',
      social: '#374151',
    }
  };

  const currentColors = colors[dark ? 'dark' : 'light'];

  const formatDate = (dateISO?: string) => {
    if (!dateISO) return '';
    return new Date(dateISO).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div 
        className="relative rounded-3xl shadow-xl"
        style={{
          backgroundColor: currentColors.card,
          width: '300px',
          height: '300px',
        }}
      >
        {/* 상단 헤더 제거 */}

        {/* 메인 콘텐츠 */}
        <div className="p-4 h-full flex flex-col" style={{ height: 'auto' }}>

          {/* 리뷰 텍스트 */}
          <div className="flex items-center mb-2">
            <p 
              className="text-sm leading-tight text-center"
              style={{ 
                color: currentColors.text,
                textAlign: align,
                fontStyle: 'italic',
                margin: 0,
                padding: 0
              }}
            >
              "{quote}"
            </p>
          </div>

          {/* 작성자 정보 */}
          <div className="flex items-center mb-1" style={{ gap: '8px' }}>
            {/* 아바타 */}
            {author.avatarUrl ? (
              <img 
                src={author.avatarUrl} 
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: currentColors.accent }}
              >
                {author.name.charAt(0)}
              </div>
            )}

            <div style={{ flex: '1' }}>
              <div 
                className="font-bold text-sm"
                style={{ color: currentColors.text }}
              >
                {author.name}
              </div>
              <div 
                className="text-xs"
                style={{ color: currentColors.secondary }}
              >
                {author.role}
              </div>
            </div>
          </div>

          {/* 하단 메타 정보 */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center" style={{ gap: '8px' }}>
              {/* 소셜 액션 버튼들 */}
              <div className="flex items-center" style={{ gap: '4px' }}>
                <button 
                  className="p-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: currentColors.social }}
                >
                  <ThumbsUp size={12} style={{ color: currentColors.secondary }} />
                </button>
                <button 
                  className="p-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: currentColors.social }}
                >
                  <MessageCircle size={12} style={{ color: currentColors.secondary }} />
                </button>
                <button 
                  className="p-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: currentColors.social }}
                >
                  <Heart size={12} style={{ color: currentColors.accent }} />
                </button>
              </div>
            </div>

            {/* 날짜 */}
            {dateISO && (
              <div 
                className="text-xs"
                style={{ color: currentColors.secondary }}
              >
                {formatDate(dateISO)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
