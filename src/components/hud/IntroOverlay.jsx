import React, { useState, useEffect } from 'react';
import { sound } from '../../audio/soundEngine';

export default function IntroOverlay({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: black screen, 1: init, 2: loading, 3: reveal title, 4: ready
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Stage 1: Particle appears & INITIALIZING HARISH.OS...
    const t1 = setTimeout(() => {
      setStage(1);
    }, 600);

    // Stage 2: LOADING DIGITAL UNIVERSE...
    const t2 = setTimeout(() => {
      setStage(2);
    }, 2000);

    // Stage 3: Galaxy burst & HARISH.OS Title
    const t3 = setTimeout(() => {
      setStage(3);
      sound.playWarp();
    }, 3600);

    // Stage 4: Enter prompt ready
    const t4 = setTimeout(() => {
      setStage(4);
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleEnter = () => {
    sound.startAmbient();
    sound.playWarp();
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div
      className="intro-overlay"
      style={{
        opacity: fadingOut ? 0 : 1,
        pointerEvents: fadingOut ? 'none' : 'auto',
      }}
    >
      {/* Central Singularity Particle */}
      <div className="intro-singularity" />

      {/* Terminal Loading Stages */}
      {stage === 1 && (
        <div className="intro-terminal-log">
          &gt; INITIALIZING HARISH.OS...
        </div>
      )}

      {stage === 2 && (
        <div className="intro-terminal-log">
          &gt; LOADING DIGITAL UNIVERSE...
        </div>
      )}

      {stage >= 3 && (
        <div style={{ animation: 'fadeIn 0.8s ease' }}>
          <h1 className="intro-title glow-cyan">
            HARISH.OS
          </h1>
          <div className="intro-subtitle">
            AN INTERACTIVE DIGITAL UNIVERSE
          </div>
          <p className="intro-quote">
            "Don't scroll through my portfolio. Explore it."
          </p>

          {stage >= 4 && (
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <button
                className="cyber-btn cyber-btn-accent"
                onClick={handleEnter}
                style={{
                  fontSize: '15px',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  boxShadow: '0 0 25px rgba(0, 245, 255, 0.5)',
                }}
              >
                ENTER DIGITAL UNIVERSE ⚡
              </button>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-cyan)',
                letterSpacing: '0.2em',
                animation: 'pulse-dot 2s infinite ease-in-out',
                cursor: 'pointer',
              }}
              onClick={handleEnter}
              >
                SCROLL TO EXPLORE ↓
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
