// Testimonial 관련 상수 정의

// 캔버스 비율 상수
export const CANVAS_RATIO = 4 / 3;
export const CANVAS_CLASS = 'aspect-[4/3]';

// 해상도 제한 상수
export const MIN_WIDTH = 300;
export const MAX_WIDTH = 2000;

// 템플릿 관련 상수
export const TEMPLATE_DIMENSIONS = {
  width: 350,
  height: 250
} as const;

// 템플릿별 최대 글자수 제한
export const TEMPLATE_QUOTE_LIMITS = {
  T1: 120,  // 350x250, 중앙 정렬, 작은 카드
  T2: 100,  // 320x280, 좌측 정렬, 작은 카드
  T3: 150,  // 2:1 비율, 큰 카드
  T4: 200,  // 450x280, 큰 카드
  T5: 80,   // 340x320, 작은 공간
  T6: 180,  // 500x200, 넓은 카드
  T7: 120,  // 400x300, 중간 크기
  T8: 140,  // 450x350, 중간 크기
  T9: 100,  // 350x350, 정사각형
} as const;

// 템플릿별 기본 리뷰 텍스트 (모든 템플릿에서 사용 가능한 길이로 제한)
export const TEMPLATE_DEFAULT_QUOTES = {
  T1: "Great tool! Saves us hours of work. Highly recommend!",
  T2: "Perfect solution! Easy to use and great results!",
  T3: "This has revolutionized our workflow. The quality is outstanding and saves us countless hours. Highly recommend!",
  T4: "Outstanding tool that has completely transformed our testimonial creation process. The quality is exceptional and saves us hours of work. Highly recommend!",
  T5: "Great tool! Very helpful.",
  T6: "This tool has completely transformed how we create testimonial cards. The quality is outstanding and saves us hours of work. Highly recommend!",
  T7: "Great tool! Saves us hours of work. Highly recommend!",
  T8: "This tool has completely transformed how we create testimonial cards. The quality is outstanding and saves us hours. Highly recommend!",
  T9: "Perfect solution! Easy to use and great results!",
} as const;
