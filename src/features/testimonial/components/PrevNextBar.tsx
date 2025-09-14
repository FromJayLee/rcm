'use client';

import { Button } from '@/components/ui/button';
import { useEditor } from '../context/EditorContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function PrevNextBar() {
  const { state, dispatch } = useEditor();

  const canPrev = state.step > 1;
  const canNext = state.step < 4;

  const handlePrev = () => {
    if (canPrev) {
      dispatch({ type: "SET_STEP", step: (state.step - 1) as 1 | 2 | 3 | 4 });
    }
  };

  const handleNext = () => {
    if (canNext) {
      dispatch({ type: "SET_STEP", step: (state.step + 1) as 1 | 2 | 3 | 4 });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && canPrev) {
      handlePrev();
    } else if (e.key === 'ArrowRight' && canNext) {
      handleNext();
    } else if (e.key === 'Enter' && canNext) {
      handleNext();
    }
  };

  return (
    <div 
      className="sticky bottom-0 inset-x-0 bg-ivory/95 backdrop-blur border-t border-charcoal/20 py-0.5 px-1 flex justify-center safe-area-pb"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex gap-2" style={{ transform: 'scale(0.8)' }}>
        <Button
          variant="outline"
          disabled={!canPrev}
          onClick={handlePrev}
          className="inline-flex items-center gap-1 px-2 py-1 bg-ivory border-charcoal/40 text-charcoal disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal hover:bg-charcoal/5 hover:border-charcoal/60 transition-all duration-200 text-xs"
        >
          <ArrowLeft className="w-3 h-3" />
          <span className="hidden sm:inline font-medium">Previous</span>
          <span className="sm:hidden font-medium">Prev</span>
        </Button>
        
        <Button
          variant="outline"
          disabled={!canNext}
          onClick={handleNext}
          className="inline-flex items-center gap-1 px-2 py-1 bg-ivory border-charcoal/40 text-charcoal disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal hover:bg-charcoal/5 hover:border-charcoal/60 transition-all duration-200 text-xs"
        >
          <span className="hidden sm:inline font-medium">Next</span>
          <span className="sm:hidden font-medium">Next</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
