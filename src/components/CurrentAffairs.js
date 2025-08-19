// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import Slider from "react-slick";
// import { CalendarDays } from "lucide-react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { MdOutlineArrowOutward } from "react-icons/md";


// export default function CurrentAffairsSlider() {
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


//   const currentAffairsData = [
//   {
//     id: 1,
//     title: "Government Announces New Policy for Renewable Energy",
//     image: "/Image/ca-1.jpg",
//     category: "Environment",
//     date: "2025-08-10",
//   },
//   {
//     id: 2,
//     title: "ISRO Successfully Launches New Satellite for Weather Monitoring",
//     image: "/Image/ca-2.jpg",
//     category: "Science",
//     date: "2025-08-09",
//   },
//   {
//     id: 3,
//     title: "New Educational Reforms to Improve Rural Schools",
//     image: "/Image/ca-3.jpg",
//     category: "Education",
//     date: "2025-08-08",
//   },
//   {
//     id: 4,
//     title: "Economic Growth Rate Hits Record High in 2025",
//     image: "/Image/ca-1.jpg",
//     category: "Economy",
//     date: "2025-08-07",
//   },
//   {
//     id: 5,
//     title: "Major Breakthrough in Cancer Research by Indian Scientists",
//     image: "/Image/ca-2.jpg",
//     category: "Health",
//     date: "2025-08-06",
//   },
// ];

//   return (
//    <div className="px-4 md:px-16 py-12 bg-gradient-to-b from-gray-50 to-white">
//   <div className="mb-6" data-aos="fade-up">
//     <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#204972]">
//       <span className="bg-clip-text bg-gradient-to-r md:ml-4 from-[#115D8E] to-[#204972]">
//         Stay Updated, Stay Ahead
//       </span>{' '}
//       with Latest Current Affairs
//     </h2>
//   </div>

//   <Slider {...settings}>
//     {currentAffairsData.map((item, index) => (
//       <div key={item.id} className="px-2 py-4" data-aos="fade-up" data-aos-delay={index * 100}>
//         <Link href="/current-affairs-detail">
//           <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white group border-l-4 border-[#115D8E]">
//             <div className="relative" data-aos="flip-right" data-aos-duration="1000">
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={200}
//                 height={400}
//                 className="w-full h-44 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
//               />
//               <span className="absolute top-3 left-3 bg-yellow-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow group-hover:bg-yellow-300 transition-colors duration-300">
//                 {item.category}
//               </span>
//             </div>
//             <div className="p-4">
//               <div className="flex items-center gap-2 text-gray-500 text-sm mb-2 group-hover:text-gray-700 transition-colors duration-300">
//                 <CalendarDays size={16} className="group-hover:scale-110 transition-transform duration-300" />
//                 {new Date(item.date).toLocaleDateString("en-GB", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </div>
//               <h2 className="text-base font-semibold line-clamp-2 mb-2 group-hover:text-[#115D8E] transition-colors duration-300">
//                 {item.title}
//               </h2>
//               <div className="inline-flex items-center text-[#115D8E] font-medium mt-2 group-hover:underline transition-all duration-300">
//                 Read More
//                 <MdOutlineArrowOutward className="ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
//               </div>
//             </div>
//           </div>
//         </Link>

//       </div>
//     ))}
//   </Slider>
// <div className="flex float-end">
//  <Link
//           href="#"
//           className="bg-[#204972] text-white px-8 py-2 rounded-md"
//         >
//           See All <span className="ml-1">→</span>
//         </Link>
// </div>
// </div>

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
import axiosInstance from "../app/axios/axiosInstance"; // Adjust the import path as necessary

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
        setAffairs(res.data);
      } catch (error) {
        console.error("Error fetching current affairs", error);
      }
    };
    fetchAffairs();
  }, []);

  return (
    <div className="px-4 md:px-16 py-12 bg-gradient-to-b from-gray-50 to-white">
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

      {affairs.length > 0 ? (
        <Slider {...settings}>
          {affairs.map((item, index) => (
            <div
              key={item._id}
              className="px-2 py-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Link href={`/current-affairs/${item.slug}`}>
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white group border-l-4 border-[#115D8E]">
                  <div
                    className="relative"
                    data-aos="flip-right"
                    data-aos-duration="1000"
                  >
                    <Image
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`
                      }
                      alt={item.title}
                      width={200}
                      height={400}
                      className="w-full h-44 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-yellow-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow group-hover:bg-yellow-300 transition-colors duration-300">
                      {item.category?.name}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      <CalendarDays
                        size={16}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                      {new Date(item.publishDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <h2 className="text-base font-semibold line-clamp-2 mb-2 group-hover:text-[#115D8E] transition-colors duration-300">
                      {item.title}
                    </h2>
                    <div className="inline-flex items-center text-[#115D8E] font-medium mt-2 group-hover:underline transition-all duration-300">
                      Read More
                      <MdOutlineArrowOutward className="ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No current affairs found.
        </div>
      )}

      {/* <div className="flex float-end mt-6 me-3">
        <Link
          href="/current-affairs"
          className="bg-[#204972] text-white px-8 py-2 rounded-md"
        >
          See All <span className="ml-1">→</span>
        </Link>
      </div> */}
    </div>
  );
}
