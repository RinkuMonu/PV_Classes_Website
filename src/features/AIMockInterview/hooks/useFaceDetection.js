import { useState, useEffect } from 'react';
import { PROCTORING_EVENTS } from '../utils/proctoringEvents';
import { proctoringService } from '../services/proctoringService';

export const useFaceDetection = (sessionId, videoRef, isEnabled = true) => {
  const [detectionStatus, setDetectionStatus] = useState(PROCTORING_EVENTS.DETECTION_UNAVAILABLE);

  useEffect(() => {
    if (!isEnabled || !videoRef?.current) {
      setDetectionStatus(PROCTORING_EVENTS.DETECTION_UNAVAILABLE);
      return;
    }

    // TODO: @mediapipe/tasks-vision installation is PENDING approval.
    // For now, we do NOT fake face detection. We just mark it as unavailable.
    setDetectionStatus(PROCTORING_EVENTS.DETECTION_UNAVAILABLE);
    proctoringService.logEvent(sessionId, PROCTORING_EVENTS.DETECTION_UNAVAILABLE);

    /*
    Example Future Implementation:
    const interval = setInterval(() => {
       const faces = await detector.detectForVideo(videoRef.current, performance.now());
       if (faces.length === 0) setStatus(NO_FACE);
       else if (faces.length > 1) setStatus(MULTIPLE_FACES);
       else setStatus(FACE_PRESENT);
    }, 500);
    return () => clearInterval(interval);
    */

  }, [sessionId, videoRef, isEnabled]);

  return { detectionStatus };
};
