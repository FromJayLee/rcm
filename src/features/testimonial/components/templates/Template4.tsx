'use client';

import { Star } from 'lucide-react';
import { TemplateProps } from '../types';

export function Template4({ content, style }: TemplateProps) {
  const { quote, authorName, authorRole, rating, avatarUrl, isAnonymous } = content;
  const { mode } = style;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className={`flex p-6 bg-white rounded-lg shadow-lg ${
        mode === 'dark' 
          ? 'text-charcoal' 
          : 'text-charcoal'
      }`} style={{ 
        width: '360px',
        height: '260px'
      }}>
        {/* 좌측 정사각 이미지 */}
        <div className="flex-shrink-0 mr-6">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={authorName}
              className="w-24 h-24 rounded-lg object-cover"
            />
          ) : (
            <div className={`w-24 h-24 rounded-lg flex items-center justify-center text-white font-semibold text-2xl ${
              mode === 'dark' ? 'bg-charcoal' : 'bg-charcoal'
            }`}>
              {isAnonymous ? 'A' : authorName.charAt(0)}
            </div>
          )}
        </div>
        
        {/* 우측 본문 영역 */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {/* 본문 */}
            <p className="text-gray-600 leading-relaxed">
              "{quote}"
            </p>
          </div>
          
          {/* 하단 작성자 정보 */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-black">
                {isAnonymous ? 'Anonymous' : authorName}
              </div>
              <div className="text-sm text-gray-600">
                {authorRole}
              </div>
            </div>
            
            {/* 우측 아이콘들 */}
            <div className="flex flex-col space-y-2">
              <div className="w-8 h-8 bg-blue-100 rounded border-2 border-dashed border-blue-300 flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-400 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-400 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}