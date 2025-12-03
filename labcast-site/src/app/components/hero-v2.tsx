"use client";

import { useEffect, useRef } from "react";

type Dot = {
  nx: number;
  ny: number;
  size: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
  flowAngle: number;
  bandStrength: number;
};

type ExclusionRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const HERO_VARIANT_LABEL = "Hero concept V2 · more versions coming";

export function HeroDotsV2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroBodyRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const heroBody = heroBodyRef.current;
    if (!canvas || !heroBody) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const dotsRef = { current: [] as Dot[] };
    let exclusionRect: ExclusionRect | null = null;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const smoothstep = (edge0: number, edge1: number, x: number) => {
      const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
      return t * t * (3 - 2 * t);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let motionScale = prefersReducedMotion.matches ? 0.35 : 1;
    const handleMotionChange = (event: MediaQueryListEvent) => {
      motionScale = event.matches ? 0.35 : 1;
    };

    if (prefersReducedMotion.addEventListener) {
      prefersReducedMotion.addEventListener("change", handleMotionChange);
    } else if (prefersReducedMotion.addListener) {
      prefersReducedMotion.addListener(handleMotionChange);
    }

    const resetPointer = () => {
      pointer.x = pointerTarget.x = canvas.width * 0.75;
      pointer.y = pointerTarget.y = canvas.height * 0.45;
    };

    const updateExclusionRect = () => {
      const textBlock = textBlockRef.current;
      if (!textBlock) {
        exclusionRect = null;
        return;
      }

      const canvasBounds = canvas.getBoundingClientRect();
      const textBounds = textBlock.getBoundingClientRect();
      const margin = 16;

      exclusionRect = {
        left: (textBounds.left - canvasBounds.left - margin) * dpr,
        right: (textBounds.right - canvasBounds.left + margin) * dpr,
        top: (textBounds.top - canvasBounds.top - margin) * dpr,
        bottom: (textBounds.bottom - canvasBounds.top + margin) * dpr,
      };
    };

    const bandStrength = (nx: number, ny: number) => {
      const curve =
        clamp(0.78 - nx * 0.55 + Math.sin(nx * 2.4) * 0.05, 0.12, 0.92);
      const widthFactor = 0.14 + nx * 0.25;
      const centerDistance = Math.abs(ny - curve);
      const centerStrength = clamp(1 - centerDistance / widthFactor, 0, 1);
      const softened =
        centerStrength * centerStrength * (3 - 2 * centerStrength);

      const diagonalFade = smoothstep(0.05, 0.18, nx);
      const topFade = smoothstep(0.05, 0.28, 1 - ny);
      const baseGradient = smoothstep(0.12, 0.35, nx + (1 - ny) * 0.25);

      return clamp(softened * diagonalFade * topFade * baseGradient, 0, 1);
    };

    const generateDots = () => {
      const baseSpacing = 32;
      const columns = Math.max(18, Math.round(width / baseSpacing));
      const rows = Math.max(14, Math.round(height / baseSpacing));
      const dots: Dot[] = [];

      const jitterScaleX = 0.18 / columns;
      const jitterScaleY = 0.18 / rows;

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < columns; cx++) {
          const nx =
            (columns <= 1 ? 0.5 : cx / (columns - 1)) +
            (Math.random() - 0.5) * jitterScaleX;
          const ny =
            (rows <= 1 ? 0.5 : cy / (rows - 1)) +
            (Math.random() - 0.5) * jitterScaleY;

          const clampedNx = clamp(nx, 0.02, 0.98);
          const clampedNy = clamp(ny, 0.02, 0.98);
          const strength = bandStrength(clampedNx, clampedNy);
          if (strength < 0.05) continue;

          const size = 1.2 + Math.random() * 1.5;
          const opacity = 0.25 + Math.random() * 0.4;
          const flowAngle =
            Math.atan2(0.9 - clampedNy, clampedNx - 0.25) +
            Math.sin(clampedNx * 6 - clampedNy * 4) * 0.35;

          dots.push({
            nx: clampedNx,
            ny: clampedNy,
            size,
            opacity,
            offsetX: Math.random() * Math.PI * 2,
            offsetY: Math.random() * Math.PI * 2,
            flowAngle,
            bandStrength: strength,
          });
        }
      }

      dotsRef.current = dots;
    };

    const resizeCanvas = () => {
      const bounds = heroBody.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      const nextWidth = Math.max(1, Math.round(width * dpr));
      const nextHeight = Math.max(1, Math.round(height * dpr));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Reset transform matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      generateDots();
      resetPointer();
      updateExclusionRect();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(heroBody);

    const textObserver =
      textBlockRef.current && "ResizeObserver" in window
        ? new ResizeObserver(() => updateExclusionRect())
        : null;
    if (textObserver && textBlockRef.current) {
      textObserver.observe(textBlockRef.current);
    }

    const handleWindowResize = () => {
      updateExclusionRect();
    };
    window.addEventListener("resize", handleWindowResize);

    const mapPointer = (event: PointerEvent) => {
      const bounds = heroBody.getBoundingClientRect();
      pointerTarget.x = (event.clientX - bounds.left) * dpr;
      pointerTarget.y = (event.clientY - bounds.top) * dpr;
    };

    const handlePointerMove = (event: PointerEvent) => {
      mapPointer(event);
    };

    const handlePointerLeave = () => {
      resetPointer();
    };

    heroBody.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    heroBody.addEventListener("pointerdown", handlePointerMove, {
      passive: true,
    });
    heroBody.addEventListener("pointerleave", handlePointerLeave);

    resizeCanvas();

    let animationFrameId: number;
    const render = (timestamp: number) => {
      animationFrameId = window.requestAnimationFrame(render);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "#1f1f1f";

      pointer.x += (pointerTarget.x - pointer.x) * 0.08;
      pointer.y += (pointerTarget.y - pointer.y) * 0.08;

      const time = timestamp * 0.001;
      const dots = dotsRef.current;
      const pointerRadius = Math.min(canvasWidth, canvasHeight) * 0.35;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const baseX = dot.nx * canvasWidth;
        const baseY = dot.ny * canvasHeight;

        const wave1 =
          Math.sin(baseX * 0.0045 + baseY * 0.0032 + time * 0.35 + dot.offsetX) *
          4;
        const wave2 =
          Math.sin(baseX * 0.0025 - baseY * 0.0042 + time * 0.25 + dot.offsetY) *
          3;

        const flowInfluence =
          Math.sin(time * 0.45 + dot.flowAngle) *
          (1.2 + Math.cos(dot.flowAngle) * 0.4);

        const waveX = (wave1 + Math.cos(dot.flowAngle) * flowInfluence) * motionScale;
        const waveY = (wave2 + Math.sin(dot.flowAngle) * flowInfluence) * motionScale;

        const dxPointer = baseX - pointer.x;
        const dyPointer = baseY - pointer.y;
        const pointerDistance = Math.hypot(dxPointer, dyPointer);
        const rawPointerStrength = Math.max(
          0,
          1 - pointerDistance / Math.max(pointerRadius, 1),
        );
        const pointerStrength = rawPointerStrength * rawPointerStrength;

        const pointerX = dxPointer * pointerStrength * 0.08 * motionScale;
        const pointerY = dyPointer * pointerStrength * 0.08 * motionScale;

        const dx = waveX + pointerX;
        const dy = waveY + pointerY;
        const displacement = Math.min(Math.hypot(dx, dy), 18);
        const angle = dx === 0 && dy === 0 ? 0 : Math.atan2(dy, dx);
        const stretch = 1 + displacement * 0.12;

        const drawX = baseX + dx;
        const drawY = baseY + dy;

        if (
          exclusionRect &&
          drawX >= exclusionRect.left &&
          drawX <= exclusionRect.right &&
          drawY >= exclusionRect.top &&
          drawY <= exclusionRect.bottom
        ) {
          continue;
        }

        ctx.save();
        ctx.globalAlpha = dot.opacity * dot.bandStrength;
        ctx.translate(drawX, drawY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          dot.size * stretch * motionScale * dpr,
          (dot.size / stretch) * motionScale * dpr,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();
      }
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      heroBody.removeEventListener("pointermove", handlePointerMove);
      heroBody.removeEventListener("pointerdown", handlePointerMove);
      heroBody.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleWindowResize);
      resizeObserver.disconnect();
      if (textObserver) {
        textObserver.disconnect();
      }
      if (prefersReducedMotion.removeEventListener) {
        prefersReducedMotion.removeEventListener("change", handleMotionChange);
      } else if (prefersReducedMotion.removeListener) {
        prefersReducedMotion.removeListener(handleMotionChange);
      }
    };
  }, []);

  return (
    <section className="hero hero--concept" data-hero-variant="v2">
      <div className="hero-inner">
        <div className="hero-body" ref={heroBodyRef}>
          <div className="hero-canvas" aria-hidden="true">
            <canvas ref={canvasRef} />
          </div>

          <div className="hero-content">
            <p className="hero-variant-tag">{HERO_VARIANT_LABEL}</p>
            <p className="hero-kicker">From the founders of bhm.com.au</p>

            <div className="hero-text-block" ref={textBlockRef}>
              <h1 className="hero-title">
                Real execution.
                <br />
                <span className="hero-no-wrap">Not agency theatre.</span>
              </h1>
              <p className="subcopy">
                Marketing, creative and builds from operators in the trenches, not
                agencies on the sidelines.
              </p>
            </div>

            <div className="hero-actions">
              <a href="#services" className="btn btn-primary">
                See how we can help
              </a>
              <a
                href="https://bhm.com.au"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                See our brand &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

