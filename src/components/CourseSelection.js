
"use client";

import { useState, useEffect } from "react";
import {
  FaSearch,
  FaChevronRight,
  FaBook,
  FaGraduationCap,
  FaCertificate,
  FaArrowRight,
  FaFilter,
} from "react-icons/fa";
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
          setActiveCategory(res?.data?.[0]);
          setCurrentStep(1);
        }
      } catch (err) {
        console.error(
          "Error fetching categories",
          err?.response?.data || err?.message
        );
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    if (!activeCategory?._id) return;

    const fetchExamTypes = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/exam-types/category/${activeCategory?._id}`
        );

        if (Array.isArray(res?.data) && res.data.length > 0) {
          setExamTypes(res.data);
          setActiveExamType(res.data[0]);
          setCurrentStep(2);
        } else {
          setExamTypes([]);
          setActiveExamType(null);
          setExams([]);
          setCourses([]);
          setCurrentStep(2);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          // Gracefully handle no data case
          setExamTypes([]);
          setActiveExamType(null);
          setExams([]);
          setCourses([]);
          setCurrentStep(2);
        } else {
          console.error(
            "Error fetching exam types:",
            err?.response?.data || err?.message
          );
        }
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
        const res = await axiosInstance.get(
          `/exams/type/${activeExamType?._id}`
        );
        setExams(res?.data || []);
        if (res?.data?.length > 0) {
          setActiveExam(res?.data?.[0]);
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
          console.error(
            "Error fetching exams",
            err?.response?.data || err?.message
          );
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
        const res = await axiosInstance.get(`/courses?exam=${activeExam?._id}`);
        console.log("courses response:", res);
        setCourses(res?.data || []);
      } catch (err) {
        console.error(
          "Error fetching courses",
          err?.response?.data || err?.message
        );
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [activeExam]);

  // Filter exams based on search term
  const filteredExams = exams?.filter((exam) =>
    exam?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  // Filter courses based on search term
  const filteredCourses = courses?.filter((course) =>
    course?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  // Final courses list (default = all, on search = filtered)
  const displayedCourses = searchTerm ? filteredCourses : courses;


  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-blue-50/30 border-b border-border">
        {/* <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#204972]/10 text-[#204972] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaGraduationCap className="text-lg" />
              <span>Educational Excellence</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect Learning Path
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover expertly crafted courses designed to help you achieve
              your academic and professional goals through our comprehensive
              learning platform.
            </p>
          </div>
        </div> */}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-blue-50/30 border border-border rounded-lg p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#204972] rounded-lg flex items-center justify-center">
                  <FaFilter className="text-white text-sm" />
                </div>
                <h2 className="text-xl font-bold text-card-foreground">
                  Course Navigator
                </h2>
              </div>

              {/* Categories Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#204972]/10 rounded-lg flex items-center justify-center">
                    <FaBook className="text-[#204972] text-sm" />
                  </div>
                  <h3 className="font-semibold text-card-foreground text-lg">
                    Categories
                  </h3>
                  <span className="bg-[#204972]/10 text-xs font-medium px-2 py-1 rounded-full">
                    {categories?.length}
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
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 cur ${activeCategory?._id === cat?._id
                          ? "bg-[#204972] text-white shadow-sm"
                          : "bg-[#204972]/10 text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <div className="font-medium text-sm cursor-pointer">
                        {cat?.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam Types Section */}
              {activeCategory && examTypes?.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#204972]/10 rounded-lg flex items-center justify-center">
                      <FaGraduationCap className="text-[#204972] text-sm" />
                    </div>
                    <h3 className="font-semibold text-lg">Exam Types</h3>
                    <span className="bg-[#204972]/10 text-xs font-medium px-2 py-1 rounded-full">
                      {examTypes?.length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide pr-1">
                    {examTypes?.map((type) => (
                      <button
                        key={type?._id}
                        onClick={() => {
                          setActiveExamType(type);
                          setCurrentStep(3);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${activeExamType?._id === type?._id
                            ? "bg-[#204972] text-secondary-foreground shadow-sm"
                            : "bg-[#204972]/10 hover:bg-[#204972]/60 text-muted-foreground hover:text-white"
                          }`}
                      >
                        <div className="font-medium text-sm">{type?.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Section */}
              {activeExamType && exams?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#204972]/10 rounded-lg flex items-center justify-center">
                      <FaCertificate className="text-[#204972] text-sm" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">
                      Search Exams
                    </h3>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search exams..."
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all duration-200 bg-input text-foreground"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e?.target?.value)}
                    />
                    <FaSearch className="absolute left-3 top-4 text-muted-foreground text-sm" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            {/* Breadcrumb */}
            <div className="bg-blue-50/30 border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-medium">
                  Learning Path:
                </span>
                {activeCategory && (
                  <>
                    <span className="bg-[#204972]/10 text-[#204972] px-3 py-1 rounded-full font-medium">
                      {activeCategory?.name}
                    </span>
                    <FaChevronRight className="text-muted-foreground text-xs" />
                  </>
                )}
                {activeExamType && (
                  <>
                    <span className="bg-[#ABC129]/10 text-secondary px-3 py-1 rounded-full font-medium">
                      {activeExamType?.name}
                    </span>
                    <FaChevronRight className="text-muted-foreground text-xs" />
                  </>
                )}
                {activeExam && (
                  <span className="bg-[#ABC129]/10 text-accent px-3 py-1 rounded-full font-medium">
                    {activeExam?.name}
                  </span>
                )}
              </div>
            </div>

            {/* Exams Grid */}
            {activeExamType && filteredExams?.length > 0 && (
              <div className="bg-blue-50/30 border border-border rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Available Exams
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground bg-[#204972]/10 px-3 py-1 rounded-full">
                      {filteredExams?.length} exam
                      {filteredExams?.length !== 1 ? "s" : ""} found
                    </span>
                    {isLoading && (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExams?.map((exam) => (
                    <button
                      key={exam?._id}
                      onClick={() => setActiveExam(exam)}
                      className={`p-4 rounded-lg border transition-all duration-200 text-left ${activeExam?._id === exam?._id
                          ? "border-primary bg-[#204972]/5 shadow-sm"
                          : "border-border hover:border-primary/50 hover:shadow-sm bg-background"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-foreground">
                          {exam?.name}
                        </div>
                        {activeExam?._id === exam?._id && (
                          <div className="w-6 h-6 bg-[#204972] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#204972]-foreground rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-50/30 border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-card-foreground">
                  {activeExam
                    ? `Courses for ${activeExam?.name}`
                    : "Available Courses"}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground bg-[#204972]/10 px-3 py-1 rounded-full">
                    {courses?.length} course{courses?.length !== 1 ? "s" : ""}{" "}
                    available
                  </span>
                  {isLoading && (
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>

              {displayedCourses?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedCourses?.map((course) => (
                    <Link
                      href={`/courses/${course?._id}`}
                      key={course?._id}
                      className="group bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                    >
                      {/* Course Image */}
                      {course?.full_image?.length > 0 ? (
                        <div className="w-full h-48 overflow-hidden">
                          <img
                            src={course?.full_image?.[0]}
                            alt={course?.title || "Course Image"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#204972]/10 rounded-lg flex items-center justify-center">
                            <FaBook className="text-[#204972] text-xl" />
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${course?.isFree
                                ? "bg-secondary/10 text-secondary"
                                : "bg-[#204972]/10 text-[#204972]"
                              }`}
                          >
                            {course?.isFree ? "FREE COURSE" : "PREMIUM"}
                          </span>
                        </div>

                        <h3 className="font-bold text-lg mb-3 text-foreground line-clamp-2 group-hover:text-[#204972] transition-colors">
                          {course?.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                          {course?.overview}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xl text-foreground">
                            {course?.isFree ? "Free Access" : `₹${course?.price}`}
                          </span>
                          <div className="flex items-center gap-2 text-[#204972] font-medium group-hover:gap-3 transition-all">
                            <span className="text-sm">View Course</span>
                            <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-[#204972]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaBook className="text-muted-foreground text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {!activeExam
                      ? "Select an exam to view courses"
                      : "No courses available"}
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {!activeExam
                      ? "Choose a category, exam type, and exam from the navigator to discover relevant courses."
                      : "We couldn't find any courses for the selected exam. Try selecting a different exam or check back later."}
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
