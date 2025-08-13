"use client";

import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import axiosInstance from "../../axios/axiosInstance";

export default function BookCategoryPage() {
  const params = useParams();
  const id = params.id;
  const [books, setBooks] = useState([]);

  useEffect(() => {

    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get(`/books/category/${id}`);
        console.log("res = ",res.data.data);
        setBooks(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [id]);
  // Book Data (You can fetch this from an API later)
//   const books = [
//     {
//       id: 1,
//       title: "REET Level 2nd Science Math's 1st Language Hindi 2nd...",
//       price: 161,
//       oldPrice: 170,
//       discount: "5% OFF",
//       tag: "New Arrivals",
//       img: "/image/book1.webp",
//       language: "Hindi",
//       edition: 2024,
//     },
//     {
//       id: 2,
//       title: "REET Level 2nd Science Math's 1st Language Hindi 2nd...",
//       price: 161,
//       oldPrice: 170,
//       discount: "5% OFF",
//       tag: "New Arrivals",
//       img: "/image/book1.webp",
//       language: "Hindi",
//       edition: 2024,
//     },
//     {
//       id: 3,
//       title: "REET Level 2nd Science Math's Language 2nd Sanskrit/English",
//       price: 1187,
//       oldPrice: 1250,
//       discount: "5% OFF",
//       tag: "Bestselling",
//       img: "/image/book1.webp",
//       language: "English",
//       edition: 2023,
//     },
//     {
//       id: 4,
//       title: "Social Studies Teaching Methods (REET Level-II)",
//       price: 114,
//       oldPrice: 120,
//       discount: "5% OFF",
//       tag: "Bestselling",
//       img: "/image/book1.webp",
//       language: "Hindi",
//       edition: 2021,
//     },
//   ];

  const [languageFilter, setLanguageFilter] = useState("");
  const [editionFilter, setEditionFilter] = useState("");

  const filteredBooks = books.filter((book) => {
    return (
      (languageFilter === "" || book.language === languageFilter) &&
      (editionFilter === "" || book.edition.toString() === editionFilter)
    );
  });
console.log("filter book = ",filteredBooks);
  return (
    <div className="p-6">

      <div className="text-sm mb-2">
        <span className="cursor-pointer  text-[#204972] hover:underline">Home</span> &gt;{" "}
        <span className=" text-[#204972] font-medium">REET Exam Special</span>
      </div>
      <h1 className="text-2xl text-[#204972] font-bold mb-6">
        REET Exam Books{" "}
        <span className="text-gray-500 text-sm">
          (Showing "{filteredBooks.length}" items)
        </span>
          <div className="flex justify-end mb-4">
            <select className="border rounded px-2 py-1 text-sm text-[#616602]">
              <option>Latest</option>
              <option>Oldest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
      </h1>


      <div className="grid grid-cols-12 gap-6">

        <aside className="col-span-3 bg-white rounded-lg shadow p-4 h-fit">
          <h2 className="font-semibold mb-4">Filters</h2>


          <div className="mb-4">
            <p className="text-lg font-medium mb-2">Language</p>
            {["Hindi", "English"].map((lang) => (
              <label key={lang} className="flex items-center space-x-2 mb-1 text-base">
                <input
                  type="radio"
                  name="language"
                  value={lang}
                  checked={languageFilter === lang}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="accent-[#abc129]"
                />
                <span className="text-sm">{lang}</span>
              </label>
            ))}
            <button
              onClick={() => setLanguageFilter("")}
              className="text-xs text-[#616602] mt-1"
            >
              Clear
            </button>
          </div>


          <div className="mb-4">
            <p className="text-lg font-medium mb-2">Edition</p>
            {[2024, 2023, 2021].map((year) => (
              <label key={year} className="flex items-center space-x-2 mb-1 text-base">
                <input
                  type="radio"
                  name="edition"
                  value={year}
                  checked={editionFilter === year.toString()}
                  onChange={(e) => setEditionFilter(e.target.value)}
                  className="accent-yellow-500"
                />
                <span className="text-sm">{year}</span>
              </label>
            ))}
            <button
              onClick={() => setEditionFilter("")}
              className="text-xs text-[#616602] mt-1"
            >
              Clear
            </button>
          </div>
        </aside>

        <main className="col-span-9">



          <div className="grid grid-cols-4 gap-4">
            {filteredBooks?.map((book) => (
              <Link to={`/book-detail/${book?.id}`}>
                <div
                  key={book?.id}
                  className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >

                  {book?.tag && (
                    <div
                      className={`absolute bg-[#616602] text-white text-xs px-3 py-1 rounded-br-lg font-semibold z-10 shadow-md`}
                    >
                      {book?.tag}
                    </div>
                  )}

                <div className="relative w-full h-64">
                <Image
                  src={book?.full_image?.[0]}
                  alt={book?.book_title}
                  fill
                  className="object-cover p-2"
                />
                <Link href="/" className="flex absolute -bottom-27 right-2 bg-yellow-100 px-2 py-1 rounded-md text-[#616602] text-sm font-bold shadow">
                  <span className="mt-1 me-2"><FaPlus /></span>
                  ADD
                </Link>
              </div>

              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 mb-2">
                  {book?.book_title}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">₹{book?.discount_price}</span>
                  <span className="text-green-600 text-sm">
                    {book?.discount_price && book?.price
                      ? `${Math.round(((book.price - book.discount_price) / book.price) * 100)}% off`
                      : null}
                  </span>

                </div>
                <div className="text-xs text-gray-500 line-through">
                  ₹{book?.price}
                </div>
              </div>

                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
