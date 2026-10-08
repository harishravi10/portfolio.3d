import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECT_PLANETS } from '../../../data/portfolioData';
import { sound } from '../../../audio/soundEngine';

function PlanetItem({ planet, isHovered, onHover, onClick }) {
  const planetRef = useRef();
  const ringRef = useRef();
  const satelliteRef = useRef();

  useFrame((state, delta) => {
    if (!planetRef.current) return;

    // Base orbit position
    const t = state.clock.elapsedTime * planet.orbitSpeed + planet.orbitRadius;
    const x = Math.cos(t) * planet.orbitRadius;
    const z = Math.sin(t) * planet.orbitRadius;
    planetRef.current.position.set(x, 0, z);

    // Planet self-rotation (faster on hover)
    const spinMultiplier = isHovered ? 3.5 : 1.0;
    planetRef.current.rotation.y += delta * 0.8 * spinMultiplier;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += delta * 2.0;
    }
  });

  return (
    <group>
      {/* Orbital Trail Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.orbitRadius - 0.05, planet.orbitRadius + 0.05, 64]} />
        <meshBasicMaterial
          color={isHovered ? planet.color : '#1e293b'}
          transparent
          opacity={isHovered ? 0.7 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbiting Planet Body */}
      <group ref={planetRef}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            sound.playChirp(1600);
            onHover(planet);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onHover(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            sound.playWarp();
            onClick(planet);
          }}
        >
          <sphereGeometry args={[planet.radius, 32, 32]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.glowColor}
            emissiveIntensity={isHovered ? 1.4 : 0.45}
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>

        {/* Atmosphere Glow Shell */}
        <mesh scale={isHovered ? 1.25 : 1.15}>
          <sphereGeometry args={[planet.radius, 24, 24]} />
          <meshBasicMaterial
            color={planet.glowColor}
            transparent
            opacity={isHovered ? 0.35 : 0.12}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Planetary Rings for select planets */}
        {(planet.id === 'foodhub' || planet.id === 'ml') && (
          <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
            <mesh>
              <ringGeometry args={[planet.radius * 1.4, planet.radius * 2.0, 32]} />
              <meshBasicMaterial
                color={planet.glowColor}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        )}

        {/* Orbiting Satellite Probe */}
        <group ref={satelliteRef}>
          <mesh position={[planet.radius * 1.6, 0, 0]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Billboarding Project Holographic Label */}
        <Html position={[0, planet.radius + 1.2, 0]} center distanceFactor={16}>
          <div
            className="interactive"
            onClick={() => {
              sound.playWarp();
              onClick(planet);
            }}
            onMouseEnter={() => {
              sound.playChirp(1600);
              onHover(planet);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              background: isHovered ? 'rgba(0, 245, 255, 0.35)' : 'rgba(8, 14, 28, 0.88)',
              border: `1px solid ${isHovered ? '#00f5ff' : planet.color}`,
              color: '#ffffff',
              fontFamily: 'var(--font-tech)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              boxShadow: isHovered ? `0 0 20px ${planet.glowColor}` : '0 4px 12px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              transition: 'all 0.2s',
            }}
          >
            <div>{planet.title}</div>
            <div style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: planet.glowColor,
              fontWeight: 500,
            }}>
              CLICK TO ENTER ORBIT →
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

export default function ProjectPlanets({ isActive, onSelectPlanet }) {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const sunRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, -42]} visible={isActive}>
      {/* Central Solar Luminary (Star) */}
      <group ref={sunRef}>
        <mesh>
          <sphereGeometry args={[3.2, 32, 32]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>
        {/* Pulsing Solar Corona */}
        <mesh scale={1.25}>
          <sphereGeometry args={[3.2, 24, 24]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.25}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Orbiting Project Planets */}
      {PROJECT_PLANETS.map((planet) => (
        <PlanetItem
          key={planet.id}
          planet={planet}
          isHovered={hoveredPlanet?.id === planet.id}
          onHover={setHoveredPlanet}
          onClick={onSelectPlanet}
        />
      ))}
    </group>
  );
}
