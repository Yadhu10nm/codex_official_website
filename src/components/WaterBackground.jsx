import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * WaterBackground Component
 * 
 * Creates a serene, ultra-clean white/off-white Three.js water surface.
 * Features:
 * - Crystal-clear water over a pristine white / soft pale-blue basin
 * - Gentle realistic caustic light refraction and slow wave swells
 * - Smooth mouse ripple disturbances that organically dissipate
 * - Subtle scroll-based light and depth shift
 * - Maximum readability: background brightness stays 95% - 100% white
 * - Graceful CSS fallback for environments without WebGL
 * - Respects prefers-reduced-motion and cleans up all GPU resources
 */
export default function WaterBackground() {
  const containerRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // 1. Check WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // 2. Preferences & reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 3. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1.0);
    container.appendChild(renderer.domElement);

    // 4. Ripple Management
    const MAX_RIPPLES = 8;
    // Array of [x, y, birthTime, strength]
    const ripples = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
      ripples.push(new THREE.Vector4(0, 0, -999, 0));
    }
    let rippleIndex = 0;

    const addRipple = (x, y, strength = 0.5) => {
      const currentTime = performance.now() * 0.001;
      // Normalised coordinates [0, 1]
      ripples[rippleIndex].set(x, y, currentTime, strength);
      rippleIndex = (rippleIndex + 1) % MAX_RIPPLES;
    };

    // 5. Shader Material
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth * dpr, window.innerHeight * dpr) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_mouse_active: { value: 0.0 },
      u_scroll: { value: 0 },
      u_ripples: { value: ripples },
      u_reduced_motion: { value: prefersReducedMotion ? 1.0 : 0.0 },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouse_active;
      uniform float u_scroll;
      uniform vec4 u_ripples[8];
      uniform float u_reduced_motion;

      // Fast procedural pseudo-noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // Smooth wave height function
      float waterHeight(vec2 uv, float t) {
        float h = 0.0;
        
        // Broad gentle swells (slow, oceanic)
        h += sin(uv.x * 3.0 + t * 0.42 + cos(uv.y * 2.2 + t * 0.3)) * 0.024;
        h += cos(uv.y * 3.6 - t * 0.38 + sin(uv.x * 2.5 - t * 0.2)) * 0.020;
        
        // Gentle cross-ripples
        h += sin((uv.x + uv.y * 0.8) * 6.0 + t * 0.55) * 0.012;
        h += cos((uv.x * 1.2 - uv.y * 0.9) * 7.5 - t * 0.48) * 0.009;

        // Subtle scroll reaction
        h += sin(uv.y * 4.5 + u_scroll * 2.2) * 0.008;

        // Interactive mouse ripples
        for (int i = 0; i < 8; i++) {
          vec4 rip = u_ripples[i];
          float age = t - rip.z;
          if (age > 0.0 && age < 3.2) {
            float dist = length(uv - rip.xy);
            float radius = age * 0.32; // expanding ripple ring
            float distFromRing = abs(dist - radius);
            
            // Damped sinusoidal ripple packet
            float wave = sin(distFromRing * 45.0 - age * 8.0) * exp(-distFromRing * 35.0);
            // Dissipate with age and distance
            wave *= exp(-age * 1.25) * exp(-dist * 1.8) * rip.w;
            h += wave * 0.022;
          }
        }

        // Live cursor disturbance
        if (u_mouse_active > 0.01) {
          float mouseDist = length(uv - u_mouse);
          float cursorWave = sin(mouseDist * 32.0 - t * 4.5) * exp(-mouseDist * 16.0);
          h += cursorWave * 0.012 * u_mouse_active;
        }

        return h;
      }

      void main() {
        // Adjust for aspect ratio
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = vUv;
        vec2 aspectUv = vec2(uv.x * aspect, uv.y);

        float t = u_time * (u_reduced_motion > 0.5 ? 0.05 : 1.0);

        // Compute surface normal via finite difference gradient
        float eps = 0.004;
        float hL = waterHeight(aspectUv - vec2(eps, 0.0), t);
        float hR = waterHeight(aspectUv + vec2(eps, 0.0), t);
        float hD = waterHeight(aspectUv - vec2(0.0, eps), t);
        float hU = waterHeight(aspectUv + vec2(0.0, eps), t);
        
        vec2 grad = vec2(hR - hL, hU - hD) / (2.0 * eps);

        // Water surface normal
        vec3 normal = normalize(vec3(-grad * 1.8, 1.0));

        // Lighting vectors (soft daylight from top-left)
        vec3 lightDir = normalize(vec3(-0.35, 0.65, 0.85));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(lightDir + viewDir);

        // Gentle specular glint (pure soft white, very low intensity)
        float spec = pow(max(dot(normal, halfDir), 0.0), 24.0) * 0.09;

        // Subtle caustic refraction focus (divergence of normal)
        float curvature = (hR + hL + hU + hD - 4.0 * waterHeight(aspectUv, t)) / (eps * eps);
        float caustics = clamp(curvature * 0.0006 + 0.5, 0.0, 1.0);
        caustics = pow(caustics, 3.0) * 0.05;

        // Base pristine white canvas with an ultra-faint cool gradient
        // Top: pure white (#ffffff), Bottom: hint of crystal mineral white (#f4f9fd)
        vec3 baseWhite = mix(
          vec3(1.0, 1.0, 1.0),
          vec3(0.965, 0.982, 0.995),
          uv.y
        );

        // Very faint water refraction tint (barely perceptible pale cyan/aqua)
        vec3 waterTint = vec3(0.02, 0.06, 0.10) * grad.y * 0.6;

        // Composite the pristine water surface
        vec3 finalColor = baseWhite + vec3(spec) + vec3(caustics) - waterTint;

        // Guaranteed ultra-bright & calm (never dark, 95% - 100% luminance)
        finalColor = clamp(finalColor, 0.94, 1.0);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 6. Interaction Listeners
    let lastMouseX = 0.5;
    let lastMouseY = 0.5;
    let lastRippleTime = 0;
    let mouseActive = 0.0;

    const handleMouseMove = (e) => {
      const normX = e.clientX / window.innerWidth;
      const normY = 1.0 - (e.clientY / window.innerHeight); // Invert for GL UV
      const aspect = window.innerWidth / window.innerHeight;

      uniforms.u_mouse.value.set(normX * aspect, normY);
      mouseActive = 1.0;

      // Calculate movement speed
      const dx = normX - lastMouseX;
      const dy = normY - lastMouseY;
      const dist = Math.hypot(dx, dy);

      const now = performance.now();
      // Add a subtle ripple if moved enough and throttled by 100ms
      if (dist > 0.03 && now - lastRippleTime > 120) {
        addRipple(normX * aspect, normY, Math.min(dist * 2.5, 0.6));
        lastRippleTime = now;
      }

      lastMouseX = normX;
      lastMouseY = normY;
    };

    const handleClick = (e) => {
      const normX = e.clientX / window.innerWidth;
      const normY = 1.0 - (e.clientY / window.innerHeight);
      const aspect = window.innerWidth / window.innerHeight;
      addRipple(normX * aspect, normY, 0.85);
    };

    let targetScroll = 0;
    let currentScroll = 0;

    const handleScroll = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      targetScroll = window.scrollY / maxScroll;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const currentDpr = Math.min(window.devicePixelRatio || 1, 1.5);

      renderer.setPixelRatio(currentDpr);
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width * currentDpr, height * currentDpr);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      uniforms.u_time.value = elapsedTime;

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.08;
      uniforms.u_scroll.value = currentScroll;

      // Smooth mouse decay
      mouseActive *= 0.95;
      uniforms.u_mouse_active.value = mouseActive;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="water-canvas-container"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: '#ffffff',
      }}
      aria-hidden="true"
    >
      {/* Graceful CSS Water Caustics Fallback if WebGL is disabled */}
      {!webglSupported && (
        <div
          className="water-css-fallback"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 20%, #ffffff 0%, #f4f9fd 70%, #edf5fc 100%)',
            opacity: 0.9,
          }}
        />
      )}
    </div>
  );
}
