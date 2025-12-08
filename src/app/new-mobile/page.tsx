'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import Link from 'next/link';

export default function NewMobilePage() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-400 font-mono mb-4">Every landing page you&apos;ve ever seen/</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            [clickbait]
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 italic mb-8">
            [subline with urgency]
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="#real-content"
              className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
            >
              Skip to the real stuff
            </Link>
            <Link
              href="#satire"
              className="border border-black px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition"
            >
              See the satire
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-mono">
            <span>[feature]</span>
            <span>[offering]</span>
            <span>[upsell]</span>
          </div>
        </div>
      </section>

      {/* Stock Photo Section */}
      <section id="satire" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="border border-black aspect-video flex flex-col items-center justify-center gap-4 bg-white">
            <span className="text-6xl">✕</span>
            <span className="text-sm text-gray-500 font-mono">[stock photo of people laughing at salad]</span>
          </div>
        </div>
      </section>

      {/* Vanity Stats */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold">[big]</div>
              <div className="text-sm text-gray-400 mt-2">[thing]</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold">[bigger]</div>
              <div className="text-sm text-gray-400 mt-2">[thing]</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold">[wow]</div>
              <div className="text-sm text-gray-400 mt-2">[thing]</div>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto text-center">
            <p className="text-xl italic text-gray-600 mb-4">&quot;[testimonial]&quot;</p>
            <p className="text-sm text-gray-400">— [name], [title]</p>
          </div>
        </div>
      </section>

      {/* The Real Content Section */}
      <section id="real-content" className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 font-mono mb-4">or skip the bullshit/</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">We help you grow.</h2>
          <p className="text-lg text-gray-400 mb-12">Meta · Creative · Web</p>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-lg md:text-xl mb-6">
              We built BHM. We run our own ads. We test on our own money first.
            </p>
            <a
              href="https://bhm.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition font-medium"
            >
              → bhm.com.au
            </a>
          </div>
        </div>
      </section>

      {/* Before/After Slider */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-400 font-mono mb-4">AI Creative/</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Real work, not mockups</h3>

          <div className="relative w-full aspect-[4/3] border border-black overflow-hidden cursor-ew-resize">
            {/* Before side */}
            <div className="absolute inset-0 bg-gray-100 p-8 flex flex-col">
              <span className="text-xs text-gray-400 mb-4">before</span>
              <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-3">
                <div className="w-3/5 h-4 bg-gray-200 rounded" />
                <div className="w-4/5 h-3 bg-gray-200 rounded" />
                <div className="w-2/5 h-3 bg-gray-200 rounded" />
                <div className="flex-1 bg-gray-100 rounded-lg mt-4" />
              </div>
            </div>

            {/* After side */}
            <div
              className="absolute inset-y-0 left-0 bg-gray-900 p-8 flex flex-col overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <span className="text-xs text-gray-500 mb-4">after</span>
              <div className="flex-1 bg-white rounded-xl p-6 flex flex-col gap-3 min-w-[300px]">
                <div className="font-semibold">BHM Home</div>
                <div className="text-sm text-gray-500">Reclaimed teak furniture</div>
                <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">🪑</span>
                </div>
                <button className="bg-black text-white py-3 rounded-lg text-sm font-medium">
                  Shop Collection
                </button>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                ↔
              </div>
            </div>

            {/* Invisible range input for dragging */}
            <input
              type="range"
              min="10"
              max="90"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>
          <p className="text-sm text-gray-400 mt-4">↔ drag to compare</p>
        </div>
      </section>

      {/* Marketing Dashboard */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 font-mono mb-4">Marketing/</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-8">[vanity metrics]</h3>

          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <div className="flex justify-between items-center mb-8">
              <span className="font-semibold">Meta Ads</span>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold">4.2x</div>
                <div className="text-sm text-gray-500">ROAS</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">$12</div>
                <div className="text-sm text-gray-500">CPA</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">312</div>
                <div className="text-sm text-gray-500">Conv</div>
              </div>
            </div>

            <div className="flex items-end gap-1 h-20">
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
          <p className="text-sm text-gray-500 mt-6">real numbers from real campaigns</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-400 font-mono mb-4">why us/</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-12">not [differentiators]</h3>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold text-lg mb-3">We have skin in the game.</h4>
              <p className="text-gray-500">
                We run BHM with our own money. Every strategy we recommend is one we&apos;ve tested ourselves.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">You talk to the people doing the work.</h4>
              <p className="text-gray-500">
                No account managers. No junior staff learning on your dime. Direct access to the people actually building.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">We only take clients we can help.</h4>
              <p className="text-gray-500">
                We&apos;re not trying to scale an agency. If we can&apos;t move the needle, we&apos;ll say so upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400 font-mono mb-4">contact/</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">steve@labcast.com.au</h3>
          <p className="text-gray-500 mb-8">Perth, AU</p>

          <Link
            href="/#contact"
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Ready for the real thing?
          </Link>
        </div>
      </section>

      {/* Blinking cursor */}
      <section className="py-16 px-6">
        <div className="flex justify-center">
          <div className="text-4xl font-bold tracking-tight flex items-center gap-4">
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
