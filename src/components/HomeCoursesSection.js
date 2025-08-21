
// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { FaBook, FaArrowRight } from "react-icons/fa"
// import axiosInstance from "../app/axios/axiosInstance"

// export default function HomeCoursesSection() {
//   const [categories, setCategories] = useState([])
//   const [selectedCategory, setSelectedCategory] = useState(null)

//   const [examTypes, setExamTypes] = useState([])
//   const [selectedExamType, setSelectedExamType] = useState(null)

//   const [exams, setExams] = useState([])
//   const [selectedExam, setSelectedExam] = useState(null)

//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(false)

//   // 1️⃣ Fetch Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories")
//         setCategories(res?.data || [])
//         if (res?.data?.length > 0) {
//           setSelectedCategory(res.data[0])
//         }
//       } catch (err) {
//         console.error("Error fetching categories", err)
//       }
//     }
//     fetchCategories()
//   }, [])

//   // 2️⃣ Fetch ExamTypes when Category changes
//   useEffect(() => {
//     if (!selectedCategory?._id) return
//     const fetchExamTypes = async () => {
//       try {
//         const res = await axiosInstance.get(`/exam-types/category/${selectedCategory._id}`)
//         setExamTypes(res?.data || [])
//         if (res?.data?.length > 0) {
//           setSelectedExamType(res.data[0])
//         } else {
//           setSelectedExamType(null)
//           setExams([])
//           setCourses([])
//         }
//       } catch (err) {
//         console.error("Error fetching exam types", err)
//       }
//     }
//     fetchExamTypes()
//   }, [selectedCategory])

//   // 3️⃣ Fetch Exams when ExamType changes
//   useEffect(() => {
//     if (!selectedExamType?._id) return

//     const fetchExams = async () => {
//       try {
//         const res = await axiosInstance.get(`/exams/type/${selectedExamType._id}`)

//         if (Array.isArray(res?.data) && res.data.length > 0) {
//           setExams(res.data)
//           setSelectedExam(res.data[0])
//         } else {
//           setExams([])
//           setSelectedExam(null)
//           setCourses([])
//         }
//       } catch (err) {
//         if (err?.response?.status === 404) {
//           setExams([])
//           setSelectedExam(null)
//           setCourses([])
//         } else {
//           console.error("Error fetching exams:", err?.response?.data || err.message)
//         }
//       }
//     }

//     fetchExams()
//   }, [selectedExamType])

//   // 4️⃣ Fetch Courses when Exam changes
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
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-bold text-foreground mb-3">Explore Popular Courses</h2>
//         <p className="text-muted-foreground">Choose category → exam type → exam to view courses</p>
//       </div>

//       {/* Categories Tabs */}
//       <div className="mb-8">
//         <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">Categories</h3>
//         <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
//           <div className="flex space-x-2">
//             {categories?.map((cat) => (
//               <button
//                 key={cat._id}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                   selectedCategory?._id === cat._id
//                     ? "bg-primary text-primary-foreground shadow-md"
//                     : "bg-muted hover:bg-muted/90 text-foreground"
//                 }`}
//               >
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ExamTypes Tabs */}
//       {examTypes?.length > 0 && (
//         <div className="mb-6">
//           <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">Exam Types</h3>
//           <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
//             <div className="flex space-x-2">
//               {examTypes?.map((type) => (
//                 <button
//                   key={type._id}
//                   onClick={() => setSelectedExamType(type)}
//                   className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
//                     selectedExamType?._id === type._id
//                       ? "bg-secondary text-secondary-foreground shadow"
//                       : "bg-muted hover:bg-muted/90 text-foreground"
//                   }`}
//                 >
//                   {type.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Exams Tabs */}
//       {exams?.length > 0 && (
//         <div className="mb-10">
//           <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">Exams</h3>
//           <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
//             <div className="flex space-x-2">
//               {exams?.map((exam) => (
//                 <button
//                   key={exam._id}
//                   onClick={() => setSelectedExam(exam)}
//                   className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
//                     selectedExam?._id === exam._id
//                       ? "bg-accent text-accent-foreground shadow"
//                       : "bg-muted hover:bg-muted/90 text-foreground"
//                   }`}
//                 >
//                   {exam.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Courses Grid */}
//       {loading ? (
//         <div className="text-center py-12">
//           <div className="inline-flex items-center justify-center">
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
//             Loading courses...
//           </div>
//         </div>
//       ) : courses?.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <Link
//               href={`/courses/${course._id}`}
//               key={course._id}
//               className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//             >
//               {course?.images?.length > 0 ? (
//                 <div className="w-full h-48 overflow-hidden">
//                   <img
//                     src={course?.imagesFullPath[0]}
//                     alt={course?.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               ) : (
//                 <div className="w-full h-48 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
//                   <FaBook className="text-muted-foreground text-3xl" />
//                 </div>
//               )}

//               <div className="p-5">
//                 <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
//                   {course.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.overview}</p>
//                 <div className="flex justify-between items-center">
//                   <span className="font-bold text-primary">
//                     {course.isFree ? "Free" : `₹${course.price}`}
//                   </span>
//                   <div className="flex items-center text-primary text-sm">
//                     <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity">View Course</span>
//                     <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 text-muted-foreground">
//           No courses available for the selected exam
//         </div>
//       )}
//     </div>
//   )
// }





"use client"

import { useState, useEffect } from "react"
import axiosInstance from "../app/axios/axiosInstance"
import CategoryCoursesSection from "./CategoryCoursesSection"

export default function HomeCoursesSection() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories")
        setCategories(res?.data || [])
      } catch (err) {
        console.error("Error fetching categories", err)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* <h2 className="text-3xl font-bold text-center mb-12">Explore Popular Courses</h2> */}

         <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#204972] text-center">
                Explore Popular Courses
            </h2>


      {categories?.map((cat) => (
        <CategoryCoursesSection key={cat._id} category={cat} />
      ))}
    </div>
  )
}
