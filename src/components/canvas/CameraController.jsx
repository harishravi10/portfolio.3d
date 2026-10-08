import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CHAPTERS } from '../../data/portfolioData';

export default function CameraController({ 
  currentChapterIndex, 
  scrollProgress, 
  isWarping,
  mousePos,
  targetBuilding,
  targetPlanet
}) {
  const { camera } = useThree();
  const currentPosRef = useRef(new THREE.Vector3(0, 1.2, 10));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetPosRef = useRef(new THREE.Vector3(0, 1.2, 10));

  // Update target coordinates based on active chapter or focused object
  useEffect(() => {
    if (targetBuilding) {
      // Focus on specific Knowledge City building
      targetPosRef.current.set(
        targetBuilding.position[0],
        targetBuilding.height * 0.7 + 2,
        targetBuilding.position[2] + 9
      );
      targetLookAtRef.current.set(
        targetBuilding.position[0],
        targetBuilding.height * 0.5,
        targetBuilding.position[2]
      );
      return;
    }

    if (targetPlanet) {
      // Focus on specific Project Planet
      const angle = targetPlanet.orbitRadius * 0.4;
      const x = Math.cos(angle) * targetPlanet.orbitRadius;
      const z = Math.sin(angle) * targetPlanet.orbitRadius;
      targetPosRef.current.set(x + 4, 3, z + 5);
      targetLookAtRef.current.set(x, 0, z);
      return;
    }

    const chapter = CHAPTERS[currentChapterIndex] || CHAPTERS[0];
    targetPosRef.current.set(...chapter.cameraPos);
    targetLookAtRef.current.set(...chapter.lookAt);
  }, [currentChapterIndex, targetBuilding, targetPlanet]);

  useFrame((state, delta) => {
    // Cinematic lerp factor (faster during warp speed)
    const lerpSpeed = isWarping ? delta * 7.0 : delta * 2.8;

    // Mouse parallax offset (subtle, graceful)
    const mouseOffsetX = (mousePos.x || 0) * 0.7;
    const mouseOffsetY = (mousePos.y || 0) * 0.4;

    const desiredX = targetPosRef.current.x + mouseOffsetX;
    const desiredY = targetPosRef.current.y - mouseOffsetY;
    const desiredZ = targetPosRef.current.z;

    // Interpolate camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredY, lerpSpeed);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, lerpSpeed);

    // Interpolate lookAt target
    currentLookAtRef.current.x = THREE.MathUtils.lerp(currentLookAtRef.current.x, targetLookAtRef.current.x, lerpSpeed);
    currentLookAtRef.current.y = THREE.MathUtils.lerp(currentLookAtRef.current.y, targetLookAtRef.current.y, lerpSpeed);
    currentLookAtRef.current.z = THREE.MathUtils.lerp(currentLookAtRef.current.z, targetLookAtRef.current.z, lerpSpeed);

    camera.lookAt(currentLookAtRef.current);

    // Dynamic FOV adjustment during warp speed
    const targetFov = isWarping ? 75 : 55;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 4);
    camera.updateProjectionMatrix();
  });

  return null;
}
