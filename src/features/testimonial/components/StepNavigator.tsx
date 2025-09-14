'use client';

import { Button } from '@/components/ui/button';
import { Check, FileText, Palette, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepNavigatorProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  {
    id: 1,
    title: 'Content',
    description: 'Choose template & edit content',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Background',
    description: 'Style background',
    icon: Palette,
  },
  {
    id: 3,
    title: 'Export',
    description: 'Export at desired resolution',
    icon: Download,
  },
];

export function StepNavigator({ currentStep, onStepChange }: StepNavigatorProps) {
  return (
    <div className="h-full p-4 space-y-2">
      <h2 className="text-sm font-semibold text-charcoal/60 mb-4">
        Create Testimonial
      </h2>
      
      <div className="space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <Button
              key={step.id}
              variant="ghost"
              className={cn(
                'w-full justify-start h-auto p-3 text-left',
                isCurrent && 'bg-primary text-primary-foreground',
                isCompleted && !isCurrent && 'text-charcoal/60'
              )}
              onClick={() => onStepChange(step.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                  isCompleted && 'bg-primary-foreground text-primary',
                  isCurrent && 'bg-primary-foreground text-primary',
                  !isCompleted && !isCurrent && 'bg-charcoal/10 text-charcoal/60'
                )}>
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-charcoal/60 mt-1">
                    {step.description}
                  </div>
                </div>
                <Icon className="w-4 h-4 flex-shrink-0" />
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
