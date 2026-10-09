import LiveInterviewSession from '../../../features/AILiveInterview/components/LiveInterviewSession';

export const metadata = {
  title: "AI Live Interview | PV Classes",
  description: "Take a live AI-powered interview to test your preparation.",
};

export default function AILiveInterviewSessionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LiveInterviewSession />
    </div>
  );
}
