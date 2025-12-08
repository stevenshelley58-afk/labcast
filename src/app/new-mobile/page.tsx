'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { DesignSystemSection } from '../components/DesignSystemSection';
import TactileReveal from '@/rendervault/components/TactileReveal';
import Link from 'next/link';

export default function NewMobilePage() {
  const [cursorVisible, setCursorVisible] = useState(true);

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

      {/* Before/After Slider with TactileReveal */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-400 font-mono mb-6">AI Creative/</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">Real work, not mockups</h3>

          <div className="aspect-square md:aspect-[4/3] w-full">
            <TactileReveal
              beforeImage="/images/mirror-before.png"
              afterImage="/images/mirror-after.png"
              className="h-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* Website Design Section - Using the real component from main site */}
      <DesignSystemSection />

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
