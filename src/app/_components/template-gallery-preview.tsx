'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TemplateGalleryPreview() {
  const templates = [
    {
      id: 1,
      name: 'Modern',
      description: 'Clean and professional design',
      category: 'Professional',
      image: 'https://picsum.photos/300/200?random=1',
      features: ['Minimalist', 'High contrast', 'Bold typography']
    },
    {
      id: 2,
      name: 'Classic',
      description: 'Traditional testimonial layout',
      category: 'Traditional',
      image: 'https://picsum.photos/300/200?random=2',
      features: ['Elegant', 'Readable', 'Timeless']
    },
    {
      id: 3,
      name: 'Creative',
      description: 'Unique and eye-catching design',
      category: 'Creative',
      image: 'https://picsum.photos/300/200?random=3',
      features: ['Unique', 'Colorful', 'Dynamic']
    },
    {
      id: 4,
      name: 'Minimal',
      description: 'Simple and focused layout',
      category: 'Minimal',
      image: 'https://picsum.photos/300/200?random=4',
      features: ['Simple', 'Clean', 'Focused']
    },
    {
      id: 5,
      name: 'Corporate',
      description: 'Business-focused design',
      category: 'Business',
      image: 'https://picsum.photos/300/200?random=5',
      features: ['Professional', 'Formal', 'Trustworthy']
    },
    {
      id: 6,
      name: 'Social',
      description: 'Social media optimized',
      category: 'Social',
      image: 'https://picsum.photos/300/200?random=6',
      features: ['Social-ready', 'Engaging', 'Shareable']
    }
  ];

  return (
    <section aria-labelledby="templates-title" className="py-20 bg-brand-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            Templates
          </Badge>
          <h2 id="templates-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            Choose from 9 Professional
            <br />
            <span className="text-brand-charcoal">Testimonial Templates</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-charcoal max-w-3xl mx-auto">
            Each template is carefully designed to showcase customer testimonials effectively. 
            All templates are fully customizable and optimized for different use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 border-brand-charcoal/20 overflow-hidden">
              <div className="relative">
                <Image
                  src={template.image}
                  alt={template.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Button
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-black hover:bg-brand-black/90 text-brand-ivory"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <Badge className="absolute top-3 left-3 bg-brand-black text-brand-ivory">
                  {template.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-brand-black mb-2">
                  {template.name}
                </h3>
                <p className="text-brand-charcoal mb-4">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-brand-charcoal/30 text-brand-charcoal"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 border border-brand-charcoal/20 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black mb-4">
              Ready to see all templates?
            </h3>
            <p className="text-lg text-brand-charcoal mb-8">
              Explore our complete template gallery and find the perfect design for your testimonials.
            </p>
            <Button asChild size="lg" className="bg-brand-black hover:bg-brand-black/90 text-brand-ivory h-12 px-8 text-base">
              <Link href="/templates">
                View All Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
