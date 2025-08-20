
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axiosInstance from "../../axios/axiosInstance";
// import { FiCheck, FiClock, FiDownload, FiTablet, FiTv, FiAward, FiPlay } from "react-icons/fi";

// export default function CourseDetailsPage() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [openVideo, setOpenVideo] = useState(null);

//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     const fetchCourse = async () => {
//       try {
//         const res = await axiosInstance.get(`/courses/${id}`);
//         setCourse(res.data);
//       } catch (err) {
//         console.error("Error fetching course:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourse();
//   }, [id]);

//   if (loading) return <div className="p-10 text-center">Loading...</div>;
//   if (!course) return <div className="p-10 text-center">Course not found</div>;

//   return (
//     <section className="relative z-10 pt-10 md:pt-6 bg-gray-50 min-h-screen">
//       <div className="mx-auto max-w-[1160px] px-4 py-8 flex flex-col md:flex-row gap-8">
//         {/* Main Content */}
//         <div className="w-full md:w-2/3 space-y-8">
//           {/* Course Header */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex flex-col md:flex-row gap-6">
//               {course?.imagesFullPath?.[0] && (
//                 <img
//                   src={course.imagesFullPath[0]}
//                   alt={course.title}
//                   className="w-full md:w-64 h-48 object-cover rounded-lg"
//                 />
//               )}
//               <div className="flex-1">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">{course?.title}</h1>
//                 <p className="text-gray-600 mb-4">{course?.shortDescription}</p>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                     <span className="font-bold">4.5</span>
//                     <span>★★★★★</span>
//                     <span>(35,000)</span>
//                   </span>
//                   <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//                     773,391 learners
//                   </span>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
//                     {course?.isFree ? "FREE" : `₹${course?.price}`}
//                   </span>
//                   <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
//                     Validity: {course?.validity || "N/A"}
//                   </span>
//                   <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
//                     Language: {course?.language}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* What You'll Learn */}
// <div className="bg-white rounded-xl shadow-sm p-6">
//   <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//     {course.topics?.slice(0, 8).map((topic, i) => (
//       <div key={i} className="flex items-start">
//         <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
//         <span className="text-gray-700">Learn {topic}</span>
//       </div>
//     ))}
//   </div>
// </div>

// <div className="bg-white rounded-xl shadow-sm p-6">
//   <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Content</h2>

//   <h1 className="text-3xl text-gray-900 mb-2">{course?.title}</h1>
//   <p className="text-gray-600 mb-4">{course?.shortDescription}</p>

// </div>


// {/* What You'll Learn */}
// <div className="bg-white rounded-xl shadow-sm p-6">
//   <h2 className="text-2xl font-bold text-gray-900 mb-4">Our features </h2>
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//     {course.features?.slice(0, 8).map((topic, i) => (
//       <div key={i} className="flex items-start">
//         <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
//         <span className="text-gray-700">Learn {topic}</span>
//       </div>
//     ))}
//   </div>
// </div>

//           {/* Explore Related Topics */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore related topics</h2>
//             <div className="flex flex-wrap gap-2">
//               {["Python", "Data Science", "Machine Learning", "Environment"].map((topic, i) => (
//                 <span
//                   key={i}
//                   className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition cursor-pointer"
//                 >
//                   {topic}
//                 </span>
//               ))}
//             </div>
//           </div>

//   {/* Course Content */}
//   <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//     <div className="border-b p-6">
//       <h2 className="text-2xl font-bold text-gray-900">Course content</h2>
//       <p className="text-gray-600 mt-1">
//         {course?.videos?.length || 0} lectures • {course?.validity || "N/A"} validity
//       </p>
//     </div>

//     <div className="divide-y">
//       {course.videos?.map((video, i) => {
//         // YouTube embed url generate
//         let embedUrl = "";
//         if (video.url.includes("youtu.be")) {
//           embedUrl = `https://www.youtube.com/embed/${video.url.split("youtu.be/")[1].split("?")[0]
//             }`;
//         } else if (video.url.includes("watch?v=")) {
//           embedUrl = `https://www.youtube.com/embed/${video.url.split("watch?v=")[1].split("&")[0]
//             }`;
//         }

