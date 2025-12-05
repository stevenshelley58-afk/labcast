import React, { useState, useRef, useEffect } from 'react';

// ============ UTILITIES ============
function hexToHSL(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; } 
  else {
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

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function generatePalette(accentHex) {
  const { h, s } = hexToHSL(accentHex);
  return {
    bg: hslToHex(h, Math.min(s * 0.3, 5), 97),
    bgAlt: hslToHex(h, Math.min(s * 0.4, 8), 93),
    accent: accentHex,
    mid: hslToHex(h, Math.min(s * 0.5, 15), 60),
    dark: hslToHex(h, Math.min(s * 0.6, 20), 25),
  };
}

function getContrastColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
}

// ============ SHARED DATA ============
const presetColors = [
  '#D4D9E3', '#E5DFD5', '#D4DED4', '#E8D8DC', 
  '#D4E3E8', '#1E3A5F', '#C4846C', '#3D5A4C',
];

const fonts = [
  { name: 'Inter', category: 'sans-serif', sample: 'Clean & Modern' },
  { name: 'Outfit', category: 'sans-serif', sample: 'Geometric Style' },
  { name: 'DM Sans', category: 'sans-serif', sample: 'Friendly Feel' },
  { name: 'Space Grotesk', category: 'sans-serif', sample: 'Tech Forward' },
  { name: 'Playfair Display', category: 'serif', sample: 'Classic Elegance' },
  { name: 'Fraunces', category: 'serif', sample: 'Soft Serif' },
  { name: 'DM Serif Display', category: 'serif', sample: 'Bold Statement' },
  { name: 'Libre Baskerville', category: 'serif', sample: 'Traditional' },
];

const radiusOptions = [
  { name: 'Sharp', value: '0px' },
  { name: 'Subtle', value: '4px' },
  { name: 'Rounded', value: '8px' },
  { name: 'Soft', value: '16px' },
];

// ============ PREVIEW COMPONENT ============
const Preview = ({ palette, font = 'Inter, sans-serif', radius = '6px', scale = 1 }) => (
  <div style={{ 
    background: palette.bg, 
    borderRadius: `${12 * scale}px`,
    overflow: 'hidden',
    transition: 'all 0.6s ease',
    width: scale > 1.2 ? `${320 * scale}px` : '100%',
  }}>
    {/* Nav */}
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: `${14 * scale}px ${20 * scale}px`,
      borderBottom: `1px solid ${palette.bgAlt}`,
    }}>
      <div style={{ 
        fontSize: `${12 * scale}px`, 
        fontWeight: 600, 
        color: palette.dark, 
        fontFamily: font,
        letterSpacing: '-0.3px',
        transition: 'color 0.6s ease',
      }}>Labcast</div>
      <div style={{ display: 'flex', gap: `${16 * scale}px`, alignItems: 'center' }}>
        <span style={{ fontSize: `${10 * scale}px`, color: palette.mid, transition: 'color 0.6s ease' }}>Products</span>
        <span style={{ fontSize: `${10 * scale}px`, color: palette.mid, transition: 'color 0.6s ease' }}>About</span>
        <button style={{
          padding: `${6 * scale}px ${14 * scale}px`,
          fontSize: `${9 * scale}px`,
          fontWeight: 500,
          borderRadius: radius,
          background: palette.dark,
          color: getContrastColor(palette.dark),
          border: 'none',
          transition: 'all 0.6s ease',
        }}>Shop Now</button>
      </div>
    </div>

    {/* Hero */}
    <div style={{ padding: `${40 * scale}px ${20 * scale}px`, textAlign: 'center' }}>
      <p style={{ 
        fontSize: `${9 * scale}px`, 
        color: palette.mid, 
        textTransform: 'uppercase', 
        letterSpacing: '2px', 
        marginBottom: `${8 * scale}px`,
        transition: 'color 0.6s ease',
      }}>Introducing</p>
      <h1 style={{ 
        fontSize: `${22 * scale}px`, 
        fontWeight: 400, 
        color: palette.dark,
        margin: 0,
        lineHeight: 1.2,
        fontFamily: font,
        transition: 'color 0.6s ease',
      }}>
        Beautiful things, thoughtfully made.
      </h1>
    </div>

    {/* Stats */}
    <div style={{ 
      background: palette.accent, 
      padding: `${16 * scale}px`,
      display: 'flex',
      justifyContent: 'center',
      gap: `${48 * scale}px`,
      transition: 'background 0.6s ease',
    }}>
      {[
        { n: '10K+', l: 'Customers' }, 
        { n: '150+', l: 'Products' }, 
        { n: '4.9', l: 'Rating' }
      ].map((stat) => (
        <div key={stat.n} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: `${14 * scale}px`, fontWeight: 600, color: palette.dark, transition: 'color 0.6s ease' }}>{stat.n}</div>
          <div style={{ fontSize: `${8 * scale}px`, color: palette.mid, transition: 'color 0.6s ease' }}>{stat.l}</div>
        </div>
      ))}
    </div>
  </div>
);

