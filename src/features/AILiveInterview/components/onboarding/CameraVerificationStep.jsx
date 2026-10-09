import React, { useRef, useEffect } from 'react';

export default function CameraVerificationStep({ sessionData, onNext, onBack }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleContinue = () => {
    onNext({ verification: { ...sessionData.verification, cameraReady: true } });
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-[#00316B] px-8 py-6 text-white flex items-center gap-4">
        <span className="text-3xl">📸</span>
        <div>
          <h2 className="text-2xl font-bold">Camera Verification</h2>
          <p className="text-blue-200 text-sm mt-1">Please position your face clearly in the frame.</p>
        </div>
      </div>
      
      <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
        
        {/* Live Camera Preview */}
        <div className="w-full md:w-1/2">
          <div className="rounded-2xl overflow-hidden bg-gray-900 aspect-video relative border-4 border-gray-100 shadow-inner">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover transform scale-x-[-1]"
            ></video>
            
            {/* Guide overlay */}
            <div className="absolute inset-0 border-2 border-dashed border-[#009FE3]/50 rounded-2xl m-4 pointer-events-none"></div>
            
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Feed
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Positioning Guide</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-[#009FE3] mt-0.5">🔹</span>
              <p className="text-sm text-gray-600 font-medium">Position your face squarely inside the frame.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#009FE3] mt-0.5">🔹</span>
              <p className="text-sm text-gray-600 font-medium">Ensure good lighting. The light source should be in front of you, not behind.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#009FE3] mt-0.5">🔹</span>
              <p className="text-sm text-gray-600 font-medium">Remove sunglasses or any heavy face coverings.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#009FE3] mt-0.5">🔹</span>
              <p className="text-sm text-gray-600 font-medium">Look directly at the camera while speaking during the interview.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="px-8 pb-8 pt-4 flex justify-between items-center border-t border-gray-100 bg-gray-50/50">
        <button 
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
        >
          ← Back
        </button>
        
        <button 
          onClick={handleContinue}
          className="px-8 py-3 bg-[#009FE3] hover:bg-blue-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
        >
          Looks Good <span>→</span>
        </button>
      </div>
    </div>
  );
}
