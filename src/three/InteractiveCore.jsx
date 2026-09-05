import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function InteractiveCore({ mouseRef }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const nodesGroupRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Natural Floating Motion
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.15;

      // Mouse Parallax Lerping
      const targetRotX = (state.pointer.y * 0.35);
      const targetRotY = (state.pointer.x * 0.5);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 2.5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 2.5);
    }

    // Inner Core Rotation
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += delta * 0.3;
      innerCoreRef.current.rotation.y += delta * 0.4;
    }

    // Gimbal Rings Rotation
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.25;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.2;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.18;

    // Orbiting Data Nodes
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Tech Core - Octahedron */}
      <mesh ref={innerCoreRef} scale={1.1}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color="#0f172a"
          emissive="#0d1b2a"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Geodesic Inner Wireframe */}
      <mesh scale={1.4}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Orbit Ring 1 - Slanted Equatorial */}
      <group ref={ring1Ref} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.2, 0.02, 16, 64]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>

      {/* Orbit Ring 2 - Polar Ring */}
      <group ref={ring2Ref} rotation={[1.2, 0.5, 0.8]}>
        <mesh>
          <torusGeometry args={[2.5, 0.018, 16, 64]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Orbit Ring 3 - Outer Thin Ring */}
      <group ref={ring3Ref} rotation={[-0.6, 0.8, -0.2]}>
        <mesh>
          <torusGeometry args={[2.8, 0.015, 16, 64]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Orbiting Satellite Data Nodes */}
      <group ref={nodesGroupRef}>
        <mesh position={[2.2, 0.4, 0]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.8, -0.6, 1.2]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color="#818cf8" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.5, 2.0, -1.0]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.8, -1.9, -1.2]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
