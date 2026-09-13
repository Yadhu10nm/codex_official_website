import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFallback from './SceneFallback';

// ==========================================
// 1. 3D CODE BRACKETS: < / >
// ==========================================
function CodeBrackets({ orbitRadius = 4.2, orbitSpeed = 0.35, heightOffset = 1.2, scale = 0.9 }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Revolution around scene
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
      groupRef.current.position.z = Math.sin(time * orbitSpeed) * (orbitRadius * 0.7) - 2;
      groupRef.current.position.y = heightOffset + Math.sin(time * orbitSpeed * 1.5) * 0.6;
    }

    // 2. Self-Rotation
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.8;
      innerRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={innerRef}>
        {/* Left Bracket: < */}
        <group position={[-1.1, 0, 0]}>
          <mesh position={[0.25, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.14, 0.14]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} emissive="#0284c7" emissiveIntensity={0.35} />
          </mesh>
          <mesh position={[0.25, -0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.14, 0.14]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} emissive="#0284c7" emissiveIntensity={0.35} />
          </mesh>
        </group>

        {/* Center Slash: / */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.14, 1.4, 0.14]} />
          <meshStandardMaterial color="#2563eb" metalness={0.9} roughness={0.15} emissive="#3b82f6" emissiveIntensity={0.4} />
        </mesh>

        {/* Right Bracket: > */}
        <group position={[1.1, 0, 0]}>
          <mesh position={[-0.25, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.14, 0.14]} />
            <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} emissive="#7c3aed" emissiveIntensity={0.35} />
          </mesh>
          <mesh position={[-0.25, -0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.14, 0.14]} />
            <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} emissive="#7c3aed" emissiveIntensity={0.35} />
          </mesh>
        </group>

        {/* Central Core Sparkle */}
        <pointLight color="#38bdf8" intensity={1.5} distance={3} />
      </group>
    </group>
  );
}

// ==========================================
// 2. 3D MICROCHIP / CPU PROCESSOR
// ==========================================
function MicrochipCPU({ orbitRadius = 4.8, orbitSpeed = 0.28, heightOffset = -1.6, scale = 0.85 }) {
  const groupRef = useRef();
  const chipRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Revolution around scene (counter-phase orbit)
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time * orbitSpeed + Math.PI) * orbitRadius;
      groupRef.current.position.z = Math.sin(time * orbitSpeed + Math.PI) * (orbitRadius * 0.75) - 3;
      groupRef.current.position.y = heightOffset + Math.cos(time * orbitSpeed * 1.3) * 0.5;
    }

    // 2. Self-Rotation
    if (chipRef.current) {
      chipRef.current.rotation.x += delta * 0.6;
      chipRef.current.rotation.y += delta * 0.5;
      chipRef.current.rotation.z += delta * 0.3;
    }
  });

  const pinPositions = [-0.6, -0.3, 0, 0.3, 0.6];

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={chipRef}>
        {/* Silicon Die Main Body */}
        <mesh>
          <boxGeometry args={[1.8, 0.25, 1.8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Top Metallic Heat Spreader with Glowing Core */}
        <mesh position={[0, 0.14, 0]}>
          <boxGeometry args={[1.3, 0.06, 1.3]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.95}
            roughness={0.1}
            emissive="#0284c7"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Glowing Center Node (The Microprocessor Core) */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.5]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.8} />
        </mesh>

        {/* Radiating Metallic Pins (4 Sides) */}
        {pinPositions.map((pos, idx) => (
          <React.Fragment key={idx}>
            {/* North Pins */}
            <mesh position={[pos, 0, 1.05]}>
              <boxGeometry args={[0.12, 0.08, 0.3]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* South Pins */}
            <mesh position={[pos, 0, -1.05]}>
              <boxGeometry args={[0.12, 0.08, 0.3]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* East Pins */}
            <mesh position={[1.05, 0, pos]}>
              <boxGeometry args={[0.3, 0.08, 0.12]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* West Pins */}
            <mesh position={[-1.05, 0, pos]}>
              <boxGeometry args={[0.3, 0.08, 0.12]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
            </mesh>
          </React.Fragment>
        ))}

        {/* Orbiting Binary Bit Satellites */}
        <mesh position={[1.4, 0.4, 0.8]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-1.4, -0.4, -0.8]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// ==========================================
// 3. 3D ROTATING & REVOLVING TECH PLANET (WITH RINGS & MOONS)
// ==========================================
function TechPlanet({
  orbitRadius = 5.6,
  orbitSpeed = 0.22,
  heightOffset = 0.2,
  planetRadius = 1.35,
  planetColor = '#0284c7',
  scale = 1,
}) {
  const planetOrbitGroup = useRef();
  const planetBodyGroup = useRef();
  const moon1Ref = useRef();
  const moon2Ref = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Revolution around scene
    if (planetOrbitGroup.current) {
      planetOrbitGroup.current.position.x = Math.sin(time * orbitSpeed + 1.2) * orbitRadius;
      planetOrbitGroup.current.position.z = Math.cos(time * orbitSpeed + 1.2) * (orbitRadius * 0.8) - 3;
      planetOrbitGroup.current.position.y = heightOffset + Math.sin(time * orbitSpeed * 0.8) * 0.4;
    }

    // 2. Planet Self-Rotation
    if (planetBodyGroup.current) {
      planetBodyGroup.current.rotation.y += delta * 0.3;
    }

    // 3. Ring Rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }

    // 4. Moons Revolving around Planet
    if (moon1Ref.current) {
      const m1Time = time * 1.5;
      moon1Ref.current.position.x = Math.cos(m1Time) * 2.3;
      moon1Ref.current.position.z = Math.sin(m1Time) * 2.3;
      moon1Ref.current.position.y = Math.sin(m1Time) * 0.8;
      moon1Ref.current.rotation.y += delta * 1.2;
    }

    if (moon2Ref.current) {
      const m2Time = time * 1.1 + Math.PI;
      moon2Ref.current.position.x = Math.cos(m2Time) * 3.0;
      moon2Ref.current.position.z = Math.sin(m2Time) * 2.1;
      moon2Ref.current.position.y = Math.cos(m2Time) * 1.1;
      moon2Ref.current.rotation.y += delta * 0.9;
    }
  });

  return (
    <group ref={planetOrbitGroup} scale={scale}>
      <group ref={planetBodyGroup}>
        {/* Planet Solid Core */}
        <mesh>
          <sphereGeometry args={[planetRadius, 32, 32]} />
          <meshStandardMaterial
            color="#091428"
            metalness={0.7}
            roughness={0.3}
            emissive={planetColor}
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Planet Wireframe Atmosphere / Latitude-Longitude Grid */}
        <mesh scale={1.03}>
          <sphereGeometry args={[planetRadius, 18, 18]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.25} />
        </mesh>

        {/* Planetary Tech Rings (Like Saturn) */}
        <group ref={ringRef} rotation={[1.1, 0.4, 0]}>
          <mesh>
            <ringGeometry args={[planetRadius * 1.45, planetRadius * 1.95, 64]} />
            <meshStandardMaterial
              color="#38bdf8"
              metalness={0.8}
              roughness={0.3}
              side={THREE.DoubleSide}
              transparent
              opacity={0.5}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[planetRadius * 2.05, 0.02, 16, 64]} />
            <meshStandardMaterial color="#818cf8" transparent opacity={0.6} />
          </mesh>
        </group>
      </group>

      {/* Revolving Moon / Satellite 1 */}
      <mesh ref={moon1Ref}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.6} />
      </mesh>

      {/* Revolving Moon / Satellite 2 */}
      <mesh ref={moon2Ref}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

