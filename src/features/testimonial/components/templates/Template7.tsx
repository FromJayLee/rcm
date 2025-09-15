'use client';

import { Star, Calendar, MapPin } from 'lucide-react';
import { ExtendedTemplateProps } from '../../types';
import { DefaultAvatar } from '@/components/ui/default-avatar';

export function Template7({ 
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
    },
    dark: {
      card: '#1F2937',
      text: '#F9FAFB',
      secondary: '#9CA3AF',
      accent: '#6B7280',
    }
  };

  const currentColors = colors[dark ? 'dark' : 'light'];

  const formatDate = (dateISO?: string) => {
    if (!dateISO) return '';
    return new Date(dateISO).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div 
        className="relative rounded-3xl shadow-xl"
        style={{
          backgroundColor: currentColors.card,
          width: '350px',
          height: '280px',
        }}
      >
        {/* 메인 콘텐츠 */}
        <div className="px-6 py-6" style={{ height: '280px', overflow: 'hidden' }}>
          {/* 아바타 */}
          <div className="flex justify-center mb-4">
            {author.avatarUrl ? (
            <img 
              src={author.avatarUrl} 
              alt={author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
              crossOrigin="anonymous"
            />
            ) : (
              <DefaultAvatar 
                size="lg" 
                isAnonymous={false}
                name={author.name}
                className="border-2 border-white shadow-lg"
              />
            )}
          </div>

          {/* 작성자 정보 */}
          <div className="text-center mb-4">
            <h3 
              className="text-lg font-bold mb-1"
              style={{ color: currentColors.text }}
            >
              {author.name}
            </h3>
            <p 
              className="text-sm"
              style={{ color: currentColors.secondary }}
            >
              {author.role}
            </p>
          </div>

          {/* 별점 */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center" style={{ gap: '4px' }}>
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
              <span 
                className="text-lg font-bold ml-1"
                style={{ color: currentColors.accent }}
              >
                5.0
              </span>
            </div>
          </div>

          {/* 리뷰 텍스트 */}
          <div className="mb-4" style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
            <p 
              className="text-sm leading-tight text-center italic"
              style={{ 
                color: currentColors.text,
                textAlign: align,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              "{quote.length > 80 ? quote.substring(0, 80) + '...' : quote}"
            </p>
          </div>

          {/* 하단 메타 정보 */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center" style={{ gap: '16px' }}>
              {dateISO && (
                <div className="flex items-center" style={{ gap: '4px' }}>
                  <Calendar size={16} style={{ color: currentColors.secondary }} />
                  <span style={{ color: currentColors.secondary }}>
                    {formatDate(dateISO)}
                  </span>
                </div>
              )}
              {source?.name && (
                <div className="flex items-center" style={{ gap: '4px' }}>
                  <MapPin size={16} style={{ color: currentColors.secondary }} />
                  <span style={{ color: currentColors.secondary }}>
                    {source.name}
                  </span>
                </div>
              )}
            </div>

            {/* 소스 로고 */}
            {source?.logoUrl && (
            <img 
              src={source.logoUrl} 
              alt={source.name || 'Source'}
              className="h-6 w-auto opacity-60"
              crossOrigin="anonymous"
            />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
