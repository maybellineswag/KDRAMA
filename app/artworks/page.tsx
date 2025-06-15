'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

// MarqueeText component for scrolling overflow text
function MarqueeText({ text, style, className = '', speed = 20, pause = 4000 }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState('left');
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);
  const pauseTimeout = useRef(null);
  const [minX, setMinX] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.scrollWidth;
        setIsOverflowing(textWidth > containerWidth);
        setMinX(containerWidth - textWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  useEffect(() => {
    setPosition(0);
    setDirection('left');
    setIsPaused(false);
    if (textRef.current) {
      textRef.current.style.transform = 'translateX(0)';
    }
  }, [text, isOverflowing]);

  useEffect(() => {
    if (!isOverflowing) return;
    let lastTimestamp = null;
    let currentDirection = direction;
    let paused = isPaused;
    function step(timestamp) {
      if (paused) return;
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      let pxPerMs = speed / 1000;
      setPosition(prev => {
        let next = prev + (currentDirection === 'left' ? -1 : 1) * pxPerMs * delta;
        if (currentDirection === 'left' && next <= minX) {
          next = minX;
          setIsPaused(true);
          pauseTimeout.current = setTimeout(() => {
            setDirection('right');
            setIsPaused(false);
          }, pause);
          return next;
        }
        if (currentDirection === 'right' && next >= 0) {
          next = 0;
          setIsPaused(true);
          pauseTimeout.current = setTimeout(() => {
            setDirection('left');
            setIsPaused(false);
          }, pause);
          return next;
        }
        return next;
      });
      animationRef.current = requestAnimationFrame(step);
    }
    if (!paused) {
      animationRef.current = requestAnimationFrame(step);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, [isOverflowing, direction, isPaused, speed, pause, minX]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.transform = `translateX(${position}px)`;
    }
  }, [position]);

  const containerStyles = {
    ...style,
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: isOverflowing ? 'left' : (style?.textAlign || 'center'),
    display: isOverflowing ? 'block' : 'flex',
    alignItems: isOverflowing ? undefined : 'center',
    justifyContent: isOverflowing ? undefined : 'center',
  };

  return (
    <div ref={containerRef} className={className} style={containerStyles}>
      <div ref={textRef} style={{ display: 'inline-block', willChange: 'transform', transition: isOverflowing ? 'none' : 'transform 0.2s' }}>
        {text}
      </div>
    </div>
  );
}

