"use client";

import axiosInstance from "../../axios/axiosInstance";
import { useParams,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnswerSheetPage() {
  const params = useParams();
  const id = params?.slug || params?.id;
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");
  console.log("test id = ",testId);
  const [loading, setLoading] = useState(true);
  const [testSeriesData, setTestSeriesData] = useState(null);
  const [activeTestId, setActiveTestId] = useState(null);
  const [studentName, setStudentName] = useState("Student");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  useEffect(()=>{
    setActiveTestId(testId);
  },[testId]);
 useEffect(() => {
  if (!id) {
    setLoading(false);
    return;
  }

  const fetchAnswerSheet = async () => {
    try {
      const response = await axiosInstance.get(
        `/test-series/get-answer-sheet/${id}`
      );

      setTestSeriesData(response.data.data);

      const testsData = response.data.data.tests || [];

      if (testsData.length > 0) {
        let selectedTest;

        if (testId) {
          // ✅ if query param testId exists, pick that test
          selectedTest = testsData.find((t) => t._id === testId);
        }

        if (!selectedTest) {
          // ✅ otherwise fallback to the first test
          selectedTest = testsData[0];
        }

        setActiveTestId(selectedTest._id);

        if (selectedTest.attempt?.createdAt) {
          setDate(new Date(selectedTest.attempt.createdAt).toLocaleDateString());
        }
      }
    } catch (error) {
      console.error("Error fetching answer sheet:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAnswerSheet();
}, [id, testId]);


  const series = testSeriesData || {};
  const tests = series.tests || [];
  const currentTest = tests.find(test => test._id === activeTestId) || {};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading answer sheet...</p>
      </div>
    );
  }

  if (!testSeriesData || !id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">
          Error loading answer sheet data or invalid ID.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-800 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">Answer Sheet</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold">Test Series</p>
              <p>{series.title || "Not specified"}</p>
            </div>
            <div>
              <p className="font-semibold">Student</p>
              <p>{studentName || "Not specified"}</p>
            </div>
            <div>
              <p className="font-semibold">Date</p>
              <p>{date || new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Test Selection - Only show if tests exist */}
        {tests.length > 0 && (
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-2">Select Test</h2>
            <div className="flex flex-wrap gap-2">
              {tests.map((test) => (
                <button
                  key={test._id}
                  onClick={() => setActiveTestId(test._id)}
                  className={`px-4 py-2 rounded-md ${
                    activeTestId === test._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {test.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Test Overview - Only show if current test has attempt data */}
        {currentTest.attempt && (
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Test Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-700">
                  {currentTest.attempt.totalMarks || 0}
                </p>
                <p className="text-sm text-green-600">Total Marks</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {currentTest.attempt.correctCount || 0}
                </p>
                <p className="text-sm text-blue-600">Correct Answers</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-700">
                  {currentTest.attempt.wrongCount || 0}
                </p>
                <p className="text-sm text-red-600">Wrong Answers</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-700">
                  {currentTest.attempt.unattemptedCount || 0}
                </p>
                <p className="text-sm text-yellow-600">Unattempted</p>
              </div>
            </div>
          </div>
        )}

        {/* Questions List - Only show if current test has questions */}
        {currentTest.questions && currentTest.questions.length > 0 && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Questions Review</h2>
            <div className="space-y-6">
              {currentTest.questions.map((question, index) => (
                <QuestionCard
                  key={question._id || index}
                  question={question}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionCard({ question, index }) {
  const isAnswered = question.attemptResponse !== null && question.attemptResponse !== undefined;
  const isCorrect = isAnswered && question.attemptResponse.isCorrect;
  const questionType = question.type || "mcq_single";
  const options = question.options || [];
  const correctOptions = question.correctOptions || [];
  const attemptResponse = question.attemptResponse || {};

  return (
    <div
      className={`border rounded-lg p-4 ${
        isAnswered
          ? isCorrect
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">
          Q{index + 1}: {question.statement || "No question statement"}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isAnswered
              ? isCorrect
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {isAnswered ? (isCorrect ? "Correct" : "Incorrect") : "Not Attempted"}
        </span>
      </div>

      {/* Options for MCQ */}
      {questionType === "mcq_single" && options.length > 0 && (
        <div className="mb-4">
          <p className="font-medium mb-2">Options:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {options.map((option) => (
              <div
                key={option.key}
                className={`p-2 rounded border ${
                  correctOptions.includes(option.key)
                    ? "bg-green-100 border-green-400"
                    : attemptResponse.selectedOptions?.includes(option.key)
                    ? "bg-red-100 border-red-400"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <span className="font-medium">{option.key}. </span>
                {option.text}
                {correctOptions.includes(option.key) && (
                  <span className="ml-2 text-green-600">✓ Correct answer</span>
                )}
                {attemptResponse.selectedOptions?.includes(option.key) &&
                  !correctOptions.includes(option.key) && (
                    <span className="ml-2 text-red-600">✗ Your answer</span>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Numeric answer */}
      {questionType === "numeric" && (
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded border bg-green-100 border-green-400">
              <p className="font-medium">Correct Answer:</p>
              <p className="text-xl">{question.correctNumeric || "N/A"}</p>
            </div>
            {isAnswered && (
              <div
                className={`p-3 rounded border ${
                  isCorrect
                    ? "bg-green-100 border-green-400"
                    : "bg-red-100 border-red-400"
                }`}
              >
                <p className="font-medium">Your Answer:</p>
                <p className="text-xl">
                  {attemptResponse.numericAnswer || "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Attempt details */}
      {isAnswered && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Time Spent: </span>
              {attemptResponse.timeSpentSec || 0} seconds
            </div>
            <div>
              <span className="font-medium">Marks Awarded: </span>
              {attemptResponse.marksAwarded || 0}/{question.marks || 0}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}