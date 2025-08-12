"use client";
import { useState } from "react";
import { CalendarDays, Filter } from "lucide-react";
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
  const [filterOpen, setFilterOpen] = useState(false);
  const itemsPerPage = 8;

  // Filtered data
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
      {/* Filter Button */}
      <div className="container mx-auto px-4 py-6 flex justify-end">
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#00316B] text-white rounded-full hover:bg-blue-800 transition"
        >
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Off-canvas Filter */}
      {filterOpen && (
        <div className="fixed inset-0  bg-opacity-40 z-50" onClick={() => setFilterOpen(false)}>
          <div
            className="absolute top-0 right-0 w-84 h-full bg-white shadow-lg p-6 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                    setFilterOpen(false);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-[#00316B] text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              onClick={() => setFilterOpen(false)}
              className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* No Data */}
      {filteredAffairs.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 mb-12 text-lg font-medium">
          No current affairs available in this category.
        </div>
      ) : (
        <>
          {/* Cards */}
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

          {/* Pagination */}
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