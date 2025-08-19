"use client";
import toast from "react-hot-toast";

import { Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Share2, FileText, Edit3, ChevronRight, BookOpen, Video, File, Download } from "lucide-react";
import { FaFacebook, FaShareAlt, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useCart } from "../../../components/context/CartContext";
import { FaPlus } from "react-icons/fa6";

// // ---------- Right sticky sidebar ----------
// const SidebarCard = () => {
//   return (
//     <div className="sticky top-10  pt-10 pb-20 px-2 w-full h-fit bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden transition-all hover:shadow-xl">
//       {/* Image with tag */}
//       <div className="relative h-56">
//         <Image
//           src="/test1.webp"
//           alt="Course Image"
//           fill
//           className="object-cover rounded"
//         />
//         <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
//           Test Series
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-lg font-bold text-gray-800">
//               AE/JE Civil Free Test Papers
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">By Pv Classes</p>
//           </div>
//           <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
//             <span className="text-xs text-[#00316B] font-semibold">NEW</span>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 text-sm mt-4">
//           <span className="text-gray-600 flex items-center">
//             <span className="text-gray-500 mr-1">Code:</span>
//             <span className="text-[#00316B] font-semibold">16468</span>
//           </span>
//           <span className="text-gray-600 flex items-center">
//             <span className="text-gray-500 mr-1">Validity:</span>
//             <span className="text-[#00316B] font-semibold">185 Days</span>
//           </span>
//         </div>

//         <hr className="my-4 border-gray-100" />

//         <div className="flex items-center justify-between mb-4">
//           <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
//             Free for Students
//           </span>
//           <span className="text-xs text-gray-500">🔥 500+ students enrolled</span>
//         </div>

//         <button className="w-full bg-[#00316B] text-white font-semibold py-3 rounded-lg hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0">
//           Add to Library
//         </button>

//         <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 hover:text-[#00316B] cursor-pointer transition">
//           <Share2 size={16} className="text-blue-500" />
//           <span className="text-sm font-medium">Share Course</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function CourseBody() {
//   const [openIndex, setOpenIndex] = useState(null); // store the open row index
//   const toggleDropdown = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };
//   const [openseriesIndex, setopenseriesIndex] = useState(null); // store the open row index
//   const toggleseriesDropdown = (index) => {
//     setopenseriesIndex(openseriesIndex === index ? null : index);
//   };
//   const books = [
//   {
//     id: 1,
//     img: "/book1.webp",
//     title: "Reasoning Chalisa/Reasoning Book for All Competitive Exams",
//     price: "₹2280",
//     link: "#",
//   },
//   {
//     id: 2,
//     img: "/book2.webp",
//     title: "General Knowledge Book 2025 Edition",
//     price: "₹1800",
//     link: "#",
//   },
//   {
//     id: 3,
//     img: "/book3.webp",
//     title: "Mathematics Quick Revision Notes",
//     price: "₹1450",
//     link: "#",
//   },
// ];
//   const combos = [
//     {
//       img: "/combo1.webp",
//       title: "SSC-JE & RRB-JE Electrical Hinglish Combo Recorded Batch",
//       details: "4 Video, 5: Pat. I Concept",
//       saveText: "Save ₹500",
//     },
//     {
//       img: "/combo2.webp",
//       title: "SSC-JE Civil + Mechanical Recorded Batch",
//       details: "6 Video, 8: Pat. II Concept",
//       saveText: "Save ₹700",
//     },
//     {
//       img: "/combo3.webp",
//       title: "RRB-JE Complete Hinglish Recorded Batch",
//       details: "5 Video, 6: Full Concept",
//       saveText: "Save ₹600",
//     },
//   ];

