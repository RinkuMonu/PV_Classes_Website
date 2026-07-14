"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const Avatar3DPOC = dynamic(
  () => import('../../../features/AIMockInterview/avatar3d/components/Avatar3DPOC'),
  { ssr: false }
);

export default function AvatarClientWrapper() {
  return <Avatar3DPOC />;
}
