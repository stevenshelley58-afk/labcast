'use client';

import { useState, useEffect } from 'react';

export default function NewMobilePage() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const mono = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace';

  return (
    <div className="min-h-screen bg-neutral-200 p-8 flex justify-center items-start py-12">

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
            height: '844px',
            borderRadius: '44px',
            background: '#fff'
          }}
        >
          {/* Dynamic Island */}
          <div className="sticky top-[12px] left-1/2 z-50 mx-auto" style={{ width: '126px', height: '37px', background: '#000', borderRadius: '20px', transform: 'translateX(0)' }} />

          {/* Content */}
          <div style={{ fontFamily: mono, color: '#000' }}>

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

              {/* Stats above fold */}
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

              {/* Testimonial above fold */}
              <div style={{
                fontStyle: 'italic',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                &quot;[testimonial]&quot;
              </div>
              <div style={{ fontSize: '11px', opacity: 0.5 }}>
                — [name], [title]
              </div>

            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #000' }} />

            {/* The twist - Real content intro */}
            <div style={{ padding: '40px 28px', background: '#000', color: '#fff' }}>
              <div style={{ fontSize: '11px', marginBottom: '12px', opacity: 0.5 }}>or skip the bullshit/</div>
              <div style={{ fontSize: '24px', fontWeight: '600', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '24px' }}>
                We help you grow.
              </div>
              <div style={{ fontSize: '13px', opacity: 0.6, marginBottom: '32px' }}>
                Meta · Creative · Web
              </div>

              {/* Actually section merged in */}
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

            {/* Before/After - Real work */}
            <div style={{ padding: '40px 28px' }}>
              <div style={{ fontSize: '11px', marginBottom: '16px' }}>AI Creative/</div>

              {/* Actual Before/After Slider */}
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

            {/* Design Web App */}
            <div style={{ padding: '40px 28px' }}>
              <div style={{ fontSize: '11px', marginBottom: '16px' }}>Website Design/</div>
              <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>[interactive demo]</div>

              {/* Mini App UI */}
              <div style={{
                border: '1px solid #000',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#fafafa'
              }}>
                {/* App header */}
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#000',
                  color: '#fff'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '600' }}>Render Vault</span>
                  <span style={{ fontSize: '10px', opacity: 0.5 }}>AI Creative</span>
                </div>

                {/* App content */}
                <div style={{ padding: '16px' }}>
                  {/* Upload area */}
                  <div style={{
                    border: '1px dashed #ccc',
                    borderRadius: '8px',
                    padding: '24px',
                    textAlign: 'center',
                    marginBottom: '16px',
                    background: '#fff'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
                    <div style={{ fontSize: '11px', opacity: 0.5 }}>[drop product]</div>
                  </div>

                  {/* Output grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    <div style={{
                      aspectRatio: '1',
                      background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '20px' }}>🪑</span>
                    </div>
                    <div style={{
                      aspectRatio: '1',
                      background: 'linear-gradient(135deg, #e8e4df 0%, #d4cfc8 100%)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '20px' }}>🪑</span>
                    </div>
                    <div style={{
                      aspectRatio: '1',
                      background: 'linear-gradient(135deg, #f5f0eb 0%, #e6dfd6 100%)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '20px' }}>🪑</span>
                    </div>
                    <div style={{
                      aspectRatio: '1',
                      background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '20px' }}>🪑</span>
                    </div>
                  </div>

                  {/* Generate button */}
                  <div style={{
                    background: '#000',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    [generate]
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '11px', marginTop: '16px', opacity: 0.5 }}>
                your site → designed, built, shipped
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #000' }} />

            {/* Marketing Section */}
            <div style={{ padding: '40px 28px', background: '#000', color: '#fff' }}>
              <div style={{ fontSize: '11px', marginBottom: '16px', opacity: 0.5 }}>Marketing/</div>
              <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>[vanity metrics]</div>

              {/* Mini dashboard */}
              <div style={{
                background: '#111',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #333'
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '600' }}>Meta Ads</span>
                  <span style={{ fontSize: '10px', opacity: 0.5 }}>Last 30 days</span>
                </div>

                {/* Stats row */}
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

                {/* Mini chart bars */}
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

              {/* Point 1 */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>We have skin in the game.</div>
                <div style={{ fontSize: '13px', opacity: 0.6, lineHeight: 1.5 }}>
                  We run BHM with our own money. Every strategy we recommend is one we&apos;ve tested ourselves.
                </div>
              </div>

              {/* Point 2 */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>You talk to the people doing the work.</div>
                <div style={{ fontSize: '13px', opacity: 0.6, lineHeight: 1.5 }}>
                  No account managers. No junior staff learning on your dime. Direct access to the people actually building.
                </div>
              </div>

              {/* Point 3 */}
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>We only take clients we can help.</div>
                <div style={{ fontSize: '13px', opacity: 0.6, lineHeight: 1.5 }}>
                  We&apos;re not trying to scale an agency. If we can&apos;t move the needle, we&apos;ll say so upfront.
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #000' }} />

            {/* Contact - real */}
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
  );
}
