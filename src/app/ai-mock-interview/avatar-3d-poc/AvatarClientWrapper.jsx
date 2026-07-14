"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const HumanAvatarStage = dynamic(
  () => import('../../../features/AIMockInterview/avatar/components/HumanAvatarStage'),
  { ssr: false }
);

export default function AvatarClientWrapper() {
  return <HumanAvatarStage status="IDLE" />;
}
