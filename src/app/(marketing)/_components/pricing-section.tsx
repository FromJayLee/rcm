'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-black mb-6">
            Simple, Transparent
            <br />
            <span className="text-brand-charcoal">Pay-as-you-go Pricing</span>
          </h2>
          <p className="text-lg text-brand-charcoal max-w-2xl mx-auto">
            No subscriptions, no hidden fees. Pay only for what you use. 
            Each testimonial card export costs just 1 token.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-brand-black shadow-lg scale-105' 
                  : 'border-brand-charcoal/20 hover:border-brand-charcoal/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-brand-black text-brand-ivory px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-brand-black">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-brand-black">${plan.price}</span>
                    <span className="text-brand-charcoal ml-2">one-time</span>
                  </div>
                  <p className="text-brand-charcoal mt-2">
                    {plan.tokens} testimonial cards
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4 mb-8">
                  {features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-brand-charcoal">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild
                  className={`w-full ${
                    plan.popular
                      ? 'bg-brand-black hover:bg-white hover:text-brand-black hover:border-brand-black border-2 border-brand-black text-brand-ivory'
                      : 'bg-brand-charcoal hover:bg-white hover:text-brand-charcoal hover:border-brand-charcoal border-2 border-brand-charcoal text-brand-ivory'
                  } transition-all duration-300`}
                  size="lg"
                >
                  <Link href="/auth/login">
                    {plan.popular ? (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Get Started
                      </>
                    ) : (
                      'Choose Plan'
                    )}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                
                <p className="text-center text-sm text-brand-charcoal mt-4">
                  ${(plan.price / plan.tokens).toFixed(2)} per testimonial
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Trial Section */}
        <div className="mt-16 text-center">
          <div className="bg-brand-ivory rounded-2xl p-8 border border-brand-charcoal/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-brand-black mb-4">
              Try it free first
            </h3>
            <p className="text-brand-charcoal mb-6">
              Get 3 free testimonial cards to test our tool. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg" className="border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-300">
                <Link href="/auth/login">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" className="bg-brand-black hover:bg-white hover:text-brand-black hover:border-brand-black border-2 border-brand-black text-brand-ivory transition-all duration-300">
                <Link href="/auth/login">View All Features</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-brand-charcoal text-sm">
            All plans include unlimited template access and commercial usage rights. 
            Tokens never expire and can be used anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
