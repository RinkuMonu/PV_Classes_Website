"use client"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState, useEffect } from "react"

export default function FacultySlider() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Update on mount + resize
    const handleResize = () => setIsMobile(window.innerWidth < 768) // md breakpoint
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  }

  // Desktop images
  const desktopImages = [
    "/Image/Banner/faculty-1.webp",
    "/Image/Banner/faculty-2.webp",
    "/Image/Banner/faculty-3.webp",
    "/Image/Banner/faculty-4.webp",
  ]

  // Mobile images
  const mobileImages = [
    "/Image/pv-mobile/faculty1-mob.webp",
    "/Image/pv-mobile/faculty2-mob.webp",
    "/Image/pv-mobile/faculty3-mob.webp",
    "/Image/pv-mobile/faculty4-mob.webp",
  ]

  const bannerImages = isMobile ? mobileImages : desktopImages

  return (
    <div className="w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#009FE3]/20">
          <div>
            <h2 className="text-3xl font-bold text-[#00316B] mb-2">Meet Our Expert Faculty</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full"></div>
          </div>
        </div>

        <div className="relative bg-white rounded-2xl shadow-2xl border border-[#009FE3]/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00316B] via-[#009FE3] to-[#0281AD]"></div>

          <Slider {...settings}>
            {bannerImages.map((src, index) => (
              <div key={index} className="relative w-full h-[366px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00316B]/20 via-transparent to-[#009FE3]/10 z-10"></div>
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Faculty Banner ${index + 1}`}
                  fill
                  priority
                  className="object-cover lg:object-contain md:object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-[#87B105] to-[#ABC129] rounded-full opacity-80 z-20"></div>
              </div>
            ))}
          </Slider>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00316B] via-[#009FE3] to-[#87B105]"></div>
        </div>

        <div className="text-center mt-6 p-4 bg-gradient-to-r from-[#009FE3]/5 to-[#87B105]/5 rounded-xl border border-[#009FE3]/10">
          <p className="text-[#204972] font-medium text-sm leading-relaxed">
            Learn from industry experts and experienced educators who bring real-world knowledge to your learning journey
          </p>
        </div>
      </div>

      <style jsx global>{`
        .slick-dots {
          bottom: 25px !important;
        }
        .slick-dots li {
          margin: -8px 8px !important;
        }
        .slick-dots li button:before {
          color: #00316B !important;
          font-size: 14px !important;
          opacity: 0.6 !important;
          transition: all 0.3s ease !important;
        }
        .slick-dots li.slick-active button:before {
          color: #87B105 !important;
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
        .slick-dots li button:hover:before {
          opacity: 1 !important;
          transform: scale(1.1) !important;
        }
      `}</style>
    </div>
  )
}
