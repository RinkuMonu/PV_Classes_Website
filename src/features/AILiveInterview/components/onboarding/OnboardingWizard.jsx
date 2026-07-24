"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Step Components (we will create these next)
import CandidateDetailsStep from './CandidateDetailsStep';
import TermsStep from './TermsStep';
import DeviceCheckStep from './DeviceCheckStep';
import CameraVerificationStep from './CameraVerificationStep';
import MicrophoneTestStep from './MicrophoneTestStep';
import EnvironmentCheckStep from './EnvironmentCheckStep';
import GuidelinesStep from './GuidelinesStep';
import PracticeQuestionStep from './PracticeQuestionStep';
import LoadingStep from './LoadingStep';

const STEPS = [
  { id: 'details', title: 'Candidate Details', Component: CandidateDetailsStep },
  { id: 'terms', title: 'Instructions', Component: TermsStep },
  { id: 'device', title: 'Device Check', Component: DeviceCheckStep },
  { id: 'camera', title: 'Camera', Component: CameraVerificationStep },
  { id: 'mic', title: 'Microphone', Component: MicrophoneTestStep },
  { id: 'env', title: 'Environment', Component: EnvironmentCheckStep },
  { id: 'guidelines', title: 'Guidelines', Component: GuidelinesStep },
  { id: 'practice', title: 'Practice', Component: PracticeQuestionStep },
  { id: 'loading', title: 'Interview Room', Component: LoadingStep }
];

export default function OnboardingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(0);
  
  // Data accumulated throughout the wizard
  const [sessionData, setSessionData] = useState({
    // Config from URL
    config: {
      exam: searchParams.get('exam') || 'SSC CGL',
      subject: searchParams.get('subject') || 'General Awareness',
      mode: searchParams.get('mode') || 'Normal Interview',
      duration: searchParams.get('duration') || '20 Minutes',
      focus: searchParams.get('focus') || 'Mixed',
      depth: searchParams.get('depth') || 'Moderate',
      language: searchParams.get('language') || 'English',
      displayLanguage: searchParams.get('displayLanguage') || 'English'
    },
    // User info collected
    candidate: {
      name: '',
      email: '',
      mobile: '',
      rollNumber: ''
    },
    // Verification states
    verification: {
      termsAccepted: false,
      deviceReady: false,
      cameraReady: false,
      micReady: false,
      envReady: false,
      practiceCompleted: false
    }
  });

  const handleNext = (updates = {}) => {
    setSessionData(prev => ({
      ...prev,
      ...updates
    }));

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Flow complete (Loading step finished), transition to session
      sessionStorage.setItem('aiLiveInterviewSessionData', JSON.stringify({
        ...sessionData,
        ...updates
      }));
      router.push('/ai-live-interview/session');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const CurrentComponent = STEPS[currentStep].Component;

  // Don't show stepper on the Loading Step
  const isFinalLoading = currentStep === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00316B] rounded-lg flex items-center justify-center text-white font-bold text-xl">
            PV
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#00316B] leading-tight">PV Classes</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">AI Live Interview Portal</p>
          </div>
        </div>
        <div className="hidden sm:block">
          <span className="bg-[#E6F5FC] text-[#009FE3] font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            Verification in Progress
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Left Sidebar: Progress Stepper */}
        {!isFinalLoading && (
          <aside className="w-full md:w-[280px] bg-white border-r border-gray-200 p-6 flex flex-col shrink-0 md:h-[calc(100vh-73px)] overflow-y-auto">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8 border-b border-gray-100 pb-3">
              Onboarding Progress
            </h2>
            
            <div className="flex flex-col gap-0 relative">
              {STEPS.map((step, idx) => {
                if (idx === STEPS.length - 1) return null; // Hide loading from stepper
                const isActive = idx === currentStep;
                const isPast = idx < currentStep;
                
                return (
                  <div key={step.id} className="flex items-start group relative">
                    {/* Vertical Line Connection */}
                    {idx < STEPS.length - 2 && (
                      <div className={`absolute top-6 left-[15px] bottom-[-24px] w-[2px] transition-colors ${
                        isPast ? 'bg-[#009FE3]' : 'bg-gray-100'
                      }`}></div>
                    )}
                    
                    <div className="relative z-10 flex flex-col items-center mr-4 bg-white py-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm border-2 ${
                        isPast ? 'bg-[#009FE3] border-[#009FE3] text-white' :
                        isActive ? 'bg-white border-[#009FE3] text-[#009FE3] shadow-md scale-110' :
                        'bg-gray-50 border-gray-200 text-gray-400'
                      }`}>
                        {isPast ? '✓' : idx + 1}
                      </div>
                    </div>
                    
                    <div className="py-2.5">
                      <span className={`text-sm font-bold block transition-colors ${
                        isPast ? 'text-gray-700' :
                        isActive ? 'text-[#00316B]' :
                        'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* Right Content: Active Step */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto bg-gray-50 relative">
          
          <div className={`w-full max-w-3xl transition-all duration-500 transform ${isFinalLoading ? 'max-w-xl' : ''}`}>
             <CurrentComponent 
                sessionData={sessionData} 
                onNext={handleNext} 
                onBack={handleBack} 
             />
          </div>

        </div>
      </main>

    </div>
  );
}
