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
  title: 'Testimonial Creator - Create Professional Testimonial Cards in 60 Seconds',
  description: 'Create high-quality testimonial cards for your landing pages in under 60 seconds. Perfect for SaaS founders who need professional marketing materials fast.',
  keywords: 'testimonial, testimonial cards, SaaS, marketing, design, testimonials, customer reviews',
  openGraph: {
    title: 'Testimonial Creator - Create Professional Testimonial Cards in 60 Seconds',
    description: 'Create high-quality testimonial cards for your landing pages in under 60 seconds. Perfect for SaaS founders who need professional marketing materials fast.',
    type: 'website',
    url: 'https://testimonial-creator.com',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Testimonial Creator - Professional Testimonial Cards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonial Creator - Create Professional Testimonial Cards in 60 Seconds',
    description: 'Create high-quality testimonial cards for your landing pages in under 60 seconds. Perfect for SaaS founders who need professional marketing materials fast.',
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
  "name": "Testimonial Creator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "Create high-quality testimonial cards for your landing pages in under 60 seconds. Perfect for SaaS founders who need professional marketing materials fast.",
  "offers": {
    "@type": "Offer",
    "price": "10",
    "priceCurrency": "USD",
    "description": "20 tokens for $10"
  },
  "url": "https://testimonial-creator.com",
  "image": "https://testimonial-creator.com/og-image.png",
  "sameAs": [
    "https://twitter.com/testimonialcreator",
    "https://linkedin.com/company/testimonial-creator"
  ],
  "author": {
    "@type": "Organization",
    "name": "Testimonial Creator"
  }
};

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-black text-brand-ivory px-4 py-2 rounded-md z-50">
        Skip to content
      </a>
      
      <Header variant="marketing" />
      
      <main id="main" className="min-h-screen bg-brand-ivory text-brand-black">
        <HeroSection 
          ctaPrimaryLabel="Get started free" 
          ctaSecondaryLabel="View templates" 
        />
        
        <HowItWorksSection 
          steps={[
            { title: 'Choose template', description: 'Select from 9 professional templates' },
            { title: 'Style background', description: 'Customize colors and backgrounds' },
            { title: 'Export', description: 'Download in any resolution' }
          ]} 
        />
        
        <TemplateGalleryPreview />
        
        <PricingSection 
          plans={[
            { name: 'Starter', tokens: 20, price: 10, popular: false },
            { name: 'Professional', tokens: 100, price: 40, popular: true },
            { name: 'Business', tokens: 300, price: 100, popular: false }
          ]} 
        />
        
        <FAQSection 
          items={[
            {
              question: 'How long does it take to create a testimonial card?',
              answer: 'Our 3-step workflow lets you create professional testimonial cards in under 60 seconds. Simply choose a template, customize the content and background, then export in your desired resolution.'
            },
            {
              question: 'What file formats do you support?',
              answer: 'We support PNG and JPG exports in various resolutions including 1x and 2x for high-DPI displays. You can also choose from preset aspect ratios like 1:1, 4:5, 16:9, and more.'
            },
            {
              question: 'Do I need to create an account?',
              answer: 'You can try our tool without creating an account using our guest mode. However, creating an account allows you to save your work, manage your token balance, and access premium features.'
            },
            {
              question: 'How does the token system work?',
              answer: 'Each testimonial card export costs 1 token. You can purchase token packs starting from 20 tokens for $10. Tokens never expire and can be used anytime.'
            },
            {
              question: 'Can I use the testimonial cards commercially?',
              answer: 'Yes, all testimonial cards created with our tool can be used for commercial purposes including marketing materials, websites, and social media.'
            }
          ]} 
        />
      </main>
      
      <Footer />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
