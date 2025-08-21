"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaBook, FaArrowRight } from "react-icons/fa"
import axiosInstance from "../app/axios/axiosInstance"

export default function CategoryCoursesSection({ category }) {
  const [examTypes, setExamTypes] = useState([])
  const [selectedExamType, setSelectedExamType] = useState(null)

  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  // 1️⃣ Fetch ExamTypes
  useEffect(() => {
    if (!category?._id) return
    const fetchExamTypes = async () => {
      try {
        const res = await axiosInstance.get(`/exam-types/category/${category._id}`)
        setExamTypes(res?.data || [])
        if (res?.data?.length > 0) {
          setSelectedExamType(res.data[0])
        }
      } catch (err) {
        console.error("Error fetching exam types", err)
      }
    }
    fetchExamTypes()
  }, [category])

  // 2️⃣ Fetch Exams when ExamType changes
useEffect(() => {
  if (!selectedExamType?._id) return

  const fetchExams = async () => {
    try {
      const res = await axiosInstance.get(`/exams/type/${selectedExamType._id}`)

      if (Array.isArray(res?.data) && res.data.length > 0) {
        setExams(res.data)
        setSelectedExam(res.data[0])
      } else {
        setExams([])
        setSelectedExam(null)
        setCourses([])
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        // 👇 agar exams available hi nahi hai to safely empty state set karo
        setExams([])
        setSelectedExam(null)
        setCourses([])
      } else {
        console.error("Error fetching exams:", err?.response?.data || err.message)
      }
    }
  }

  fetchExams()
}, [selectedExamType])


  // 3️⃣ Fetch Courses when Exam changes
  useEffect(() => {
    if (!selectedExam?._id) return
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get(`/courses?exam=${selectedExam._id}`)
        setCourses(res?.data || [])
      } catch (err) {
        console.error("Error fetching courses", err)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [selectedExam])

  return (
    <div className="mb-16">

          

                <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#009FE3]/20">
                            <div>
                                <h2 className="text-3xl font-bold text-[#00316B] mb-2">  {category?.name} <span className="text-[#616606]">Courses</span> </h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
                            </div>
                        </div>


      {/* ExamTypes */}
      {examTypes?.length > 0 && (
        <div className="mb-6 flex gap-2 flex-wrap">
          {examTypes.map((type) => (
            <button
              key={type._id}
              onClick={() => setSelectedExamType(type)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                selectedExamType?._id === type._id
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted hover:bg-muted/90"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      )}

      {/* Exams */}
      {exams?.length > 0 && (
        <div className="mb-6 flex gap-2 flex-wrap">
          {exams.map((exam) => (
            <button
              key={exam._id}
              onClick={() => setSelectedExam(exam)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                selectedExam?._id === exam._id
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted hover:bg-muted/90"
              }`}
            >
              {exam.name}
            </button>
          ))}
        </div>
      )}

      {/* Courses */}
      {loading ? (
        <p>Loading courses...</p>
      ) : courses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              href={`/courses/${course._id}`}
              key={course._id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              {course?.images?.length > 0 ? (
                <img
                  src={course?.imagesFullPath[0]}
                  alt={course?.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-muted flex items-center justify-center">
                  <FaBook className="text-muted-foreground text-2xl" />
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{course.overview}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-primary">
                    {course.isFree ? "Free" : `₹${course.price}`}
                  </span>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No courses available</p>
      )}
    </div>
  )
}
