'use client';

import { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/footer';
import TactileReveal from '@/rendervault/components/TactileReveal';
import Link from 'next/link';

// Inline Design System Widget
const presetColors = ['#D4D9E3', '#E5DFD5', '#D4DED4', '#E8D8DC', '#D4E3E8', '#1E3A5F'];

function hexToHSL(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function generatePalette(accentHex: string) {
  const { h, s } = hexToHSL(accentHex);
  return {
    bg: hslToHex(h, Math.min(s * 0.3, 5), 97),
    bgAlt: hslToHex(h, Math.min(s * 0.4, 8), 93),
    accent: accentHex,
    mid: hslToHex(h, Math.min(s * 0.5, 15), 60),
    dark: hslToHex(h, Math.min(s * 0.6, 20), 25),
  };
}

function DesignSystemWidget() {
  const [accent, setAccent] = useState(presetColors[0]);
  const [palette, setPalette] = useState(() => generatePalette(presetColors[0]));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPalette(generatePalette(accent));
  }, [accent]);

  useEffect(() => {
    if (isAutoCycling) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % 6;
          setAccent(presetColors[next]);
          return next;
        });
      }, 2500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoCycling]);

  const handleColorClick = (color: string, index: number) => {
    setIsAutoCycling(false);
    setAccent(color);
    setActiveIndex(index);
  };

  return (
    <div>
      {/* Preview card */}
      <div
        className="rounded-xl overflow-hidden transition-all duration-500"
        style={{ background: palette.bg }}
      >
        {/* Nav */}
        <div
          className="flex justify-between items-center px-4 py-3 transition-all duration-500"
          style={{ borderBottom: `1px solid ${palette.bgAlt}` }}
        >
          <span className="text-xs font-semibold" style={{ color: palette.dark }}>Labcast</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px]" style={{ color: palette.mid }}>Products</span>
            <span className="text-[10px]" style={{ color: palette.mid }}>About</span>
            <button
              className="px-3 py-1 text-[9px] font-medium rounded transition-all duration-500"
              style={{ background: palette.dark, color: '#fff' }}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="py-8 px-4 text-center">
          <p
            className="text-[9px] uppercase tracking-widest mb-2 transition-all duration-500"
            style={{ color: palette.mid }}
          >
            Introducing
          </p>
          <h2
            className="text-lg font-normal leading-tight transition-all duration-500"
            style={{ color: palette.dark }}
          >
            Beautiful things, thoughtfully made.
          </h2>
        </div>

        {/* Stats bar */}
        <div
          className="flex justify-center gap-10 py-4 transition-all duration-500"
          style={{ background: palette.accent }}
        >
          {[{ n: '10K+', l: 'Customers' }, { n: '150+', l: 'Products' }, { n: '4.9', l: 'Rating' }].map((stat) => (
            <div key={stat.n} className="text-center">
              <div className="text-sm font-semibold transition-all duration-500" style={{ color: palette.dark }}>{stat.n}</div>
              <div className="text-[8px] transition-all duration-500" style={{ color: palette.mid }}>{stat.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Color swatches */}
      <div className="flex justify-center gap-3 mt-5">
        {presetColors.map((color, index) => (
          <button
            key={color}
            onClick={() => handleColorClick(color, index)}
            className="w-9 h-9 rounded-full border-none cursor-pointer transition-all duration-300"
            style={{
              background: color,
              transform: activeIndex === index ? 'scale(1.15)' : 'scale(1)',
              boxShadow: activeIndex === index
                ? '0 0 0 2px #fff, 0 0 0 3px #1a1a1a'
                : '0 0 0 1px rgba(0,0,0,0.06)',
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-5 bg-black text-white py-3 rounded-lg text-sm font-medium">
        Try full designer →
      </button>
    </div>
  );
}

export default function NewMobilePage() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Toolbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 transition-colors duration-300 ${
        menuOpen ? 'bg-neutral-950' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <Link href="/" className={`text-[15px] font-medium tracking-tight transition-colors ${
          menuOpen ? 'text-white' : 'text-neutral-900'
        }`}>
          Labcast
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-6 h-6 relative"
          aria-label="Menu"
        >
          <span className={`absolute left-0 top-1.5 w-5 h-[1.5px] transition-all duration-300 ${
            menuOpen ? 'bg-white rotate-45 top-3' : 'bg-neutral-900'
          }`} />
          <span className={`absolute left-0 top-4 w-5 h-[1.5px] transition-all duration-300 ${
            menuOpen ? 'bg-white -rotate-45 top-3' : 'bg-neutral-900'
          }`} />
        </button>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide Menu */}
      <nav className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-neutral-950 z-50 transition-transform duration-300 ease-out ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="px-6 pt-24 pb-8 h-full flex flex-col">
          <div className="space-y-5">
            <Link href="/services" className="block text-xl text-white font-light">Services</Link>
            <Link href="/#about" className="block text-xl text-white font-light">About</Link>
            <Link href="/render-vault" className="block text-xl text-white font-light">Render Vault</Link>
            <Link href="/#contact" className="block text-xl text-white font-light">Contact</Link>
          </div>

          <div className="mt-12">
            <Link href="/signup" className="block w-full py-3 border border-white text-white text-sm text-center rounded-full">
              Sign up
            </Link>
            <Link href="/login" className="block text-center text-sm text-neutral-500 mt-4">
              Login
            </Link>
          </div>

          <div className="mt-auto">
            <p className="text-xs text-neutral-600">Perth, Australia</p>
            <p className="text-xs text-neutral-600 mt-1">hello@labcast.com.au</p>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            [clickbait]
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 italic mb-12">
            [subline with urgency]
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-mono">
            <span>[feature]</span>
            <span>[offering]</span>
            <span>[upsell]</span>
          </div>
        </div>
      </section>

      {/* Stock Photo Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="border border-black aspect-video flex flex-col items-center justify-center gap-6 bg-white">
            <span className="text-7xl">✕</span>
            <span className="text-sm text-gray-500 font-mono">[stock photo of people laughing at salad]</span>
          </div>
        </div>
      </section>

      {/* Vanity Stats */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold">[big]</div>
              <div className="text-sm text-gray-400 mt-3">[thing]</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold">[bigger]</div>
              <div className="text-sm text-gray-400 mt-3">[thing]</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold">[wow]</div>
              <div className="text-sm text-gray-400 mt-3">[thing]</div>
            </div>
          </div>

          <div className="mt-20 max-w-2xl mx-auto text-center">
            <p className="text-xl italic text-gray-600 mb-6">&quot;[testimonial]&quot;</p>
            <p className="text-sm text-gray-400">— [name], [title]</p>
          </div>
        </div>
      </section>

      {/* The Real Content Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 font-mono mb-6">or skip the bullshit/</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">We help you grow.</h2>
          <p className="text-lg text-gray-400 mb-16">Meta · Creative · Web</p>

          <div className="border-t border-gray-800 pt-10">
            <p className="text-xl md:text-2xl mb-8">
              We built BHM. We run our own ads. We test on our own money first.
            </p>
            <a
              href="https://bhm.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition font-medium text-lg"
            >
              → bhm.com.au
            </a>
          </div>
        </div>
      </section>

      {/* AI Creative Section */}
      <section className="py-24 px-6">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-400 font-mono mb-4">AI Creative/</p>

          {/* Bordered card container */}
          <div className="border border-black rounded-2xl overflow-hidden bg-white">
            <div className="aspect-square w-full">
              <TactileReveal
                beforeImage="/images/mirror-before.png"
                afterImage="/images/mirror-after.png"
                className="h-full !rounded-none"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Website Design Section */}
      <section className="py-24 px-6">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-400 font-mono mb-4">Website Design/</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-8">[interactive demo]</h3>

          {/* Widget container */}
          <div className="border border-black rounded-2xl overflow-hidden bg-white p-5">
            <DesignSystemWidget />
          </div>

          <p className="text-sm text-gray-400 font-mono mt-6">
            your site → designed, built, shipped
          </p>
        </div>
      </section>

      {/* Marketing Dashboard */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 font-mono mb-6">Marketing/</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">[vanity metrics]</h3>

          <div className="bg-gray-900 rounded-3xl p-8 md:p-10 border border-gray-800">
            <div className="flex justify-between items-center mb-10">
              <span className="font-semibold text-lg">Meta Ads</span>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>

            <div className="grid grid-cols-3 gap-8 md:gap-12 mb-10">
              <div>
                <div className="text-4xl md:text-5xl font-bold">4.2x</div>
                <div className="text-sm text-gray-500 mt-2">ROAS</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold">$12</div>
                <div className="text-sm text-gray-500 mt-2">CPA</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold">312</div>
                <div className="text-sm text-gray-500 mt-2">Conv</div>
              </div>
            </div>

            <div className="flex items-end gap-2 h-24">
              {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 92].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded"
                  style={{
                    height: `${h}%`,
                    background: i === 11 ? '#fff' : '#333'
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-8">real numbers from real campaigns</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-400 font-mono mb-6">why us/</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-16">not [differentiators]</h3>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <h4 className="font-bold text-xl mb-4">We have skin in the game.</h4>
              <p className="text-gray-500 leading-relaxed">
                We run BHM with our own money. Every strategy we recommend is one we&apos;ve tested ourselves.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">You talk to the people doing the work.</h4>
              <p className="text-gray-500 leading-relaxed">
                No account managers. No junior staff learning on your dime. Direct access to the people actually building.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">We only take clients we can help.</h4>
              <p className="text-gray-500 leading-relaxed">
                We&apos;re not trying to scale an agency. If we can&apos;t move the needle, we&apos;ll say so upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400 font-mono mb-6">contact/</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">steve@labcast.com.au</h3>
          <p className="text-gray-500 mb-12">Perth, AU</p>

          <Link
            href="/#contact"
            className="inline-block bg-black text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-gray-800 transition"
          >
            Ready for the real thing?
          </Link>
        </div>
      </section>

      {/* Blinking cursor */}
      <section className="py-20 px-6">
        <div className="flex justify-center">
          <div className="text-5xl font-bold tracking-tight flex items-center gap-6">
            <span>[</span>
            <span style={{ opacity: cursorVisible ? 1 : 0 }} className="font-light">|</span>
            <span>]</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
