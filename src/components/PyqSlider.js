
// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import axiosInstance from "../app/axios/axiosInstance";
// import { FaDownload, FaShareAlt } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// export default function PyqSlider() {
//     const [pyqs, setPyqs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPyqs = async () => {
//             try {
//                 const response = await axiosInstance.get("/pyq");
//                 setPyqs(response.data);
//             } catch (err) {
//                 console.error("Error fetching PYQs:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPyqs();
//     }, []);

//     const handleDownload = (pdfUrl, examName) => {
//         const link = document.createElement('a');
//         link.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pdfUrl}`;
//         link.setAttribute('download', `${examName.replace(/\s+/g, '_')}.pdf`);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const handleShare = async (pyq) => {
//         if (navigator.share) {
//             try {
//                 await navigator.share({
//                     title: pyq.exam,
//                     text: pyq.description,
//                     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pyq.pdfUrl}`,
//                 });
//             } catch (err) {
//                 console.error('Error sharing:', err);
//             }
//         } else {
//             // Fallback for browsers that don't support Web Share API
//             navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${pyq.pdfUrl}`);
//             alert('Link copied to clipboard!');
//         }
//     };

//     if (loading) {
//         return (
//             <div className="text-center py-10">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00316B] mx-auto"></div>
//                 <p className="mt-3">Loading PYQs...</p>
//             </div>
//         );
//     }

//     return (
//         <section className="py-8 px-4 md:px-20">

    

//                 <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#009FE3]/20">
//                             <div>
//                                 <h2 className="text-3xl font-bold text-[#00316B] mb-2"> Previous <span className="text-[#616606]">Year</span> Papers</h2>
//                                 <div className="w-16 h-1 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
//                             </div>
//                         </div>

//             <Swiper
//                 modules={[Autoplay, Pagination, Navigation]}
//                 spaceBetween={20}
//                 slidesPerView={1}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 pagination={{
//                     clickable: true,
//                     el: '.pyq-pagination',
//                     bulletClass: 'swiper-pagination-bullet',
//                     bulletActiveClass: 'swiper-pagination-bullet-active'
//                 }}
//                 navigation={{
//                     nextEl: '.pyq-next',
//                     prevEl: '.pyq-prev',
//                 }}
//                 breakpoints={{
//                     640: { slidesPerView: 1 },
//                     768: { slidesPerView: 2 },
//                     1024: { slidesPerView: 3 },
//                 }}
//                 style={{ paddingBottom: '50px' }}
//             >
//                 {pyqs.map((pyq, idx) => (
//                     <SwiperSlide key={pyq._id || idx}>
//                         <div className="relative border rounded-xl shadow-md p-5 bg-white flex flex-col justify-between h-full transition-transform duration-300 hover:shadow-lg">
//                             {/* Exam Name */}
//                             <h3 className="text-lg font-semibold text-[#00316B] mb-2">
//                                 {pyq.exam}
//                             </h3>

//                             {/* Description */}
//                             <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">
//                                 {pyq.description || "No description available."}
//                             </p>

//                             {/* Category */}
//                             <span className="inline-block text-xs bg-blue-100 text-[#00316B] px-3 py-1 rounded-full mb-4">
//                                 {pyq.category || "General"}
//                             </span>

//                             {/* Actions */}
//                             <div className="flex justify-between items-center mt-4">
//                                 <button
//                                     onClick={() => handleDownload(pyq.pdfUrl, pyq.exam)}
//                                     className="flex items-center gap-2 text-white bg-green-800 px-3 py-2 rounded hover:bg-green-900 transition z-10 relative"
//                                 >
//                                     <FaDownload /> Download
//                                 </button>
//                                 <button
//                                     onClick={() => handleShare(pyq)}
//                                     className="flex items-center gap-2 text-[#00316B] hover:text-blue-700 transition z-10 relative"
//                                 >
//                                     <FaShareAlt /> Share
//                                 </button>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>

//             {/* Custom pagination */}
//             <div className="pyq-pagination flex justify-center mt-4 space-x-2" style={{ position: 'relative', zIndex: 10 }} />

        
//         </section>
//     );
// }




