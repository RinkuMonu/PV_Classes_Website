// // app/books/category/[id]/page.js

// import BookCategoryClient from "./BookCategoryClient";

// export const dynamic = "force-static";

// export async function generateStaticParams() {
//   try {
//     const res = await fetch(
//       // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book-categories`,
//       { cache: "no-store" }
//     );

//     const data = await res.json();

//     console.log("dataaaa: ", data);

//     if (!data || !data.data) return [];

//     // 🔥 Category IDs are object keys
//     const categoryIds = Object.keys(data.data);

//     console.log("Generated category IDs:", categoryIds);

//     return categoryIds.map((id) => ({
//       id,
//     }));
//   } catch (error) {
//     console.error("Error generating book category params:", error);
//     return [];
//   }
// }

// export default function Page() {
//   return <BookCategoryClient />;
// }



// app/books/category/[id]/page.js

import BookCategoryClient from "./BookCategoryClient";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book-categories`
    );

    const data = await res.json();

    // console.log("dataaaa:", data);

    if (!data || !data.data) return [];

    // ✅ array map karo
    const categoryIds = data.data.map((cat) => cat._id);

    console.log("Generated category IDs:", categoryIds);

    return categoryIds.map((id) => ({
      id: id.toString(),
    }));

  } catch (error) {
    console.error("Error generating book category params:", error);
    return [];
  }
}

export default function Page() {
  return <BookCategoryClient />;
}