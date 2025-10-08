


// "use client";
// import { useState, useEffect } from "react";
// import { CalendarDays, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import axiosInstance from "../axios/axiosInstance";

// export default function CurrentAffairsPage() {
//   const [categories, setCategories] = useState(["All"]);
//   const [tags, setTags] = useState([]);
//   const [affairs, setAffairs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedTag, setSelectedTag] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filterOpen, setFilterOpen] = useState(false);

//   const itemsPerPage = 25;

//   // Fetch categories list
//   useEffect(() => {
//     axiosInstance
//       .get("/current-affairs")
//       .then((res) => {
//         const cats = res?.data
//           ?.map((item) => item?.category?.name)
//           ?.filter(Boolean);
//         setCategories(["All", ...Array.from(new Set(cats))]);
//       })
//       .catch((err) => console.error("Error fetching categories", err));
//   }, []);

//   // Fetch tags
//   useEffect(() => {
//     axiosInstance
//       .get("/current-affairs")
//       .then((res) => {
//         const allTags = res?.data?.flatMap((item) => item?.tags || []);
//         setTags(Array.from(new Set(allTags)));
//       })
//       .catch((err) => console.error("Error fetching tags", err));
//   }, []);

//   // Fetch affairs when filters change
//   useEffect(() => {
//     const fetchAffairs = async () => {
//       try {
//         const params = {};
//         if (selectedCategory !== "All") {
//           params.category = selectedCategory?.toLowerCase()?.replace(/\s+/g, "-");
//         }
//         if (selectedTag) params.tags = selectedTag;
//         if (startDate) params.startDate = startDate;
//         if (endDate) params.endDate = endDate;
//         params.status = "published";
//         params.latest = true;

//         const res = await axiosInstance.get("/current-affairs", { params });
//         setAffairs(res?.data || []);
//         setCurrentPage(1);
//       } catch (error) {
//         console.error("Error fetching current affairs", error);
//       }
//     };
//     fetchAffairs();
//   }, [selectedCategory, selectedTag, startDate, endDate]);

//   // Pagination
//   const totalPages = Math.ceil((affairs?.length || 0) / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedAffairs = affairs?.slice(startIndex, startIndex + itemsPerPage) || [];

//   const getVisiblePages = () => {
//     if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
//     if (currentPage <= 2) return [1, 2, 3, 4];
//     if (currentPage >= totalPages - 1)
//       return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
//     return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
//   };


//   console.log(":", categories);

//   return (
//     <>
//       {/* Banner - Kept as original */}
//       <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
//         <div className="absolute inset-0 hidden sm:block">
//           <Image
//             src="/Image/Banner/current-banner.webp"
//             alt="Banner Desktop"
//             fill
//             className="object-cover object-center"
//             // priority
//           />
//         </div>
//         <div className="absolute inset-0 block sm:hidden">
//           <Image
//             src="/Image/pv-mobile/current-banner-mob.webp"
//             alt="Banner Mobile"
//             fill
//             className="object-cover object-center"
//             // priority
//           />
//         </div>
//         <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col items-center text-center">
//           <div className="absolute top-64 mt-6 flex space-x-4">
//             <div className="flex flex-wrap gap-2">
//               {categories?.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`px-4 py-2 rounded-full text-base border transition font-bold cursor-pointer mt-10 ${selectedCategory === cat
//                       ? "bg-[#00316B] text-white border-[#00316B]"
//                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                     }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <div className="bg-gray-50 min-h-screen px-4 md:px-8 pb-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header with filter button */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Current Affairs</h1>
//               <p className="text-gray-600 mt-1">Stay updated with the latest news and events</p>
//             </div>
//             <button
//               onClick={() => setFilterOpen(true)}
//               className="flex items-center gap-2 px-4 py-2.5 bg-[#00316B] text-white rounded-lg transition cursor-pointer shadow-md"
//             >
//               <Filter size={18} /> Filter
//             </button>
//           </div>

//           {/* Quick category links */}
//           <div className="flex flex-wrap gap-2 mb-8">
//             {categories?.slice(1)?.map((cat) => (
//               <Link
//                 key={cat}
//                 href={`/current-affairs/category/${cat?.toLowerCase()?.replace(/\s+/g, "-")}`}
//                 className="px-4 py-2 bg-[#00316B] text-white rounded-lg text-sm font-medium border border-gray-200 hover:bg-[#00316B] hover:text-white transition-all shadow-sm"
//               >
//                 {cat}
//               </Link>
//             ))}
//           </div>

//           {/* Filter Sidebar */}
//           {filterOpen && (
//             <div className="fixed inset-0 z-50 flex" onClick={() => setFilterOpen(false)}>
//               <div className="flex-1 bg-black/50 transition-opacity duration-300"></div>
//               <div
//                 className="w-80 h-full bg-white shadow-xl p-6 overflow-y-auto animate-slide-in"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-between items-center mb-6 pb-3 border-b">
//                   <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
//                   <button
//                     onClick={() => setFilterOpen(false)}
//                     className="p-1 rounded-full hover:bg-gray-100 transition"
//                   >
//                     <X className="text-gray-600 hover:text-black" size={20} />
//                   </button>
//                 </div>

