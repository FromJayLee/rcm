// Export 엔진 고도화를 위한 타입 및 유틸리티 함수들
import html2canvas from 'html2canvas';

export type ExportFormat = 'PNG' | 'JPG';

export interface ExportOptions {
  width: number; // px
  height: number; // px
  format: ExportFormat;
  scale: 1 | 2; // 1x or 2x
  fileName: string; // without extension
  quality?: number; // 0..1 for JPG
}

export interface ExportState {
  isExporting: boolean;
  progress: number;
  error: string | null;
}

// 폰트 로딩 대기 함수
export async function waitForFonts(): Promise<void> {
  if (document.fonts && 'ready' in document.fonts) {
    await (document.fonts as any).ready;
  }
  
  // 추가 폰트 로딩 확인
  const fontPromises = Array.from(document.fonts).map(font => font.load());
  await Promise.all(fontPromises);
}

// 이미지 로딩 대기 함수
export async function waitForImages(root: HTMLElement): Promise<void> {
  const imgs = Array.from(root.querySelectorAll('img')) as HTMLImageElement[];
  
  // CSS background-image URL 수집
  const backgroundImages: string[] = [];
  const allElements = root.querySelectorAll('*');
  
  allElements.forEach((element) => {
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.backgroundImage;
    
    if (backgroundImage && backgroundImage !== 'none') {
      // url("...") 형태에서 URL 추출
      const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        backgroundImages.push(urlMatch[1]);
      }
    }
  });
  
  // img 태그와 CSS background-image 모두 로딩 대기
  const imagePromises = [
    ...imgs.map(async (img) => {
      try {
        if ('decode' in img) {
          await img.decode();
        } else if (!img.complete) {
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // 에러가 발생해도 계속 진행
            // 타임아웃 설정
            setTimeout(() => resolve(), 5000);
          });
        }
      } catch (error) {
        console.warn('이미지 로딩 실패:', img.src, error);
      }
    }),
    ...backgroundImages.map(async (url) => {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url; // URL 설정
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // 에러가 발생해도 계속 진행
          setTimeout(() => resolve(), 5000); // 타임아웃 설정
        });
      } catch (error) {
        console.warn('CSS background 이미지 로딩 실패:', url, error);
      }
    })
  ];
  
  await Promise.all(imagePromises);
}


// 렌더 동결 함수
export function freezeRendering(root: HTMLElement): () => void {
  const originalTransition = root.style.transition;
  const originalAnimation = root.style.animation;
  
  root.style.transition = 'none';
  root.style.animation = 'none';
  
  // 모든 자식 요소의 애니메이션도 동결
  const allElements = root.querySelectorAll('*');
  const originalStyles: { element: HTMLElement; transition: string; animation: string }[] = [];
  
  allElements.forEach((element) => {
    const el = element as HTMLElement;
    originalStyles.push({
      element: el,
      transition: el.style.transition,
      animation: el.style.animation
    });
    el.style.transition = 'none';
    el.style.animation = 'none';
  });
  
  return () => {
    root.style.transition = originalTransition;
    root.style.animation = originalAnimation;
    
    originalStyles.forEach(({ element, transition, animation }) => {
      element.style.transition = transition;
      element.style.animation = animation;
    });
  };
}

// 메인 Export 함수 - 배경을 먼저 생성하고 카드를 올리는 방식
export async function exportCardImage(root: HTMLElement, options: ExportOptions): Promise<Blob> {
  // 렌더 동결
  const unfreeze = freezeRendering(root);
  
  try {
    // 폰트와 이미지 로딩 대기
    await Promise.all([
      waitForFonts(),
      waitForImages(root)
    ]);
    
    // 추가 안정화 대기
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 1. 최종 캔버스 생성
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = options.width * options.scale;
    finalCanvas.height = options.height * options.scale;
    
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context를 가져올 수 없습니다.');
    }
    
    // 2. 전체 카드 캡처 (배경 포함)
    const targetElement = root;
    
    const cardOptions = {
      width: options.width,
      height: options.height,
      scale: options.scale,
      useCORS: true,
      backgroundColor: null, // 투명 배경으로 캡처
      allowTaint: true,
      logging: false,
      foreignObjectRendering: true,
      removeContainer: false,
      cacheBust: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: options.width,
      windowHeight: options.height
      // style 속성 완전 제거 - transform을 보존하기 위해
    };
    
    console.log('카드 캡처 시작:', { options, targetElement });
    const cardCanvas = await html2canvas(targetElement, cardOptions);
    console.log('카드 캡처 완료:', { canvasWidth: cardCanvas.width, canvasHeight: cardCanvas.height });
    
    // 3. 전체 카드를 최종 캔버스에 그리기 (배경 포함)
    ctx.drawImage(cardCanvas, 0, 0, finalCanvas.width, finalCanvas.height);
    
    // 5. Blob 생성
    return new Promise((resolve, reject) => {
      finalCanvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Blob 생성에 실패했습니다.'));
        }
      }, options.format === 'PNG' ? 'image/png' : 'image/jpeg', options.quality || 0.92);
    });
    
  } catch (error) {
    console.error('Export 실패:', error);
    
    // SSR fallback 시도
    try {
      const response = await fetch('/api/export/fallback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          options,
          cardState: {
            templateId: (root as any).dataset?.templateId || 'T1',
            content: (root as any).dataset?.content || '{}',
            background: (root as any).dataset?.background || '{}',
            cardConfig: (root as any).dataset?.cardConfig || '{}'
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('SSR fallback도 실패했습니다.');
      }
      
      return await response.blob();
    } catch (fallbackError) {
      console.error('SSR fallback 실패:', fallbackError);
      throw new Error('Export에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  } finally {
    // 정리
    unfreeze();
  }
}

// Blob 다운로드 함수
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // 메모리 정리
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// 파일명 생성 함수
export function generateFileName(baseName?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return baseName ? `${baseName}-${timestamp}` : `testimonial-card-${timestamp}-${random}`;
}
