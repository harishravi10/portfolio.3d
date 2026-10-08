import React from 'react';
import { CHAPTERS } from '../../data/portfolioData';
import { sound } from '../../audio/soundEngine';

export default function NavigationHUD({ currentChapterIndex, onWarpToChapter }) {
  const handleClick = (idx) => {
    if (idx === currentChapterIndex) return;
    sound.playWarp();
    onWarpToChapter(idx);
  };

  return (
    <div className="orbit-dock-wrapper interactive">
      {CHAPTERS.map((chap, idx) => {
        const isActive = currentChapterIndex === idx;

        return (
          <button
            key={chap.id}
            className={`dock-btn ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(idx)}
            onMouseEnter={() => !isActive && sound.playChirp(1600)}
            title={`Warp camera to ${chap.title}`}
          >
            <span style={{ opacity: isActive ? 1 : 0.6, fontSize: '11px' }}>
              {chap.index}
            </span>
            <span>{chap.label}</span>
          </button>
        );
      })}
    </div>
  );
}
