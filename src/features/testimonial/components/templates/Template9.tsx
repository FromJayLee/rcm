'use client';

import { Star, Heart, MessageCircle, ThumbsUp } from 'lucide-react';
import { ExtendedTemplateProps } from '../../types';

export function Template9({ 
  quote, 
  author, 
  source,
  dateISO,
  align = 'center',
  accentColor = '#374151',
  dark = false 
}: ExtendedTemplateProps) {
  
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
          width: 'clamp(280px, 60%, 360px)',
          height: 'clamp(200px, 45%, 260px)',
        }}
      >
        {/* 상단 헤더 */}
        <div 
          className="h-12 flex items-center justify-between px-4"
          style={{
            background: `linear-gradient(90deg, ${currentColors.accent}, ${currentColors.accent}CC)`,
          }}
        >
          <div className="flex items-center" style={{ gap: '4px' }}>
            <Heart size={14} style={{ color: 'white' }} />
            <span className="text-white font-bold text-xs">Review</span>
          </div>
          
          {source?.logoUrl && (
            <img 
              src={source.logoUrl} 
              alt={source.name || 'Source'}
              className="h-5 w-auto"
              crossOrigin="anonymous"
            />
          )}
        </div>

        {/* 메인 콘텐츠 */}
        <div className="p-3 h-full flex flex-col">
          {/* 별점과 평점 */}
          <div className="text-center mb-2">
            <div className="flex justify-center mb-1" style={{ gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={star <= 5 ? 'fill-current' : ''}
                  style={{
                    color: star <= 5 ? '#F59E0B' : currentColors.secondary,
                  }}
                />
              ))}
            </div>
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
              out of 5 stars
            </div>
          </div>

          {/* 리뷰 텍스트 */}
          <div className="flex items-center" style={{ height: '70px', overflow: 'hidden' }}>
            <p 
              className="text-sm leading-tight text-center"
              style={{ 
                color: currentColors.text,
                textAlign: align,
                fontStyle: 'italic',
                margin: 0,
                padding: 0,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              "{quote.length > 60 ? quote.substring(0, 60) + '...' : quote}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
