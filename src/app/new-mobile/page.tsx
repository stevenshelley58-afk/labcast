'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import Link from 'next/link';

export default function MobileSatirePage() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <main className="min-h-screen pt-14">
        {/* Hero Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Intro text */}
              <div className="order-2 md:order-1">
                <p className="text-sm text-muted mb-4">Mobile concept</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight leading-[1.1] mb-6">
                  Every landing page<br />
                  you&apos;ve ever seen.
                </h1>
                <p className="text-muted leading-relaxed mb-8 max-w-md">
                  This is what most agencies deliver. Generic templates filled with
                  buzzwords, stock photos, and vanity metrics. We thought we&apos;d show you
                  the difference.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition"
                  >
                    Skip to the real stuff
                  </Link>
                  <a
                    href="#phone-mockup"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition"
                  >
                    See the satire
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* Right: Quick preview card */}
              <div className="order-1 md:order-2">
                <div className="bg-panel border border-border rounded-2xl p-6 md:p-8 shadow-soft">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-lg font-medium">
                      L
                    </div>
                    <div>
                      <p className="font-medium">Labcast</p>
                      <p className="text-sm text-muted">Marketing that works</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted">→</span>
                      <span>Real strategies, tested with our own money</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted">→</span>
                      <span>Direct access to people doing the work</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted">→</span>
                      <span>We only take clients we can actually help</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phone Mockup Section */}
        <section id="phone-mockup" className="px-6 py-16 md:py-24 bg-surface border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm text-muted mb-4">The satire</p>
              <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight">
                Scroll through and spot the clichés
              </h2>
              <p className="text-muted mt-4 max-w-lg mx-auto">
                Then notice when we drop the act and show you what actually matters.
              </p>
            </div>

            {/* Phone Frame */}
            <div className="flex justify-center">
              <div
                className="relative rounded-[55px] p-[12px]"
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
                  boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
                }}
              >
                <div
                  className="relative overflow-y-auto overflow-x-hidden"
                  style={{
                    width: '390px',
                    maxWidth: 'calc(100vw - 80px)',
                    height: '700px',
                    borderRadius: '44px',
                    background: '#fff'
                  }}
                >
                  {/* Dynamic Island */}
                  <div className="sticky top-[12px] left-1/2 z-50 mx-auto" style={{ width: '126px', height: '37px', background: '#000', borderRadius: '20px' }} />

                  {/* Phone Content */}
                  <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace', color: '#000' }}>

                    {/* Nav */}
                    <div style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '15px', fontWeight: '600' }}>Labcast</span>
                      <span style={{ fontSize: '13px' }}>[menu]</span>
                    </div>

                    {/* Hero */}
                    <div style={{ padding: '0 28px 40px' }}>
                      <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '36px', fontWeight: '700', letterSpacing: '-0.04em', lineHeight: 1.1 }}>[clickbait]</span>
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <span style={{ fontSize: '15px', fontStyle: 'italic' }}>[subline with urgency]</span>
                      </div>

                      <div style={{ marginBottom: '28px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '600' }}>[cta]</span>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                        <span style={{ fontSize: '12px' }}>[feature]</span>
                        <span style={{ fontSize: '12px' }}>[offering]</span>
                        <span style={{ fontSize: '12px' }}>[upsell]</span>
                      </div>

                      {/* Placeholder image */}
                      <div style={{
                        width: '100%',
                        height: '160px',
                        border: '1px solid #000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '8px',
                        marginBottom: '32px'
                      }}>
                        <span style={{ fontSize: '32px' }}>✕</span>
                        <span style={{ fontSize: '11px', textAlign: 'center', padding: '0 16px' }}>[stock photo of people laughing at salad]</span>
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: '700' }}>[big]</div>
                          <div style={{ fontSize: '10px', opacity: 0.5 }}>[thing]</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: '700' }}>[bigger]</div>
                          <div style={{ fontSize: '10px', opacity: 0.5 }}>[thing]</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: '700' }}>[wow]</div>
                          <div style={{ fontSize: '10px', opacity: 0.5 }}>[thing]</div>
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div style={{ fontStyle: 'italic', fontSize: '14px', marginBottom: '8px' }}>
                        &quot;[testimonial]&quot;
                      </div>
                      <div style={{ fontSize: '11px', opacity: 0.5 }}>
                        — [name], [title]
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid #000' }} />

                    {/* The twist - Real content */}
                    <div style={{ padding: '40px 28px', background: '#000', color: '#fff' }}>
                      <div style={{ fontSize: '11px', marginBottom: '12px', opacity: 0.5 }}>or skip the bullshit/</div>
                      <div style={{ fontSize: '24px', fontWeight: '600', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '24px' }}>
                        We help you grow.
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.6, marginBottom: '32px' }}>
                        Meta · Creative · Web
                      </div>

                      <div style={{ borderTop: '1px solid #333', paddingTop: '24px' }}>
                        <div style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '16px' }}>
                          We built BHM. We run our own ads. We test on our own money first.
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>
                          → bhm.com.au
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid #000' }} />

                    {/* Before/After Slider */}
                    <div style={{ padding: '40px 28px' }}>
                      <div style={{ fontSize: '11px', marginBottom: '16px' }}>AI Creative/</div>

                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '280px',
                        border: '1px solid #000',
                        overflow: 'hidden',
                        cursor: 'ew-resize'
                      }}>
                        {/* Before side */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: '#f5f5f5',
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '20px'
                        }}>
                          <div style={{ fontSize: '10px', marginBottom: '12px', opacity: 0.4 }}>before</div>
                          <div style={{
                            flex: 1,
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}>
                            <div style={{ width: '60%', height: '12px', background: '#e0e0e0', borderRadius: '2px' }} />
                            <div style={{ width: '80%', height: '8px', background: '#e0e0e0', borderRadius: '2px' }} />
                            <div style={{ width: '40%', height: '8px', background: '#e0e0e0', borderRadius: '2px' }} />
                            <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '4px', marginTop: '8px' }} />
                          </div>
                        </div>

                        {/* After side */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: `${sliderPosition}%`,
                          height: '100%',
                          background: '#1a1a1a',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '20px'
                        }}>
                          <div style={{ fontSize: '10px', marginBottom: '12px', color: '#666' }}>after</div>
                          <div style={{
                            flex: 1,
                            background: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            minWidth: '294px'
                          }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>BHM Home</div>
                            <div style={{ fontSize: '11px', color: '#666' }}>Reclaimed teak furniture</div>
                            <div style={{
                              flex: 1,
                              background: 'linear-gradient(135deg, #f8f6f4 0%, #ebe7e2 100%)',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <span style={{ fontSize: '24px' }}>🪑</span>
                            </div>
                            <div style={{
                              background: '#000',
                              color: '#fff',
                              padding: '10px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              textAlign: 'center'
                            }}>Shop Collection</div>
                          </div>
                        </div>

                        {/* Slider handle */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: `${sliderPosition}%`,
                            transform: 'translateX(-50%)',
                            width: '3px',
                            height: '100%',
                            background: '#fff',
                            cursor: 'ew-resize',
                            zIndex: 10
                          }}
                        >
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '32px',
                            height: '32px',
                            background: '#fff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                          }}>
                            ↔
                          </div>
                        </div>

                        {/* Drag handler */}
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={sliderPosition}
                          onChange={(e) => setSliderPosition(Number(e.target.value))}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'ew-resize',
                            zIndex: 20
                          }}
                        />
                      </div>

                      <div style={{ fontSize: '11px', marginTop: '12px', opacity: 0.5 }}>
                        ↔ drag to compare
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid #000' }} />

                    {/* Marketing Dashboard */}
                    <div style={{ padding: '40px 28px', background: '#000', color: '#fff' }}>
                      <div style={{ fontSize: '11px', marginBottom: '16px', opacity: 0.5 }}>Marketing/</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>[vanity metrics]</div>

                      <div style={{
                        background: '#111',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid #333'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '20px'
                        }}>
                          <span style={{ fontSize: '12px', fontWeight: '600' }}>Meta Ads</span>
                          <span style={{ fontSize: '10px', opacity: 0.5 }}>Last 30 days</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                          <div>
                            <div style={{ fontSize: '22px', fontWeight: '700' }}>4.2x</div>
                            <div style={{ fontSize: '10px', opacity: 0.5 }}>ROAS</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '22px', fontWeight: '700' }}>$12</div>
                            <div style={{ fontSize: '10px', opacity: 0.5 }}>CPA</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '22px', fontWeight: '700' }}>312</div>
                            <div style={{ fontSize: '10px', opacity: 0.5 }}>Conv</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
                          {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 92].map((h, i) => (
                            <div
                              key={i}
                              style={{
                                flex: 1,
                                height: `${h}%`,
                                background: i === 11 ? '#fff' : '#333',
                                borderRadius: '2px'
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div style={{ fontSize: '11px', marginTop: '16px', opacity: 0.5 }}>
                        real numbers from real campaigns
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid #fff' }} />

                    {/* Why us */}
                    <div style={{ padding: '40px 28px' }}>
                      <div style={{ fontSize: '11px', marginBottom: '16px' }}>why us/</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '32px' }}>not [differentiators]</div>

                      <div style={{ marginBottom: '28px' }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>We have skin in the game.</div>
                        <div style={{ fontSize: '13px', opacity: 0.6, lineHeight: 1.5 }}>
                          We run BHM with our own money. Every strategy we recommend is one we&apos;ve tested ourselves.
                        </div>
                      </div>

                      <div style={{ marginBottom: '28px' }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>You talk to the people doing the work.</div>
                        <div style={{ fontSize: '13px', opacity: 0.6, lineHeight: 1.5 }}>
                          No account managers. No junior staff learning on your dime. Direct access to the people actually building.
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>We only take clients we can help.</div>
                        <div style={{ fontSize: '13px', opacity: 0.6, lineHeight: 1.5 }}>
                          We&apos;re not trying to scale an agency. If we can&apos;t move the needle, we&apos;ll say so upfront.
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid #000' }} />

                    {/* Contact */}
                    <div style={{ padding: '40px 28px' }}>
                      <div style={{ fontSize: '11px', marginBottom: '16px' }}>contact/</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>steve@labcast.com.au</div>
                      <div style={{ fontSize: '13px', opacity: 0.5 }}>Perth, AU</div>
                    </div>

                    {/* Bottom cursor */}
                    <div style={{
                      padding: '40px 28px 60px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        fontSize: '36px',
                        fontWeight: '700',
                        letterSpacing: '-0.03em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '140px'
                      }}>
                        <span>[</span>
                        <span style={{ opacity: cursorVisible ? 1 : 0, fontWeight: '300' }}>|</span>
                        <span>]</span>
                      </div>
                    </div>

                  </div>

                  {/* Home indicator */}
                  <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '8px', width: '140px', height: '5px', background: '#000', borderRadius: '100px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight mb-6">
              Ready for the real thing?
            </h2>
            <p className="text-muted max-w-lg mx-auto mb-8">
              No more [buzzwords]. Just a conversation about your brand and
              whether we can actually help.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-8 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Let&apos;s talk
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
