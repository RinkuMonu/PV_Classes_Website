

"use client";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  FaDownload, 
  FaShareAlt, 
  FaWhatsapp, 
  FaFacebook
} from "react-icons/fa";
import axiosInstance from "../axios/axiosInstance";

export default function PreviousYearPapers() {
  const [pyqs, setPyqs] = useState([]);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dropdownRef = useRef(null);

  // Fetch PYQs from backend
  useEffect(() => {
    const fetchPyqs = async () => {
      try {
        const response = await axiosInstance.get("/pyq");
        setPyqs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPyqs();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenId(null);
      }
    }
    if (openId) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openId]);

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Generate shareable links
  const getShareLinks = (pyq) => {
    const pdfUrl = `${window.location.origin}/${pyq.pdfUrl}`;
    const text = encodeURIComponent(`Check out ${pyq.exam} PYQ: ${pdfUrl}`);
    return {
      whatsapp: `https://wa.me/?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pdfUrl)}`
    };
  };

  // Filter PYQs based on search
  const filteredPyqs = pyqs.filter(pyq =>
    pyq.exam.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Banner */}
      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-8">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/pyq-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            // priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/pyq-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            // priority
          />
        </div>
      </section>

      {/* Table Section */}
      <div className="py-6 px-3 md:px-20 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Previous Year Papers</h1>

          {/* Search */}
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search by exam..."
              className="w-full pl-10 pr-3 py-2 border border-[#00316B] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00316B] shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#00316B] absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110 4.5a7.5 7.5 0 016.65 12.15z"
              />
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00316B] mx-auto"></div>
            <p className="mt-3">Loading PYQs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">Error: {error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[#00316B] shadow-md">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#00316B] text-white">
                  <th className="p-3 font-medium text-left">Sr. No.</th>
                  <th className="p-3 font-medium text-left">Exam</th>
                  <th className="p-3 font-medium text-left">Description</th>
                  <th className="p-3 font-medium text-left">Category</th>
                  <th className="p-3 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPyqs.length > 0 ? (
                  filteredPyqs.map((pyq, idx) => {
                    const shareLinks = getShareLinks(pyq);
                    return (
                      <tr
                        key={pyq._id}
                        className="transition hover:bg-blue-50 border-b border-gray-300 relative"
                      >
                        <td className="p-3">{idx + 1}</td>
                        <td className="p-3 font-medium">{pyq.exam}</td>
                        <td className="p-3">{pyq.description}</td>
                        <td className="p-3">{pyq.category}</td>
                        <td className="p-3 flex justify-center gap-2 relative">
                          {/* Share Button */}
                          <button
                            onClick={() => toggleDropdown(pyq._id)}
                            className="p-2 inline-flex hover:bg-blue-100 rounded transition text-[#00316B] cursor-pointer"
                          >
                            <FaShareAlt className="mt-1 me-1" /> Share
                          </button>
                          {openId === pyq._id && (
                            <div 
                              ref={dropdownRef}
                              className="absolute top-13 right-30 bg-white shadow-xl rounded-xl border w-48 z-50 overflow-hidden animate-fadeIn"
                            >
                              <a
                                href={shareLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 hover:bg-green-50 transition-colors"
                              >
                                <span className="p-2 bg-green-100 rounded-full">
                                  <FaWhatsapp className="text-green-600" />
                                </span>
                                <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                              </a>
                              <a
                                href={shareLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors"
                              >
                                <span className="p-2 bg-blue-100 rounded-full">
                                  <FaFacebook className="text-blue-600" />
                                </span>
                                <span className="text-sm font-medium text-gray-700">Facebook</span>
                              </a>
                            </div>
                          )}

                          {/* Download Button */}
                          <a
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${pyq.pdfUrl}`}
                            target="blank"
                            download
                            className="p-2 inline-flex bg-[#00316B] text-white rounded hover:bg-blue-900 transition"
                          >
                            <FaDownload className="mt-1 me-1" /> Download
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center">
                      No matching exams found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
