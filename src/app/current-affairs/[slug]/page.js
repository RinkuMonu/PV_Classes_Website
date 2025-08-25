

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useRef, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Slider from "react-slick";
// import { CalendarDays } from "lucide-react";
// import { MdOutlineArrowOutward } from "react-icons/md";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axiosInstance from "../../axios/axiosInstance";

// export default function CurrentAffairsDetails() {
//   const { slug } = useParams();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const sectionRefs = useRef([]);
//   const scrollToSection = (index) => {
//     sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
//   };

//   const [topPosts, setTopPosts] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [recentAffairs, setRecentAffairs] = useState([]);

//   // Slider settings
//   const sliderSettings = {
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

//   // Fetch article, top posts, tags
//   useEffect(() => {
//     if (!slug) return;

//     const fetchData = async () => {
//       try {
//         const res = await axiosInstance.get(`/current-affairs/${slug}`);
//         setArticle(res.data);

//         const topPostsRes = await axiosInstance.get(`/current-affairs`, {
//           params: { limit: 5 },
//         });
//         setTopPosts(topPostsRes.data);

//         setTags(res.data.tags || []);
//       } catch (error) {
//         console.error("Error fetching article:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [slug]);

//   // Fetch 3 latest current affairs for "Recently" section
//   useEffect(() => {
//     const fetchRecent = async () => {
//       try {
//         const res = await axiosInstance.get("/current-affairs", {
//           params: { status: "published", latest: true, limit: 3 },
//         });
//         setRecentAffairs(res.data);
//       } catch (error) {
//         console.error("Error fetching recent affairs", error);
//       }
//     };
//     fetchRecent();
//   }, []);

//   if (loading) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   if (!article) {
//     return <div className="p-10 text-center">Article not found.</div>;
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="max-w-7xl mx-auto p-4 md:flex gap-6">
//         {/* Main content */}
//         <div className="flex-1 overflow-hidden">
//           {/* Title */}
//           <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
//           <div className="text-gray-400 font-semibold text-sm mb-6">
//             {article.category?.name} •{" "}
//             {new Date(article.publishDate).toLocaleDateString()} •
//             {article.readTime || "3 Min Read"}
//           </div>

//           <div className="mb-6 relative w-full aspect-[16/9]">
//             <Image
//               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${article.image}`}
//               alt={article.title}
//               fill
//               className="rounded-md object-cover"
//               priority
//               sizes="100vw"
//             />
//           </div>

//           {/* Table of Contents */}
//           {article.sections && article.sections.length > 0 && (
//             <div className="p-5 rounded-xl mb-6 shadow-md border border-gray-200">
//               <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h8m-8 6h16"
//                   />
//                 </svg>
//                 Table of Contents
//               </h2>
//               <ul className="space-y-2">
//                 {article.sections.map((sec, idx) => (
//                   <li
//                     key={idx}
//                     className="group flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-sm hover:-translate-y-[1px]"
//                     onClick={() => scrollToSection(idx)}
//                   >
//                     <span className="flex-1 text-gray-700 group-hover:text-black transition-colors font-medium">
//                       {sec.heading}
//                     </span>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Article Sections */}
//           {article.sections ? (
//             article.sections.map((sec, idx) => (
//               <div
//                 key={idx}
//                 ref={(el) => (sectionRefs.current[idx] = el)}
//                 className="mb-6 scroll-mt-20"
//               >
//                 <h2 className="text-xl font-semibold mb-2">{sec.heading}</h2>
//                 {sec.content.map((p, i) => (
//                   <p key={i} className="mb-2 text-gray-700">
//                     {p}
//                   </p>
//                 ))}
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-700">{article.content}</p>
//           )}


//         </div>

//         {/* Sidebar */}
//         <aside className="w-full md:w-80 flex-shrink-0 mt-10 md:mt-3">
//           <div className="sticky top-24">
//             {/* Top Posts */}
//             <div className="mb-6 bg-gray-50 rounded-2xl shadow p-4">
//               <h3 className="font-semibold text-lg mb-4">Top Posts</h3>
//               <div className="space-y-4">
//                 {topPosts.map((post) => (
//                   <Link
//                     key={post._id}
//                     href={`/current-affairs/${post.slug}`}
//                     className="flex gap-3 border-b border-gray-200 pb-4 last:border-0"
//                   >
//                     <Image
//                       width={40}
//                       height={40}
//                       src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.image}`}
//                       alt={post.title}
//                       className="w-16 h-16 object-cover rounded-md flex-shrink-0"
//                     />
//                     <div className="flex flex-col justify-between w-full">
//                       <div className="flex items-center justify-between">
//                         <span className="bg-yellow-100 text-yellow-600 font-semibold text-xs px-2 py-0.5 rounded-md truncate max-w-[110px]">
//                           {post.category?.name}
//                         </span>
//                         <span className="text-gray-400 text-xs font-semibold">
//                           {new Date(post.publishDate).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <p className="text-sm font-medium hover:underline cursor-pointer line-clamp-2">
//                         {post.title}
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Popular Tags */}
//             <div className="bg-gray-50 rounded-2xl shadow p-4">
//               <h3 className="font-semibold text-lg mb-4">Popular Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {tags.map((tag, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600 rounded-full hover:bg-gray-200"
//                   >
//                     {tag}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </aside>



//       </div>


