import { useEffect } from 'react';

export const useAvatarAnimation = (model, status) => {
  // Future interface for Three.js / React Three Fiber AnimationMixer
  useEffect(() => {
    // Crossfade logic will go here
  }, [status]);

  return {
    actions: null
  };
};
