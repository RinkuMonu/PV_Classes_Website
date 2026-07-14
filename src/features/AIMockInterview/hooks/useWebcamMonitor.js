import { useState, useEffect, useRef, useCallback } from 'react';

export const useWebcamMonitor = (requireCamera = true) => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('PENDING'); // PENDING, ACTIVE, DENIED, UNAVAILABLE, STOPPED
  const videoRef = useRef(null);

  const startCamera = useCallback(async () => {
    if (!requireCamera) return;
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setStatus('ACTIVE');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      // Downgrade to console.warn to prevent Next.js dev overlay from triggering on standard hardware contention
      console.warn("Camera initialization warning:", err.name, err.message);
      
      if (err.name === 'NotAllowedError') {
        setStatus('DENIED');
        setError('Camera access was denied.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setStatus('UNAVAILABLE');
        setError('Camera is in use by another application (NotReadableError).');
      } else {
        setStatus('UNAVAILABLE');
        setError(err.message);
      }
    }
  }, [requireCamera]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setStatus('STOPPED');
  }, [stream]);

  useEffect(() => {
    if (requireCamera) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [requireCamera]); // only run on mount or requirement change

  // TODO: Future Extension - Face Detection
  // Implement face detection logic here once a model is provided.
  // emit events: onFaceDetected, onFaceLost, onMultipleFaces

  return { stream, status, error, videoRef, retry: startCamera, stopCamera };
};
