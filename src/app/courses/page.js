// app/courses/page.js
import { Suspense } from "react";
import CoursesClient from "./CoursesClient";

export default function CoursesPage({ searchParams = {} }) {
  const raw = searchParams?.exam;
  const examId = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;

  return (
    <Suspense fallback={null}>
      <CoursesClient examId={examId} />
    </Suspense>
  );
}
