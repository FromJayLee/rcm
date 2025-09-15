'use client';

import { Star } from 'lucide-react';
import { TemplateProps } from '../../types';

export function Template3({ content, style }: TemplateProps) {
  const { quote, authorName, authorRole, rating, avatarUrl, isAnonymous } = content;
  const { mode } = style;

  // 다크/라이트 모드 색상 정의
  const colors = {
    light: {
      canvas: '#F5F7FA',
      card: '#FFFFFF',
      text: '#374151',
      name: '#374151',
      secondary: '#6B7280',
      star: '#FCD34D', // bright yellow
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      canvas: '#0F1419',
      card: '#111318',
      text: '#D1D5DB',
      name: '#D1D5DB',
      secondary: '#9CA3AF',
      star: '#FCD34D',
      shadow: 'rgba(0, 0, 0, 0.3)',
    }
  };

  const currentColors = colors[mode];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div 
        className="relative rounded-xl shadow-md border"
        style={{
          backgroundColor: currentColors.card,
          borderColor: currentColors.border,
          width: '380px',
          height: '280px',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 상단 프로필 영역 */}
        <div 
          className="px-4 py-4 border-b"
          style={{ 
            backgroundColor: currentColors.background,
            borderColor: currentColors.border 
          }}
        >
          <div className="flex items-center" style={{ gap: '12px' }}>
            {/* 아바타 */}
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={authorName}
                className="w-12 h-12 rounded-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: currentColors.accent }}
              >
                {isAnonymous ? 'A' : authorName.charAt(0)}
              </div>
            )}
            
            <div className="flex-1">
              <div 
                className="font-bold text-base"
                style={{
                  color: currentColors.name,
                  marginBottom: '2px',
                }}
              >
                {isAnonymous ? 'Anonymous' : authorName}
              </div>
              {authorRole && (
                <div 
                  className="text-sm"
                  style={{
                    color: currentColors.secondary,
                  }}
                >
                  {authorRole}
                </div>
              )}
            </div>
            
            {/* 인증 배지 */}
            <div 
              className="flex items-center px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${currentColors.accent}10`,
                color: currentColors.accent 
              }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full mr-1"
                style={{ backgroundColor: currentColors.accent }}
              />
              <span className="text-xs font-medium">Verified</span>
            </div>
          </div>
        </div>
        
        {/* 메인 리뷰 영역 */}
        <div className="flex-1 px-4 py-4 flex flex-col justify-center">
          {/* 별점 */}
          <div className="flex items-center mb-3" style={{ gap: '2px' }}>
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
            <span 
              className="ml-2 text-sm font-medium"
              style={{ color: currentColors.text }}
            >
              5.0
            </span>
          </div>
          
          {/* 리뷰 텍스트 */}
          <div>
            <p 
              className="text-sm leading-relaxed"
              style={{
                color: currentColors.text,
                fontWeight: '400',
                margin: 0,
                lineHeight: '1.5',
              }}
            >
              "{quote}"
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}