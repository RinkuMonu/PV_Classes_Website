"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import Image from "next/image";

function Page() {
  const [testSeriesData, setTestSeriesData] = useState([]);

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const res = await axiosInstance.get("/test-series");
        if (res.data.success) {
          setTestSeriesData(res.data.data); // grouped data
        }
      } catch (err) {
        console.error("Error fetching test series:", err);
      }
    };
    fetchTestSeries();
  }, []);
console.log("testSeriesData = ",testSeriesData);
  return (
<>

<section className="relative w-full h-[60vh]">
        <div className="absolute inset-0">
          <Image src="/Image/Banner/testseries-banner.jpg" alt="Banner" fill className="object-cover object-center" priority />
          <div className="absolute inset-0" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col items-center text-center">
          {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Government Exams Preparation & Download PDFs
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl">
            Prepare for your exams with the latest resources, mock tests, and study materials.
          </p> */}

        </div>
      </section>




    <div className="px-3 md:px-20 py-8">
      {testSeriesData.map((examGroup) => (
        <div key={examGroup.exam_id} className="mb-8">
          {/* Exam Name */}
          <h2 className="text-2xl font-bold mb-4">{examGroup.exam_name}</h2>

          {/* Grid of Series */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            {examGroup.series.map((series) => {
              const discount =
                Math.round(
                  ((series.price - series.discount_price) / series.price) * 100
                ) || 0;

             

              return (
                <div
                  key={series._id}
                  className="w-full max-w-sm rounded-xl shadow-md border border-gray-200 overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Title + Tag */}
                  <div className="px-4 pt-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-bold leading-snug">
                        {series?.title}
                      </h2>
                      <span className="bg-yellow-400 text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                        {series?.title_tag}
                      </span>
                    </div>
                   
                  </div>

                  {/* Image */}
                  <div className="relative w-full h-56 px-4 mt-3">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={`http://localhost:5000/uploads/testSeries/${series?.images?.[0]}`}
                        alt={series?.title}
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

                  {/* Validity */}
                  <p className="px-4 mt-3 font-medium text-sm">
                    Validity for {series?.validity}
                  </p>

                  {/* Price + Discount */}
                  <div className="px-4 pb-4 mt-2">
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Page;
