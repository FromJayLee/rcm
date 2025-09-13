'use client';

import { EditorLayout } from '@/features/testimonial/components/EditorLayout';
import { EditorProvider } from '@/features/testimonial/context/EditorContext';

export default function EditorPage() {
  return (
    <EditorProvider>
      <EditorLayout />
    </EditorProvider>
  );
}
