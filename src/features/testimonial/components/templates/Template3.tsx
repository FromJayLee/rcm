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
    <div 
      className="flex items-center justify-center w-full h-full"
      style={{ 
        backgroundColor: currentColors.canvas,
        aspectRatio: '2/1',
        minHeight: '400px'
      }}
    >
      {/* 카드 컨테이너 */}
      <div 
        className="relative rounded-[12px]"
        style={{
          backgroundColor: currentColors.card,
          padding: '16px 32px 24px 32px',
          boxShadow: `0 4px 12px ${currentColors.shadow}`,
          width: 'clamp(400px, 50%, 600px)',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* 리뷰 텍스트 (중앙) */}
        <div 
          className="flex-1 flex items-center justify-center"
          style={{
            marginTop: '8px',
            marginBottom: '16px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '8px',
          }}
        >
          <p 
            style={{
              color: currentColors.text,
              fontSize: 'clamp(16px, 18px, 20px)',
              lineHeight: '1.6',
              fontWeight: '400',
              margin: 0,
              textAlign: 'left',
              maxWidth: '100%',
            }}
          >
            {quote}
          </p>
        </div>
        
        {/* 별점 (중앙) */}
        <div 
          className="flex justify-center items-center"
          style={{
            marginBottom: '12px',
            gap: '4px',
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              className={star <= (rating || 0) ? 'fill-current' : 'text-gray-300'}
              style={{
                color: star <= (rating || 0) ? currentColors.star : '#D1D5DB',
              }}
            />
          ))}
        </div>
        
        {/* 작성자 정보 (중앙) */}
        <div>
          <div 
            className="font-bold"
            style={{
              color: currentColors.name,
              fontSize: 'clamp(16px, 18px, 20px)',
              fontWeight: '700',
              marginBottom: '4px',
            }}
          >
            {isAnonymous ? 'Anonymous' : authorName}
          </div>
          {authorRole && (
            <div 
              style={{
                color: currentColors.secondary,
                fontSize: 'clamp(14px, 15px, 16px)',
              }}
            >
              {authorRole}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}