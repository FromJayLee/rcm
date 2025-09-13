export type AspectRatio = "1:1" | "4:5" | "16:9" | "1.91:1" | "3:2" | "9:16";
export type BackgroundKind = "solid" | "gradient" | "image";

export interface EditorState {
  step: 1 | 2 | 3 | 4;
  aspectRatio: AspectRatio;
  templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
  content: {
    quote: string;
    authorName: string;
    authorRole: string;
    rating: number; // 1-5
    avatarUrl: string | null;
    isAnonymous: boolean;
    theme: 'light' | 'dark';
  };
  background: {
    kind: BackgroundKind;
    value: string;
  };
  cardConfig: {
    scale: number; // 0.60 ~ 0.95
  };
}

export type Action =
  | { type: "SET_STEP"; step: 1 | 2 | 3 | 4 }
  | { type: "SET_ASPECT_RATIO"; ratio: AspectRatio }
  | { type: "SET_TEMPLATE"; templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' }
  | { type: "SET_CONTENT"; patch: Partial<EditorState['content']> }
  | { type: "SET_BACKGROUND"; patch: Partial<EditorState['background']> }
  | { type: "SET_CARD_SCALE"; value: number };

// Legacy types for backward compatibility
export interface CardConfig {
  templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
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

export interface TemplateProps {
  content: CardConfig['content'];
  style: CardConfig['style'];
}
