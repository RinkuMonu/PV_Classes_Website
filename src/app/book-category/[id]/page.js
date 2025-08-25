// "use client";
// import toast from "react-hot-toast";
// import { useCart } from "../../../components/context/CartContext";
// import { useParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaPlus } from "react-icons/fa6";
// import axiosInstance from "../../axios/axiosInstance";

// export default function BookCategoryPage() {
//   const { addToCart, loading } = useCart();
//   const params = useParams();
//   const id = params.id;

//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axiosInstance.get(`/books/category/${id}`);
//         setBooks(res.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBooks();
//   }, [id]);

//   const handleAdd = async (e, itemType, itemId) => {
//     e.stopPropagation();
//     const response = await addToCart({ itemType, itemId });
//     if (response.success) {
//       toast.success(response.message);
//     } else {
//       toast.error(response.message);
//     }
//   };

//   const [languageFilter, setLanguageFilter] = useState("");
//   const [editionFilter, setEditionFilter] = useState("");
//   const [sortOption, setSortOption] = useState("Latest");

//   const filteredBooks = books
//     .filter((book) => {
//       const langMatch =
//         languageFilter === "" ||
//         book.language?.toLowerCase() === languageFilter.toLowerCase();

//       const year = new Date(book.createdAt).getFullYear().toString();
//       const editionMatch =
//         editionFilter === "" || year === editionFilter.toLowerCase();

//       return langMatch && editionMatch;
//     })
//     .sort((a, b) => {
//       if (sortOption === "Latest")
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sortOption === "Oldest")
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       if (sortOption === "Price: Low to High") return a.price - b.price;
//       if (sortOption === "Price: High to Low") return b.price - a.price;
//       return 0;
//     });

//   return (
//     <>
//       {/* Banner */}
      // <section className="relative w-full h-[60vh] sm:h-[50vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
      //   {/* Desktop Banner */}
      //   <div className="absolute inset-0 hidden sm:block">
      //     <Image
      //       src="/Image/Banner/book-banner.webp"
      //       alt="Banner Desktop"
      //       fill
      //       className="object-cover object-center"
      //       priority
      //     />
      //   </div>
      //   {/* Mobile Banner */}
      //   <div className="absolute inset-0 block sm:hidden">
      //     <Image
      //       src="/Image/pv-mobile/book-banner-mob.webp"
      //       alt="Banner Mobile"
      //       fill
      //       className="object-cover object-center"
      //       priority
      //     />
      //   </div>
      // </section>

//       {/* Page Content */}
//       <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f0f4f8] py-6 px-4 sm:px-8">
//         {/* Header Section */}
//         <div className=" mx-auto">
//           {/* Breadcrumb */}
//           <div className="flex items-center text-sm mb-4">
//             <Link
//               href="/"
//               className="text-[#083776] hover:text-[#616606] transition-colors flex items-center"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                 />
//               </svg>
//               Home
//             </Link>
//             <span className="mx-2 text-[#083776]/40">/</span>
//             <span className="text-[#083776] font-medium truncate">
//               {filteredBooks?.[0]?.book_category_id?.name || "Category"}
//             </span>
//           </div>

//           {/* Heading + Sort */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-[#083776] mb-1">
//                 {filteredBooks?.[0]?.book_category_id?.name || "Books"}
//               </h1>
//               <p className="text-[#083776] font-medium">
//                 Discover {filteredBooks.length} items
//               </p>
//             </div>

//             <div className="flex items-center">
//               <span className="text-sm text-[#083776] mr-2">Sort by:</span>
//               <div className="relative">
//                 <select
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="border border-[#083776]/20 rounded-lg px-4 py-2 pr-8 text-[#083776] bg-white focus:ring-2 focus:ring-[#616606] focus:border-[#616606] appearance-none cursor-pointer"
//                 >
//                   <option>Latest</option>
//                   <option>Oldest</option>
//                   <option>Price: Low to High</option>
//                   <option>Price: High to Low</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#616606]">
//                   <svg
//                     className="h-4 w-4"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Layout: Sidebar + Books */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//             {/* Sidebar */}
//             <aside className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-[#083776]/10 p-5 h-fit sticky top-6">
//               <div className="flex items-center justify-between mb-5">
//                 <h2 className="text-xl font-bold text-[#083776]">Filters</h2>
//                 <button
//                   onClick={() => {
//                     setLanguageFilter("");
//                     setEditionFilter("");
//                   }}
//                   className="text-sm text-[#616606] hover:text-[#083776] font-medium"
//                 >
//                   Reset All
//                 </button>
//               </div>

