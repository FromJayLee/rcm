'use client';

import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Templates', href: '/templates' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Features', href: '/features' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/docs/api' },
      { name: 'Help Center', href: '/help' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Cookie Policy', href: '/legal/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Email', href: 'mailto:hello@testimonialcreator.com', icon: Mail },
  ];

  return (
    <footer className="bg-brand-ivory border-t border-brand-charcoal/20" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <div className="flex flex-col space-y-12">
          {/* Brand Section */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-black rounded-lg flex items-center justify-center">
                <span className="text-brand-ivory font-bold text-sm">TC</span>
              </div>
              <span className="font-semibold text-lg text-brand-black">
                Testimonial Creator
              </span>
            </div>
            <p className="text-brand-charcoal text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              Create high-quality testimonial cards for your landing pages in under 60 seconds. 
              Perfect for SaaS founders who need professional marketing materials fast.
            </p>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-brand-charcoal hover:text-brand-black transition-colors focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md p-1"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-brand-black mb-4 text-center sm:text-left">Product</h3>
              <ul className="space-y-3 text-center sm:text-left">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-brand-charcoal hover:text-brand-black transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-brand-black mb-4 text-center sm:text-left">Resources</h3>
              <ul className="space-y-3 text-center sm:text-left">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-brand-charcoal hover:text-brand-black transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-brand-black mb-4 text-center sm:text-left">Company</h3>
              <ul className="space-y-3 text-center sm:text-left">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-brand-charcoal hover:text-brand-black transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-brand-black mb-4 text-center sm:text-left">Legal</h3>
              <ul className="space-y-3 text-center sm:text-left">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-brand-charcoal hover:text-brand-black transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-brand-charcoal/20 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-brand-charcoal/20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="text-brand-charcoal text-sm">
                © {currentYear} Testimonial Creator. All rights reserved.
              </p>
              <p className="text-brand-charcoal text-sm">
                Made with ❤️ for SaaS founders
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
