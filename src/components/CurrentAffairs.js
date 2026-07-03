

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { CalendarDays } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineArrowOutward } from "react-icons/md";
import axiosInstance from "../app/axios/axiosInstance";

export default function CurrentAffairsSlider() {

  const [affairs, setAffairs] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const fetchAffairs = async () => {
      try {
        const res = await axiosInstance.get("/current-affairs", {
          params: { status: "published", latest: true },
        });
        setAffairs(res?.data || []);
      } catch (error) {
        console.error("Error fetching current affairs", error);
      }
    };
    fetchAffairs();
  }, []);

  return (
    <section className="md:py-14">
      <div className="px-4 py-12  bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00316B]/5 via-transparent to-[#87B105]/5"></div>
        <div className="mb-6 px-4 md:px-0 flex justify-between items-center" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#204972]">
            <span className="bg-clip-text bg-gradient-to-r md:ml-4 from-[#115D8E] to-[#204972]">
              Stay Updated, Stay Ahead
            </span>{" "}
            with Latest Current Affairs
          </h3>
          <div className="flex justify-center">
            {/* <Link
              href="/current-affairs"
              className="bg-[#204972] text-white px-4 sm:px-6 md:px-8 py-2 cursor-pointer rounded-md whitespace-nowrap text-sm sm:text-base"
            >
              See All <span className="ml-1">→</span>
            </Link> */}
          </div>

        </div>
     

        {affairs?.length > 0 ? (
          <div className="relative">
            <Slider {...settings}>
              {affairs?.map((item, index) => (
              <div
  key={item?._id || index}
  className="px-3 py-4"
  data-aos="fade-up"
  data-aos-delay={index * 100}
>
  <Link href={`/current-affairs/${item?.slug || ""}`}>
    <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#204972]/20 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      
      {/* Image */}
      <div className="relative h-56 bg-slate-50 border-b border-gray-100 overflow-hidden">
        <Image
          src={item.full_image}
          alt={item?.title || "Current Affair"}
          fill
          className="object-cover p-3 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <span className="absolute top-4 left-4 bg-white border border-gray-200 text-[#204972] text-xs font-medium px-3 py-1.5 rounded-md shadow-sm">
          {item?.category?.name || "General"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <CalendarDays size={15} />
          <span>
            {item?.publishDate
              ? new Date(item.publishDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "No Date"}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-7 mb-4">
          {item?.title || "Untitled"}
        </h2>

        {/* Read More */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="inline-flex items-center gap-2 text-[#204972] font-medium group-hover:text-[#0281AD] transition-colors">
            Read Article
            <MdOutlineArrowOutward className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </article>
  </Link>
</div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#009FE3]/20 shadow-lg max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="text-white" size={24} />
              </div>
              <p className="text-[#204972] text-lg font-medium">
                No current affairs found.
              </p>
              <p className="text-[#00316B]/60 text-sm mt-2">
                Check back later for updates.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
