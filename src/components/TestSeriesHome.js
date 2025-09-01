// "use client";
// import toast from "react-hot-toast";
// import React, { useEffect, useState } from "react";
// // import axiosInstance from "../axios/axiosInstance";
// import axiosInstance from "../app/axios/axiosInstance";
// import Image from "next/image";
// // import { useCart } from "../../components/context/CartContext";
// import { useCart } from "../components/context/CartContext";
// import { FaPlus, FaBookOpen } from "react-icons/fa";
// import Link from "next/link";

// export default function TestSeriesHome() {
//     const { addToCart, loading } = useCart();
//     const [testSeriesData, setTestSeriesData] = useState([]);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await axiosInstance.get("/test-series");
//                 if (res.data.success) setTestSeriesData(res.data.data); // grouped by exam
//             } catch (err) {
//                 console.error("Error fetching test series:", err);
//                 toast.error("Failed to load test series");
//             }
//         })();
//     }, []);

//     const handleAdd = async (e, itemType, itemId) => {
//         e.stopPropagation();
//         const response = await addToCart({ itemType, itemId });
//         if (response?.success) toast.success(response.message);
//         else toast.error(response?.message || "Failed to add");
//     };

//     return (
//         <>


//             {/* Test Series Section */}
//             <div className="px-4 md:px-16 py-8">
//                 {testSeriesData?.map((examGroup, index) => (
//                     <div key={index} className="mb-12">
//                         {/* Section Heading */}


//                         <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#009FE3]/20">
//                             <div>
//                                 <h2 className="text-3xl font-bold text-[#00316B] mb-2"> Test Series For All Exams</h2>
//                                 <div className="w-16 h-1 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
//                             </div>
//                         </div>

//                         {/* Cards */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                             {examGroup?.series?.map((series) => {
//                                 const discount =
//                                     Math.round(
//                                         ((series?.price - series?.discount_price) / series?.price) *
//                                         100
//                                     ) || 0;

//                                 const imgSrc =
//                                     series?.image_urls?.[0] ||
//                                     (series?.images?.[0]
//                                         ? `http://localhost:5000/uploads/testSeries/${series?.images?.[0]}`
//                                         : "/placeholder-test.jpg");

//                                 return (
//                                     <div
//                                         key={series?._id}
//                                         className="relative w-full rounded-2xl shadow-md border border-gray-100 overflow-hidden bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
//                                     >
//                                         <Link href={`/test-series/${series?._id}`} className="block">
//                                             {/* Card Top */}
//                                             <div className="px-4 pt-4">
//                                                 <div className="flex justify-between items-start">
//                                                     <h2 className="text-lg font-bold leading-snug line-clamp-2 text-gray-800">
//                                                         {series?.title}
//                                                     </h2>
//                                                     {series?.title_tag && (
//                                                         <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-xs px-2 py-1 rounded-full font-semibold text-white shadow-sm">
//                                                             {series?.title_tag}
//                                                         </span>
//                                                     )}
//                                                 </div>

//                                                 {/* Image */}
//                                                 <div className="relative w-full h-52 mt-4">
//                                                     <Image
//                                                         src={imgSrc}
//                                                         alt={series?.title || "Test Series"}
//                                                         fill
//                                                         className="object-cover rounded-xl hover:scale-105 transition-transform duration-500"
//                                                     />
//                                                     {series?.total_tests > 0 && (
//                                                         <div className="absolute bottom-3 left-3 bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
//                                                             {series?.total_tests} Tests
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 {/* Validity */}
//                                                 <p className="px-1 mt-3 text-sm text-gray-600 font-medium">
//                                                     Validity:{" "}
//                                                     <span className="text-gray-900 font-semibold">
//                                                         {series?.validity}
//                                                     </span>
//                                                 </p>

//                                                 {/* Price */}
//                                                 <div className="px-1 pb-5 mt-2">
//                                                     <div className="flex justify-between items-center">
//                                                         <div>
//                                                             <span className="text-indigo-700 font-bold text-lg">
//                                                                 ₹{series?.discount_price}
//                                                             </span>
//                                                             <span className="text-gray-400 line-through text-sm ml-2">
//                                                                 ₹{series?.price}
//                                                             </span>
//                                                         </div>
//                                                         <div className="text-green-700 text-xs font-semibold bg-green-50 px-2 py-1 rounded-md">
//                                                             {discount}% OFF
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </Link>

