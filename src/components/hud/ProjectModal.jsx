import React from 'react';
import { X, ExternalLink, ShieldAlert, Cpu, Sparkles, GitBranch } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const handleClose = () => {
    sound.playWarp();
    onClose();
  };

  return (
    <div className="hologram-modal-backdrop" onClick={handleClose}>
      <div 
        className="hologram-modal hud-corner" 
        onClick={(e) => e.stopPropagation()}
        style={{
          border: `1px solid ${project.color}`,
          boxShadow: `0 0 50px ${project.glowColor}40`,
        }}
      >
        {/* Close Button / Return to Orbit */}
        <button 
          className="modal-close-btn"
          onClick={handleClose}
          title="Disengage Cockpit / Return to Orbit"
        >
          <X size={18} />
        </button>

        {/* Spacecraft Cockpit Header Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 10px',
            borderRadius: '20px',
            background: 'rgba(0, 245, 255, 0.1)',
            border: `1px solid ${project.color}`,
            color: project.glowColor,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
          }}>
            <Cpu size={12} />
            ORBITAL SECTOR // {project.type}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#64748b' }}>
            STATUS: DEPLOYED & OPERATIONAL
          </span>
        </div>

        {/* Project Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 900,
          letterSpacing: '0.12em',
          color: '#ffffff',
          textShadow: `0 0 20px ${project.glowColor}`,
          marginBottom: '6px',
        }}>
          {project.title}
        </h2>

        <p style={{
          fontFamily: 'var(--font-tech)',
          fontSize: '16px',
          color: 'var(--color-cyan)',
          letterSpacing: '0.08em',
          marginBottom: '20px',
        }}>
          {project.shortDesc}
        </p>

        {/* Cockpit Telemetry Grids (Problem vs Solution) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}>
          {/* Problem Console */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            padding: '16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#f87171',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}>
              <ShieldAlert size={14} />
              PROBLEM STATEMENT
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#e2e8f0' }}>
              {project.problem}
            </p>
          </div>

          {/* Solution Architecture */}
          <div style={{
            background: 'rgba(0, 245, 255, 0.06)',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            borderRadius: '6px',
            padding: '16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-cyan)',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}>
              <Sparkles size={14} />
              ENGINEERED SOLUTION
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#e2e8f0' }}>
              {project.solution}
            </p>
          </div>
        </div>

        {/* Technologies Grid */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: '#94a3b8',
            marginBottom: '8px',
          }}>
            TECHNOLOGICAL MATRIX
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: 'rgba(8, 20, 40, 0.7)',
                  border: `1px solid ${project.color}`,
                  color: '#ffffff',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features Checklist */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: '#94a3b8',
            marginBottom: '10px',
          }}>
            SYSTEM CAPABILITIES & ARCHITECTURE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {project.features.map((feat, idx) => (
              <div 
                key={idx} 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '13px',
                  color: '#cbd5e1',
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '6px 10px',
                  borderRadius: '4px',
                }}
              >
                <span style={{ color: project.glowColor, fontFamily: 'var(--font-mono)' }}>&#9656;</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cockpit Actions: Live Demo, GitHub, and Return to Orbit */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '18px',
        }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="cyber-btn"
              onClick={() => sound.playChirp(1600)}
              style={{ textDecoration: 'none' }}
            >
              <GitBranch size={14} />
              SOURCE REPOSITORY
            </a>

            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="cyber-btn cyber-btn-accent"
              onClick={() => sound.playChirp(1800)}
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={14} />
              LAUNCH LIVE TELEMETRY
            </a>
          </div>

          <button
            className="cyber-btn"
            onClick={handleClose}
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#94a3b8' }}
          >
            DISENGAGE / RETURN TO ORBIT
          </button>
        </div>
      </div>
    </div>
  );
}
