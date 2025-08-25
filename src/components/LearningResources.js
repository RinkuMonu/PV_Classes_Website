"use client";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function LearningResources() {
  const resources = [
    {
      title: "Reference Books",
      description:
        "Our experts have created thorough study materials that break down complicated concepts into easily understandable content",
      img: "/Image/boooks.webp",
      bg: "bg-[#87b105]/20 hover:bg-[#87b105]/30",
      link: "/book",
      button: true,
    },
    {
      title: "PYQs with Solutions",
      description:
        "Unlock academic excellence with PV Classes which provides you step-by-step solutions",
      img: "/Image/pyqs-img.webp",
      bg: "bg-[#87b105]/20 hover:bg-[#87b105]/30",
      link: "/previous-year-question",
      button: false,
    },
    {
      title: "Test Series",
      description:
        "Use PV Classes detailed study materials that simplify complex ideas into easily understandable language",
      img: "/Image/boooks.webp",
      bg: "bg-[#87b105]/20 hover:bg-[#87b105]/30",
      link: "/test-series",
      button: false,
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-18 lg:py-24">
      <div className="text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-[#204972] font-bold mb-3">
          Learning Resources
        </h2>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-8">
          A diverse array of learning materials to enhance your educational journey.
        </p>
      </div>

      {/* Grid of resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {resources.map((item, index) => (
          <Link href={item.link} key={index}>
            <div
              className={`relative group flex flex-col justify-between rounded-xl shadow-md p-6 sm:p-8 transition-all duration-300 hover:scale-105 cursor-pointer ${item.bg} h-full`}
            >
              {/* Arrow icon */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaArrowRight className="text-gray-700 text-base sm:text-lg" />
              </div>

              {/* Text content */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base md:text-[15px] my-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Image */}
              <div className="flex justify-center mt-4">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={240}
                  height={240}
                  className="rounded-md w-40 sm:w-48 md:w-56 lg:w-60 h-auto"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
