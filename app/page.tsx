'use client';
import React, { CSSProperties, useEffect, useState } from 'react';
import Image from 'next/image';
import './page.css';

export default function Home() {
  // Default to desktop layout
  const [isMobile, setIsMobile] = useState(false);
  // Add a flag to track if component has mounted
  const [hasMounted, setHasMounted] = useState(false);
  // Add state for music player
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setHasMounted(true);
    
    // Check if we're on client-side
    const checkMobile = () => {
      const width = window.innerWidth;
      const isMobileView = width < 768;
      console.log('Window width:', width, 'Is Mobile:', isMobileView);
      setIsMobile(isMobileView);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
    if (parseInt(e.target.value) === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Volume down function
  const volumeDown = () => {
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setVolume(Math.max(0, volume - 10));
    }
  };
  
  // Volume up function
  const volumeUp = () => {
    setIsMuted(false);
    setVolume(Math.min(100, volume + 10));
  };

  // Prevent hydration mismatch by not rendering anything specific until mounted
  if (!hasMounted) {
    return (
      <main className="h-screen w-screen overflow-hidden fixed inset-0 bg-white">
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative w-[65vw] max-w-[800px]" style={{ aspectRatio: '3/4' }}>
            <div className="relative w-full h-full">
              <Image
                src="/assets/KDRAMA SILHOUETTE.svg"
                alt="KDRAMA Silhouette"
                fill
                priority
                className="object-contain"
                style={{ 
                  objectPosition: '45% 50%',
                  transform: 'scale(0.6)'
                }}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

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

  return (
    <main className={`h-screen w-screen overflow-hidden fixed inset-0 bg-white ${isMobile ? 'mobile-view' : 'desktop-view'}`}>
      <div className="h-full w-full flex items-center justify-center">
        {/* Main container with fixed aspect ratio */}
        <div className={`relative ${isMobile ? 'w-[90vw]' : 'w-[65vw]'} max-w-[800px]`} style={{ aspectRatio: '3/4' }}>
          {/* Silhouette container */}
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
            
            {/* Desktop Layout - Will be hidden via CSS on small screens */}
            <div className="desktop-layout">
              {/* KDRAMA Logo */}
              <div className="absolute left-[11.6%] top-[42.6%] kdrama-logo" style={{ transform: 'scale(0.85)' }}>
                <Image
                  src="/assets/kdrama-logo.svg"
                  alt="KDRAMA Logo"
                  width={100}
                  height={35}
                  className="object-contain brightness-0"
                />
              </div>

              {/* Flags */}
              <div className="absolute left-[43%] top-[43.4%] transform -translate-x-1/2">
                <div className="flex items-center space-x-[4px]">
                  <Image src="/assets/us-flag.png" alt="US Flag" width={24} height={16} className="object-contain" />
                  <Image src="/assets/france-flag.png" alt="France Flag" width={24} height={16} className="object-contain" />
                  <Image src="/assets/russia-flag.png" alt="Russia Flag" width={24} height={16} className="object-contain" />
                  <Image src="/assets/korea-flag.png" alt="Korea Flag" width={24} height={16} className="object-contain" />
                  <Image src="/assets/china-flag.png" alt="China Flag" width={24} height={16} className="object-contain" />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="absolute left-[62.5%] top-[43.8%] transform -translate-y-1/2">
                <a href="/artworks" className="nav-item" style={navLinkStyle}>
                  artworks
                </a>
              </div>
              <div className="absolute left-[62.8%] top-[44.5%]">
                <a href="/photography" className="nav-item" style={navLinkStyle}>
                  photography
                </a>
              </div>
              <div className="absolute left-[71%] top-[46.7%]">
                <a href="/music" className="nav-item" style={navLinkStyle}>
                  music
                </a>
              </div>
              
              {/* Music Player - between music and contact links */}
              <div className="absolute flex items-center music-player-desktop" style={{ 
                left: '97%',
                top: '51.3%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1
              }}>
                {/* Album Cover */}
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  backgroundColor: '#ADD8E6'
                }}></div>
                
                {/* Song Info */}
                <div style={{ 
                  marginLeft: '30px',
                  marginRight: '30px',
                  width: '120px',
                  height: '18px',
                  color: 'black',
                  fontSize: '7px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  letterSpacing: '0.01em'
                }}>
                  <div style={{
                    width: '100%',
                    height: '50%',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    letterSpacing: '0.01em'
                  }}>Nothing But Net</div>
                  <div style={{
                    width: '100%',
                    height: '50%',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'gray',
                    fontWeight: 400,
                    letterSpacing: '0.01em'
                  }}>Travis Scott — Nothing But Net</div>
                </div>
                
                {/* Player Controls */}
                <div style={{
                  width: '170px',
                  height: '28px',
                  display: 'flex',
                  flexDirection: 'row'
                }}>
                  {/* Play/Pause Button */}
                  <div 
                    onClick={togglePlay} 
                    style={{
                      cursor: 'pointer',
                      height: '28px',
                      width: '28px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image 
                      src={isPlaying ? "/assets/PAUSE.png" : "/assets/PLAY.png"}
                      alt={isPlaying ? "Pause" : "Play"}
                      width={15}
                      height={15}
                      style={{ height: '15px', width: 'auto' }}
                    />
                  </div>
                  
                  {/* Next Button */}
                  <div style={{
                    cursor: 'pointer',
                    height: '28px',
                    width: '28px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Image 
                      src="/assets/SKIP.png" 
                      alt="Skip" 
                      width={12} 
                      height={12}
                      style={{ height: '12px', width: 'auto' }}
                    />
                  </div>
                  
                  {/* Volume Down Button */}
                  <div 
                    onClick={volumeDown}
                    style={{
                      cursor: 'pointer',
                      height: '28px',
                      width: '28px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image 
                      src="/assets/V DOWN.png" 
                      alt="Volume Down" 
                      width={17} 
                      height={17}
                      style={{ height: '17px', width: 'auto' }}
                    />
                  </div>
                  
                  {/* Volume Slider */}
                  <div style={{
                    height: '28px',
                    width: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start'
                  }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        width: '100%',
                        height: '3px',
                        background: `linear-gradient(to right, #000 ${isMuted ? 0 : volume}%, #ddd ${isMuted ? 0 : volume}%)`,
                        borderRadius: '5px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  {/* Volume Up Button */}
                  <div 
                    onClick={volumeUp}
                    style={{
                      cursor: 'pointer',
                      height: '28px',
                      width: '28px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image 
                      src="/assets/V UP.png" 
                      alt="Volume Up" 
                      width={17} 
                      height={17}
                      style={{ height: '17px', width: 'auto' }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="absolute left-[72.5%] top-[52.7%] contact-link-desktop">
                <a href="/contact" className="nav-item" style={navLinkStyle}>
                  contact
                </a>
              </div>
            </div>

            {/* Mobile Layout - Will be shown via CSS on small screens */}
            <style>{`
              @media (max-width: 767px) {
                .mobile-volume-slider input[type=range]::-webkit-slider-thumb {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: #fff;
                  border: 1px solid #888;
                  box-shadow: 0 0 2px #0002;
                  -webkit-appearance: none;
                  appearance: none;
                }
                .mobile-volume-slider input[type=range]::-moz-range-thumb {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: #fff;
                  border: 1px solid #888;
                  box-shadow: 0 0 2px #0002;
                }
                .mobile-volume-slider input[type=range]::-ms-thumb {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: #fff;
                  border: 1px solid #888;
                  box-shadow: 0 0 2px #0002;
                }
              }
            `}</style>
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
                <a href="/artworks" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                  artworks
                </a>
                <a href="/photography" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                  photography
                </a>
                <a href="/music" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                  music
                </a>

                {/* Mobile Music Player - left-aligned, in nav flow */}
                <div className="flex flex-row items-center mt-1 mb-1 w-full" style={{ maxWidth: '100%', gap: '8px' }}>
                  {/* Album Cover */}
                  <div style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: '#ADD8E6',
                    flexShrink: 0
                  }}></div>
                  {/* Song Info */}
                  <div style={{
                    marginLeft: '8px',
                    marginRight: '8px',
                    flexGrow: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxWidth: '90px'
                  }}>
                    <div style={{
                      fontSize: '8px',
                      fontWeight: 600,
                      color: 'white',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      letterSpacing: '0.01em',
                      textAlign: 'left'
                    }}>FOMDJ</div>
                    <div style={{
                      fontSize: '7px',
                      color: '#cccccc',
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      letterSpacing: '0.01em',
                      textAlign: 'left'
                    }}>Playboi Carti — MUSIC - SO...</div>
                  </div>
                  {/* Controls and Volume */}
                  <div className="flex flex-row items-center" style={{ gap: '4px' }}>
                    {/* Play/Pause Button */}
                    <div
                      onClick={togglePlay}
                      style={{
                        cursor: 'pointer',
                        height: '18px',
                        width: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white'
                      }}
                    >
                      <Image
                        src={isPlaying ? "/assets/PAUSE.png" : "/assets/PLAY.png"}
                        alt={isPlaying ? "Pause" : "Play"}
                        width={10}
                        height={10}
                        style={{ height: '10px', width: 'auto' }}
                      />
                    </div>
                    {/* Next Button */}
                    <div style={{
                      cursor: 'pointer',
                      height: '18px',
                      width: '18px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white'
                    }}>
                      <Image
                        src="/assets/SKIP.png"
                        alt="Skip"
                        width={8}
                        height={8}
                        style={{ height: '8px', width: 'auto' }}
                      />
                    </div>
                    {/* Volume Down Button */}
                    <div
                      onClick={volumeDown}
                      style={{
                        cursor: 'pointer',
                        height: '18px',
                        width: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white'
                      }}
                    >
                      <Image
                        src="/assets/V DOWN.png"
                        alt="Volume Down"
                        width={10}
                        height={10}
                        style={{ height: '10px', width: 'auto' }}
                      />
                    </div>
                    {/* Volume Slider */}
                    <div className="mobile-volume-slider" style={{
                      height: '18px',
                      width: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start'
                    }}>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        style={{
                          WebkitAppearance: 'none',
                          appearance: 'none',
                          width: '100%',
                          height: '2px',
                          background: `linear-gradient(to right, #fff ${isMuted ? 0 : volume}%, #444 ${isMuted ? 0 : volume}%)`,
                          borderRadius: '5px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    {/* Volume Up Button */}
                    <div
                      onClick={volumeUp}
                      style={{
                        cursor: 'pointer',
                        height: '18px',
                        width: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white'
                      }}
                    >
                      <Image
                        src="/assets/V UP.png"
                        alt="Volume Up"
                        width={10}
                        height={10}
                        style={{ height: '10px', width: 'auto' }}
                      />
                    </div>
                  </div>
                </div>

                <a href="/contact" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                  contact
                </a>
              </div>
            </div>

            {/* Manual adjustment for very small screens (iPhone 4/5) */}
            <style>{`
              @media (max-width: 330px) {
                /* Shrink the whole block */
                .mobile-layout {
                  transform: translateY(0%) scale(0.75) translateX(-8%) !important;
                }
                .mobile-layout .nav-item {
                  font-size: 13px !important;
                }
                .mobile-volume-slider {
                  width: 24px !important;
                }
                .mobile-volume-slider input[type=range]::-webkit-slider-thumb {
                  width: 8px;
                  height: 8px;
                }
                .mobile-volume-slider input[type=range]::-moz-range-thumb {
                  width: 8px;
                  height: 8px;
                }
                .mobile-volume-slider input[type=range]::-ms-thumb {
                  width: 8px;
                  height: 8px;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </main>
  );
} 