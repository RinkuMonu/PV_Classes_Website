"use client";
import toast from "react-hot-toast";
import { useCart } from "../../../components/context/CartContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import axiosInstance from "../../axios/axiosInstance";

export default function BookCategoryPage() {
  const { addToCart, loading } = useCart();
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
    const response = await addToCart({ itemType, itemId });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

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
      if (sortOption === "Latest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "Price: Low to High") return a.price - b.price;
      if (sortOption === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  return (
    <>
      {/* Banner */}
      <section className="relative w-full h-[60vh] sm:h-[50vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
        {/* Desktop Banner */}
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/book-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Mobile Banner */}
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/book-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Page Content */}
      <div className="p-6 sm:p-8">
        {/* Breadcrumb */}
        <div className="text-sm mb-2">
          <Link href={"/"} className="text-[#204972] hover:underline">
            Home
          </Link>{" "}
          &gt;{" "}
          <span className=" text-[#204972] font-medium">
            {filteredBooks?.[0]?.book_category_id?.name}
          </span>
        </div>

        {/* Heading + Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <h1 className="text-2xl text-[#204972] font-bold">
            {filteredBooks?.[0]?.book_category_id?.name}{" "}
            <span className="text-gray-500 text-sm">
              (Showing "{filteredBooks.length}" items)
            </span>
          </h1>
          <div className="flex justify-end">
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
        </div>

        {/* Layout: Sidebar + Books */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-3 bg-white rounded-lg shadow p-4 h-fit">
            <h2 className="font-semibold mb-4">Filters</h2>

            {/* Language Filter */}
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

            {/* Edition Filter */}
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

          {/* Books Grid */}
          <main className="md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBooks?.map((book) => (
                <div
                  key={book?._id}
                  className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative"
                >
                  <Link href={`/book-detail/${book?._id}`}>
                    <div>
                      {/* Tag */}
                      {book?.tag && (
                        <div className="absolute bg-[#616602] text-white text-xs px-3 py-1 rounded-br-lg font-semibold z-10 shadow-md">
                          {book?.tag}
                        </div>
                      )}

                      {/* Book Image */}
                      <div className="relative w-full h-56 sm:h-64">
                        <Image
                          src={book?.full_image?.[0]}
                          alt={book?.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Book Info */}
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-2 mb-2">
                          {book?.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            ₹{book?.discount_price}
                          </span>
                          <span className="text-green-600 text-sm">
                            {book?.discount_price && book?.price
                              ? `${Math.round(
                                  ((book.price - book.discount_price) /
                                    book.price) *
                                    100
                                )}% off`
                              : null}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 line-through">
                          ₹{book?.price}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Add Button */}
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
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
