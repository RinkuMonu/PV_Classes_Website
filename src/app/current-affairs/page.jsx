"use client";
import { useState } from "react";
import { CalendarDays, Filter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Politics", "Economy", "Science", "Sports", "International"];

const currentAffairs = [
  { id: 1, title: "Union Budget 2025 Highlights", date: "2025-08-10", category: "Economy", tags: ["Budget"], image: "/test1.webp" },
  { id: 2, title: "India Wins Gold in Asian Games", date: "2025-08-09", category: "Sports", tags: ["Sports"], image: "/test1.webp" },
  { id: 3, title: "New Space Mission Launched", date: "2025-08-08", category: "Science", tags: ["Innovation"], image: "/test1.webp" },
  { id: 4, title: "Election Results 2025", date: "2025-08-05", category: "Politics", tags: ["Election"], image: "/test1.webp" },
  { id: 5, title: "Union Budget 2025 Highlights", date: "2025-08-10", category: "Economy", tags: ["Budget"], image: "/test1.webp" },
  { id: 12, title: "New Space Mission Launched", date: "2025-08-08", category: "Science", tags: ["Innovation"], image: "/test1.webp" },
  { id: 14, title: "Election Results 2025", date: "2025-08-05", category: "Politics", tags: ["Election"], image: "/test1.webp" },
  { id: 13, title: "Union Budget 2025 Highlights", date: "2025-08-10", category: "Economy", tags: ["Budget"], image: "/test1.webp" },
  { id: 6, title: "India Wins Gold in Asian Games", date: "2025-08-09", category: "Sports", tags: ["Sports"], image: "/test1.webp" },
  { id: 7, title: "New Space Mission Launched", date: "2025-08-08", category: "Science", tags: ["Innovation"], image: "/test1.webp" },
  { id: 8, title: "Election Results 2025", date: "2025-08-05", category: "Politics", tags: ["Election"], image: "/test1.webp" },
  { id: 9, title: "New Space Mission Launched", date: "2025-08-08", category: "Science", tags: ["Innovation"], image: "/test1.webp" },
  { id: 10, title: "Election Results 2025", date: "2025-08-05", category: "Politics", tags: ["Election"], image: "/test1.webp" },
  { id: 11, title: "Union Budget 2025 Highlights", date: "2025-08-10", category: "Economy", tags: ["Budget"], image: "/test1.webp" },
];

export default function CurrentAffairsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const itemsPerPage = 25;
  const tags = ["Budget", "Election", "Innovation", "Health", "Education", "Sports"];

  const filteredAffairs = currentAffairs.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const tagMatch = !selectedTag || item.tags.includes(selectedTag);
    const dateMatch =
      (!startDate || new Date(item.date) >= new Date(startDate)) &&
      (!endDate || new Date(item.date) <= new Date(endDate));
    return categoryMatch && tagMatch && dateMatch;
  });

  const totalPages = Math.ceil(filteredAffairs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAffairs = filteredAffairs.slice(startIndex, startIndex + itemsPerPage);

  const getVisiblePages = () => {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3, 4];
    if (currentPage >= totalPages - 1) return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <>

      <section className="relative w-full bg-[#00316B] text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/book.jpg"
            alt="Banner"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Government Exams Preparation & Download PDFs
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl">
            Prepare for your exams with the latest resources, mock tests, and study materials.
          </p>
          <div className="mt-6 flex space-x-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-base border transition font-bold ${selectedCategory === cat
                    ? "bg-[#00316B] text-white border-[#00316B]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      <div className="bg-gray-50 min-h-screen px-3 md:px-20 pb-4">
        <div className="container mx-auto px-4 py-6 flex justify-end">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00316B] text-white rounded-full hover:bg-blue-800 transition"
          >
            <Filter size={16} /> Filter
          </button>
        </div>
        {filterOpen && (
          <div
            className="fixed inset-0 z-50 flex "
            onClick={() => setFilterOpen(false)}
          >
            <div className="flex-1 bg-black/50  transition-opacity duration-300 "></div>
            <div
              className="w-80 h-full bg-white shadow-xl p-6 overflow-y-auto animate-slide-in "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6 relative">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setFilterOpen(false)}>
                  <X className="text-gray-600 hover:text-black" />
                </button>
              </div>

              {/* Category Tabs */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 ">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${selectedCategory === cat
                        ? "bg-[#00316B] text-white border-[#00316B]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range in One Row */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 border rounded-md p-2 text-sm"
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 border rounded-md p-2 text-sm"
                  />
                </div>
              </div>

              {/* Tag Tabs */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag("")}
                    className={`px-3 py-1 rounded-full text-sm border transition ${selectedTag === ""
                      ? "bg-[#00316B] text-white border-[#00316B]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    All
                  </button>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${selectedTag === tag
                        ? "bg-[#00316B] text-white border-[#00316B]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 absolute bottom-5 right-5">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setStartDate("");
                    setEndDate("");
                    setSelectedTag("");
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200  text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Reset
                </button>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="flex-1 px-4 py-2 bg-[#00316B] text-white rounded-md hover:bg-blue-800 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredAffairs.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 mb-12 text-lg font-medium">
            No current affairs available for the selected filters.
          </div>
        ) : (
          <>
            <div className="container mx-auto px-4 space-y-10">
              {categories
                .filter((cat) => cat !== "All")
                .map((cat) => {
                  const catItems = paginatedAffairs.filter((item) => item.category === cat);
                  if (catItems.length === 0) return null;

                  return (
                    <div key={cat}>

                      <h2 className="text-2xl font-bold mb-4">{cat}</h2>


                      <div className="grid gap-6 md:grid-cols-4">
                        {catItems.map((item) => (
                          <Link key={item.id} href="/current-affairs-detail">
                            <div className="rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white">
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
                                  {new Date(item.date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </div>
                                <h2 className="text-base font-semibold line-clamp-2 mb-2">
                                  {item.title}
                                </h2>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>


            {/* Pagination */}
            <div className="flex justify-end mt-8 mb-14 gap-2 ">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 1
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === page
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
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-100"
                  }`}
              >
                Next
              </button>
            </div>
          </>
        )}


        {/* Slide-in animation */}
        <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
      </div>



    </>
  );
}
