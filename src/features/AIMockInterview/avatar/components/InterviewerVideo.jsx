import React, { useRef, useEffect, useState } from 'react';
import VideoPlaceholder from './VideoPlaceholder';

export default function InterviewerVideo() {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Attempt to load and play the single video on mount
  useEffect(() => {
    if (videoRef.current && !hasError) {
      videoRef.current.play().catch((err) => {
        // Suppress expected Autoplay errors or missing file errors cleanly
        setHasError(true);
      });
    }
  }, [hasError]);

  if (hasError) {
    return <VideoPlaceholder />;
  }

  return (
    <>
      {!isVideoReady && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#009FE3] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src="/videos/avatar/interviewer.mp4"
        className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setIsVideoReady(true)}
        onError={() => setHasError(true)}
      />
    </>
  );
}
