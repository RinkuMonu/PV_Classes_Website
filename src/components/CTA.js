"use client"
import Image from "next/image"
import Link from "next/link"

export default function OfferSection() {
  return (
    <section
      id="cta"
      className="w-full flex justify-center items-center px-4 sm:px-8 md:px-12 lg:px-16 pt-6 pb-16"
    >
    <div className="relative w-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl text-white">

  {/* Background Image */}
  <Image
    src="/Image/rural-bg.png" // your background image path
    alt="CTA Background"
    fill
    priority
    className="object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#00316b]/95 via-black/80 to-transparent"></div>

  {/* Content */}
  <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">

    {/* Left Text Section */}
    <div className="w-full md:w-1/2 text-center md:text-left md:ml-6 lg:ml-16">
      {/* Tag */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-[#009FE3]/20 text-white text-xs sm:text-sm font-medium rounded-full border border-[#009FE3]/30">
          🎓 Special Offer
        </span>
      </div>

      {/* Heading */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
        <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
          Upgrade Your Skills,
        </span>
        <br className="hidden sm:block" />
        <span className="bg-gradient-to-r from-[#87B105] via-[#ABC129] to-[#87B105] bg-clip-text text-transparent">
          Upgrade Your Future!
        </span>
      </h3>

      <p className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed text-blue-100 max-w-xl mx-auto md:mx-0">
        Get the most out of our teaching with Plus. Join thousands of successful students.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-blue-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#87B105] rounded-full"></span>
          <span>No Credit Card Required</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#009FE3] rounded-full"></span>
          <span>Cancel Anytime</span>
        </div>
      </div>
    </div>

  </div>
</div>
    </section>
  )
}
