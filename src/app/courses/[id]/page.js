// app/courses/[id]/page.js

import CourseDetailsClient from "./CourseDetailsClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses`,
      { cache: "no-store" }
    );

    const courses = await res.json();

    return courses.map((course) => ({
      id: course._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function Page({ params }) {
  return <CourseDetailsClient />;
}