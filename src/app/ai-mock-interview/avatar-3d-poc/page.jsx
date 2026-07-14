import React from 'react';
import AvatarClientWrapper from './AvatarClientWrapper';

export const metadata = {
  title: 'Avatar 3D POC - PV Classes',
  description: 'Isolated Three.js testing ground for the AI Interviewer 3D model.',
};

export default function Avatar3DPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <AvatarClientWrapper />
    </div>
  );
}
