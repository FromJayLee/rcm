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
  const stepColors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-green-100 text-green-600'];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            How it works
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-black mb-6">
            Create Professional Testimonials
            <br />
            in 3 Simple Steps
          </h2>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            Our streamlined workflow makes it incredibly easy to create high-quality testimonial cards 
            that will make your landing page stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = stepIcons[index];
            const colorClass = stepColors[index];
            
            return (
              <Card key={index} className="relative border-brand-charcoal/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center font-bold text-sm`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full ${colorClass} flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-brand-black mb-4">
                    {step.title}
                  </h3>
                  <p className="text-brand-charcoal leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-brand-charcoal mb-6">
            Ready to create your first testimonial card?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-4 py-2">
              <MousePointer className="w-4 h-4 mr-2" />
              No design skills required
            </Badge>
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-4 py-2">
              <Download className="w-4 h-4 mr-2" />
              Export in any resolution
            </Badge>
            <Badge variant="outline" className="border-brand-charcoal text-brand-charcoal px-4 py-2">
              <Palette className="w-4 h-4 mr-2" />
              Fully customizable
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
