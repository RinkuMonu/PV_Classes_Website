import Image from "next/image"
import Link from "next/link"

export default function CourseEnroll() {
  return (
    <div className="px-4 md:px-6 lg:px-10 py-8">
    <section className="relative overflow-hidden rounded-[32px] bg-black p-8 md:p-12 shadow-2xl">
  {/* Background Decorations */}
  <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#87b105]/20 blur-3xl"></div>
  <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
    
    {/* Left Content */}
    <div className="text-center lg:text-left">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
        🚀 Start Your Preparation Today
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        Course select kar tayyari ki
        <span className="block text-[#c8e84b]">
          shuruaat karen...!
        </span>
      </h2>

      <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl">
        Paayen Free Resources Current Affairs aur notes PDFs,
        Test Series, Video Lectures aur bhi bahut kuch...
      </p>

      <div className="mt-8">
        <Link href="/courses">
          <button className="group inline-flex items-center gap-3 bg-[#87b105] hover:bg-[#9bc80a] text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-xl transition-all duration-300 hover:-translate-y-1">
            Get Started

            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>

    {/* Right Image */}
    <div className="relative flex justify-center">
      
      {/* Glow */}
      <div className="absolute h-[320px] w-[320px] rounded-full blur-[90px]"></div>

      {/* Glass Card */}
      <div className="relative  backdrop-blur-md  ">
        <Image
          src="/Image/Banner/facultiesgrp.jpeg"
          alt="Course Illustration"
          width={450}
          height={450}
          className="relative z-10 max-w-full rounded-full h-auto"
        />

      

     
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
