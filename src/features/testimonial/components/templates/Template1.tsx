'use client';

import { Star } from 'lucide-react';
import { TemplateProps } from '../../types';
import { DefaultAvatar } from '@/components/ui/default-avatar';

export function Template1({ content, style }: TemplateProps) {
  const { quote, authorName, authorRole, avatarUrl } = content;
  const { mode } = style;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className={`flex flex-col p-6 rounded-lg shadow-lg ${
        mode === 'dark' 
          ? 'bg-charcoal text-ivory' 
          : 'bg-white text-charcoal'
      }`} style={{ 
        width: '350px',
        height: '220px'
      }}>
        
        {/* 본문 - 명시적 높이 사용 */}
        <div className="flex items-center justify-center mb-4" style={{ height: '80px' }}>
          <p className={`italic leading-relaxed text-center ${
            mode === 'dark' ? 'text-ivory/80' : 'text-gray-600'
          }`}>
            "{quote}"
          </p>
        </div>
        
        {/* 하단 프로필 */}
        <div className="flex items-center justify-center" style={{ gap: '12px' }}>
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <DefaultAvatar 
              size="md" 
              isAnonymous={false}
              name={authorName}
            />
          )}
          <div className="text-center">
            <div className={`font-bold ${
              mode === 'dark' ? 'text-ivory' : 'text-black'
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
      </div>
    </div>
  );
}