"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import AvatarModel from './AvatarModel';
import AvatarFallback from './AvatarFallback';

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
    <div className="w-full h-full relative" style={{ background: '#f8f9fc' }}>
      <ErrorBoundary fallback={<AvatarFallback />}>
        <Canvas
          shadows
          camera={{ position: [0, 1.62, 0.55], fov: 28 }}
          style={{ cursor: 'default' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.4} />
            <directionalLight position={[2, 4, 3]} intensity={2} castShadow />
            <directionalLight position={[-3, 2, 2]} intensity={0.8} />
            <Environment preset="studio" />

            {/* Avatar — face framed at chest level */}
            <group>
              <AvatarModel status={status} />
            </group>
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
