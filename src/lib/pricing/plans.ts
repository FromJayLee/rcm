export type PlanId = 'free' | 'basic' | 'premium';
export type ResolutionTier = 'low' | 'standard' | 'hi';

export interface PlanSpec {
  id: PlanId;
  name: string;
  badge?: 'Popular' | 'Best Value';
  price: { 
    currency: 'USD'; 
    monthlyUsd?: number; 
    oneTimeUsd?: number; 
  };
  tokens: { 
    included: number; 
    unit: 'export' 
  };
  watermark: boolean;
  commercialUse: boolean;
  maxResolution: ResolutionTier;
  features: string[];
  limits: string[];
  cta: { 
    label: string; 
    action: 'launch' | 'signup' | 'checkout'; 
    href?: string 
  };
  stripePriceId?: string;
  icon?: React.ReactNode;
  legalNotes?: string[];
}

export const PRICING_PLANS: PlanSpec[] = [
  {
    id: 'free',
    name: 'Free',
    price: { currency: 'USD', monthlyUsd: 0 },
    tokens: { included: 25, unit: 'token' },
    watermark: true,
    commercialUse: false,
    maxResolution: 'low',
    features: [
      '9개의 전문적인 템플릿',
      'PNG & JPG 형식'
    ],
    limits: [],
    cta: { 
      label: '무료로 시작하기', 
      action: 'launch', 
      href: '/app/editor' 
    },
    legalNotes: ['무료 플랜의 내보내기에는 워터마크가 포함됩니다.']
  },
  {
    id: 'basic',
    name: 'Basic',
    badge: '추천',
    price: { currency: 'USD', oneTimeUsd: 9 },
    tokens: { included: 50, unit: 'token' },
    watermark: false,
    commercialUse: true,
    maxResolution: 'standard',
    features: [
      '9개의 전문적인 템플릿',
      '워터마크 없음',
      '상업적 사용 가능',
      'PNG & JPG 형식'
    ],
    limits: [],
    cta: { 
      label: 'Basic', 
      action: 'checkout', 
      href: '/checkout?plan=basic' 
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: { currency: 'USD', oneTimeUsd: 19 },
    tokens: { included: 110, unit: 'token' },
    watermark: false,
    commercialUse: true,
    maxResolution: 'hi',
    features: [
      '9개의 전문적인 템플릿',
      '워터마크 없음',
      '상업적 사용 가능',
      'PNG & JPG 형식',
      '이미지 배경 설정 가능'
    ],
    limits: [],
    cta: { 
      label: 'Premium', 
      action: 'checkout', 
      href: '/checkout?plan=premium' 
    },
  }
];

// Type guard for runtime validation
export function isValidPlanSpec(x: any): x is PlanSpec {
  return (
    x && 
    ['free', 'basic', 'premium'].includes(x.id) && 
    typeof x.name === 'string' && 
    x.price && 
    x.tokens && 
    typeof x.watermark === 'boolean' &&
    typeof x.commercialUse === 'boolean' &&
    ['low', 'standard', 'hi'].includes(x.maxResolution)
  );
}

// CTA handler hook
export function usePlanCta() {
  const handleCta = (plan: PlanSpec) => {
    switch (plan.cta.action) {
      case 'launch':
        window.location.href = plan.cta.href || '/app/editor';
        break;
      case 'signup':
        window.location.href = plan.cta.href || '/signup';
        break;
      case 'checkout':
        window.location.href = plan.cta.href || `/checkout?plan=${plan.id}`;
        break;
    }
  };
  
  return handleCta;
}
