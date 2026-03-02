// app/current-affairs/category/[categoryName]/page.js

import CategoryAffairsClient from "./CategoryAffairsClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/current-affairs`,
      { cache: "no-store" }
    );

    const data = await res.json();

    // API agar direct array return karti hai
    const articles = Array.isArray(data)
      ? data
      : data.success && Array.isArray(data.data)
      ? data.data
      : [];

    // Extract unique category slugs
    const categorySlugs = [
      "all",
      ...new Set(
        articles
          .map((item) => item.category?.slug)
          .filter(Boolean)
      ),
    ];

    return categorySlugs.map((slug) => ({
      categoryName: slug,
    }));
  } catch (error) {
    console.error("Error generating category params:", error);
    return [{ categoryName: "all" }];
  }
}

export default function Page() {
  return <CategoryAffairsClient />;
}