'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';

export default function ArtworksPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navLinkStyle: CSSProperties = {
    fontFamily: 'SF Pro, sans-serif',
    fontSize: isMobile ? 'clamp(14px, 4.5vw, 18px)' : 'clamp(16px, 1.7vw, 24px)',
    textTransform: 'lowercase' as const,
    letterSpacing: '-0.02em',
    color: isMobile ? 'white' : 'black',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: isMobile ? '500' : 'normal'
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <div className="relative w-full h-full">
        <Image
          src="/assets/KDRAMA SILHOUETTE.svg"
          alt="KDRAMA Silhouette"
          fill
          priority
          className="object-contain"
          style={{ 
            objectPosition: '45% 50%',
            transform: isMobile ? 'scale(1.0)' : 'scale(0.6)'
          }}
        />
        
        {/* Desktop Layout */}
        <div className="desktop-layout">
          <div className="absolute top-[42.6%] left-1/2 transform -translate-x-1/2 flex items-center">
            {/* KDRAMA Logo */}
            <div className="kdrama-logo">
              <Image
                src="/assets/kdrama-logo.svg"
                alt="KDRAMA Logo"
                width={130}
                height={45}
                className="object-contain brightness-0"
              />
            </div>

            {/* Flags */}
            <div className="flex items-center space-x-[4px] ml-[2px] relative top-[2px]">
              <Image src="/assets/us-flag.png" alt="US Flag" width={24} height={16} className="object-contain" />
              <Image src="/assets/france-flag.png" alt="France Flag" width={24} height={16} className="object-contain" />
              <Image src="/assets/russia-flag.png" alt="Russia Flag" width={24} height={16} className="object-contain" />
              <Image src="/assets/korea-flag.png" alt="Korea Flag" width={24} height={16} className="object-contain" />
              <Image src="/assets/china-flag.png" alt="China Flag" width={24} height={16} className="object-contain" />
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8 ml-8">
              <Link href="/artworks" className="nav-item" style={navLinkStyle}>
                artworks
              </Link>
              <Link href="/photography" className="nav-item" style={navLinkStyle}>
                photography
              </Link>
              <Link href="/music" className="nav-item" style={navLinkStyle}>
                music
              </Link>
              <Link href="/contact" className="nav-item" style={navLinkStyle}>
                contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div
          className="mobile-layout absolute inset-0 flex flex-col items-start justify-center space-y-1"
          style={{
            transform: 'translateY(0%) scale(0.85)',
            display: 'none',
            marginLeft: '7vw'
          }}
        >
          {/* KDRAMA Logo */}
          <div className="mb-0.5">
            <Image
              src="/assets/kdrama-logo.svg"
              alt="KDRAMA Logo"
              width={90}
              height={32}
              className="object-contain brightness-0 invert mobile-logo"
            />
          </div>

          {/* Flags */}
          <div className="mb-0.5">
            <div className="flex items-center space-x-[2px] mobile-flags">
              <Image src="/assets/us-flag.png" alt="US Flag" width={20} height={13} className="object-contain" />
              <Image src="/assets/france-flag.png" alt="France Flag" width={20} height={13} className="object-contain" />
              <Image src="/assets/russia-flag.png" alt="Russia Flag" width={20} height={13} className="object-contain" />
              <Image src="/assets/korea-flag.png" alt="Korea Flag" width={20} height={13} className="object-contain" />
              <Image src="/assets/china-flag.png" alt="China Flag" width={20} height={13} className="object-contain" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start mobile-nav w-full">
            <Link href="/artworks" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
              artworks
            </Link>
            <Link href="/photography" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
              photography
            </Link>
            <Link href="/music" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
              music
            </Link>
            <Link href="/contact" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
              contact
            </Link>
          </div>
        </div>

        {/* Manual adjustment for very small screens */}
        <style>{`
          @media (max-width: 330px) {
            .mobile-layout {
              transform: translateY(0%) scale(0.75) translateX(-8%) !important;
            }
            .mobile-layout .nav-item {
              font-size: 13px !important;
            }
          }
        `}</style>
      </div>
    </main>
  );
} 