import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TechLaptopScene() {
  const groupRef = useRef();
  const screenRef = useRef();
  const holoRingRef = useRef();
  const glyphsGroupRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Floating motion
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.9) * 0.1;

      // Mouse Parallax
      const targetRotX = 0.2 + (state.pointer.y * 0.2);
      const targetRotY = -0.4 + (state.pointer.x * 0.35);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 2);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 2);
    }

    if (holoRingRef.current) {
      holoRingRef.current.rotation.z += delta * 0.2;
    }

    if (glyphsGroupRef.current) {
      glyphsGroupRef.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0.2, -0.4, 0]} scale={0.95}>
      {/* LAPTOP BASE */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Keyboard Bed */}
      <mesh position={[0, 0.01, -0.2]}>
        <boxGeometry args={[2.8, 0.02, 1.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.01, 0.65]}>
        <boxGeometry args={[1.0, 0.01, 0.6]} />
        <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* LAPTOP SCREEN (Lid tilted backwards) */}
      <group position={[0, 0, -1.1]} rotation={[-1.85, 0, 0]}>
        {/* Lid Back & Bezel */}
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[3.2, 2.1, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Display Glass */}
        <mesh position={[0, 1.05, 0.045]}>
          <planeGeometry args={[2.95, 1.85]} />
          <meshBasicMaterial color="#090d16" />
        </mesh>

        {/* Code Lines on Screen (Procedural Bars) */}
        <group position={[-1.2, 1.7, 0.05]}>
          {/* Header row */}
          <mesh position={[0.4, 0, 0]}>
            <planeGeometry args={[0.8, 0.06]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[1.2, 0, 0]}>
            <planeGeometry args={[0.5, 0.06]} />
            <meshBasicMaterial color="#818cf8" />
          </mesh>

          {/* Line 1 */}
          <mesh position={[0.6, -0.18, 0]}>
            <planeGeometry args={[1.2, 0.05]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
          {/* Line 2 */}
          <mesh position={[0.8, -0.32, 0]}>
            <planeGeometry args={[1.4, 0.05]} />
            <meshBasicMaterial color="#cbd5e1" />
          </mesh>
          {/* Line 3 (Indented) */}
          <mesh position={[1.0, -0.46, 0]}>
            <planeGeometry args={[1.1, 0.05]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          {/* Line 4 (Indented) */}
          <mesh position={[0.9, -0.60, 0]}>
            <planeGeometry args={[0.9, 0.05]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          {/* Line 5 */}
          <mesh position={[0.5, -0.74, 0]}>
            <planeGeometry args={[0.7, 0.05]} />
            <meshBasicMaterial color="#818cf8" />
          </mesh>
        </group>
      </group>

      {/* FLOATING HOLOGRAPHIC TECH RINGS */}
      <group ref={holoRingRef} position={[0, 0.8, 0]}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[2.6, 0.015, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Orbiting Code Glyphs */}
      <group ref={glyphsGroupRef} position={[0, 0.8, 0]}>
        <mesh position={[2.2, 0.5, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#818cf8" metalness={0.8} />
        </mesh>
        <mesh position={[-2.0, -0.3, 0.8]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
