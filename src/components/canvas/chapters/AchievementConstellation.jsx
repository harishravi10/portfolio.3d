import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ACHIEVEMENTS } from '../../../data/portfolioData';
import { sound } from '../../../audio/soundEngine';

export default function AchievementConstellation({ isActive, onSelectAchievement }) {
  const groupRef = useRef();
  const [hoveredStar, setHoveredStar] = useState(null);

  // Generate glowing constellation line segments connecting related stars
  const lineGeometry = useMemo(() => {
    const points = [];
    // Connect star nodes sequentially and cross-link
    for (let i = 0; i < ACHIEVEMENTS.length; i++) {
      const p1 = ACHIEVEMENTS[i].pos;
      const nextIdx = (i + 1) % ACHIEVEMENTS.length;
      const p2 = ACHIEVEMENTS[nextIdx].pos;
      points.push(new THREE.Vector3(...p1), new THREE.Vector3(...p2));

      // Extra cross-links for realistic astrological constellation lines
      if (i % 2 === 0) {
        const crossIdx = (i + 3) % ACHIEVEMENTS.length;
        points.push(new THREE.Vector3(...p1), new THREE.Vector3(...ACHIEVEMENTS[crossIdx].pos));
      }
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Slow celestial drifting
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group position={[0, 0, -68]} visible={isActive} ref={groupRef}>
      {/* Constellation Vector Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.35} linewidth={1} />
      </lineSegments>

      {/* Star Nodes */}
      {ACHIEVEMENTS.map((item) => {
        const isHovered = hoveredStar?.id === item.id;

        return (
          <group key={item.id} position={item.pos}>
            {/* Luminous Star Core */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                sound.playChirp(1800);
                setHoveredStar(item);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredStar(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                sound.playHologramOpen();
                onSelectAchievement(item);
              }}
            >
              <sphereGeometry args={[0.35, 20, 20]} />
              <meshBasicMaterial color={isHovered ? '#ffffff' : '#00f5ff'} />
            </mesh>

            {/* Glowing Star Halo */}
            <mesh scale={isHovered ? 2.5 : 1.8}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshBasicMaterial
                color="#c084fc"
                transparent
                opacity={isHovered ? 0.6 : 0.25}
              />
            </mesh>

            {/* Floating Star Label / Tooltip */}
            <Html distanceFactor={14} center position={[0, 0.7, 0]}>
              <div
                className="interactive"
                onClick={() => {
                  sound.playHologramOpen();
                  onSelectAchievement(item);
                }}
                onMouseEnter={() => {
                  sound.playChirp(1800);
                  setHoveredStar(item);
                }}
                style={{
                  padding: '4px 10px',
                  borderRadius: '16px',
                  background: isHovered ? 'rgba(0, 245, 255, 0.3)' : 'rgba(8, 14, 28, 0.85)',
                  border: `1px solid ${isHovered ? '#00f5ff' : 'rgba(0, 245, 255, 0.3)'}`,
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  boxShadow: isHovered ? '0 0 16px rgba(0, 245, 255, 0.6)' : 'none',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {item.badge} • {item.category}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