//         const isLocked = !course.isFree; // yaha aap video.isFree bhi use kar sakte ho future me

//         return (
//           <div key={i} className="p-4 hover:bg-gray-50">
//             <div
//               className="flex justify-between items-center cursor-pointer"
//               onClick={() => {
//                 if (isLocked) {
//                   setShowModal(true);
//                 } else {
//                   setOpenVideo(openVideo === i ? null : i);
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="bg-gray-100 rounded-md p-2">
//                   <FiPlay
//                     className={`${isLocked ? "text-gray-300" : "text-gray-500"
//                       }`}
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-900">{video.title}</h3>
//                   <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
//                     <span>{i + 1} lecture</span>
//                     <span>•</span>
//                     <span>{Math.floor(video.duration / 60)} min</span>
//                   </p>
//                 </div>
//               </div>

//               {!isLocked ? (
//                 <span className="text-blue-600 text-sm font-medium">Play</span>
//               ) : (
//                 <span className="text-gray-400 text-sm font-medium">🔒 Locked</span>
//               )}
//             </div>

//             {/* Video description + embed (only if free and opened) */}
//             {!isLocked && openVideo === i && (
//               <div className="mt-3 ml-12 p-3 bg-gray-50 rounded text-gray-700 text-sm space-y-3">
//                 {video.longDescription && <p>{video.longDescription}</p>}
//                 <div className="aspect-video">
//                   <iframe
//                     width="100%"
//                     height="315"
//                     src={embedUrl}
//                     title={video.title}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   </div>

//   {/* Modal */}
//   {showModal && (
//     <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
//         <h2 className="text-xl font-bold text-gray-900 mb-3">Course Locked</h2>
//         <p className="text-gray-600 mb-6">
//           इस video को देखने के लिए आपको course खरीदना होगा।
//         </p>
//         <div className="flex gap-3 justify-center">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//             onClick={() => setShowModal(false)}
//           >
//             Cancel
//           </button>
//           {/* <button
//   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//   onClick={() => {
//     setShowModal(false);
//     // yaha aap Buy Now / Checkout page redirect karwa sakte ho
//   }}
// >
//   Buy Now
// </button> */}
//         </div>
//       </div>
//     </div>
//   )}


//           {/* Requirements */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>Some programming experience</li>
//               <li>Admin permissions to download files</li>
//             </ul>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="w-full md:w-1/3 space-y-6">
//           {/* Pricing Card */}
//           <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-6">
//             <div className="p-6">
//               <div className="flex items-end gap-2 mb-4">
//                 <span className="text-3xl font-bold text-gray-900">₹4,469</span>
//                 <span className="text-gray-500 line-through">₹8,999</span>
//                 <span className="text-green-600 font-medium">50% off</span>
//               </div>

//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mb-3 transition">
//                 Add to cart
//               </button>

//               <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-lg transition">
//                 Buy now
//               </button>

//               <p className="text-center text-gray-600 text-sm mt-4">
//                 30-Day Money-Back Guarantee
//               </p>
//             </div>

