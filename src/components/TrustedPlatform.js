"use client";
import { FaUserGraduate, FaBook, FaVideo, FaFileAlt } from "react-icons/fa";

export default function TrustedPlatform() {
  const stats = [
    {
      number: "15Million+",
      label: "Happy Students",
      bg: "bg-orange-50",
      color: "bg-orange-400",
      icon: <FaUserGraduate className="text-5xl text-orange-400" />,
    },
    {
      number: "24000+",
      label: "Mock Tests",
      bg: "bg-pink-50",
      color: "bg-pink-400",
      icon: <FaBook className="text-5xl text-pink-400" />,
    },
    {
      number: "14000+",
      label: "Video Lectures",
      bg: "bg-blue-50",
      color: "bg-blue-400",
      icon: <FaVideo className="text-5xl text-blue-400" />,
    },
    {
      number: "80000+",
      label: "Practice Papers",
      bg: "bg-purple-50",
      color: "bg-purple-400",
      icon: <FaFileAlt className="text-5xl text-purple-400" />,
    },
  ];

  return (
    <section className="px-6 md:px-16 py-16">
      <h2 className="text-3xl text-[#204972] md:text-4xl font-bold text-center mb-3">
        A Platform Trusted by Students
      </h2>
      <p className="text-center text-gray-600 mb-12">
        PV Classes aims to transform not just through words, but provide results
        with numbers!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative group lg:h-[200px] lg:w-[265px] md:w-[230px] md:h-[200px] h-[158px] w-[158px] md:rounded-[16px] rounded-[4px] flex flex-col items-center lg:justify-center justify-center overflow-hidden ${stat.bg} transition-transform hover:scale-105`}
          >

            <div
              className={`absolute top-0 left-0 h-1 w-0 ${stat.color} group-hover:w-full transition-all duration-500 ease-out`}
            ></div>


            <div className="transition-all duration-300 ease-out group-hover:-translate-y-4 text-center">
              <h3 className="text-4xl font-bold">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>


            <div className="absolute top-30 transform w-full h-[40px] bg-center bg-contain bg-no-repeat opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
