// "use client"
// import toast from "react-hot-toast"
// import Image from "next/image"
// import Link from "next/link"
// import { FaPlus } from "react-icons/fa6"
// import axiosInstance from "../../app/axios/axiosInstance"
// import { useState, useEffect } from "react"
// import { useCart } from "../context/CartContext"

// export default function RajExamBooks() {
//   const { addToCart, loading, successMessage, errorMessage } = useCart()
//   const [booksData, setBooksData] = useState({})

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await axiosInstance.get("/books/")
//         console.log("books = ", res.data.data)
//         setBooksData(res.data.data)
//       } catch (error) {
//         console.error("Error fetching books:", error)
//       }
//     }

//     fetchBook()
//   }, [])

//   const handleAdd = async (e, itemType, itemId) => {
//     e.stopPropagation()
//     const response = await addToCart({
//       itemType,
//       itemId,
//     })
//     console.log("response = ", response.success)
//     if (response.success) {
//       toast.success(response.message)
//     } else {
//       toast.error(response.message)
//     }
//   }

//   return (
//     <section className="px-16 py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
//       {Object.entries(booksData).map(([subCatId, subCatData]) => (
//         <div key={subCatId} className="mb-12">
//           <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#009FE3]/20">
//             <div>
//               <h3 className="text-3xl font-bold text-[#00316B] mb-2">{subCatData.book_subcategory_name}</h3>
//               <div className="w-16 h-1 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
//             </div>
//             <Link
//               href={`/book-category/${subCatData?.books?.[0]?.category?._id}`}
//               className="flex items-center bg-[#87B105] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#616602] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               See All <span className="ml-2 text-lg">→</span>
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {subCatData?.books?.map((book) => (
//               <div
//                 key={book?._id}
//                 className="bg-white relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#009FE3]/10"
//               >
//                 <Link href={book?._id ? `/book-detail/${book?._id}` : "/"}>
//                   {book?.tag?.map((tag, index) => (
//                     <div
//                       key={index}
//                       className="absolute top-3 left-3 bg-gradient-to-r from-[#616602] to-[#788406] text-white text-xs px-3 py-1.5 rounded-full font-semibold z-10 shadow-lg"
//                       style={{ top: `${12 + index * 32}px` }}
//                     >
//                       {tag.charAt(0).toUpperCase() + tag.slice(1)}
//                     </div>
//                   ))}

//                   <div className="relative w-full h-72 bg-gradient-to-br from-[#009FE3]/5 to-[#0281AD]/5">
//                     <Image
//                       src={`http://localhost:5000/uploads/book/${book?.images?.[0]}`}
//                       alt={book?.title}
//                       fill
//                       className="object-cover p-4 rounded-t-2xl"
//                     />
//                   </div>

//                   <div className="p-6">
//                     <h4 className="text-base font-semibold text-[#00316B] line-clamp-2 mb-4 leading-relaxed">
//                       {book?.title}
//                     </h4>

//                     <div className="flex items-center gap-3 mb-2">
//                       <span className="text-2xl font-bold text-[#00316B]">₹{book?.discount_price || book?.price}</span>
//                       {book?.discount_price && (
//                         <span className="bg-[#87B105] text-white text-xs px-2 py-1 rounded-full font-semibold">
//                           {Math.round(((book.price - book.discount_price) / book.price) * 100)}% OFF
//                         </span>
//                       )}
//                     </div>

//                     {book?.discount_price && (
//                       <p className="text-[#204972]/60 line-through text-sm font-medium">₹{book?.price}</p>
//                     )}
//                   </div>
//                 </Link>

//                 <button
//                   onClick={(e) => handleAdd(e, "book", book?._id)}
//                   disabled={loading}
//                   className="absolute text-md bottom-4 right-4 bg-gradient-to-r from-[#ABC129] to-[#87B105] hover:from-[#87B105] hover:to-[#616602] text-[#fff] px-4 py-2 rounded-md font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                 >
//                   <span className="flex items-center gap-2">
//                     <FaPlus className="text-xs" />
//                     {loading ? "ADDING..." : "ADD"}
//                   </span>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   )
// }




"use client"
import toast from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"
import { FaPlus } from "react-icons/fa6"
import axiosInstance from "../../app/axios/axiosInstance"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { FaArrowRight, FaShoppingCart } from "react-icons/fa"

export default function RajExamBooks() {
  const { addToCart, loading, successMessage, errorMessage } = useCart()
  const [booksData, setBooksData] = useState({})

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get("/books/")
        console.log("books = ", res?.data?.data)
        setBooksData(res?.data?.data || {})
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
    console.log("response = ", response?.success)
    if (response?.success) {
      toast.success(response?.message || "Added to cart")
    } else {
      toast.error(response?.message || "Something went wrong")
    }
  }

  return (
    <section className="md:px-16 px-4 py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
      {Object.entries(booksData).slice(0,2).map(([subCatId, subCatData]) => (
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
  )
}
