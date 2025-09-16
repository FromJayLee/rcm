'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: '기능', href: '/features' },
      { name: '로드맵', href: '/roadmap' },
      { name: '가격', href: '/pricing' },
    ],
    resources: [
      { name: '커뮤니티', href: '/community' },
      { name: '피드백', href: '/feedback' },
      { name: '지원', href: '/support' },
    ],
    social: [
      { name: 'threads', href: 'https://threads.net' },
      { name: 'instagram', href: 'https://instagram.com' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <div className="flex flex-col space-y-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TC</span>
                </div>
                <span className="font-bold text-xl text-gray-900">
                  리뷰 카드 생성기
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                AI와 함께하는 체계적인 프로젝트 관리
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">제품</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">리소스</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">SNS</h3>
              <ul className="space-y-3">
                {footerLinks.social.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-gray-600 text-sm">
                © {currentYear} 리뷰 카드 생성기. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/legal/privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-1 py-0.5"
                >
                  개인정보처리방침
                </Link>
                <Link
                  href="/legal/terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-1 py-0.5"
                >
                  이용약관
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-md px-1 py-0.5"
                >
                  문의
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}