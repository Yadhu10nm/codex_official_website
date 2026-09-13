import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFallback from './SceneFallback';

// =========================================================================
// HELPER: Generate High-Res Code Snippet Canvas Texture (100% Offline & Clean)
// =========================================================================
function createCodeSnippetTexture(title, lines) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  // 1. Dark Glass Card Body
  ctx.fillStyle = 'rgba(10, 15, 28, 0.94)';
  ctx.roundRect(10, 10, 580, 340, 20);
  ctx.fill();

  // 2. Card Border
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 3. Top Title Bar
  ctx.fillStyle = 'rgba(18, 26, 46, 0.9)';
  ctx.roundRect(10, 10, 580, 56, [20, 20, 0, 0]);
  ctx.fill();

  // 4. macOS Window Action Dots
  ctx.fillStyle = '#ef4444'; // Red
  ctx.beginPath();
  ctx.arc(36, 38, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f59e0b'; // Yellow
  ctx.beginPath();
  ctx.arc(58, 38, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#10b981'; // Green
  ctx.beginPath();
  ctx.arc(80, 38, 7, 0, Math.PI * 2);
  ctx.fill();

  // 5. Title Text
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 18px Courier, monospace';
  ctx.fillText(title, 110, 44);

  // 6. Code Lines with Syntax Coloring
  ctx.font = '22px Courier, monospace';
  lines.forEach((item, index) => {
    const y = 110 + index * 44;
    // Line numbers
    ctx.fillStyle = '#475569';
    ctx.fillText(`${index + 1}`, 30, y);

    // Code tokens
    let currentX = 75;
    item.tokens.forEach((token) => {
      ctx.fillStyle = token.color;
      ctx.fillText(token.text, currentX, y);
      currentX += ctx.measureText(token.text).width;
    });
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

// =========================================================================
// 1. FLOATING 3D CODE SNIPPET CARDS
// =========================================================================
function FloatingCodeSnippet({ title, lines, orbitRadius, orbitSpeed, heightOffset, scale = 1 }) {
  const meshRef = useRef();
  const texture = useMemo(() => createCodeSnippetTexture(title, lines), [title, lines]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Revolution around scene
      meshRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
      meshRef.current.position.z = Math.sin(time * orbitSpeed) * (orbitRadius * 0.75) - 3;
      meshRef.current.position.y = heightOffset + Math.sin(time * orbitSpeed * 1.4) * 0.5;

      // Gentle floating tilt & self-rotation
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.25;
      meshRef.current.rotation.x = Math.cos(time * 0.4) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[2.5, 1.5]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

// =========================================================================
// 2. 3D CODE BRACKETS: < / >
// =========================================================================
function CodeBrackets({ orbitRadius = 4.2, orbitSpeed = 0.35, heightOffset = 1.6, scale = 0.9 }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(time * orbitSpeed + 1.2) * orbitRadius;
      groupRef.current.position.z = Math.cos(time * orbitSpeed + 1.2) * (orbitRadius * 0.7) - 2.5;
      groupRef.current.position.y = heightOffset + Math.cos(time * orbitSpeed * 1.2) * 0.6;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.7;
      innerRef.current.rotation.x += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={innerRef}>
        {/* Left Bracket < */}
        <group position={[-1.1, 0, 0]}>
          <mesh position={[0.25, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.14, 0.14]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0.25, -0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.14, 0.14]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.4} metalness={0.8} />
          </mesh>
        </group>

        {/* Slash / */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.14, 1.4, 0.14]} />
          <meshStandardMaterial color="#2563eb" emissive="#3b82f6" emissiveIntensity={0.5} metalness={0.9} />
        </mesh>

        {/* Right Bracket > */}
        <group position={[1.1, 0, 0]}>
          <mesh position={[-0.25, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.14, 0.14]} />
            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[-0.25, -0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.14, 0.14]} />
            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.4} metalness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// =========================================================================
// 3. 3D CURLY BRACES: { }
// =========================================================================
function CurlyBraces({ orbitRadius = 4.8, orbitSpeed = 0.28, heightOffset = -1.5, scale = 0.85 }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time * orbitSpeed + Math.PI) * orbitRadius;
      groupRef.current.position.z = Math.sin(time * orbitSpeed + Math.PI) * (orbitRadius * 0.75) - 3.2;
      groupRef.current.position.y = heightOffset + Math.sin(time * orbitSpeed * 1.5) * 0.5;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.6;
      innerRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={innerRef}>
        {/* Left Curly Brace { */}
        <group position={[-0.8, 0, 0]}>
          <mesh position={[0, 0.45, 0]}>
            <torusGeometry args={[0.45, 0.08, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, -0.45, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.45, 0.08, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[-0.2, 0, 0]}>
            <boxGeometry args={[0.16, 0.16, 0.16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
          </mesh>
        </group>

        {/* Right Curly Brace } */}
        <group position={[0.8, 0, 0]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.45, 0]}>
            <torusGeometry args={[0.45, 0.08, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, -0.45, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.45, 0.08, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[-0.2, 0, 0]}>
            <boxGeometry args={[0.16, 0.16, 0.16]} />
            <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// =========================================================================
// 4. 3D ARROW FUNCTION & TERMINAL PROMPT: => & >_
// =========================================================================
function ArrowFunctionSymbol({ orbitRadius = 3.8, orbitSpeed = 0.32, heightOffset = -2.2, scale = 0.8 }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(time * orbitSpeed + 2.8) * orbitRadius;
      groupRef.current.position.z = Math.cos(time * orbitSpeed + 2.8) * (orbitRadius * 0.8) - 3.5;
      groupRef.current.position.y = heightOffset + Math.cos(time * orbitSpeed * 1.3) * 0.4;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.8;
      innerRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={innerRef}>
        {/* Equal Signs = */}
        <mesh position={[-0.4, 0.18, 0]}>
          <boxGeometry args={[0.9, 0.12, 0.12]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.4, -0.18, 0]}>
          <boxGeometry args={[0.9, 0.12, 0.12]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>

        {/* Arrow Tip > */}
        <mesh position={[0.4, 0.25, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.65, 0.12, 0.12]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.4, -0.25, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.65, 0.12, 0.12]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// =========================================================================
// 5. 3D GIT COMMIT PIPELINE
// =========================================================================
function GitCommitPipeline({ orbitRadius = 5.2, orbitSpeed = 0.22, heightOffset = 0.4, scale = 0.85 }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time * orbitSpeed + 0.8) * orbitRadius;
      groupRef.current.position.z = Math.sin(time * orbitSpeed + 0.8) * (orbitRadius * 0.7) - 3.8;
      groupRef.current.position.y = heightOffset + Math.sin(time * orbitSpeed * 1.1) * 0.5;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.5;
      innerRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={innerRef}>
        {/* Main Branch Pipeline */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 2.8, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Feature Branch */}
        <mesh position={[0.4, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 16]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>

        {/* Commit 1: Green (main) */}
        <mesh position={[-1.1, 0, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
        </mesh>

        {/* Commit 2: Blue (merge) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>

        {/* Commit 3: Cyan (head) */}
        <mesh position={[1.1, 0, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.8} />
        </mesh>

        {/* Commit 4: Purple (feature) */}
        <mesh position={[0.8, 0.8, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#7c3aed" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// =========================================================================
// 6. AMBIENT CODING STARDUST PARTICLES
// =========================================================================
function CodingParticles({ count = 220 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const cCyan = new THREE.Color('#0284c7');
    const cIndigo = new THREE.Color('#3b82f6');
    const cEmerald = new THREE.Color('#10b981');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;

      const pick = Math.random();
      const col = pick < 0.4 ? cCyan : pick < 0.7 ? cIndigo : cEmerald;
      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }
    return [pos, cols];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// =========================================================================
// MASTER CODING UNIVERSE 3D BACKGROUND
// =========================================================================
export default function CodingUniverse3D() {
  return (
    <div
      className="coding-universe-3d"
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
          camera={{ position: [0, 0, 9], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[6, 8, 8]} intensity={1.4} color="#ffffff" />
          <directionalLight position={[-6, -4, -2]} intensity={0.8} color="#38bdf8" />
          <pointLight position={[0, 3, 2]} intensity={1.2} color="#0284c7" />

          {/* 1. CODE SNIPPET 1: JavaScript async / await */}
          <FloatingCodeSnippet
            title="kernel.js"
            lines={[
              { tokens: [{ text: 'const ', color: '#38bdf8' }, { text: 'codex = ', color: '#f8fafc' }, { text: 'async ', color: '#818cf8' }, { text: '() => {', color: '#f8fafc' }] },
              { tokens: [{ text: '  await ', color: '#38bdf8' }, { text: 'build', color: '#facc15' }, { text: '(future);', color: '#f8fafc' }] },
              { tokens: [{ text: '  return ', color: '#ec4899' }, { text: 'Squad.deploy();', color: '#10b981' }] },
              { tokens: [{ text: '};', color: '#f8fafc' }] },
            ]}
            orbitRadius={4.6}
            orbitSpeed={0.24}
            heightOffset={1.8}
            scale={0.92}
          />

          {/* 2. CODE SNIPPET 2: Python / AI model */}
          <FloatingCodeSnippet
            title="model.py"
            lines={[
              { tokens: [{ text: 'def ', color: '#38bdf8' }, { text: 'innovate', color: '#facc15' }, { text: '(dataset):', color: '#f8fafc' }] },
              { tokens: [{ text: '    weights = ', color: '#f8fafc' }, { text: 'neural.fit()', color: '#38bdf8' }] },
              { tokens: [{ text: '    return ', color: '#ec4899' }, { text: 'weights.optimize()', color: '#10b981' }] },
            ]}
            orbitRadius={4.9}
            orbitSpeed={0.2}
            heightOffset={-1.8}
            scale={0.88}
          />

          {/* 3. CODE SNIPPET 3: Terminal bash script */}
          <FloatingCodeSnippet
            title="terminal.sh"
            lines={[
              { tokens: [{ text: '$ ', color: '#10b981' }, { text: 'git commit -m "feat: launch"', color: '#38bdf8' }] },
              { tokens: [{ text: '$ ', color: '#10b981' }, { text: 'npm run codex:production', color: '#facc15' }] },
              { tokens: [{ text: '✓ 100% build deployed successfully', color: '#10b981' }] },
            ]}
            orbitRadius={4.2}
            orbitSpeed={0.28}
            heightOffset={-0.2}
            scale={0.84}
          />

          {/* 4. 3D Code Brackets: < / > */}
          <CodeBrackets orbitRadius={3.9} orbitSpeed={0.34} heightOffset={1.2} scale={0.9} />

          {/* 5. 3D Curly Braces: { } */}
          <CurlyBraces orbitRadius={4.4} orbitSpeed={0.3} heightOffset={-2.4} scale={0.85} />

          {/* 6. 3D Arrow Function Symbol: => */}
          <ArrowFunctionSymbol orbitRadius={3.6} orbitSpeed={0.38} heightOffset={-1.2} scale={0.8} />

          {/* 7. 3D Git Commit Pipeline */}
          <GitCommitPipeline orbitRadius={5.1} orbitSpeed={0.23} heightOffset={0.6} scale={0.85} />

          {/* 8. Ambient Binary Stardust */}
          <CodingParticles count={220} />
        </Canvas>
      </Suspense>
    </div>
  );
}
