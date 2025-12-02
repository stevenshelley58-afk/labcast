"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneState = {
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
};

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const sceneRef = useRef<SceneState | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const SEPARATION = 26;
    const AMOUNTX = 110;
    const AMOUNTY = 75;

    const getIsMobile = () => window.innerWidth < 768;
    const getAmountX = () =>
      getIsMobile() ? Math.floor(AMOUNTX * 0.6) : AMOUNTX;
    const getAmountY = () =>
      getIsMobile() ? Math.floor(AMOUNTY * 0.6) : AMOUNTY;

    let halfX = window.innerWidth / 2;
    let halfY = window.innerHeight / 2;

    const amountX = getAmountX();
    const amountY = getAmountY();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000,
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
      canvas,
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

    const handleMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current) return;

      sceneRef.current.targetMouseX = event.clientX - halfX;
      sceneRef.current.targetMouseY = event.clientY - halfY;
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

    const render = () => {
      if (!sceneRef.current) return;

      const {
        camera: currentCamera,
        scene: currentScene,
        renderer: currentRenderer,
        particles: currentParticles,
        mouseX: currentMouseX,
        mouseY: currentMouseY,
        targetMouseX: currentTargetMouseX,
        targetMouseY: currentTargetMouseY,
      } = sceneRef.current;

      sceneRef.current.mouseX +=
        (currentTargetMouseX - currentMouseX) * 0.04;
      sceneRef.current.mouseY +=
        (currentTargetMouseY - currentMouseY) * 0.03;

      currentCamera.position.x = 420 + sceneRef.current.mouseX * 0.25;
      currentCamera.position.y = 520 - sceneRef.current.mouseY * 0.12;
      currentCamera.lookAt(currentScene.position);

      const positionArray =
        currentParticles.geometry.attributes.position.array as Float32Array;

      let positionIndex = 0;
      for (let ix = 0; ix < sceneRef.current.amountX; ix++) {
        for (let iy = 0; iy < sceneRef.current.amountY; iy++) {
          const wave1 =
            Math.sin(ix * 0.18 + sceneRef.current.count * 0.4 + iy * 0.06) *
            32.0;
          const wave2 =
            Math.sin(iy * 0.22 + sceneRef.current.count * 0.25) * 22.0;
          const wave3 =
            Math.cos((ix + iy) * 0.12 + sceneRef.current.count * 0.35) * 18.0;

          positionArray[positionIndex + 1] = wave1 + wave2 + wave3;
          positionIndex += 3;
        }
      }

      currentParticles.geometry.attributes.position.needsUpdate = true;
      currentRenderer.render(currentScene, currentCamera);

      sceneRef.current.count += 0.005;
    };

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      render();
    };

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
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-nav">
          <header className="nav">
            <div className="nav-left">Labcast</div>

            <nav className="nav-center">
              <a href="/framework">Framework</a>
              <a href="#services">Services</a>
              <a href="/pricing">Pricing</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="nav-right">
              <a href="#contact">Get in touch</a>
            </div>
          </header>
        </div>

        <div className="hero-body">
          <div className="hero-canvas" aria-hidden="true">
            <canvas id="waveCanvas" ref={canvasRef}></canvas>
          </div>

          <div className="hero-dot-fade" aria-hidden="true" />

          <div className="hero-content">
            <p className="hero-kicker">From the founders of bhm.com.au</p>

            <div className="hero-text-block">
              <h1 className="hero-title">
                Real execution.
                <br />
                <span className="hero-no-wrap">Not agency theatre.</span>
              </h1>
              <p className="subcopy">
                Marketing, creative and builds from operators in the trenches,
                not agencies on the sidelines.
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