// ==========================================
// 4. 3D GIT NETWORK COMMIT GRAPH
// ==========================================
function GitBranchTree({ orbitRadius = 3.6, orbitSpeed = 0.32, heightOffset = 2.4, scale = 0.75 }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Revolution
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(time * orbitSpeed + 2.5) * orbitRadius;
      groupRef.current.position.z = Math.cos(time * orbitSpeed + 2.5) * (orbitRadius * 0.8) - 4;
      groupRef.current.position.y = heightOffset + Math.cos(time * orbitSpeed * 1.1) * 0.5;
    }

    // Self-Rotation
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.7;
      innerRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={innerRef}>
        {/* Main branch trunk cylinder */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Diverging branch pipeline */}
        <mesh position={[0.45, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 16]} />
          <meshBasicMaterial color="#818cf8" />
        </mesh>

        {/* Commit node 1 */}
        <mesh position={[0, -0.8, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#059669" emissive="#10b981" emissiveIntensity={0.8} />
        </mesh>

        {/* Commit node 2 (Center) */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>

        {/* Commit node 3 (Tip) */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#2563eb" emissive="#60a5fa" emissiveIntensity={0.8} />
        </mesh>

        {/* Feature Branch Head Node */}
        <mesh position={[0.85, 0.75, 0]}>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial color="#7c3aed" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ==========================================
// 5. AMBIENT BINARY DATA PARTICLES
// ==========================================
function TechParticleField({ count = 200 }) {
  const pointsRef = useRef();

  const [positions, colors] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const cCyan = new THREE.Color('#0284c7');
    const cIndigo = new THREE.Color('#4f46e5');
    const cViolet = new THREE.Color('#7c3aed');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;

      const pick = Math.random();
      const col = pick < 0.4 ? cCyan : pick < 0.7 ? cIndigo : cViolet;
      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }
    return [pos, cols];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ==========================================
// MASTER TECH COSMOS 3D BACKGROUND
// ==========================================
export default function TechCosmosBackground3D() {
  return (
    <div
      className="tech-cosmos-3d-bg"
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
          camera={{ position: [0, 0, 9.5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          {/* Studio Lighting to illuminate metallic tech models against light theme */}
          <ambientLight intensity={1.1} />
          <directionalLight position={[6, 8, 8]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-6, -4, -2]} intensity={0.9} color="#38bdf8" />
          <pointLight position={[0, 4, 3]} intensity={1.2} color="#0284c7" />
          <pointLight position={[4, -3, 1]} intensity={0.9} color="#7c3aed" />

          {/* 1. 3D Code Brackets (< / >) Rotating & Revolving */}
          <CodeBrackets orbitRadius={4.4} orbitSpeed={0.32} heightOffset={1.4} scale={0.88} />

          {/* 2. 3D Microchip / CPU Processor Rotating & Revolving */}
          <MicrochipCPU orbitRadius={4.8} orbitSpeed={0.26} heightOffset={-1.8} scale={0.85} />

          {/* 3. 3D Rotating & Revolving Tech Planet with Planetary Rings and Moons */}
          <TechPlanet
            orbitRadius={5.4}
            orbitSpeed={0.2}
            heightOffset={0.3}
            planetRadius={1.2}
            planetColor="#0284c7"
            scale={0.95}
          />

          {/* 4. 3D Git Commit / Branch Graph Rotating & Revolving */}
          <GitBranchTree orbitRadius={3.8} orbitSpeed={0.36} heightOffset={-2.4} scale={0.8} />

          {/* 5. Ambient Tech Particles */}
          <TechParticleField count={220} />
        </Canvas>
      </Suspense>
    </div>
  );
}
