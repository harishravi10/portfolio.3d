import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SKILL_BUILDINGS } from '../../../data/portfolioData';
import { sound } from '../../../audio/soundEngine';

function CyberBuilding({ building, isHovered, onHover, onClick }) {
  const meshRef = useRef();
  const antennaRef = useRef();

  useFrame((state, delta) => {
    if (antennaRef.current) {
      antennaRef.current.rotation.y += delta * 1.5;
    }
  });

  const { height, width, color, position, glowColor } = building;

  return (
    <group position={position}>
      {/* Skyscraper Base & Body */}
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          sound.playChirp(1400);
          onHover(building);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          sound.playHologramOpen();
          onClick(building);
        }}
      >
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial
          color={isHovered ? glowColor : "#0d1b33"}
          emissive={isHovered ? glowColor : color}
          emissiveIntensity={isHovered ? 0.9 : 0.25}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Cyber Glowing Edges / Window Strip Accents */}
      <lineSegments position={[0, height / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width * 1.02, height, width * 1.02)]} />
        <lineBasicMaterial color={isHovered ? "#ffffff" : glowColor} linewidth={1} />
      </lineSegments>

      {/* Rooftop Antenna Spire */}
      <group position={[0, height + 0.8, 0]} ref={antennaRef}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.04, 0.1, 1.2, 8]} />
          <meshBasicMaterial color={glowColor} />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color={isHovered ? "#ffffff" : color} />
        </mesh>
      </group>

      {/* Floating Holographic Sign above building */}
      <Html position={[0, height + 2.5, 0]} center distanceFactor={16}>
        <div 
          className="interactive"
          onClick={() => onClick(building)}
          onMouseEnter={() => {
            sound.playChirp(1400);
            onHover(building);
          }}
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            background: isHovered ? 'rgba(0, 245, 255, 0.3)' : 'rgba(8, 15, 30, 0.85)',
            border: `1px solid ${isHovered ? '#00f5ff' : color}`,
            color: '#ffffff',
            fontFamily: 'var(--font-tech)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            boxShadow: isHovered ? `0 0 16px ${glowColor}` : 'none',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {building.name} • <span style={{ color: glowColor }}>{building.level}</span>
        </div>
      </Html>
    </group>
  );
}

// Procedural Flying Cyber Drones
function FlyingDrone({ index, speed = 1 }) {
  const droneRef = useRef();

  useFrame((state) => {
    if (!droneRef.current) return;
    const t = state.clock.elapsedTime * 0.4 * speed + index * 1.8;
    const radius = 10 + (index % 3) * 3;
    const y = 6 + Math.sin(t * 1.5) * 2;
    droneRef.current.position.x = Math.cos(t) * radius;
    droneRef.current.position.y = y;
    droneRef.current.position.z = Math.sin(t) * radius;
    droneRef.current.rotation.y = -t + Math.PI / 2;
  });

  return (
    <group ref={droneRef}>
      <mesh>
        <boxGeometry args={[0.4, 0.12, 0.6]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1} />
      </mesh>
      {/* Drone propulsion trail */}
      <mesh position={[0, 0, -0.4]}>
        <coneGeometry args={[0.1, 0.4, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function KnowledgeCity({ isActive, onSelectBuilding }) {
  const [hoveredBuilding, setHoveredBuilding] = useState(null);

  return (
    <group position={[0, 0, -18]} visible={isActive}>
      {/* Ground Cyber Grid */}
      <gridHelper args={[60, 40, '#00f5ff', '#0d254c']} position={[0, 0, 0]} />

      {/* Buildings */}
      {SKILL_BUILDINGS.map((building) => (
        <CyberBuilding
          key={building.id}
          building={building}
          isHovered={hoveredBuilding?.id === building.id}
          onHover={setHoveredBuilding}
          onClick={onSelectBuilding}
        />
      ))}

      {/* Flying cyber drones */}
      {[0, 1, 2, 3].map((i) => (
        <FlyingDrone key={i} index={i} speed={0.8 + i * 0.2} />
      ))}
    </group>
  );
}
