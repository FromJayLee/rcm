'use client';

import { useEditor } from '../context/EditorContext';
import { FileText, User, Palette, Download, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  { id: 1, key: 'template', label: 'Template', icon: FileText },
  { id: 2, key: 'content', label: 'Content', icon: User },
  { id: 3, key: 'background', label: 'Background', icon: Palette },
  { id: 4, key: 'export', label: 'Export', icon: Download },
];

export function Stepper() {
  const { state, dispatch } = useEditor();

  const handleStepChange = (step: number) => {
    dispatch({ type: "SET_STEP", step: step as 1 | 2 | 3 | 4 });
  };

  return (
    <nav aria-label="Steps" className="py-1 bg-ivory flex justify-center">
      <div className="flex items-center space-x-1">
        {steps.map((step, index) => {
          const isActive = state.step === step.id;
          const isCompleted = state.step > step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              <button
                aria-current={isActive ? 'step' : undefined}
                aria-disabled={false}
                className={`px-2 py-1 rounded border flex items-center space-x-1 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal ${
                  isActive 
                    ? 'bg-ivory text-charcoal border-charcoal shadow-md' 
                    : isCompleted
                    ? 'bg-charcoal/5 text-charcoal border-charcoal/30'
                    : 'bg-ivory text-charcoal border-charcoal/30 hover:bg-charcoal/5 hover:border-charcoal/50'
                }`}
                onClick={() => handleStepChange(step.id)}
              >
                {isCompleted ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <Icon className="w-3 h-3" />
                )}
                <span className="hidden sm:inline font-medium">{step.label}</span>
                <span className="sm:hidden font-bold">{step.id}</span>
              </button>
              
              {/* 화살표 연결 */}
              {index < steps.length - 1 && (
                <ArrowRight className="w-3 h-3 text-charcoal/40 mx-1" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
