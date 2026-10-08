import React from 'react';
import { CHAPTERS } from '../../data/portfolioData';

export default function MinimapHUD({ currentChapterIndex }) {
  // Compute radial angle of active sector
  const total = CHAPTERS.length;
  const angle = (currentChapterIndex / total) * Math.PI * 2;
  const radius = 38; // Radius on radar
  const blipX = 65 + Math.cos(angle) * radius - 3;
  const blipY = 65 + Math.sin(angle) * radius - 3;

  return (
    <div className="minimap-radar interactive" title="Universe Orbital Radar">
      <div className="radar-grid" />
      <div className="radar-sweep" />

      {/* Target Planetary Waypoints */}
      {CHAPTERS.map((c, i) => {
        const a = (i / total) * Math.PI * 2;
        const x = 65 + Math.cos(a) * radius - 2;
        const y = 65 + Math.sin(a) * radius - 2;
        const isCurrent = i === currentChapterIndex;

        return (
          <div
            key={c.id}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              width: isCurrent ? '7px' : '4px',
              height: isCurrent ? '7px' : '4px',
              borderRadius: '50%',
              backgroundColor: isCurrent ? '#00f5ff' : '#475569',
              boxShadow: isCurrent ? '0 0 8px #00f5ff' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        );
      })}

      {/* Central Hub Blip */}
      <div
        style={{
          position: 'absolute',
          left: '62px',
          top: '62px',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 6px #ffffff',
        }}
      />

      {/* Dynamic Player Ship Marker */}
      <div
        className="radar-blip pulse-anim"
        style={{
          left: `${blipX}px`,
          top: `${blipY}px`,
        }}
      />

      <div style={{
        position: 'absolute',
        bottom: '8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '8.5px',
        color: 'var(--color-cyan)',
        letterSpacing: '0.12em',
        pointerEvents: 'none',
      }}>
        SECTOR RADAR
      </div>
    </div>
  );
}
