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
      img: "/Image/refrence-book.webp",
      bg: "bg-blue-100 hover:bg-blue-200",
      link: "/book",
      button: true,
    },
    {
      title: "PYQs with Solutions",
      description:
        "Unlock academic excellence with PV Classes which provides you step-by-step solutions",
      img: "/Image/pyqs-img.webp",
      bg: "bg-orange-100 hover:bg-orange-200",
      link: "/previous-year-question",
      button: false,
    },
    {
      title: "Test Series",
      description:
        "Use PV Classes detailed study materials that simplify complex ideas into easily understandable language",
      img: "/Image/refrence-book.webp",
      bg: "bg-green-100 hover:bg-green-200",
      link: "/test-series",
      button: false,
    },
  ];

  return (
    <section className="px-6 md:px-16 py-18">
      <h2 className="text-3xl md:text-4xl text-[#204972] font-bold mb-4">
        Learning Resources
      </h2>
      <p className="text-gray-600 text-lg mb-10">
        A diverse array of learning materials to enhance your educational journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((item, index) => (
          <div
            key={index}
            className={`relative group flex flex-col justify-between rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${item.bg} h-full`}
          >
            <Link
              href={item.link}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <FaArrowRight className="text-gray-700 text-lg" />
            </Link>

            <div>
              <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm my-4">{item.description}</p>
            </div>

            <div className="flex justify-center">
              <Image
                src={item.img}
                alt={item.title}
                width={240}
                height={240}
                className="rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
