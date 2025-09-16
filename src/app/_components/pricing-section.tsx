'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, ArrowRight } from 'lucide-react';

interface PricingPlan {
  name: string;
  tokens: number;
  price: number;
  popular: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
}

export default function PricingSection({ plans }: PricingSectionProps) {
  const features = [
    '9 professional templates',
    'Export in any resolution',
    'PNG & JPG formats',
    'No watermarks',
    'Commercial use included',
    'Priority support'
  ];

  return (
    <section aria-labelledby="pricing-title" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            Pricing
          </Badge>
          <h2 id="pricing-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-6">
            Simple, Transparent
            <br />
            <span className="text-brand-charcoal">Pay-as-you-go Pricing</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-charcoal max-w-3xl mx-auto">
            No subscriptions, no hidden fees. Pay only for what you use. 
            Each testimonial card export costs just 1 token.
          </p>
        </div>

        <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-brand-black shadow-lg' 
                  : 'border-brand-charcoal/20 hover:border-brand-charcoal/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-6">
                  <Badge className="bg-brand-black text-brand-ivory px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
                {/* Plan Info */}
                <div className="flex-1 text-center lg:text-left">
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-brand-black mb-4">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center lg:justify-start">
                      <span className="text-4xl sm:text-5xl font-bold text-brand-black">${plan.price}</span>
                      <span className="text-brand-charcoal ml-2 text-lg">one-time</span>
                    </div>
                    <p className="text-brand-charcoal mt-2 text-lg">
                      {plan.tokens} testimonial cards
                    </p>
                    <p className="text-sm text-brand-charcoal mt-1">
                      ${(plan.price / plan.tokens).toFixed(2)} per testimonial
                    </p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-brand-charcoal">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="flex-shrink-0 w-full lg:w-auto">
                  <Button 
                    className={`w-full lg:w-auto min-w-[200px] ${
                      plan.popular
                        ? 'bg-brand-black hover:bg-brand-black/90 text-brand-ivory'
                        : 'bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-ivory'
                    }`}
                    size="lg"
                  >
                    {plan.popular ? (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Get Started
                      </>
                    ) : (
                      'Choose Plan'
                    )}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Free Trial Section */}
        <div className="mt-16 text-center">
          <div className="bg-brand-ivory rounded-2xl p-8 border border-brand-charcoal/20 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black mb-4">
              Try it free first
            </h3>
            <p className="text-lg text-brand-charcoal mb-8">
              Get 3 free testimonial cards to test our tool. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal/10 h-12 px-8 text-base">
                Start Free Trial
              </Button>
              <Button size="lg" className="bg-brand-black hover:bg-brand-black/90 text-brand-ivory h-12 px-8 text-base">
                View All Features
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-brand-charcoal text-base">
            All plans include unlimited template access and commercial usage rights. 
            Tokens never expire and can be used anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
