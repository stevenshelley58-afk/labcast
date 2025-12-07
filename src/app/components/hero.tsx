"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Button } from "@/ui/Button";

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
  amountX: number;
  amountY: number;
};

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const sceneRef = useRef<SceneState | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = backgroundRef.current;
    if (!canvas || !container) return;

    const SEPARATION = 26;
    const AMOUNTX = 110;
    const AMOUNTY = 75;

    const getIsMobile = () => window.innerWidth < 768;
    const getAmountX = () =>
      getIsMobile() ? Math.floor(AMOUNTX * 0.6) : AMOUNTX;
    const getAmountY = () =>
      getIsMobile() ? Math.floor(AMOUNTY * 0.6) : AMOUNTY;

    const getSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || 640;
      return { width, height };
    };

    let { width, height } = getSize();
    const amountX = getAmountX();
    const amountY = getAmountY();

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      1,
      10000,
    );
    camera.position.set(420, 520, 1200);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f7f7f7");

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
      color: 0x404040,
      size: 4.0,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(width, height);

    const handleResize = () => {
      const nextSize = getSize();
      width = nextSize.width;
      height = nextSize.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      sceneRef.current.targetMouseX = event.clientX - centerX;
      sceneRef.current.targetMouseY = event.clientY - centerY;
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
    <section className="relative isolate overflow-hidden bg-canvas pb-20 sm:pb-32">
      <div ref={backgroundRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(13,13,13,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(64,64,64,0.08),transparent_42%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] w-full max-w-5xl flex-col items-start gap-10 px-6 pt-20 md:pt-24 lg:pt-28 text-left">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-text-ink sm:text-5xl lg:text-6xl">
            Real execution.
            <br />
            <span className="text-foreground-soft">Not agency theatre.</span>
          </h1>
          <p className="text-lg leading-relaxed text-text-subtle max-w-3xl">
            Marketing, creative, and builds from operators in the trenches, not agencies on the sidelines.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button as="a" href="#services" size="lg">
            See how we can help
          </Button>
        </div>

      </div>
    </section>
  );
}
