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
            src="/Image/Banner/testseries.jpeg"
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
            <h2 className="text-2xl text-[#204972] font-bold mb-6">
              {examGroup?.exam_name}
            </h2>
            {/* <h2 className="text-2xl text-[#204972] font-bold mb-6"> Test Prep Series </h2> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 bg-blue-50 p-10 rounded-lg shadow-2xl">
              {examGroup?.series?.map((series) => {
                const discount =
                  Math.round(
                    ((series?.price - series?.discount_price) / series?.price) *
                      100,
                  ) || 0;

                const imgSrc =
                  series?.full_image?.[0] ||
                  (series?.full_image?.[0]
                    ? `${series?.full_image?.[0]}`
                    : "/placeholder-test.jpg");

                return (
                <div
  key={series?._id}
  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#204972]/20 transition-all duration-300 overflow-hidden"
>
  <div className="flex flex-col lg:flex-row">
    {/* LEFT SIDE - 70% */}
    <div className="w-full lg:w-[70%] p-6 flex flex-col justify-between">
      <Link
        href={`/test-series/${series?._id}`}
        className="block h-full"
      >
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {series?.total_tests > 0 && (
            <span className="bg-blue-50 text-[#204972] px-3 py-1 rounded-full text-xs font-semibold">
              {series?.total_tests} Tests
            </span>
          )}

          {series?.title_tag && (
            <span className="bg-[#788406] text-white px-3 py-1 rounded-full text-xs font-semibold">
              {series?.title_tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {series?.title}
        </h3>

        {/* Validity */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600 mb-5">
          Validity:
          <span className="ml-2 font-semibold text-gray-800">
            {series?.validity}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4 mb-5">
          {series?.is_free ? (
            <span className="text-3xl font-bold text-green-600">
              FREE
            </span>
          ) : (
            <>
              {series?.discount_price > 0 && (
                <span className="text-3xl font-bold text-[#204972]">
                  ₹{series.discount_price}
                </span>
              )}

              {discount > 0 && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>
      </Link>

      {/* Button */}
      {!series?.is_free && (
        <button
          onClick={(e) => {
            handleAdd(e, "testSeries", series?._id);
            openCart();
          }}
          disabled={loading}
          className="w-full md:w-fit px-8 py-3 rounded-xl bg-[#204972] text-white font-semibold hover:bg-[#173754] transition"
        >
          {loading ? "ADDING..." : "ADD TO CART"}
        </button>
      )}
    </div>

    {/* RIGHT SIDE - 30% */}
    <Link
      href={`/test-series/${series?._id}`}
      className="w-full lg:w-[30%]"
    >
      <div className="relative h-64 lg:h-full min-h-[260px] bg-gray-50 flex items-center justify-center">
        <Image
          src={imgSrc}
          alt={series?.title || "Test Series"}
          fill
          className="object-contain p-4 hover:scale-105 transition-transform duration-500"
        />
      </div>
    </Link>
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
