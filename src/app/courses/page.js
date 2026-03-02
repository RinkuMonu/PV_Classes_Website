
"use client";

import { Suspense } from "react";
import CoursesPage from "./CoursesPage";

export default function Courses() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CoursesPage />
    </Suspense>
  );
}
