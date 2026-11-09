'use client';

import { ReactNode } from 'react';

interface BackgroundWrapperProps {
  children: ReactNode;
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div className="relative min-h-screen bg-[#0b0b10] text-foreground">
      {/* Subtle static motorsport depth vignette (pure CSS, zero CPU/GPU overhead) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-5%,rgba(21,21,30,0.7),rgba(11,11,16,1))]"
        aria-hidden
      />

      {/* Very subtle static micro-grain matte texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      {/* Main Content Surface */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