// ============ COLOR PICKER ============
const ColorPicker = ({ color, onChange }) => {
  const hsl = hexToHSL(color);
  const [hue, setHue] = useState(hsl.h);
  const [saturation, setSaturation] = useState(hsl.s);
  const [lightness, setLightness] = useState(hsl.l);
  const gradientRef = useRef(null);

  const handleHueChange = (newHue) => {
    setHue(newHue);
    onChange(hslToHex(newHue, saturation, lightness));
  };

  const handleGradientClick = (e) => {
    const rect = gradientRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const newSat = Math.round(x * 100);
    const newLight = Math.round((1 - y) * 100);
    setSaturation(newSat);
    setLightness(newLight);
    onChange(hslToHex(hue, newSat, newLight));
  };

  return (
    <div>
      <div
        ref={gradientRef}
        onClick={handleGradientClick}
        style={{
          width: '100%',
          height: '120px',
          borderRadius: '12px',
          background: `linear-gradient(to bottom, white, transparent, black), linear-gradient(to right, #888, hsl(${hue}, 100%, 50%))`,
          cursor: 'crosshair',
          position: 'relative',
          marginBottom: '12px',
        }}
      >
        <div style={{
          position: 'absolute',
          left: `${saturation}%`,
          top: `${100 - lightness}%`,
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          background: color,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
      </div>
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => handleHueChange(Number(e.target.value))}
        style={{
          width: '100%',
          height: '24px',
          borderRadius: '12px',
          background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
          appearance: 'none',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {presetColors.map((c) => (
          <button
            key={c}
            onClick={() => {
              const newHsl = hexToHSL(c);
              setHue(newHsl.h);
              setSaturation(newHsl.s);
              setLightness(newHsl.l);
              onChange(c);
            }}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: c,
              border: color === c ? '3px solid #1a1a1a' : '1px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ============ FONT PICKER ============
const FontPicker = ({ selectedFont, onChange }) => {
  const [filter, setFilter] = useState('all');
  const filteredFonts = fonts.filter(f => {
    if (filter === 'all') return true;
    if (filter === 'sans') return f.category === 'sans-serif';
    if (filter === 'serif') return f.category === 'serif';
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {[{ id: 'all', label: 'All' }, { id: 'sans', label: 'Sans' }, { id: 'serif', label: 'Serif' }].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '16px',
              background: filter === f.id ? '#1a1a1a' : '#f0f0f0',
              color: filter === f.id ? '#fff' : '#666',
              border: 'none',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >{f.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflow: 'auto' }}>
        {filteredFonts.map(f => (
          <button
            key={f.name}
            onClick={() => onChange(`${f.name}, ${f.category}`)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: selectedFont.includes(f.name) ? '#f5f5f5' : '#fff',
              border: selectedFont.includes(f.name) ? '2px solid #1a1a1a' : '1px solid #eee',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: `${f.name}, ${f.category}`, fontSize: '14px', fontWeight: 500 }}>{f.name}</div>
              <div style={{ fontSize: '10px', color: '#999' }}>{f.category}</div>
            </div>
            <div style={{ fontFamily: `${f.name}, ${f.category}`, fontSize: '12px', color: '#888' }}>{f.sample}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============ SHAPE PICKER ============
const ShapePicker = ({ radius, onChange }) => (
  <div style={{ display: 'flex', gap: '10px' }}>
    {radiusOptions.map(r => (
      <button key={r.name} onClick={() => onChange(r.value)} style={{
        flex: 1,
        padding: '14px 8px',
        borderRadius: '12px',
        background: '#fff',
        textAlign: 'center',
        border: radius === r.value ? '2px solid #1a1a1a' : '1px solid #eee',
        cursor: 'pointer',
      }}>
        <div style={{ width: '28px', height: '28px', background: '#1a1a1a', borderRadius: r.value, margin: '0 auto 6px' }} />
        <div style={{ fontSize: '11px', color: '#666' }}>{r.name}</div>
      </button>
    ))}
  </div>
);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. DESKTOP WIDGET — Homepage section with auto-cycling colors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DesktopWidget = ({ onOpenFullDesigner }) => {
  const [accent, setAccent] = useState(presetColors[0]);
  const [palette, setPalette] = useState(() => generatePalette(presetColors[0]));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const intervalRef = useRef(null);

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
    return () => clearInterval(intervalRef.current);
  }, [isAutoCycling]);

  const handleColorClick = (color, index) => {
    setIsAutoCycling(false);
    setAccent(color);
    setActiveIndex(index);
  };

  return (
    <section style={{
      padding: '100px 48px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 500, 
          letterSpacing: '-0.5px', 
          marginBottom: '48px', 
          textAlign: 'center',
          color: '#1a1a1a',
        }}>
          Systems, not just sites.
        </h2>

        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 16px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}>
          {/* Preview */}
          <Preview palette={palette} scale={1.1} />

          {/* Bottom control strip */}
          <div style={{ 
            padding: '16px 24px',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#fff',
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {presetColors.slice(0, 6).map((color, index) => (
                <button
                  key={color}
                  onClick={() => handleColorClick(color, index)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: color,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: activeIndex === index ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: activeIndex === index 
                      ? '0 0 0 2px #fff, 0 0 0 3px #1a1a1a' 
                      : '0 0 0 1px rgba(0,0,0,0.06)',
                  }}
                />
              ))}
            </div>
            <button 
              onClick={onOpenFullDesigner}
              style={{
                background: '#1a1a1a',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Try full designer →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. MOBILE WIDGET — Homepage section for mobile
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MobileWidget = ({ onOpenFullDesigner }) => {
  const [accent, setAccent] = useState(presetColors[0]);
  const [palette, setPalette] = useState(() => generatePalette(presetColors[0]));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const intervalRef = useRef(null);

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
    return () => clearInterval(intervalRef.current);
  }, [isAutoCycling]);

  const handleColorClick = (color, index) => {
    setIsAutoCycling(false);
    setAccent(color);
    setActiveIndex(index);
  };

  return (
    <section style={{
      padding: '48px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 500, 
        letterSpacing: '-0.5px', 
        marginBottom: '32px', 
        textAlign: 'center',
        color: '#1a1a1a',
      }}>
        Systems, not just sites.
      </h2>

      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
        {/* Preview */}
        <Preview palette={palette} scale={0.9} />

        {/* Colors */}
        <div style={{ 
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          borderTop: '1px solid #f0f0f0',
        }}>
          {presetColors.slice(0, 6).map((color, index) => (
            <button
              key={color}
              onClick={() => handleColorClick(color, index)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: color,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                boxShadow: activeIndex === index 
                  ? '0 0 0 2px #fff, 0 0 0 3px #1a1a1a' 
                  : '0 0 0 1px rgba(0,0,0,0.06)',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding: '0 16px 16px' }}>
          <button 
            onClick={onOpenFullDesigner}
            style={{
              width: '100%',
              background: '#1a1a1a',
              color: '#fff',
              border: 'none',
              padding: '14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Try full designer →
          </button>
        </div>
      </div>
    </section>
  );
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. MOBILE FULL DESIGNER — V2 Large preview + bottom drawer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MobileFullDesigner = ({ onClose }) => {
  const [color, setColor] = useState('#D4D9E3');
  const [palette, setPalette] = useState(() => generatePalette('#D4D9E3'));
  const [tab, setTab] = useState('color');
  const [font, setFont] = useState('Inter, sans-serif');
  const [radius, setRadius] = useState('8px');

  const handleColorChange = (c) => {
    setColor(c);
    setPalette(generatePalette(c));
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
    }}>
      {/* Header */}
      <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '16px', fontWeight: 600 }}>Design System</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '14px', color: '#888', cursor: 'pointer' }}>Done</button>
      </div>

      {/* Large Preview */}
      <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%' }}>
          <Preview palette={palette} font={font} radius={radius} scale={1} />
          {/* Palette strip */}
          <div style={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', marginTop: '12px' }}>
            {Object.values(palette).map((c, i) => (
              <div key={i} style={{ flex: 1, height: '28px', background: c, transition: 'background 0.6s ease' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom drawer */}
      <div style={{ background: '#f8f8f8', borderRadius: '24px 24px 0 0' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', padding: '14px 20px 0', gap: '8px' }}>
          {['color', 'type', 'shape'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 20px', borderRadius: '20px',
              background: tab === t ? '#1a1a1a' : '#fff',
              color: tab === t ? '#fff' : '#666',
              border: 'none', fontSize: '13px', fontWeight: 500, textTransform: 'capitalize',
              cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '16px 20px', maxHeight: '220px', overflow: 'auto' }}>
          {tab === 'color' && <ColorPicker color={color} onChange={handleColorChange} />}
          {tab === 'type' && <FontPicker selectedFont={font} onChange={setFont} />}
          {tab === 'shape' && <ShapePicker radius={radius} onChange={setRadius} />}
        </div>

        {/* CTA */}
        <div style={{ padding: '8px 20px 20px' }}>
          <button style={{ 
            width: '100%', 
            background: '#1a1a1a', 
            color: '#fff', 
            border: 'none', 
            padding: '16px', 
            borderRadius: '14px', 
            fontSize: '14px', 
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            Get in touch →
          </button>
        </div>
      </div>
    </div>
  );
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. DESKTOP FULL DESIGNER — V2 Floating card modal
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DesktopFullDesigner = ({ onClose }) => {
  const [color, setColor] = useState('#D4D9E3');
  const [palette, setPalette] = useState(() => generatePalette('#D4D9E3'));
  const [tab, setTab] = useState('color');
  const [font, setFont] = useState('Inter, sans-serif');
  const [radius, setRadius] = useState('8px');

  const handleColorChange = (c) => {
    setColor(c);
    setPalette(generatePalette(c));
  };

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      background: 'rgba(0,0,0,0.6)', 
      backdropFilter: 'blur(12px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      zIndex: 1000,
    }}>
      <div style={{ 
        background: '#fff', 
        borderRadius: '24px', 
        padding: '40px', 
        maxWidth: '560px', 
        width: '90%', 
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 600 }}>Design System</div>
            <div style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Customize your brand</div>
          </div>
          <button onClick={onClose} style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            background: '#f5f5f5', 
            border: 'none', 
            fontSize: '18px', 
            color: '#888', 
            cursor: 'pointer',
          }}>×</button>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <Preview palette={palette} font={font} radius={radius} scale={1.3} />
        </div>

        {/* Palette */}
        <div style={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
          {Object.values(palette).map((c, i) => (
            <div key={i} style={{ flex: 1, height: '32px', background: c, transition: 'background 0.6s ease' }} />
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['color', 'type', 'shape'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 20px', borderRadius: '20px',
              background: tab === t ? '#1a1a1a' : '#f5f5f5',
              color: tab === t ? '#fff' : '#666',
              border: 'none', fontSize: '13px', fontWeight: 500, textTransform: 'capitalize', 
              cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ marginBottom: '24px' }}>
          {tab === 'color' && <ColorPicker color={color} onChange={handleColorChange} />}
          {tab === 'type' && <FontPicker selectedFont={font} onChange={setFont} />}
          {tab === 'shape' && <ShapePicker radius={radius} onChange={setRadius} />}
        </div>

        {/* CTA */}
        <button style={{ 
          width: '100%', 
          background: '#1a1a1a', 
          color: '#fff', 
          border: 'none', 
          padding: '16px', 
          borderRadius: '12px', 
          fontSize: '14px', 
          fontWeight: 500, 
          cursor: 'pointer',
        }}>
          Let's build yours →
        </button>
      </div>
    </div>
  );
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMO — Shows all 4 components
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function Demo() {
  const [showDesktopModal, setShowDesktopModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Desktop Widget */}
      <div style={{ background: '#fafafa' }}>
        <DesktopWidget onOpenFullDesigner={() => setShowDesktopModal(true)} />
      </div>

      {/* Mobile Widget Preview */}
      <div style={{ background: '#e5e5e5', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Mobile Widget Preview</h3>
        </div>
        <div style={{ 
          maxWidth: '375px', 
          margin: '0 auto',
          background: '#fff',
          borderRadius: '32px',
          padding: '20px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
        }}>
          <MobileWidget onOpenFullDesigner={() => setShowMobileModal(true)} />
        </div>
      </div>

      {/* Desktop Modal */}
      {showDesktopModal && (
        <DesktopFullDesigner onClose={() => setShowDesktopModal(false)} />
      )}

      {/* Mobile Modal */}
      {showMobileModal && (
        <MobileFullDesigner onClose={() => setShowMobileModal(false)} />
      )}
    </div>
  );
}
