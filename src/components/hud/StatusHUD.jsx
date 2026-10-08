import React from 'react';
import { CHAPTERS } from '../../data/portfolioData';

export default function StatusHUD({ currentChapterIndex, scrollProgress }) {
  const currentChapter = CHAPTERS[currentChapterIndex] || CHAPTERS[0];

  return (
    <div className="hud-bottom">
      {/* Sector Location Telemetry */}
      <div className="hud-location">
        <div className="hud-coords">
          COORD // {currentChapter.sector}
        </div>

        <div className="hud-chapter-badge">
          <span className="hud-chapter-number">
            {currentChapter.index} / 08
          </span>
          <span>{currentChapter.title}</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-tech)',
          fontSize: '13px',
          color: 'var(--color-cyan)',
          letterSpacing: '0.08em',
        }}>
          {currentChapter.subtitle}
        </div>

        {/* 8-Chapter Segmented Progress Bar */}
        <div className="hud-timeline-progress">
          {CHAPTERS.map((_, i) => (
            <div
              key={i}
              className={`timeline-tick ${i <= currentChapterIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Center/Right Exploration Prompt */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: '#64748b',
        letterSpacing: '0.14em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(8, 14, 28, 0.65)',
        padding: '6px 14px',
        borderRadius: '4px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <span style={{ color: 'var(--color-cyan)' }}>&#x2195;</span>
        <span>SCROLL TO NAVIGATE UNIVERSE</span>
      </div>
    </div>
  );
}
