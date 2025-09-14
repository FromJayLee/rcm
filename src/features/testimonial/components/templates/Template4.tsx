'use client';

import { Star, CheckCircle, Calendar, MapPin } from 'lucide-react';
import { TemplateProps } from '../../types';

export function Template4({ content, style }: TemplateProps) {
  const { quote, authorName, authorRole, avatarUrl, isAnonymous, rating } = content;
  const { mode } = style;

  // 다크/라이트 모드 색상 정의
  const colors = {
    light: {
      card: '#FFFFFF',
      text: '#1F2937',
      secondary: '#6B7280',
      accent: '#374151',
      background: '#F8FAFC',
      border: '#E2E8F0',
      shadow: 'rgba(0, 0, 0, 0.08)',
    },
    dark: {
      card: '#1F2937',
      text: '#F9FAFB',
      secondary: '#9CA3AF',
      accent: '#D1D5DB',
      background: '#111827',
      border: '#374151',
      shadow: 'rgba(0, 0, 0, 0.3)',
    }
  };

  const currentColors = colors[mode];

  return (
    <div 
      className="flex items-center justify-center w-full h-full"
    >
      <div 
        className="relative rounded-3xl shadow-lg border overflow-hidden"
        style={{
          backgroundColor: currentColors.card,
          borderColor: currentColors.border,
          width: 'clamp(450px, 75%, 700px)',
          height: 'clamp(280px, 75%, 400px)',
        }}
      >
        {/* 상단 헤더 영역 */}
        <div 
          className="px-12 py-8 border-b"
          style={{ 
            backgroundColor: currentColors.background,
            borderColor: currentColors.border 
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* 아바타 */}
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={isAnonymous ? 'Anonymous' : authorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: currentColors.accent }}
                >
                  {isAnonymous ? 'A' : authorName.charAt(0)}
                </div>
              )}
              
              {/* 작성자 정보 */}
              <div>
                <div 
                  className="font-bold text-lg"
                  style={{ color: currentColors.text }}
                >
                  {isAnonymous ? 'Anonymous' : authorName}
                </div>
                <div 
                  className="text-sm flex items-center space-x-2"
                  style={{ color: currentColors.secondary }}
                >
                  <span>{authorRole}</span>
                </div>
              </div>
            </div>

            {/* 인증 배지 */}
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} style={{ color: currentColors.accent }} />
              <span 
                className="text-sm font-medium"
                style={{ color: currentColors.accent }}
              >
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="px-12 py-10">
          {/* 별점과 날짜 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
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
              <span 
                className="text-sm font-medium"
                style={{ color: currentColors.text }}
              >
                5.0
              </span>
            </div>
            
            <div 
              className="text-sm flex items-center space-x-1"
              style={{ color: currentColors.secondary }}
            >
              <Calendar size={14} />
              <span>2 days ago</span>
            </div>
          </div>

          {/* 리뷰 텍스트 */}
          <div className="mb-6">
            <p 
              className="text-base leading-relaxed"
              style={{ 
                color: currentColors.text,
                fontWeight: '400'
              }}
            >
              {quote}
            </p>
          </div>

          {/* 하단 액션 영역 */}
          <div className="flex items-center justify-between pt-8 border-t px-12" style={{ borderColor: currentColors.border }}>
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: `${currentColors.accent}10`,
                  color: currentColors.accent 
                }}
              >
                <span>👍</span>
                <span>Helpful (12)</span>
              </button>
              
              <button 
                className="flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: `${currentColors.accent}10`,
                  color: currentColors.accent 
                }}
              >
                <span>💬</span>
                <span>Reply</span>
              </button>
            </div>

            <div 
              className="text-xs"
              style={{ color: currentColors.secondary }}
            >
              Was this review helpful?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}