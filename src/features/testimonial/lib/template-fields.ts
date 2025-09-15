// 각 템플릿별 필수 요소 정의
export interface TemplateFieldConfig {
  required: string[];
  optional: string[];
  characterLimits: Record<string, number>;
  description: string;
}

export const templateFieldConfigs: Record<string, TemplateFieldConfig> = {
  T1: {
    required: ['quote', 'authorName', 'authorRole'],
    optional: ['avatarUrl', 'theme'],
    characterLimits: { quote: 120, authorName: 20, authorRole: 30 },
    description: 'Classic Center - 인용문, 프로필 정보'
  },
  T2: {
    required: ['quote', 'authorName', 'authorRole'],
    optional: ['avatarUrl', 'theme'],
    characterLimits: { quote: 100, authorName: 18, authorRole: 25 },
    description: 'Left Aligned - 좌측 정렬, 프로필 정보'
  },
  T3: {
    required: ['quote', 'authorName', 'authorRole'],
    optional: ['avatarUrl', 'theme'],
    characterLimits: { quote: 80, authorName: 15, authorRole: 20 },
    description: 'Card Style - 카드 형태, 프로필 정보'
  },
  T4: {
    required: ['quote', 'authorName', 'authorRole'],
    optional: ['avatarUrl', 'theme', 'company', 'verified', 'dateISO'],
    characterLimits: { quote: 150, authorName: 25, authorRole: 35, company: 30 },
    description: 'Review Card - 리뷰 형태, 회사 정보와 인증 배지'
  },
  T5: {
    required: ['quote', 'authorName', 'authorRole'],
    optional: ['avatarUrl', 'theme'],
    characterLimits: { quote: 60, authorName: 12, authorRole: 18 },
    description: 'Progress Style - 진행률 표시, 간단한 텍스트'
  },
  T6: {
    required: ['quote'],
    optional: ['authorName', 'authorRole', 'avatarUrl', 'theme'],
    characterLimits: { quote: 100, authorName: 18, authorRole: 25 },
    description: 'Split Layout - 텍스트만, 프로필 정보 선택적'
  },
  T7: {
    required: ['quote', 'authorName', 'authorRole'],
    optional: ['avatarUrl', 'theme'],
    characterLimits: { quote: 200, authorName: 20, authorRole: 30 },
    description: 'Quote Style - 인용문 중심, 긴 텍스트'
  },
  T8: {
    required: ['quote', 'authorName', 'authorRole'],
    optional: ['avatarUrl', 'theme'],
    characterLimits: { quote: 80, authorName: 15, authorRole: 20 },
    description: 'Profile Centric - 프로필 중심, 중간 크기'
  },
  T9: {
    required: ['quote'],
    optional: ['authorName', 'authorRole', 'avatarUrl', 'theme', 'dateISO'],
    characterLimits: { quote: 50, authorName: 10, authorRole: 15 },
    description: 'Minimal - 텍스트만, 프로필 정보 선택적'
  }
};

// 템플릿별 필드 가져오기
export function getTemplateFields(templateId: string): string[] {
  const config = templateFieldConfigs[templateId];
  if (!config) {
    return ['quote', 'authorName', 'authorRole', 'rating', 'avatarUrl', 'isAnonymous', 'theme'];
  }
  return [...config.required, ...config.optional];
}

// 템플릿별 필수 필드만 가져오기
export function getRequiredFields(templateId: string): string[] {
  const config = templateFieldConfigs[templateId];
  return config?.required || ['quote', 'authorName', 'authorRole', 'rating'];
}

// 템플릿별 선택적 필드만 가져오기
export function getOptionalFields(templateId: string): string[] {
  const config = templateFieldConfigs[templateId];
  return config?.optional || ['avatarUrl', 'isAnonymous', 'theme'];
}

// 템플릿별 글자수 제한 가져오기
export function getCharacterLimits(templateId: string): Record<string, number> {
  const config = templateFieldConfigs[templateId];
  return config?.characterLimits || { quote: 100, authorName: 20, authorRole: 30 };
}

// 필드가 템플릿에서 사용되는지 확인
export function isFieldUsed(templateId: string, field: string): boolean {
  const config = templateFieldConfigs[templateId];
  if (!config) return true;
  return config.required.includes(field) || config.optional.includes(field);
}

// 필드가 필수인지 확인
export function isFieldRequired(templateId: string, field: string): boolean {
  const config = templateFieldConfigs[templateId];
  if (!config) return false;
  return config.required.includes(field);
}
