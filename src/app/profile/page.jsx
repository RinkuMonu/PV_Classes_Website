"use client";
import toast from "react-hot-toast";
import { useState,useEffect } from "react";
import { Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../axios/axiosInstance";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("detail");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axiosInstance.get("/users/getUser", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setUserDetails({
                name: res?.data?.data?.name || "",
                email: res?.data?.data?.email || "",
                phone: res?.data?.data?.phone || "",
                profile_image_url:res?.data?.data?.profile_image_url || null,
            });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
        };

        fetchUser();
    }, [axiosInstance]);
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
        profile_image: null,
    });
    console.log("User Details:", userDetails);
    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", userDetails.name);
            formData.append("email", userDetails.email);
            formData.append("phone", userDetails.phone);

            if (userDetails.profile_image) {
            formData.append("profile_image", userDetails.profile_image); // ✅ backend expects this
            }

            const res = await axiosInstance.put("/users/updateUser", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            });

            toast.success("Profile updated successfully 🎉");
            console.log("Update response:", res.data);

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update profile ❌");
        }
    };

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    const tabs = [
        { id: "detail", label: "My Detail" },
        { id: "books", label: "My Books" },
        { id: "courses", label: "My Courses" },
        { id: "tests", label: "My Tests" },
    ];

    const subCatData = {
        books: [
            {
                _id: "1",
                book_title: "JavaScript Mastery",
                images: ["js-mastery.jpg"],
                price: 499,
                discount_price: 349,
                validity: "12 Months",
            },
            {
                _id: "2",
                book_title: "React Handbook",
                images: ["react-handbook.jpg"],
                price: 599,
                discount_price: 449,
                validity: "12 Months",
            },
            {
                _id: "3",
                book_title: "Python Crash Course",
                images: ["python-course.jpg"],
                price: 699,
                discount_price: null,
                validity: "12 Months",
            },
            {
                _id: "4",
                book_title: "Cloud Computing Essentials",
                images: ["cloud-computing.jpg"],
                price: 799,
                discount_price: 599,
                validity: "12 Months",
            },
            {
                _id: "5",
                book_title: "Data Structures & Algorithms",
                images: ["dsa-book.jpg"],
                price: 899,
                discount_price: 699,
                validity: "12 Months",
            },
        ],
    };

    const coursesData = [
        {
            id: "c1",
            title: "Full-Stack Web Development",
            overview: "HTML, CSS, JS, React, Node, MongoDB - from zero to hero.",
            imagesFullPath: ["/courses/web-dev.jpg"],
            price: 2999,
            discount_price: 1999,
            progress: 70,
        },
        {
            id: "c2",
            title: "Data Science Bootcamp",
            overview: "Hands-on Python, Pandas, ML algorithms, and projects.",
            imagesFullPath: ["/courses/data-science.jpg"],
            price: 3499,
            discount_price: 2499,
            progress: 45,
        },
        {
            id: "c3",
            title: "UI/UX Design Fundamentals",
            overview: "Learn Figma, wireframing, prototyping, and design systems.",
            imagesFullPath: ["/courses/uiux.jpg"],
            price: 1999,
            discount_price: 1499,
            progress: 20,
        },
    ];

    const data = {
        tests: [
            {
                _id: "1",
                title: "Prayas JEE 2026",
                title_tag: "Best Seller",
                price: 999,
                discount_price: 499,
                validity: "12 Months",
                total_tests: 20,
                images: ["jee.webp"],
                progress: 33
            },
            {
                _id: "2",
                title: "NEET Crash Course",
                title_tag: "Popular",
                price: 1999,
                discount_price: 999,
                validity: "6 Months",
                total_tests: 15,
                images: ["neet.webp"],
                progress: 70,
            },
            {
                _id: "3",
                title: "SSC CGL Mock Tests",
                title_tag: "Trending",
                price: 799,
                discount_price: 399,
                validity: "8 Months",
                total_tests: 25,
                images: ["ssc.webp"],
                progress: 56,
            },
            {
                _id: "4",
                title: "Bank PO Test Series",
                title_tag: "Hot",
                price: 1499,
                discount_price: 749,
                validity: "10 Months",
                total_tests: 30,
                images: ["bank.webp"],
                progress: 50,
            },
        ],
    };

    return (
        <div className="px-4 md:px-10 lg:px-20 py-6">
            {/* Page Title */}
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">My Profile</h1>

            {/* Tabs + Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 mb-6 gap-4">
                <div className="flex justify-center md:justify-start gap-2 sm:gap-4 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-all duration-200 ${activeTab === tab.id
                                ? "border-b-2 border-[#204972] text-[#204972]"
                                : "text-gray-500"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="relative w-full sm:w-72 mx-auto md:mx-0 mb-1">
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-[#204972] rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-[#204972] focus:outline-none text-sm sm:text-base"
                    />
                    <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
            </div>



            {/* Tab Content */}
            <div>
                 {/* <div className="w-20 h-20 rounded-full bg-[#204972]/10 flex items-center justify-center">
        <User className="w-10 h-10 text-[#204972]" />
      </div> */}
                {/* Books */}
                {activeTab === "books" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {subCatData?.books
                            .filter((book) =>
                                book.book_title.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((book) => (
                                <div
                                    key={book._id}
                                    className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative"
                                >
                                    <Link href={book._id ? `/book-detail/${book._id}` : "/"}>
                                        <div
                                            className="absolute top-0 left-0 bg-[#616602] text-white text-xs px-3 py-1 rounded-br-lg font-semibold z-10 shadow-md mr-1">
                                            {book.validity}
                                        </div>
                                        <div className="relative w-full h-48 sm:h-64">
                                            <Image
                                                src="/test1.webp"
                                                alt={book.book_title || "Book image"}
                                                fill
                                                className="object-cover p-2"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                                {book.book_title}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                )}

                {/* Courses */}
                {activeTab === "courses" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {coursesData
                            .filter((item) =>
                                item?.title.toLowerCase().includes(search.toLowerCase()))
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="relative border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 bg-white flex flex-col overflow-hidden group"
                                >
                                    {/* Image with hover zoom effect */}
                                    <div className="relative w-full h-44 sm:h-52 overflow-hidden">
                                        <img
                                            src="/test1.webp"
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 bg-[#204972] text-white text-xs px-3 py-1 rounded-full shadow-lg z-10 overflow-hidden">
                                            <span className="relative z-10">Popular</span>
                                            <span className="absolute -inset-1 bg-white opacity-20 rounded-full animate-shine"></span>
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#204972] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 transition-all group-hover:text-gray-700">
                                            {item.overview}
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#204972] transition-all duration-700"
                                                style={{ width: `${item.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1">{item.progress}% completed</span>

                                        {/* Rating */}
                                        <div className="flex justify-end mt-3">
                                            <div className="flex text-amber-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500 ml-1">(24 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
                {/* My Detail */}
                {activeTab === "detail" && (
                    <div className=" mx-auto overflow-hidden p-6 space-y-6">
                        <div className="flex items-center justify-between">
                           <div className="w-20 h-20 rounded-full bg-[#204972]/10 flex items-center justify-center">
        <User className="w-10 h-10 text-[#204972]" />
      </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-1 px-4 py-2 bg-[#204972] text-white rounded-lg hover:bg-[#163656] transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                            )}
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div className="animate-fadeIn">
                                <label className="block text-sm font-medium text-gray-600 mb-1.5">Profile Image</label>
                                {isEditing ? (
                                    <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                        setUserDetails({ ...userDetails, profile_image: e.target.files[0] })
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-[#204972] focus:border-transparent focus:outline-none transition-all duration-200"
                                    />
                                    </div>
                                ) : (
                                    <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 flex items-center">
                                    {userDetails.profile_image_url ? (
                                        <img
                                        src={userDetails.profile_image_url}
                                        alt="Profile"
                                        className="h-12 w-12 rounded-full object-cover border mr-2"
                                        />
                                    ) : (
                                        <span className="text-gray-400">No profile image</span>
                                    )}
                                    </div>
                                )}
                                </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Full Name</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={userDetails.name}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^[A-Za-z\s]*$/.test(value)) {
                                                        setUserDetails({ ...userDetails, name: value });
                                                    }
                                                }}
                                                placeholder="Your Name "
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#204972] focus:border-transparent focus:outline-none transition-all duration-200"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {userDetails.name || <span className="text-gray-400">Not provided</span>}
                                        </div>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone Number</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                value={userDetails.phone}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, "");
                                                    if (value === "" || /^[6-9]\d{0,9}$/.test(value)) {
                                                        setUserDetails({ ...userDetails, phone: value });
                                                    }
                                                }}
                                                maxLength={10}
                                                placeholder="Your Phone "
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#204972] focus:border-transparent focus:outline-none transition-all duration-200"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {userDetails.phone || <span className="text-gray-400">Not provided</span>}
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Email Address</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={userDetails.email}
                                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                                placeholder="Your Email"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#204972] focus:border-transparent focus:outline-none transition-all duration-200"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {userDetails.email || <span className="text-gray-400">Not provided</span>}
                                        </div>
                                    )}
                                </div>
                            </div>

                                {/* Buttons */}
                            {isEditing && (
                                <div className="flex justify-end gap-3 pt-2 animate-fadeIn">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-1 px-4 py-2 bg-[#204972] text-white rounded-lg hover:bg-[#163656] transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* Tests */}
                {activeTab === "tests" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {data.tests
                            .filter((series) =>
                                JSON.stringify(series).toLowerCase().includes(search.toLowerCase())
                            )
                            .map((series) => (
                                <div
                                    key={series._id}
                                    className="w-full rounded-xl shadow-md border border-gray-200 overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="px-4 pt-4">
                                        <h2 className="text-base sm:text-lg font-bold leading-snug">
                                            {series?.title}
                                        </h2>
                                    </div>

                                    {/* Image */}
                                    <div className="relative w-full h-44 sm:h-56 px-4 mt-3">
                                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                                            <Image
                                                src="/test1.webp"
                                                alt={series?.title}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                            {series?.total_tests > 0 && (
                                                <div className="absolute bottom-2 left-3 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full shadow-md">
                                                    {series?.total_tests} Tests
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Validity + Progress */}
                                    <div className="px-4 mb-4">
                                        <p className="my-3 font-medium text-xs sm:text-sm">
                                            Validity for {series?.validity}
                                        </p>
                                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#204972] transition-all duration-700"
                                                style={{ width: `${series.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1">{series.progress}% completed</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
