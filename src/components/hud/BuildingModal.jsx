import React from 'react';
import { X, Building2, CheckCircle2 } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export default function BuildingModal({ building, onClose }) {
  if (!building) return null;

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
          maxWidth: '620px',
          border: `1px solid ${building.color}`,
          boxShadow: `0 0 40px ${building.glowColor}30`,
        }}
      >
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Building2 size={16} color={building.glowColor} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-cyan)',
            letterSpacing: '0.12em',
          }}>
            METROPOLIS BLUEPRINT // {building.status}
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 800,
          letterSpacing: '0.14em',
          color: '#ffffff',
          textShadow: `0 0 20px ${building.glowColor}`,
          marginBottom: '4px',
        }}>
          {building.name}
        </h2>

        <p style={{
          fontFamily: 'var(--font-tech)',
          fontSize: '15px',
          color: building.glowColor,
          fontWeight: 600,
          marginBottom: '16px',
        }}>
          {building.role}
        </p>

        {/* Proficiency Meter */}
        <div style={{
          background: 'rgba(5, 12, 28, 0.7)',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '18px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            marginBottom: '6px',
          }}>
            <span style={{ color: '#94a3b8' }}>PROFICIENCY LEVEL</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>{building.level}</span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: building.level,
              height: '100%',
              background: `linear-gradient(90deg, ${building.color}, #00f5ff)`,
              boxShadow: `0 0 10px ${building.glowColor}`,
            }} />
          </div>
        </div>

        <p style={{
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#cbd5e1',
          marginBottom: '20px',
        }}>
          {building.description}
        </p>

        {/* Core Competencies Matrix */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: '#94a3b8',
            marginBottom: '10px',
          }}>
            CORE ARCHITECTURAL MODULES
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '8px',
          }}>
            {building.topics.map((t, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#e2e8f0',
                  padding: '6px 10px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '4px',
                }}
              >
                <CheckCircle2 size={13} color={building.glowColor} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="cyber-btn" onClick={handleClose}>
            RETURN TO METROPOLIS
          </button>
        </div>
      </div>
    </div>
  );
}
