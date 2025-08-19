"use client";
import toast from "react-hot-toast";
import { useCart } from "../../../components/context/CartContext";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import axiosInstance from "../../axios/axiosInstance";

export default function BookCategoryPage() {
  const { addToCart, loading} = useCart();

  const params = useParams();
  const id = params.id;
  const [books, setBooks] = useState([]);

  useEffect(() => {

    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get(`/books/category/${id}`);
        setBooks(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [id]);
  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();    
    const response = await addToCart({
      itemType,
      itemId,
    });
    console.log("response = ", response.success);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
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
const [sortOption, setSortOption] = useState("Latest");

const filteredBooks = books
  .filter((book) => {
    const langMatch =
      languageFilter === "" ||
      book.language?.toLowerCase() === languageFilter.toLowerCase();

    const year = new Date(book.createdAt).getFullYear().toString();
    const editionMatch =
      editionFilter === "" || year === editionFilter.toLowerCase();

    return langMatch && editionMatch;
  })
  .sort((a, b) => {
    if (sortOption === "Latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortOption === "Price: Low to High") {
      return a.price - b.price;
    }
    if (sortOption === "Price: High to Low") {
      return b.price - a.price;
    }
    return 0;
  });
  return (
    <>
 <section className="relative w-full h-[60vh] text-white mb-8">
            <div className="absolute inset-0">
              <Image
                src="/Image/Banner/book-banner.jpg"
                alt="Banner"
                fill
                className="object-cover object-center"
                priority
              />
              {/* <div className="absolute inset-0 bg-black/40" /> */}
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col items-center text-center">
              {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Government Exams Preparation & Download PDFs
              </h1>
              <p className="mt-4 text-lg sm:text-xl max-w-2xl">
                Prepare for your exams with the latest resources, mock tests, and study materials.
              </p> */}
            </div>
          </section>


    <div className="p-6">
      <div className="text-sm mb-2">
      <Link href={"/"} className="text-[#204972] hover:underline">Home</Link> &gt;{" "}
        <span className=" text-[#204972] font-medium">{filteredBooks?.[0]?.book_category_id?.name}</span>
      </div>
      <h1 className="text-2xl text-[#204972] font-bold mb-6">
        {filteredBooks?.[0]?.book_category_id?.name}{" "}
        <span className="text-gray-500 text-sm">
          (Showing "{filteredBooks.length}" items)
        </span>
        <div className="flex justify-end mb-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded px-2 py-1 text-sm text-[#616602]"
          >
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
            {[2025, 2024, 2023].map((year) => (
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
              <div key={book?.id} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative">
                <Link href={`/book-detail/${book?.id}`}>
                  <div>
                    {book?.tag && (
                      <div className="absolute bg-[#616602] text-white text-xs px-3 py-1 rounded-br-lg font-semibold z-10 shadow-md">
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
                <button
                  onClick={(e) => handleAdd(e, "book", book?._id)}
                  disabled={loading}
                  className="flex absolute bottom-2 right-2 bg-yellow-100 px-2 py-1 rounded-md text-[#616602] text-sm font-bold shadow cursor-pointer disabled:cursor-not-allowed"
                >
                  <span className="mt-1 me-2">
                    <FaPlus />
                  </span>
                  {loading ? "ADDING..." : "ADD"}
                </button>
                {/* The ADD button link is outside the main book link to avoid nesting */}
                {/* <Link href="/" className="flex absolute -bottom-27 right-2 bg-yellow-100 px-2 py-1 rounded-md text-[#616602] text-sm font-bold shadow">
                  <span className="mt-1 me-2"><FaPlus /></span>
                  ADD
                </Link> */}
              </div>

            ))}
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
