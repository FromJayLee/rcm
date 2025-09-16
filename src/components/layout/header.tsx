'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  variant?: 'marketing' | 'app';
}

export function Header({ variant = 'marketing' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { tokenBalance } = useTokenBalance();

  const navigationItems = [
    { name: '템플릿', href: '#templates' },
    { name: '가격', href: '#pricing' },
    { name: '자주 묻는 질문', href: '#faq' },
  ];

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/20 bg-brand-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="리뷰 카드 생성기 홈">
              <div className="w-8 h-8 bg-brand-black rounded-lg flex items-center justify-center">
                <span className="text-brand-ivory font-bold text-sm">TC</span>
              </div>
              <span className="font-semibold text-lg text-brand-black">
                리뷰 카드 생성기
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="메인 네비게이션">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleSmoothScroll(item.href)}
                className="text-brand-charcoal hover:text-brand-black transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-[#222222]">
                  <Sparkles className="w-4 h-4" />
                  <span>{tokenBalance} 토큰</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-10 px-4">
                      <User className="w-4 h-4 mr-2" />
                      {user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/checkout">토큰 구매</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : variant === 'marketing' ? (
              <>
                <Button asChild variant="ghost" className="text-brand-charcoal hover:text-brand-black hover:bg-brand-charcoal/10 transition-all duration-300">
                  <Link href="/auth/login">로그인</Link>
                </Button>
                <Button asChild variant="outline" className="border-brand-charcoal text-white hover:bg-white hover:text-brand-charcoal hover:border-black transition-all duration-300">
                  <Link href="/auth/signup">회원가입</Link>
                </Button>
              </>
            ) : (
              <Button asChild className="bg-brand-black hover:bg-white hover:text-brand-black hover:border-brand-black border-2 border-brand-black text-brand-ivory h-10 px-6 transition-all duration-300">
                <Link href="/app/editor">
                  <Sparkles className="w-4 h-4 mr-2" />
                  무료로 시작하기
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-charcoal hover:text-brand-black h-10 w-10"
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
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
            <nav className="flex flex-col space-y-4" aria-label="모바일 네비게이션">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleSmoothScroll(item.href)}
                  className="text-brand-charcoal hover:text-brand-black transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md px-2 py-1 text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-brand-charcoal/20">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-brand-charcoal px-2">
                      {user.email}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-brand-charcoal px-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{tokenBalance} 토큰</span>
                    </div>
                    <Button asChild variant="outline" className="w-full h-12">
                      <Link href="/checkout" onClick={() => setIsMobileMenuOpen(false)}>
                        토큰 구매
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline" 
                      className="w-full h-12"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      로그아웃
                    </Button>
                  </div>
                ) : variant === 'marketing' ? (
                  <div className="space-y-3">
                    <Button asChild variant="ghost" className="w-full h-12 text-brand-charcoal hover:text-brand-black hover:bg-brand-charcoal/10 transition-all duration-300">
                      <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                        로그인
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-12 border-brand-charcoal text-white hover:bg-white hover:text-brand-charcoal hover:border-black transition-all duration-300">
                      <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        회원가입
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full bg-brand-black hover:bg-white hover:text-brand-black hover:border-brand-black border-2 border-brand-black text-brand-ivory h-12 transition-all duration-300">
                    <Link href="/app/editor" onClick={() => setIsMobileMenuOpen(false)}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      무료로 시작하기
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
