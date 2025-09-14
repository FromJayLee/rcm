'use client';

import { TopBar } from './TopBar';
import { Stepper } from './Stepper';
import { EditorPanelRouter } from './EditorPanelRouter';
import { PreviewCanvasContainer } from './PreviewCanvasContainer';
import { PrevNextBar } from './PrevNextBar';

export function EditorLayout() {
  return (
    <div className="min-h-dvh bg-ivory text-charcoal flex flex-col">
      <TopBar />
      <div className="border-b border-charcoal/20">
        <Stepper />
      </div>
      <main id="main" className="flex-1 flex justify-center px-4 py-2">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* 왼쪽 - 설정 패널 (더 작게) */}
          <aside className="bg-ivory border border-charcoal/20 rounded-lg shadow-sm overflow-hidden lg:col-span-1">
            <EditorPanelRouter />
          </aside>
          
          {/* 오른쪽 - 미리보기 (더 크게) */}
          <section className="bg-ivory border border-charcoal/20 rounded-lg shadow-sm overflow-hidden lg:col-span-2">
            <PreviewCanvasContainer />
          </section>
        </div>
      </main>
      <PrevNextBar />
    </div>
  );
}
