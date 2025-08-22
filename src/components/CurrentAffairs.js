// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import Slider from "react-slick";
// import { CalendarDays } from "lucide-react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { MdOutlineArrowOutward } from "react-icons/md";
// import axiosInstance from "../app/axios/axiosInstance";

// export default function CurrentAffairsSlider() {
//   const [affairs, setAffairs] = useState([]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 640, settings: { slidesToShow: 1 } },
//     ],
//   };

//   useEffect(() => {
//     const fetchAffairs = async () => {
//       try {
//         const res = await axiosInstance.get("/current-affairs", {
//           params: { status: "published", latest: true },
//         });
//         setAffairs(res.data);
//       } catch (error) {
//         console.error("Error fetching current affairs", error);
//       }
//     };
//     fetchAffairs();
//   }, []);

//   return (
//    <section className="md:py-18">
//      <div className="px-4 md:px-16 py-12  bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-r from-[#00316B]/5 via-transparent to-[#87B105]/5"></div>
//       <div className="mb-6 px-4 md:px-0 flex justify-between items-center" data-aos="fade-up">
//         <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#204972]">
//           <span className="bg-clip-text bg-gradient-to-r md:ml-4 from-[#115D8E] to-[#204972]">
//             Stay Updated, Stay Ahead
//           </span>{" "}
//           with Latest Current Affairs
//         </h3>
//         <div className="">
//           <Link
//             href="/current-affairs"
//             className="bg-[#204972] text-white px-8 py-2 rounded-md"
//           >
//             See All <span className="ml-1">→</span>
//           </Link>
//         </div>
//       </div>
//       <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#009FE3]/10 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#616602]/10 to-transparent rounded-full blur-3xl"></div>

//       {affairs.length > 0 ? (
//         <div className="relative">
//           <Slider {...settings}>
//             {affairs.map((item, index) => (
//               <div
//                 key={item._id}
//                 className="px-3 py-4"
//                 data-aos="fade-up"
//                 data-aos-delay={index * 100}
//               >
//                 <Link href={`/current-affairs/${item.slug}`}>
//                   <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group border border-[#009FE3]/20 hover:border-[#0281AD]/40 backdrop-blur-sm">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00316B]/5 via-transparent to-[#87B105]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                     <div
//                       className="relative"
//                       data-aos="flip-right"
//                       data-aos-duration="1000"
//                     >
//                       <div className="overflow-hidden rounded-t-2xl">
//                         <Image
//                           src={
//                             item.image.startsWith("http")
//                               ? item.image
//                               : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`
//                           }
//                           alt={item.title}
//                           width={200}
//                           height={400}
//                           className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                       </div>
//                       <span className="absolute top-4 left-4 bg-gradient-to-r from-[#ABC129] to-[#87B105] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 border border-white/20">
//                         {item.category?.name}
//                       </span>
//                       <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-[#009FE3]/20 group-hover:border-t-[#0281AD]/30 transition-colors duration-300"></div>
//                     </div>

//                     <div className="p-6 relative flex flex-col min-h-[190px] h-full">
//                       {/* date */}
//                       <div className="flex items-center gap-2 text-[#204972] text-sm mb-3 group-hover:text-[#00316B] transition-colors duration-300">
//                         <CalendarDays
//                           size={16}
//                           className="group-hover:scale-110 transition-transform duration-300 text-[#0281AD]"
//                         />
//                         {new Date(item.publishDate).toLocaleDateString(
//                           "en-GB",
//                           {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           }
//                         )}
//                       </div>


//                       <h2 className="text-lg font-bold line-clamp-2 mb-4 text-[#00316B] group-hover:text-[#204972] transition-colors duration-300 leading-tight">
//                         {item.title}
//                       </h2>


//                       <div className="mt-auto">
//                         <div className="inline-flex items-center text-[#0281AD] font-semibold group-hover:text-[#009FE3] transition-all duration-300">
//                           Read More
//                           <MdOutlineArrowOutward className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
//                         </div>
//                         <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#009FE3] to-[#0281AD] group-hover:w-full transition-all duration-500"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       ) : (
//         <div className="text-center py-16">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#009FE3]/20 shadow-lg max-w-md mx-auto">
//             <div className="w-16 h-16 bg-gradient-to-r from-[#009FE3] to-[#0281AD] rounded-full flex items-center justify-center mx-auto mb-4">
//               <CalendarDays className="text-white" size={24} />
//             </div>
//             <p className="text-[#204972] text-lg font-medium">
//               No current affairs found.
//             </p>
//             <p className="text-[#00316B]/60 text-sm mt-2">
//               Check back later for updates.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//    </section>
//   );
// }



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
    <section className="md:py-18">
      <div className="px-4 md:px-16 py-12  bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00316B]/5 via-transparent to-[#87B105]/5"></div>
        <div className="mb-6 px-4 md:px-0 flex justify-between items-center" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#204972]">
            <span className="bg-clip-text bg-gradient-to-r md:ml-4 from-[#115D8E] to-[#204972]">
              Stay Updated, Stay Ahead
            </span>{" "}
            with Latest Current Affairs
          </h3>
          <div className="">
            <Link
              href="/current-affairs"
              className="bg-[#204972] text-white px-8 py-2 rounded-md"
            >
              See All <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#009FE3]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#616602]/10 to-transparent rounded-full blur-3xl"></div>

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
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group border border-[#009FE3]/20 hover:border-[#0281AD]/40 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00316B]/5 via-transparent to-[#87B105]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div
                        className="relative"
                        data-aos="flip-right"
                        data-aos-duration="1000"
                      >
                        <div className="overflow-hidden rounded-t-2xl">
                          <Image
                            src={
                              item?.image?.startsWith("http")
                                ? item?.image
                                : item?.image
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item?.image}`
                                : "/vercel.svg"
                            }
                            alt={item?.title || "Current Affair"}
                            width={200}
                            height={400}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-[#ABC129] to-[#87B105] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 border border-white/20">
                          {item?.category?.name || "General"}
                        </span>
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-[#009FE3]/20 group-hover:border-t-[#0281AD]/30 transition-colors duration-300"></div>
                      </div>

                      <div className="p-6 relative flex flex-col min-h-[190px] h-full">
                        {/* date */}
                        <div className="flex items-center gap-2 text-[#204972] text-sm mb-3 group-hover:text-[#00316B] transition-colors duration-300">
                          <CalendarDays
                            size={16}
                            className="group-hover:scale-110 transition-transform duration-300 text-[#0281AD]"
                          />
                          {item?.publishDate
                            ? new Date(item?.publishDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "No Date"}
                        </div>

                        <h2 className="text-lg font-bold line-clamp-2 mb-4 text-[#00316B] group-hover:text-[#204972] transition-colors duration-300 leading-tight">
                          {item?.title || "Untitled"}
                        </h2>

                        <div className="mt-auto">
                          <div className="inline-flex items-center text-[#0281AD] font-semibold group-hover:text-[#009FE3] transition-all duration-300">
                            Read More
                            <MdOutlineArrowOutward className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </div>
                          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#009FE3] to-[#0281AD] group-hover:w-full transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>
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
