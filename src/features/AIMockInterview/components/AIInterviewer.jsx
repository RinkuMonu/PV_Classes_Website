"use client";
import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Avatar } from '../src/components/Avatar';

function FaceScene({ isSpeaking }) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 4, 3]} intensity={2} castShadow />
      <directionalLight position={[-3, 2, 2]} intensity={0.8} />
      <Environment preset="studio" />
      {/* Avatar at origin; camera looks at its face */}
      <Avatar
        position={[0, -1.58, 0]}
        scale={1}
        isSpeaking={isSpeaking}
      />
    </>
  );
}

export default function AIInterviewer({ status, isSpeaking = false }) {
  // Debug logging
  useEffect(() => {
    console.log('🎙️ AIInterviewer - isSpeaking:', isSpeaking, 'status:', status);
  }, [isSpeaking, status]);
  
  return (
    <div
      className="w-full shadow-inner rounded-2xl bg-white overflow-hidden"
      style={{ height: 320, background: '#f4f6fb', cursor: 'default' }}
    >
      <Canvas
        camera={{ position: [0, 0.08, 0.85], fov: 28 }}
        style={{ cursor: 'default' }}
      >
        <Suspense fallback={null}>
          <FaceScene isSpeaking={isSpeaking} />
        </Suspense>
      </Canvas>
    </div>
  );
}
