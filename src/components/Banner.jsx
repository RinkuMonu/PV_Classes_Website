// "use client"
// import { useEffect, useState } from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Autoplay, Pagination, Navigation } from "swiper/modules"
// import "swiper/css"
// import "swiper/css/pagination"
// import "swiper/css/navigation"
// import "swiper/css/autoplay"
// import axiosInstance from "../app/axios/axiosInstance"

// const Banner = () => {
//   const slugify = (text) => text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-")

//   const [banners, setBanners] = useState([])
//   const [deviceType, setDeviceType] = useState()
//   const [categories, setCategories] = useState([])
//   const [isNewArrival, setIsNewArrival] = useState(false)

//   useEffect(() => {
//     const checkDevice = () => {
//       const isMobile = window.innerWidth <= 768
//       setDeviceType(isMobile ? "mobile" : "desktop")
//     }

//     checkDevice()
//     window.addEventListener("resize", checkDevice)
//     return () => window.removeEventListener("resize", checkDevice)
//   }, [])

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const endpoint = deviceType === "mobile" ? "mobile" : "desktop"
//         const res = await axiosInstance.get(`/banners/${endpoint}`)
//         const data = res.data
//         const filtered = (data.banners || []).filter((item) => item.deviceType === deviceType)
//         setBanners(filtered)
//       } catch (err) {
//         console.error("Failed to fetch banners", err)
//       }
//     }

//     fetchBanners()
//   }, [deviceType])

//   if (banners.length === 0) return null

//   return (
//     <section className="relative w-full bg-gradient-to-br from-background via-muted/30 to-background">
//       <div className="relative overflow-hidden rounded-2xl mx-4 my-6 shadow-2xl border border-border/20">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={0}
//           loop={true}
//           pagination={{
//             clickable: true,
//             dynamicBullets: true,
//           }}
//           navigation={{
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           }}
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay, Pagination, Navigation]}
//           className="w-full h-auto rounded-2xl"
//         >
//           {banners.map((item) => (
//             <SwiperSlide key={item._id}>
//               <div className="relative w-full h-auto group">
//                 <img
//                   src={item.full_image || "/placeholder.svg"}
//                   alt={item.bannerName}
//                   className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
//                   loading="eager"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl" />
//                 <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
//                   Featured Course
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//           <div className="swiper-button-prev hidden sm:flex" />
//           <div className="swiper-button-next hidden sm:flex" />
//         </Swiper>
//         <style jsx global>{`
//           .swiper-pagination {
//             bottom: 24px !important;
//           }

//           .swiper-pagination-bullet {
//             width: 12px;
//             height: 12px;
//             background: rgba(255, 255, 255, 0.3);
//             border: 2px solid rgba(255, 255, 255, 0.5);
//             border-radius: 50%;
//             margin: 0 8px;
//             opacity: 1;
//             transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           }

//           .swiper-pagination-bullet-active {
//             width: 32px;
//             background: #15803d;
//             border-radius: 8px;
//             border-color: #15803d;
//             box-shadow: 0 4px 12px rgba(21, 128, 61, 0.4);
//           }

//           .swiper-button-next,
//           .swiper-button-prev {
//             width: 56px;
//             height: 56px;
//             background: rgba(255, 255, 255, 0.95);
//             border-radius: 50%;
//             border: 2px solid #15803d;
//             backdrop-filter: blur(20px);
//             transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//             box-shadow: 0 8px 32px rgba(21, 128, 61, 0.15);
//           }

//           .swiper-button-next:hover,
//           .swiper-button-prev:hover {
//             background: #15803d;
//             border-color: #15803d;
//             transform: scale(1.1);
//             box-shadow: 0 12px 40px rgba(21, 128, 61, 0.3);
//           }

//           .swiper-button-next:after,
//           .swiper-button-prev:after {
//             font-size: 20px;
//             color: #15803d;
//             font-weight: bold;
//             transition: color 0.3s ease;
//           }

//           .swiper-button-next:hover:after,
//           .swiper-button-prev:hover:after {
//             color: white;
//           }
//         `}</style>
//       </div>
//     </section>
//   )
// }

// export default Banner




"use client"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import axiosInstance from "../app/axios/axiosInstance"

const Banner = () => {
  const slugify = (text) =>
    text?.toLowerCase()?.replace(/&/g, "and")?.replace(/\s+/g, "-") || ""

  const [banners, setBanners] = useState([])
  const [deviceType, setDeviceType] = useState()
  const [categories, setCategories] = useState([])
  const [isNewArrival, setIsNewArrival] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth <= 768
      setDeviceType(isMobile ? "mobile" : "desktop")
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const endpoint = deviceType === "mobile" ? "mobile" : "desktop"
        const res = await axiosInstance.get(`/banners/${endpoint}`)
        const data = res?.data || {}
        const filtered = (data?.banners || [])?.filter(
          (item) => item?.deviceType === deviceType
        )
        setBanners(filtered || [])
      } catch (err) {
        console.error("Failed to fetch banners", err)
      }
    }

    if (deviceType) {
      fetchBanners()
    }
  }, [deviceType])

  if (!banners || banners?.length === 0) return null

  return (
    <section className="relative w-full bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="relative overflow-hidden rounded-2xl mx-4 my-6 shadow-2xl border border-border/20">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-auto rounded-2xl"
        >
          {banners?.map((item) => (
            <SwiperSlide key={item?._id || Math.random()}>
              <div className="relative w-full h-auto group">
                <img
                  src={item?.full_image || "/placeholder.svg"}
                  alt={item?.bannerName || "Banner"}
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl" />
                <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                  Featured Course
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev hidden sm:flex" />
          <div className="swiper-button-next hidden sm:flex" />
        </Swiper>
        <style jsx global>{`
          .swiper-pagination {
            bottom: 24px !important;
          }

          .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            margin: 0 8px;
            opacity: 1;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .swiper-pagination-bullet-active {
            width: 32px;
            background: #15803d;
            border-radius: 8px;
            border-color: #15803d;
            box-shadow: 0 4px 12px rgba(21, 128, 61, 0.4);
          }

          .swiper-button-next,
          .swiper-button-prev {
            width: 56px;
            height: 56px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 50%;
            border: 2px solid #15803d;
            backdrop-filter: blur(20px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 32px rgba(21, 128, 61, 0.15);
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: #15803d;
            border-color: #15803d;
            transform: scale(1.1);
            box-shadow: 0 12px 40px rgba(21, 128, 61, 0.3);
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 20px;
            color: #15803d;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .swiper-button-next:hover:after,
          .swiper-button-prev:hover:after {
            color: white;
          }
        `}</style>
      </div>
    </section>
  )
}

export default Banner
