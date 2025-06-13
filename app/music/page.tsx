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

export default function MusicPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
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
    color: 'black',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: isMobile ? '500' : 'normal'
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
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
                  width={100}
                  height={34}
                  style={{ filter: 'brightness(0)' }}
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
              <Link href="/music" className="nav-item" style={{ ...navLinkStyle, fontWeight: '500' }}>
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
                width={68}
                height={24}
                style={{ filter: 'brightness(0)' }}
                className="object-contain mobile-logo"
              />
            </Link>
          </div>

          {/* Flags */}
          <div className="">
            <div className="flex items-center space-x-[2px] mobile-flags">
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('en')}>
                <Image src="/assets/us-flag.png" alt="US Flag" width={20} height={13} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('fr')}>
                <Image src="/assets/france-flag.png" alt="France Flag" width={20} height={13} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('ru')}>
                <Image src="/assets/russia-flag.png" alt="Russia Flag" width={20} height={13} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('ko')}>
                <Image src="/assets/korea-flag.png" alt="Korea Flag" width={20} height={13} className="object-contain" />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setLanguage('zh')}>
                <Image src="/assets/china-flag.png" alt="China Flag" width={20} height={13} className="object-contain" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start mobile-nav w-full" style={{ color: 'black' }}>
            <Link href="/artworks" className="nav-item" style={{ ...navLinkStyle, color: 'black !important', textAlign: 'left', marginBottom: 0, padding: '0.1rem 0', WebkitTextFillColor: 'black' }}>
              {translations.artworks}
            </Link>
            <Link href="/photography" className="nav-item" style={{ ...navLinkStyle, color: 'black !important', textAlign: 'left', marginBottom: 0, padding: '0.1rem 0', WebkitTextFillColor: 'black' }}>
              {translations.photography}
            </Link>
            <Link href="/music" className="nav-item" style={{ ...navLinkStyle, color: 'black !important', textAlign: 'left', fontWeight: '500', marginBottom: 0, padding: '0.1rem 0', WebkitTextFillColor: 'black' }}>
              {translations.music}
            </Link>
            <Link href="/contact" className="nav-item" style={{ ...navLinkStyle, color: 'black !important', textAlign: 'left', marginBottom: 0, padding: '0.1rem 0', WebkitTextFillColor: 'black' }}>
              {translations.contact}
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full" style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '96px' }}>
        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1583589391&color=%2398846b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/thunderstorm-149-bpm-dflatmaj-2" 
            title="price of the brick" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            price of the brick
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1583588423&color=%2325221a&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/wdym" 
            title="seoul city _kwesremake*" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            seoul city _kwesremake*
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1583585575&color=%235d7971&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/geneva-lake" 
            title="geneva lake" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            geneva lake
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1359320809&color=%237a6358&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/ripnewjersey" 
            title="RIPNEWJERSEY" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            RIPNEWJERSEY
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1309282138&color=%234b4436&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/love-of-money" 
            title="love of money" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            love of money
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1306844437&color=%23241f1c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/top-bins" 
            title="top bins" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            top bins
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1222585504&color=%23f6f1ef&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/champs-elysees" 
            title="champs elysees" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            champs elysees
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1204797406&color=%2327292e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/ufo-ufo-ufo-2" 
            title="ufo ufo ufo" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            ufo ufo ufo
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1202826322&color=%234e453a&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/place-remix" 
            title="place rerock" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            place rerock
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1186472608&color=%2384857e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/jesse-pinkman-type-beat-1" 
            title="berlin - - &gt; paris" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            berlin - - &gt; paris
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1180766263&color=%23eef0f5&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/a-1" 
            title="2019" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            2019
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1179746452&color=%23e5e2df&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/cancer" 
            title="cancer" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            cancer
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1174344733&color=%23927168&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/fukp6ix4bk6p" 
            title="&quot;" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            &quot;
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1173182014&color=%233579f3&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/smq7x7i8excj" 
            title=":/" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            :/
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1166889670&color=%23b6b2ac&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/evil3" 
            title="psycho/cute" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            psycho/cute
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1166225641&color=%23f6eebf&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/2018a" 
            title="2018" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            2018
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1164130789&color=%23676052&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/lundun" 
            title="lundun" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            lundun
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1155500830&color=%23382f7b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/kumbayawav" 
            title="(bkrula rerock)" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            (bkrula rerock)
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1106019817&color=%234a3938&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/bb-belt-vvs1" 
            title="bb belt vvs1" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            bb belt vvs1
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1073122081&color=%23473833&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/choppa-wit-a-stick-and-a-dick-and-a-scope" 
            title="murder she wrote rerock" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            murder she wrote rerock
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1060814338&color=%23b48488&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100',
          marginBottom: '24px'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/hellcat_with_neon" 
            title="HELLCAT_with_NEON" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            HELLCAT_with_NEON
          </a>
        </div>

        <iframe 
          width="100%" 
          height="166" 
          scrolling="no" 
          frameBorder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1053772636&color=%23cc8b7d&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&background_color=ffffff"
        />
        <div style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: '100'
        }}>
          <a 
            href="https://soundcloud.com/user-773164852" 
            title="mangospeacheslimes" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            mangospeacheslimes
          </a> · 
          <a 
            href="https://soundcloud.com/user-773164852/stupid-bitch" 
            title="half off rerockkk" 
            target="_blank" 
            style={{ color: '#cccccc', textDecoration: 'none' }}
          >
            half off rerockkk
          </a>
        </div>
      </div>

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
        /* Override for music page mobile navigation */
        .mobile-layout .nav-item {
          color: black !important;
        }
        /* More specific override for music page */
        main.min-h-screen.bg-white .mobile-layout .nav-item {
          color: black !important;
        }
        /* Override for all screen sizes */
        @media screen and (max-width: 767px) {
          main.min-h-screen.bg-white .mobile-layout .nav-item {
            color: black !important;
          }
        }
        @media screen and (max-width: 480px) {
          main.min-h-screen.bg-white .mobile-layout .nav-item {
            color: black !important;
          }
        }
      `}</style>
    </main>
  );
} 