"use client";
import {
  FaFlask,
  FaGraduationCap,
  FaSchool,
  FaLandmark,
  FaBriefcase,
  FaShieldAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function ExamCategory() {
  const categories = [
    {
      title: "defence Exams",
      tags: ["Level 1", "Level 2", "Level 3"],
      icon: <FaFlask className="text-6xl text-[#87b105]" />,
      bg: "bg-[#87b105]/10",

      link: "/courses",

    },
    {
      title: "Current Affairs",
      tags: ["GK", "Indian Economy", "Geography"],
      icon: <FaGraduationCap className="text-6xl text-[#87b105]" />,
      bg: "bg-[#87b105]/10",
      link: "/current-affairs",
    },

    {
      title: "Banking Exams",
      tags: ["Central", "Politics"],
      icon: <FaLandmark className="text-6xl text-[#87b105]" />,
      bg: "bg-[#87b105]/10",
      link: "http://localhost:3000/courses?exam=68ac35d6a5a435b640ada5f3",
    },
    {
      title: "Utarpardesh State Exams",
      tags: ["SSC", "Banking"],
      icon: <FaBriefcase className="text-6xl text-[#87b105]" />,
      bg: "bg-[#87b105]/10",
      link: "http://localhost:3000/courses?exam=68ac31d0a5a435b640ada5dd",
    },
  ];

  return (
    <section className="px-6 md:px-16 py-16 bg-[#edf3f5]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#204972]">
        Exam Categories
      </h2>
      <p className="text-center text-gray-600 mb-12">
        PV is preparing students for 35+ exam categories. Scroll down to find
        the one you are preparing for
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 relative overflow-hidden hover:shadow-lg transition-all md:px-10"
          >
            <h3 className="text-xl text-[#204972] font-bold mb-4">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {cat.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Link
                href={cat.link}
                className="text-[#204972] font-medium flex items-center gap-2"
              >
                Explore Category →
              </Link>
              <div
                className={`absolute top-0 right-0 w-28 h-28 ${cat.bg} rounded-bl-full flex items-center justify-center`}
              >
                {cat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
