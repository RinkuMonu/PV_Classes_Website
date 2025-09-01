// "use client";
// import toast from "react-hot-toast";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { 
//   FaDownload, 
//   FaShareAlt, 
//   FaWhatsapp, 
//   FaFacebook
// } from "react-icons/fa";
// import axiosInstance from "../axios/axiosInstance";

// export default function notes() {
//   const [pyqs, setPyqs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [openId, setOpenId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const dropdownRef = useRef(null);

//   // Fetch Notes from backend
//   useEffect(() => {
//     const fetchPyqs = async () => {
//       try {
//         const response = await axiosInstance.get("/notes");
//         setPyqs(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPyqs();
//   }, []);

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenId(null);
//       }
//     }
//     if (openId) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openId]);

//   const toggleDropdown = (id) => {
//     setOpenId(openId === id ? null : id);
//   };

//   // Generate shareable links
//   const getShareLinks = (pyq) => {
//     const pdfUrl = `${window.location.origin}/${pyq.pdfUrl}`;
//     const text = encodeURIComponent(`Check out ${pyq.title}: ${pdfUrl}`);
//     return {
//       whatsapp: `https://wa.me/?text=${text}`,
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pdfUrl)}`
//     };
//   };

//   // Filter Notes based on search
//   const filteredPyqs = pyqs.filter(pyq =>
//     pyq.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       {/* Banner */}
//       <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
//         <div className="absolute inset-0 hidden sm:block">
//           <Image
//             src="/Image/Banner/pyq-banner.webp"
//             alt="Banner Desktop"
//             fill
//             className="object-cover object-center"
//             priority
//           />
//         </div>
//         <div className="absolute inset-0 block sm:hidden">
//           <Image
//             src="/Image/pv-mobile/pyq-banner-mob.webp"
//             alt="Banner Mobile"
//             fill
//             className="object-cover object-center"
//             priority
//           />
//         </div>
//       </section>

//       {/* Table Section */}
//       <div className="py-6 px-3 md:px-20 mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Notes</h1>

//           {/* Search */}
//           <div className="relative w-full sm:w-1/3">
//             <input
//               type="text"
//               placeholder="Search by title..."
//               className="w-full pl-10 pr-3 py-2 border border-[#00316B] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00316B] shadow-sm"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-[#00316B] absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110 4.5a7.5 7.5 0 016.65 12.15z"
//               />
//             </svg>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-10">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00316B] mx-auto"></div>
//             <p className="mt-3">Loading Notes...</p>
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4">
//             <p className="text-red-700">Error: {error}</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto rounded-lg border border-[#00316B] shadow-md">
//             <table className="w-full text-sm border-collapse">
//               <thead>
//                 <tr className="bg-[#00316B] text-white">
//                   <th className="p-3 font-medium text-left">Sr. No.</th>
//                   <th className="p-3 font-medium text-left">Title</th>
//                   <th className="p-3 font-medium text-left">Description</th>
//                   <th className="p-3 font-medium text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPyqs.length > 0 ? (
//                   filteredPyqs.map((pyq, idx) => {
//                     const shareLinks = getShareLinks(pyq);
//                     return (
//                       <tr
//                         key={pyq._id}
//                         className="transition hover:bg-blue-50 border-b border-gray-300 relative"
//                       >
//                         <td className="p-3">{idx + 1}</td>
//                         <td className="p-3 font-medium">{pyq.title}</td>
//                         <td className="p-3">{pyq.description}</td>
//                         <td className="p-3 flex justify-center gap-2 relative">
//                           {/* Share Button */}
//                           <button
//                             onClick={() => toggleDropdown(pyq._id)}
//                             className="p-2 inline-flex hover:bg-blue-100 rounded transition text-[#00316B] cursor-pointer"
//                           >
//                             <FaShareAlt className="mt-1 me-1" /> Share
//                           </button>
//                           {openId === pyq._id && (
//                             <div 
//                               ref={dropdownRef}
//                               className="absolute top-13 right-30 bg-white shadow-xl rounded-xl border w-48 z-50 overflow-hidden animate-fadeIn"
//                             >
//                               <a
//                                 href={shareLinks.whatsapp}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 p-3 hover:bg-green-50 transition-colors"
//                               >
//                                 <span className="p-2 bg-green-100 rounded-full">
//                                   <FaWhatsapp className="text-green-600" />
//                                 </span>
//                                 <span className="text-sm font-medium text-gray-700">WhatsApp</span>
//                               </a>
//                               <a
//                                 href={shareLinks.facebook}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors"
//                               >
//                                 <span className="p-2 bg-blue-100 rounded-full">
//                                   <FaFacebook className="text-blue-600" />
//                                 </span>
//                                 <span className="text-sm font-medium text-gray-700">Facebook</span>
//                               </a>
//                             </div>
//                           )}

//                           {/* Download Button */}
//                           <a
//                             href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${pyq.pdfUrl}`}
//                             target="blank"
//                             download
//                             className="p-2 inline-flex bg-[#00316B] text-white rounded hover:bg-blue-900 transition"
//                           >
//                             <FaDownload className="mt-1 me-1" /> Download
//                           </a>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="p-6 text-center">
//                       No matching notes found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }




