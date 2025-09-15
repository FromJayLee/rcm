'use client';

import { Star, Heart, MessageCircle, ThumbsUp, User } from 'lucide-react';
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
          width: 'clamp(350px, 80%, 450px)',
          height: 'clamp(350px, 80%, 450px)',
        }}
      >
        {/* 상단 헤더 */}
        <div 
          className="h-20 flex items-center justify-between px-6"
          style={{
            background: `linear-gradient(90deg, ${currentColors.accent}, ${currentColors.accent}CC)`,
          }}
        >
          <div className="flex items-center" style={{ gap: '8px' }}>
            <Heart size={20} style={{ color: 'white' }} />
            <span className="text-white font-bold text-lg">Review</span>
          </div>
          
          {source?.logoUrl && (
            <img 
              src={source.logoUrl} 
              alt={source.name || 'Source'}
              className="h-8 w-auto"
              crossOrigin="anonymous"
            />
          )}
        </div>

        {/* 메인 콘텐츠 */}
        <div className="p-6 h-full flex flex-col">
          {/* 별점과 평점 */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2" style={{ gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className={star <= 5 ? 'fill-current' : ''}
                  style={{
                    color: star <= 5 ? '#F59E0B' : currentColors.secondary,
                  }}
                />
              ))}
            </div>
            <div 
              className="text-3xl font-bold"
              style={{ color: currentColors.accent }}
            >
              {roundedRating}
            </div>
            <div 
              className="text-sm"
              style={{ color: currentColors.secondary }}
            >
              out of 5 stars
            </div>
          </div>

          {/* 리뷰 텍스트 */}
          <div className="flex items-center mb-6" style={{ height: '120px' }}>
            <p 
              className="text-lg leading-relaxed text-center"
              style={{ 
                color: currentColors.text,
                textAlign: align,
                fontStyle: 'italic'
              }}
            >
              "{quote}"
            </p>
          </div>

          {/* 작성자 정보 */}
          <div className="flex items-center mb-4" style={{ gap: '16px' }}>
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
                className="w-14 h-14 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: currentColors.accent }}
              >
                <User size={28} />
              </div>
            )}

            <div style={{ flex: '1' }}>
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

          {/* 하단 메타 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: '16px' }}>
              {/* 소셜 액션 버튼들 */}
              <div className="flex items-center" style={{ gap: '8px' }}>
                <button 
                  className="p-2 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: currentColors.social }}
                >
                  <ThumbsUp size={16} style={{ color: currentColors.secondary }} />
                </button>
                <button 
                  className="p-2 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: currentColors.social }}
                >
                  <MessageCircle size={16} style={{ color: currentColors.secondary }} />
                </button>
                <button 
                  className="p-2 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: currentColors.social }}
                >
                  <Heart size={16} style={{ color: currentColors.accent }} />
                </button>
              </div>
            </div>

            {/* 날짜 */}
            {dateISO && (
              <div 
                className="text-sm"
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
