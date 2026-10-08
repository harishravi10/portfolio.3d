import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { EDUCATION_MILESTONES } from '../../../data/portfolioData';
import { sound } from '../../../audio/soundEngine';

function PortalGate({ milestone, index, isHovered, onHover, onClick }) {
  const gateRef = useRef();
  const innerRingRef = useRef();

  useFrame((state, delta) => {
    if (gateRef.current) {
      gateRef.current.rotation.z += delta * (0.3 + index * 0.05);
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.4;
    }
  });

  // Position portals along a dynamic spatial path
  const xOffset = (index - 2) * 5.8;
  const zOffset = (index - 2) * 2.5;

  return (
    <group position={[xOffset, 0, zOffset]}>
      {/* Outer Chrono Ring */}
      <group ref={gateRef}>
        <mesh>
          <torusGeometry args={[1.8, 0.05, 16, 48]} />
          <meshBasicMaterial
            color={isHovered ? '#00f5ff' : '#38bdf8'}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Counter-rotating Inner Ring */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[1.4, 0.03, 16, 48]} />
          <meshBasicMaterial
            color={isHovered ? '#ffffff' : '#c084fc'}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>

      {/* Portal Energy Horizon Center */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          sound.playChirp(1500);
          onHover(milestone);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          sound.playHologramOpen();
          onClick(milestone);
        }}
      >
        <circleGeometry args={[1.35, 32]} />
        <meshBasicMaterial
          color="#081b3b"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating 3D Timeline Telemetry */}
      <Html position={[0, -2.4, 0]} center distanceFactor={14}>
        <div
          className="interactive glass-panel-subtle"
          onMouseEnter={() => {
            sound.playChirp(1500);
            onHover(milestone);
          }}
          onClick={() => onClick(milestone)}
          style={{
            padding: '16px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            width: '260px',
            border: `1px solid ${isHovered ? '#00f5ff' : 'rgba(0, 245, 255, 0.25)'}`,
            boxShadow: isHovered ? '0 0 24px rgba(0, 245, 255, 0.35)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.25s',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 800,
            color: 'var(--color-cyan)',
            letterSpacing: '0.12em',
            marginBottom: '4px',
          }}>
            {milestone.year}
          </div>

          <div style={{
            fontFamily: 'var(--font-tech)',
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.1em',
            marginBottom: '4px',
            textTransform: 'uppercase',
          }}>
            {milestone.stage}
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#94a3b8',
            marginBottom: '10px',
          }}>
            {milestone.institution}
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            justifyContent: 'center',
          }}>
            {milestone.highlights.map((h, i) => (
              <span
                key={i}
                style={{
                  fontSize: '9.5px',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  background: 'rgba(0, 245, 255, 0.08)',
                  border: '1px solid rgba(0, 245, 255, 0.2)',
                  color: '#e2e8f0',
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function EducationArchive({ isActive, onSelectMilestone }) {
  const [hoveredGate, setHoveredGate] = useState(null);

  return (
    <group position={[0, 0, -96]} visible={isActive}>
      {/* Temporal conduit line connecting all portals */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 28, 8]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
      </mesh>

      {/* Chrono Portals */}
      {EDUCATION_MILESTONES.map((m, idx) => (
        <PortalGate
          key={m.year}
          milestone={m}
          index={idx}
          isHovered={hoveredGate?.year === m.year}
          onHover={setHoveredGate}
          onClick={onSelectMilestone}
        />
      ))}
    </group>
  );
}
