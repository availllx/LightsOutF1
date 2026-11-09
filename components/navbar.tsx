'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Results', href: '/results' },
  { label: 'Drivers', href: '/drivers' },
  { label: 'Constructors', href: '/constructors' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <nav className="mx-auto max-w-7xl rounded-[14px] border border-[#303037] bg-[#15151e] shadow-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc]"
            aria-label="LightsOut Formula 1 Dashboard Home"
            onClick={closeMenu}
          >
            <Image
              src="/lightsout-logo.svg"
              alt="LightsOut Logo"
              width={34}
              height={34}
              className="rounded-[6px]"
              priority
            />
            <span className="text-xl font-black uppercase tracking-tight text-white">
              Lights<span className="text-[#e10600]">Out</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1.5 md:flex" role="menubar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={`rounded-[8px] px-3.5 py-2 text-[13px] font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc] ${
                    isActive
                      ? 'bg-[#e10600] text-white shadow-[0_2px_12px_rgba(225,6,0,0.3)]'
                      : 'text-[#aaaaaa] hover:bg-white/5 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#303037] bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc] md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-nav" className="border-t border-[#303037] px-4 pb-4 pt-2 md:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-[44px] items-center rounded-[8px] px-3.5 py-2 text-[13px] font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0dedc] ${
                      isActive
                        ? 'bg-[#e10600] text-white'
                        : 'text-[#aaaaaa] hover:bg-white/5 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
