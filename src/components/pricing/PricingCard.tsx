'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star } from 'lucide-react';
import { PlanSpec, usePlanCta } from '@/lib/pricing/plans';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  plan: PlanSpec;
  highlighted?: boolean;
}

export function PricingCard({ plan, highlighted = false }: PricingCardProps) {
  const handleCta = usePlanCta();


  const getPriceDisplay = () => {
    if (plan.price.monthlyUsd !== undefined) {
      return `$${plan.price.monthlyUsd}/월`;
    }
    return `$${plan.price.oneTimeUsd}`;
  };

  return (
    <Card 
      className={cn(
        'relative border-2 transition-all duration-300 hover:shadow-xl bg-white h-full flex flex-col',
        highlighted 
          ? 'border-brand-black shadow-lg' 
          : 'border-brand-charcoal/20 hover:border-brand-charcoal/40'
      )}
      aria-label={`${plan.name} 플랜`} 
      data-plan={plan.id}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-6">
          <Badge className="bg-brand-black text-brand-ivory px-4 py-1">
            <Star className="w-3 h-3 mr-1" />
            {plan.badge}
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-brand-black mb-2">
          {plan.name}
        </CardTitle>
        <div className="mb-4">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-brand-black">
              {getPriceDisplay()}
            </span>
            {plan.price.oneTimeUsd && (
              <span className="text-brand-charcoal ml-2 text-lg">일회성</span>
            )}
          </div>
          <p className="text-brand-charcoal mt-2 text-lg">
            {plan.tokens.included}개 토큰 제공
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Features */}
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-brand-charcoal text-sm">{feature}</span>
            </div>
          ))}
          {/* Add spacing for Free plan to maintain consistent height */}
          {plan.id === 'free' && (
            <div className="space-y-3">
              <div className="h-5"></div>
              <div className="h-5"></div>
            </div>
          )}
        </div>

        {/* Limits */}
        {plan.limits.length > 0 && (
          <div className="space-y-2 mb-6">
            {plan.limits.map((limit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-brand-charcoal text-sm">{limit}</span>
              </div>
            ))}
          </div>
        )}

        {/* Legal Notes */}
        {plan.legalNotes && plan.legalNotes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-brand-charcoal/10">
            <p className="text-xs text-brand-charcoal/70" aria-live="polite">
              {plan.legalNotes.join(' ')}
            </p>
          </div>
        )}

        {/* CTA Button - moved to bottom of content */}
        <div className="mt-auto pt-6">
          <Button 
            size="lg" 
            className={cn(
              'w-full h-12 text-base font-medium',
              highlighted 
                ? 'bg-brand-black hover:bg-brand-black/90 text-brand-ivory' 
                : 'bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-ivory'
            )}
            data-cta="pricing-cta" 
            data-plan={plan.id} 
            onClick={() => handleCta(plan)}
          >
            {plan.cta.label}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
