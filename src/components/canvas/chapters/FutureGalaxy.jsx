import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FUTURE_MISSIONS } from '../../../data/portfolioData';
import { sound } from '../../../audio/soundEngine';

function FutureExoplanet({ mission, index, isHovered, onHover }) {
  const planetRef = useRef();

  // Distribute along an arc in space
  const angle = (index / FUTURE_MISSIONS.length) * Math.PI * 1.6 - Math.PI * 0.8;
  const radius = 9;
  const x = Math.sin(angle) * radius;
  const z = -Math.cos(angle) * radius * 0.5;
  const y = (index % 2 === 0 ? 1 : -1) * 1.5;

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[x, y, z]}>
      {/* Exoplanet Body */}
      <mesh
        ref={planetRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          sound.playChirp(1300);
          onHover(mission);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
      >
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshStandardMaterial
          color={isHovered ? '#00f5ff' : '#475569'}
          emissive={isHovered ? '#00f5ff' : '#1e293b'}
          emissiveIntensity={isHovered ? 0.9 : 0.2}
          roughness={0.6}
          wireframe={!isHovered}
        />
      </mesh>

      {/* Atmospheric Mist Halo */}
      <mesh scale={isHovered ? 1.6 : 1.3}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={isHovered ? 0.35 : 0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Floating Mission Marker */}
      <Html position={[0, -1.8, 0]} center distanceFactor={14}>
        <div
          className="interactive glass-panel-subtle"
          onMouseEnter={() => {
            sound.playChirp(1300);
            onHover(mission);
          }}
          style={{
            padding: '12px 16px',
            borderRadius: '6px',
            textAlign: 'center',
            width: '210px',
            border: `1px solid ${isHovered ? '#00f5ff' : 'rgba(255, 255, 255, 0.1)'}`,
            boxShadow: isHovered ? '0 0 20px rgba(0, 245, 255, 0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: '18px', marginBottom: '4px' }}>{mission.icon}</div>
          <div style={{
            fontFamily: 'var(--font-tech)',
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.08em',
            marginBottom: '4px',
          }}>
            {mission.title}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            color: 'var(--color-cyan)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            {mission.status}
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            color: '#94a3b8',
            lineHeight: 1.4,
          }}>
            {mission.desc}
          </p>
        </div>
      </Html>
    </group>
  );
}

export default function FutureGalaxy({ isActive }) {
  const [hoveredMission, setHoveredMission] = useState(null);
  const nebulaRef = useRef();

  useFrame((state, delta) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group position={[0, 0, -156]} visible={isActive}>
      {/* Background Cosmic Disc */}
      <group ref={nebulaRef}>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <ringGeometry args={[12, 18, 48]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Title Header */}
      <Html position={[0, 4.5, 0]} center distanceFactor={16}>
        <div style={{
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          color: '#ffffff',
          letterSpacing: '0.2em',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-cyan)',
            marginBottom: '4px',
          }}>
            UNEXPLORED HORIZONS //
          </div>
          <div style={{
            fontSize: 'clamp(22px, 3.5vw, 32px)',
            fontWeight: 800,
            textShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
          }}>
            FUTURE GALAXY
          </div>
          <div style={{
            fontFamily: 'var(--font-tech)',
            fontSize: '13px',
            color: '#94a3b8',
            marginTop: '4px',
          }}>
            STATUS: CONTINUOUS EXPLORATION & SCALING
          </div>
        </div>
      </Html>

      {/* Future Goal Exoplanets */}
      {FUTURE_MISSIONS.map((mission, idx) => (
        <FutureExoplanet
          key={idx}
          mission={mission}
          index={idx}
          isHovered={hoveredMission?.title === mission.title}
          onHover={setHoveredMission}
        />
      ))}
    </group>
  );
}
