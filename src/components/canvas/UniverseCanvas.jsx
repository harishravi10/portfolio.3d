import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import StarField from './StarField';
import CoreChapter from './chapters/CoreChapter';
import KnowledgeCity from './chapters/KnowledgeCity';
import ProjectPlanets from './chapters/ProjectPlanets';
import AchievementConstellation from './chapters/AchievementConstellation';
import EducationArchive from './chapters/EducationArchive';
import CodingDimension from './chapters/CodingDimension';
import FutureGalaxy from './chapters/FutureGalaxy';
import ContactPortal from './chapters/ContactPortal';

export default function UniverseCanvas({
  currentChapterIndex,
  scrollProgress,
  isWarping,
  mousePos,
  targetBuilding,
  targetPlanet,
  onSelectBuilding,
  onSelectPlanet,
  onSelectAchievement,
  onSelectMilestone,
  onWarpToChapter,
}) {
  return (
    <div className="canvas-wrapper">
      <Canvas
        camera={{ position: [0, 1.2, 10], fov: 55, near: 0.1, far: 500 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 15, 130]} />

        {/* Lighting Configuration */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 15]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#00f5ff" distance={30} />
        <pointLight position={[0, 10, -18]} intensity={2.0} color="#38bdf8" distance={40} />
        <pointLight position={[0, 0, -42]} intensity={3.5} color="#00f5ff" distance={60} />
        <pointLight position={[0, 5, -188]} intensity={3.0} color="#a855f7" distance={45} />

        {/* Dynamic Camera Controller */}
        <CameraController
          currentChapterIndex={currentChapterIndex}
          scrollProgress={scrollProgress}
          isWarping={isWarping}
          mousePos={mousePos}
          targetBuilding={targetBuilding}
          targetPlanet={targetPlanet}
        />

        {/* Global Celestial Star Systems */}
        <StarField isWarping={isWarping} />

        <Suspense fallback={null}>
          {/* Chapter 01: Core Origin */}
          <CoreChapter
            isActive={currentChapterIndex <= 1}
            mousePos={mousePos}
            onWarpToCity={() => onWarpToChapter(1)}
          />

          {/* Chapter 02: Knowledge City */}
          <KnowledgeCity
            isActive={currentChapterIndex >= 0 && currentChapterIndex <= 2}
            onSelectBuilding={onSelectBuilding}
          />

          {/* Chapter 03: Project Planets */}
          <ProjectPlanets
            isActive={currentChapterIndex >= 1 && currentChapterIndex <= 3}
            onSelectPlanet={onSelectPlanet}
          />

          {/* Chapter 04: Achievement Constellation */}
          <AchievementConstellation
            isActive={currentChapterIndex >= 2 && currentChapterIndex <= 4}
            onSelectAchievement={onSelectAchievement}
          />

          {/* Chapter 05: Education Archive */}
          <EducationArchive
            isActive={currentChapterIndex >= 3 && currentChapterIndex <= 5}
            onSelectMilestone={onSelectMilestone}
          />

          {/* Chapter 06: Coding Dimension */}
          <CodingDimension
            isActive={currentChapterIndex >= 4 && currentChapterIndex <= 6}
          />

          {/* Chapter 07: Future Galaxy */}
          <FutureGalaxy
            isActive={currentChapterIndex >= 5 && currentChapterIndex <= 7}
          />

          {/* Chapter 08: The Contact Portal */}
          <ContactPortal
            isActive={currentChapterIndex >= 6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
