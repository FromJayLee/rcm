'use client';

import { Star } from 'lucide-react';
import { TemplateProps } from '../../types';

export function Template5({ content, style }: TemplateProps) {
  const { quote, authorName, authorRole, rating, avatarUrl, isAnonymous } = content;
  const { mode } = style;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className={`flex flex-col justify-between p-8 rounded-lg shadow-lg ${
        mode === 'dark' 
          ? 'bg-charcoal text-ivory' 
          : 'bg-white text-charcoal'
      }`} style={{ 
        width: '340px',
        height: '320px'
      }}>
        {/* 상단 타이틀 */}
        <div className="text-center mb-6">
          <h3 className={`text-lg font-semibold ${
            mode === 'dark' ? 'text-ivory' : 'text-black'
          }`}>
            Customer reviews
          </h3>
        </div>
        
        {/* 평균 별점 배지 */}
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className="flex space-x-1">
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
          <span className={`text-xl font-bold ${
            mode === 'dark' ? 'text-ivory' : 'text-black'
          }`}>
            {rating}
          </span>
          <span className={mode === 'dark' ? 'text-ivory' : 'text-black'}>
            out of 5
          </span>
        </div>
        
        {/* 총 리뷰 수 */}
        <div className={`text-center mb-6 ${
          mode === 'dark' ? 'text-ivory/80' : 'text-black'
        }`}>
          40 customer ratings
        </div>
        
        {/* 분포 바 */}
        <div className="space-y-2 mb-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const percentage = star === 5 ? 84 : star === 4 ? 9 : star === 3 ? 4 : star === 2 ? 2 : 1;
            return (
              <div key={star} className="flex items-center space-x-2">
                <span className={`text-sm w-12 ${
                  mode === 'dark' ? 'text-ivory' : 'text-black'
                }`}>
                  {star} star
                </span>
                <div className={`flex-1 rounded-full h-2 ${
                  mode === 'dark' ? 'bg-ivory/20' : 'bg-gray-200'
                }`}>
                  <div 
                    className={`h-2 rounded-full ${
                      mode === 'dark' ? 'bg-ivory/60' : 'bg-gray-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={`text-sm w-8 text-right ${
                  mode === 'dark' ? 'text-ivory' : 'text-black'
                }`}>
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}