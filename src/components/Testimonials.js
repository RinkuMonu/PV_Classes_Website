"use client";
import Image from "next/image";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name: "Aman Sharma",
      image: "/Image/profile.jpg",
      text: "Your videos are very useful, especially for preparing for competitive exams. It has a good collection of study material, mock tests and live classes. The interface is simple and user-friendly. The notes and recorded lectures feature is also very helpful. However, sometimes the app becomes slow or has some technical issues. If it is further optimized, it can be great.",
    },
    {
      name: "Stuti Choubey",
      image: "/Image/profile.jpg",
      text: "Your videos are a game-changer! The comprehensive study materials, regular updates, and user-friendly interface make learning seamless. Kudos to the team for providing such a valuable resource for students. It's truly helping me achieve my goals!",
    },
    {
      name: "Harsh Mathur",
      image: "/Image/profile.jpg",
      text: "Incredible dedication! Delivering current affairs content daily at 6 AM without missing a single day — 365 days a year — shows your unmatched passion and commitment. Your consistency, clarity, and value-packed sessions on YouTube are a true blessing for every aspirant. Thank you for being a rock-solid support system in our preparation journey. You deserve nothing less than 5 stars and a standing ovation!",
    },
    {
      name: "Radha Verma",
      image: "/Image/profile.jpg",
      text: "Your videos are very useful, especially for preparing for competitive exams. It has a good collection of study material, mock tests and live classes. The interface is simple and user-friendly. The notes and recorded lectures feature is also very helpful. However, sometimes the app becomes slow or has some technical issues. If it is further optimized, it can be great.",
    },
    {
      name: "Gaurav Rajput",
      image: "/Image/profile.jpg",
      text: "Your videos are a game-changer! The comprehensive study materials, regular updates, and user-friendly interface make learning seamless. Kudos to the team for providing such a valuable resource for students. It's truly helping me achieve my goals!",
    },
  ];

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  return (
    <section className="px-4 md:px-16 py-10 bg-white relative">
      <h2 className="text-3xl md:text-3xl font-bold mb-10 text-[#204972]">Testimonials</h2>

      <div className="relative">

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
          aria-label="Previous testimonials"
        >
          <FaChevronLeft className="text-[#204972]" />
        </button>


        <div className="grid md:grid-cols-3 gap-6 overflow-hidden">
          {visibleTestimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between transition-all duration-300 mb-6"
            >
              <div>
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="font-medium">{item.name}</p>
              </div>
            </div>
          ))}
        </div>


        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition z-10"
          aria-label="Next testimonials"
        >
          <FaChevronRight className="text-[#204972]" />
        </button>
      </div>
    </section>
  );
}