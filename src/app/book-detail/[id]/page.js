// app/book-detail/[id]/page.js

import ProductClient from "./ProductClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      { cache: "no-store" }
    );

    const data = await res.json();

    let allBooks = [];

    // 🔥 FIXED CONDITION
    if (data && data.data) {
      Object.values(data.data).forEach((subCategory) => {
        if (Array.isArray(subCategory.books)) {
          allBooks.push(...subCategory.books);
        }
      });
    }

    console.log("Generated book IDs:", allBooks.map(b => b._id));

    return allBooks.map((book) => ({
      id: book._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating book params:", error);
    return [];
  }
}

export default function Page() {
  return <ProductClient />;
}