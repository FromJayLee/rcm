'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEditor } from '../../context/EditorContext';
import { FileText } from 'lucide-react';
import { getAllTemplateMetas } from '../templates/registry';

export function Step1Template() {
  const { state, dispatch } = useEditor();

  const handleTemplateChange = (templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9') => {
    dispatch({ type: "SET_TEMPLATE", templateId });
  };

  const templateMetas = getAllTemplateMetas();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-base font-semibold text-charcoal mb-1">Choose Template</h2>
        <p className="text-xs text-charcoal/60">Select a template to get started</p>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {templateMetas.map((template) => (
          <button
            key={template.id}
            className={`p-2 rounded-lg border-2 text-center transition-all duration-200 h-20 ${
              state.templateId === template.id
                ? 'bg-ivory text-charcoal border-charcoal shadow-lg'
                : 'bg-ivory text-charcoal border-charcoal/30 hover:bg-charcoal/5 hover:border-charcoal/50'
            }`}
            onClick={() => handleTemplateChange(template.id as 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9')}
          >
            <div className="flex flex-col items-center space-y-1 h-full">
              {/* 템플릿 ID 배지 */}
              <div className="w-8 h-8 bg-charcoal/10 rounded border flex items-center justify-center">
                <span className="text-sm font-bold">{template.id}</span>
              </div>
              
              {/* 템플릿 이름 */}
              <div className="flex-1 flex items-center">
                <h3 className="font-medium text-xs leading-tight text-center">{template.name}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
