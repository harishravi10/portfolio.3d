import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FLOATING_SNIPPETS } from '../../../data/portfolioData';

const TECH_PILLARS = [
  'LeetCode (300+)',
  'DSA & Trees',
  'Core Java & OOP',
  'Spring Boot Backend',
  'React Frontend',
  'MySQL Databases',
  'System Design',
  'TCP/IP Sockets',
];

function FloatingCodeSnippet({ text, index }) {
  const groupRef = useRef();

  // Distribute code snippets in a cylindrical cloud around the path
  const radius = 6 + (index % 4) * 2.2;
  const angle = (index / FLOATING_SNIPPETS.length) * Math.PI * 2;
  const initialY = ((index % 5) - 2) * 2.2;
  const initialZ = ((index % 3) - 1) * 4;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Gentle floating wave drift
    groupRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.5;
    groupRef.current.position.x = Math.cos(angle + state.clock.elapsedTime * 0.08) * radius;
    groupRef.current.position.z = Math.sin(angle + state.clock.elapsedTime * 0.08) * radius + initialZ;
  });

  return (
    <group ref={groupRef} position={[Math.cos(angle) * radius, initialY, initialZ]}>
      <Html distanceFactor={15} center>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: index % 2 === 0 ? 'var(--color-cyan)' : '#c084fc',
            background: 'rgba(3, 7, 18, 0.8)',
            border: `1px solid ${index % 2 === 0 ? 'rgba(0, 245, 255, 0.3)' : 'rgba(192, 132, 252, 0.3)'}`,
            padding: '3px 8px',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 245, 255, 0.2)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {text}
        </div>
      </Html>
    </group>
  );
}

export default function CodingDimension({ isActive }) {
  const cubeRef = useRef();

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.2;
      cubeRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, -126]} visible={isActive}>
      {/* Central Rotating Cyber Data Cube */}
      <group ref={cubeRef} position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[3, 3, 3]} />
          <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.3} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[1.8]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Floating Code Snippets Cloud */}
      {FLOATING_SNIPPETS.map((snippet, idx) => (
        <FloatingCodeSnippet key={idx} text={snippet} index={idx} />
      ))}

      {/* Primary Statement Hologram */}
      <Html position={[0, -2.8, 0]} center distanceFactor={14}>
        <div
          className="interactive glass-panel hud-corner"
          style={{
            padding: '24px 32px',
            borderRadius: '10px',
            textAlign: 'center',
            maxWidth: '560px',
            width: '90vw',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: 'var(--color-cyan)',
            marginBottom: '8px',
          }}>
            // CYBERNETIC ENGINE MANIFEST
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 3.5vw, 28px)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: '#ffffff',
            textShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
            marginBottom: '16px',
          }}>
            I DON'T JUST LEARN TECHNOLOGY.<br />
            <span style={{ color: 'var(--color-cyan)' }}>I BUILD WITH IT.</span>
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
          }}>
            {TECH_PILLARS.map((pillar, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '5px 12px',
                  borderRadius: '4px',
                  background: 'rgba(0, 245, 255, 0.08)',
                  border: '1px solid rgba(0, 245, 255, 0.25)',
                  color: '#e2e8f0',
                  letterSpacing: '0.05em',
                }}
              >
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
