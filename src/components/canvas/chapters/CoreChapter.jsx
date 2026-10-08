import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { HARISH_INFO } from '../../../data/portfolioData';

const CORE_SKILLS = [
  { name: 'JAVA', color: '#ff7700', angle: 0 },
  { name: 'SPRING BOOT', color: '#00f5ff', angle: (Math.PI * 2) / 7 * 1 },
  { name: 'REACT', color: '#00e1d9', angle: (Math.PI * 2) / 7 * 2 },
  { name: 'SQL', color: '#3b82f6', angle: (Math.PI * 2) / 7 * 3 },
  { name: 'DSA', color: '#a855f7', angle: (Math.PI * 2) / 7 * 4 },
  { name: 'PYTHON', color: '#eab308', angle: (Math.PI * 2) / 7 * 5 },
  { name: 'JAVASCRIPT', color: '#fbbf24', angle: (Math.PI * 2) / 7 * 6 },
];

export default function CoreChapter({ isActive, mousePos, onWarpToCity }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const wireframeRing1Ref = useRef();
  const wireframeRing2Ref = useRef();
  const ringsRef = useRef();
  const skillsOrbitRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Subtle mouse tilt reaction
    const targetRotX = (mousePos.y || 0) * 0.25;
    const targetRotY = (mousePos.x || 0) * 0.35 + state.clock.elapsedTime * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);

    // Inner pulsing core
    if (innerCoreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.05;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }

    // Concentric techno rings rotation
    if (wireframeRing1Ref.current) {
      wireframeRing1Ref.current.rotation.z += delta * 0.4;
      wireframeRing1Ref.current.rotation.x += delta * 0.2;
    }
    if (wireframeRing2Ref.current) {
      wireframeRing2Ref.current.rotation.y -= delta * 0.3;
      wireframeRing2Ref.current.rotation.z += delta * 0.25;
    }

    // Orbiting skills
    if (skillsOrbitRef.current) {
      skillsOrbitRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]} visible={isActive}>
      {/* Central Holographic Core Planet */}
      <group ref={groupRef}>
        {/* Deep Energy Nucleus */}
        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00b4d8"
            emissiveIntensity={1.8}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Holographic Wireframe Shell */}
        <mesh>
          <icosahedronGeometry args={[2.2, 2]} />
          <meshBasicMaterial
            color="#00f5ff"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Concentric Techno Rings */}
        <group ref={wireframeRing1Ref}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[3.2, 0.03, 16, 64]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>
        </group>

        <group ref={wireframeRing2Ref}>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[3.8, 0.02, 16, 64]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
          </mesh>
        </group>
      </group>

      {/* Orbiting Skill Data Tags */}
      <group ref={skillsOrbitRef}>
        {CORE_SKILLS.map((skill, index) => {
          const orbitR = 5.2;
          const x = Math.cos(skill.angle) * orbitR;
          const z = Math.sin(skill.angle) * orbitR;

          return (
            <group key={skill.name} position={[x, 0, z]}>
              {/* Glowing anchor node */}
              <mesh>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color={skill.color} />
              </mesh>
              
              {/* 3D Billboarding HTML badge */}
              <Html distanceFactor={14} center>
                <div 
                  className="interactive"
                  style={{
                    padding: '3px 10px',
                    borderRadius: '20px',
                    background: 'rgba(6, 11, 25, 0.85)',
                    border: `1px solid ${skill.color}`,
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    boxShadow: `0 0 12px ${skill.color}40`,
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                >
                  {skill.name}
                </div>
              </Html>
            </group>
          );
        })}
      </group>

      {/* Primary Identity Telemetry Hologram */}
      <Html position={[0, -3.2, 0]} center distanceFactor={13}>
        <div 
          className="interactive glass-panel hud-corner"
          style={{
            padding: '24px 32px',
            borderRadius: '12px',
            textAlign: 'center',
            maxWidth: '520px',
            width: '90vw',
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '3px 12px',
            borderRadius: '20px',
            background: 'rgba(0, 245, 255, 0.1)',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            color: 'var(--color-cyan)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            marginBottom: '12px',
          }}>
            <span className="pulse-anim" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#00f5ff' }}></span>
            QUANTUM CORE // ONLINE
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 900,
            letterSpacing: '0.18em',
            color: '#ffffff',
            textShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
            marginBottom: '6px',
          }}>
            {HARISH_INFO.name}
          </h1>

          <p style={{
            fontFamily: 'var(--font-tech)',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'var(--color-cyan)',
            marginBottom: '4px',
            textTransform: 'uppercase',
          }}>
            {HARISH_INFO.designation}
          </p>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: '#94a3b8',
            letterSpacing: '0.08em',
            marginBottom: '14px',
          }}>
            {HARISH_INFO.subRole} • {HARISH_INFO.institution}
          </p>

          <p style={{
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#cbd5e1',
            marginBottom: '20px',
            fontStyle: 'italic',
          }}>
            "{HARISH_INFO.corePitch}"
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="cyber-btn cyber-btn-accent"
              onClick={onWarpToCity}
            >
              EXPLORE KNOWLEDGE CITY →
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
