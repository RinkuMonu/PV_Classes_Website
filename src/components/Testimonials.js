"use client";
import Image from "next/image";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../app/axios/axiosInstance";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // default: 3 for desktop

  const nextSlide = useCallback(() => {
  if (testimonials?.length > 0) {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % testimonials.length
    );
  }
}, [testimonials.length]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get("/reviews");
        setTestimonials(res?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  // ✅ handle auto sliding
useEffect(() => {
  const interval = setInterval(() => {
    if (!isHovering && testimonials?.length > 0) {
      nextSlide();
    }
  }, 5000);

  return () => clearInterval(interval);
}, [isHovering, testimonials, nextSlide]);


  // ✅ detect screen size (1 card on mobile, 3 on desktop)
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount(); // run on mount
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);



  const prevSlide = () => {
    if (testimonials?.length > 0) {
      setCurrentIndex(
        (prevIndex) =>
          prevIndex === 0 ? testimonials?.length - 1 : prevIndex - 1
      );
    }
  };

  // ✅ get testimonials according to visibleCount
  const getVisibleTestimonials = () => {
    if (testimonials?.length <= visibleCount) return testimonials;

    let visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(testimonials?.[(currentIndex + i) % testimonials?.length]);
    }
    return visible;
  };

  return (
    <section
      className="px-4 md:px-16 py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#204972] md:ml-8">
        What Our <span className="text-[#616606]">Students</span> Say
      </h2>
      <p className="text-gray-600 mb-12 md:ml-8">
        Hear from those who have transformed their exam preparation with our platform
      </p>

      <div className="relative max-w-6xl mx-auto">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-[#204972] hover:text-white transition-all duration-300 z-10 border border-gray-200"
        >
          <FaChevronLeft />
        </button>

        {/* Cards */}
        <div
          className={`grid gap-8 px-4 transition-transform duration-500 ${
            visibleCount === 1 ? "grid-cols-1" : "md:grid-cols-3"
          }`}
        >
          {getVisibleTestimonials()?.map((item, index) => (
            <div
              key={item?._id || index}
              className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-[#616606] relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4 text-[#204972]/10 text-6xl font-serif"></div>

              <div className="flex gap-1 mb-4 text-[#616606]">
                {[...Array(item?.rating || 0)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <div className="text-gray-700 text-sm leading-relaxed mb-6">
                {item?.comment && <p>{item?.comment}</p>}
                {item?.reviewType === "course" && item?.course?.title && (
                  <p className="font-medium text-[#204972]">
                    Course: {item?.course?.title}
                  </p>
                )}
                {item?.reviewType && (
                  <p className="text-xs text-gray-500 capitalize">
                    Review type: {item?.reviewType}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div>
                  <p className="font-medium text-[#204972]">
                    {item?.user?.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">Verified Student</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-[#204972] hover:text-white transition-all duration-300 z-10 border border-gray-200"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-10 gap-2">
        {testimonials?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-[#616606] w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
