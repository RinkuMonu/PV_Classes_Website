// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";
// import { FaArrowRightLong } from "react-icons/fa6";

// export default function CoursesSection() {
//   const [activeTab, setActiveTab] = useState("All India Exams");

//   const tabs = [
//     "All India Exams",
//     "Rajasthan Exams",
//     "Uttar Pradesh Exams",
//     "Nursing Officer",
//     "Air Force",
//   ];

//   const courses = [
//     {
//       title: "GK & GS Brahmastra 3.0 Batch",
//       img: "/Image/book1.webp",
//       validity: "365 Days",
//       price: 399,
//       oldPrice: 2850,
//       discount: "86% OFF",
//     },
//     {
//       title: "Bihar (पुलिस सिपाही) 2025 Gaurav Batch",
//       img: "/Image/book2.webp",
//       validity: "365 Days",
//       price: 279,
//       oldPrice: 2790,
//       discount: "90% OFF",
//     },
//     {
//       title: "Railway Group D MCQs Batch (From Studio)",
//       img: "/Image/book3.webp",
//       validity: "180 Days",
//       price: 300,
//       oldPrice: 1200,
//       discount: "75% OFF",
//     },
//     {
//       title: "GK & GS Brahmastra 3.0 Batch",
//       img: "/Image/book1.webp",
//       validity: "365 Days",
//       price: 399,
//       oldPrice: 2850,
//       discount: "86% OFF",
//     },
//     {
//       title: "GK & GS Brahmastra 3.0 Batch",
//       img: "/Image/book1.webp",
//       validity: "365 Days",
//       price: 399,
//       oldPrice: 2850,
//       discount: "86% OFF",
//     },
//   ];

//   return (
//     <section className="p-20">
//       {/* Heading */}
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#204972]">
//         Select the Course that Fits Your Goals
//       </h2>

//       {/* Tabs */}
//       <div className="flex flex-wrap items-center gap-3 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-md border transition ${
//               activeTab === tab
//                 ? "bg-[#204972] text-white border-[#204972]"
//                 : "bg-white border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}

//         {/* Search */}
//         <div className="ml-auto relative">
//           <input
//             type="text"
//             placeholder="Search your course"
//             className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <span className="absolute left-3 top-2.5 text-gray-400 mt-1">
//           <FaSearch />
//           </span>
//         </div>
//       </div>

//       {/* Course Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
//         {courses.map((course, idx) => (
//           <div
//             key={idx}
//             className="bg-white border-[gray] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
//           >
//             <Image
//               src={course.img}
//               alt={course.title}
//               width={200}
//               height={150}
//               className="w-full h-60 object-scale-down"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
//               <p className="text-[#00316b] text-sm mb-2">
//                 Validity {course.validity}
//               </p>
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-bold">₹{course.price}/-</span>
//                 <span className="text-sm text-gray-500 line-through">
//                   ₹{course.oldPrice}
//                 </span>
//                 <span className="text-green-600 text-sm">
//                   ({course.discount})
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>


// <div className="flex float-end">
//  <Link
//           href="#"
//           className="bg-[#204972] text-white px-8 py-2 rounded-md"
//         >
//           See All <span className="ml-1">→</span>
//         </Link>
// </div>
//     </section>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";
// import axiosInstance from "../app/axios/axiosInstance";

// export default function CoursesSection() {
//   // State for categories and exams data
//   const [categories, setCategories] = useState([]);
//   const [examTypes, setExamTypes] = useState([]);
//   const [exams, setExams] = useState([]);
//   const [courses, setCourses] = useState([]); // NEW: courses state
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [activeExamType, setActiveExamType] = useState(null);
//   const [activeExam, setActiveExam] = useState(null); // NEW: selected exam
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch categories on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories");
//         setCategories(res?.data);
//         if (res?.data?.length > 0) {
//           setActiveCategory(res?.data?.[0]);
//         }
//       } catch (err) {
//         console.error("Error fetching categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch exam types when active category changes
//   useEffect(() => {
//     if (!activeCategory?._id) return;

//     const fetchExamTypes = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/exam-types/category/${activeCategory?._id}`
//         );
//         setExamTypes(res?.data);
//         if (res?.data?.length > 0) {
//           setActiveExamType(res?.data[0]);
//         }
//       } catch (err) {
//         console.error("Error fetching exam types", err);
//       }
//     };
//     fetchExamTypes();
//   }, [activeCategory]);

//   // Fetch exams when active exam type changes
//   useEffect(() => {
//     if (!activeExamType?._id) {
//       setExams([]);
//       return;
//     }

//     const fetchExams = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/exams/type/${activeExamType?._id}`
//         );
//         setExams(res?.data);
//         if (res?.data?.length > 0) {
//           setActiveExam(res?.data?.[0]); // default to first exam
//         }
//       } catch (err) {
//         console.error("Error fetching exams", err);
//       }
//     };
//     fetchExams();
//   }, [activeExamType]);

