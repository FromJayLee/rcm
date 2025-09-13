'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEditor } from '../context/EditorContext';
import { Template1, Template2, Template3, Template4, Template5 } from './templates';

// 4:3 고정 비율만 사용
const CANVAS_RATIO = '4:3';
const CANVAS_CLASS = 'aspect-[4/3]';

export function PreviewCanvas() {
  const { state } = useEditor();

  const renderTemplate = () => {
    // Convert new state to legacy format for templates
    const legacyContent = {
      quote: state.content.quote,
      authorName: state.content.authorName,
      authorRole: state.content.authorRole,
      rating: state.content.rating,
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
  };

  const renderBackground = () => {
    return { backgroundColor: '#f3f4f6' };
  };

  // 4:3 고정 비율 사용
  const currentRatioStyle = { aspectRatio: '4 / 3' };

  return (
    <div className="h-full flex flex-col bg-ivory">
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className={`w-full max-w-lg ${CANVAS_CLASS}`} style={currentRatioStyle}>
          <Card className="h-full w-full border border-gray-300 rounded-lg shadow-sm overflow-hidden relative">
            <CardContent 
              className="h-full p-0 relative"
              style={renderBackground()}
            >
              {/* Card Container with Auto Scale */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  padding: '40px', // 안전 여백
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
