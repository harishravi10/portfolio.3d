import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Terminal, ShieldCheck } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export default function HeaderHUD({ 
  onToggleTerminal, 
  onActivateEasterEgg 
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

  const handleLogoClick = () => {
    sound.playChirp(1200 + clickCount * 200);
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    if (newCount >= 5) {
      sound.playWarp();
      setClickCount(0);
      onActivateEasterEgg();
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 3000);
    }
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playChirp(1400);
    }
  };

  return (
    <div className="hud-top">
      {/* Brand & Developer Mode Easter Egg Trigger */}
      <div 
        className="hud-brand interactive"
        onClick={handleLogoClick}
        title="Click 5 times to unlock Developer Mode Terminal"
      >
        <div className="hud-logo glow-cyan">
          <span style={{ color: '#ffffff' }}>HARISH</span>.OS
          {clickCount > 0 && (
            <span style={{ fontSize: '10px', color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
              [{clickCount}/5]
            </span>
          )}
        </div>
        <div className="hud-tag">
          COMPUTER SCIENCE &bull; FULL STACK ARCHITECT
        </div>
      </div>

      {/* Center Sector Telemetry */}
      <div className="hud-status-group">
        <div className="hud-chip">
          <span style={{ color: '#64748b' }}>STARDATE</span>
          <span style={{ color: '#ffffff', fontWeight: 600 }}>2026.42</span>
        </div>

        <div className="hud-chip">
          <div className="hud-status-indicator pulse-anim" />
          <span style={{ color: '#34d399', fontWeight: 600 }}>SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Controls & Action Buttons */}
      <div className="hud-actions interactive">
        <button 
          className="hud-icon-btn"
          onClick={toggleSound}
          title={isMuted ? 'Unmute Universe SFX' : 'Mute Universe SFX'}
        >
          {isMuted ? <VolumeX size={14} color="#ef4444" /> : <Volume2 size={14} color="#00f5ff" />}
          <span>{isMuted ? 'SFX: OFF' : 'SFX: ON'}</span>
        </button>

        <button 
          className="hud-icon-btn"
          onClick={onToggleTerminal}
          title="Open Developer OS Terminal (~)"
        >
          <Terminal size={14} color="#a855f7" />
          <span>TERMINAL</span>
        </button>
      </div>
    </div>
  );
}
