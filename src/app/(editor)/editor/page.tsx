'use client';

import { Suspense } from 'react';
import { EditorLayout } from '@/features/testimonial/components/EditorLayout';
import { EditorProvider } from '@/features/testimonial/context/EditorContext';

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorProvider>
        <EditorLayout />
      </EditorProvider>
    </Suspense>
  );
}
