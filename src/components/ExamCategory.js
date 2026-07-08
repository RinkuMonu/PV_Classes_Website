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
      title: "12 Classes Exams",
      tags: ["science"],
      icon: <FaFlask className="text-6xl text-[#87b105]" />,
      bg: "bg-[#87b105]/10",

      link: "/courses?exam=68b2deb3993aca7bb0ab9a41",

    },
    {
      title: "Current Affairs",
      tags: ["GK", "Indian Economy", "Geography"],
      icon: <FaGraduationCap className="text-6xl text-[#87b105]" />,
      bg: "bg-[#87b105]/10",
      link: "/current-affairs",
    },

    {
      title: "10 Class Exams",
      tags: ["maths"],
      icon: <FaLandmark className="text-6xl text-[#87b105]" />,
      bg: "bg-[#87b105]/10",
      link: "/courses?exam=68b2e224993aca7bb0ab9b7e",
    },
    {
      title: "3rd Grade Exams",
      tags: ["REET"],
      icon: <FaBriefcase className="text-6xl text-[#87b105]" />,
      bg: "bg-[#87b105]/10",
      link: "/courses?exam=68ad4356255f962ce73719c2",
    },
  ];

  return (
 <section className="relative overflow-hidden bg-gradient-to-br from-[#163554] via-[#204972] to-[#10253d] py-16">

  {/* Background Blur */}
  <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#4b8fd8]/20 rounded-full blur-[120px]" />
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />

  <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

  {/* Heading */}
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs">
            35+ Categories
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
            Find Your Exam Category
          </h2>

          <p className="mt-3 text-blue-100">
            PV is preparing students for 35+ exam categories. Find the one you're
            preparing for.
          </p>
        </div>
    <div className="grid lg:grid-cols-2 gap-12 items-start">

      {/* LEFT SIDE */}
      <div>

      

        {/* Cards */}
        <div className="space-y-5">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/30"
            >
              <div className="grid grid-cols-[70px_1fr_auto] gap-4 items-center">

                <div
                  className={`w-16 h-16 rounded-lg ${cat.bg} flex items-center justify-center text-2xl text-white`}
                >
                  {cat.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {cat.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {cat.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs text-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={cat.link}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-medium whitespace-nowrap"
                >
                  Explore →
                </Link>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex justify-center sticky top-34">

        <div className="relative">

          {/* Glow */}
          <div className="absolute inset-0 bg-cyan-400/20 blur-[100px] rounded-full"></div>

          <img
            src="/Image/grp-stu.png"
            alt="Exam Preparation"
            className="relative w-full max-w-xl drop-shadow-2xl"
          />

        </div>

      </div>

    </div>

  </div>
</section>
  );
}
