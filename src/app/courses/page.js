// app/courses/page.js
import { Suspense } from "react";
import CoursesClient from "./CoursesClient";

export default function CoursesPage({ searchParams = {} }) {
  const raw = searchParams?.exam;
  const examId = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;


  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("courses");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={null}>
      <CoursesClient examId={examId} />
    </Suspense>
  );
}