//   // Fetch courses when active exam changes
//   useEffect(() => {
//     if (!activeExam?._id) {
//       setCourses([]);
//       return;
//     }

//     const fetchCourses = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/courses?exam=${activeExam?._id}`
//         );
//         setCourses(res?.data);
//       } catch (err) {
//         console.error("Error fetching courses", err);
//       }
//     };
//     fetchCourses();
//   }, [activeExam]);

//   // Filter exams based on search term
//   const filteredExams = exams?.filter((exam) =>
//     exam?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <section className="p-4 md:p-8 lg:p-20">
//       {/* Heading */}
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#204972]">
//         Select the Course that Fits Your Goals
//       </h2>

//       {/* Category Selection */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {categories?.map((cat) => (
//           <button
//             key={cat?._id}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-4 py-2 rounded-md border transition ${
//               activeCategory?._id === cat?._id
//                 ? "bg-[#204972] text-white border-[#204972]"
//                 : "bg-white border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             {cat?.name}
//           </button>
//         ))}
//       </div>

//       {/* Tabs and Search */}
//       <div className="flex flex-wrap items-center gap-3 mb-6">
//         {/* Exam Type Tabs */}
//         <div className="flex flex-wrap gap-2">
//           {examTypes?.map((type) => (
//             <button
//               key={type?._id}
//               onClick={() => setActiveExamType(type)}
//               className={`px-4 py-2 rounded-md border transition ${
//                 activeExamType?._id === type?._id
//                   ? "bg-[#204972] text-white border-[#204972]"
//                   : "bg-white border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               {type?.name}
//             </button>
//           ))}
//         </div>

//         {/* Search */}
//         <div className="ml-auto relative">
//           <input
//             type="text"
//             placeholder="Search your course"
//             className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <FaSearch className="absolute left-3 top-3 text-gray-400" />
//         </div>
//       </div>

//       {/* Exam Selection */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {filteredExams?.map((exam) => (
//           <button
//             key={exam?._id}
//             onClick={() => setActiveExam(exam)}
//             className={`px-4 py-2 rounded-md border transition ${
//               activeExam?._id === exam?._id
//                 ? "bg-[#204972] text-white border-[#204972]"
//                 : "bg-white border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             {exam?.name}
//           </button>
//         ))}
//       </div>

//       {/* Course Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
//         {courses?.length > 0 ? (
//           courses.map((course) => (
//             <Link
//               href={`/courses/${course?.slug}`}
//               key={course?._id}
//               className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
//             >
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">
//                   {course?.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm line-clamp-2">
//                   {course?.overview}
//                 </p>
//                 <p className="mt-2 font-semibold text-[#204972]">
//                   {course?.isFree ? "Free" : `₹${course?.price}`}
//                 </p>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <div className="col-span-5 text-center py-10">
//             <p className="text-gray-500 text-lg">
//               No courses found for this exam
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaSearch, FaChevronRight, FaBook, FaGraduationCap, FaCertificate, FaArrowRight, FaFilter } from "react-icons/fa";
import Link from "next/link";
import axiosInstance from "../app/axios/axiosInstance";