//   const offerings = [
//     { icon: <Check className="text-green-500" />, text: "Recorded Lectures" },
//     { icon: <Check className="text-green-500" />, text: "Class Panel PDF" },
//     { icon: <Check className="text-green-500" />, text: "DPP" },
//     { icon: <Check className="text-green-500" />, text: "Downloadable Lectures" },
//     { icon: <Check className="text-green-500" />, text: "Online Study Material" },
//     { icon: <Check className="text-green-500" />, text: "24/7 Support" },
//     { icon: <Check className="text-green-500" />, text: "Practice Tests" },
//     { icon: <Check className="text-green-500" />, text: "Certificate" },
//   ];
//   const tabs = [
//     { id: "course-offerings", label: "Course Offerings", icon: <BookOpen size={16} /> },
//     { id: "add-on", label: "Add On", icon: <File size={16} /> },
//     { id: "combo", label: "Combo", icon: <Video size={16} /> },
//     { id: "free-content", label: "Free Content", icon: <Download size={16} /> },
//   ];

//   const [activeTab, setActiveTab] = useState(tabs[0].id);

//   return (
//     <section className="relative z-10 pt-10 md:pt-6">
//       {/* Gradient Background */}
//       <div className="-z-10 pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-gradient-to-b from-[#0f0f13] to-[#1a1a24]" />

//       <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_360px]">
//         {/* LEFT */}
//         <div>
//           <main>
//             <section className="text-white mb-12">
//               <div className="max-w-3xl px-4 mb-10 py-8 md:py-12">
//                 <nav className="text-xs md:text-sm text-neutral-300">
//                   <ol className="flex flex-wrap items-center gap-2">
//                     <li>
//                       <Link href="/" className="hover:text-white transition">
//                         Home
//                       </Link>
//                     </li>
//                     <li>›</li>
//                     <li>
//                       <Link href="/courses" className="hover:text-white transition">
//                         Courses
//                       </Link>
//                     </li>
//                     <li>›</li>
//                     <li>
//                       <span className="text-white">
//                         GK & GS Shiv Shakti Batch By Kumar Gaurav Sir
//                       </span>
//                     </li>
//                   </ol>
//                 </nav>

//                 <h1 className="mt-4 text-3xl leading-tight font-extrabold md:text-[44px] md:leading-[1.15] bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                   The Complete AI Guide: Learn ChatGPT,
//                   <br className="hidden md:block" />
//                   Generative AI &amp; More
//                 </h1>

//                 <p className="mt-4 max-w-4xl text-neutral-300 text-base md:text-lg">
//                   50+ Generative AI Tools to 10x Business, Productivity, Creativity | ChatGPT, Artificial Intelligence, Prompt Engineering
//                 </p>

//                 <div className="mt-5 flex flex-wrap items-center gap-3">
//                   <span className="rounded-md bg-green-700/30 text-green-300 px-3 py-1.5 text-xs font-semibold border border-green-500/20">
//                     Code: 20575
//                   </span>
//                   <span className="rounded-md bg-blue-500/30 text-blue-300 px-3 py-1.5 text-xs font-semibold border border-blue-500/20">
//                     Validity: 200 Days
//                   </span>
//                   <span className="rounded-md bg-purple-500/30 text-purple-300 px-3 py-1.5 text-xs font-semibold border border-purple-500/20">
//                     4.8 ★ (1.2K Reviews)
//                   </span>
//                 </div>
//               </div>
//             </section>
//           </main>

