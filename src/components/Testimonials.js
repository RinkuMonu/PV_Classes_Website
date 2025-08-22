"use client";
import Image from "next/image";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from "../app/axios/axiosInstance";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const checkIsMobile = () => setIsMobile(window.innerWidth < 768);

      // Initial check
      checkIsMobile();

      // Add event listener for window resize
      window.addEventListener("resize", checkIsMobile);

      // Cleanup
      return () => window.removeEventListener("resize", checkIsMobile);
    }
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/reviews/`);
        setTestimonials(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering && testimonials.length > 0) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering, currentIndex, testimonials]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // ✅ show 1 testimonial on mobile, 3 on desktop
  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];

    if (isMobile) {
      // Mobile: show only the current testimonial
      return [testimonials[currentIndex]];
    } else {
      // Desktop: show 3 testimonials
      if (testimonials.length <= 3) return testimonials;

      let visible = [];
      for (let i = 0; i < 3; i++) {
        visible.push(testimonials[(currentIndex + i) % testimonials.length]);
      }
      return visible;
    }
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
        Hear from those who've transformed their exam preparation with our platform
      </p>

      <div className="relative max-w-6xl mx-auto">
        {/* Navigation buttons - hidden on mobile when there's only one testimonial */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-[#204972] hover:text-white transition-all duration-300 z-10 border border-gray-200"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-[#204972] hover:text-white transition-all duration-300 z-10 border border-gray-200"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        <div className={`${isMobile ? "" : "grid md:grid-cols-3"} gap-8 px-4 transition-transform duration-500`}>
          {getVisibleTestimonials().map((item, index) => (
            <div
              key={item?._id || index}
              className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-[#616606] relative overflow-hidden group mx-auto w-full max-w-md md:max-w-none"
            >
              <div className="absolute top-4 right-4 text-[#204972]/10 text-6xl font-serif">"</div>

              <div className="flex gap-1 mb-4 text-[#616606]">
                {item?.rating && [...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <div className="text-gray-700 text-sm leading-relaxed mb-6">
                {item?.comment && <p>"{item.comment}"</p>}
                {item?.reviewType === "course" && item?.course?.title && (
                  <p className="font-medium text-[#204972] mt-2">Course: {item?.course?.title}</p>
                )}
                {item?.reviewType && (
                  <p className="text-xs text-gray-500 capitalize mt-2">Review type: {item.reviewType}</p>
                )}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div>
                  <p className="font-medium text-[#204972]">{item?.user?.name}</p>
                  <p className="text-xs text-gray-500">Verified Student</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator - only show if there are multiple testimonials */}
      {testimonials.length > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-[#616606] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}