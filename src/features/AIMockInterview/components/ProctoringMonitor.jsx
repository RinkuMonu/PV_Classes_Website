import { useFaceDetection } from '../hooks/useFaceDetection';
import { PROCTORING_EVENTS } from '../utils/proctoringEvents';

export default function ProctoringMonitor({ sessionId, videoRef, isEnabled }) {
  const { detectionStatus } = useFaceDetection(sessionId, videoRef, isEnabled);

  if (!isEnabled) return null;

  return (
    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10 flex items-center gap-1">
      {detectionStatus === PROCTORING_EVENTS.DETECTION_UNAVAILABLE && (
        <span className="text-gray-300 italic">Face Detection Pending...</span>
      )}
      {/* 
        Future statuses:
        {detectionStatus === PROCTORING_EVENTS.FACE_PRESENT && <span className="text-green-400">● Good</span>}
        {detectionStatus === PROCTORING_EVENTS.NO_FACE && <span className="text-red-400 font-bold">● No Face Detected</span>}
        {detectionStatus === PROCTORING_EVENTS.MULTIPLE_FACES && <span className="text-red-400 font-bold">● Multiple Faces</span>}
      */}
    </div>
  );
}