//             <div className="border-t p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-3">This course includes:</h3>
//               <ul className="space-y-3">
//                 <li className="flex items-center gap-2 text-gray-700">
//                   <FiClock className="text-blue-500" />
//                   <span>25 hours on-demand video</span>
//                 </li>
//                 <li className="flex items-center gap-2 text-gray-700">
//                   <FiTablet className="text-blue-500" />
//                   <span>Access on mobile and TV</span>
//                 </li>
//                 <li className="flex items-center gap-2 text-gray-700">
//                   <FiDownload className="text-blue-500" />
//                   <span>5 downloadable resources</span>
//                 </li>
//                 <li className="flex items-center gap-2 text-gray-700">
//                   <FiAward className="text-blue-500" />
//                   <span>Certificate of completion</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="border-t p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-3">Share this course</h3>
//               <div className="flex gap-3">
//                 {["Facebook", "Twitter", "LinkedIn", "Copy Link"].map((action, i) => (
//                   <button
//                     key={i}
//                     className="flex-1 text-center py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm"
//                   >
//                     {action}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Personal Teams */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h3 className="font-bold text-lg text-gray-900 mb-3">Personal Teams</h3>
//             <p className="text-gray-700 mb-3">
//               The Premium team is included in plan. Subscribe to Udemy’s top courses.
//             </p>
//             <a href="#" className="text-blue-600 hover:underline font-medium">
//               Go into startup, plus 25,000/7 and beyond
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../axios/axiosInstance";
import { FiCheck, FiClock, FiDownload, FiTablet, FiTv, FiAward, FiPlay, FiBook, FiFileText, FiBarChart2 } from "react-icons/fi";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openVideo, setOpenVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComboItems, setSelectedComboItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        const courseData = res.data;
        setCourse(courseData);

        // Extract combo items from comboId
        const comboItems = [];
        if (courseData.comboId) {
          if (courseData.comboId.books && courseData.comboId.books.length) {
            courseData.comboId.books.forEach(book => {
              comboItems.push({
                type: "Book",
                itemId: book,
                price: book.discount_price || book.price
              });
            });
          }

          if (courseData.comboId.testSeries && courseData.comboId.testSeries.length) {
            courseData.comboId.testSeries.forEach(test => {
              comboItems.push({
                type: "TestSeries",
                itemId: test,
                price: test.discount_price || test.price
              });
            });
          }

          if (courseData.comboId.pyqs && courseData.comboId.pyqs.length) {
            courseData.comboId.pyqs.forEach(pyq => {
              comboItems.push({
                type: "PYQ",
                itemId: pyq,
                price: pyq.finalPrice || pyq.price
              });
            });
          }
        }

        const updatedCourseData = {
          ...courseData,
          comboItems: comboItems
        };

        setCourse(updatedCourseData);

        const initialSelections = comboItems.map((_, index) => index) || [];
        setSelectedComboItems(initialSelections);

        // Check if user has purchased this course
        await checkCourseAccess(id);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // const checkCourseAccess = async (courseId) => {
  //   try {
  //     const response = await axiosInstance.get(`/access/check/${courseId}`);
  //     if (response.data.message.includes("granted")) {
  //       setHasPurchased(true);
  //     }
  //   } catch (error) {
  //     console.error("Error checking course access:", error);
  //     setHasPurchased(false);
  //   } finally {
  //     setCheckingAccess(false);
  //   }
  // };

  const checkCourseAccess = async (courseId) => {
    try {
      const response = await axiosInstance.get(`/access/check/${courseId}`);
      if (response.data.message.includes("granted")) {
        setHasPurchased(true);
      } else {
        setHasPurchased(false);
      }
    } catch (error) {
      // Agar 403 aaya to sirf access false set karna hai, console me kuch log nahi karna
      if (error.response && error.response.status === 403) {
        setHasPurchased(false);
      } else {
        // optional: agar koi aur error aaya (500, network issue), tabhi log karo
        console.error("Unexpected error checking course access:", error);
      }
    } finally {
      setCheckingAccess(false);
    }
  };



  const calculateTotalPrice = () => {
    if (!course) return 0;
    let total = course.price || 0;
    selectedComboItems.forEach(index => {
      if (course.comboItems && course.comboItems[index]) {
        total += course.comboItems[index].price;
      }
    });
    return total;
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedComboItems([]);
    } else {
      const allIndices = course.comboItems?.map((_, index) => index) || [];
      setSelectedComboItems(allIndices);
    }
    setSelectAll(!selectAll);
  };

  if (loading || checkingAccess) return <div className="p-10 text-center">Loading...</div>;
  if (!course) return <div className="p-10 text-center">Course not found</div>;

  const renderComboItem = (item, index) => {
    let title, imageUrl, description, itemOriginalPrice;

    switch (item.type) {
      case "Book":
        title = item.itemId.book_title;
        imageUrl = item.itemId.full_image?.[0] || "";
        description = item.itemId.book_description;
        itemOriginalPrice = item.itemId.price;
        break;
      case "TestSeries":
        title = item.itemId.title;
        imageUrl = item.itemId.image_urls?.[0] || "";
        description = item.itemId.description;
        itemOriginalPrice = item.itemId.price;
        break;
      case "PYQ":
        title = item.itemId.exam;
        imageUrl = "";
        description = item.itemId.description;
        itemOriginalPrice = item.itemId.price;
        break;
      default:
        return null;
    }

    return (
      <div
        className={`flex flex-col sm:flex-row gap-4 p-4 border rounded-lg ${selectAll
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:bg-gray-50"
          }`}
      >
        <div className="flex items-start gap-3">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-32 h-32 object-contain rounded-lg"
            />
          ) : (
            <div className="bg-gray-100 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
              {item.type === "Book" && <FiBook className="text-3xl text-gray-400" />}
              {item.type === "TestSeries" && <FiBarChart2 className="text-3xl text-gray-400" />}
              {item.type === "PYQ" && <FiFileText className="text-3xl text-gray-400" />}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {item.type}
            </span>
            <h3 className="font-bold text-gray-900">{title}</h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {description}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">₹{item.price}</span>
            {itemOriginalPrice && itemOriginalPrice > item.price && (
              <span className="text-gray-500 text-sm line-through">
                ₹{itemOriginalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const totalPrice = calculateTotalPrice();
  const baseCoursePrice = course.price || 0;

  return (
    <section className="relative z-10 pt-10 md:pt-6 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-[1160px] px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="w-full md:w-2/3 space-y-8">
          {/* Course Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {course?.imagesFullPath?.[0] && (
                <img
                  src={course.imagesFullPath[0]}
                  alt={course.title}
                  className="w-full md:w-64 h-48 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{course?.title}</h1>
                <p className="text-gray-600 mb-4">{course?.shortDescription}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    <span className="font-bold">{course.rating}</span>
                    <span>{"★".repeat(5)}</span>
                    <span>({course.learnersCount})</span>
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {course.learnersCount} learners
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {course?.isFree ? "FREE" : `₹${baseCoursePrice}`}
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    Validity: {course?.validity || "N/A"}
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    Language: {course?.language}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.topics?.map((topic, i) => (
                <div key={i} className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{topic.replace(/[\[\]"]+/g, '')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Combo Items Section with Selection */}
          {course.comboItems && course.comboItems.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Add Combo Items</h2>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Select All</label>
                </div>
              </div>

              <div className="space-y-4">
                {course.comboItems.map((item, index) => (
                  <div key={index}>
                    {renderComboItem(item, index)}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <div>
                  <span className="text-lg font-medium">Selected items:</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {selectAll ? course.comboItems.length : 0} of {course.comboItems.length}
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-lg font-medium">
                    Total: ₹{totalPrice}
                  </div>
                  <div className="text-sm text-gray-500">
                    (Course: ₹{baseCoursePrice} + Combo: ₹{selectAll ? totalPrice - baseCoursePrice : 0})
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Content</h2>
            <h1 className="text-3xl text-gray-900 mb-2">{course?.title}</h1>
            <p className="text-gray-600 mb-4">{course?.shortDescription}</p>
          </div>

          {/* Our Features */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.features?.map((feature, i) => (
                <div key={i} className="flex items-start">
                  <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature.replace(/[\[\]"]+/g, '')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Related Topics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore related topics</h2>
            <div className="flex flex-wrap gap-2">
              {["Cell Biology", "Human Physiology", "Plant Physiology", "Genetics"].map((topic, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Course Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b p-6">
              <h2 className="text-2xl font-bold text-gray-900">Course content</h2>
              <p className="text-gray-600 mt-1">
                {course?.videos?.length || 0} lectures • {course?.validity || "N/A"} validity
              </p>
            </div>

            <div className="divide-y">
              {course.videos?.map((video, i) => {
                let embedUrl = "";
                if (video.url.includes("youtu.be")) {
                  embedUrl = `https://www.youtube.com/embed/${video.url.split("youtu.be/")[1].split("?")[0]
                    }`;
                } else if (video.url.includes("watch?v=")) {
                  embedUrl = `https://www.youtube.com/embed/${video.url.split("watch?v=")[1].split("&")[0]
                    }`;
                }

                // Updated condition: Check if user has purchased or if video is free
                const isLocked = !course.isFree && !video.isFree && !hasPurchased;

                return (
                  <div key={i} className="p-4 hover:bg-gray-50">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => {
                        if (isLocked) {
                          setShowModal(true);
                        } else {
                          setOpenVideo(openVideo === i ? null : i);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 rounded-md p-2">
                          <FiPlay
                            className={`${isLocked ? "text-gray-300" : "text-gray-500"
                              }`}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{video.title}</h3>
                          <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                            <span>{i + 1} lecture</span>
                            <span>•</span>
                            <span>{Math.floor(video.duration / 60)} min</span>
                          </p>
                        </div>
                      </div>

                      {!isLocked ? (
                        <span className="text-blue-600 text-sm font-medium">Play</span>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium">🔒 Locked</span>
                      )}
                    </div>

                    {/* Video description + embed (only if free and opened) */}
                    {!isLocked && openVideo === i && (
                      <div className="mt-3 ml-12 p-3 bg-gray-50 rounded text-gray-700 text-sm space-y-3">
                        {video.longDescription && <p>{video.longDescription}</p>}
                        <div className="aspect-video">
                          <iframe
                            width="100%"
                            height="315"
                            src={embedUrl}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Course Locked</h2>
                <p className="text-gray-600 mb-6">
                  इस video को देखने के लिए आपको course खरीदना होगा।
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Basic understanding of biology concepts</li>
              <li>NCERT Biology textbooks (Class 11 & 12)</li>
              <li>Notebook for practice questions</li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Pricing Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-6">
            <div className="p-6">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">₹{totalPrice}</span>
                  {course.price !== totalPrice && (
                    <span className="text-gray-500 line-through">₹{course.price}</span>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  {selectedComboItems.length > 0 ? (
                    <span>(Course: ₹{baseCoursePrice} + Combo: ₹{totalPrice - baseCoursePrice})</span>
                  ) : (
                    <span>Course only</span>
                  )}
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mb-3 transition">
                Add to cart
              </button>

              <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-lg transition">
                Buy now
              </button>

              <p className="text-center text-gray-600 text-sm mt-4">
                30-Day Money-Back Guarantee
              </p>
            </div>

            <div className="border-t p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">This course includes:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <FiClock className="text-blue-500" />
                  <span>{course.videos?.reduce((sum, v) => sum + v.duration, 0)} minutes of video</span>
                </li>

                {selectedComboItems.length > 0 && (
                  <li className="flex items-center gap-2 text-gray-700">
                    <FiBook className="text-blue-500" />
                    <span>{selectedComboItems.length} combo items</span>
                  </li>
                )}

                <li className="flex items-center gap-2 text-gray-700">
                  <FiAward className="text-blue-500" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>

            <div className="border-t p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Selected Items:</h3>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                <li className="text-gray-700 text-sm flex justify-between">
                  <span>Course: {course.title}</span>
                  <span>₹{baseCoursePrice}</span>
                </li>

                {selectedComboItems.map(index => {
                  const item = course.comboItems[index];
                  const title = item.itemId?.book_title || item.itemId?.title || item.itemId?.exam;
                  return (
                    <li key={index} className="text-gray-700 text-sm flex justify-between">
                      <span>{item.type}: {title}</span>
                      <span>₹{item.price}</span>
                    </li>
                  );
                })}

                <li className="text-gray-700 font-medium flex justify-between mt-2 pt-2 border-t">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}