import React, { useState, useEffect, useRef, useCallback } from 'react';
import UniverseCanvas from './components/canvas/UniverseCanvas';
import HeaderHUD from './components/hud/HeaderHUD';
import NavigationHUD from './components/hud/NavigationHUD';
import StatusHUD from './components/hud/StatusHUD';
import MinimapHUD from './components/hud/MinimapHUD';
import IntroOverlay from './components/hud/IntroOverlay';
import ProjectModal from './components/hud/ProjectModal';
import BuildingModal from './components/hud/BuildingModal';
import AchievementModal from './components/hud/AchievementModal';
import TerminalModal from './components/hud/TerminalModal';
import IdleDetector from './components/hud/IdleDetector';
import { sound } from './audio/soundEngine';
import { CHAPTERS } from './data/portfolioData';
import './App.css';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Modal inspection states
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Wheel accumulation & throttle
  const wheelAccumulatorRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const touchStartYRef = useRef(0);

  // Warp transition trigger
  const warpToChapter = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= CHAPTERS.length) return;
    
    setIsWarping(true);
    sound.playWarp();
    setCurrentChapterIndex(targetIndex);
    setScrollProgress(targetIndex / (CHAPTERS.length - 1));

    // Clear focused object if any
    setSelectedBuilding(null);
    setSelectedPlanet(null);

    setTimeout(() => {
      setIsWarping(false);
    }, 750);
  }, []);

  // Handle Wheel Scroll (Camera Journey)
  useEffect(() => {
    const handleWheel = (e) => {
      // Don't intercept if user is scrolling inside a modal or terminal
      if (selectedBuilding || selectedPlanet || selectedAchievement || isTerminalOpen) {
        return;
      }

      e.preventDefault();
      const now = Date.now();
      wheelAccumulatorRef.current += e.deltaY;

      // Threshold to trigger chapter step
      if (Math.abs(wheelAccumulatorRef.current) > 120 && now - lastScrollTimeRef.current > 350) {
        lastScrollTimeRef.current = now;
        if (wheelAccumulatorRef.current > 0) {
          // Scroll Down / Forward
          if (currentChapterIndex < CHAPTERS.length - 1) {
            warpToChapter(currentChapterIndex + 1);
          }
        } else {
          // Scroll Up / Backward
          if (currentChapterIndex > 0) {
            warpToChapter(currentChapterIndex - 1);
          }
        }
        wheelAccumulatorRef.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentChapterIndex, selectedBuilding, selectedPlanet, selectedAchievement, isTerminalOpen, warpToChapter]);

  // Touch Gesture Handling for Mobile / Tablet
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (selectedBuilding || selectedPlanet || selectedAchievement || isTerminalOpen) return;
      if (e.changedTouches && e.changedTouches[0]) {
        const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
        if (Math.abs(deltaY) > 50) {
          if (deltaY > 0 && currentChapterIndex < CHAPTERS.length - 1) {
            warpToChapter(currentChapterIndex + 1);
          } else if (deltaY < 0 && currentChapterIndex > 0) {
            warpToChapter(currentChapterIndex - 1);
          }
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentChapterIndex, selectedBuilding, selectedPlanet, selectedAchievement, isTerminalOpen, warpToChapter]);

  // Keyboard navigation & Shortcuts (~ for terminal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTerminalOpen) return;

      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        sound.playTerminalKey();
        setIsTerminalOpen(true);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentChapterIndex < CHAPTERS.length - 1) warpToChapter(currentChapterIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentChapterIndex > 0) warpToChapter(currentChapterIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterIndex, isTerminalOpen, warpToChapter]);

  // Mouse move parallax tracker
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <div className="app-container" onMouseMove={handleMouseMove}>
      {/* Cinematic Intro Launch Sequence */}
      {!introFinished && (
        <IntroOverlay onComplete={() => setIntroFinished(true)} />
      )}

      {/* Warp Tunnel Post-Processing Visual Feedback */}
      {isWarping && <div className="warp-tunnel-active" />}

      {/* 3D WebGL Digital Universe */}
      <UniverseCanvas
        currentChapterIndex={currentChapterIndex}
        scrollProgress={scrollProgress}
        isWarping={isWarping}
        mousePos={mousePos}
        targetBuilding={selectedBuilding}
        targetPlanet={selectedPlanet}
        onSelectBuilding={(building) => setSelectedBuilding(building)}
        onSelectPlanet={(planet) => setSelectedPlanet(planet)}
        onSelectAchievement={(achievement) => setSelectedAchievement(achievement)}
        onSelectMilestone={() => {}}
        onWarpToChapter={warpToChapter}
      />

      {/* HUD UI Layer */}
      <div className="ui-layer">
        <HeaderHUD
          onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
          onActivateEasterEgg={() => setIsTerminalOpen(true)}
        />

        <NavigationHUD
          currentChapterIndex={currentChapterIndex}
          onWarpToChapter={warpToChapter}
        />

        <StatusHUD
          currentChapterIndex={currentChapterIndex}
          scrollProgress={scrollProgress}
        />

        <MinimapHUD currentChapterIndex={currentChapterIndex} />
      </div>

      {/* Interactive Modals */}
      {selectedPlanet && (
        <ProjectModal
          project={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}

      {selectedBuilding && (
        <BuildingModal
          building={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
        />
      )}

      {selectedAchievement && (
        <AchievementModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onWarpToChapter={(idx) => {
          warpToChapter(idx);
        }}
      />

      {/* Idle Prompt */}
      <IdleDetector onTriggerExplore={() => {}} />
    </div>
  );
}
