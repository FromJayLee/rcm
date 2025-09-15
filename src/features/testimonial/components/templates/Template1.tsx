'use client';

import { Star } from 'lucide-react';
import { TemplateProps } from '../../types';

export function Template1({ content, style }: TemplateProps) {
  const { quote, authorName, authorRole, rating, avatarUrl, isAnonymous } = content;
  const { mode } = style;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className={`flex flex-col gap-4 p-6 rounded-lg shadow-lg overflow-hidden ${
        mode === 'dark' 
          ? 'bg-charcoal text-ivory' 
          : 'bg-white text-charcoal'
      }`} style={{ 
        width: '350px',
        height: '250px'
      }}>
        {/* 상단 별점 */}
        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`w-5 h-5 ${
                star <= 5 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
        </div>
        
        {/* 본문 - 남는 높이에서 세로 중앙 정렬 */}
        <div className="flex-1 flex items-center justify-center">
          <p className={`italic leading-relaxed text-center ${
            mode === 'dark' ? 'text-ivory/80' : 'text-gray-600'
          }`}>
            "{quote}"
          </p>
        </div>
        
        {/* 하단 프로필 */}
        <div className="flex items-center justify-center space-x-3">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
              mode === 'dark' ? 'bg-ivory text-charcoal' : 'bg-charcoal text-white'
            }`}>
              {isAnonymous ? 'A' : authorName.charAt(0)}
            </div>
          )}
          <div className="text-center">
            <div className={`font-bold ${
              mode === 'dark' ? 'text-ivory' : 'text-black'
            }`}>
              {isAnonymous ? 'Anonymous' : authorName}
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