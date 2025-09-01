"use client";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import Image from "next/image";
import { useCart } from "../../components/context/CartContext";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  const { addToCart, loading, isOpen, openCart, closeCart } = useCart();
  const [testSeriesData, setTestSeriesData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/test-series");
        if (res.data.success) setTestSeriesData(res.data.data); // grouped by exam
      } catch (err) {
        console.error("Error fetching test series:", err);
        toast.error("Failed to load test series");
      }
    })();
  }, []);

  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();
    const response = await addToCart({ itemType, itemId });
    if (response?.success) toast.success(response.message);
    else toast.error(response?.message || "Failed to add");
  };

  return (
    <>
      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/test-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/test-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      <div className="px-3 md:px-20 py-8 ">
        {testSeriesData?.map((examGroup, index) => (
          <div key={index} className="mb-12">
            {/* <h2 className="text-2xl text-[#204972] font-bold mb-6">{examGroup?.exam_name}</h2> */}
            <h2 className="text-2xl text-[#204972] font-bold mb-6"> Test Prep Series </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-green-50 p-10 rounded-lg shadow-2xl">
              {examGroup?.series?.map((series) => {
                const discount =
                  Math.round(((series?.price - series?.discount_price) / series?.price) * 100) || 0;

                const imgSrc =
                  series?.image_urls?.[0] ||
                  (series?.images?.[0]
                    ? `http://localhost:5000/uploads/testSeries/${series?.images?.[0]}`
                    : "/placeholder-test.jpg");

                return (
                  <div
                    key={series?._id}
                    className="relative w-full rounded-2xl shadow-md border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <Link href={`/test-series/${series?._id}`} className="block">
                      {/* Image Section with Gradient Overlay */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <Image
                          src={imgSrc}
                          alt={series?.title || "Test Series"}
                          fill
                          className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>

                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {series?.total_tests > 0 && (
                            <div className="bg-[#204972] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                              {series?.total_tests} Tests
                            </div>
                          )}
                          {series?.title_tag && (
                            <div className="bg-[#788406] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                              {series?.title_tag}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#204972] transition-colors">
                          {series?.title}
                        </h3>

                        <div className="flex items-center mt-3 text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#788406]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V6z" clipRule="evenodd" />
                          </svg>
                          Validity: <span className="font-medium ml-1">{series?.validity}</span>
                        </div>

                        <div className="flex justify-between items-center mt-5">
                          <div className="flex flex-col">
                            <span className="text-[#204972] font-bold text-xl">
                              ₹{series?.discount_price}
                            </span>
                            <span className="text-gray-400 line-through text-sm">
                              ₹{series?.price}
                            </span>
                          </div>
                          {discount > 0 && (
                            <span className="text-green-700 text-xs font-bold bg-green-100 px-2.5 py-1.5 rounded-full">
                              {discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Action Section */}
                    <div className="px-5 pb-5">
                      <button
                        onClick={(e) => {
                          handleAdd(e, "testSeries", series?._id);
                          openCart();
                        }}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#204972] to-[#2c5c8a] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-[#163452] hover:to-[#244c75] transition-all duration-300 group/button"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ADDING...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/button:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            ADD TO CART
                          </>
                        )}
                      </button>
                    </div>
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
