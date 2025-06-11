'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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

interface Track {
  title: string;
  artist: string;
  album: string;
  src: string;
  cover: string;
}

const tracks: Track[] = [
  // ... (copy the full tracks array from homepage here) ...
];

export default function ArtworksPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'full' | 'grid'>('full');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [shuffledTracks, setShuffledTracks] = useState<Track[]>([]);
  const audioRef = useRef(null);

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

  useEffect(() => {
    setShuffledTracks(shuffleArray(tracks));
  }, []);

  const shuffleArray = (array: Track[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % shuffledTracks.length);
  };

  useEffect(() => {
    if (!audioRef.current || !shuffledTracks.length) return;
    audioRef.current.src = shuffledTracks[currentTrackIndex].src;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, shuffledTracks, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0) {
        audioRef.current.muted = false;
      }
    }
  };

  const volumeDown = () => {
    const newVolume = Math.max(0, volume - 0.1);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      audioRef.current.muted = true;
    } else if (audioRef.current.muted) {
      audioRef.current.muted = false;
    }
  };

  const volumeUp = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 1;
    audioRef.current.muted = false;
    setVolume(1);
  };

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

  if (!hasMounted) {
    return null;
  }

  return (
    <main className="min-h-screen">
      {/* Sticky Navbar overlays the images */}
      <div className="desktop-layout fixed top-0 left-0 z-50" style={{ width: '100vw' }}>
        <div className="flex items-center" style={{ paddingTop: '10px', paddingLeft: '300px' }}>
          {/* KDRAMA Logo */}
          <div className="kdrama-logo" style={{ marginRight: '24px' }}>
            <Link href="/">
              <Image
                src="/assets/kdrama-logo.svg"
                alt="KDRAMA Logo"
                width={100}
                height={34}
                style={{ filter: 'brightness(0) invert(1)' }}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Flags */}
          <div className="flex items-center space-x-[4px] relative top-[2px]">
            <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('en')}>
              <Image src="/assets/us-flag.png" alt="US Flag" width={24} height={16} className="object-contain" />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('fr')}>
              <Image src="/assets/france-flag.png" alt="France Flag" width={24} height={16} className="object-contain" />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('ru')}>
              <Image src="/assets/russia-flag.png" alt="Russia Flag" width={24} height={16} className="object-contain" />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('ko')}>
              <Image src="/assets/korea-flag.png" alt="Korea Flag" width={24} height={16} className="object-contain" />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('zh')}>
              <Image src="/assets/china-flag.png" alt="China Flag" width={24} height={16} className="object-contain" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 ml-6" style={{ marginLeft: '24px' }}>
            <Link href="/artworks" className="nav-item" style={navLinkStyle}>
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

      {/* Artworks Images below the navbar */}
      <div className={viewMode === 'grid' ? 'w-screen grid grid-cols-2 gap-2 p-2' : 'w-screen'}>
        {['m1','m2','m3','m4','m5','m6','m7','m8'].map((img, idx) => (
          <div
            key={img}
            style={
              viewMode === 'full'
                ? { width: '100vw', position: 'relative' }
                : { width: '100%', position: 'relative' }
            }
          >
            <Image
              src={`/assets/artworks/${img}.webp`}
              alt={`artwork ${idx + 1}`}
              width={1920}
              height={1080}
              style={
                viewMode === 'full'
                  ? { width: '100vw', height: 'auto', display: 'block' }
                  : { width: '100%', height: 'auto', display: 'block' }
              }
              sizes={viewMode === 'full' ? '100vw' : '50vw'}
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* View Switcher Sticky at Bottom */}
      <div className="bottom-bar flex flex-row items-center justify-center gap-8 w-full px-6 py-3" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100vw', zIndex: 100 }}>
        {/* View Switcher (existing) */}
        <div className="view-switcher flex flex-row items-center gap-3">
          {/* Full View Button */}
          <button
            onClick={() => setViewMode('full')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              outline: 'none',
            }}
            aria-label="Full View"
          >
            {/* Square icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="20" height="20" fill="white" fillOpacity="0.8" />
            </svg>
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
              cursor: 'pointer',
              outline: 'none',
            }}
            aria-label="Grid View"
          >
            {/* 4 squares icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="8" height="8" fill="white" fillOpacity="0.8" />
              <rect x="16" y="4" width="8" height="8" fill="white" fillOpacity="0.8" />
              <rect x="4" y="16" width="8" height="8" fill="white" fillOpacity="0.8" />
              <rect x="16" y="16" width="8" height="8" fill="white" fillOpacity="0.8" />
            </svg>
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
                color: 'white',
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
              <Image
                src={isPlaying ? "/assets/PAUSE.png" : "/assets/PLAY.png"}
                alt={isPlaying ? "Pause" : "Play"}
                width={15}
                height={15}
                style={{ height: '15px', width: 'auto' }}
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
                  background: `linear-gradient(to right, #fff ${volume * 100}%, #444 ${volume * 100}%)`,
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
        {/* Audio element (hidden) */}
        <audio
          ref={audioRef}
          src={shuffledTracks[currentTrackIndex]?.src}
          onEnded={handleTrackEnd}
          preload="auto"
          autoPlay={isPlaying}
          style={{ display: 'none' }}
        />
      </div>

      {/* The rest of the page (mobile layout, etc.) */}
      <div className="relative w-full h-full">
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
              width={68}
              height={24}
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
              {translations.artworks}
            </Link>
            <Link href="/photography" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
              {translations.photography}
            </Link>
            <Link href="/music" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
              {translations.music}
            </Link>
            <Link href="/contact" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
              {translations.contact}
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