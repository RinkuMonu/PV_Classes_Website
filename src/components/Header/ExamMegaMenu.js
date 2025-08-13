"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "../../app/axios/axiosInstance";
import Link from "next/link";


export default function ExamMegaMenu() {
  const [categories, setCategories] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [exams, setExams] = useState([]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeExamType, setActiveExamType] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data);
        if (res.data.length > 0) {
          setActiveCategory(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    if (!activeCategory?._id) return;

    setExamTypes([]);
    setExams([]);
    setActiveExamType(null);

    const fetchExamTypes = async () => {
      try {
        const res = await axiosInstance.get(`/exam-types/category/${activeCategory._id}`);
        setExamTypes(res.data);
        if (res.data.length > 0) {
          setActiveExamType(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching exam types", err);
      }
    };
    fetchExamTypes();
  }, [activeCategory]);

  useEffect(() => {
    if (!activeExamType?._id) {
      setExams([]);
      return;
    }

    setExams([]);

    const fetchExams = async () => {
      try {
        const res = await axiosInstance.get(`/exams/type/${activeExamType._id}`);
        setExams(res.data);
      } catch (err) {
        console.error("Error fetching exams", err);
      }
    };
    fetchExams();
  }, [activeExamType]);


  return (
    <div className="w-full border border-gray-200 bg-white rounded-xl shadow-lg flex overflow-hidden pt-2">
      {/* Left Category Menu */}
      <div className="w-60 border-r border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`w-full text-left px-4 py-3 transition-all duration-200 ${activeCategory?._id === cat._id
              ? "bg-indigo-50 font-semibold text-[#00316B] border-l-4 border-[#00316B]"
              : "hover:bg-gray-50 text-gray-700"
              }`}
            onMouseEnter={() => setActiveCategory(cat)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white p-4">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {examTypes.map((type) => (
            <button
              key={type._id}
              className={`pb-2 transition-colors ${activeExamType?._id === type._id
                ? "border-b-2 border-[#00316B] text-[#00316B] font-semibold"
                : "text-gray-600 hover:text-[#00316B]"
                }`}
              onMouseEnter={() => setActiveExamType(type)}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-3 gap-4">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 relative">
                <Image
                  src={"http://localhost:5000" + exam?.logo || "/vercel.svg"}
                  alt={exam.name}
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-sm font-medium text-gray-800 group-hover:text-[#00316B]">
                {exam.name}
              </span>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
