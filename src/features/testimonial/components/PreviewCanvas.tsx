'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEditor } from '../context/EditorContext';
import { Template1, Template2, Template3, Template4, Template5 } from './templates';
import { TemplateRenderer } from './templates/registry';
import { mapEditorStateToTemplateProps } from '../types';
import { CANVAS_RATIO, CANVAS_CLASS } from '../constants';

export function PreviewCanvas() {
  const { state } = useEditor();

  const renderTemplate = () => {
    // T1-T5는 기존 레거시 포맷 사용
    if (['T1', 'T2', 'T3', 'T4', 'T5'].includes(state.templateId)) {
      const legacyContent = {
        quote: state.content.quote,
        authorName: state.content.authorName,
        authorRole: state.content.authorRole,
        rating: 5,
        avatarUrl: state.content.avatarUrl,
        isAnonymous: state.content.isAnonymous,
      };

      const legacyStyle = {
        mode: state.content.theme,
      };

      switch (state.templateId) {
        case 'T1':
          return <Template1 content={legacyContent} style={legacyStyle} />;
        case 'T2':
          return <Template2 content={legacyContent} style={legacyStyle} />;
        case 'T3':
          return <Template3 content={legacyContent} style={legacyStyle} />;
        case 'T4':
          return <Template4 content={legacyContent} style={legacyStyle} />;
        case 'T5':
          return <Template5 content={legacyContent} style={legacyStyle} />;
        default:
          return <Template1 content={legacyContent} style={legacyStyle} />;
      }
    }

    // T6-T9는 새로운 확장된 포맷 사용
    const extendedData = mapEditorStateToTemplateProps(state);
    return <TemplateRenderer templateId={state.templateId} data={extendedData} />;
  };

  const renderBackground = () => {
    if (state.background.kind === 'solid') {
      return { backgroundColor: state.background.value };
    } else if (state.background.kind === 'gradient') {
      // 그라디언트가 설정되지 않은 경우 연한 회색 사용
      if (!state.background.value || state.background.value === '#F3F4F6') {
        return { backgroundColor: '#F3F4F6' };
      }
      return { background: state.background.value };
    } else if (state.background.kind === 'image') {
      // 이미지가 업로드되지 않은 경우 또는 연한 회색 색상인 경우
      if (!state.background.value || state.background.value === '#F3F4F6' || (!state.background.value.startsWith('data:') && !state.background.value.startsWith('http'))) {
        return { backgroundColor: '#F3F4F6' }; // 연한 회색
      }
      
      // 이미지 URL과 필터 분리
      const [imageUrl, filter] = state.background.value.split('|');
      const baseStyle = { 
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
      
      // 필터가 있으면 적용
      if (filter) {
        return { ...baseStyle, filter };
      }
      
      return baseStyle;
    }
    return { backgroundColor: '#F3F4F6' }; // 기본값
  };

  // 4:3 고정 비율 사용
  const currentRatioStyle = { aspectRatio: CANVAS_RATIO };

  return (
    <div className="h-full flex flex-col bg-ivory">
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div 
          id="testimonial-preview"
          className={`w-full max-w-lg ${CANVAS_CLASS}`} 
          style={currentRatioStyle}
        >
          <Card 
            id="testimonial-canvas" 
            className="h-full w-full border border-gray-300 rounded-lg shadow-sm overflow-hidden relative"
            style={{
              backgroundColor: '#FFFFFF', // 카드 자체는 흰색 배경
              width: '100%', // 부모 컨테이너에 맞춤
              height: '100%', // 부모 컨테이너에 맞춤
              // html2canvas가 배경을 제대로 캡처할 수 있도록 명시적 설정
              background: '#FFFFFF',
            }}
            data-template-id={state.templateId}
            data-content={JSON.stringify(state.content)}
            data-background={JSON.stringify(state.background)}
            data-card-config={JSON.stringify(state.cardConfig)}
          >
            <CardContent 
              className="h-full p-0 relative"
            >
              {/* Background Layer */}
              <div 
                data-layer="bg"
                className="absolute inset-0"
                style={renderBackground()}
              />
              
              {/* Card Container with Auto Scale */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  padding: state.cardConfig.scale >= 1.0 ? '0px' : '20px', // 100% 이상일 때 패딩 제거
                  transform: `scale(${state.cardConfig.scale})`,
                  transformOrigin: 'center',
                  filter: state.cardConfig.shadow.enabled 
                    ? `drop-shadow(${state.cardConfig.shadow.offsetX}px ${state.cardConfig.shadow.offsetY}px ${state.cardConfig.shadow.blur}px rgba(0, 0, 0, ${state.cardConfig.shadow.opacity / 100}))`
                    : 'none',
                }}
              >
                {renderTemplate()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
