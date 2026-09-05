import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import InteractiveCore from './InteractiveCore';
import ParticleField from './ParticleField';
import SceneFallback from './SceneFallback';

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '440px' }}>
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          {/* Subtle Studio Lighting - No Blinding Neon */}
          <ambientLight intensity={0.65} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, -4, -2]} intensity={0.6} color="#38bdf8" />
          <pointLight position={[0, 4, 3]} intensity={0.8} color="#818cf8" />

          {/* Interactive 3D Nodes Core */}
          <InteractiveCore />

          {/* Ambient Floating Particle Dust */}
          <ParticleField count={160} speed={0.15} radius={14} />
        </Canvas>
      </Suspense>
    </div>
  );
}
