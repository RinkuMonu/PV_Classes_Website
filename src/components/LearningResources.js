"use client";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function LearningResources() {
  const resources = [
    {
      title: "Reference Books/Notes",
      description:
        "Our experts have created thorough study materials that break down complicated concepts into easily understandable content",
      img: "/Image/pic3.jpeg",
      bg: "bg-[#87b105]/20 hover:bg-[#87b105]/30",
      link: "/notes",
      button: true,
    },
    {
      title: "PYQs with Solutions",
      description:
        "Unlock academic excellence with PV Classes which provides you step-by-step solutions",
      img: "/Image/pic1.jpeg",
      bg: "bg-[#87b105]/20 hover:bg-[#87b105]/30",
      link: "/previous-year-question",
      button: false,
    },
    {
      title: "Test Series",
      description:
        "Use PV Classes detailed study materials that simplify complex ideas into easily understandable language",
      img: "/Image/pic2.jpeg",
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
        <p className="text-gray-600 text-lg sm:text-lg md:text-xl mx-auto md:mx-0 mb-8">
          A diverse array of learning materials to enhance your educational journey.
        </p>
      </div>

      {/* Grid of resources */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {resources.map((item, index) => (
    <Link href={item.link} key={index}>
      <div className="group h-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#204972] hover:shadow-xl cursor-pointer">
        
        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 leading-tight">
              {item.title}
            </h3>

            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[204972]/30 text-[#204972] transition-all duration-300 group-hover:bg-[#204972] group-hover:text-white">
              <FaArrowRight className="text-sm" />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-[15px] leading-7 flex-grow">
            {item.description}
          </p>

          {/* Image Section */}
          <div className="mt-6 bg-gray-50 rounded-md p-4 flex justify-center">
            <Image
              src={item.img}
              alt={item.title}
              width={220}
              height={220}
              className="w-full max-w-[220px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>
    </section>
  );
}
