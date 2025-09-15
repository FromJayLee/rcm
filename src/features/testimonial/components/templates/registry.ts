import React from 'react';
import { TemplateMeta, ExtendedTemplateProps } from '../../types';
import { 
  Template1, Template2, Template3, Template4, Template5,
  Template6, Template7, Template8, Template9 
} from './index';

// 기본 데이터 정의 - 익명성이 보장되는 가상의 이름과 회사
const defaultData1: ExtendedTemplateProps = {
  quote: "This product transformed our workflow. Highly recommended!",
  author: {
    name: "Alex Chen",
    role: "Product Manager",
    company: "TechFlow"
  },
  verified: true,
  badges: ["Top Reviewer"],
  align: 'center',
  accentColor: '#3B82F6',
  dark: false
};

const defaultData2: ExtendedTemplateProps = {
  quote: "Great quality and service. Will order again!",
  author: {
    name: "Jordan Smith",
    role: "CEO",
    company: "InnovateCorp"
  },
  verified: false,
  badges: ["Verified Buyer"],
  align: 'left',
  accentColor: '#10B981',
  dark: false
};

const defaultData3: ExtendedTemplateProps = {
  quote: "Best investment this year. Amazing ROI!",
  author: {
    name: "Taylor Johnson",
    role: "Marketing Director",
    company: "GrowthHub"
  },
  verified: true,
  badges: ["Premium User", "Early Adopter"],
  align: 'center',
  accentColor: '#F59E0B',
  dark: false
};

const defaultData4: ExtendedTemplateProps = {
  quote: "Great support and seamless integration!",
  author: {
    name: "Casey Kim",
    role: "CTO",
    company: "DataFlow Inc"
  },
  verified: true,
  badges: ["Enterprise Customer"],
  align: 'left',
  accentColor: '#8B5CF6',
  dark: false
};

const defaultData5: ExtendedTemplateProps = {
  quote: "Game-changing solution! Saves hours weekly.",
  author: {
    name: "Riley Wang",
    role: "Operations Manager",
    company: "EfficiencyPlus"
  },
  verified: false,
  badges: ["Power User"],
  align: 'center',
  accentColor: '#EF4444',
  dark: false
};

const defaultData6: ExtendedTemplateProps = {
  quote: "Great value! Features are exactly what we need.",
  author: {
    name: "Morgan Wilson",
    role: "Founder",
    company: "ScaleTech"
  },
  verified: true,
  badges: ["Verified Purchase", "Top Contributor"],
  align: 'left',
  accentColor: '#3B82F6',
  dark: false
};

const defaultData7: ExtendedTemplateProps = {
  quote: "Professional and reliable. Always delivers!",
  author: {
    name: "Avery Thompson",
    role: "VP of Sales",
    company: "RevenueMax"
  },
  verified: true,
  badges: ["VIP Customer"],
  align: 'center',
  accentColor: '#10B981',
  dark: false
};

const defaultData8: ExtendedTemplateProps = {
  quote: "Team understands our needs. Perfect fit!",
  author: {
    name: "Quinn Garcia",
    role: "Head of Engineering",
    company: "DevTools Pro"
  },
  verified: false,
  badges: ["Beta Tester", "Community Leader"],
  align: 'left',
  accentColor: '#8B5CF6',
  dark: false
};

const defaultData9: ExtendedTemplateProps = {
  quote: "Outstanding UX and incredible attention to detail!",
  author: {
    name: "Sage Santos",
    role: "Design Lead",
    company: "CreativeFlow"
  },
  verified: true,
  badges: ["Design Expert", "Influencer"],
  align: 'center',
  accentColor: '#EF4444',
  dark: false
};

// 템플릿 레지스트리
export const templateRegistry: TemplateMeta[] = [
  {
    id: 'T1',
    name: 'Classic Center',
    component: Template1,
    defaultData: defaultData1,
    tags: ['minimal', 'center', 'classic']
  },
  {
    id: 'T2',
    name: 'Left Aligned',
    component: Template2,
    defaultData: defaultData2,
    tags: ['left', 'simple', 'clean']
  },
  {
    id: 'T3',
    name: 'Wide Format',
    component: Template3,
    defaultData: defaultData3,
    tags: ['wide', 'landscape', 'professional']
  },
  {
    id: 'T4',
    name: 'Profile Focus',
    component: Template4,
    defaultData: defaultData4,
    tags: ['profile', 'image', 'modern']
  },
  {
    id: 'T5',
    name: 'Rating Distribution',
    component: Template5,
    defaultData: defaultData5,
    tags: ['rating', 'analytics', 'data']
  },
  {
    id: 'T6',
    name: 'Quote Highlight',
    component: Template6,
    defaultData: defaultData6,
    tags: ['quote', 'wide', 'accent']
  },
  {
    id: 'T7',
    name: 'Profile Card',
    component: Template7,
    defaultData: defaultData7,
    tags: ['profile', 'card', 'elegant']
  },
  {
    id: 'T8',
    name: 'Badge Showcase',
    component: Template8,
    defaultData: defaultData8,
    tags: ['badges', 'achievements', 'premium']
  },
  {
    id: 'T9',
    name: 'Social Style',
    component: Template9,
    defaultData: defaultData9,
    tags: ['social', 'square', 'interactive']
  }
];

// 템플릿 렌더러 컴포넌트
export function TemplateRenderer({ 
  templateId, 
  data 
}: { 
  templateId: string; 
  data: ExtendedTemplateProps 
}) {
  const meta = templateRegistry.find(t => t.id === templateId);
  
  if (!meta) {
    console.warn(`Template ${templateId} not found, falling back to T1`);
    const fallbackMeta = templateRegistry.find(t => t.id === 'T1')!;
    const Component = fallbackMeta.component;
    return React.createElement(Component, data);
  }
  
  const Component = meta.component;
  return React.createElement(Component, data);
}

// 템플릿 ID로 메타데이터 가져오기
export function getTemplateMeta(templateId: string): TemplateMeta | undefined {
  return templateRegistry.find(t => t.id === templateId);
}

// 모든 템플릿 메타데이터 가져오기
export function getAllTemplateMetas(): TemplateMeta[] {
  return templateRegistry;
}