//               {/* Language Filter */}
//               <div className="mb-6 pb-4 border-b border-[#083776]/10 last:border-b-0">
//                 <p className="text-sm font-semibold text-[#083776] mb-3 uppercase tracking-wide">
//                   Language
//                 </p>
//                 <div className="space-y-2">
//                   {["Hindi", "English"].map((lang) => (
//                     <div key={lang} className="flex items-center">
//                       <input
//                         type="radio"
//                         name="language"
//                         value={lang}
//                         checked={languageFilter === lang}
//                         onChange={(e) => setLanguageFilter(e.target.value)}
//                         className="hidden"
//                         id={`language-${lang}`}
//                       />
//                       <label
//                         htmlFor={`language-${lang}`}
//                         className={`flex items-center cursor-pointer text-sm ${
//                           languageFilter === lang
//                             ? "text-[#083776] font-medium"
//                             : "text-[#083776]/80"
//                         }`}
//                       >
//                         <span
//                           className={`w-5 h-5 inline-block mr-3 rounded-full border flex-shrink-0 ${
//                             languageFilter === lang
//                               ? "border-[#616606] bg-[#616606]/10"
//                               : "border-[#083776]/40"
//                           }`}
//                         >
//                           {languageFilter === lang && (
//                             <svg
//                               className="w-3 h-3 text-[#616606] mx-auto mt-0.5"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           )}
//                         </span>
//                         {lang}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Edition Filter */}
//               <div className="mb-2">
//                 <p className="text-sm font-semibold text-[#083776] mb-3 uppercase tracking-wide">
//                   Edition Year
//                 </p>
//                 <div className="space-y-2">
//                   {[2025, 2024, 2023].map((year) => (
//                     <div key={year} className="flex items-center">
//                       <input
//                         type="radio"
//                         name="edition"
//                         value={year}
//                         checked={editionFilter === year.toString()}
//                         onChange={(e) => setEditionFilter(e.target.value)}
//                         className="hidden"
//                         id={`edition-${year}`}
//                       />
//                       <label
//                         htmlFor={`edition-${year}`}
//                         className={`flex items-center cursor-pointer text-sm ${
//                           editionFilter === year.toString()
//                             ? "text-[#083776] font-medium"
//                             : "text-[#083776]/80"
//                         }`}
//                       >
//                         <span
//                           className={`w-5 h-5 inline-block mr-3 rounded-full border flex-shrink-0 ${
//                             editionFilter === year.toString()
//                               ? "border-[#616606] bg-[#616606]/10"
//                               : "border-[#083776]/40"
//                           }`}
//                         >
//                           {editionFilter === year.toString() && (
//                             <svg
//                               className="w-3 h-3 text-[#616606] mx-auto mt-0.5"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           )}
//                         </span>
//                         {year}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </aside>

//             {/* Books Grid */}
//             <main className="lg:col-span-9">
//               {filteredBooks.length === 0 ? (
//                 <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-16 w-16 mx-auto text-[#083776]/30 mb-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     />
//                   </svg>
//                   <h3 className="text-xl font-medium text-[#083776] mb-2">
//                     No books found
//                   </h3>
//                   <p className="text-[#083776]/70">
//                     Try adjusting your filters to find what you're looking for.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
//                   {filteredBooks?.map((book) => (
//                     <div
//                       key={book?._id}
//                       className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col"
//                     >
//                       <Link href={`/book-detail/${book?._id}`}>
//                         <div className="relative">
//                           {/* Tag */}
//                           {book?.tag && (
//                             <div className="absolute top-3 left-3 bg-[#616606] text-white text-xs px-3 py-1.5 rounded-full font-semibold z-10 shadow-md">
//                               {book?.tag}
//                             </div>
//                           )}

