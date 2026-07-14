import { useState } from 'react';

export const useAvatar = (config) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Future interface for loading GLTF and managing generic avatar state
  return {
    isLoaded,
    error,
    model: null
  };
};
