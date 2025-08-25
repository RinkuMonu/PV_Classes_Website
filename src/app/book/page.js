

"use client";
import toast from "react-hot-toast";
import { useCart } from "../../components/context/CartContext";
import { useState, useEffect } from "react";
import GKbooks from "../../components/Books-sections/GKbooks";
import Rajexam from "../../components/Books-sections/Rajexam";
import Popularmagazines from "../../components/Books-sections/Popularmagazines";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../axios/axiosInstance";
import { FaPlus, FaShoppingCart, FaSearch, FaArrowRight } from "react-icons/fa";

export default function Book() {
  const { addToCart, loading } = useCart();
  const [category, setCategory] = useState([]);
  const [booksData, setBooksData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/book-categories/");
        setCategory(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get("/books/");
        setBooksData(res.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBook();
  }, []);

  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();
    const response = await addToCart({
      itemType,
      itemId,
    });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/main-book-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/main-book-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 lg:p-8">
        {/* Sidebar - Completely redesigned */}
        <aside className="bg-white rounded-xl shadow-lg p-4 
  w-full lg:w-64 flex flex-row lg:flex-col gap-2 
  overflow-x-auto lg:overflow-y-auto sticky top-4 
  h-fit lg:h-[calc(100vh-2rem)] border border-gray-100">
          <h3 className="text-lg font-bold text-[#204972] mb-3 hidden lg:block px-2">
            Categories
          </h3>

          <div className="lg:hidden flex gap-2 overflow-x-auto w-full py-1">
            {category?.map((item, index) => (
              <Link
                href={`/book-category/${item?._id}`}
                key={index}
                className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg min-w-[80px] hover:bg-[#204972] hover:text-white transition-all group"
              >
                <div className="w-10 h-10 relative mb-2">
                  <Image
                    src={item?.full_image}
                    alt={item?.name || "Book image"}
                    fill
                    className="object-contain group-hover:brightness-0 group-hover:invert"
                  />
                </div>
                <span className="text-xs text-center">{item?.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-col gap-2 w-full">
            {category?.map((item, index) => (
              <Link
                href={`/book-category/${item?._id}`}
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#204972] hover:text-white transition-all group"
              >
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src={item?.full_image}
                    alt={item?.name || "Book image"}
                    fill
                    className="object-contain group-hover:brightness-0 group-hover:invert"
                  />
                </div>
                <span className="text-sm font-medium">{item?.name}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* Books Section */}
        <div className="flex-1">
          <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            {Object.entries(booksData).map(([subCatId, subCatData]) => (
              <div key={subCatId} className="mb-10 last:mb-0">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-[#204972]">
                      {subCatData.book_subcategory_name} Books
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Explore our collection of {subCatData.book_subcategory_name.toLowerCase()} books
                    </p>
                  </div>
                  <Link
                    href={`/book-category/${subCatData?.books?.[0]?.category?._id}`}
                    className="flex items-center bg-green-200 p-2 text-[#616602] text-sm font-medium hover:underline group"
                  >
                    View All
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      <FaArrowRight />
                    </span>
                  </Link>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {subCatData?.books?.map((book) => (
                    <div
                      key={book?._id}
                      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 hover:-translate-y-1 relative"
                    >
                      <Link
                        href={book?._id ? `/book-detail/${book?._id}` : "/"}
                        className="block"
                      >
                        {/* Tag badges */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                          {book?.tag?.map((tag, index) => (
                            <div
                              key={index}
                              className="bg-[#616602] text-white text-xs px-2 py-1 rounded-md font-semibold shadow-md"
                            >
                              {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </div>
                          ))}
                        </div>

                        {/* Book image */}
                        <div className="relative w-full h-48 sm:h-56 bg-gray-100">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/book/${book?.images?.[0]}`}
                            alt={book?.title || "Book image"}
                            fill
                            className="object-contain p-4 transition-transform hover:scale-105"
                          />
                        </div>

                        {/* Book details */}
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mb-2">
                            {book?.title}
                          </h3>

                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-lg font-bold text-[#204972]">
                              ₹{book?.discount_price || book?.price}
                            </span>
                            {book?.discount_price && (
                              <span className="text-xs text-[#616602] font-medium bg-yellow-100 px-2 py-1 rounded">
                                Save {Math.round(
                                  ((book.price - book.discount_price) /
                                    book.price) *
                                  100
                                )}%
                              </span>
                            )}
                          </div>

                          {book?.discount_price && (
                            <p className="text-xs text-gray-400 line-through mb-3">
                              ₹{book?.price}
                            </p>
                          )}
                        </div>
                      </Link>

                      {/* Add Button - Modern design */}
                      <button
                        onClick={(e) => handleAdd(e, "book", book?._id)}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#616602] text-white py-2.5 px-4 text-sm font-semibold hover:bg-[#4d5501] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ADDING...
                          </>
                        ) : (
                          <>
                            <FaShoppingCart className="text-sm" />
                            ADD TO CART
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}