export default function ArtworksPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'full' | 'grid'>('full');
  const {
    isPlaying,
    togglePlay,
    nextTrack,
    volume,
    handleVolumeChange,
    volumeDown,
    volumeUp,
    shuffledTracks,
    currentTrackIndex,
  } = useMusicPlayer();

  const { language, setLanguage, translations } = useLanguage();

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
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: isMobile ? '500' : 'normal'
  };

  // List of all artwork images in /assets/artworks, ordered by series
  const artworkImages = [
    // m series
    'm1.webp', 'm2.webp', 'm3.webp', 'm4.webp', 'm5.webp', 'm6.webp', 'm7.webp', 'm8.webp',
    // a series
    'a1.webp', 'a2.webp', 'a3.webp', 'a4.webp', 'a5.webp', 'a6.webp',
    // b series
    'b1.webp', 'b2.webp', 'b3.webp', 'b4.webp', 'b5.webp', 'b6.webp',
    // first and second
    'first.webp', 'second.webp',
    // w series
    'w1.webp', 'w2.webp',
    // x series
    'x1.png', 'x2.png', 'x3.png',
  ];

  // Define series boundaries for spacers
  const seriesBoundaries = [0, 8, 14, 20, 22, 24]; // m, a, b, first/second, w, x

  if (!hasMounted) {
    return null;
  }

  return (
    <main className="min-h-screen">
      {/* Sticky Navbar overlays the images */}
      {/* Desktop Navbar - visible only on desktop */}
      {!isMobile && (
        <div className="desktop-layout fixed top-0 left-0 z-50" style={{ width: '100vw' }}>
          <div className="navbar-inner flex items-center">
              {/* KDRAMA Logo */}
            <div className="kdrama-logo" style={{ marginRight: '24px' }}>
              <Link href="/">
                <Image
                  src="/assets/kdrama-logo.svg"
                  alt="KDRAMA Logo"
                  width={124}
                  height={34}
                  className="object-contain"
                  style={{ filter: 'brightness(0) invert(1)', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
                  priority
                  quality={100}
                />
              </Link>
              </div>

              {/* Flags */}
            <div className="flex items-center space-x-[4px] relative top-[2px]">
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('en')}>
                <Image src="/assets/flags/us-flag.svg" alt="US Flag" width={24} height={16} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('fr')}>
                <Image src="/assets/flags/france-flag.svg" alt="France Flag" width={24} height={16} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('ru')}>
                <Image src="/assets/flags/russia-flag.svg" alt="Russia Flag" width={24} height={16} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('ko')}>
                <Image src="/assets/flags/korea-flag.svg" alt="Korea Flag" width={24} height={16} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('zh')}>
                <Image src="/assets/flags/china-flag.svg" alt="China Flag" width={24} height={16} className="object-contain" />
              </div>
              </div>

              {/* Navigation Links */}
            <div className="flex items-center space-x-4 ml-6" style={{ marginLeft: '24px' }}>
              <Link href="/artworks" className="nav-item" style={{ ...navLinkStyle, fontWeight: '500' }}>
                {translations.artworks}
              </Link>
              <Link href="/photography" className="nav-item" style={navLinkStyle}>
                {translations.photography}
              </Link>
              <Link href="/music" className="nav-item" style={navLinkStyle}>
                {translations.music}
              </Link>
              <Link href="/contact" className="nav-item" style={navLinkStyle}>
                {translations.contact}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Layout - visible only on mobile */}
      {isMobile && (
        <div
          className="mobile-layout flex flex-col items-start justify-center space-y-2"
          style={{
            paddingTop: '12px',
            paddingLeft: '12px',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 50,
            width: '100vw',
            height: 'auto',
            backgroundColor: 'transparent',
            transform: 'scale(1.18)',
            transformOrigin: 'top left',
          }}
        >
          {/* KDRAMA Logo */}
          <div className="">
            <Link href="/">
              <Image
                src="/assets/kdrama-logo.svg"
                alt="KDRAMA Logo"
                width={84}
                height={24}
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}
                priority
                quality={100}
              />
            </Link>
          </div>

          {/* Flags */}
          <div className="">
            <div className="flex items-center space-x-[2px] mobile-flags">
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('en')}>
                <Image src="/assets/flags/us-flag.svg" alt="US Flag" width={20} height={13} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('fr')}>
                <Image src="/assets/flags/france-flag.svg" alt="France Flag" width={20} height={13} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('ru')}>
                <Image src="/assets/flags/russia-flag.svg" alt="Russia Flag" width={20} height={13} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('ko')}>
                <Image src="/assets/flags/korea-flag.svg" alt="Korea Flag" width={20} height={13} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('zh')}>
                <Image src="/assets/flags/china-flag.svg" alt="China Flag" width={20} height={13} className="object-contain" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start mobile-nav w-full">
            <Link href="/artworks" className="nav-item" style={{ ...navLinkStyle, color: 'white', textAlign: 'left', fontWeight: '500', marginBottom: 0, padding: '0.1rem 0' }}>
              {translations.artworks}
            </Link>
            <Link href="/photography" className="nav-item" style={{ ...navLinkStyle, color: 'white', textAlign: 'left', marginBottom: 0, padding: '0.1rem 0' }}>
              {translations.photography}
            </Link>
            <Link href="/music" className="nav-item" style={{ ...navLinkStyle, color: 'white', textAlign: 'left', marginBottom: 0, padding: '0.1rem 0' }}>
              {translations.music}
            </Link>
            <Link href="/contact" className="nav-item" style={{ ...navLinkStyle, color: 'white', textAlign: 'left', marginBottom: 0, padding: '0.1rem 0' }}>
              {translations.contact}
            </Link>
          </div>
        </div>
      )}

      {/* Conditional rendering for Grid View */}
      {viewMode === 'grid' && (
        <div className="w-screen px-4 sm:px-12 pt-4 sm:pt-12 py-2"> {/* Main container for all grid content, responsive padding */}
          {/* m, a, b series (2 columns) */}
          <div className="grid grid-cols-2 gap-2">
            {artworkImages.slice(0, 20).map((img, idx) => {
              const absoluteIdx = idx;
              const isRowSeriesStart = seriesBoundaries.includes(absoluteIdx) && absoluteIdx !== 0
                || seriesBoundaries.includes(absoluteIdx - 1) && absoluteIdx - 1 !== 0 && absoluteIdx % 2 === 1;

              return (
                <div
                  key={img}
                  style={{
                    width: '100%',
                    position: 'relative',
                    marginTop: isRowSeriesStart ? '3rem' : undefined,
                  }}
                >
                  <Image
                    src={`/assets/artworks/${img}`}
                    alt={`artwork ${absoluteIdx + 1}`}
                    width={1920}
                    height={1080}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    sizes={'50vw'}
                    priority={idx === 0}
                  />
                </div>
              );
            })}
          </div>

          {/* first.webp and second.webp (full width) */}
          <div style={{ marginTop: '3rem' }}> {/* Increased gap before this section to 3rem for b series separation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}> {/* Flex container for these two images with no gap */}
              {artworkImages.slice(20, 22).map((img, idx) => (
                <div
                  key={img}
                  style={{
                    width: '100%',
                    position: 'relative',
                    // Removed individual marginBottom as flex gap handles it
                  }}
                >
                  <Image
                    src={`/assets/artworks/${img}`}
                    alt={`artwork ${20 + idx + 1}`}
                    width={1920}
                    height={1080}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0', // Ensure no default margins
                    }}
                    sizes={'100vw'}
                    priority={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* w series (2 columns) */}
          <div className="grid grid-cols-2 gap-2" style={{ marginTop: '0.25rem' }}> {/* Reduced gap after first/second.webp to 0.25rem */}
            {artworkImages.slice(22, 24).map((img, idx) => {
              const absoluteIdx = 22 + idx;
              const isRowSeriesStart = seriesBoundaries.includes(absoluteIdx) && absoluteIdx !== 0
                || seriesBoundaries.includes(absoluteIdx - 1) && absoluteIdx - 1 !== 0 && absoluteIdx % 2 === 1;

              return (
                <div
                  key={img}
                  style={{
                    width: '100%',
                    position: 'relative',
                    marginTop: isRowSeriesStart ? '3rem' : undefined,
                  }}
                >
                  <Image
                    src={`/assets/artworks/${img}`}
                    alt={`artwork ${absoluteIdx + 1}`}
                    width={1920}
                    height={1080}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    sizes={'50vw'}
                    priority={idx === 0}
                  />
                </div>
              );
            })}
          </div>

          {/* x series (3 columns) */}
          <div className="grid grid-cols-3 gap-2" style={{ marginTop: '0.5rem' }}> {/* Consistent series gap, reduced to 0.5rem */}
            {artworkImages.slice(24).map((img, idx) => (
              <div
                key={img}
                style={{ width: '100%', position: 'relative' }}
              >
                <Image
                  src={`/assets/artworks/${img}`}
                  alt={`artwork ${24 + idx + 1}`}
                  width={1920}
                  height={1080}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes={'33vw'}
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conditional rendering for Full View (remains a single column) */}
      {viewMode === 'full' && (
        <div className="w-screen">
          {artworkImages.map((img, idx) => (
            <div key={img} style={{ width: '100vw', position: 'relative' }}>
              <Image
                src={`/assets/artworks/${img}`}
                alt={`artwork ${idx + 1}`}
                width={1920}
                height={1080}
                style={{ width: '100vw', height: 'auto', display: 'block' }}
                sizes={'100vw'}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      )}

      {/* View Switcher Sticky at Bottom */}
      {/* Desktop Bottom Bar - visible only on desktop */}
      {!isMobile && (
        <div className="bottom-bar fixed left-0 right-0 w-full py-4" style={{ bottom: 0, zIndex: 100, paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="flex flex-row items-center gap-4">
            {/* View Switcher (existing) */}
            <div className="view-switcher flex flex-row items-center gap-4">
              {/* Full View Button */}
              <button
                onClick={() => setViewMode('full')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  outline: 'none',
                  width: '28px',
                  height: '28px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  opacity: 0.6,
                }}
                aria-label="Full View"
              >
                <Image src="/assets/FULLSCREEN.svg" alt="Full View" width={28} height={28} style={{ width: '28px', height: '28px', borderRadius: '2px', opacity: 1 }} />
              </button>
              {/* Grid View Button */}
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  outline: 'none',
                  width: '28px',
                  height: '28px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  opacity: 0.6,
                }}
                aria-label="Grid View"
              >
                <Image src="/assets/GRID.svg" alt="Grid View" width={28} height={28} style={{ width: '28px', height: '28px', borderRadius: '2px', opacity: 1 }} />
              </button>
            </div>
            {/* Music Player (right-aligned, no background) */}
            <div className="flex flex-row items-center gap-4" style={{ background: 'none', boxShadow: 'none' }}>
              {/* Album Cover */}
              <div style={{
                width: '28px',
                height: '28px',
                backgroundColor: '#ADD8E6',
                backgroundImage: shuffledTracks[currentTrackIndex]?.cover ? `url(${shuffledTracks[currentTrackIndex].cover})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '2px',
                flexShrink: 0
              }}></div>
              {/* Song Info */}
              <div style={{
                marginLeft: '18px',
                marginRight: '18px',
                width: '120px',
                height: '18px',
                color: 'white',
                fontSize: '7px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                letterSpacing: '0.01em'
              }}>
                <MarqueeText
                  text={shuffledTracks[currentTrackIndex]?.title || 'Loading...'}
                  style={{
                    width: '100%',
                    height: '50%',
                    textAlign: 'center',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    fontSize: '7px',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                  speed={20}
                  pause={4000}
                />
                <MarqueeText
                  text={shuffledTracks[currentTrackIndex] ? `${shuffledTracks[currentTrackIndex].artist} — ${shuffledTracks[currentTrackIndex].album}` : 'Loading...'}
                  style={{
                    width: '100%',
                    height: '50%',
                    textAlign: 'center',
                    color: '#cccccc',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    fontSize: '7px',
                  }}
                  speed={20}
                  pause={4000}
                />
              </div>
              {/* Player Controls */}
              <div style={{
                width: '170px',
                height: '28px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                boxShadow: 'none'
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
                  <img
                    src={isPlaying ? "/assets/icons/PAUSE.svg" : "/assets/icons/PLAY.svg"}
                    alt={isPlaying ? "Pause" : "Play"}
                    style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain', transform: 'scale(0.7)' }}
                  />
                </div>
                {/* Next Button */}
                <div
                  onClick={nextTrack}
                  style={{
                    cursor: 'pointer',
                    height: '28px',
                    width: '28px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src="/assets/icons/SKIP.svg"
                    alt="Skip"
                    style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain', transform: 'scale(0.6)' }}
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
                  <img
                    src="/assets/icons/V DOWN.svg"
                    alt="Volume Down"
                    style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain', transform: 'scale(0.7)' }}
                  />
                </div>
                {/* Volume Slider */}
                <div style={{
                  height: '28px',
                  width: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  background: 'none',
                  boxShadow: 'none'
                }}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      width: '100%',
                      height: '3px',
                      background: `linear-gradient(to right, rgba(255, 255, 255, 0.8) ${volume * 100}%, #444 ${volume * 100}%)`,
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
                  <img
                    src="/assets/icons/V UP.svg"
                    alt="Volume Up"
                    style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain', transform: 'scale(0.7)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar - visible only on mobile */}
      {isMobile && (
        <div className="bottom-bar flex flex-col items-start gap-2 w-full px-3 py-3" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100vw', zIndex: 100 }}>
          {/* View Switcher hidden on mobile */}
          {/* Music Player */}
          <div className="flex flex-row items-center gap-2" style={{ background: 'none', boxShadow: 'none' }}> {/* Reduced gap */}
            {/* Album Cover */}
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#ADD8E6',
              backgroundImage: shuffledTracks[currentTrackIndex]?.cover ? `url(${shuffledTracks[currentTrackIndex].cover})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '2px',
              flexShrink: 0
            }}></div>
            {/* Song Info */}
            <div style={{
              marginLeft: '10px',
              marginRight: '10px',
              width: '100px', // Reduced width
              height: '18px',
              color: 'white',
              fontSize: '7px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden',
              letterSpacing: '0.01em'
            }}>
              <MarqueeText
                text={shuffledTracks[currentTrackIndex]?.title || 'Loading...'}
                style={{
                  width: '100%',
                  height: '50%',
                  textAlign: 'center',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  fontSize: '7px',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
                speed={20}
                pause={4000}
              />
              <MarqueeText
                text={shuffledTracks[currentTrackIndex] ? `${shuffledTracks[currentTrackIndex].artist} — ${shuffledTracks[currentTrackIndex].album}` : 'Loading...'}
                style={{
                  width: '100%',
                  height: '50%',
                  textAlign: 'center',
                  color: '#cccccc',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  fontSize: '7px',
                }}
                speed={20}
                pause={4000}
              />
            </div>
            {/* Player Controls */}
            <div style={{
              width: '150px', // Reduced width
              height: '28px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.25rem', // Reduced gap
              background: 'none',
              boxShadow: 'none'
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
                <img
                  src={isPlaying ? "/assets/icons/PAUSE.svg" : "/assets/icons/PLAY.svg"}
                  alt={isPlaying ? "Pause" : "Play"}
                  style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain', transform: 'scale(0.7)' }}
                />
              </div>
              {/* Next Button */}
              <div
                onClick={nextTrack}
                style={{
                  cursor: 'pointer',
                  height: '28px',
                  width: '28px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src="/assets/icons/SKIP.svg"
                  alt="Skip"
                  style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain', transform: 'scale(0.6)' }}
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
                <img
                  src="/assets/icons/V DOWN.svg"
                  alt="Volume Down"
                  style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain', transform: 'scale(0.7)' }}
                />
              </div>
              {/* Volume Slider */}
              <div style={{
                height: '28px',
                width: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                background: 'none',
                boxShadow: 'none'
              }}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    width: '100%',
                    height: '3px',
                    background: `linear-gradient(to right, rgba(255, 255, 255, 0.8) ${volume * 100}%, #444 ${volume * 100}%)`,
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
                <img
                  src="/assets/icons/V UP.svg"
                  alt="Volume Up"
                  style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain', transform: 'scale(0.7)' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual adjustment for very small screens */}
      <style jsx>{`
        @media (max-width: 330px) {
          .mobile-layout {
            transform: translateY(0%) scale(0.75) translateX(-8%) !important;
          }
          .mobile-layout .nav-item {
            font-size: 13px !important;
          }
        }
        .navbar-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding-top: 10px;
          padding-left: 32px;
          padding-right: 32px;
          width: 100%;
          box-sizing: border-box;
          transition: max-width 0.2s;
        }
        @media (min-width: 1800px) {
          .navbar-inner {
            max-width: none;
            width: 100%;
            padding-left: 32px;
            padding-right: 32px;
            margin-left: 0;
            margin-right: 0;
            margin: 0;
          }
        }
        @media (min-width: 2200px) {
          .navbar-inner {
            max-width: none;
            width: 100%;
            padding-left: 32px;
            padding-right: 32px;
            margin-left: 0;
            margin-right: 0;
            margin: 0;
          }
        }
      `}</style>
    </main>
  );
} 