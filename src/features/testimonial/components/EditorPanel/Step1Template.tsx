'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEditor } from '../../context/EditorContext';
import { FileText } from 'lucide-react';

export function Step1Template() {
  const { state, dispatch } = useEditor();

  const handleTemplateChange = (templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5') => {
    dispatch({ type: "SET_TEMPLATE", templateId });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-charcoal mb-2">Choose Your Template</h2>
        <p className="text-sm text-charcoal/60">Select a template to get started</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {['T1', 'T2', 'T3', 'T4', 'T5'].map((template) => (
                 <button
                   key={template}
                   className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                     state.templateId === template
                       ? 'bg-ivory text-charcoal border-charcoal shadow-lg'
                       : 'bg-ivory text-charcoal border-charcoal/30 hover:bg-charcoal/5 hover:border-charcoal/50'
                   }`}
                   onClick={() => handleTemplateChange(template as 'T1' | 'T2' | 'T3' | 'T4' | 'T5')}
                 >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">Template {template}</h3>
                <p className="text-xs opacity-75 mt-1">Click to preview this template</p>
              </div>
              <div className="w-8 h-8 bg-charcoal/10 rounded border flex items-center justify-center">
                <span className="text-xs font-bold">{template}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
