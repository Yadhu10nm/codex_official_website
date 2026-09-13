import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import InteractiveCore from './InteractiveCore';
import TechLaptopScene from './TechLaptopScene';
import ParticleField from './ParticleField';
import SceneFallback from './SceneFallback';

// Floating Geometric Crystal Artifact
function FloatingArtifact({ geometry, position, rotationSpeed, scale = 1, color = '#38bdf8', wireframe = false }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed[0];
      meshRef.current.rotation.y += delta * rotationSpeed[1];
      meshRef.current.rotation.z += delta * rotationSpeed[2];
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 1.2 + position[0]) * 0.0015;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'torus' && <torusGeometry args={[1.2, 0.08, 16, 64]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1.2, 1]} />}
      {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1.1, 0]} />}

      {wireframe ? (
        <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
      ) : (
        <meshPhysicalMaterial
          color="#0c1427"
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.8}
          transparent
          opacity={0.7}
        />
      )}
    </mesh>
  );
}

// Master Background Scene with Interactive Mouse & Float Inertia
function BackgroundSceneContent() {
  const rootGroupRef = useRef();
  const coreGroupRef = useRef();
  const laptopGroupRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Gentle global mouse parallax
    if (rootGroupRef.current) {
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.3;
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, targetX * 0.25, delta * 1.5);
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(rootGroupRef.current.rotation.x, -targetY * 0.2, delta * 1.5);
    }

    // Floating drift for the Core model
    if (coreGroupRef.current) {
      coreGroupRef.current.position.y = 1.2 + Math.sin(time * 0.6) * 0.35;
      coreGroupRef.current.position.x = 3.6 + Math.cos(time * 0.4) * 0.2;
    }

    // Floating drift for the Tech Laptop model
    if (laptopGroupRef.current) {
      laptopGroupRef.current.position.y = -1.8 + Math.sin(time * 0.7 + 2) * 0.3;
      laptopGroupRef.current.position.x = -3.8 + Math.cos(time * 0.5 + 1) * 0.25;
      laptopGroupRef.current.rotation.z = Math.sin(time * 0.4) * 0.08;
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* 1. FLOATING 3D CORE MODEL (Upper Right Drift) */}
      <group ref={coreGroupRef} position={[3.6, 1.2, -2]} scale={0.85}>
        <InteractiveCore />
      </group>

      {/* 2. FLOATING 3D TECH LAPTOP MODEL (Lower Left Drift) */}
      <group ref={laptopGroupRef} position={[-3.8, -1.8, -2.5]} scale={0.75}>
        <TechLaptopScene />
      </group>

      {/* 3. FLOATING AMBIENT GEOMETRIC ARTIFACTS IN 3D SPACE */}
      {/* Top Left Floating Torus Ring */}
      <FloatingArtifact
        geometry="torus"
        position={[-3.5, 3.2, -4]}
        rotationSpeed={[0.15, 0.2, 0.1]}
        scale={0.9}
        color="#38bdf8"
        wireframe
      />

      {/* Far Center-Left Crystalline Octahedron */}
      <FloatingArtifact
        geometry="octahedron"
        position={[-1.8, 1.8, -6]}
        rotationSpeed={[0.2, 0.25, 0.1]}
        scale={1.2}
        color="#818cf8"
      />

      {/* Far Right Geodesic Sphere */}
      <FloatingArtifact
        geometry="icosahedron"
        position={[4.5, -2.5, -4.5]}
        rotationSpeed={[0.1, 0.15, 0.2]}
        scale={1.1}
        color="#00f2fe"
        wireframe
      />

      {/* Deep Background Dodecahedron */}
      <FloatingArtifact
        geometry="dodecahedron"
        position={[0.5, -3.5, -7]}
        rotationSpeed={[0.08, 0.12, 0.05]}
        scale={1.4}
        color="#6366f1"
      />

      {/* 4. EXPANSIVE STARDUST PARTICLE FIELD */}
      <ParticleField count={260} speed={0.2} radius={26} />
    </group>
  );
}

export default function FloatingBackground3D() {
  return (
    <div
      className="floating-background-3d"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 9], fov: 48 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          {/* Subtle Studio Lighting to Illuminate Translucent Glass and Floating Models */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[6, 8, 6]} intensity={1.4} color="#ffffff" />
          <directionalLight position={[-6, -4, -3]} intensity={0.8} color="#38bdf8" />
          <pointLight position={[0, 3, 2]} intensity={0.9} color="#818cf8" />
          <pointLight position={[-4, -2, 0]} intensity={0.6} color="#00f2fe" />

          <BackgroundSceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}
