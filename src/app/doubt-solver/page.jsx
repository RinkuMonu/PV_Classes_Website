import React from "react";
import DoubtSolverLayout from "../../features/AITutor/components/DoubtSolver/index";

export const metadata = {
  title: "AI Doubt Solver | PV Classes",
  description: "Ask your academic doubts and get instant solutions from our AI Tutor.",
};

export default function DoubtSolverPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI Doubt Solver</h1>
        <p className="text-sm text-gray-500 mt-1">Get instant answers to your questions</p>
      </div>
      <DoubtSolverLayout />
    </div>
  );
}