export default function CoursesSection() {
  // State for categories, exam types, exams, and courses
  const [categories, setCategories] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeExamType, setActiveExamType] = useState(null);
  const [activeExam, setActiveExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res?.data || []);
        if (res?.data?.length > 0) {
          setActiveCategory(res.data[0]);
          setCurrentStep(1);
        }
      } catch (err) {
        console.error("Error fetching categories", err?.response?.data || err.message);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch exam types when active category changes
  useEffect(() => {
    if (!activeCategory?._id) return;

    const fetchExamTypes = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/exam-types/category/${activeCategory._id}`);
        setExamTypes(res?.data || []);
        if (res?.data?.length > 0) {
          setActiveExamType(res.data[0]);
          setCurrentStep(2);
        } else {
          setActiveExamType(null);
          setExams([]);
          setCourses([]);
          setCurrentStep(2);
        }
      } catch (err) {
        console.error("Error fetching exam types", err?.response?.data || err.message);
        setExamTypes([]);
        setActiveExamType(null);
        setExams([]);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExamTypes();
  }, [activeCategory]);

  // Fetch exams when active exam type changes
  useEffect(() => {
    if (!activeExamType?._id) {
      setExams([]);
      setActiveExam(null);
      setCourses([]);
      setCurrentStep(2);
      return;
    }

    const fetchExams = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/exams/type/${activeExamType._id}`);
        setExams(res?.data || []);
        if (res?.data?.length > 0) {
          setActiveExam(res.data[0]);
          setCurrentStep(3);
        } else {
          setActiveExam(null);
          setCourses([]);
          setCurrentStep(3);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          console.warn("No exams found for this type");
          setExams([]);
          setActiveExam(null);
          setCourses([]);
        } else {
          console.error("Error fetching exams", err?.response?.data || err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, [activeExamType]);

  // Fetch courses when active exam changes
  useEffect(() => {
    if (!activeExam?._id) {
      setCourses([]);
      return;
    }

    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/courses?exam=${activeExam._id}`);
        console.log("courses response:", res);
        setCourses(res?.data || []);
      } catch (err) {
        console.error("Error fetching courses", err?.response?.data || err.message);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [activeExam]);

  // Filter exams based on search term
  const filteredExams = exams?.filter((exam) =>
    exam?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("exam :", exams);

  return (
    <div className="min-h-screen bg-[#E6EEF5]  md:px-14 md:py-8">
      {/* Header Section */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Select the Course that Fits Your Goals
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover courses tailored to your goals through our intelligent selection system
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-18">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#204972] rounded-lg flex items-center justify-center">
                  <FaFilter className="text-white text-sm" />
                </div>
                <h2 className="text-xl font-bold text-[#204972]">Select Courses</h2>
              </div>

              {/* Categories Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaBook className="text-blue-500" />
                  <h3 className="font-semibold text-gray-900">Categories</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {categories.length}
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories?.map((cat) => (
                    <button
                      key={cat?._id}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentStep(2);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        activeCategory?._id === cat?._id
                          ? "bg-[#204972] text-white shadow-lg"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                      <div className="font-medium">{cat?.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam Types Section */}
              {activeCategory && examTypes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FaGraduationCap className="text-green-500" />
                    <h3 className="font-semibold text-gray-900">Exam Types</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {examTypes.length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {examTypes?.map((type) => (
                      <button
                        key={type?._id}
                        onClick={() => {
                          setActiveExamType(type);
                          setCurrentStep(3);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                          activeExamType?._id === type?._id
                            ? "bg-[#616602] text-white shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                          }`}
                      >
                        <div className="font-medium text-sm">{type?.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Section */}
              {activeExamType && exams.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaCertificate className="text-[#616602]" />
                    <h3 className="font-semibold text-gray-900">Search Exams</h3>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search exams..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-4 text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Breadcrumb */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Selection Path:</span>
                {activeCategory && (
                  <>
                    <span className="bg-[#E5ECF3] text-[#204972] px-3 py-1 rounded-full font-medium">
                      {activeCategory.name}
                    </span>
                    <FaChevronRight className="text-gray-400 text-xs" />
                  </>
                )}
                {activeExamType && (
                  <>
                    <span className="bg-[#F0F1DC] text-[#616606] px-3 py-1 rounded-full font-medium">
                      {activeExamType.name}
                    </span>
                    <FaChevronRight className="text-gray-400 text-xs" />
                  </>
                )}
                {activeExam && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                    {activeExam.name}
                  </span>
                )}
              </div>
            </div>

            {/* Exams Grid */}
            {activeExamType && filteredExams.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Available Exams</h3>
                  <span className="text-sm text-gray-500">
                    {filteredExams.length} exam{filteredExams.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExams?.map((exam) => (
                    <button
                      key={exam?._id}
                      onClick={() => setActiveExam(exam)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        activeExam?._id === exam?._id
                          ? "border-[#616602] bg-white shadow-lg"
                          : "border-gray-200 hover:border-{#F0F1DC} hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-gray-900">{exam?.name}</div>
                        {activeExam?._id === exam?._id && (
                          <div className="w-6 h-6 bg-[#616602] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {activeExam ? `Courses for ${activeExam.name}` : 'Available Courses'}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {courses.length} course{courses.length !== 1 ? 's' : ''} found
                  </span>
                  {isLoading && (
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>

              {courses?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Link
                      href={`/courses/${course?.slug}`}
                      key={course?._id}
                      className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* Course Image */}
                      {course?.images?.length > 0 && (
                        <div className="w-full h-48 overflow-hidden">
                          <img
                            src={`${course?.imagesFullPath[0]}`}
                            alt={course?.title || "Course Image"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        {/* Keep icon if no image */}
        {!course?.images?.length && (
          <div className="w-14 h-14 bg-[#E5ECF3] rounded-2xl flex items-center justify-center">
            <FaBook className="text-[#204972] text-xl" />
          </div>
        )}
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            course?.isFree
              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
              : "bg-[#E5ECF3] text-[#204972]"
          }`}
        >
          {course?.isFree ? "FREE" : "PREMIUM"}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2 group-hover:text-[#204972] transition-colors">
        {course?.title}
      </h3>
      <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
        {course?.overview}
      </p>

      <div className="flex justify-between items-center">
        <span className="font-bold text-xl text-gray-900">
          {course?.isFree ? "Free Access" : `₹${course?.price}`}
        </span>
        <div className="flex items-center gap-2 text-[#204972] font-medium group-hover:gap-3 transition-all">
          <span className="text-sm">Explore</span>
          <FaArrowRight className="text-xs" />
        </div>
      </div>
    </div>
  </Link>
))}

                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaBook className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">
                    {!activeExam ? "Select an exam to view courses" : "No courses available"}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {!activeExam
                      ? "Choose a category, exam type, and exam from the sidebar to discover relevant courses."
                      : "We couldn't find any courses for the selected exam. Try selecting a different exam or check back later."
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
