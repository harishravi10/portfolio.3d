import React, { useState, useEffect } from 'react';
import { Compass, X } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export default function IdleDetector({ onTriggerExplore }) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsIdle(true);
        sound.playChirp(900);
      }, 14000); // 14 seconds idle
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, []);

  if (!isIdle) return null;

  return (
    <div
      className="interactive glass-panel hud-corner"
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        padding: '10px 18px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid var(--color-cyan)',
        boxShadow: '0 0 25px rgba(0, 245, 255, 0.4)',
        animation: 'fadeIn 0.5s ease',
      }}
    >
      <Compass size={16} color="var(--color-cyan)" className="pulse-anim" />

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: '#ffffff',
        letterSpacing: '0.08em',
      }}>
        <span style={{ color: 'var(--color-cyan)', fontWeight: 700 }}>STILL EXPLORING?</span>
        {' '}Navigate with the Orbit Dock or press <kbd style={{ background: '#0f172a', padding: '2px 6px', borderRadius: '3px', border: '1px solid #38bdf8' }}>~</kbd> for terminal.
      </div>

      <button
        onClick={() => setIsIdle(false)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
