"use client"
import toast from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"
import { FaPlus } from "react-icons/fa6"
import axiosInstance from "../../app/axios/axiosInstance"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"

export default function RajExamBooks() {
  const { addToCart, loading, successMessage, errorMessage } = useCart()
  const [booksData, setBooksData] = useState({})

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get("/books/")
        console.log("books = ", res.data.data)
        setBooksData(res.data.data)
      } catch (error) {
        console.error("Error fetching books:", error)
      }
    }

    fetchBook()
  }, [])

  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation()
    const response = await addToCart({
      itemType,
      itemId,
    })
    console.log("response = ", response.success)
    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  }

  return (
    <section className="md:px-16 px-4 py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
      {Object.entries(booksData).map(([subCatId, subCatData]) => (
        <div key={subCatId} className="mb-12">
          <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#009FE3]/20">
            <div>
              <h3 className="text-3xl font-bold text-[#00316B] mb-2">{subCatData.book_subcategory_name}</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
            </div>
            <Link
              href={`/book-category/${subCatData?.books?.[0]?.category?._id}`}
              className="flex items-center bg-[#87B105] text-white px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-[#616602] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              See All <span className="ml-2 text-lg">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {subCatData?.books?.map((book) => (
              <div
                key={book?._id}
                className="bg-white relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#009FE3]/10"
              >
                <Link href={book?._id ? `/book-detail/${book?._id}` : "/"}>
                  {book?.tag?.map((tag, index) => (
                    <div
                      key={index}
                      className="absolute top-3 left-3 bg-gradient-to-r from-[#616602] to-[#788406] text-white text-xs px-3 py-1.5 rounded-full font-semibold z-10 shadow-lg"
                      style={{ top: `${12 + index * 32}px` }}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </div>
                  ))}

                  <div className="relative w-full h-72 bg-gradient-to-br from-[#009FE3]/5 to-[#0281AD]/5">
                    <Image
                      src={`http://localhost:5000/uploads/book/${book?.images?.[0]}`}
                      alt={book?.title}
                      fill
                      className="object-cover p-4 rounded-t-2xl"
                    />
                  </div>

                  <div className="p-6">
                    <h4 className="text-base font-semibold text-[#00316B] line-clamp-2 mb-4 leading-relaxed">
                      {book?.title}
                    </h4>

                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-[#00316B]">₹{book?.discount_price || book?.price}</span>
                      {book?.discount_price && (
                        <span className="bg-[#87B105] text-white text-xs px-2 py-1 rounded-full font-semibold">
                          {Math.round(((book.price - book.discount_price) / book.price) * 100)}% OFF
                        </span>
                      )}
                    </div>

                    {book?.discount_price && (
                      <p className="text-[#204972]/60 line-through text-sm font-medium">₹{book?.price}</p>
                    )}
                  </div>
                </Link>

                <button
                  onClick={(e) => handleAdd(e, "book", book?._id)}
                  disabled={loading}
                  className="absolute text-md bottom-4 right-4 bg-gradient-to-r from-[#ABC129] to-[#87B105] hover:from-[#87B105] hover:to-[#616602] text-[#fff] px-4 py-2 rounded-md font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="flex items-center gap-2">
                    <FaPlus className="text-xs" />
                    {loading ? "ADDING..." : "ADD"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
