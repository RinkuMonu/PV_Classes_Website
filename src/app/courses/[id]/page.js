"use client";
import toast from "react-hot-toast";
import { useCart } from "../../../components/context/CartContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../axios/axiosInstance";
import Image from "next/image";
import { FiCheck, FiClock, FiDownload, FiTablet, FiTv, FiAward, FiPlay, FiBook, FiFileText, FiBarChart2, FiShoppingCart, FiLock, FiDollarSign } from "react-icons/fi";

export default function CourseDetailsPage() {
  const { addToCart, isOpen, openCart, closeCart } = useCart();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openVideo, setOpenVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComboItems, setSelectedComboItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [cartMode, setCartMode] = useState("course"); // 'course', 'combo', or 'both'
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        const courseData = res?.data;

        const comboItems = [];
        if (courseData?.comboId) {
          courseData?.comboId?.books?.forEach(book => {
            comboItems.push({
              type: "Book",
              itemId: book,
              price: book?.discount_price || book?.price
            });
          });

          courseData?.comboId?.testSeries?.forEach(test => {
            comboItems.push({
              type: "TestSeries",
              itemId: test,
              price: test?.discount_price || test?.price
            });
          });

          courseData?.comboId?.pyqs?.forEach(pyq => {
            comboItems.push({
              type: "PYQ",
              itemId: pyq,
              price: pyq?.finalPrice || pyq?.price
            });
          });
        }

        const updatedCourseData = {
          ...courseData,
          comboItems: comboItems
        };
        setSelectedOption({
          type: "course",
          id: courseData._id,
        })
        setCourse(updatedCourseData);

        const initialSelections = comboItems?.map((_, index) => index) || [];
        setSelectedComboItems(initialSelections);

        await checkCourseAccess(id);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const checkCourseAccess = async (courseId) => {
    try {
      const response = await axiosInstance.get(`/access/check/${courseId}`);
      if (response?.data?.message?.includes("granted")) {
        setHasPurchased(true);
      } else {
        setHasPurchased(false);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        return null;
      } else if (error?.response?.status === 403) {
        setHasPurchased(false);
      }
      return null;
    } finally {
      setCheckingAccess(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!course) return 0;

    let total = 0;

    if (cartMode === "course") {
      total = course?.price || 0;
    } else if (cartMode === "combo") {
      if (selectAll && course?.comboId?.discount_price) {
        total = course?.comboId?.discount_price;
      } else {
        selectedComboItems?.forEach(index => {
          if (course?.comboItems?.[index]) {
            total += course?.comboItems?.[index]?.price;
          }
        });
      }
    } else if (cartMode === "both") {
      total = course?.price || 0;
      if (selectAll && course?.comboId?.discount_price) {
        total += course?.comboId?.discount_price;
      } else {
        selectedComboItems?.forEach(index => {
          if (course?.comboItems?.[index]) {
            total += course?.comboItems?.[index]?.price;
          }
        });
      }
    }

    return total;
  };

  const calculateDiscount = () => {
    if (!course?.comboId) return 0;

    let originalComboPrice = 0;
    course?.comboItems?.forEach(item => {
      originalComboPrice += item?.itemId?.price || 0;
    });

    return originalComboPrice - (course?.comboId?.discount_price || 0);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedComboItems([]);
    } else {
      const allIndices = course?.comboItems?.map((_, index) => index) || [];
      setSelectedComboItems(allIndices);
    }
    setSelectAll(!selectAll);
  };

  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();
    const response = await addToCart({
      itemType,
      itemId,
    });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  if (loading || checkingAccess) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#204972]"></div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-[#204972] mb-4">Course Not Found</h2>
        <p className="text-gray-600">The course you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  const renderComboItem = (item) => {
    let title, imageUrl, description, itemOriginalPrice;

    switch (item?.type) {
      case "Book":
        title = item?.itemId?.book_title;
        imageUrl = item?.itemId?.full_image?.[0] || "";
        description = item?.itemId?.book_description;
        itemOriginalPrice = item?.itemId?.price;
        break;
      case "TestSeries":
        title = item?.itemId?.title;
        imageUrl = item?.itemId?.image_urls?.[0] || "";
        description = item?.itemId?.description;
        itemOriginalPrice = item?.itemId?.price;
        break;
      case "PYQ":
        title = item?.itemId?.exam;
        imageUrl = "";
        description = item?.itemId?.description;
        itemOriginalPrice = item?.itemId?.price;
        break;
      default:
        return null;
    }

    return (
      <div
        className={`flex flex-col sm:flex-row gap-4 p-4 border rounded-lg transition-all ${selectAll
          ? "border-[#204972] bg-blue-50"
          : "border-gray-200 hover:border-[#204972] hover:bg-blue-50"
          }`}
      >
        <div className="flex items-start gap-3">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-32 h-32 object-contain rounded-lg border"
            />
          ) : (
            <div className="bg-gray-100 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
              {item?.type === "Book" && <FiBook className="text-3xl text-gray-400" />}
              {item?.type === "TestSeries" && <FiBarChart2 className="text-3xl text-gray-400" />}
              {item?.type === "PYQ" && <FiFileText className="text-3xl text-gray-400" />}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-1 bg-[#204972] text-white text-xs rounded-full">
              {item?.type}
            </span>
            <h3 className="font-bold text-gray-900">{title}</h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {description}
          </p>

          <div className="flex items-center mt-2">
            <FiDollarSign className="text-[#616602] mr-1" />
            <span className="font-medium text-[#616602]">₹{item.price}</span>
            {itemOriginalPrice && itemOriginalPrice !== item.price && (
              <span className="ml-2 text-sm text-gray-500 line-through">₹{itemOriginalPrice}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const totalPrice = calculateTotalPrice();
  const baseCoursePrice = course?.price || 0;
  const discountAmount = calculateDiscount();

  return (
    <>
      <section className="relative w-full h-[70vh] sm:h-[40vh] lg:h-[50vh] text-white mb-6 sm:mb-8">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/course-deatail-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/course-detail-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4">
            {course?.title}
          </h1>
        </div> */}
      </section>

      <section className="relative z-10 pt-6 md:pt-4 bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-[1160px] px-4 py-8 flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-6">
                {course?.images?.[0] && (
                  <img
                    src={course.full_image[0]}
                    // src={`http://localhost:5000${course?.images?.[0]}`}
                    alt={course.title}
                    className="w-full md:w-64 h-48 object-cover rounded-lg border"
                  />
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#204972] text-white rounded-full text-sm font-medium">
                      Best Seller
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                      <span className="font-bold">{course?.rating}</span>
                      <span>{"★".repeat(Math.floor(course?.rating || 0))}</span>
                      <span>({course?.learnersCount})</span>
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-[#204972] mb-3">{course?.title}</h1>
                  <p className="text-gray-600 mb-4">{course?.shortDescription}</p>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-[#616602] bg-opacity-15 text-[#fff] rounded-full text-sm font-medium">
                      {course?.isFree ? "FREE" : `₹${baseCoursePrice}`}
                    </span>
                    <span className="px-3 py-1 bg-[#204972] bg-opacity-15 text-[#fff] rounded-full text-sm">
                      Validity: {course?.validity || "N/A"}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Language: {course?.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Mode Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-bold text-[#204972] mb-4 flex items-center gap-2">
                <FiShoppingCart className="text-[#204972]" />
                Select what to add to cart
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Course Only */}
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${selectedOption?.type === "course"
                    ? "border-[#204972] bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-[#204972] hover:bg-blue-50"
                    }`}
                  onClick={() => (
                    setSelectedOption({ type: "course", id: course._id }),
                    setCartMode("course")
                  )}
                >
                  <h3 className="font-semibold mb-2 text-[#204972]">Course Only</h3>
                  <p className="text-sm text-gray-600">₹{baseCoursePrice}</p>
                </div>

                {/* Combo Only */}
                {course.comboItems && course.comboItems.length > 0 && (
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${selectedOption?.type === "combo"
                      ? "border-[#204972] bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-[#204972] hover:bg-blue-50"
                      }`}
                    onClick={() => {
                      setSelectedOption({
                        type: "combo",
                        id: course.comboId?._id,
                      });
                      setCartMode("combo");
                    }}
                  >
                    <h3 className="font-semibold mb-2 text-[#204972]">Combo Only</h3>
                    <p className="text-sm text-gray-600">
                      {selectAll && course.comboId?.discount_price
                        ? `₹${course.comboId.discount_price}`
                        : `Up to ₹${course.comboId?.price || 0}`}
                    </p>
                  </div>
                )}

                {/* Both Course and Combo */}
                {/* {course.comboItems && course.comboItems.length > 0 && (
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      selectedOption?.type === "both"
                        ? "border-[#204972] bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-[#204972] hover:bg-blue-50"
                    }`}
                    onClick={() => {
                      setSelectedOption({
                        type: "both",
                        id: course._id,
                        comboId: course.comboId?._id
                      });
                      setCartMode("both");
                    }}
                  >
                    <h3 className="font-semibold mb-2 text-[#204972]">Course + Combo</h3>
                    <p className="text-sm text-gray-600">
                      ₹{baseCoursePrice + (course.comboId?.discount_price || 0)}
                    </p>
                  </div>
                )} */}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What you will learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.topics?.map((topic, i) => (
                  <div key={i} className="flex items-start p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{topic.replace(/[\[\]"]+/g, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Combo Items Section with Selection */}
            {course.comboItems && course.comboItems.length > 0 && (cartMode === "combo" || cartMode === "both") && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h2 className="text-xl font-bold text-[#204972]">Select Combo Items</h2>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="h-5 w-5 text-[#204972] rounded focus:ring-[#204972]"
                    />
                    <label className="ml-2 text-sm text-gray-700 font-medium">Select All</label>
                  </div>
                </div>

                {/* Combo Discount Banner */}
                {selectAll && course.comboId && course.comboId.discount_price && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-green-800">Combo Discount Applied!</h3>
                        <p className="text-sm text-green-600">
                          You save ₹{discountAmount} when you buy the complete combo
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-green-800">
                          Combo Price: ₹{course.comboId.discount_price}
                        </span>
                        <span className="block text-sm text-green-600 line-through">
                          Original: ₹{course.comboId.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {course.comboItems.map((item, index) => (
                    <div key={index}>
                      {renderComboItem(item, index)}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div>
                    <span className="text-lg font-medium text-[#204972]">Selected items:</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {selectAll ? course.comboItems.length : selectedComboItems.length} of {course.comboItems.length}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-[#616602]">
                      {cartMode === "combo" ? "Combo Total: " : "Combo Price: "}
                      ₹{selectAll && course.comboId?.discount_price
                        ? course.comboId.discount_price
                        : selectedComboItems.reduce((sum, index) => sum + course.comboItems[index].price, 0)
                      }
                    </div>
                    {selectAll && course.comboId && course.comboId.discount_price && (
                      <div className="text-sm text-green-600">
                        You saved ₹{discountAmount} on the combo!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Our Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-bold text-[#204972] mb-4 border-b pb-2">Our features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.features?.map((feature, i) => (
                  <div key={i} className="flex items-start p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature.replace(/[\[\]"]+/g, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-100">
              <div className="border-b p-6 bg-gray-50">
                <h2 className="text-xl font-bold text-[#204972]">Course content</h2>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <span>{course?.videos?.length || 0} lectures</span>
                  <span>•</span>
                  <span>{course?.validity || "N/A"} validity</span>
                </p>
              </div>

              <div className="divide-y">
                {course.videos?.map((video, i) => {
                  let embedUrl = "";
                  if (video.url.includes("youtu.be")) {
                    embedUrl = `https://www.youtube.com/embed/${video.url.split("youtu.be/")[1].split("?")[0]}`;
                  } else if (video.url.includes("watch?v=")) {
                    embedUrl = `https://www.youtube.com/embed/${video.url.split("watch?v=")[1].split("&")[0]}`;
                  }

                  const isLocked = !course.isFree && !video.isFree && !hasPurchased;

                  return (
                    <div key={i} className="p-4 hover:bg-blue-50 transition-colors">
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
                          <div className={`rounded-md p-2 ${isLocked ? "bg-gray-100" : "bg-[#204972] bg-opacity-10"}`}>
                            {isLocked ? (
                              <FiLock className="text-gray-400" />
                            ) : (
                              <FiPlay className="text-[#204972]" />
                            )}
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
                          <span className="text-[#204972] text-sm font-medium">Play</span>
                        ) : (
                          <span className="text-gray-400 text-sm font-medium flex items-center">
                            <FiLock className="mr-1" /> Locked
                          </span>
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

        {/* Faculty Section */}
<div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
  <h2 className="text-xl font-bold text-[#204972] mb-6 border-b pb-3 flex items-center">
    <svg className="w-5 h-5 mr-2 text-[#204972]" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
    </svg>
    Meet Your Expert Instructors
  </h2>

  {course.faculty && course.faculty.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {course.faculty.map((facultyMember, index) => {
        // Generate a gradient color based on index
        const gradientColors = [
          "from-blue-50 to-indigo-50",
          "from-green-50 to-teal-50",
          "from-purple-50 to-pink-50",
          "from-orange-50 to-red-50"
        ];
        const textColors = [
          "text-blue-600",
          "text-green-600",
          "text-purple-600",
          "text-red-600"
        ];
        const bgColors = [
          "bg-blue-100 text-blue-700",
          "bg-green-100 text-green-700",
          "bg-purple-100 text-purple-700",
          "bg-red-100 text-red-700"
        ];
        
        const colorIndex = index % 4;
        const gradientClass = gradientColors[colorIndex];
        const textColorClass = textColors[colorIndex];
        const bgColorClass = bgColors[colorIndex];
        
        // Get faculty photo URL
        const facultyPhoto = facultyMember.photo 
          ? `http://localhost:5000${facultyMember.photo}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(facultyMember.name)}&background=204972&color=fff&size=80`;
        
        return (
          <div key={facultyMember._id} className={`flex flex-col sm:flex-row items-start p-5 bg-gradient-to-r ${gradientClass} rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100`}>
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-5 mx-auto sm:mx-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src={facultyPhoto}
                  alt={facultyMember.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(facultyMember.name)}&background=204972&color=fff&size=80`;
                  }}
                />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-gray-800 text-lg">{facultyMember.name}</h3>
              {facultyMember.experience && (
                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-medium">Experience: </span>
                  {facultyMember.experience}
                </p>
              )}
              {facultyMember.specialization && (
                <div className={`${bgColorClass} px-3 py-1 rounded-full text-xs inline-block`}>
                  {facultyMember.specialization}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-500">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <p className="mt-3">No faculty information available</p>
    </div>
  )}

  <div className="mt-8 pt-6 border-t border-gray-200">
    <h3 className="font-medium text-gray-800 mb-4 flex items-center">
      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
      </svg>
      Why learn from our expert faculty?
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Industry Experts</h4>
          <p className="text-sm text-gray-600 mt-1">Learn from professionals with real-world experience</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Proven Results</h4>
          <p className="text-sm text-gray-600 mt-1">Track record of student success and achievements</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Doubt Support</h4>
          <p className="text-sm text-gray-600 mt-1">Get your questions answered directly by experts</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Interactive Sessions</h4>
          <p className="text-sm text-gray-600 mt-1">Engaging teaching methods for better understanding</p>
        </div>
      </div>
    </div>
  </div>
</div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-bold text-[#204972] mb-4 border-b pb-2">Requirements</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Basic understanding of biology concepts</li>
                <li>NCERT Biology textbooks (Class 11 & 12)</li>
                <li>Notebook for practice questions</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-96 space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-20">
              <div className="p-6 bg-[#204972] text-white">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-white">₹{totalPrice}</span>
                    {cartMode === "both" && course.price !== totalPrice && (
                      <span className="text-white line-through">₹{course.price + (course.comboId?.price || 0)}</span>
                    )}
                  </div>

                  <div className="text-sm text-white capitalize">
                    {cartMode} selected
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    handleAdd(e, selectedOption.type, selectedOption.id);
                    openCart();
                  }}
                  className="w-full bg-[#788406] hover:bg-[#16385d] text-white font-medium py-3 rounded-lg mb-3 transition flex items-center justify-center gap-2"
                >
                  <FiShoppingCart />
                  Add to cart
                </button>


                <p className="text-center text-hite text-sm mt-4 flex items-center justify-center">
                  <FiAward className="mr-1 text-amber-500" />
                  30-Day Money-Back Guarantee
                </p>
              </div>

              <div className="border-t p-6">
                <h3 className="font-bold text-lg text-[#204972] mb-3">This includes:</h3>
                <ul className="space-y-3">
                  {(cartMode === "course" || cartMode === "both") && (
                    <li className="flex items-center gap-2 text-gray-700">
                      <FiClock className="text-[#204972]" />
                      <span>{course.videos?.reduce((sum, v) => sum + v.duration, 0)} minutes of video</span>
                    </li>
                  )}

                  {(cartMode === "combo" || cartMode === "both") && (
                    <li className="flex items-center gap-2 text-gray-700">
                      <FiBook className="text-[#204972]" />
                      <span>{selectAll ? "Complete combo" : `${selectedComboItems.length} combo items`}</span>
                    </li>
                  )}

                  <li className="flex items-center gap-2 text-gray-700">
                    <FiAward className="text-[#204972]" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>

              <div className="border-t p-6">
                <h3 className="font-bold text-lg text-[#204972] mb-3">Selected Items:</h3>
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {(cartMode === "course" || cartMode === "both") && (
                    <li className="text-gray-700 text-sm flex justify-between items-center py-1">
                      <span>Course: {course.title}</span>
                      <span className="font-medium">₹{baseCoursePrice}</span>
                    </li>
                  )}

                  {(cartMode === "combo" || cartMode === "both") && (
                    selectAll && course.comboId ? (
                      <li className="text-gray-700 text-sm flex justify-between items-center py-1">
                        <span>Complete Combo: {course.comboId.title}</span>
                        <div className="flex flex-col items-end">
                          <span className="text-[#616602] font-medium">₹{course.comboId.discount_price}</span>
                          <span className="text-gray-500 text-xs line-through">₹{course.comboId.price}</span>
                        </div>
                      </li>
                    ) : (
                      selectedComboItems.map(index => {
                        const item = course.comboItems[index];
                        const title = item.itemId?.book_title || item.itemId?.title || item.itemId?.exam;
                        return (
                          <li key={index} className="text-gray-700 text-sm flex justify-between items-center py-1">
                            <span className="truncate max-w-[200px]">{item.type}: {title}</span>
                            <span className="font-medium">₹{item.price}</span>
                          </li>
                        );
                      })
                    )
                  )}

                  <li className="text-gray-900 font-bold flex justify-between mt-2 pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-[#616602]">₹{totalPrice}</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FiLock className="text-2xl text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Course Locked</h2>
            <p className="text-gray-600 mb-6">
              To watch this video, you need to purchase the course
            </p>
            <div className="flex gap-3 justify-center">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#204972] text-white rounded-lg hover:bg-[#16385d] transition"
                onClick={() => {
                  setSelectedOption({ type: "course", id: course._id });
                  setCartMode("course");
                  setShowModal(false);
                }}
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}