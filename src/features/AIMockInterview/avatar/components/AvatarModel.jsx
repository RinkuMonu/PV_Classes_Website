"use client";
import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useAvatarIdle } from '../hooks/useAvatarIdle';

export default function AvatarModel({ url = '/models/646d9dcdc8a5f5bddbfac913.glb', status = 'IDLE' }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);

  // Apply procedural idle animations
  useAvatarIdle({ scene, status });

  // Inspect the model structure when loaded
  useEffect(() => {
    if (!scene) return;

    console.log("--------------------------------");
    console.log("Scene hierarchy");
    console.log("scene", scene);
    console.log("scene.children", scene.children);
    console.log("--------------------------------");

    const meshNames = [];
    const skinnedMeshNames = [];
    const boneNames = [];

    const animationNames = animations ? animations.map(a => a.name) : [];
    const morphTargets = {};

    scene.traverse((child) => {
      if (child.isMesh) meshNames.push(child.name);
      if (child.isSkinnedMesh) {
        skinnedMeshNames.push(child.name);
        if (child.morphTargetDictionary) {
          morphTargets[child.name] = child.morphTargetDictionary;
        }
      }
      if (child.isBone) boneNames.push(child.name);
    });

    console.log("Mesh Names");
    console.log(meshNames);
    console.log("--------------------------------");
    console.log("Skinned Mesh Names");
    console.log(skinnedMeshNames);
    console.log("--------------------------------");
    console.log("Bone Names");
    console.log(boneNames);
    console.log("--------------------------------");
    console.log("Animation Names");
    console.log(animationNames);
    console.log("--------------------------------");
    console.log("Morph Target Dictionary");
    Object.entries(morphTargets).forEach(([meshName, dict]) => {
      console.log(`[${meshName}]:`, dict);
    });

    console.log("==================================================");
    console.log("Avatar Loaded Successfully");
    console.log(`Meshes: ${meshNames.length}`);
    console.log(`Animations: ${animationNames.length}`);
    console.log(`Skinned Meshes: ${skinnedMeshNames.length}`);
    console.log(`Morph Targets: ${Object.keys(morphTargets).length} meshes have morph targets`);
    console.log("==================================================");

    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.frustumCulled = false;
        if (obj.material) {
          obj.material.side = THREE.DoubleSide;
          obj.material.transparent = false;
          obj.material.opacity = 1;
          obj.material.depthWrite = true;
          obj.material.needsUpdate = true;
        }
      }
    });

    console.log("Final Scene Transforms:");
    console.log("Position:", scene.position);
    console.log("Rotation:", scene.rotation);
    console.log("Scale:", scene.scale);

    // Automatically center using bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    
    scene.position.x = -center.x;
    scene.position.z = -center.z;

  }, [scene, animations]);

  // ---------------------------------------------------------
  // INSPECTION ONLY - Added per request
  const { camera } = useThree();
  useEffect(() => {
    if (!scene || !camera) return;

    // 1. Bounding box size
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    // 2. Bounding sphere radius
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);

    // 3. Model position
    // 4. Model rotation
    // 5. Model scale
    const pos = scene.position;
    const rot = scene.rotation;
    const scl = scene.scale;

    // 6. Camera position
    const camPos = camera.position;

    // 7. Camera target
    // We can infer target from the controls or the camera's looking direction
    const camTarget = new THREE.Vector3();
    camera.getWorldDirection(camTarget);
    camTarget.multiplyScalar(5).add(camPos); // approximate target point

    // 8. Whether the model is inside the camera frustum
    const frustum = new THREE.Frustum();
    const projScreenMatrix = new THREE.Matrix4();
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(projScreenMatrix);
    const inFrustum = frustum.intersectsBox(box);

    // DEEP SCENE GRAPH INSPECTION
    console.log("=== DEEP SCENE GRAPH INSPECTION ===");
    console.log(`scene.children.length: ${scene.children.length}`);

    scene.children.forEach((child) => {
      console.log(`Direct Child -> name: ${child.name}, type: ${child.type}, visible: ${child.visible}`);
    });

    scene.traverse((obj) => {
      console.log("--------------------------------");
      console.log(`Object Name: ${obj.name}`);
      console.log(`Object Type: ${obj.type}`);
      console.log(`Visible: ${obj.visible}`);
      console.log(`Position: x:${obj.position.x}, y:${obj.position.y}, z:${obj.position.z}`);
      console.log(`Scale: x:${obj.scale.x}, y:${obj.scale.y}, z:${obj.scale.z}`);

      if (obj.material) {
        console.log(`Material Name: ${obj.material.name}`);
        console.log(`Material Opacity: ${obj.material.opacity}`);
        console.log(`Material Transparent: ${obj.material.transparent}`);
      } else {
        console.log(`Material Name: N/A`);
        console.log(`Material Opacity: N/A`);
        console.log(`Material Transparent: N/A`);
      }

      console.log(`Geometry Exists: ${!!obj.geometry}`);
      console.log(`Parent Name: ${obj.parent ? obj.parent.name : 'null'}`);
    });
    console.log("--------------------------------");
    console.log("AvatarModel is returning <primitive object={scene} />");
    console.log("====================================");

  }, [scene, camera]);
  // ---------------------------------------------------------

  return (
    <primitive
      ref={group}
      object={scene}
      rotation={[0, 0, 0]}
      scale={2}
    />
  );
}

// Preload the model to prevent UI jank
useGLTF.preload('/models/646d9dcdc8a5f5bddbfac913.glb');
