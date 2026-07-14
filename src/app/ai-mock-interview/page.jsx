import InterviewSetup from '../../features/AIMockInterview/components/InterviewSetup';

export const metadata = {
  title: "AI-Powered Adaptive Mock Interview | PV Classes",
  description: "Take an AI-powered mock interview to test your preparation for SSC, Railway, and Banking exams.",
};

export default function AIMockInterviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <InterviewSetup />
    </div>
  );
}