//                 {/* Category Filter */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium mb-3 text-gray-700">Category</label>
//                   <div className="flex flex-wrap gap-2">
//                     {categories?.map((cat) => (
//                       <button
//                         key={cat}
//                         onClick={() => setSelectedCategory(cat)}
//                         className={`px-3 py-1.5 rounded-full text-sm border transition cursor-pointer ${selectedCategory === cat
//                             ? "bg-[#00316B] text-white border-[#00316B] shadow-sm"
//                             : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                           }`}
//                       >
//                         {cat}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Date Filter */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium mb-3 text-gray-700">Date Range</label>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="text-xs text-gray-500 mb-1 block">From</label>
//                       <input
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#00316B] focus:border-transparent"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500 mb-1 block">To</label>
//                       <input
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#00316B] focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Tags Filter */}
//                 <div className="mb-8">
//                   <label className="block text-sm font-medium mb-3 text-gray-700">Tags</label>
//                   <div className="flex flex-wrap gap-2">
//                     <button
//                       onClick={() => setSelectedTag("")}
//                       className={`px-3 py-1.5 rounded-full text-sm border transition cursor-pointer ${selectedTag === ""
//                           ? "bg-[#00316B] text-white border-[#00316B] shadow-sm"
//                           : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                         }`}
//                     >
//                       All
//                     </button>
//                     {tags?.map((tag) => (
//                       <button
//                         key={tag}
//                         onClick={() => setSelectedTag(tag)}
//                         className={`px-3 py-1.5 rounded-full text-sm border transition cursor-pointer ${selectedTag === tag
//                             ? "bg-[#00316B] text-white border-[#00316B] shadow-sm"
//                             : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                           }`}
//                       >
//                         {tag}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-3 sticky bottom-0 bg-white pt-4 pb-2">
//                   <button
//                     onClick={() => {
//                       setSelectedCategory("All");
//                       setStartDate("");
//                       setEndDate("");
//                       setSelectedTag("");
//                       setCurrentPage(1);
//                     }}
//                     className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
//                   >
//                     Reset
//                   </button>
//                   <button
//                     onClick={() => setFilterOpen(false)}
//                     className="flex-1 px-4 py-2.5 bg-[#00316B] text-white rounded-lg hover:bg-blue-800 transition font-medium shadow-sm"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Listing */}
//           {paginatedAffairs?.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-xl shadow-sm">
//               <div className="text-gray-400 mb-4 text-6xl">📭</div>
//               <h3 className="text-xl font-medium text-gray-700 mb-2">No current affairs found</h3>
//               <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
//               <button
//                 onClick={() => {
//                   setSelectedCategory("All");
//                   setStartDate("");
//                   setEndDate("");
//                   setSelectedTag("");
//                 }}
//                 className="px-5 py-2.5 bg-[#00316B] text-white rounded-lg hover:bg-blue-800 transition"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-8">
//                 {categories?.filter((cat) => cat !== "All")?.map((cat) => {
//                   const catItems = paginatedAffairs?.filter(
//                     (item) => item?.category?.name === cat
//                   );
//                   if (!catItems || catItems?.length === 0) return null;
//                   return (
//                     <div key={cat} className="bg-white rounded-xl p-6">
//                       <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-xl md:text-2xl font-bold text-gray-900">{cat}</h2>
//                         <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
//                           {catItems.length} {catItems.length === 1 ? 'item' : 'items'}
//                         </span>
//                       </div>
//                       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                         {catItems?.map((item) => (
//                           <Link key={item?._id} href={`/current-affairs/${item?.slug}`}>
//                             <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 group">
//                               <div className="relative overflow-hidden">
//                                 <Image
//                                   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item?.image || ""}`}
//                                   alt={item?.title || "Current Affairs"}
//                                   width={300}
//                                   height={200}
//                                   className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                                 <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
//                                   {item?.category?.name}
//                                 </span>
//                               </div>
//                               <div className="p-4">
//                                 <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
//                                   <CalendarDays size={14} />
//                                   {item?.publishDate
//                                     ? new Date(item?.publishDate).toLocaleDateString("en-GB", {
//                                       day: "2-digit",
//                                       month: "short",
//                                       year: "numeric",
//                                     })
//                                     : "N/A"}
//                                 </div>
//                                 <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#00316B] transition-colors">
//                                   {item?.title}
//                                 </h2>
//                                 <div className="flex flex-wrap gap-1 mt-3">
//                                   {item?.tags?.slice(0, 3).map((tag, index) => (
//                                     <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
//                                       #{tag}
//                                     </span>
//                                   ))}
//                                   {item?.tags?.length > 3 && (
//                                     <span className="text-gray-400 text-xs">+{item.tags.length - 3} more</span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-12 mb-6">
//                   <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm p-2">
//                     <button
//                       onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                       disabled={currentPage === 1}
//                       className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === 1
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-white text-gray-700 hover:bg-blue-50 hover:text-[#00316B]"
//                         }`}
//                     >
//                       <ChevronLeft size={18} />
//                     </button>

//                     {getVisiblePages()?.map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === page
//                             ? "bg-[#00316B] text-white shadow"
//                             : "bg-white text-gray-700 hover:bg-blue-50 hover:text-[#00316B]"
//                           }`}
//                       >
//                         {page}
//                       </button>
//                     ))}

//                     <button
//                       onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                       disabled={currentPage === totalPages}
//                       className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === totalPages
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-white text-gray-700 hover:bg-blue-50 hover:text-[#00316B]"
//                         }`}
//                     >
//                       <ChevronRight size={18} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Animation */}
//           <style jsx>{`
//             @keyframes slideIn {
//               from {
//                 transform: translateX(100%);
//               }
//               to {
//                 transform: translateX(0);
//               }
//             }
//             .animate-slide-in {
//               animation: slideIn 0.3s ease-out forwards;
//             }
//           `}</style>
//         </div>
//       </div>
//     </>
//   );
// }



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
            // priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/current-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            // priority
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
                              item.image.startsWith("http")
                                ? item.image
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`
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
