// app/test-series/[slug]/page.js

import TestSeriesClient from "./TestSeriesClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/test-series`,
      { cache: "no-store" }
    );

    const data = await res.json();

    // Agar API grouped format me hai (exam wise)
    let allSeries = [];

    if (data.success && Array.isArray(data.data)) {
      data.data.forEach((group) => {
        if (Array.isArray(group.series)) {
          allSeries.push(...group.series);
        }
      });
    }

    return allSeries.map((series) => ({
      slug: series._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function Page() {
  return <TestSeriesClient />;
}