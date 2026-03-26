
"use client";
import { useState, useEffect } from "react";
import { CalendarDays, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../axios/axiosInstance";

export default function CurrentAffairsPage() {
  const [categories, setCategories] = useState([{ name: "All", slug: "all" }]);
  const [tags, setTags] = useState([]);
  const [affairs, setAffairs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const itemsPerPage = 25;

  // Fetch categories
  useEffect(() => {
    axiosInstance
      .get("/current-affairs")
      .then((res) => {
        const cats = res?.data?.map((item) => item?.category)?.filter(Boolean);

        const uniqueCats = Array.from(
          new Map(cats.map((cat) => [cat.slug, cat])).values()
        );

        setCategories([{ name: "All", slug: "all" }, ...uniqueCats]);
      })
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  // Fetch tags
  useEffect(() => {
    axiosInstance
      .get("/current-affairs")
      .then((res) => {
        const allTags = res?.data?.flatMap((item) => item?.tags || []);
        setTags(Array.from(new Set(allTags)));
      })
      .catch((err) => console.error("Error fetching tags", err));
  }, []);

  // Fetch affairs on filter change
  useEffect(() => {
    const fetchAffairs = async () => {
      try {
        const params = {};
        if (selectedCategory !== "all") params.category = selectedCategory;
        if (selectedTag) params.tags = selectedTag;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        params.status = "published";
        params.latest = true;

        const res = await axiosInstance.get("/current-affairs", { params });
        setAffairs(res?.data || []);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching current affairs", error);
      }
    };
    fetchAffairs();
  }, [selectedCategory, selectedTag, startDate, endDate]);

  // Pagination
  const totalPages = Math.ceil((affairs?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAffairs = affairs?.slice(startIndex, startIndex + itemsPerPage) || [];

  const getVisiblePages = () => {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3, 4];
    if (currentPage >= totalPages - 1)
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <>
      {/* Banner */}
      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/current-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/current-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col items-center text-center">
          <div className="absolute top-64 mt-6 flex space-x-4">
            <div className="flex flex-wrap gap-2">
              {categories?.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-base border transition font-bold cursor-pointer mt-10 ${selectedCategory === cat.slug
                    ? "bg-[#00316B] text-white border-[#00316B]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="bg-gray-50 min-h-screen px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Current Affairs</h1>
              <p className="text-gray-600 mt-1">Stay updated with the latest news and events</p>
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#00316B] text-white rounded-lg transition cursor-pointer shadow-md"
            >
              <Filter size={18} /> Filter
            </button>
          </div>

          {/* Quick category links */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories?.filter((cat) => cat.slug !== "all")?.map((cat) => (
              <Link
                key={cat.slug}
                href={`/current-affairs/category/${cat.slug}`}
                className="px-4 py-2 bg-gradient-to-br from-[#616602] to-[#00316B] text-white rounded-lg text-sm font-medium border border-gray-200 hover:bg-[#00316B] hover:text-white transition-all shadow-sm"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* List */}
          <div className="space-y-8 ">
            {Object.entries(
              paginatedAffairs.reduce((acc, item) => {
                const category = item.category?.name || "Other";
                if (!acc[category]) acc[category] = [];
                acc[category].push(item);
                return acc;
              }, {})
            ).map(([category, items]) => (
              <div key={category} className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg">
                {/* Category Heading */}
                <div className="flex items-center mb-8">
                  <div className="h-0.5 bg-gradient-to-r from-transparent to-gray-300 flex-grow mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">{category}</h2>
                  <div className="h-0.5 bg-gradient-to-l from-transparent to-gray-300 flex-grow ml-4"></div>
                </div>

                {/* Grid of cards inside this category */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Link key={item._id} href={`/current-affairs/${item.slug}`}>
                      <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 bg-white group">
                        <div className="relative overflow-hidden">
                          <Image
                            src={
                              // item.image.startsWith("http")
                              //   ? item.image
                              //   : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`
                              item.full_image
                            }
                            alt={item.title}
                            width={200}
                            height={400}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="absolute top-4 left-4 bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                            {item.category?.name}
                          </span>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#616602]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {new Date(item.publishDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <h2 className="text-base font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-[#616602] transition-colors duration-200 leading-tight">
                            {item.title}
                          </h2>
                          <div className="flex items-center mt-4 text-sm text-[#616602] font-medium">
                            <span>Read more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>


          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === page
                    ? "bg-[#00316B] text-white"
                    : "bg-white border hover:bg-gray-50"
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Filters */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setFilterOpen(false)}>
          <div className="flex-1 bg-black/50 transition-opacity duration-300"></div>
          <div className="w-80 h-full bg-white shadow-xl p-6 overflow-y-auto animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setFilterOpen(false)}>
                <X className="text-gray-600 hover:text-black cursor-pointer" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1 rounded-full text-sm border transition cursor-pointer ${selectedCategory === cat.slug
                      ? "bg-[#00316B] text-white border-[#00316B]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <div className="flex gap-2">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="flex-1 border rounded-md p-2 text-sm" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="flex-1 border rounded-md p-2 text-sm" />
              </div>
            </div>

            {/* Tags Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag("")}
                  className={`px-3 py-1 rounded-full text-sm border transition cursor-pointer ${selectedTag === ""
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
                    className={`px-3 py-1 rounded-full text-sm border transition cursor-pointer ${selectedTag === tag
                      ? "bg-[#00316B] text-white border-[#00316B]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
