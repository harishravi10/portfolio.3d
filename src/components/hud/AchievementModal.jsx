import React from 'react';
import { X, Award, Star } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export default function AchievementModal({ achievement, onClose }) {
  if (!achievement) return null;

  const handleClose = () => {
    sound.playChirp(1200);
    onClose();
  };

  return (
    <div className="hologram-modal-backdrop" onClick={handleClose}>
      <div
        className="hologram-modal hud-corner"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          border: '1px solid #c084fc',
          boxShadow: '0 0 40px rgba(192, 132, 252, 0.3)',
        }}
      >
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Star size={16} color="#c084fc" />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#c084fc',
            letterSpacing: '0.12em',
          }}>
            STELLAR MILESTONE // {achievement.category}
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 800,
          letterSpacing: '0.12em',
          color: '#ffffff',
          textShadow: '0 0 20px rgba(192, 132, 252, 0.6)',
          marginBottom: '6px',
        }}>
          {achievement.title}
        </h2>

        <div style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--color-cyan)',
          padding: '3px 10px',
          borderRadius: '16px',
          background: 'rgba(0, 245, 255, 0.1)',
          border: '1px solid rgba(0, 245, 255, 0.3)',
          marginBottom: '16px',
        }}>
          {achievement.badge}
        </div>

        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#e2e8f0',
          marginBottom: '16px',
        }}>
          {achievement.desc}
        </p>

        <div style={{
          background: 'rgba(6, 12, 28, 0.7)',
          padding: '14px',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#94a3b8',
          marginBottom: '20px',
        }}>
          {achievement.detail}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="cyber-btn" onClick={handleClose}>
            RETURN TO CONSTELLATION
          </button>
        </div>
      </div>
    </div>
  );
}
