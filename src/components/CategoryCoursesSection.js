// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { FaBook, FaArrowRight } from "react-icons/fa"
// import axiosInstance from "../app/axios/axiosInstance"

// export default function CategoryCoursesSection({ category }) {
//   const [examTypes, setExamTypes] = useState([])
//   const [selectedExamType, setSelectedExamType] = useState(null)

//   const [exams, setExams] = useState([])
//   const [selectedExam, setSelectedExam] = useState(null)

//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (!category?._id) return
//     const fetchExamTypes = async () => {
//       try {
//         const res = await axiosInstance.get(`/exam-types/category/${category._id}`)
//         setExamTypes(res?.data || [])
//         if (res?.data?.length > 0) {
//           setSelectedExamType(res.data[0])
//         }
//       } catch (err) {
//         console.error("Error fetching exam types", err)
//       }
//     }
//     fetchExamTypes()
//   }, [category])

// useEffect(() => {
//   if (!selectedExamType?._id) return

//   const fetchExams = async () => {
//     try {
//       const res = await axiosInstance.get(`/exams/type/${selectedExamType._id}`)

//       if (Array.isArray(res?.data) && res.data.length > 0) {
//         setExams(res.data)
//         setSelectedExam(res.data[0])
//       } else {
//         setExams([])
//         setSelectedExam(null)
//         setCourses([])
//       }
//     } catch (err) {
//       if (err?.response?.status === 404) {
//         setExams([])
//         setSelectedExam(null)
//         setCourses([])
//       } else {
//         console.error("Error fetching exams:", err?.response?.data || err.message)
//       }
//     }
//   }

//   fetchExams()
// }, [selectedExamType])


//   useEffect(() => {
//     if (!selectedExam?._id) return
//     const fetchCourses = async () => {
//       setLoading(true)
//       try {
//         const res = await axiosInstance.get(`/courses?exam=${selectedExam._id}`)
//         setCourses(res?.data || [])
//       } catch (err) {
//         console.error("Error fetching courses", err)
//         setCourses([])
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchCourses()
//   }, [selectedExam])

//   return (
//     <div className="mb-16">



//                 <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#009FE3]/20">
//                             <div>
//                                 <h2 className="text-3xl font-bold text-[#00316B] mb-2">  {category?.name} <span className="text-[#616606]">Courses</span> </h2>
//                                 <div className="w-16 h-1 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
//                             </div>
//                         </div>


//       {/* ExamTypes */}
//       {examTypes?.length > 0 && (
//         <div className="mb-6 flex gap-2 flex-wrap">
//           {examTypes.map((type) => (
//             <button
//               key={type._id}
//               onClick={() => setSelectedExamType(type)}
//               className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
//                 selectedExamType?._id === type._id
//                   ? "bg-secondary text-secondary-foreground"
//                   : "bg-muted hover:bg-muted/90"
//               }`}
//             >
//               {type.name}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Exams */}
//       {exams?.length > 0 && (
//         <div className="mb-6 flex gap-2 flex-wrap">
//           {exams.map((exam) => (
//             <button
//               key={exam._id}
//               onClick={() => setSelectedExam(exam)}
//               className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
//                 selectedExam?._id === exam._id
//                   ? "bg-accent text-accent-foreground"
//                   : "bg-muted hover:bg-muted/90"
//               }`}
//             >
//               {exam.name}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Courses */}
//       {loading ? (
//         <p>Loading courses...</p>
//       ) : courses?.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <Link
//               href={`/courses/${course._id}`}
//               key={course._id}
//               className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
//             >
//               {course?.images?.length > 0 ? (
//                 <img
//                   src={course?.imagesFullPath[0]}
//                   alt={course?.title}
//                   className="w-full h-40 object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-40 bg-muted flex items-center justify-center">
//                   <FaBook className="text-muted-foreground text-2xl" />
//                 </div>
//               )}

//               <div className="p-4">
//                 <h3 className="font-semibold mb-2">{course.title}</h3>
//                 <p className="text-sm text-muted-foreground line-clamp-2">{course.overview}</p>
//                 <div className="flex justify-between items-center mt-3">
//                   <span className="font-bold text-primary">
//                     {course.isFree ? "Free" : `₹${course.price}`}
//                   </span>
//                   <FaArrowRight />
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <p className="text-muted-foreground">No courses available</p>
//       )}
//     </div>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaBook, FaArrowRight, FaChevronRight } from "react-icons/fa"
import axiosInstance from "../app/axios/axiosInstance"

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
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Exam Types</h3>
              <div className="flex flex-wrap gap-2">
                {examTypes?.map((type) => (
                  <button
                    key={type?._id}
                    onClick={() => setSelectedExamType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedExamType?._id === type?._id
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
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Exams</h3>
              <div className="flex flex-wrap gap-2">
                {exams?.map((exam) => (
                  <button
                    key={exam?._id}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedExam?._id === exam?._id
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <Link
                href={`/courses/${course?._id}`}
                key={course?._id}
                className="group border border-gray-200 rounded-xl bg-white overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {course?.full_image?.length > 0 ? (
                  <div className="overflow-hidden">
                    <img
                      src={course?.full_image?.[0]}
                      alt={course?.title || "Course"}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 bg-[#204972]/10 flex items-center justify-center">
                    <FaBook className="text-gray-400 text-3xl" />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-[#009FE3] transition-colors">
                    {course?.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {course?.overview}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`font-bold text-lg ${course?.isFree ? 'text-green-600' : 'text-[#00316B]'}`}>
                      {course?.isFree ? "Free" : `₹${course?.price}`}
                    </span>
                    <div className="flex items-center text-sm text-[#009FE3] group-hover:translate-x-1 transition-transform">
                      <span className="mr-1">View Details</span>
                      <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#204972]/10 rounded-xl">
            <div className="w-16 h-16 mx-auto bg-[#204972]/20 rounded-full flex items-center justify-center mb-4">
              <FaBook className="text-[#204972] text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No courses available</h3>
            <p className="text-gray-500">Check back later for new courses in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