//            {/* Recently Current Affairs Section */}
//           <div className="m-12">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#204972]">
//               Recently Current Affairs
//             </h2>
//             {recentAffairs.length > 0 ? (
//               <Slider {...sliderSettings}>
//                 {recentAffairs.map((item, index) => (
//                   <div key={item._id} className="px-2 py-4">
//                     <Link href={`/current-affairs/${item.slug}`}>
//                       <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white group border-l-4 border-[#115D8E]">
//                         <div className="relative">
//                           <Image
//                             src={
//                               item.image.startsWith("http")
//                                 ? item.image
//                                 : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`
//                             }
//                             alt={item.title}
//                             width={200}
//                             height={400}
//                             className="w-full h-44 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
//                           />
//                           <span className="absolute top-3 left-3 bg-yellow-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow group-hover:bg-yellow-300 transition-colors duration-300">
//                             {item.category?.name}
//                           </span>
//                         </div>
//                         <div className="p-4">
//                           <div className="flex items-center gap-2 text-gray-500 text-sm mb-2 group-hover:text-gray-700 transition-colors duration-300">
//                             <CalendarDays size={16} />
//                             {new Date(item.publishDate).toLocaleDateString(
//                               "en-GB",
//                               {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                               }
//                             )}
//                           </div>
//                           <h2 className="text-base font-semibold line-clamp-2 mb-2 group-hover:text-[#115D8E] transition-colors duration-300">
//                             {item.title}
//                           </h2>
//                           <div className="inline-flex items-center text-[#115D8E] font-medium mt-2 group-hover:underline transition-all duration-300">
//                             Read More
//                             <MdOutlineArrowOutward className="ml-1" />
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </Slider>
//             ) : (
//               <div className="text-center text-gray-500 mt-10">
//                 No recent affairs found.
//               </div>
//             )}
//           </div>

//     </div>
//   );
// }





"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Slider from "react-slick";
import { CalendarDays, Clock, ArrowRight, BookOpen, Tag, TrendingUp } from "lucide-react";
import { MdOutlineArrowOutward } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../../axios/axiosInstance";

export default function CurrentAffairsDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const sectionRefs = useRef([]);
  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const [topPosts, setTopPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [recentAffairs, setRecentAffairs] = useState([]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Fetch article, top posts, tags
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/current-affairs/${slug}`);
        setArticle(res.data);

        const topPostsRes = await axiosInstance.get(`/current-affairs`, {
          params: { limit: 5 },
        });
        setTopPosts(topPostsRes.data);

        setTags(res.data.tags || []);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Fetch 3 latest current affairs for "Recently" section
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axiosInstance.get("/current-affairs", {
          params: { status: "published", latest: true, limit: 3 },
        });
        setRecentAffairs(res.data);
      } catch (error) {
        console.error("Error fetching recent affairs", error);
      }
    };
    fetchRecent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00316B]"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <div className="text-6xl mb-4">📰</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or may have been moved.</p>
        <Link href="/current-affairs" className="px-6 py-3 bg-[#00316B] text-white rounded-lg hover:bg-blue-800 transition">
          Browse Current Affairs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:text-[#00316B] transition">Home</Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link href="/current-affairs" className="hover:text-[#00316B] transition">Current Affairs</Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li className="text-[#00316B] font-medium">{article.title}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Article Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
                  {article.category?.name}
                </span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <CalendarDays size={14} />
                  {new Date(article.publishDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Clock size={14} />
                  {article.readTime || "3"} Min Read
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>

              <div className="w-full aspect-video relative rounded-lg overflow-hidden mb-6">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${article.image}`}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Table of Contents */}
            {article.sections && article.sections.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={20} className="text-[#204972]" />
                  <h2 className="text-xl font-semibold text-gray-900">Table of Contents</h2>
                </div>
                <div className="space-y-2">
                  {article.sections.map((sec, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToSection(idx)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <span className="text-left font-medium text-gray-700 group-hover:text-blue-800 transition-colors">
                        {sec.heading}
                      </span>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-[#204972] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Article Sections */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              {article.sections ? (
                article.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    ref={(el) => (sectionRefs.current[idx] = el)}
                    className="mb-8 scroll-mt-20 last:mb-0"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                      {sec.heading}
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      {sec.content.map((p, i) => (
                        <p key={i} className="mb-4 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>{article.content}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Top Posts */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} className="text-[#204972]" />
                  <h3 className="font-semibold text-lg text-gray-900">Top Posts</h3>
                </div>
                <div className="space-y-4">
                  {topPosts.map((post, index) => (
                    <Link
                      key={post._id}
                      href={`/current-affairs/${post.slug}`}
                      className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all group"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.image}`}
                          alt={post.title}
                          fill
                          className="object-cover rounded-md"
                        />
                        <div className="absolute -top-1 -left-1 w-5 h-5 bg-[#204972] text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-md mb-1 inline-block">
                          {post.category?.name}
                        </span>
                        <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#204972] transition-colors">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <CalendarDays size={12} />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={20} className="text-[#204972]" />
                  <h3 className="font-semibold text-lg text-gray-900">Popular Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </aside>
        </div>

        {/* Recently Current Affairs Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Recently Added
            </h2>
            <Link
              href="/current-affairs"
              className="flex items-center text-[#204972] bg-green-200 p-2 font-medium transition-colors"
            >
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {recentAffairs.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Slider {...sliderSettings}>
                {recentAffairs.map((item) => (
                  <div key={item._id} className="px-3">
                    <Link href={`/current-affairs/${item.slug}`}>
                      <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-200">
                        <div className="relative overflow-hidden">
                          <Image
                            src={item.image.startsWith("http")
                              ? item.image
                              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`}
                            alt={item.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                              {item.category?.name}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                            <CalendarDays size={12} />
                            {new Date(item.publishDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-[#204972] transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center text-[#204972] font-medium text-sm group-hover:underline">
                            Read More
                            <MdOutlineArrowOutward className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📰</div>
              <p className="text-gray-500">No recent affairs found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}