//                           {/* Book Image */}
//                           <div className="relative w-full h-60 bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] flex items-center justify-center p-5">
//                             <div className="w-32 h-44 relative shadow-lg">
//                               <Image
//                                 src={book?.full_image?.[0]}
//                                 alt={book?.title}
//                                 fill
//                                 className="object-cover rounded"
//                               />
//                             </div>
//                           </div>

//                           {/* Book Info */}
//                           <div className="p-4 flex-grow">
//                             <p className="text-sm font-medium text-[#083776] line-clamp-2 mb-3 leading-tight min-h-[2.5rem]">
//                               {book?.title}
//                             </p>
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-bold text-lg text-[#083776]">
//                                 ₹{book?.discount_price}
//                               </span>
//                               {book?.discount_price && book?.price && (
//                                 <span className="text-[#616606] text-sm font-medium bg-[#616606]/10 px-1.5 py-0.5 rounded">
//                                   {Math.round(
//                                     ((book.price - book.discount_price) /
//                                       book.price) *
//                                       100
//                                   )}
//                                   % off
//                                 </span>
//                               )}
//                             </div>
//                             <div className="text-xs text-[#083776]/60 line-through">
//                               {book?.price ? `₹${book.price}` : ""}
//                             </div>
//                           </div>
//                         </div>
//                       </Link>

//                       {/* Add Button */}
//                       <div className="p-4 pt-0 mt-auto">
//                         <button
//                           onClick={(e) => handleAdd(e, "book", book?._id)}
//                           disabled={loading}
//                           className="w-full bg-[#616606] hover:bg-[#083776] text-white font-medium py-2.5 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           <span className="mr-2">
//                             <i className="fas fa-plus-circle"></i>
//                           </span>
//                           {loading ? "ADDING..." : "ADD TO CART"}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </main>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





"use client";
import toast from "react-hot-toast";
import { useCart } from "../../../components/context/CartContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaFilter, FaHome, FaChevronRight } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import axiosInstance from "../../axios/axiosInstance";

export default function BookCategoryPage() {
  const { addToCart, loading } = useCart();
  const params = useParams();
  const id = params.id;

  const [books, setBooks] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get(`/books/category/${id}`);
        setBooks(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [id]);

  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();
    const response = await addToCart({ itemType, itemId });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const [languageFilter, setLanguageFilter] = useState("");
  const [editionFilter, setEditionFilter] = useState("");
  const [sortOption, setSortOption] = useState("Latest");

  const filteredBooks = books
    .filter((book) => {
      const langMatch =
        languageFilter === "" ||
        book.language?.toLowerCase() === languageFilter.toLowerCase();

      const year = new Date(book.createdAt).getFullYear().toString();
      const editionMatch =
        editionFilter === "" || year === editionFilter.toLowerCase();

      return langMatch && editionMatch;
    })
    .sort((a, b) => {
      if (sortOption === "Latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "Oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "Price: Low to High") return a.price - b.price;
      if (sortOption === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  return (
    <>
      {/* Banner */}
       <section className="relative w-full h-[60vh] sm:h-[50vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
        {/* Desktop Banner */}
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/book-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Mobile Banner */}
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/book-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Page Content */}
      <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f0f4f8] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <Link
              href="/"
              className="text-[#083776] hover:text-[#616606] transition-colors flex items-center"
            >
              <FaHome className="h-4 w-4 mr-1" />
              Home
            </Link>
            <FaChevronRight className="mx-2 text-[#083776]/40 text-xs" />
            <span className="text-[#083776] font-medium truncate">
              {filteredBooks?.[0]?.book_category_id?.name || "Category"}
            </span>
          </div>

          {/* Heading + Sort + Filter Toggle */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#083776] mb-1">
                {filteredBooks?.[0]?.book_category_id?.name || "Books"}
              </h1>
              <p className="text-[#083776] font-medium">
                {filteredBooks.length} {filteredBooks.length === 1 ? "item" : "items"} found
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#083776]/20 text-[#083776] shadow-sm hover:shadow-md transition-all"
              >
                <FaFilter className="text-sm" />
                Filters
              </button>

              <div className="flex items-center">
                <span className="text-sm text-[#083776] mr-2">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-[#083776]/20 rounded-lg px-4 py-2 pr-8 text-[#083776] bg-white focus:ring-2 focus:ring-[#616606] focus:border-[#616606] appearance-none cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  >
                    <option>Latest</option>
                    <option>Oldest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#616606]">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Layout: Sidebar + Books */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Desktop Sidebar */}
            <aside className="lg:col-span-3 hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-[#083776]/10 p-5 h-fit sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-[#083776]">Filters</h2>
                <button
                  onClick={() => {
                    setLanguageFilter("");
                    setEditionFilter("");
                  }}
                  className="text-sm text-[#616606] hover:text-[#083776] font-medium transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Language Filter */}
              <div className="mb-6 pb-4 border-b border-[#083776]/10 last:border-b-0">
                <p className="text-sm font-semibold text-[#083776] mb-3 uppercase tracking-wide">
                  Language
                </p>
                <div className="space-y-2">
                  {["Hindi", "English"].map((lang) => (
                    <div key={lang} className="flex items-center">
                      <input
                        type="radio"
                        name="language"
                        value={lang}
                        checked={languageFilter === lang}
                        onChange={(e) => setLanguageFilter(e.target.value)}
                        className="hidden"
                        id={`language-${lang}`}
                      />
                      <label
                        htmlFor={`language-${lang}`}
                        className={`flex items-center cursor-pointer text-sm transition-all ${
                          languageFilter === lang
                            ? "text-[#083776] font-medium"
                            : "text-[#083776]/80 hover:text-[#083776]"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 inline-block mr-3 rounded-full border flex-shrink-0 transition-all ${
                            languageFilter === lang
                              ? "border-[#616606] bg-[#616606]/10 shadow-inner"
                              : "border-[#083776]/40 hover:border-[#616606]"
                          }`}
                        >
                          {languageFilter === lang && (
                            <svg
                              className="w-3 h-3 text-[#616606] mx-auto mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                        {lang}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edition Filter */}
              <div className="mb-2">
                <p className="text-sm font-semibold text-[#083776] mb-3 uppercase tracking-wide">
                  Edition Year
                </p>
                <div className="space-y-2">
                  {[2025, 2024, 2023].map((year) => (
                    <div key={year} className="flex items-center">
                      <input
                        type="radio"
                        name="edition"
                        value={year}
                        checked={editionFilter === year.toString()}
                        onChange={(e) => setEditionFilter(e.target.value)}
                        className="hidden"
                        id={`edition-${year}`}
                      />
                      <label
                        htmlFor={`edition-${year}`}
                        className={`flex items-center cursor-pointer text-sm transition-all ${
                          editionFilter === year.toString()
                            ? "text-[#083776] font-medium"
                            : "text-[#083776]/80 hover:text-[#083776]"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 inline-block mr-3 rounded-full border flex-shrink-0 transition-all ${
                            editionFilter === year.toString()
                              ? "border-[#616606] bg-[#616606]/10 shadow-inner"
                              : "border-[#083776]/40 hover:border-[#616606]"
                          }`}
                        >
                          {editionFilter === year.toString() && (
                            <svg
                              className="w-3 h-3 text-[#616606] mx-auto mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                        {year}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile Filters Overlay */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div 
                  className="absolute inset-0 bg-black/30"
                  onClick={() => setMobileFiltersOpen(false)}
                ></div>
                <div className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm p-5 overflow-y-auto transform transition-transform">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-[#083776]">Filters</h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-1 text-[#083776] hover:text-[#616606]"
                    >
                      <IoIosClose className="text-2xl" />
                    </button>
                  </div>

                  <div className="mb-6 pb-4 border-b border-[#083776]/10">
                    <p className="text-sm font-semibold text-[#083776] mb-3 uppercase tracking-wide">
                      Language
                    </p>
                    <div className="space-y-2">
                      {["Hindi", "English"].map((lang) => (
                        <div key={lang} className="flex items-center">
                          <input
                            type="radio"
                            name="language-mobile"
                            value={lang}
                            checked={languageFilter === lang}
                            onChange={(e) => setLanguageFilter(e.target.value)}
                            className="hidden"
                            id={`language-mobile-${lang}`}
                          />
                          <label
                            htmlFor={`language-mobile-${lang}`}
                            className={`flex items-center cursor-pointer text-sm ${
                              languageFilter === lang
                                ? "text-[#083776] font-medium"
                                : "text-[#083776]/80"
                            }`}
                          >
                            <span
                              className={`w-5 h-5 inline-block mr-3 rounded-full border flex-shrink-0 ${
                                languageFilter === lang
                                  ? "border-[#616606] bg-[#616606]/10"
                                  : "border-[#083776]/40"
                              }`}
                            >
                              {languageFilter === lang && (
                                <svg
                                  className="w-3 h-3 text-[#616606] mx-auto mt-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </span>
                            {lang}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[#083776] mb-3 uppercase tracking-wide">
                      Edition Year
                    </p>
                    <div className="space-y-2">
                      {[2025, 2024, 2023].map((year) => (
                        <div key={year} className="flex items-center">
                          <input
                            type="radio"
                            name="edition-mobile"
                            value={year}
                            checked={editionFilter === year.toString()}
                            onChange={(e) => setEditionFilter(e.target.value)}
                            className="hidden"
                            id={`edition-mobile-${year}`}
                          />
                          <label
                            htmlFor={`edition-mobile-${year}`}
                            className={`flex items-center cursor-pointer text-sm ${
                              editionFilter === year.toString()
                                ? "text-[#083776] font-medium"
                                : "text-[#083776]/80"
                            }`}
                          >
                            <span
                              className={`w-5 h-5 inline-block mr-3 rounded-full border flex-shrink-0 ${
                                editionFilter === year.toString()
                                  ? "border-[#616606] bg-[#616606]/10"
                                  : "border-[#083776]/40"
                              }`}
                            >
                              {editionFilter === year.toString() && (
                                <svg
                                  className="w-3 h-3 text-[#616606] mx-auto mt-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </span>
                            {year}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setLanguageFilter("");
                      setEditionFilter("");
                    }}
                    className="w-full py-3 bg-[#616606] text-white rounded-lg font-medium mb-4 hover:bg-[#083776] transition-colors"
                  >
                    Reset Filters
                  </button>

                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full py-3 border border-[#083776] text-[#083776] rounded-lg font-medium hover:bg-[#083776] hover:text-white transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Books Grid */}
            <main className="lg:col-span-9">
              {filteredBooks.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-sm border border-[#083776]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-[#083776]/30 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-[#083776] mb-2">
                    No books found
                  </h3>
                  <p className="text-[#083776]/70">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredBooks?.map((book) => (
                    <div
                      key={book?._id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col border border-[#083776]/10"
                    >
                      <Link href={`/book-detail/${book?._id}`}>
                        <div className="relative">
                          {/* Tag */}
                          {book?.tag && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#616606] to-[#083776] text-white text-xs px-3 py-1.5 rounded-full font-semibold z-10 shadow-md">
                              {book?.tag}
                            </div>
                          )}

                          {/* Book Image */}
                          <div className="relative w-full h-60 bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] flex items-center justify-center p-5">
                            <div className="w-32 h-44 relative shadow-lg rounded-md overflow-hidden">
                              <Image
                                src={book?.full_image?.[0]}
                                alt={book?.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>

                          {/* Book Info */}
                          <div className="p-4 flex-grow">
                            <p className="text-sm font-medium text-[#083776] line-clamp-2 mb-3 leading-tight min-h-[2.5rem]">
                              {book?.title}
                            </p>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-lg text-[#083776]">
                                ₹{book?.discount_price}
                              </span>
                              {book?.discount_price && book?.price && (
                                <span className="text-[#616606] text-sm font-medium bg-[#616606]/10 px-1.5 py-0.5 rounded">
                                  {Math.round(
                                    ((book.price - book.discount_price) /
                                      book.price) *
                                      100
                                  )}
                                  % off
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-[#083776]/60 line-through">
                              {book?.price ? `₹${book.price}` : ""}
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Add Button */}
                      <div className="p-4 pt-0 mt-auto">
                        <button
                          onClick={(e) => handleAdd(e, "book", book?._id)}
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-[#616606] to-[#083776] hover:from-[#083776] hover:to-[#616606] text-white font-medium py-2.5 rounded-lg text-sm transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                          <FaPlus className="mr-2 text-xs" />
                          {loading ? "ADDING..." : "ADD TO CART"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}