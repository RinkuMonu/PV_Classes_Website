



"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import axiosInstance from "../../app/axios/axiosInstance"
import Link from "next/link"

export default function ExamMegaMenu() {
  const [categories, setCategories] = useState([])
  const [examTypes, setExamTypes] = useState([])
  const [exams, setExams] = useState([])

  const [activeCategory, setActiveCategory] = useState(null)
  const [activeExamType, setActiveExamType] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories")
        setCategories(res?.data || [])
        if (res?.data?.length > 0) {
          setActiveCategory(res?.data?.[0] || null)
        }
      } catch (err) {
        console.error("Error fetching categories", err)
      }
    }
    fetchCategories()
  }, [])

  // useEffect(() => {
  //   if (!activeCategory?._id) return

  //   setExamTypes([])
  //   setExams([])
  //   setActiveExamType(null)

  //   const fetchExamTypes = async () => {
  //     try {
  //       const res = await axiosInstance.get(`/exam-types/category/${activeCategory?._id}`)
  //       setExamTypes(res?.data || [])
  //       if (res?.data?.length > 0) {
  //         setActiveExamType(res?.data?.[0] || null)
  //       }
  //     } catch (err) {
  //       console.error("Error fetching exam types", err)
  //     }
  //   }
  //   fetchExamTypes()
  // }, [activeCategory?._id])


  useEffect(() => {
    if (!activeCategory?._id) return;

    // reset state whenever category changes
    setExamTypes([]);
    setExams([]);
    setActiveExamType(null);

    const fetchExamTypes = async () => {
      try {
        const res = await axiosInstance.get(`/exam-types/category/${activeCategory?._id}`);

        if (Array.isArray(res?.data) && res.data.length > 0) {
          setExamTypes(res.data);
          setActiveExamType(res.data[0] || null);
        } else {
          setExamTypes([]);
          setActiveExamType(null);
          setExams([]);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          // no exam types found → safe fallback
          setExamTypes([]);
          setActiveExamType(null);
          setExams([]);
        } else {
          console.error("Error fetching exam types:", err?.response?.data || err?.message);
        }
      }
    };

    fetchExamTypes();
  }, [activeCategory?._id]);



  useEffect(() => {
    if (!activeExamType?._id) {
      setExams([])
      return
    }

    setExams([])

    const fetchExams = async () => {
      try {
        const res = await axiosInstance.get(`/exams/type/${activeExamType?._id}`)
        console.log("Fetched exams:", res?.data) // Debugging line
        setExams(res?.data || [])
      } catch (err) {
        if (err?.response?.status === 404) {
          setExams([])
        } else {
          console.error("Error fetching exams", err)
        }
      }
    }

    fetchExams()
  }, [activeExamType?._id])


  // priority exam ko top pe lana
  const PRIORITY_ID = "68ad4356255f962ce73719c2";
  const priorityExam = exams?.find(e => e._id === PRIORITY_ID);
  const otherExams = exams?.filter(e => e._id !== PRIORITY_ID);
  const finalExams = priorityExam ? [priorityExam, ...otherExams] : exams;


  return (
    <div className="w-full border-2 border-[#009FE3]/20 bg-white rounded-md shadow-2xl flex overflow-hidden relative">
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#00316B] to-[#009FE3] rounded-br-full opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#87B105] to-[#ABC129] rounded-tl-full opacity-10"></div>

      {/* Left Category Menu */}
      <div className="w-64 border-r-2 border-[#009FE3]/20 bg-gradient-to-b from-[#00316B]/5 via-white to-[#87B105]/5 relative">
        <div className="p-4 border-b border-[#009FE3]/20 bg-gradient-to-r from-[#00316B] to-[#204972] text-white">
          <h3 className="font-bold text-lg">Exam Categories</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#009FE3] to-[#87B105] rounded-full mt-2"></div>
        </div>

        <div className="p-2">
          {categories?.map((cat) => (
            <button
              key={cat?._id}
              className={`w-full text-left px-4 py-4 mb-2 rounded-xl transition-all duration-300 relative overflow-hidden group ${activeCategory?._id === cat?._id
                  ? "bg-gradient-to-r from-[#00316B] to-[#204972] text-white shadow-lg transform scale-105 border-l-4 border-[#87B105]"
                  : "hover:bg-gradient-to-r hover:from-[#009FE3]/10 hover:to-[#87B105]/10 text-[#00316B] hover:shadow-md hover:transform hover:scale-102"
                }`}
              onMouseEnter={() => setActiveCategory(cat)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#009FE3]/20 to-[#87B105]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 font-semibold">{cat?.name || "Unnamed"}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-gradient-to-br from-white to-[#009FE3]/5 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#00316B] mb-2">{activeCategory?.name || "Select Category"} Exams</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#009FE3] to-[#87B105] rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b-2 border-[#009FE3]/20 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[#87B105]/50 pb-2">
          {examTypes?.map((type) => (
            <button
              key={type?._id}
              className={`pb-3 px-2 transition-all duration-300 whitespace-nowrap relative ${activeExamType?._id === type?._id
                  ? "border-b-3 border-[#87B105] text-[#00316B] font-bold transform scale-105"
                  : "text-[#204972] hover:text-[#00316B] hover:border-b-2 hover:border-[#009FE3]/50"
                }`}
              onMouseEnter={() => setActiveExamType(type)}
            >
              {activeExamType?._id === type?._id && (
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#87B105] to-[#ABC129] rounded-full"></div>
              )}
              <span className="font-semibold">{type?.name || "Unnamed"}</span>
            </button>
          ))}
        </div>

        {/* Exam Cards */}
        {/* <div className="grid grid-cols-3 gap-6">
          {exams?.map((exam) => (
            <Link
              key={exam?._id}
              href={`/courses?exam=${exam?._id || ""}`}
              className="group flex items-center gap-4 p-4 border-2 border-[#009FE3]/20 rounded-xl shadow-md hover:shadow-xl hover:border-[#87B105] hover:bg-gradient-to-r hover:from-[#009FE3]/10 hover:to-[#87B105]/10 transition-all duration-300 cursor-pointer transform hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#009FE3]/5 to-[#87B105]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="w-12 h-12 relative z-10 rounded-full overflow-hidden border-2 border-[#009FE3]/30 group-hover:border-[#87B105] transition-colors duration-300">
                <Image
                  src={
                    exam?.logo
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${exam?.logo}`
                      : "/vercel.svg"
                  }
                  alt={exam?.name || "Exam"}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1 z-10">
                <span className="text-sm font-bold text-[#00316B] group-hover:text-[#204972] transition-colors duration-300 block">
                  {exam?.name || "Unnamed Exam"}
                </span>
                <div className="mt-1 inline-flex items-center px-2 py-1 bg-gradient-to-r from-[#87B105]/20 to-[#ABC129]/20 rounded-full">
                  <span className="text-xs font-medium text-[#616602]">Exam Prep</span>
                </div>
              </div>

              <div className="z-10 text-[#009FE3] group-hover:text-[#87B105] transition-colors duration-300 transform group-hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div> */}



        {/* Exam Cards */}
        <div className="grid grid-cols-3 gap-6">
          {finalExams?.map((exam) => (
            <Link
              key={exam?._id}
              href={`/courses?exam=${exam?._id || ""}`}
              className="group flex items-center gap-4 p-4 border-2 border-[#009FE3]/20 rounded-xl shadow-md hover:shadow-xl hover:border-[#87B105] hover:bg-gradient-to-r hover:from-[#009FE3]/10 hover:to-[#87B105]/10 transition-all duration-300 cursor-pointer transform hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#009FE3]/5 to-[#87B105]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="w-12 h-12 relative z-10 rounded-full overflow-hidden border-2 border-[#009FE3]/30 group-hover:border-[#87B105] transition-colors duration-300">
                <Image
                  src={
                    exam?.logo
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${exam?.logo}`
                      : "/vercel.svg"
                  }
                  alt={exam?.name || "Exam"}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1 z-10">
                <span className="text-sm font-bold text-[#00316B] group-hover:text-[#204972] transition-colors duration-300 block">
                  {exam?.name || "Unnamed Exam"}
                </span>
                <div className="mt-1 inline-flex items-center px-2 py-1 bg-gradient-to-r from-[#87B105]/20 to-[#ABC129]/20 rounded-full">
                  <span className="text-xs font-medium text-[#616602]">Exam Prep</span>
                </div>
              </div>

              <div className="z-10 text-[#009FE3] group-hover:text-[#87B105] transition-colors duration-300 transform group-hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>



        {exams?.length === 0 && examTypes?.length > 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#009FE3]/20 to-[#87B105]/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#00316B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-[#204972] font-medium">No exams available for this category</p>
            <p className="text-[#616602] text-sm mt-1">Please check back later or explore other categories</p>
          </div>
        )}
      </div>
    </div>
  )
}
