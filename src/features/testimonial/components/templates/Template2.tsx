'use client';

import { Star } from 'lucide-react';
import { TemplateProps } from '../../types';
import { DefaultAvatar } from '@/components/ui/default-avatar';

export function Template2({ content, style }: TemplateProps) {
  const { quote, authorName, authorRole, avatarUrl } = content;
  const { mode } = style;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className={`flex flex-col p-6 rounded-lg shadow-lg ${
        mode === 'dark' 
          ? 'bg-charcoal text-ivory' 
          : 'bg-white text-charcoal'
      }`} style={{ 
        width: '320px',
        height: '280px'
      }}>
        {/* 상단 프로필 */}
        <div className="flex items-center mb-6" style={{ gap: '12px' }}>
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={authorName}
              className="w-10 h-10 rounded-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <DefaultAvatar 
              size="sm" 
              isAnonymous={false}
              name={authorName}
            />
          )}
          <div>
            <div className={`font-semibold ${
              mode === 'dark' ? 'text-ivory' : 'text-gray-800'
            }`}>
              {authorName}
            </div>
            <div className={`text-sm ${
              mode === 'dark' ? 'text-ivory/70' : 'text-gray-600'
            }`}>
              {authorRole}
            </div>
          </div>
        </div>
        
        {/* 본문 - 명시적 높이 사용 */}
        <div className="mb-6" style={{ height: '120px', display: 'flex', alignItems: 'center' }}>
          <p className={`italic leading-relaxed text-left ${
            mode === 'dark' ? 'text-ivory/80' : 'text-gray-600'
          }`}>
            "{quote}"
          </p>
        </div>
        
        {/* 하단 별점 */}
        <div className="flex justify-start" style={{ gap: '4px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`w-5 h-5 ${
                star <= 5 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-400'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}