"use client";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  FaDownload, 
  FaShareAlt, 
  FaWhatsapp, 
  FaFacebook,
  FaSearch,
  FaFilter,
  FaTimes,
  FaBook,
  FaClock
} from "react-icons/fa";
import axiosInstance from "../axios/axiosInstance";

export default function Notes() {
  const [pyqs, setPyqs] = useState([]);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [subjects, setSubjects] = useState([]);

  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  // Enhanced gradient colors with more variations
  const gradientColors = [
    "linear-gradient(135deg, #00316B 0%, #009FE3 100%)",
    "linear-gradient(135deg, #204972 0%, #0281AD 100%)",
    "linear-gradient(135deg, #788406 0%, #87B105 100%)",
    "linear-gradient(135deg, #616602 0%, #ABC129 100%)",
    "linear-gradient(135deg, #00316B 0%, #788406 100%)",
    "linear-gradient(135deg, #009FE3 0%, #ABC129 100%)",
    "linear-gradient(135deg, #0281AD 0%, #87B105 100%)",
    "linear-gradient(135deg, #204972 0%, #ABC129 100%)",
  ];

  // Fetch Notes from backend
  useEffect(() => {
    const fetchPyqs = async () => {
      try {
        const response = await axiosInstance.get("/notes");
        setPyqs(response.data);
        
        // Extract unique subjects from notes
        const uniqueSubjects = [...new Set(response.data.map(pyq => pyq.subject || "General"))];
        setSubjects(["All", ...uniqueSubjects]);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetchPyqs();
  }, []);

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenId(null);
      }
      if (filterRef.current && !filterRef.current.contains(event.target) && filterOpen) {
        setFilterOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openId, filterOpen]);

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Generate shareable links
  const getShareLinks = (pyq) => {
    const pdfUrl = `${window.location.origin}/${pyq.pdfUrl}`;
    const text = encodeURIComponent(`Check out ${pyq.title}: ${pdfUrl}`);
    return {
      whatsapp: `https://wa.me/?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pdfUrl)}`
    };
  };

  // Filter Notes based on search and subject
  const filteredPyqs = pyqs.filter(pyq => {
    const matchesSearch = pyq.title.toLowerCase().includes(search.toLowerCase()) ||
                         (pyq.description && pyq.description.toLowerCase().includes(search.toLowerCase()));
    const matchesSubject = selectedSubject === "All" || pyq.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  // Function to generate a random file size (for demo purposes)
  const getRandomFileSize = () => {
    const sizes = ["2.5 MB", "3.1 MB", "1.8 MB", "4.2 MB", "2.9 MB"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  // Function to generate a random date (for demo purposes)
  const getRandomDate = () => {
    const dates = ["Oct 12, 2023", "Sep 5, 2023", "Nov 20, 2023", "Aug 15, 2023"];
    return dates[Math.floor(Math.random() * dates.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner - Kept exactly as original */}
      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/pyq-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/pyq-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="py-6 px-3 md:px-20 mx-auto max-w-7xl">
        {/* Header with Title and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#00316B] mb-2">Study Notes</h1>
            <p className="text-gray-600">Access comprehensive study materials for your exam preparation</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-2/3 mt-4 md:mt-0">
            {/* Search */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-[#00316B]" />
              </div>
              <input
                type="text"
                placeholder="Search notes by title or description..."
                className="w-full pl-10 pr-4 py-3 border border-[#00316B]/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00316B] shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Button for Mobile */}
            <div className="block md:hidden">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 w-full justify-center px-4 py-3 bg-[#00316B] text-white rounded-full shadow-md hover:bg-[#009FE3] transition-colors"
              >
                <FaFilter className="text-sm" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

      


        {/* Notes Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00316B] mx-auto"></div>
            <p className="mt-3 text-[#00316B]">Loading Notes...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700">Error: {error}</p>
          </div>
        ) : filteredPyqs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPyqs.map((pyq, idx) => {
              const shareLinks = getShareLinks(pyq);
              const gradientStyle = gradientColors[idx % gradientColors.length];
              const fileSize = getRandomFileSize();
              const dateAdded = getRandomDate();
              
              return (
                <div key={pyq._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-gray-100">
                  {/* Card header with gradient */}
                  <div 
                    className="h-3"
                    style={{ background: gradientStyle }}
                  ></div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <span 
                        className="px-3 py-1.5 text-white text-xs font-medium rounded-full shadow-sm"
                        style={{ background: gradientStyle }}
                      >
                        {pyq.subject || "General"}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center">
                        <FaClock className="mr-1 text-xs" /> {dateAdded}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 text-[#00316B] line-clamp-2 leading-tight">{pyq.title}</h3>
                    <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">{pyq.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-xs text-gray-500 flex items-center">
                        <FaDownload className="mr-1" /> {fileSize}
                      </div>
                      <div className="text-xs text-gray-500">
                        PDF Format
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => toggleDropdown(pyq._id)}
                          className="flex items-center gap-1.5 text-[#00316B] hover:text-[#009FE3] transition-colors p-2 rounded-full text-sm"
                        >
                          <FaShareAlt className="text-sm" />
                          <span className="font-medium">Share</span>
                        </button>
                        
                        {openId === pyq._id && (
                          <div className="absolute left-0 bottom-full mb-2 bg-white shadow-xl rounded-xl border border-gray-200 w-44 z-10 overflow-hidden">
                            <a
                              href={shareLinks.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 hover:bg-green-50 transition-colors text-gray-700 border-b border-gray-100"
                            >
                              <span className="p-2 bg-green-100 rounded-full">
                                <FaWhatsapp className="text-green-600 text-sm" />
                              </span>
                              <span className="text-sm font-medium">WhatsApp</span>
                            </a>
                            <a
                              href={shareLinks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors text-gray-700"
                            >
                              <span className="p-2 bg-blue-100 rounded-full">
                                <FaFacebook className="text-blue-600 text-sm" />
                              </span>
                              <span className="text-sm font-medium">Facebook</span>
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <a
                        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${pyq.pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-[#00316B] to-[#009FE3] hover:from-[#009FE3] hover:to-[#00316B] text-white px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm font-medium"
                      >
                        <FaDownload className="text-xs" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#00316B] mb-2">No notes found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {search || selectedSubject !== "All" 
                ? "Try adjusting your search or filter to find what you're looking for." 
                : "It looks like there are no notes available at the moment."}
            </p>
            {(search || selectedSubject !== "All") && (
              <button 
                onClick={() => {
                  setSearch("");
                  setSelectedSubject("All");
                }}
                className="mt-4 px-4 py-2 bg-[#00316B] text-white rounded-full text-sm font-medium hover:bg-[#009FE3] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Filter Panel */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div ref={filterRef} className="absolute right-0 top-0 h-full w-3/4 bg-white p-5 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#00316B]">Filter Notes</h2>
              <button onClick={() => setFilterOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                <FaTimes className="text-[#00316B]" />
              </button>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-[#00316B]">By Subject</h3>
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setFilterOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${
                    selectedSubject === subject
                      ? "bg-gradient-to-r from-[#00316B] to-[#009FE3] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}