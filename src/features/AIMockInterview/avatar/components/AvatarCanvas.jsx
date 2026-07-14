"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Html } from '@react-three/drei';
import AvatarModel from './AvatarModel';
import AvatarFallback from './AvatarFallback';
import AvatarLoader from './AvatarLoader';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function AvatarCanvas({ status = 'IDLE' }) {
  return (
    <div className="w-full h-full relative">
      <ErrorBoundary fallback={<AvatarFallback />}>
        <Canvas 
          shadows 
          camera={{ position: [0, 1.4, 1.5], fov: 45 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5,5,5]} intensity={2} castShadow />
            <directionalLight position={[-5,3,2]} intensity={1} />
            
            <axesHelper args={[2]} />
            <gridHelper args={[10,10]} />
            
            {/* Centered avatar group */}
            <group>
              <AvatarModel status={status} />
            </group>
          </Suspense>
          
          <OrbitControls 
            makeDefault
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            enableDamping={false}
            target={[0, 1.4, 0]} 
          />
        </Canvas>
      </ErrorBoundary>
      <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded text-xs text-white backdrop-blur-sm pointer-events-none">
        WebGL Canvas Active (Drag to rotate)
      </div>
    </div>
  );
}
