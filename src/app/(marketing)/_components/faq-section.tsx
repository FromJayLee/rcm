'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export default function FAQSection({ items }: FAQSectionProps) {
  return (
    <section className="py-20 bg-brand-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-black mb-6">
            Frequently Asked
            <br />
            <span className="text-brand-charcoal">Questions</span>
          </h2>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            Everything you need to know about creating testimonial cards with our tool. 
            Can't find the answer you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg border border-brand-charcoal/20 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-semibold text-brand-black">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-brand-charcoal leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 border border-brand-charcoal/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-brand-black mb-4">
              Still have questions?
            </h3>
            <p className="text-brand-charcoal mb-6">
              Our support team is here to help you get the most out of Testimonial Creator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg" className="border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal/10">
                <Link href="/help">
                  Help Center
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-brand-black hover:bg-brand-black/90 text-brand-ivory">
                <Link href="/contact">
                  Contact Support
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
