'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
}

export default function HeroSection({ ctaPrimaryLabel, ctaSecondaryLabel }: HeroSectionProps) {
  const features = [
    'Create in under 60 seconds',
    '9 professional templates',
    'Export in any resolution',
    'No design skills required'
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal w-fit">
                <Sparkles className="w-3 h-3 mr-1" />
                New: 9 Professional Templates
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-brand-black leading-tight">
                Create High-Quality
                <br />
                <span className="text-brand-charcoal">Testimonial Cards</span>
                <br />
                in Under 60 Seconds
              </h1>
              
              <p className="text-lg text-brand-charcoal leading-relaxed max-w-lg">
                Perfect for SaaS founders who need professional marketing materials fast. 
                No design skills required - just choose, customize, and export.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-brand-charcoal flex-shrink-0" />
                  <span className="text-brand-charcoal text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-black hover:bg-white hover:text-brand-black hover:border-brand-black border-2 border-brand-black text-brand-ivory transition-all duration-300">
                <Link href="/auth/login">
                  {ctaPrimaryLabel}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-300">
                <Link href="/templates">
                  {ctaSecondaryLabel}
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-brand-charcoal">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-brand-charcoal/20 border-2 border-brand-ivory"
                    />
                  ))}
                </div>
                <span>500+ creators</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-brand-charcoal/10">
              {/* Mock Editor Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-brand-black">Testimonial Preview</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Live Preview
                  </Badge>
                </div>
                
                {/* Mock Testimonial Card */}
                <div className="bg-brand-ivory rounded-lg p-6 border border-brand-charcoal/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-brand-charcoal rounded-full flex items-center justify-center">
                      <span className="text-brand-ivory font-bold text-lg">S</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black">Sarah Johnson</h4>
                      <p className="text-sm text-brand-charcoal">Product Manager, TechCorp</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  
                  <p className="text-brand-black italic">
                    "This product has completely transformed our workflow. 
                    Highly recommended for any SaaS team!"
                  </p>
                </div>
                
                {/* Mock Controls */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-brand-charcoal/5 rounded p-2 text-center">
                    <div className="text-xs text-brand-charcoal">Template</div>
                    <div className="text-sm font-medium text-brand-black">Modern</div>
                  </div>
                  <div className="bg-brand-charcoal/5 rounded p-2 text-center">
                    <div className="text-xs text-brand-charcoal">Background</div>
                    <div className="text-sm font-medium text-brand-black">Gradient</div>
                  </div>
                  <div className="bg-brand-charcoal/5 rounded p-2 text-center">
                    <div className="text-xs text-brand-charcoal">Export</div>
                    <div className="text-sm font-medium text-brand-black">PNG 2x</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-charcoal rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-ivory" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-brand-charcoal/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