//                                         {/* Add to Cart */}
//                                         <button
//                                             onClick={(e) => handleAdd(e, "testSeries", series?._id)}
//                                             disabled={loading}
//                                             className="flex items-center justify-center gap-2 absolute bottom-3 right-3 bg-gradient-to-r from-yellow-200 to-yellow-400 px-3 py-1.5 rounded-lg text-[#616602] text-sm font-bold shadow cursor-pointer disabled:cursor-not-allowed"
//                                         >
//                                             <FaPlus />
//                                             {loading ? "ADDING..." : "ADD"}
//                                         </button>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }




"use client";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
// import axiosInstance from "../axios/axiosInstance";
import axiosInstance from "../app/axios/axiosInstance";
import Image from "next/image";
// import { useCart } from "../../components/context/CartContext";
import { useCart } from "../components/context/CartContext";
import { FaPlus, FaBookOpen } from "react-icons/fa";
import Link from "next/link";

export default function TestSeriesHome() {
    const { addToCart, loading, isOpen, openCart, closeCart } = useCart();
    const [testSeriesData, setTestSeriesData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get("/test-series");
                if (res?.data?.success) setTestSeriesData(res?.data?.data || []); // grouped by exam
            } catch (err) {
                // console.error("Error fetching test series:", err);
                // toast.error("Failed to load test series");
            }
        })();
    }, []);

    const handleAdd = async (e, itemType, itemId) => {
        e.stopPropagation();
        const response = await addToCart?.({ itemType, itemId });
        if (response?.success) toast.success(response?.message);
        else toast.error(response?.message || "Failed to add");
    };

    return (
        <>
            {/* Test Series Section */}
            <div className="px-4 md:px-16 py-8">
                {testSeriesData?.map((examGroup, index) => (
                    <div key={index} className="mb-12">
                        {/* Section Heading */}
                        <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#009FE3]/20">
                            <div>
                                <h2 className="text-3xl font-bold text-[#00316B] mb-2">
                                    Test Series For All Exams
                                </h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
                            </div>
                        </div>

                        {/* Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {examGroup?.series?.map((series) => {
    const discount =
      Math.round(
        ((series?.price - series?.discount_price) / (series?.price || 1)) *
        100
      ) || 0;

    const imgSrc =
      series?.image_urls?.[0] ||
      (series?.images?.[0]
        ? `http://localhost:5000/uploads/testSeries/${series?.images?.[0]}`
        : "/placeholder-test.jpg");

    return (
      <div
        key={series?._id}
        className="relative w-full rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
      >
        <Link href={`/test-series/${series?._id || ""}`} className="block">
          {/* Card Header */}
          <div className="px-5 pt-5">
            {/* Badges */}
            <div className="flex flex-col items-end gap-2 absolute top-4 right-4 z-10">
              {series?.total_tests > 0 && (
                <div className="bg-gradient-to-r from-[#1d3a5f] to-[#204972] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  {series?.total_tests} Tests
                </div>
              )}
              {series?.title_tag && (
                <div className="bg-gradient-to-r from-[#788406] to-[#9ab00b] text-white text-[11px] px-3 py-1 rounded-full font-semibold shadow-lg">
                  {series?.title_tag}
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2 pr-16 min-h-[56px]">
              {series?.title || "Untitled Test Series"}
            </h2>

            {/* Image */}
            <div className="relative w-full h-56 mt-4 overflow-hidden rounded-xl">
              <Image
                src={imgSrc}
                alt={series?.title || "Test Series"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Validity */}
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V6z" clipRule="evenodd" />
              </svg>
              Validity:{" "}
              <span className="text-gray-900 font-semibold">
                {series?.validity || "N/A"}
              </span>
            </div>

            {/* Price Section */}
            <div className="mt-4 mb-16">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[#204972] font-bold text-2xl">
                    ₹{series?.discount_price || 0}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ₹{series?.price || 0}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="text-green-700 text-sm font-bold bg-green-100 px-3 py-1.5 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17 7.5a1 1 0 01.78 1.625l-3.1 4.4-1.15 4.2a1 1 0 01-1.941-.002l-1.15-4.2-3.1-4.4A1 1 0 017 7.5l2.845-.3L12 2a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {discount}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Enhanced Add to Cart Button */}
        <button
          onClick={(e) => {
            handleAdd(e, "testSeries", series?._id);
            openCart();
          }}
          disabled={loading}
          className="w-[90%] mx-auto flex items-center justify-center gap-2 absolute bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00316B] to-[#1d3a5f] px-6 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group/button"
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
              <FaPlus className="text-sm group-hover/button:rotate-90 transition-transform duration-300" />
              ADD TO CART
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover/button:opacity-100 group-hover/button:translate-x-1 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </>
          )}
        </button>
      </div>
    );
  })}
</div>
                    </div>
                ))}
            </div>
        </>
    );
}
