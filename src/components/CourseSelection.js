"use client";

import { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState("All India Exams");

  const tabs = [
    "All India Exams",
    "Rajasthan Exams",
    "Uttar Pradesh Exams",
    "Nursing Officer",
    "Air Force",
  ];

  const courses = [
    {
      title: "GK & GS Brahmastra 3.0 Batch",
      img: "/Image/book1.webp",
      validity: "365 Days",
      price: 399,
      oldPrice: 2850,
      discount: "86% OFF",
    },
    {
      title: "Bihar (पुलिस सिपाही) 2025 Gaurav Batch",
      img: "/Image/book2.webp",
      validity: "365 Days",
      price: 279,
      oldPrice: 2790,
      discount: "90% OFF",
    },
    {
      title: "Railway Group D MCQs Batch (From Studio)",
      img: "/Image/book3.webp",
      validity: "180 Days",
      price: 300,
      oldPrice: 1200,
      discount: "75% OFF",
    },
    {
      title: "GK & GS Brahmastra 3.0 Batch",
      img: "/Image/book1.webp",
      validity: "365 Days",
      price: 399,
      oldPrice: 2850,
      discount: "86% OFF",
    },
  ];

  return (
    <section className="p-20">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#204972]">
        Select the Course that Fits Your Goals
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md border transition ${
              activeTab === tab
                ? "bg-[#204972] text-white border-[#204972]"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}

        {/* Search */}
        <div className="ml-auto relative">
          <input
            type="text"
            placeholder="Search your course"
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 mt-1">
          <FaSearch />
          </span>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white border-[gray] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <Image
              src={course.img}
              alt={course.title}
              width={200}
              height={150}
              className="w-full h-60 object-scale-down"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-[#00316b] text-sm mb-2">
                Validity {course.validity}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">₹{course.price}/-</span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{course.oldPrice}
                </span>
                <span className="text-green-600 text-sm">
                  ({course.discount})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
