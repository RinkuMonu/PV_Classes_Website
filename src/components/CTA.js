"use client"
import Image from "next/image"
import Link from "next/link"

export default function OfferSection() {
  return (
    <section id="cta" className="w-full flex justify-center items-center px-4 sm:px-8 md:px-16 pt-4 pb-14">
      <div className="relative w-full max-w-7xl rounded-3xl p-1 sm:p-10 bg-gradient-to-br from-[#00316b] via-[#204972] to-[#616602] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#009FE3]/20 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#87B105]/20 to-transparent rounded-full blur-lg"></div>

        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#009FE3]/40 rounded-tl-lg"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#87B105]/40 rounded-br-lg"></div>

        <div className="relative z-10 w-full md:w-1/2 text-center md:text-left md:ml-16">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-[#009FE3]/20 text-white text-sm font-medium rounded-full border border-[#009FE3]/30">
              🎓 Special Offer
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mt-0 mt-5 leading-snug">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Upgrade Your Skills,
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#87B105] via-[#ABC129] to-[#87B105] bg-clip-text text-transparent">
              Upgrade Your Future!
            </span>
          </h3>

          <p className="text-base sm:text-lg mb-6 leading-relaxed text-blue-100">
            Get the most out of our teaching with Plus. Join thousands of successful students.
          </p>

          <button className="group relative bg-gradient-to-r from-white to-blue-50 text-[#00316b] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
            <Link href="/" className="relative z-10">Claim Your Free Month</Link>
            <div className="absolute inset-0 bg-gradient-to-r from-[#87B105] to-[#ABC129] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>

          <div className="mt-6 flex items-center justify-center md:justify-start gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#87B105] rounded-full"></span>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#009FE3] rounded-full"></span>
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#009FE3]/20 to-[#87B105]/20 rounded-full blur-2xl scale-110"></div>

            <Image
              src="/Image/cta-vector.png"
              alt="CTA Vector"
              width={700}
              height={700}
              className="relative z-10 w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] h-auto object-contain drop-shadow-2xl"
            />

            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#87B105] rounded-full flex items-center justify-center text-white text-sm animate-bounce">
              📚
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#009FE3] rounded-full flex items-center justify-center text-white text-xs animate-pulse">
              ⭐
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
