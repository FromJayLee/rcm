'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardConfig } from '../types';
import { Template1, Template2, Template3, Template4, Template5 } from './templates';

interface CanvasContainerProps {
  currentStep: number;
  cardConfig: CardConfig;
}

const aspectRatios = [
  { label: '1:1', value: 'square', className: 'aspect-square' },
  { label: '16:9', value: 'landscape', className: 'aspect-video' },
  { label: '4:5', value: 'portrait', className: 'aspect-[4/5]' },
  { label: '1.91:1', value: 'wide', className: 'aspect-[1.91/1]' },
  { label: '3:2', value: 'photo', className: 'aspect-[3/2]' },
  { label: '9:16', value: 'story', className: 'aspect-[9/16]' },
];

export function CanvasContainer({ currentStep, cardConfig }: CanvasContainerProps) {
  const [selectedRatio, setSelectedRatio] = useState('square');

  const renderTemplate = () => {
    if (!cardConfig) {
      return <div className="w-full h-full flex items-center justify-center text-charcoal/60">
        Loading...
      </div>;
    }

    switch (cardConfig.templateId) {
      case 'T1':
        return <Template1 content={cardConfig.content} style={cardConfig.style} />;
      case 'T2':
        return <Template2 content={cardConfig.content} style={cardConfig.style} />;
      case 'T3':
        return <Template3 content={cardConfig.content} style={cardConfig.style} />;
      case 'T4':
        return <Template4 content={cardConfig.content} style={cardConfig.style} />;
      case 'T5':
        return <Template5 content={cardConfig.content} style={cardConfig.style} />;
      default:
        return <Template1 content={cardConfig.content} style={cardConfig.style} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className={`w-full max-w-md ${aspectRatios.find(r => r.value === selectedRatio)?.className}`}>
          <Card className="h-full w-full border-2 border-dashed border-primary/20 overflow-hidden">
            <CardContent className="h-full p-0">
              {renderTemplate()}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Aspect Ratio Controls */}
      <div className="border-t border-border p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Aspect Ratio</h3>
            <Badge variant="outline" className="text-xs">
              {aspectRatios.find(r => r.value === selectedRatio)?.label}
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {aspectRatios.map((ratio) => (
              <Button
                key={ratio.value}
                variant={selectedRatio === ratio.value ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedRatio(ratio.value)}
              >
                {ratio.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
