

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaBook, FaArrowRight, FaChevronRight } from "react-icons/fa"
import axiosInstance from "../app/axios/axiosInstance"
import Image from "next/image"


export default function CategoryCoursesSection({ category }) {
  const [examTypes, setExamTypes] = useState([])
  const [selectedExamType, setSelectedExamType] = useState(null)

  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (!category?._id) return
  //   const fetchExamTypes = async () => {
  //     try {
  //       const res = await axiosInstance.get(`/exam-types/category/${category?._id}`)
  //       setExamTypes(res?.data || [])
  //       if (res?.data?.length > 0) {
  //         setSelectedExamType(res?.data?.[0] || null)
  //       }
  //     } catch (err) {
  //       console.error("Error fetching exam types", err)
  //     }
  //   }
  //   fetchExamTypes()
  // }, [category?._id])


  useEffect(() => {
    if (!category?._id) return;

    const fetchExamTypes = async () => {
      try {
        const res = await axiosInstance.get(`/exam-types/category/${category?._id}`);

        if (Array.isArray(res?.data) && res.data.length > 0) {
          setExamTypes(res.data);
          setSelectedExamType(res.data[0] || null);
        } else {
          setExamTypes([]);
          setSelectedExamType(null);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          // 404 => no exam types found
          setExamTypes([]);
          setSelectedExamType(null);
        } else {
          console.error("Error fetching exam types:", err?.response?.data || err?.message);
        }
      }
    };

    fetchExamTypes();
  }, [category?._id]);




  useEffect(() => {
    if (!selectedExamType?._id) return;

    const fetchExams = async () => {
      try {
        const res = await axiosInstance.get(`/exams/type/${selectedExamType?._id}`);

        if (Array.isArray(res?.data) && res?.data?.length > 0) {
          setExams(res.data);
          setSelectedExam(res.data[0] || null);
        } else {
          setExams([]);
          setSelectedExam(null);
          setCourses([]);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          // 404 ka matlab sirf data nahi mila
          setExams([]);
          setSelectedExam(null);
          setCourses([]);
        } else {
          console.error("Error fetching exams:", err?.response?.data || err?.message);
        }
      }
    };

    fetchExams();
  }, [selectedExamType?._id]);


  useEffect(() => {
    if (!selectedExam?._id) return
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get(`/courses?exam=${selectedExam?._id}`)
        setCourses(res?.data || [])
      } catch (err) {
        console.error("Error fetching courses", err)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [selectedExam?._id])


  const getDisplayCourses = () => {
    if (courses.length === 1 || courses.length === 2) {
      const comingSoonCourses = Array(3).fill(null).map((_, i) => ({
        _id: `coming-soon-${i}`, // ✅ unique id
        title: "Coming Soon",
        overview: "New course will be available soon.",
        isFree: true,
        price: 0,
        full_image: ["/Image/cominig-soon-courses.jpeg"],
        isComingSoon: true
      }));

      return [...courses, ...comingSoonCourses];
    }

    return courses;
  };

  const displayCourses = getDisplayCourses();
  return (
    <div className="mb-16 ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 pb-4 border-b border-[#009FE3]/30">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00316B] mb-2">
            {category?.name} <span className="text-[#616606]">Courses</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
        </div>

      </div>

      {/* Filter Section */}
      {(examTypes?.length > 0 || exams?.length > 0) && (
        <div className="mb-8">
          {/* Exam Types */}
          {examTypes?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Exam Types</h3>
              <div className="flex flex-wrap gap-2">
                {examTypes?.map((type) => (
                  <button
                    key={type?._id}
                    onClick={() => setSelectedExamType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedExamType?._id === type?._id
                      ? "bg-gradient-to-r from-[#204972] to-[#2c5c8f] text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-[#204972] hover:text-[#204972]"
                      }`}
                  >
                    {type?.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Exams */}
          {exams?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Exams</h3>
              <div className="flex flex-wrap gap-2">
                {exams?.map((exam) => (
                  <button
                    key={exam?._id}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedExam?._id === exam?._id
                      ? "bg-gradient-to-r from-[#204972] to-[#2c5c8f] text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-[#204972] hover:text-[#204972]"
                      }`}
                  >
                    {exam?.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Courses Section */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="w-full h-40 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : courses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {courses?.map((course) => ( */}
            {displayCourses?.slice(0, 4).map((course, index) => (
              <Link
                // href={`/courses/${course?._id}`}
                href={course?.isComingSoon ? "/" : `/courses/${course?._id}`}
                key={course?._id}
                className="group border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
              >
                {/* Premium/Free Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${course?.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {/* {course?.isFree ? "FREE" : "PREMIUM"} */}
                    {course?.isComingSoon ? "COMING SOON" : course?.isFree ? "FREE" : "PREMIUM"}
                  </span>
                </div>

                {course?.full_image?.length > 0 ? (
                  <div className="overflow-hidden relative">
                    <Image
                      width={1887}
                      height={2512}
                      src={course?.full_image?.[0]}
                      alt={course?.title || "Course"}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-[#204972]/10 to-[#009FE3]/10 flex items-center justify-center">
                    <div className="relative">
                      <FaBook className="text-gray-500 text-4xl" />
                      <div className="absolute -inset-2 bg-white/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="h-1 w-6 bg-[#009FE3] rounded-full mr-2 group-hover:w-8 transition-all duration-300"></div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Course</span>
                  </div>

                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#009FE3] transition-colors h-14">
                    {course?.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">
                    {course?.overview}
                  </p>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className={`font-bold text-lg ${course?.isFree ? 'text-green-600' : 'text-[#00316B]'}`}>
                      {/* {course?.isFree ? "Free Access" : `₹${course?.price}`} */}
                      {course?.isComingSoon
                        ? "Coming Soon"
                        : course?.isFree
                          ? "Free Access"
                          : `₹${course?.price}`}
                    </span>
                    <div className="flex items-center text-sm text-[#009FE3] group-hover:translate-x-1 transition-transform">
                      <span className="mr-2 font-medium">Explore</span>
                      <div className="relative">
                        <FaArrowRight className="text-xs transform group-hover:translate-x-1 transition-transform" />
                        <FaArrowRight className="text-xs absolute inset-0 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#009FE3]/20 rounded-2xl pointer-events-none transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        ) : (

          // coming soon ka banner
          <Image
            src="/Image/coming-soon-banner.jpeg"
            alt="No courses"
            width={1600}
            height={342}
            className="object-contain"
          />
        )}
      </div>
    </div>
  )
}
