"use client";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import Image from "next/image";
import { useCart } from "../../components/context/CartContext";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  const { addToCart, loading } = useCart();
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

      <div className="px-3 md:px-20 py-8">
        {testSeriesData?.map((examGroup) => (
          <div key={examGroup?.exam_id} className="mb-12">
            <h2 className="text-2xl text-[#204972] font-bold mb-6">{examGroup?.exam_name}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    className="relative w-full rounded-2xl shadow-md border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link href={`/test-series/${series?._id}`} className="block">
                      {/* Image Section */}
                      <div className="relative w-full h-56">
                        <Image
                          src={imgSrc}
                          alt={series?.title || "Test Series"}
                          fill
                          className="object-cover rounded-t-2xl hover:scale-105 transition-transform duration-500"
                        />
                        {series?.total_tests > 0 && (
                          <div className="absolute top-3 right-3 bg-[#204972] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                            {series?.total_tests} Tests
                          </div>
                        )}
                        {series?.title_tag && (
                          <div className="absolute top-10 right-3 bg-[#788406] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                            {series?.title_tag}
                          </div>
                        )}
                      </div>

                      {/* Details Section */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2">
                          {series?.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                          Validity: <span className="font-medium">{series?.validity}</span>
                        </p>

                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-[#204972] font-bold text-lg">
                              ₹{series?.discount_price}
                            </span>
                            <span className="text-gray-400 line-through text-sm ml-2">
                              ₹{series?.price}
                            </span>
                          </div>
                          {discount > 0 && (
                            <span className="text-green-700 text-xs font-semibold bg-green-50 px-2 py-1 rounded-md">
                              {discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Action Section */}
                    <div className="px-4 pb-4">
                      <button
                        onClick={(e) => handleAdd(e, "testSeries", series?._id)}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#204972] text-white text-sm font-semibold py-2 rounded-lg shadow hover:bg-[#163452] transition-colors"
                      >
                        <FaPlus className="text-xs" />
                        {loading ? "ADDING..." : "ADD"}
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
