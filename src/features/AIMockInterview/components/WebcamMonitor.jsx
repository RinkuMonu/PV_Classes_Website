import { useEffect } from 'react';

export default function WebcamMonitor({ stream, status, videoRef, error, retry }) {
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div className="bg-black rounded-lg overflow-hidden relative aspect-video shadow-inner flex flex-col items-center justify-center">
      {status === 'ACTIVE' && (
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
      )}
      
      {status === 'PENDING' && (
        <div className="text-white text-sm animate-pulse">Requesting Camera Permission...</div>
      )}
      
      {status === 'DENIED' && (
        <div className="text-red-400 flex flex-col items-center text-sm p-4 text-center">
          <span className="mb-2">Camera permission denied.</span>
          <button onClick={retry} className="px-4 py-2 bg-red-900/50 rounded hover:bg-red-800 text-white transition">Retry</button>
        </div>
      )}
      
      {status === 'UNAVAILABLE' && (
        <div className="text-yellow-400 text-sm p-4 text-center">
          Camera not available. {error}
        </div>
      )}

      {/* Overlay Status */}
      <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white flex items-center">
        <div className={`w-2 h-2 rounded-full mr-2 ${status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        {status === 'ACTIVE' ? 'Live Preview' : 'Camera Off'}
      </div>
      
      {/* TODO: Future Extension - Face Detection UI Indicators */}
      {/* <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded animate-pulse">No Face Detected</div> */}
    </div>
  );
}
