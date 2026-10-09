import React, { Suspense } from 'react';
import OnboardingWizard from '../../../features/AILiveInterview/components/onboarding/OnboardingWizard';

export const metadata = {
  title: "Candidate Verification - AI Live Interview",
  description: "Complete the candidate verification flow to enter the AI Live Interview room.",
};

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Verification...</div>}>
      <OnboardingWizard />
    </Suspense>
  );
}
