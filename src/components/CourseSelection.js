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
import { FaSearch, FaChevronRight } from "react-icons/fa";
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
  const [currentStep, setCurrentStep] = useState(1); // New state for multi-step UI

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
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
      }
    };
    fetchCategories();
  }, []);

  // Fetch exam types when active category changes
  useEffect(() => {
    if (!activeCategory?._id) return;

    const fetchExamTypes = async () => {
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
      try {
        const res = await axiosInstance.get(`/courses?exam=${activeExam._id}`);
        setCourses(res?.data || []);
      } catch (err) {
        console.error("Error fetching courses", err?.response?.data || err.message);
        setCourses([]);
      }
    };
    fetchCourses();
  }, [activeExam]);

  // Filter exams based on search term
  const filteredExams = exams?.filter((exam) =>
    exam?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Step navigation handler
  const handleStepNavigation = (step) => {
    if (step === 1) return;
    if (step === 2 && activeCategory) setCurrentStep(2);
    if (step === 3 && activeExamType) setCurrentStep(3);
  };

  return (
    <section className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#204972] to-[#3a7bd5] bg-clip-text text-transparent">
          Select the Course that Fits Your Goals
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Follow the steps below to find the perfect course for your exam preparation
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
        
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center z-10">
            <button
              onClick={() => handleStepNavigation(step)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all ${
                currentStep >= step 
                  ? "bg-[#204972] scale-110" 
                  : "bg-gray-400"
              }`}
            >
              {step}
            </button>
            <span className="mt-2 text-sm font-medium text-gray-700 capitalize">
              {step === 1 && "Category"}
              {step === 2 && "Exam Type"}
              {step === 3 && "Exam"}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Category Selection */}
      {currentStep >= 1 && (
        <div className={`mb-10 transition-opacity ${currentStep === 1 ? "opacity-100" : "opacity-60"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#204972] flex items-center">
              {currentStep > 1 && (
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="mr-2 text-gray-500 hover:text-[#204972] transition"
                >
                  <FaChevronRight className="rotate-180" />
                </button>
              )}
              Select a Category
            </h3>
            {currentStep === 1 && (
              <p className="text-sm text-gray-500">{categories.length} options</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories?.map((cat) => (
              <button
                key={cat?._id}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentStep(2);
                }}
                className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center ${
                  activeCategory?._id === cat?._id
                    ? "bg-[#204972] text-white border-[#204972] shadow-lg transform -translate-y-1"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-3" />
                <span className="font-medium">{cat?.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Exam Type Selection */}
      {currentStep >= 2 && activeCategory && (
        <div className={`mb-10 transition-opacity ${currentStep === 2 ? "opacity-100" : "opacity-60"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#204972] flex items-center">
              {currentStep > 2 && (
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="mr-2 text-gray-500 hover:text-[#204972] transition"
                >
                  <FaChevronRight className="rotate-180" />
                </button>
              )}
              Select Exam Type
            </h3>
            {currentStep === 2 && (
              <p className="text-sm text-gray-500">{examTypes.length} options</p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {examTypes?.map((type) => (
              <button
                key={type?._id}
                onClick={() => {
                  setActiveExamType(type);
                  setCurrentStep(3);
                }}
                className={`px-6 py-3 rounded-full border transition-all ${
                  activeExamType?._id === type?._id
                    ? "bg-[#204972] text-white border-[#204972] shadow-lg"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                {type?.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Exam Selection */}
      {currentStep >= 3 && activeExamType && (
        <div className={`mb-10 transition-opacity ${currentStep === 3 ? "opacity-100" : "opacity-60"}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <h3 className="text-xl font-semibold text-[#204972] flex items-center">
              <button 
                onClick={() => setCurrentStep(3)}
                className="mr-2 text-gray-500 hover:text-[#204972] transition"
              >
                <FaChevronRight className="rotate-180" />
              </button>
              Select Exam
            </h3>
            
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search exams..."
                className="border border-gray-300 rounded-full pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredExams?.map((exam) => (
              <button
                key={exam?._id}
                onClick={() => setActiveExam(exam)}
                className={`p-4 rounded-xl border transition-all ${
                  activeExam?._id === exam?._id
                    ? "bg-[#204972] text-white border-[#204972] shadow-lg"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="font-medium">{exam?.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Course Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-[#204972]">
            Available Courses
          </h3>
          <p className="text-sm text-gray-500">
            {courses.length} course{courses.length !== 1 ? "s" : ""} found
          </p>
        </div>
        
        {courses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link
                href={`/courses/${course?.slug}`}
                key={course?._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course?.isFree 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {course?.isFree ? "FREE" : "PREMIUM"}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {course?.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course?.overview}
                  </p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-[#204972]">
                      {course?.isFree ? "Free Access" : `₹${course?.price}`}
                    </span>
                    <span className="text-xs text-gray-500">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any courses for the selected exam. Try selecting a different category or exam type.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}