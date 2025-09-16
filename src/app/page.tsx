import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import HeroSection from './_components/hero-section';
import HowItWorksSection from './_components/how-it-works-section';
import TemplateGalleryPreview from './_components/template-gallery-preview';
import { PricingSection } from '@/components/pricing/PricingSection';
import FAQSection from './_components/faq-section';

export const dynamic = 'error';
export const revalidate = 86400;

export const metadata: Metadata = {
  title: '리뷰 카드 생성기 - 60초 만에 전문적인 리뷰 카드 만들기',
  description: '60초 이내에 고품질 리뷰 카드를 랜딩페이지에 만들어보세요. 빠른 마케팅 자료가 필요한 SaaS 창업자에게 완벽합니다.',
  keywords: '리뷰, 리뷰카드, SaaS, 마케팅, 디자인, 고객후기, 증언',
  openGraph: {
    title: '리뷰 카드 생성기 - 60초 만에 전문적인 리뷰 카드 만들기',
    description: '60초 이내에 고품질 리뷰 카드를 랜딩페이지에 만들어보세요. 빠른 마케팅 자료가 필요한 SaaS 창업자에게 완벽합니다.',
    type: 'website',
    url: 'https://testimonial-creator.com',
    locale: 'ko_KR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '증언 카드 생성기 - 전문적인 증언 카드',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '리뷰 카드 생성기 - 60초 만에 전문적인 리뷰 카드 만들기',
    description: '60초 이내에 고품질 리뷰 카드를 랜딩페이지에 만들어보세요. 빠른 마케팅 자료가 필요한 SaaS 창업자에게 완벽합니다.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://testimonial-creator.com',
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "리뷰 카드 생성기",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "60초 이내에 고품질 리뷰 카드를 랜딩페이지에 만들어보세요. 빠른 마케팅 자료가 필요한 SaaS 창업자에게 완벽합니다.",
  "offers": {
    "@type": "Offer",
    "price": "10",
    "priceCurrency": "USD",
    "description": "20토큰에 $10"
  },
  "url": "https://testimonial-creator.com",
  "image": "https://testimonial-creator.com/og-image.png",
  "sameAs": [
    "https://twitter.com/testimonialcreator",
    "https://linkedin.com/company/testimonial-creator"
  ],
  "author": {
    "@type": "Organization",
    "name": "증언 카드 생성기"
  }
};

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-black text-brand-ivory px-4 py-2 rounded-md z-50">
        본문으로 건너뛰기
      </a>
      
      <Header variant="marketing" />
      
      <main id="main" className="min-h-screen bg-brand-ivory text-brand-black">
        <HeroSection 
          ctaPrimaryLabel="무료로 시작하기" 
          ctaSecondaryLabel="" 
        />
        
        <HowItWorksSection 
          steps={[
            { title: '템플릿 선택', description: '9개의 전문적인 템플릿 중에서 선택하세요' },
            { title: '배경 스타일링', description: '색상과 배경을 커스터마이징하세요' },
            { title: '내보내기', description: '원하는 해상도로 다운로드하세요' }
          ]} 
        />
        
        <div id="templates">
          <TemplateGalleryPreview />
        </div>
        
        <div id="pricing">
          <PricingSection />
        </div>
        
        <div id="faq">
          <FAQSection 
            items={[
            {
              question: '리뷰 카드를 만드는 데 얼마나 걸리나요?',
              answer: '3단계 워크플로우로 60초 이내에 전문적인 리뷰 카드를 만들 수 있습니다. 템플릿을 선택하고, 콘텐츠와 배경을 커스터마이징한 다음, 원하는 해상도로 내보내기만 하면 됩니다.'
            },
            {
              question: '어떤 파일 형식을 지원하나요?',
              answer: 'PNG와 JPG 형식으로 다양한 해상도에서 내보낼 수 있습니다.'
            },
            {
              question: '토큰 시스템은 어떻게 작동하나요?',
              answer: '리뷰 카드 하나를 내보낼 때마다 5토큰이 소모됩니다. 기본적으로 25토큰이 제공되며, 베이직 요금제를 구매할 경우 50토큰, 프리미엄 요금제를 구매할 경우 110토큰이 제공됩니다. 토큰은 만료되지 않으며 언제든지 사용할 수 있습니다.'
            },
            {
              question: '리뷰 카드를 상업적으로 사용할 수 있나요?',
              answer: '네, 우리 도구로 만든 모든 리뷰 카드는 SaaS의 랜딩페이지, 마케팅 자료, 웹사이트, 소셜 미디어를 포함한 상업적 목적으로 사용할 수 있습니다.'
            }
          ]} 
          />
        </div>
      </main>
      
      <Footer />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
