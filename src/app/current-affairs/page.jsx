"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Politics", "Economy", "Science", "Sports", "International"];

const currentAffairs = [
  {
    id: 1,
    title: "Union Budget 2025 Highlights",
    date: "10 Aug 2025",
    category: "Economy",
    image: "/test1.webp",
  },
  {
    id: 2,
    title: "India Wins Gold in Asian Games",
    date: "09 Aug 2025",
    category: "Sports",
    image: "/test1.webp",
  },
  {
    id: 3,
    title: "New Space Mission Launched",
    date: "08 Aug 2025",
    category: "Science",
    image: "/test1.webp",
  }, 
  {
    id: 4,
    title: "New Space Mission Launched",
    date: "08 Aug 2025",
    category: "Science",
    image: "/test1.webp",
  },
];

export default function CurrentAffairsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  const filteredAffairs =
    selectedCategory === "All"
      ? currentAffairs
      : currentAffairs.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredAffairs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAffairs = filteredAffairs.slice(startIndex, startIndex + itemsPerPage);

  const getVisiblePages = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 2) {
      return [1, 2, 3, 4];
    }
    if (currentPage >= totalPages - 1) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <div className="bg-gray-50 min-h-screen px-20">
      <div className="container mx-auto px-4 py-6 flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-[#00316B] text-white shadow"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {filteredAffairs.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 mb-12 text-lg font-medium">
          No current affairs available in this category.
        </div>
      ) : (
        <>

        <Link href="">
          <div className="container mx-auto px-4 grid gap-6 md:grid-cols-4">
            {paginatedAffairs.map((item) => (
              <div
                key={item.id}
                className="rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={400}
                    className="w-full h-44 object-cover rounded-t-xl"
                  />
                  <span className="absolute top-3 left-3 bg-yellow-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <CalendarDays size={16} />
                    {item.date}
                  </div>
                  <h2 className="text-base font-semibold line-clamp-2 mb-2">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </Link>

          <div className="flex justify-center mt-8 mb-12 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === page
                    ? "bg-[#00316B] text-white shadow"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}