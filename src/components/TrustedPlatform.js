"use client";
import Image from "next/image";

export default function TrustedPlatform() {
  const stats = [
    {
      number: "15Million+",
      label: "Happy Students",
      bg: "bg-orange-50",
      color: "bg-orange-400",
      img: "/Image/student.png"
    },
    {
      number: "24000+",
      label: "Mock Tests",
      bg: "bg-pink-50",
      color: "bg-pink-400",
     img: "/Image/mocktest.png",
    },
    {
      number: "14000+",
      label: "Video Lectures",
      bg: "bg-blue-50",
      color: "bg-blue-400",
      img: "/Image/videolecture.png",
    },
    {
      number: "80000+",
      label: "Practice Papers",
      bg: "bg-purple-50",
      color: "bg-purple-400",
      img: "/Image/practisepaper.png",
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-16">

      <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#204972] font-bold text-center mb-3">
        A Platform Trusted by Students
      </h2>
      <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-10 md:mb-12 max-w-2xl mx-auto">
        PV Classes aims to transform not just through words, but provide results
        with numbers!
      </p>


      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 place-items-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative group flex flex-col items-center justify-center
              rounded-lg sm:rounded-xl md:rounded-2xl
              w-full max-w-[180px] sm:max-w-[200px] md:max-w-[230px] lg:max-w-[260px]
              h-[140px] sm:h-[160px] md:h-[180px] lg:h-[260px]
              ${stat.bg} transition-transform duration-300 hover:scale-105 overflow-hidden`}
          >

            <div
              className={`absolute top-0 left-0 h-1 w-0 ${stat.color} group-hover:w-full transition-all duration-500 ease-out`}
            ></div>


            <div className="transition-all duration-300 ease-out group-hover:-translate-y-3 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                {stat.number}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                {stat.label}
              </p>
            </div>


           <div className="absolute bottom-3 sm:bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex justify-center">
  <Image
    src={stat.img}
    alt={stat.label}
    width={100}
    height={100}
    className="h-auto object-contain"
  />
</div>
          </div>
        ))}
      </div>
    </section>
  );
}
