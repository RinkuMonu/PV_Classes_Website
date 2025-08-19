"use client";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import axiosInstance from "../../app/axios/axiosInstance";
import { useState, useEffect } from "react";
import { useCart } from "../../components/context/CartContext";

const books = [
  {
    title: "Rajasthan Geography Handwritten Notes-2025 By Narendra Choudhary",
    price: 114,
    oldPrice: 120,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },
  {
    title: "Rajasthan Current Affairs Half Yearly Magazine-2025",
    price: 190,
    oldPrice: 200,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },
  {
    title: "Rajasthan Jila Darshan (4th Edition)",
    price: 114,
    oldPrice: 120,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },
  {
    title: "Rajasthan Vaahan Chaalak Bhartee Pareeksha 2024 Complete Study Guide",
    price: 213,
    oldPrice: 225,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },
  {
    title: "Rajasthan Geography Handwritten Notes-2025 By Narendra Choudhary",
    price: 114,
    oldPrice: 120,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },

];

export default function rajexambooks() {
    const { addToCart, loading,successMessage, errorMessage } = useCart();
  
     const [booksData, setBooksData] = useState({});
  
   useEffect(() => {
      const fetchBook = async () => {
        try {
          const res = await axiosInstance.get("/books/");
          console.log("books = ",res.data.data);
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
    console.log("response = ", response.success);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <section className="px-6 py-8 bg-white">
      {Object.entries(booksData).map(([subCatId, subCatData]) => (
        <div key={subCatId} className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#204972]">
              {subCatData.book_subcategory_name}
            </h3>
            <Link
              href={`/book-category/${subCatData?.books?.[0]?.category?._id}`}
              className="flex items-center text-[#616602] font-medium hover:underline"
            >
              See All <span className="ml-1">→</span>
            </Link>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subCatData?.books?.map((book) => (
              <div
                key={book?._id}
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative"
              >
                <Link href={book?._id ? `/book-detail/${book?._id}` : '/'}>
                  {book?.tag?.map((tag, index) => (
                    <div
                      key={index}
                      className="absolute top-0 left-0 bg-[#616602] text-white text-xs px-3 py-1 rounded-br-lg font-semibold z-10 shadow-md mr-1"
                      style={{ top: `${index * 24}px` }}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </div>
                  ))}

                  <div className="relative w-full h-64">
                    <Image
                      src={`http://localhost:5000/uploads/book/${book?.images[0]}`}
                      alt="Book Cover"
                      fill
                      className="object-cover p-2"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {book?.book_title}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-semibold text-[#204972]">
                        ₹{book?.discount_price || book?.price}
                      </span>
                      {book?.discount_price && (
                        <span className="text-sm text-[#204972] font-medium">
                          ({Math.round(((book.price - book.discount_price) / book.price) * 100)}% OFF)
                        </span>
                      )}
                    </div>

                    {book?.discount_price && (
                      <p className="text-gray-400 line-through text-sm">
                        ₹{book?.price}
                      </p>
                    )}
                  </div>
                </Link>

                {/* Button ko card ke andar rakha, but Link ke bahar */}
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

        </div>
      ))}
    </section>
  );
}
