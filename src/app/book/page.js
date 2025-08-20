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
import { FaPlus } from "react-icons/fa6";

export default function Book() {
  const { addToCart, loading } = useCart();
  const [category, setCategory] = useState([]);
  const [booksData, setBooksData] = useState({});

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
        {/* Sidebar */}
        <aside className="bg-[#204972] text-white rounded-lg p-4 w-full lg:w-56 flex flex-row lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible sticky top-4 h-fit">
          {category?.map((item, index) => (
            <Link
              href={`/book-category/${item?._id}`}
              key={index}
              className="flex items-center gap-2 lg:gap-3 hover:scale-105 transition min-w-max lg:min-w-0"
            >
              <Image
                src={item?.full_image}
                alt={item?.name || "Book image"}
                width={40}
                height={40}
                className="flex-shrink-0"
              />
              <span className="text-xs sm:text-sm">{item?.name}</span>
            </Link>
          ))}
        </aside>

        {/* Books Section */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
            {Object.entries(booksData).map(([subCatId, subCatData]) => (
              <div key={subCatId} className="mb-8 sm:mb-10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#204972]">
                    {subCatData.book_subcategory_name}
                  </h2>
                  <Link
                    href={`/book-category/${subCatData?.books?.[0]?.category?._id}`}
                    className="flex items-center text-[#616602] text-sm sm:text-base font-medium hover:underline"
                  >
                    See All <span className="ml-1">→</span>
                  </Link>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {subCatData?.books?.map((book) => (
                    <div
                      key={book?._id}
                      className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative bg-white"
                    >
                      <Link
                        href={book?._id ? `/book-detail/${book?._id}` : "/"}
                      >
                        {book?.tag?.map((tag, index) => (
                          <div
                            key={index}
                            className="absolute top-0 left-0 bg-[#616602] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-br-lg font-semibold z-10 shadow-md"
                            style={{ top: `${index * 22}px` }}
                          >
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </div>
                        ))}

                        <div className="relative w-full h-40 sm:h-56 md:h-64">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/book/${book?.images?.[0]}`}
                            alt={book?.title || "Book image"}
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        <div className="p-2 sm:p-3">
                          <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">
                            {book?.title}
                          </p>

                          <div className="mt-1 sm:mt-2 flex items-center gap-2 flex-wrap">
                            <span className="text-sm sm:text-lg font-semibold text-[#204972]">
                              ₹{book?.discount_price || book?.price}
                            </span>
                            {book?.discount_price && (
                              <span className="text-[11px] sm:text-sm text-[#204972] font-medium">
                                (
                                {Math.round(
                                  ((book.price - book.discount_price) /
                                    book.price) *
                                    100
                                )}
                                % OFF)
                              </span>
                            )}
                          </div>

                          {book?.discount_price && (
                            <p className="text-[11px] sm:text-sm text-gray-400 line-through">
                              ₹{book?.price}
                            </p>
                          )}
                        </div>
                      </Link>

                      {/* Add Button */}
                      <button
                        onClick={(e) => handleAdd(e, "book", book?._id)}
                        disabled={loading}
                        className="flex absolute bottom-2 right-2 bg-yellow-100 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-[#616602] text-[11px] sm:text-sm font-bold shadow cursor-pointer disabled:cursor-not-allowed"
                      >
                        <span className="mt-0.5 me-1 sm:me-2">
                          <FaPlus />
                        </span>
                        {loading ? "ADDING..." : "ADD"}
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
