"use client";

import axiosInstance from "../../axios/axiosInstance";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnswerSheetPage() {
  const params = useParams();
  const id = params?.slug || params?.id;
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");
  const [loading, setLoading] = useState(true);
  const [testSeriesData, setTestSeriesData] = useState(null);
  const [activeTestId, setActiveTestId] = useState(null);
  const [studentName, setStudentName] = useState("Student");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    if (testId) setActiveTestId(testId);
  }, [testId]);

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
        const attemptedTests = testsData.filter((test) => test.attempt);

        if (attemptedTests.length > 0) {
          let selectedTest = testId
            ? attemptedTests.find((t) => t._id === testId)
            : null;

          if (!selectedTest) {
            selectedTest = attemptedTests[0];
          }

          setActiveTestId(selectedTest._id);

          if (selectedTest.attempt?.createdAt) {
            setDate(
              new Date(selectedTest.attempt.createdAt).toLocaleDateString()
            );
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
  const attemptedTests = tests.filter((test) => test.attempt);
  const currentTest =
    attemptedTests.find((test) => test._id === activeTestId) || {};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading answer sheet...
        </p>
      </div>
    );
  }

  if (!testSeriesData || !id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-600 font-medium">
          Error loading answer sheet data or invalid ID.
        </p>
      </div>
    );
  }

  if (attemptedTests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-xl font-bold mb-3">No Attempted Tests Found</h2>
          <p className="text-gray-600">
            You haven&apos;t attempted any tests in this series yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#204972] to-[#616602] text-white py-10 px-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold mb-4">📄 Answer Sheet</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <InfoBox label="Test Series" value={series.title || "Not specified"} />
            <InfoBox label="Student" value={studentName} />
            <InfoBox label="Date" value={date} />
          </div>
        </div>

        {/* Test Selection */}
        {attemptedTests.length > 0 && (
          <div className="p-6 border-b border-gray-300 flex justify-between">
            <h2 className="text-lg font-semibold mb-3">Select Test</h2>
            <div className="flex flex-wrap gap-3">
              {attemptedTests.map((test) => (
                <button
                  key={test._id}
                  onClick={() => setActiveTestId(test._id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTestId === test._id
                      ? "bg-[#00316B] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {test.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Test Performance */}
        {currentTest.attempt && (
          <div className="p-8 border-b border-gray-300">
            <h2 className="text-xl font-semibold mb-6">📊 Test Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard
                color="green"
                value={currentTest.attempt.totalMarks || 0}
                label="Total Marks"
              />
              <StatCard
                color="blue"
                value={currentTest.attempt.correctCount || 0}
                label="Correct"
              />
              <StatCard
                color="red"
                value={currentTest.attempt.wrongCount || 0}
                label="Wrong"
              />
              <StatCard
                color="yellow"
                value={currentTest.attempt.unattemptedCount || 0}
                label="Unattempted"
              />
            </div>
          </div>
        )}

        {/* Questions */}
        {currentTest.questions && currentTest.questions.length > 0 && (
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-6">📝 Questions Review</h2>
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

// Info Box Component
function InfoBox({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-gray-200">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}

// Stat Card Component
function StatCard({ color, value, label }) {
  const colors = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    red: "bg-red-50 text-red-700 border-red-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <div
      className={`p-5 rounded-xl border text-center shadow-sm ${colors[color]}`}
    >
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm font-medium mt-2">{label}</p>
    </div>
  );
}

// Question Card (same logic, styled slightly better)
function QuestionCard({ question, index }) {
  const isAnswered =
    question.attemptResponse !== null &&
    question.attemptResponse !== undefined;
  const isCorrect = isAnswered && question.attemptResponse.isCorrect;
  const questionType = question.type || "mcq_single";
  const options = question.options || [];
  const correctOptions = question.correctOptions || [];
  const attemptResponse = question.attemptResponse || {};

  return (
    <div
      className={`rounded-xl p-6 shadow-sm border ${
        isAnswered
          ? isCorrect
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold leading-snug">
          Q{index + 1}. {question.statement || "No question statement"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((option) => (
              <div
                key={option.key}
                className={`p-3 rounded-lg border transition ${
                  correctOptions.includes(option.key)
                    ? "bg-green-100 border-green-400"
                    : attemptResponse.selectedOptions?.includes(option.key)
                    ? "bg-red-100 border-red-400"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <span className="font-medium">{option.key}. </span>
                {option.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Numeric Answer */}
      {questionType === "numeric" && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg border bg-green-100 border-green-400">
            <p className="font-medium">Correct Answer:</p>
            <p className="text-xl">{question.correctNumeric || "N/A"}</p>
          </div>
          {isAnswered && (
            <div
              className={`p-3 rounded-lg border ${
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
      )}

      {/* Attempt details */}
      {isAnswered && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 flex flex-wrap gap-6">
          <div>
            <span className="font-medium">Time Spent:</span>{" "}
            {attemptResponse.timeSpentSec || 0} sec
          </div>
          <div>
            <span className="font-medium">Marks Awarded:</span>{" "}
            {attemptResponse.marksAwarded || 0}/{question.marks || 0}
          </div>
        </div>
      )}
    </div>
  );
}
