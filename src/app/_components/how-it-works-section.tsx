'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Download, MousePointer } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
}

export default function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  const stepIcons = [MousePointer, Palette, Download];

  return (
    <section aria-labelledby="how-it-works-title" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            How it works
          </Badge>
          <h2 id="how-it-works-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            Create Professional Testimonials
            <br />
            in 3 Simple Steps
          </h2>
          <p className="text-lg sm:text-xl text-brand-charcoal max-w-3xl mx-auto">
            Our streamlined workflow makes it incredibly easy to create high-quality testimonial cards 
            that will make your landing page stand out.
          </p>
        </div>

        <div className="flex flex-col space-y-12 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            
            return (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-8">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-brand-charcoal/10 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-charcoal flex items-center justify-center">
                      <Icon className="w-8 h-8 text-brand-ivory" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <span className="text-2xl font-bold text-brand-charcoal">Step {index + 1}</span>
                    <div className="w-8 h-px bg-brand-charcoal/20"></div>
                  </div>
                  <h3 className="text-2xl font-semibold text-brand-black mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-brand-charcoal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-lg text-brand-charcoal mb-8">
            Ready to create your first testimonial card?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-6 py-3 text-base">
              <MousePointer className="w-5 h-5 mr-2" />
              No design skills required
            </Badge>
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-6 py-3 text-base">
              <Download className="w-5 h-5 mr-2" />
              Export in any resolution
            </Badge>
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-6 py-3 text-base">
              <Palette className="w-5 h-5 mr-2" />
              Fully customizable
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
