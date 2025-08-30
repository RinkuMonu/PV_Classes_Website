"use client";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { FileText, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../axios/axiosInstance";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("detail");
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [myTests, setMyTests] = useState([]);
    const [pyqs, setPyqs] = useState([]);


    // useEffect(() => {
    //     const fetchCourseData = async () => {
    //     const token = localStorage.getItem("token");
    //     try {
    //         const res = await axiosInstance.get("/users/my-purchases", {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //         });
    //         setBooks(res?.data?.items?.purchasedBooks || []);
    //         setCourses(res?.data?.items?.purchasedCourses || []);
    //         setMyTests(res?.data?.items?.purchasedTestSeries || []);
    //         console.log("Course Data:", res?.data?.items);
    //     } catch (error) {
    //         console.error("Error fetching user:", error);
    //     }
    //     };
    //     fetchCourseData();
    // }, [axiosInstance]);


    useEffect(() => {
        const fetchCourseData = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axiosInstance.get("/users/my-purchases", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Extract purchased items
                const purchasedBooks = res?.data?.items?.purchasedBooks || [];
                const purchasedCourses = res?.data?.items?.purchasedCourses || [];
                const purchasedTestSeries = res?.data?.items?.purchasedTestSeries || [];

                // Extract books and test series from course combos
                let comboBooks = [];
                let comboTestSeries = [];
                let directPyqs = [];

                let comboPyqs = [];

                purchasedCourses.forEach(course => {
                    if (course.comboId && course.comboId.books) {
                        comboBooks = [...comboBooks, ...course.comboId.books];
                    }
                    if (course.comboId && course.comboId.testSeries) {
                        comboTestSeries = [...comboTestSeries, ...course.comboId.testSeries];
                    }
                    if (course.pyqs && course.pyqs.length > 0) {
                        directPyqs = [...directPyqs, ...course.pyqs];
                    }
                    if (course.comboId && course.comboId.pyqs) {
                        comboPyqs = [...comboPyqs, ...course.comboId.pyqs];
                    }
                });

                // Combine purchased items with combo items and remove duplicates
                const allBooks = [...purchasedBooks, ...comboBooks];
                const uniqueBooks = allBooks.filter((book, index, self) =>
                    index === self.findIndex(b => b._id === book._id)
                );

                const allTestSeries = [...purchasedTestSeries, ...comboTestSeries];
                const uniqueTestSeries = allTestSeries.filter((test, index, self) =>
                    index === self.findIndex(t => t._id === test._id)
                );

                const allPyqs = [...directPyqs, ...comboPyqs];
                const uniquePyqs = allPyqs.filter(
                    (pyq, index, self) =>
                        index === self.findIndex((p) => p._id === pyq._id)
                );

                setBooks(uniqueBooks);
                setCourses(purchasedCourses);
                setMyTests(uniqueTestSeries);
                setPyqs(uniquePyqs);


                console.log("Course Data:", res?.data?.items);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchCourseData();
    }, []);

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
                    address: res?.data?.data?.address || "",
                    state: res?.data?.data?.state || "",
                    city: res?.data?.data?.city || "",
                    pincode: res?.data?.data?.pincode || "",
                    profile_image_url: res?.data?.data?.profile_image_url || null,
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
        state: "",
        city: "",
        pincode: "",
        address: "",
    });

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", userDetails.name);
            formData.append("email", userDetails.email);
            formData.append("phone", userDetails.phone);
            formData.append("state", userDetails.state);
            formData.append("city", userDetails.city);
            formData.append("pincode", userDetails.pincode);
            formData.append("address", userDetails.address);
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
        { id: "pyqs", label: "PYQs" },

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


    console.log("courses:", courses);

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

            </div>


            {/* Tab Content */}
            <div>

                {/* Books */}

                {/* {activeTab === "books" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {books?.map((book) => (
                            <div
                                key={book._id}
                                className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative"
                            >
                                <Link href={book._id ? `/book-detail/${book._id}` : "/"}>
                                    <div className="relative w-full h-48 sm:h-64">
                                        <Image
                                            src={`${book?.full_image?.[0] || `/uploads/book/${book.images?.[0]}` || "/default-book.jpg"}`}
                                            alt={book.title || "Book image"}
                                            fill
                                            className="object-cover p-2"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                            {book.title}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )} */}
                {activeTab === "books" && (
                    <>
                        {books?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                {books.map((book) => (
                                    <div
                                        key={book._id}
                                        className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative"
                                    >
                                        <Link href={book._id ? `/book-detail/${book._id}` : "/"}>
                                            <div className="relative w-full h-48 sm:h-64">
                                                <Image
                                                    src={`${book?.full_image?.[0] ||
                                                        `/uploads/book/${book.images?.[0]}` ||
                                                        "/default-book.jpg"
                                                        }`}
                                                    alt={book.title || "Book image"}
                                                    fill
                                                    className="object-cover p-2"
                                                />
                                            </div>
                                            <div className="p-3">
                                                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                                    {book.title}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100">
                                <div className="mb-5">
                                    <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Books Found</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-6">
                                    We couldn't find any Books matching your criteria.
                                </p>
                                <a
                                    href="/book"
                                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-[#00316B] to-[#009FE3] hover:from-[#009FE3] hover:to-[#00316B] text-white px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm font-medium"
                                >
                                    Explore Books
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            </div>
                        )}
                    </>
                )}


                {/* Courses */}

                {activeTab === "courses" && (
                    <>
                        {courses?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {courses.map((item) => (
                                    <Link
                                        href={item?._id ? `/courses/${item._id}` : "#"}
                                        key={item?._id}
                                        className="relative border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 bg-white flex flex-col overflow-hidden group"
                                    >
                                        {/* Top Image */}
                                        <div className="relative w-full h-44 sm:h-52 overflow-hidden">
                                            <img
                                                src={`${item?.full_image?.[0] || "/default-course.jpg"}`}
                                                // src={`http://localhost:5000${item?.images?.[0]}`}

                                                alt={item?.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className="absolute top-3 left-3 bg-[#204972] text-white text-xs px-3 py-1 rounded-full shadow-lg z-10 overflow-hidden">
                                                <span className="relative z-10">Popular</span>
                                                <span className="absolute -inset-1 bg-white opacity-20 rounded-full animate-shine"></span>
                                            </span>
                                        </div>

                                        {/* Course Details */}
                                        <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#204972] transition-colors">
                                                {item?.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 transition-all group-hover:text-gray-700">
                                                {item?.shortDescription}
                                            </p>
                                        </div>

                                        {/* ================= Extra Details ================= */}
                                        {item?.comboId && (
                                            <div className="px-4 pb-4 border-t pt-3 bg-gray-50 space-y-4">

                                                <h2 className="font-bold text-gray-800">Combo Items</h2>
                                                {/* Books */}
                                                {item?.comboId?.books?.length > 0 && (
                                                    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition">
                                                        <h4 className="font-semibold text-[#204972] flex items-center gap-2 mb-2">
                                                            📚 Books
                                                        </h4>
                                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                            {item.comboId.books.map((book) => (
                                                                <li key={book._id} className="line-clamp-1">
                                                                    {book.title}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Test Series */}
                                                {item?.comboId?.testSeries?.length > 0 && (
                                                    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition">
                                                        <h4 className="font-semibold text-[#204972] flex items-center gap-2 mb-2">
                                                            📝 Test Series
                                                        </h4>
                                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                            {item.comboId.testSeries.map((test) => (
                                                                <li key={test._id} className="line-clamp-1">
                                                                    {test.title}{" "}
                                                                    <span className="text-xs text-gray-500">
                                                                        ({test.total_tests} Tests)
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* PYQs */}
                                                {item?.comboId?.pyqs?.length > 0 && (
                                                    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition">
                                                        <h4 className="font-semibold text-[#204972] flex items-center gap-2 mb-2">
                                                            📄 PYQs
                                                        </h4>
                                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                            {item.comboId.pyqs.map((pyq) => (
                                                                <li key={pyq._id} className="line-clamp-1">
                                                                    {pyq.exam}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                           

                              <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100">
                                <div className="mb-5">
                                    <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Found</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-6">
                                    We couldn't find any Courses matching your criteria.
                                </p>
                                <a
                                    href="/courses"
                                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-[#00316B] to-[#009FE3] hover:from-[#009FE3] hover:to-[#00316B] text-white px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm font-medium"
                                >
                                    Explore Courses
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            </div>
                        )}
                    </>
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

                                <div className="animate-fadeIn w-full">
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Address</label>
                                    {isEditing ? (
                                        <div className="relative w-full">
                                            <textarea
                                                rows={3}
                                                value={userDetails.address}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Address me alphabets, numbers, comma, dash, dot, space allow karte hain
                                                    if (/^[A-Za-z0-9\s,.-]*$/.test(value)) {
                                                        setUserDetails({ ...userDetails, address: value });
                                                    }
                                                }}
                                                placeholder="Enter your full address"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                                                    focus:ring-2 focus:ring-[#204972] focus:border-transparent 
                                                    focus:outline-none transition-all duration-200 resize-none"
                                            />
                                            <div className="absolute bottom-2 right-2 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 12.414C14.195 11.633 14.195 10.367 13.414 9.586L17.657 5.343M9.586 13.414L5.343 17.657M21 21H3V3h18v18z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 flex items-start w-full">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 12.414C14.195 11.633 14.195 10.367 13.414 9.586L17.657 5.343M9.586 13.414L5.343 17.657M21 21H3V3h18v18z"
                                                />
                                            </svg>
                                            {userDetails.address || <span className="text-gray-400">Not provided</span>}
                                        </div>
                                    )}
                                </div>
                                {/* City */}
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">City</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={userDetails.city}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^[A-Za-z\s]*$/.test(value)) {
                                                        setUserDetails({ ...userDetails, city: value });
                                                    }
                                                }}
                                                placeholder="Your City"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                                            focus:ring-2 focus:ring-[#204972] focus:border-transparent 
                                            focus:outline-none transition-all duration-200"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 9c-4.418 0-8-3.582-8-8h2c0 3.309 2.691 6 6 6s6-2.691 6-6h2c0 4.418-3.582 8-8 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400 mr-2"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 9c-4.418 0-8-3.582-8-8h2c0 3.309 2.691 6 6 6s6-2.691 6-6h2c0 4.418-3.582 8-8 8z" />
                                            </svg>
                                            {userDetails.city || <span className="text-gray-400">Not provided</span>}
                                        </div>
                                    )}
                                </div>

                                {/* State */}
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">State</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={userDetails.state}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^[A-Za-z\s]*$/.test(value)) {
                                                        setUserDetails({ ...userDetails, state: value });
                                                    }
                                                }}
                                                placeholder="Your State"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                                            focus:ring-2 focus:ring-[#204972] focus:border-transparent 
                                            focus:outline-none transition-all duration-200"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400 mr-2"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                                            </svg>
                                            {userDetails.state || <span className="text-gray-400">Not provided</span>}
                                        </div>
                                    )}
                                </div>

                                {/* Pincode */}
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Pincode</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={userDetails.pincode}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Only numbers allowed
                                                    if (/^\d{0,6}$/.test(value)) {
                                                        setUserDetails({ ...userDetails, pincode: value });
                                                    }
                                                }}
                                                placeholder="Your Pincode"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                                            focus:ring-2 focus:ring-[#204972] focus:border-transparent 
                                            focus:outline-none transition-all duration-200"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400 mr-2"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                            {userDetails.pincode || <span className="text-gray-400">Not provided</span>}
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
                    <>
                        {myTests?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {myTests.map((series) => (
                                    <div
                                        key={series?._id}
                                        className="w-full rounded-xl shadow-md border border-gray-200 overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="px-4 pt-4">
                                            <h2 className="text-base sm:text-lg font-bold leading-snug">
                                                {series?.title}
                                            </h2>
                                        </div>

                                        <div className="relative w-full h-44 sm:h-56 px-4 mt-3">
                                            <div className="relative w-full h-full rounded-lg overflow-hidden">
                                                <Image
                                                    src={`${series?.full_image?.[0] || `/uploads/testSeries/${series.images?.[0]}` || "/default-test.jpg"}`}
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

                                        <div className="px-4 mb-4">
                                            <p className="my-3 font-medium text-xs sm:text-sm">
                                                Validity for {series?.validity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100">
                                <div className="mb-5">
                                    <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tests Found</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-6">
                                    We couldn't find any Tests your criteria.
                                </p>
                                <a
                                    href="/test-series"
                                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-[#00316B] to-[#009FE3] hover:from-[#009FE3] hover:to-[#00316B] text-white px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm font-medium"
                                >
                                    Explore Tests
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            </div>
                        )}
                    </>
                )}

                {/* PYQs */}
                {activeTab === "pyqs" && (
                    <>
                        {pyqs?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {pyqs.map((pyq) => (
                                    <div
                                        key={pyq._id}
                                        className="p-4 border rounded-lg shadow hover:shadow-md flex flex-col justify-between bg-white"
                                    >
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-800 mb-2">
                                                {pyq.exam}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {pyq.description}
                                            </p>
                                        </div>
                                        <a
                                            href={`http://localhost:5000/${pyq.pdfUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[#204972] hover:underline text-sm font-medium"
                                        >
                                            <FileText className="w-4 h-4" />
                                            View PDF
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100">
                                <div className="mb-5">
                                    <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No PYQs Found</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-6">
                                    We couldn't find any Previous Year Questions matching your criteria.
                                </p>
                                <a
                                    href="/previous-year-question"
                                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-[#00316B] to-[#009FE3] hover:from-[#009FE3] hover:to-[#00316B] text-white px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm font-medium"
                                >
                                    Explore PYQs
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            </div>
                        )}
                    </>
                )}


            </div>
        </div>
    );
}
