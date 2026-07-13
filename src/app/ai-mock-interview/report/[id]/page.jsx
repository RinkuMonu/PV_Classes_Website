"use client";

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { getInterviewReport } from '../../../../features/AIMockInterview/services/aiMockInterviewService';
import { calculateAccuracy } from '../../../../features/AIMockInterview/utils/interviewHelpers';

export default function InterviewReportPage({ params }) {
  const { id: sessionId } = use(params);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getInterviewReport(sessionId);
        setReport(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [sessionId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Generating Report...</div>;
  if (!report) return <div className="min-h-screen flex items-center justify-center">Report not found.</div>;

  const totalAttempted = report.correctCount + report.wrongCount;
  const accuracy = calculateAccuracy(report.correctCount, totalAttempted);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="bg-[#00316B] text-white p-8 text-center relative">
          <h1 className="text-3xl font-bold mb-2">Interview Performance Report</h1>
          <p className="text-blue-100">Session ID: {sessionId}</p>
          
          <div className="absolute top-8 right-8 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="block text-sm uppercase tracking-wide opacity-80">Total Score</span>
            <span className="block text-3xl font-bold">{report.score}</span>
          </div>
        </div>

        <div className="p-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <div className="text-gray-500 text-sm font-bold uppercase mb-1">Target Exam</div>
              <div className="text-lg font-semibold text-gray-800">{report.config.exam}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <div className="text-gray-500 text-sm font-bold uppercase mb-1">Subject</div>
              <div className="text-lg font-semibold text-gray-800">{report.config.subject}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <div className="text-gray-500 text-sm font-bold uppercase mb-1">Final Difficulty</div>
              <div className="text-lg font-semibold text-gray-800 capitalize">{report.currentDifficulty}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <div className="text-gray-500 text-sm font-bold uppercase mb-1">Questions</div>
              <div className="text-lg font-semibold text-gray-800">{report.currentQuestionIndex} / {report.config.numQuestions}</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#00316B] mb-6 border-b pb-2">Performance Summary</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-center">
              <div className="text-green-600 text-3xl font-bold mb-1">{report.correctCount}</div>
              <div className="text-green-800 text-xs font-bold uppercase tracking-wide">Correct</div>
            </div>
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-center">
              <div className="text-red-600 text-3xl font-bold mb-1">{report.wrongCount}</div>
              <div className="text-red-800 text-xs font-bold uppercase tracking-wide">Incorrect</div>
            </div>
            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100 text-center">
              <div className="text-yellow-600 text-3xl font-bold mb-1">{report.unansweredCount}</div>
              <div className="text-yellow-800 text-xs font-bold uppercase tracking-wide">Unanswered</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
              <div className="text-[#009FE3] text-3xl font-bold mb-1">{accuracy}%</div>
              <div className="text-blue-800 text-xs font-bold uppercase tracking-wide">Accuracy</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-center">
              <div className="text-purple-600 text-xl font-bold mb-1 flex items-center justify-center h-[36px] leading-tight">
                {report.performanceLevel || 'N/A'}
              </div>
              <div className="text-purple-800 text-xs font-bold uppercase tracking-wide">Performance</div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Camera Status Summary</h3>
            <p className="text-gray-600">
              {report.config.cameraRequired 
                ? "Camera monitoring was enabled for this session. (Phase 1: Basic streaming active)." 
                : "Camera monitoring was disabled during setup."}
            </p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8 border-dashed">
            <h3 className="text-lg font-bold text-[#00316B] mb-2 flex items-center">
              <span className="mr-2">🤖</span> AI Recommendations
            </h3>
            <p className="text-blue-800 italic">
              (Future placeholder for Python FastAPI / LLM generated topic-wise weak/strong point analysis.)
            </p>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/ai-mock-interview"
              className="inline-block bg-[#00316B] text-white py-3 px-8 rounded-xl font-bold hover:bg-[#00224d] transition-colors shadow-lg"
            >
              Start New Interview
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
