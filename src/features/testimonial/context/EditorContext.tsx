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
      return { ...state, templateId: action.templateId };
    case "SET_CONTENT":
      return { ...state, content: { ...state.content, ...action.patch } };
    case "SET_BACKGROUND":
      return { ...state, background: { ...state.background, ...action.patch } };
    case "SET_CARD_SCALE": {
      const value = Math.min(0.95, Math.max(0.6, action.value));
      return { ...state, cardConfig: { ...state.cardConfig, scale: value } };
    }
    default:
      return state;
  }
}

const initialState: EditorState = {
  step: 1,
  aspectRatio: "4:3", // 4:3 고정
  templateId: "T1",
  content: {
    quote: "This tool has completely transformed how we create marketing materials. The quality is outstanding and it saves us hours every week.",
    authorName: "John Doe",
    authorRole: "CEO, TechStart",
    rating: 5,
    avatarUrl: null,
    isAnonymous: false,
    theme: "light",
  },
  background: {
    kind: "solid",
    value: "#000000",
  },
  cardConfig: {
    scale: 0.8,
  },
};

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 동기화: step 쿼리 파라미터 반영
  useEffect(() => {
    const step = searchParams.get('step');
    if (step) {
      const stepNumber = parseInt(step, 10);
      if (stepNumber >= 1 && stepNumber <= 4 && stepNumber !== state.step) {
        dispatch({ type: "SET_STEP", step: stepNumber as 1 | 2 | 3 | 4 });
      }
    }
  }, [searchParams, state.step]);

  // 상태 변경 시 URL 업데이트
  useEffect(() => {
    const currentStep = searchParams.get('step');
    if (currentStep !== state.step.toString()) {
      const url = new URL(window.location.href);
      url.searchParams.set('step', state.step.toString());
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [state.step, router, searchParams]);

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
