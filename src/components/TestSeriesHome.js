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
    const { addToCart, loading } = useCart();
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
                                        className="relative w-full rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                    >
                                        <Link href={`/test-series/${series?._id || ""}`} className="block">
                                            {/* Card Header */}
                                            <div className="px-5 pt-5">
                                                <div className="flex justify-between items-start">
                                                    <h2 className="text-lg md:text-xl font-semibold leading-snug text-gray-800 line-clamp-2">
                                                        {series?.title || "Untitled Test Series"}
                                                    </h2>
                                                       {series?.total_tests > 0 && (
                                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#1d3a5f] to-[#204972] text-white text-xs md:text-sm px-3 py-0 rounded-full font-medium shadow-md">
                                                            {series?.total_tests} Tests
                                                        </div>
                                                    )}
                                                    {series?.title_tag && (
                                                        <span className="absolute top-10 right-3 bg-gradient-to-r from-[#1d3a5f] to-[#204972] text-[11px] md:text-xs px-3 py-1 rounded-full font-semibold text-white shadow">
                                                            {series?.title_tag}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Image */}
                                                <div className="relative w-full h-56 mt-4 group">
                                                    <Image
                                                        src={imgSrc}
                                                        alt={series?.title || "Test Series"}
                                                        fill
                                                        className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                 
                                                </div>

                                                {/* Validity */}
                                                <p className="px-1 mt-3 text-sm text-gray-600 font-medium">
                                                    Validity:{" "}
                                                    <span className="text-gray-900 font-semibold">
                                                        {series?.validity || "N/A"}
                                                    </span>
                                                </p>

                                                {/* Price Section */}
                                                <div className="px-1 mt-3 mb-20">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <span className="text-[#204972] font-bold text-2xl">
                                                                ₹{series?.discount_price || 0}
                                                            </span>
                                                            <span className="text-gray-400 line-through text-sm ml-2">
                                                                ₹{series?.price || 0}
                                                            </span>
                                                        </div>
                                                        <div className="text-green-700 text-sm font-bold bg-green-100 px-3 py-1 rounded-lg">
                                                            {discount}% OFF
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Big Add to Cart Button */}
                                        <button
                                            onClick={(e) => handleAdd(e, "testSeries", series?._id)}
                                            disabled={loading}
                                            className="w-[90%] mx-auto mb-4 flex items-center justify-center gap-2 absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#00316B] px-6 py-2 rounded-xl text-white text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            <FaPlus className="text-sm" />
                                            {loading ? "ADDING..." : "ADD TO CART"}
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
