import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useAvatarIdle({ scene, status = 'IDLE' }) {
  const bones = useRef({
    head: null,
    neck: null,
    chest: null,
    spine: null,
  });

  const blinkState = useRef({
    nextBlinkTime: 0,
    isBlinking: false,
    blinkStartTime: 0,
    morphMeshes: [],
    blinkIndices: [],
  });

  const timeRef = useRef(0);
  const targetHeadRotation = useRef(new THREE.Vector2(0, 0));
  const currentHeadRotation = useRef(new THREE.Vector2(0, 0));

  const lipSyncState = useRef({
    morphMeshes: [],
    mouthIndices: [],
    activeIndices: [],
    currentVisemeValue: 0,
    nextVisemeTime: 0,
  });

  // Initialize and find bones / morph targets
  useEffect(() => {
    if (!scene) return;

    let foundBlink = false;
    const morphMeshes = [];
    const blinkIndices = [];

    scene.traverse((child) => {
      // Find bones
      if (child.isBone) {
        const name = child.name.toLowerCase();
        if (name.includes('head') && !bones.current.head) bones.current.head = child;
        else if (name.includes('neck') && !bones.current.neck) bones.current.neck = child;
        else if ((name.includes('chest') || name.includes('spine2')) && !bones.current.chest) bones.current.chest = child;
        else if (name.includes('spine') && !bones.current.spine) bones.current.spine = child;
      }

      // Find eye blink morph targets
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        let blinkIndexL = -1;
        let blinkIndexR = -1;
        
        Object.keys(child.morphTargetDictionary).forEach((key) => {
          const lowerKey = key.toLowerCase();
          if (lowerKey.includes('blink') || lowerKey.includes('eyeclosed') || lowerKey.includes('eyesclosed')) {
            if (lowerKey.includes('left') || lowerKey.includes('_l')) blinkIndexL = child.morphTargetDictionary[key];
            else if (lowerKey.includes('right') || lowerKey.includes('_r')) blinkIndexR = child.morphTargetDictionary[key];
            else {
              // Both eyes combined
              blinkIndexL = child.morphTargetDictionary[key];
              blinkIndexR = child.morphTargetDictionary[key];
            }
          }
        });

        // Find mouth/jaw/viseme morph targets for lip sync
        const localMouthIndices = [];
        Object.keys(child.morphTargetDictionary).forEach((key) => {
          const lowerKey = key.toLowerCase();
          if (lowerKey.includes('viseme') || lowerKey.includes('jawopen') || lowerKey.includes('mouthopen')) {
            localMouthIndices.push(child.morphTargetDictionary[key]);
          }
        });

        if (localMouthIndices.length > 0) {
          lipSyncState.current.morphMeshes.push(child);
          lipSyncState.current.mouthIndices.push(localMouthIndices);
        }

        if (blinkIndexL !== -1 || blinkIndexR !== -1) {
          morphMeshes.push(child);
          blinkIndices.push({ l: Math.max(0, blinkIndexL), r: Math.max(0, blinkIndexR) });
          foundBlink = true;
        }
      }
    });

    blinkState.current.morphMeshes = morphMeshes;
    blinkState.current.blinkIndices = blinkIndices;
    blinkState.current.nextBlinkTime = performance.now() + 2000 + Math.random() * 4000;

    console.log("Idle Animation Ready");
    
    if (foundBlink) {
      console.log("Blink System Ready");
    } else {
      console.log("No eye blink morph targets detected.");
    }
    
    if (lipSyncState.current.morphMeshes.length > 0) {
      console.log(`Lip Sync System Ready: Found mouth morphs on ${lipSyncState.current.morphMeshes.length} meshes.`);
    } else {
      console.log("No mouth/jaw morph targets detected for lip sync.");
    }

    console.log("Head Motion Ready");
    console.log("Model Ready");

  }, [scene]);

  // Main animation loop
  useFrame((state, delta) => {
    if (!scene) return;

    const time = state.clock.elapsedTime;
    timeRef.current += delta;

    // 1. Breathing (Chest/Spine motion)
    if (bones.current.chest) {
      // Very slow amplitude for breathing
      const breathScale = 0.005;
      const breath = Math.sin(time * 1.5) * breathScale;
      bones.current.chest.scale.setScalar(1 + breath);
      
      // Slight rotation of chest to simulate expanding lungs
      bones.current.chest.rotation.x = THREE.MathUtils.lerp(
        bones.current.chest.rotation.x,
        bones.current.chest.rotation.x + (Math.sin(time * 1.5) * 0.002),
        0.1
      );
    }

    // 2. Head Motion (Subtle ambient movement)
    // Update target rotation periodically based on status
    if (Math.random() < 0.02) { // 2% chance per frame to pick a new target
      let maxTiltX = 0.03;
      let maxTiltY = 0.05;

      switch (status) {
        case 'LISTENING':
          maxTiltX = 0.05; // Slightly more tilt forward
          maxTiltY = 0.08;
          targetHeadRotation.current.set(
            (Math.random() - 0.2) * maxTiltX, // Bias looking slightly down/forward
            (Math.random() - 0.5) * maxTiltY
          );
          break;
        case 'PROCESSING':
          maxTiltX = 0.02;
          maxTiltY = 0.06;
          targetHeadRotation.current.set(
            (Math.random() - 0.8) * maxTiltX, // Bias looking slightly up
            (Math.random() - 0.5) * maxTiltY
          );
          break;
        case 'SPEAKING':
        case 'IDLE':
        default:
          targetHeadRotation.current.set(
            (Math.random() - 0.5) * maxTiltX,
            (Math.random() - 0.5) * maxTiltY
          );
          break;
      }
    }

    // Smoothly damp current rotation towards target
    currentHeadRotation.current.x = THREE.MathUtils.damp(currentHeadRotation.current.x, targetHeadRotation.current.x, 2, delta);
    currentHeadRotation.current.y = THREE.MathUtils.damp(currentHeadRotation.current.y, targetHeadRotation.current.y, 2, delta);

    if (bones.current.head) {
      // Base idle head sway + targeted tilt
      const ambientX = Math.sin(time * 0.5) * 0.01;
      const ambientY = Math.cos(time * 0.4) * 0.015;
      
      bones.current.head.rotation.x = currentHeadRotation.current.x + ambientX;
      bones.current.head.rotation.y = currentHeadRotation.current.y + ambientY;
    }

    if (bones.current.neck) {
      // Neck follows head slightly
      bones.current.neck.rotation.x = currentHeadRotation.current.x * 0.5;
      bones.current.neck.rotation.y = currentHeadRotation.current.y * 0.5;
    }

    // 3. Blink System
    if (blinkState.current.morphMeshes.length > 0) {
      const now = performance.now();
      
      if (!blinkState.current.isBlinking && now > blinkState.current.nextBlinkTime) {
        // Start blink
        blinkState.current.isBlinking = true;
        blinkState.current.blinkStartTime = now;
      }

      if (blinkState.current.isBlinking) {
        const blinkDuration = 150; // ms
        const elapsed = now - blinkState.current.blinkStartTime;
        let blinkValue = 0;

        if (elapsed < blinkDuration / 2) {
          // Closing
          blinkValue = elapsed / (blinkDuration / 2);
        } else if (elapsed < blinkDuration) {
          // Opening
          blinkValue = 1 - ((elapsed - blinkDuration / 2) / (blinkDuration / 2));
        } else {
          // Done blinking
          blinkState.current.isBlinking = false;
          blinkState.current.nextBlinkTime = now + 2000 + Math.random() * 4000;
          blinkValue = 0;
        }

        blinkValue = Math.max(0, Math.min(1, blinkValue));

        // Apply morph target
        blinkState.current.morphMeshes.forEach((mesh, idx) => {
          const { l, r } = blinkState.current.blinkIndices[idx];
          if (l !== -1 && mesh.morphTargetInfluences[l] !== undefined) {
            mesh.morphTargetInfluences[l] = blinkValue;
          }
          if (r !== -1 && l !== r && mesh.morphTargetInfluences[r] !== undefined) {
            mesh.morphTargetInfluences[r] = blinkValue;
          }
        });
      }
    }

    // 4. Lip Sync System (Tied to Browser TTS)
    const isSpeaking = (status === 'SPEAKING') || (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking);
    
    if (isSpeaking && lipSyncState.current.morphMeshes.length > 0) {
      const now = performance.now();
      
      // Pick a new viseme randomly every 50-150ms to simulate talking
      if (!lipSyncState.current.nextVisemeTime || now > lipSyncState.current.nextVisemeTime) {
        lipSyncState.current.currentVisemeValue = Math.random() * 0.7 + 0.3; // 0.3 to 1.0
        lipSyncState.current.nextVisemeTime = now + 50 + Math.random() * 100; 
        
        lipSyncState.current.activeIndices = lipSyncState.current.mouthIndices.map(indices => 
          indices[Math.floor(Math.random() * indices.length)]
        );
      }

      // Smoothly apply to the chosen morph
      lipSyncState.current.morphMeshes.forEach((mesh, meshIdx) => {
        const targetIndex = lipSyncState.current.activeIndices[meshIdx];
        const indices = lipSyncState.current.mouthIndices[meshIdx];
        
        indices.forEach(idx => {
          const targetValue = (idx === targetIndex) ? lipSyncState.current.currentVisemeValue : 0;
          mesh.morphTargetInfluences[idx] = THREE.MathUtils.damp(
            mesh.morphTargetInfluences[idx] || 0,
            targetValue,
            15,
            delta
          );
        });
      });
    } else if (lipSyncState.current.morphMeshes.length > 0) {
      // Close mouth smoothly when not speaking
      lipSyncState.current.morphMeshes.forEach((mesh, meshIdx) => {
        const indices = lipSyncState.current.mouthIndices[meshIdx];
        indices.forEach(idx => {
          if (mesh.morphTargetInfluences[idx] > 0.01) {
             mesh.morphTargetInfluences[idx] = THREE.MathUtils.damp(
               mesh.morphTargetInfluences[idx],
               0,
               10,
               delta
             );
          } else {
             mesh.morphTargetInfluences[idx] = 0;
          }
        });
      });
    }
  });
}
