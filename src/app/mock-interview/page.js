import MockInterview from "@/components/Mockinterview";
// ^ adjust this import path to wherever you save MockInterview.jsx in your project

export const metadata = {
  title: "Mock Interview Practice | PV Classes",
  description:
    "Practice your teaching recruitment interview with real panel questions. Tap to speak or type your answers and get instant AI feedback plus a final performance report.",
};

export default function MockInterviewPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "24px 0 40px", background: "#f7f9f6" }}>
      <MockInterview />
    </main>
  );
}