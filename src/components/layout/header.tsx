'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  variant?: 'marketing' | 'app';
}

export function Header({ variant = 'marketing' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: '/docs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/20 bg-brand-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="Testimonial Creator Home">
              <div className="w-8 h-8 bg-brand-black rounded-lg flex items-center justify-center">
                <span className="text-brand-ivory font-bold text-sm">TC</span>
              </div>
              <span className="font-semibold text-lg text-brand-black">
                Testimonial Creator
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-charcoal hover:text-brand-black transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {variant === 'marketing' && (
              <Badge variant="secondary" className="bg-brand-charcoal/10 text-brand-charcoal">
                Free Trial
              </Badge>
            )}
            <Button asChild className="bg-brand-black hover:bg-brand-black/90 text-brand-ivory h-10 px-6">
              <Link href="/app/editor">
                <Sparkles className="w-4 h-4 mr-2" />
                Launch App
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-charcoal hover:text-brand-black h-10 w-10"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-brand-charcoal/20 py-4">
            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-brand-charcoal hover:text-brand-black transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-brand-charcoal/20">
                <Button asChild className="w-full bg-brand-black hover:bg-brand-black/90 text-brand-ivory h-12">
                  <Link href="/app/editor" onClick={() => setIsMobileMenuOpen(false)}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Launch App
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
