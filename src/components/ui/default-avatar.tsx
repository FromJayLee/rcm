'use client';

import { User } from 'lucide-react';

interface DefaultAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isAnonymous?: boolean;
  name?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8', 
  xl: 'w-10 h-10'
};

export function DefaultAvatar({ 
  size = 'md', 
  className = '', 
  isAnonymous = false,
  name = ''
}: DefaultAvatarProps) {
  const sizeClass = sizeClasses[size];
  const iconSize = iconSizes[size];
  
  // 이름의 첫 글자 또는 익명일 경우 'A'
  const initial = isAnonymous ? 'A' : (name ? name.charAt(0).toUpperCase() : '?');
  
  return (
    <div 
      className={`${sizeClass} rounded-full bg-slate-200 flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        border: '2px solid #f1f5f9'
      }}
    >
      <User 
        className={`${iconSize} text-slate-500`}
        style={{
          color: '#64748b'
        }}
      />
    </div>
  );
}
