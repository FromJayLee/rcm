'use client';

import { Star, Quote } from 'lucide-react';
import { TemplateProps } from '../types';

export function Template3({ content, style }: TemplateProps) {
  const { quote, authorName, authorRole, rating, avatarUrl, isAnonymous } = content;
  const { mode } = style;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className={`flex flex-col justify-center items-center text-center p-8 bg-white rounded-lg shadow-lg relative ${
        mode === 'dark' 
          ? 'text-charcoal' 
          : 'text-charcoal'
      }`} style={{ 
        width: '380px',
        height: '200px'
      }}>
        {/* 큰 인용 아이콘 */}
        <div className="absolute top-4 left-4">
          <Quote className="w-12 h-12 text-teal-200" />
        </div>
        
        {/* 본문 중앙 대형 타이포 */}
        <div className="flex-1 flex items-center">
          <p className="text-gray-600 leading-relaxed text-left">
            "{quote}"
          </p>
        </div>
        
        {/* 하단 중앙 별점과 작성자 */}
        <div className="space-y-3">
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-5 h-5 ${
                  star <= rating 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          
          <div className="text-gray-600">
            <div className="font-bold text-lg">
              {isAnonymous ? 'Anonymous' : authorName}
            </div>
            <div className="text-sm">
              {authorRole}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}