//           {/* Tabs */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
//             <div className="flex">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex-1 py-4 text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === tab.id
//                       ? "bg-[#00316B] text-white shadow-md"
//                       : "text-gray-600 hover:bg-gray-50"
//                     }`}
//                 >
//                   {tab.icon}
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             {activeTab === "course-offerings" && (
//               <div className="grid grid-cols-2 gap-4">
//                 {offerings.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
//                   >
//                     {item.icon}
//                     <span>{item.text}</span>
//                   </div>
//                 ))}
//               </div>

//             )}

//             {activeTab === "add-on" && (
//               <div>
//                 <h3 className="font-bold text-lg mb-4 text-gray-800">Discover More Books</h3>
//            <div className="space-y-4">
//       {books.map((book) => (
//         <div
//           key={book.id}
//           className="flex gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
//         >
//           <img
//             src={book.img}
//             alt={book.title}
//             className="w-20 h-28 object-cover rounded-lg shadow-sm border border-gray-200"
//           />
//           <div className="flex-1">
//             <h4 className="font-bold text-gray-800">{book.title}</h4>
//             <p
//               className="text-[#00316B] cursor-pointer text-sm mt-2 flex items-center hover:underline"
//               onClick={() => window.location.href = book.link}
//             >
//               View Details <ChevronRight size={16} className="ml-1" />
//             </p>
//             <div className="mt-3 flex items-center justify-between">
//               <span className="text-sm text-gray-600">{book.price}</span>
//               <button className="bg-blue-50 text-[#00316B] px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//               </div>
//             )}

//             {activeTab === "combo" && (
//               <div>
//                 <h3 className="font-bold text-lg mb-4 text-gray-800">Recommended Combos</h3>
//                 <div className="grid gap-4">
//                   {combos.map((combo, index) => (
//                     <div
//                       key={index}
//                       className="flex gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
//                     >
//                       <img
//                         src={combo.img}
//                         alt={combo.title}
//                         className="w-20 h-28 object-cover rounded-lg shadow-sm border border-gray-200"
//                       />
//                       <div className="flex-1">
//                         <h4 className="font-bold text-gray-800">{combo.title}</h4>
//                         <p className="text-sm text-gray-600 mt-1">{combo.details}</p>
//                         <div className="mt-3 flex items-center justify-between">
//                           <span className="text-sm font-bold text-green-600">{combo.saveText}</span>
//                           <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:shadow-md transition">
//                             Unlock Now
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "free-content" && (
//               <div>
//                 {/* PDFs */}
//                 <div className="mb-8">
//                   <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
//                     <FileText className="text-blue-500" size={18} /> Free PDFs
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {[
//                       { title: "Test Schedule", type: "PDF", icon: <FileText className="text-purple-500" size={20} /> },
//                       { title: "Syllabus Guide", type: "PDF", icon: <FileText className="text-blue-500" size={20} /> },
//                       { title: "Formula Sheet", type: "PDF", icon: <FileText className="text-green-500" size={20} /> },
//                       { title: "Previous Papers", type: "PDF", icon: <FileText className="text-red-500" size={20} /> }
//                     ].map((item, index) => (
//                       <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition group">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
//                             {item.icon}
//                           </div>
//                           <div>
//                             <h4 className="font-medium text-gray-800">{item.title}</h4>
//                             <span className="text-xs text-gray-500">{item.type}</span>
//                           </div>
//                         </div>
//                         <div className="flex gap-2 relative">
//                           <button className="flex-1 border border-gray-200  rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition">
//                             Download
//                           </button>
//                           <button
//                             onClick={() => toggleDropdown(index)}
//                             className="p-2 inline-flex hover:bg-blue-100 rounded transition text-[#00316B] "
//                           >
//                             <FaShareAlt className="mt-1 me-1" /> Share
//                           </button>
//                           {openIndex === index && (
//                             <div className="absolute top-12 -right-10 bg-white shadow-2xl rounded-xl  w-48 z-50 overflow-hidden animate-fadeIn">
//                               <a
//                                 href="https://wa.me/?text=Check%20this%20out:%20YOUR_URL"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 p-3 hover:bg-green-50 transition-colors"
//                               >
//                                 <span className="px-2 py-1 bg-green-100 rounded-full">
//                                   <FaWhatsapp className="text-green-600" />
//                                 </span>
//                                 <span className="text-sm font-medium text-gray-700">WhatsApp</span>
//                               </a>

//                               <a
//                                 href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors"
//                               >
//                                 <span className="px-2 py-1 bg-blue-100 rounded-full">
//                                   <FaFacebook className="text-blue-600" />
//                                 </span>
//                                 <span className="text-sm font-medium text-gray-700">Facebook</span>
//                               </a>
//                               <a
//                                 href="https://twitter.com/intent/tweet?url=YOUR_URL&text=Check%20this%20out!"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 p-3 hover:bg-sky-50 transition-colors"
//                               >
//                                 <span className="px-2 py-1 bg-sky-100 rounded-full">
//                                   <FaTwitter className="text-sky-500" />
//                                 </span>
//                                 <span className="text-sm font-medium text-gray-700">Twitter / X</span>
//                               </a>
//                             </div>

//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Test Series */}
//                 <div>
//                   <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
//                     <Edit3 className="text-green-500" size={18} /> Free Test Series
//                   </h3>
//                   <div className="grid grid-cols-1 gap-4">
//                     {[
//                       { title: "Test-1 || BMC || 16-February", attempts: "1.2K attempts" },
//                       { title: "Test-2 || Geometry || 23-February", attempts: "890 attempts" },
//                       { title: "Test-3 || Algebra || 2-March", attempts: "Coming Soon" }
//                     ].map((item, index) => (
//                       <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
//                             <Edit3 className="text-green-500" size={20} />
//                           </div>
//                           <div className="flex-1">
//                             <h4 className="font-medium text-gray-800">{item.title}</h4>
//                             <span className="text-xs text-gray-500">{item.attempts}</span>
//                           </div>
//                         </div>
//                         <div className="flex gap-2 relative">
//                           <button className={`flex-1 border rounded-lg px-3 py-1.5 text-sm font-medium ${item.attempts === "Coming Soon"
//                               ? "border-gray-200 text-gray-400 cursor-not-allowed"
//                               : "border-green-200 text-green-600 hover:bg-green-50"
//                             }`}>
//                             {item.attempts === "Coming Soon" ? "Coming Soon" : "Attempt Now"}
//                           </button>
//                           <button
//                             onClick={() => toggleseriesDropdown(index)}
//                             className="p-2 inline-flex hover:bg-blue-100 rounded transition text-[#00316B] "
//                           >
//                             <FaShareAlt className="mt-1 me-1" /> Share
//                           </button>
//                           {openseriesIndex === index && (
//                             <div className="absolute top-12 -right-10 bg-white shadow-2xl rounded-xl  w-48 z-50 overflow-hidden animate-fadeIn">
//                               <a
//                                 href="https://wa.me/?text=Check%20this%20out:%20YOUR_URL"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 p-3 hover:bg-green-50 transition-colors"
//                               >
//                                 <span className="px-2 py-1 bg-green-100 rounded-full">
//                                   <FaWhatsapp className="text-green-600" />
//                                 </span>
//                                 <span className="text-sm font-medium text-gray-700">WhatsApp</span>
//                               </a>

//                               <a
//                                 href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors"
//                               >
//                                 <span className="px-2 py-1 bg-blue-100 rounded-full">
//                                   <FaFacebook className="text-blue-600" />
//                                 </span>
//                                 <span className="text-sm font-medium text-gray-700">Facebook</span>
//                               </a>
//                               <a
//                                 href="https://twitter.com/intent/tweet?url=YOUR_URL&text=Check%20this%20out!"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center gap-3 p-3 hover:bg-sky-50 transition-colors"
//                               >
//                                 <span className="px-2 py-1 bg-sky-100 rounded-full">
//                                   <FaTwitter className="text-sky-500" />
//                                 </span>
//                                 <span className="text-sm font-medium text-gray-700">Twitter / X</span>
//                               </a>
//                             </div>

//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT sticky */}
//         <SidebarCard />
//       </div>
//     </section>
//   );
// }





"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../axios/axiosInstance";
import Image from "next/image";
import { Share2, Star } from "lucide-react";

// Sidebar Card
const SidebarCard = ({ series }) => {
  return (
    <div className="sticky top-10 pt-10 pb-20 px-2 w-full h-fit bg-white rounded-2xl border border-gray-100 shadow-lg">
      {/* Image with tag */}
      <div className="relative h-56">
        <Image
          src={`http://localhost:5000/uploads/testSeries/${series?.images?.[0]}`}
          alt={series?.title}
          fill
          className="object-cover rounded"
        />
        <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Test Series
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800">{series?.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{series?.exam_id?.name}</p>

        <div className="flex items-center gap-4 text-sm mt-4">
          <span className="text-gray-600">Validity: {series?.validity}</span>
          <span className="text-gray-600">Tests: {series?.total_tests}</span>
        </div>

        <hr className="my-4 border-gray-100" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
            ₹{series?.discount_price} (Discounted)
          </span>
          <span className="text-xs text-gray-500 line-through">₹{series?.price}</span>
        </div>

        <button className="w-full bg-[#00316B] text-white font-semibold py-3 rounded-lg">
          Add to Library
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 cursor-pointer">
          <Share2 size={16} className="text-blue-500" />
          <span className="text-sm font-medium">Share Course</span>
        </div>
      </div>
    </div>
  );
};

// Main Page
export default function TestSeriesDetails() {
  const { slug } = useParams();
  const [series, setSeries] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(`/test-series/${slug}`);
        if (res.data.success) {
          setSeries(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, [slug]);

  if (!series) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="relative z-10 pt-10 md:pt-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 rounded-2xl max-w-[1160px] mx-auto mb-8">
        <h1 className="text-3xl font-bold">{series.title}</h1>
        <p className="text-lg mt-2">{series.exam_id?.name}</p>
        <div className="mt-3 flex items-center gap-4">
          <span>📚 {series.total_tests} Tests</span>
          <span>⏳ Validity: {series.validity}</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* LEFT */}
        <div>
          {/* Overview */}
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-600 mb-6">{series.description}</p>

          {/* Subjects */}
          <h3 className="text-xl font-semibold mb-2">Subjects</h3>
          <ul className="list-disc ml-6 mb-6">
            {series.subjects.map((sub) => (
              <li key={sub._id}>
                {sub.name} - {sub.test_count} tests
              </li>
            ))}
          </ul>

          {/* Syllabus / Tests */}
          <h3 className="text-xl font-semibold mb-2">Syllabus & Tests</h3>
          <div className="space-y-3 mb-6">
            {series.tests?.map((test) => (
              <div
                key={test._id}
                className="border p-3 rounded-lg flex justify-between items-center"
              >
                <span className="font-medium">{test.title}</span>
                <span className="text-sm text-gray-500">
                  {test.questions_count} Questions
                </span>
              </div>
            ))}
          </div>

          {/* FAQs */}
          {series.faqs?.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-2">FAQs</h3>
              <div className="space-y-3 mb-6">
                {series.faqs.map((faq, i) => (
                  <div key={i} className="border p-4 rounded-lg">
                    <p className="font-semibold">{faq.question}</p>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}

            )}

            {activeTab === "add-on" && (
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-800">Discover More Books</h3>
                <div className="space-y-4">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="flex gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                    >
                      <img
                        src={book.img}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-sm border border-gray-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{book.title}</h4>
                        <p
                          className="text-[#00316B] cursor-pointer text-sm mt-2 flex items-center hover:underline"
                          onClick={() => window.location.href = book.link}
                        >
                          View Details <ChevronRight size={16} className="ml-1" />
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-gray-600">{book.price}</span>
                          <button className="bg-blue-50 text-[#00316B] px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "combo" && (
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-800">Recommended Combos</h3>
                <div className="grid gap-4">
                  {combos.map((combo, index) => (
                    <div
                      key={index}
                      className="flex gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                    >
                      <img
                        src={combo.img}
                        alt={combo.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-sm border border-gray-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{combo.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{combo.details}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-bold text-green-600">{combo.saveText}</span>
                          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:shadow-md transition">
                            Unlock Now
                          </button>
                        </div>
                      </div>
                        {series.reviews?.length > 0 && (
                          <>
                            <h3 className="text-xl font-semibold mb-2">Student Reviews</h3>
                            <div className="space-y-4">
                              {series.reviews.map((rev, i) => (
                                <div
                                  key={i}
                                  className="border p-4 rounded-lg flex flex-col gap-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <Star className="text-yellow-500" size={16} />
                                    <span className="font-medium">{rev.user}</span>
                                  </div>
                                  <p className="text-gray-600">{rev.comment}</p>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                    </div>

        {/* RIGHT */}
        <SidebarCard series={series} />
      </div>
    </section>
  );
}
