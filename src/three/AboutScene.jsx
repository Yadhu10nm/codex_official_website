import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import TechLaptopScene from './TechLaptopScene';
import ParticleField from './ParticleField';
import SceneFallback from './SceneFallback';

export default function AboutScene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '380px', position: 'relative' }}>
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 1.2, 5.2], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-4, -2, -2]} intensity={0.5} color="#38bdf8" />
          <pointLight position={[0, 2, 2]} intensity={0.6} color="#818cf8" />

          <TechLaptopScene />
          <ParticleField count={80} speed={0.12} radius={10} />
        </Canvas>
      </Suspense>
    </div>
  );
}
