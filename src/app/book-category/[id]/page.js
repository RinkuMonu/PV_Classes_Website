// app/books/category/[id]/page.js

import BookCategoryClient from "./BookCategoryClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (!data || !data.data) return [];

    // 🔥 Category IDs are object keys
    const categoryIds = Object.keys(data.data);

    console.log("Generated category IDs:", categoryIds);

    return categoryIds.map((id) => ({
      id,
    }));
  } catch (error) {
    console.error("Error generating book category params:", error);
    return [];
  }
}

export default function Page() {
  return <BookCategoryClient />;
}