"use client";
import Image from "next/image";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from "../app/axios/axiosInstance";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [testimonials,setTestimonials] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/reviews/`);
        console.log("review res = ",res.data);
        setTestimonials(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  },[]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering, currentIndex]);
  console.log("testimonials = ",testimonials);
  // If less than 3 left, wrap around to the start
  // if (visibleTestimonials.length < 3) {
  //   visibleTestimonials.push(
  //     ...testimonials.slice(0, 3 - visibleTestimonials.length)
  //   );
  // }

  // console.log("visibleTestimonials = ",visibleTestimonials);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % testimonials.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      className="px-4 md:px-16 py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#616606]/10 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#204972]/10 rounded-full blur-3xl -z-0"></div>

      <div className="relative z-10 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#204972] md:ml-8">
          What Our <span className="text-[#616606]">Students</span> Say
        </h2>
        <p className="text-gray-600 mb-12 md:ml-8">
          Hear from those who've transformed their exam preparation with our platform
        </p>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-[#204972] hover:text-white transition-all duration-300 z-10 border border-gray-200"
            aria-label="Previous testimonials"
          >
            <FaChevronLeft className="text-[#204972] hover:text-white text-lg" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 px-4">
            {testimonials.map((item, index) => (
              <div
                key={`${item?._id}`}
                className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-500 border-t-4 border-[#616606] relative overflow-hidden group transform hover:-translate-y-2 z-50"
              >
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-[#204972]/10 text-6xl font-serif">"</div>

                <div>
                  <div className="flex gap-1 mb-4 text-[#616606]">
                    {[...Array(item?.rating)].map((_, i) => (
                      <FaStar key={i} className="group-hover:scale-110 transition-transform duration-200" />
                    ))}
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300 space-y-2">
                  {/* Student comment */}
                  {item?.comment && <p>"{item.comment}"</p>}

                  {/* Course name (if reviewType is course) */}
                  {item?.reviewType === 'course' && item?.course?.title && (
                    <p className="font-medium text-[#204972]">Course: {item.course.title}</p>
                  )}

                  {/* Review type */}
                  {item?.reviewType && (
                    <p className="text-xs text-gray-500 capitalize">Review type: {item.reviewType}</p>
                  )}
                </div>

                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative">
                   
                    <div className="absolute -bottom-1 -right-1 bg-[#204972] text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-[#204972] group-hover:text-[#616606] transition-colors duration-300">{item?.user?.name}</p>
                    <p className="text-xs text-gray-500">Verified Student</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-[#204972] hover:text-white transition-all duration-300 z-10 border border-gray-200"
            aria-label="Next testimonials"
          >
            <FaChevronRight className="text-[#204972] hover:text-white text-lg" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-10 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-[#616606] w-6' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Add these to your globals.css */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}