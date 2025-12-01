"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero section component with animated Three.js wave canvas.
 * 
 * @example
 * ```tsx
 * <Hero />
 * ```
 */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const sceneRef = useRef<{
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    count: number;
    mouseX: number;
    mouseY: number;
    targetMouseX: number;
    targetMouseY: number;
    halfX: number;
    halfY: number;
    amountX: number;
    amountY: number;
  } | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const SEPARATION = 26;
    const AMOUNTX = 110;
    const AMOUNTY = 75;

    // Reduce particles on mobile for performance
    const getIsMobile = () => window.innerWidth < 768;
    const getAmountX = () => (getIsMobile() ? Math.floor(AMOUNTX * 0.6) : AMOUNTX);
    const getAmountY = () => (getIsMobile() ? Math.floor(AMOUNTY * 0.6) : AMOUNTY);

    let halfX = window.innerWidth / 2;
    let halfY = window.innerHeight / 2;

    const amountX = getAmountX();
    const amountY = getAmountY();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(420, 520, 1200);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);

    const numParticles = amountX * amountY;
    const positions = new Float32Array(numParticles * 3);

    let i = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        const baseX = ix * SEPARATION - (amountX * SEPARATION) / 2;
        const baseZ = iy * SEPARATION - (amountY * SEPARATION) / 2;

        const jitterX = (Math.random() - 0.5) * 10;
        const jitterZ = (Math.random() - 0.5) * 10;

        positions[i] = baseX + jitterX;
        positions[i + 1] = 0;
        positions[i + 2] = baseZ + jitterZ;

        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x555555,
      size: 4.0,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const handleResize = () => {
      halfX = window.innerWidth / 2;
      halfY = window.innerHeight / 2;

      if (sceneRef.current) {
        sceneRef.current.halfX = halfX;
        sceneRef.current.halfY = halfY;
      }

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;

      sceneRef.current.targetMouseX = e.clientX - halfX;
      sceneRef.current.targetMouseY = e.clientY - halfY;
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousemove", handleMouseMove);

    sceneRef.current = {
      camera,
      scene,
      renderer,
      particles,
      count: 0,
      mouseX: 0,
      mouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      halfX,
      halfY,
      amountX,
      amountY,
    };

    function render() {
      if (!sceneRef.current) return;

      const {
        camera,
        scene,
        renderer,
        particles,
        mouseX: currentMouseX,
        mouseY: currentMouseY,
        targetMouseX: currentTargetMouseX,
        targetMouseY: currentTargetMouseY,
      } = sceneRef.current;

      sceneRef.current.mouseX +=
        (currentTargetMouseX - currentMouseX) * 0.04;
      sceneRef.current.mouseY +=
        (currentTargetMouseY - currentMouseY) * 0.03;

      camera.position.x = 420 + sceneRef.current.mouseX * 0.25;
      camera.position.y = 520 - sceneRef.current.mouseY * 0.12;
      camera.lookAt(scene.position);

      const positions = particles.geometry.attributes.position.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < sceneRef.current.amountX; ix++) {
        for (let iy = 0; iy < sceneRef.current.amountY; iy++) {
          const wave1 =
            Math.sin(ix * 0.18 + sceneRef.current.count * 0.4 + iy * 0.06) *
            32.0;
          const wave2 =
            Math.sin(iy * 0.22 + sceneRef.current.count * 0.25) * 22.0;
          const wave3 =
            Math.cos((ix + iy) * 0.12 + sceneRef.current.count * 0.35) * 18.0;

          positions[i + 1] = wave1 + wave2 + wave3;
          i += 3;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);

      sceneRef.current.count += 0.005;
    }

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      render();
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background: #f8f8f8;
        }

        #waveCanvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 0;
        }

        .hero-fade-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            ellipse 900px 700px at 7vw 320px,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 25%,
            rgba(255, 255, 255, 0.5) 40%,
            rgba(255, 255, 255, 0.8) 55%,
            rgba(255, 255, 255, 0.95) 70%,
            rgba(255, 255, 255, 1) 85%
          );
        }

        /* NAV */
        .nav {
          position: absolute;
          top: 18px;
          left: 7vw;
          right: 7vw;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
        }

        .nav-left {
          font-weight: 600;
        }

        .nav-center {
          display: flex;
          gap: 24px;
          color: #333;
        }

        .nav-center a {
          color: inherit;
          text-decoration: none;
        }

        .nav-right a {
          border-radius: 999px;
          padding: 7px 18px;
          border: 1px solid #111;
          background: #111;
          color: #fff;
          font-size: 13px;
          text-decoration: none;
        }

        /* HERO CONTENT */
        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 760px;
          padding-top: 150px;
          padding-left: 7vw;
          padding-right: 7vw;
          padding-bottom: 40px;
          background: #ffffff;
          border-radius: 0;
        }

        .eyebrow {
          font-size: 13px;
          color: #666;
          margin-bottom: 18px;
        }

        .hero-title {
          font-size: 64px;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 0 22px;
        }

        .hero-title span {
          display: block;
          white-space: nowrap;
        }

        .subcopy {
          font-size: 18px;
          color: #444;
          max-width: 480px;
          margin-bottom: 30px;
        }

        .btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary {
          border-radius: 999px;
          padding: 11px 24px;
          font-size: 15px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #111;
        }

        .btn-primary {
          background: #111;
          color: #fff;
        }

        .btn-secondary {
          background: #ffffff;
          color: #111;
        }

        .btn-secondary span {
          margin-left: 6px;
        }

        @media (max-width: 900px) {
          .nav {
            left: 16px;
            right: 16px;
          }

          .nav-center {
            display: none;
          }

          .hero-inner {
            padding-top: 120px;
            padding-left: 16px;
            padding-right: 16px;
            padding-bottom: 40px;
          }

          .hero-fade-overlay {
            background: radial-gradient(
              ellipse 700px 600px at 16px 280px,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 25%,
              rgba(255, 255, 255, 0.5) 40%,
              rgba(255, 255, 255, 0.8) 55%,
              rgba(255, 255, 255, 0.95) 70%,
              rgba(255, 255, 255, 1) 85%
            );
          }

          .hero-title {
            font-size: 44px;
          }

          .hero-title span {
            white-space: normal;
          }
        }

        @media (max-width: 600px) {
          .nav-right a {
            font-size: 12px;
            padding: 6px 14px;
          }

          .hero-title {
            font-size: 34px;
          }

          .subcopy {
            font-size: 16px;
          }

          .btn-primary,
          .btn-secondary {
            font-size: 14px;
            padding: 10px 20px;
          }
        }
      `}</style>

      <section className="hero">
        <canvas id="waveCanvas" ref={canvasRef}></canvas>
        <div className="hero-fade-overlay"></div>

        {/* NAV */}
        <header className="nav">
          <div className="nav-left">Labcast</div>

          <nav className="nav-center">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-right">
            <a href="#contact">Get in touch</a>
          </div>
        </header>

        {/* HERO COPY */}
        <div className="hero-inner">
          <div className="eyebrow">From the founders of bhm.com.au</div>

          <h1 className="hero-title">
            <span>Real execution.</span>
            <span>Not agency theatre.</span>
          </h1>

          <p className="subcopy">
            Marketing, creative and builds from operators in the trenches, not agencies on the sidelines.
          </p>

          <div className="btn-row">
            <a href="#services" className="btn-primary">
              See how we can help
            </a>
            <a href="https://bhm.com.au" className="btn-secondary" target="_blank" rel="noopener noreferrer">
              See our brand <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

