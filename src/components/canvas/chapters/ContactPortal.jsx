import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { HARISH_INFO } from '../../../data/portfolioData';
import { sound } from '../../../audio/soundEngine';

export default function ContactPortal({ isActive }) {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const vortexRef = useRef();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dispatchName, setDispatchName] = useState('');
  const [dispatchMsg, setDispatchMsg] = useState('');
  const [dispatchStatus, setDispatchStatus] = useState(null);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.25;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.45;
    }
    if (vortexRef.current) {
      vortexRef.current.rotation.z += delta * 0.8;
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      vortexRef.current.scale.set(s, s, 1);
    }
  });

  const handleCopyEmail = () => {
    sound.playChirp(1800);
    navigator.clipboard?.writeText(HARISH_INFO.contacts.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!dispatchMsg.trim()) return;
    sound.playPortalPulse();
    setDispatchStatus('TRANSMITTING...');
    setTimeout(() => {
      setDispatchStatus('TRANSMISSION RECEIVED // HARISH NOTIFIED');
      setDispatchName('');
      setDispatchMsg('');
      setTimeout(() => setDispatchStatus(null), 4000);
    }, 1200);
  };

  return (
    <group position={[0, 0, -188]} visible={isActive}>
      {/* Outer Stargate Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[3.8, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Inner Concentric Rune Ring */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[3.3, 0.06, 16, 48]} />
          <meshBasicMaterial color="#c084fc" wireframe />
        </mesh>
      </group>

      {/* Quantum Event Horizon Vortex */}
      <group ref={vortexRef}>
        <mesh>
          <circleGeometry args={[3.2, 48]} />
          <meshBasicMaterial
            color="#051329"
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Futuristic Stargate Console Interface */}
      <Html position={[0, 0, 0.2]} center distanceFactor={14}>
        <div
          className="interactive glass-panel hud-corner"
          style={{
            padding: '28px 36px',
            borderRadius: '12px',
            maxWidth: '540px',
            width: '92vw',
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: 'var(--color-cyan)',
            marginBottom: '6px',
          }}>
            // QUANTUM STARGATE CONDUIT
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.8vw, 30px)',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: '#ffffff',
            textShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
            marginBottom: '8px',
          }}>
            ESTABLISH CONNECTION
          </h2>

          <p style={{
            fontFamily: 'var(--font-tech)',
            fontSize: '14px',
            color: '#94a3b8',
            letterSpacing: '0.08em',
            marginBottom: '20px',
          }}>
            {HARISH_INFO.contacts.statusMessage}
          </p>

          {/* Quick Connect Action Nodes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            marginBottom: '22px',
          }}>
            {/* Email node */}
            <button
              className="cyber-btn"
              onClick={handleCopyEmail}
              style={{ justifyContent: 'center', fontSize: '11px', padding: '10px 8px' }}
            >
              ✉️ {copiedEmail ? 'COPIED!' : 'COPY EMAIL'}
            </button>

            {/* LinkedIn node */}
            <a
              href={HARISH_INFO.contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              className="cyber-btn"
              style={{ justifyContent: 'center', fontSize: '11px', padding: '10px 8px', textDecoration: 'none' }}
              onClick={() => sound.playChirp(1600)}
            >
              💼 LINKEDIN →
            </a>

            {/* GitHub node */}
            <a
              href={HARISH_INFO.contacts.github}
              target="_blank"
              rel="noreferrer"
              className="cyber-btn"
              style={{ justifyContent: 'center', fontSize: '11px', padding: '10px 8px', textDecoration: 'none' }}
              onClick={() => sound.playChirp(1600)}
            >
              🐙 GITHUB →
            </a>
          </div>

          {/* Encrypted Dispatch Form */}
          <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="YOUR IDENTITY / NAME"
                value={dispatchName}
                onChange={(e) => setDispatchName(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(5, 10, 22, 0.8)',
                  border: '1px solid rgba(0, 245, 255, 0.25)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  outline: 'none',
                }}
              />
            </div>

            <textarea
              placeholder="ENCRYPTED TRANSMISSION MESSAGE..."
              rows={3}
              value={dispatchMsg}
              onChange={(e) => setDispatchMsg(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(5, 10, 22, 0.8)',
                border: '1px solid rgba(0, 245, 255, 0.25)',
                borderRadius: '4px',
                padding: '8px 12px',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                outline: 'none',
                resize: 'none',
              }}
            />

            <button
              type="submit"
              className="cyber-btn cyber-btn-accent"
              style={{ width: '100%', justifyContent: 'center', padding: '10px 14px' }}
            >
              TRANSMIT PACKET TO HARISH.OS →
            </button>

            {dispatchStatus && (
              <div style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-cyan)',
                letterSpacing: '0.1em',
                padding: '6px',
                background: 'rgba(0, 245, 255, 0.1)',
                borderRadius: '4px',
              }}>
                {dispatchStatus}
              </div>
            )}
          </form>
        </div>
      </Html>
    </group>
  );
}
