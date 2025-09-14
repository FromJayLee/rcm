import React from 'react';

export type AspectRatio = "1:1" | "4:5" | "16:9" | "1.91:1" | "3:2" | "9:16" | "2:1";
export type BackgroundKind = "solid" | "gradient" | "image";

export interface EditorState {
  step: 1 | 2 | 3 | 4;
  aspectRatio: AspectRatio;
  templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9';
  content: {
    quote: string;
    authorName: string;
    authorRole: string;
    rating: number; // 1-5
    avatarUrl: string | null;
    isAnonymous: boolean;
    theme: 'light' | 'dark';
    // 새 필드들
    company?: string;
    sourceName?: string;
    sourceLogoUrl?: string;
    dateISO?: string;
    verified?: boolean;
    badges?: string[];
    align?: 'left' | 'center';
    accentColor?: string;
  };
  background: {
    kind: BackgroundKind;
    value: string;
  };
  cardConfig: {
    scale: number; // 0.60 ~ 1.5
    shadow: {
      enabled: boolean;
      blur: number; // 0-50
      offsetX: number; // -50 to 50
      offsetY: number; // -50 to 50
      color: string;
      opacity: number; // 0-100
    };
  };
}

export type Action =
  | { type: "SET_STEP"; step: 1 | 2 | 3 | 4 }
  | { type: "SET_ASPECT_RATIO"; ratio: AspectRatio }
  | { type: "SET_TEMPLATE"; templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9' }
  | { type: "SET_CONTENT"; patch: Partial<EditorState['content']> }
  | { type: "SET_BACKGROUND"; patch: Partial<EditorState['background']> }
  | { type: "SET_CARD_SCALE"; value: number }
  | { type: "SET_CARD_SHADOW"; patch: Partial<EditorState['cardConfig']['shadow']> }
  | { type: "RESET_EDITOR" };

// Legacy types for backward compatibility
export interface CardConfig {
  templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9';
  content: {
    quote: string;
    authorName: string;
    authorRole: string;
    rating: number; // 1-5
    avatarUrl: string | null;
    isAnonymous: boolean;
  };
  style: {
    mode: 'light' | 'dark';
  };
}

// 새로운 확장된 TemplateProps
export interface ExtendedTemplateProps {
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatarUrl?: string;
  };
  rating?: number; // 0-5, step 0.5
  source?: {
    name?: string;
    logoUrl?: string;
  };
  dateISO?: string;
  verified?: boolean;
  badges?: string[];
  align?: 'left' | 'center';
  accentColor?: string;
  dark?: boolean;
}

// 기존 호환성을 위한 TemplateProps
export interface TemplateProps {
  content: CardConfig['content'];
  style: CardConfig['style'];
}

// 템플릿 메타데이터
export interface TemplateMeta {
  id: string;
  name: string;
  component: React.ComponentType<ExtendedTemplateProps>;
  defaultData: ExtendedTemplateProps;
  tags: string[];
}

// EditorState를 ExtendedTemplateProps로 변환하는 함수
export function mapEditorStateToTemplateProps(state: EditorState): ExtendedTemplateProps {
  return {
    quote: state.content.quote || 'A concise, high-impact testimonial.',
    author: {
      name: state.content.authorName || 'Anonymous',
      role: state.content.authorRole,
      company: state.content.company,
      avatarUrl: state.content.avatarUrl || undefined,
    },
    rating: 5,
    source: {
      name: state.content.sourceName,
      logoUrl: state.content.sourceLogoUrl,
    },
    dateISO: state.content.dateISO,
    verified: state.content.verified,
    badges: state.content.badges,
    align: state.content.align || 'left',
    accentColor: state.content.accentColor || '#3b82f6',
    dark: state.content.theme === 'dark',
  };
}

// 별점 컴포넌트를 위한 유틸리티 함수
export function formatRating(value: number): number {
  return Math.max(0, Math.min(5, Math.round(value * 2) / 2));
}
