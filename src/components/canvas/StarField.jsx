import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField({ isWarping }) {
  const pointsRef = useRef();
  const dustRef = useRef();

  // Generate 3,500 distinct celestial stars
  const { positions, colors, initialZ } = useMemo(() => {
    const count = 3500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const initialZ = new Float32Array(count);

    const palette = [
      new THREE.Color('#00f5ff'), // Cyan
      new THREE.Color('#ffffff'), // Pure White
      new THREE.Color('#38bdf8'), // Electric Sky Blue
      new THREE.Color('#c084fc'), // Soft Violet
      new THREE.Color('#818cf8'), // Indigo
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical distribution around the camera journey
      const radius = 15 + Math.random() * 85;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 80;

      const x = Math.cos(theta) * radius;
      const z = (Math.random() - 0.5) * 120;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      initialZ[i] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return { positions, colors, initialZ };
  }, []);

  // Generate 800 soft cosmic nebula dust particles
  const dustPositions = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 90;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 90;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow cosmic ambient spin
    pointsRef.current.rotation.y += delta * 0.02;
    if (dustRef.current) {
      dustRef.current.rotation.y -= delta * 0.01;
    }

    // Dynamic warp streak animation
    const positionAttr = pointsRef.current.geometry.attributes.position;
    const array = positionAttr.array;

    if (isWarping) {
      for (let i = 0; i < 3500; i++) {
        // Accelerate stars forward during warp
        array[i * 3 + 2] += delta * 120;
        if (array[i * 3 + 2] > 60) {
          array[i * 3 + 2] = -60;
        }
      }
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Primary Star Field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isWarping ? 1.6 : 0.85}
          vertexColors
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Cosmic Nebula Dust Cloud */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2.2}
          color="#38bdf8"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
