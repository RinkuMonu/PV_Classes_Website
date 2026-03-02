// app/current-affairs/[slug]/page.js

import CurrentAffairsClient from "./CurrentAffairsClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/current-affairs`,
      { cache: "no-store" }
    );

    const data = await res.json();

    // Agar API direct array return karti hai
    if (Array.isArray(data)) {
      return data.map((item) => ({
        slug: item.slug,
      }));
    }

    // Agar data kisi object me wrapped hai
    if (data.success && Array.isArray(data.data)) {
      return data.data.map((item) => ({
        slug: item.slug,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function Page() {
  return <CurrentAffairsClient />;
}