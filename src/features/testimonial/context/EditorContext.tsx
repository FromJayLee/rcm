'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EditorState, Action } from '../types';

const EditorContext = createContext<{ state: EditorState; dispatch: React.Dispatch<Action> } | null>(null);

function editorReducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_ASPECT_RATIO":
      return { ...state, aspectRatio: action.ratio };
    case "SET_TEMPLATE":
      // T4 템플릿 선택 시 자동으로 2:1 비율 설정
      const aspectRatio = action.templateId === 'T4' ? '2:1' : state.aspectRatio;
      return { ...state, templateId: action.templateId, aspectRatio };
    case "SET_CONTENT":
      return { ...state, content: { ...state.content, ...action.patch } };
    case "SET_BACKGROUND":
      return { ...state, background: { ...state.background, ...action.patch } };
    case "SET_CARD_SCALE": {
      const value = Math.min(1.5, Math.max(0.6, action.value));
      return { ...state, cardConfig: { ...state.cardConfig, scale: value } };
    }
    case "SET_CARD_SHADOW": {
      return { ...state, cardConfig: { ...state.cardConfig, shadow: { ...state.cardConfig.shadow, ...action.patch } } };
    }
    case "RESET_EDITOR":
      return initialState;
    default:
      return state;
  }
}

const initialState: EditorState = {
  step: 1,
  aspectRatio: "1:1", // 기본 비율
  templateId: "T1",
  content: {
    quote: "Great tool! Saves us hours of work. Highly recommend!",
    authorName: "Sarah Chen",
    authorRole: "Marketing Manager",
    rating: 5,
    avatarUrl: null,
    isAnonymous: false,
    theme: "light",
    // 새 필드들
    company: "TechCorp",
    sourceName: "Google Reviews",
    sourceLogoUrl: null,
    dateISO: "2024-01-01T00:00:00.000Z", // 정적 초기값으로 hydration mismatch 방지
    verified: true,
    badges: ["Top Reviewer"],
    align: "center",
    accentColor: "#3b82f6",
  },
  background: {
    kind: "solid",
    value: "#F3F4F6",
  },
  cardConfig: {
    scale: 1.0,
    shadow: {
      enabled: true,
      blur: 10,
      offsetX: 0,
      offsetY: 4,
      color: '#000000',
      opacity: 50,
    },
  },
};

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 실제 날짜 설정 (hydration mismatch 방지)
  useEffect(() => {
    dispatch({ 
      type: "SET_CONTENT", 
      patch: { dateISO: new Date().toISOString() } 
    });
  }, []);

  // URL 동기화: step 쿼리 파라미터 반영
  useEffect(() => {
    const step = searchParams.get('step');
    if (step) {
      const stepNumber = parseInt(step, 10);
      if (stepNumber >= 1 && stepNumber <= 4 && stepNumber !== state.step) {
        dispatch({ type: "SET_STEP", step: stepNumber as 1 | 2 | 3 | 4 });
      }
    }
  }, [searchParams.toString()]);

  // 상태 변경 시 URL 업데이트
  useEffect(() => {
    const url = new URL(window.location.href);
    const currentStep = url.searchParams.get('step');
    if (currentStep !== state.step.toString()) {
      url.searchParams.set('step', state.step.toString());
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [state.step, router]);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
