import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import HeroSection from './_components/hero-section';
import HowItWorksSection from './_components/how-it-works-section';
import TemplateGalleryPreview from './_components/template-gallery-preview';
import PricingSection from './_components/pricing-section';
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
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '리뷰 카드 생성기 - 60초 만에 전문적인 리뷰 카드 만들기',
    description: '60초 이내에 고품질 리뷰 카드를 랜딩페이지에 만들어보세요. 빠른 마케팅 자료가 필요한 SaaS 창업자에게 완벽합니다.',
  },
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-black">
      <Header variant="marketing" />
      
      <HeroSection 
        ctaPrimaryLabel="무료로 시작하기" 
        ctaSecondaryLabel="템플릿 보기" 
      />
      
      <HowItWorksSection 
        steps={[
          { title: '템플릿 선택', description: '9개의 전문적인 템플릿 중에서 선택하세요' },
          { title: '배경 스타일링', description: '색상과 배경을 커스터마이징하세요' },
          { title: '내보내기', description: '원하는 해상도로 다운로드하세요' }
        ]} 
      />
      
      <TemplateGalleryPreview />
      
      <PricingSection 
        plans={[
          { name: '스타터', tokens: 20, price: 10, popular: false },
          { name: '프로페셔널', tokens: 100, price: 40, popular: true },
          { name: '비즈니스', tokens: 300, price: 100, popular: false }
        ]} 
      />
      
      <FAQSection 
        items={[
          {
            question: '증언 카드를 만드는 데 얼마나 걸리나요?',
            answer: '3단계 워크플로우로 60초 이내에 전문적인 증언 카드를 만들 수 있습니다. 템플릿을 선택하고, 콘텐츠와 배경을 커스터마이징한 다음, 원하는 해상도로 내보내기만 하면 됩니다.'
          },
          {
            question: '어떤 파일 형식을 지원하나요?',
            answer: 'PNG와 JPG 형식으로 다양한 해상도에서 내보낼 수 있으며, 고해상도 디스플레이를 위한 1x와 2x도 지원합니다. 1:1, 4:5, 16:9 등 미리 설정된 화면 비율도 선택할 수 있습니다.'
          },
          {
            question: '계정을 만들어야 하나요?',
            answer: '게스트 모드를 사용하여 계정 없이도 도구를 사용해볼 수 있습니다. 하지만 계정을 만들면 작업을 저장하고, 토큰 잔액을 관리하며, 프리미엄 기능에 접근할 수 있습니다.'
          },
          {
            question: '토큰 시스템은 어떻게 작동하나요?',
            answer: '증언 카드 하나를 내보낼 때마다 1토큰이 소모됩니다. 20토큰에 $10부터 시작하는 토큰 팩을 구매할 수 있습니다. 토큰은 만료되지 않으며 언제든지 사용할 수 있습니다.'
          },
          {
            question: '증언 카드를 상업적으로 사용할 수 있나요?',
            answer: '네, 우리 도구로 만든 모든 증언 카드는 마케팅 자료, 웹사이트, 소셜 미디어를 포함한 상업적 목적으로 사용할 수 있습니다.'
          }
        ]} 
      />
      
      <Footer />
    </main>
  );
}