"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axiosInstance from "../app/axios/axiosInstance";
import { FaDownload, FaShareAlt, FaFilePdf } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function PyqSlider() {
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPyqs = async () => {
            try {
                const response = await axiosInstance.get("/pyq");
                setPyqs(response?.data || []);
            } catch (err) {
                console.error("Error fetching PYQs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPyqs();
    }, []);

    const handleDownload = (pdfUrl, examName) => {
        if (!pdfUrl) return;
        const link = document.createElement("a");
        link.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pdfUrl}`;
        link.setAttribute("download", `${examName?.replace(/\s+/g, "_") || "PYQ"}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async (pyq) => {
        const pdfUrl = pyq?.pdfUrl
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pyq?.pdfUrl}`
            : "";

        if (navigator?.share) {
            try {
                await navigator?.share({
                    title: pyq?.exam || "PYQ",
                    text: pyq?.description || "",
                    url: pdfUrl,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            if (pdfUrl) {
                navigator?.clipboard?.writeText(pdfUrl);
                alert("Link copied to clipboard!");
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00316B] mx-auto"></div>
                <p className="mt-3">Loading PYQs...</p>
            </div>
        );
    }

    return (
        <section className="py-20 px-4 md:px-12 lg:px-20 bg-[#204972]/20 relative overflow-hidden">
    {/* Decorative Circles */}
    <span className="absolute top-15 left-5 w-20 h-20 bg-[#204972] rounded-full opacity-10 z-0"></span>
    <span className="absolute bottom-20 right-10 w-32 h-32 bg-[#204972] rounded-full opacity-10 z-0"></span>
    <span className="absolute top-3 left-5 w-12 h-12 bg-[#204972] rounded-full opacity-10 z-0"></span>
    <span className="absolute bottom-10 right-1 w-16 h-16 bg-[#204972] rounded-full opacity-10 z-0"></span>

    {/* Section content */}
  <div className="mb-12 text-center">
  <span className="inline-block px-4 py-1.5 bg-[#204972]/10 text-[#204972] text-sm font-medium rounded-md mb-4">
    Resource Library
  </span>

  <h2 className="text-4xl font-bold text-gray-900">
    Previous Year Papers
  </h2>

  <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
    Download solved and unsolved previous year question papers to strengthen your exam preparation.
  </p>
</div>

    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{
        clickable: true,
        el: ".pyq-pagination",
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
      }}
      navigation={{
        nextEl: ".pyq-next",
        prevEl: ".pyq-prev",
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      style={{ paddingBottom: "50px" }}
      className="relative z-10"
    >
      {pyqs?.map((pyq, idx) => (
        <SwiperSlide key={pyq?._id || idx}>
        <div className="h-[20vh] min-h-[320px]  bg-white border border-gray-200 rounded-lg p-6 flex flex-col transition-all duration-300 hover:border-[#204972]/20 hover:shadow-xl hover:-translate-y-1">

  {/* Icon */}
  <div className="w-12 h-12 rounded-lg bg-[#204972]/10 flex items-center justify-center mb-4">
    <FaFilePdf className="text-[#204972] text-xl" />
  </div>

  {/* Category */}
  <span className="inline-flex w-fit px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md mb-3">
    {pyq?.category || "General"}
  </span>

  {/* Title */}
<h3 className="text-xl font-semibold text-gray-900 leading-7 mb-3 line-clamp-2 min-h-[56px]">
  {pyq?.exam || "Unnamed Exam"}
</h3>

  {/* Description */}
<p className="text-gray-600 text-sm leading-6 line-clamp-3 min-h-[72px]">
  {pyq?.description || "No description available."}
</p>

  {/* Footer */}
 <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">

    <button
      onClick={() => handleDownload(pyq?.pdfUrl, pyq?.exam)}
      className="inline-flex items-center gap-2 text-sm font-medium text-[#204972] hover:text-[#163452] transition"
    >
      <FaDownload />
      Download PDF
    </button>

    <button
      onClick={() => handleShare(pyq)}
      className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#204972] transition"
    >
      <FaShareAlt />
      Share
    </button>

  </div>
</div>
        </SwiperSlide>
      ))}
    </Swiper>
 <div
      className="pyq-pagination flex justify-center mt-4 space-x-2 relative z-10"
    />
  </section>
);
}
