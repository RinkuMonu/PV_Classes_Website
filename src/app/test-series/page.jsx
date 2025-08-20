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
      <section className="relative w-full h-[40vh] md:h-[60vh]">
        <Image
          src="/Image/Banner/test-banner.webp"
          alt="Banner"
          fill
          className="object-cover object-center"
          priority
        />
      </section>

      <div className="px-3 md:px-20 py-8">
        {testSeriesData?.map((examGroup) => (
          <div key={examGroup?.exam_id} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{examGroup?.exam_name}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-6">
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
                    className="relative w-full max-w-sm rounded-xl shadow-md border border-gray-200 overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link href={`/test-series/${series?._id}`} className="block">
                      <div className="px-4 pt-4">
                        <div className="flex justify-between items-start">
                          <h2 className="text-lg font-bold leading-snug">{series?.title}</h2>
                          {series?.title_tag && (
                            <span className="bg-yellow-400 text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                              {series?.title_tag}
                            </span>
                          )}
                        </div>

                        <div className="relative w-full h-56 px-0 mt-3">
                          <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                              src={imgSrc}
                              alt={series?.title || "Test Series"}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                            {series?.total_tests > 0 && (
                              <div className="absolute bottom-2 left-3 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full shadow-md">
                                {series?.total_tests} Tests
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="px-1 mt-3 font-medium text-sm">
                          Validity for {series?.validity}
                        </p>

                        <div className="px-1 pb-4 mt-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-indigo-700 font-bold text-lg">
                                ₹{series?.discount_price}
                              </span>
                              <span className="text-gray-400 line-through text-sm ml-1">
                                ₹{series?.price}
                              </span>
                            </div>
                            <div className="text-green-700 text-xs font-semibold bg-green-50 px-2 py-1 rounded-md">
                              {discount}% OFF
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={(e) => handleAdd(e, "testSeries", series?._id)}
                      disabled={loading}
                      className="flex absolute bottom-2 right-2 bg-yellow-100 px-2 py-1 rounded-md text-[#616602] text-sm font-bold shadow cursor-pointer disabled:cursor-not-allowed"
                    >
                      <span className="mt-1 me-2">
                        <FaPlus />
                      </span>
                      {loading ? "ADDING..." : "ADD"}
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
