import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../audio/soundEngine';
import { HARISH_INFO } from '../../data/portfolioData';

const HELP_TEXT = `HARISH.OS COMMAND EXECUTIVE // v4.2
AVAILABLE COMMANDS:
  help              - List all available terminal instructions
  about             - Display Harish identity profile & telemetry
  skills            - List core technical competencies & jump to Knowledge City
  projects          - List engineered systems & warp to Project Planets
  education         - Display academic records at SSN College of Engineering
  achievements      - Inspect stellar awards & certifications
  future            - Display roadmap & future horizons
  contact           - Open Quantum Stargate Contact Portal
  warp <1-8>        - Warp camera directly to sector number
  matrix            - Toggle matrix green cyber theme
  easteregg         - Trigger system overload celebration
  clear / cls       - Clear terminal history
  exit              - Terminate terminal session`;

export default function TerminalModal({ isOpen, onClose, onWarpToChapter }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'HARISH.OS DEVELOPER TERMINAL INITIALIZED [ONLINE]' },
    { type: 'system', text: 'Type "help" to view executable commands, or "warp <1-8>" to jump sectors.' },
  ]);
  const [isMatrixTheme, setIsMatrixTheme] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    sound.playTerminalKey();
    const lower = cmd.toLowerCase();
    const newHistory = [...history, { type: 'user', text: `harish@os:~# ${cmd}` }];

    if (lower === 'help') {
      newHistory.push({ type: 'output', text: HELP_TEXT });
    } else if (lower === 'about') {
      newHistory.push({
        type: 'output',
        text: `NAME: ${HARISH_INFO.name}\nROLE: ${HARISH_INFO.designation} (${HARISH_INFO.subRole})\nINSTITUTION: ${HARISH_INFO.institution} (${HARISH_INFO.degree})\nSTATUS: ${HARISH_INFO.status}\nPITCH: "${HARISH_INFO.corePitch}"`,
      });
      onWarpToChapter(0);
    } else if (lower === 'skills') {
      newHistory.push({
        type: 'output',
        text: 'CORE SKILLS: Java (OOP, Collections, Multithreading), Spring Boot, React, SQL (MySQL), Python, JavaScript, DSA (300+ solved).\nWARPING CAMERA TO KNOWLEDGE CITY...',
      });
      onWarpToChapter(1);
    } else if (lower === 'projects') {
      newHistory.push({
        type: 'output',
        text: 'DEPLOYED PROJECTS: FoodHub, Hospital Management System, Web Crawler Engine, Machine Learning Projects, Networking Protocols Lab.\nWARPING CAMERA TO PROJECT PLANETS...',
      });
      onWarpToChapter(2);
    } else if (lower === 'education') {
      newHistory.push({
        type: 'output',
        text: `EDUCATION ARCHIVE: ${HARISH_INFO.institution} — ${HARISH_INFO.degree} (${HARISH_INFO.graduationYear})\nWARPING CAMERA TO EDUCATION TIMELINE...`,
      });
      onWarpToChapter(4);
    } else if (lower === 'achievements') {
      newHistory.push({
        type: 'output',
        text: 'CONSTELLATIONS: Top Academic Rank at SSN, Java Full Stack Certification, 300+ LeetCode DSA, Full Stack Web Apps, Hackathon Finalist.\nWARPING TO CONSTELLATION...',
      });
      onWarpToChapter(3);
    } else if (lower === 'future') {
      newHistory.push({
        type: 'output',
        text: 'FUTURE HORIZONS: Cloud & Kubernetes, AI Agents, High-Scale System Design, Open Source Ecosystem.\nWARPING TO FUTURE GALAXY...',
      });
      onWarpToChapter(6);
    } else if (lower === 'contact') {
      newHistory.push({
        type: 'output',
        text: `EMAIL: ${HARISH_INFO.contacts.email}\nLINKEDIN: ${HARISH_INFO.contacts.linkedin}\nGITHUB: ${HARISH_INFO.contacts.github}\nWARPING TO CONTACT STARGATE...`,
      });
      onWarpToChapter(7);
    } else if (lower.startsWith('warp ')) {
      const target = parseInt(lower.split(' ')[1], 10);
      if (target >= 1 && target <= 8) {
        newHistory.push({ type: 'output', text: `HYPERDRIVE ENGAGED // WARPING TO SECTOR 0${target}...` });
        sound.playWarp();
        onWarpToChapter(target - 1);
      } else {
        newHistory.push({ type: 'error', text: 'INVALID SECTOR. SPECIFY NUMBER BETWEEN 1 AND 8 (e.g. warp 2)' });
      }
    } else if (lower === 'matrix') {
      setIsMatrixTheme(!isMatrixTheme);
      newHistory.push({ type: 'output', text: `CYBERNETIC MATRIX THEME: ${!isMatrixTheme ? 'ENABLED' : 'DISABLED'}` });
    } else if (lower === 'easteregg') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      newHistory.push({ type: 'output', text: '🎉 EASTER EGG UNLOCKED: Quantum celebration protocol active!' });
    } else if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'exit') {
      onClose();
      return;
    } else {
      newHistory.push({ type: 'error', text: `COMMAND NOT RECOGNIZED: "${cmd}". Type "help" for instructions.` });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="hologram-modal-backdrop" onClick={onClose}>
      <div
        className="terminal-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: isMatrixTheme ? '#22c55e' : 'rgba(0, 245, 255, 0.5)',
          boxShadow: isMatrixTheme ? '0 0 40px rgba(34, 197, 94, 0.4)' : '0 0 40px rgba(0, 245, 255, 0.25)',
        }}
      >
        {/* Terminal Title Bar */}
        <div className="terminal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TerminalIcon size={14} color={isMatrixTheme ? '#22c55e' : '#00f5ff'} />
            <span style={{
              fontSize: '12px',
              color: isMatrixTheme ? '#22c55e' : '#ffffff',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}>
              HARISH.OS DEVELOPER TERMINAL // bash-v4.2
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#eab308',
                cursor: 'pointer',
              }}
              title="Launch Easter Egg Confetti"
            >
              <Sparkles size={14} />
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Log Body */}
        <div
          ref={bodyRef}
          className="terminal-body"
          style={{
            color: isMatrixTheme ? '#22c55e' : '#38bdf8',
          }}
        >
          {history.map((line, idx) => (
            <div
              key={idx}
              style={{
                whiteSpace: 'pre-wrap',
                marginBottom: '6px',
                color:
                  line.type === 'error'
                    ? '#ef4444'
                    : line.type === 'user'
                    ? '#ffffff'
                    : isMatrixTheme
                    ? '#22c55e'
                    : '#38bdf8',
              }}
            >
              {line.text}
            </div>
          ))}

          {/* Interactive Command Line */}
          <form onSubmit={handleCommand} className="terminal-input-row">
            <span style={{ color: isMatrixTheme ? '#22c55e' : '#00f5ff', fontWeight: 700 }}>
              harish@os:~#
            </span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => {
                sound.playTerminalKey();
                setInputVal(e.target.value);
              }}
              autoFocus
              placeholder="type help, skills, projects, warp 2..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
