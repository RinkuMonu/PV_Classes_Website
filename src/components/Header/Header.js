"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Bell,
  ShoppingCart,
  Menu,
  X,
  ChevronUp,
  LogIn,
  User,
  ArrowRight,
  Trash2,
  Minus,
  Plus,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import ExamMegaMenu from "./ExamMegaMenu"
import LoginModal from "../LoginModal"
import { useCart } from "../context/CartContext"
const examData = {
  "Government Exam": {
    tabs: {
      "All India Exams": [
        { name: "UPSC (IAS)", img: "/vercel.svg" },
        { name: "SSC GD (Constable)", img: "/vercel.svg" },
        { name: "Railway ALP & Technician", img: "/vercel.svg" },
        { name: "Bank PO & Clerk", img: "/vercel.svg" },
        { name: "LIC AAO", img: "/vercel.svg" },
      ],
      "Rajasthan Exams": [
        { name: "Rajasthan Police SI", img: "/vercel.svg" },
        { name: "RPSC Grade 2 Teacher", img: "/vercel.svg" },
        { name: "Rajasthan Patwari", img: "/vercel.svg" },
      ],
      "Uttar Pradesh Exams": [
        { name: "UPPSC PCS", img: "/vercel.svg" },
        { name: "UP Police SI", img: "/vercel.svg" },
      ],
    },
  },
  Nursing: {
    tabs: {
      "All India Exams": [
        { name: "AIIMS Nursing", img: "/vercel.svg" },
        { name: "JIPMER Nursing", img: "/vercel.svg" },
        { name: "PGIMER Nursing", img: "/vercel.svg" },
      ],
      "Uttar Pradesh Exams": [
        { name: "UP Staff Nurse", img: "/vercel.svg" },
        { name: "SGPGI Nursing Officer", img: "/vercel.svg" },
      ],
      "Madhya Pradesh Exam": [{ name: "MP Staff Nurse", img: "/vercel.svg" }],
    },
  },
  School: {
    tabs: {
      "All India Exams": [
        { name: "Class 10 Board", img: "/vercel.svg" },
        { name: "Class 12 Board", img: "/vercel.svg" },
        { name: "KVPY", img: "/vercel.svg" },
      ],
      "UGC NET JRF": [
        { name: "NET Paper 1", img: "/vercel.svg" },
        { name: "NET Paper 2 English", img: "/vercel.svg" },
      ],
    },
  },
  Agriculture: {
    tabs: {
      "All India Exams": [
        { name: "ICAR AIEEA", img: "/vercel.svg" },
        { name: "NABARD Grade A", img: "/vercel.svg" },
      ],
      "Rajasthan Exams": [{ name: "Rajasthan Agriculture Officer", img: "/vercel.svg" }],
    },
  },
  "NEET/JEE": {
    tabs: {
      "All India Exams": [
        { name: "NEET UG", img: "/vercel.svg" },
        { name: "NEET PG", img: "/vercel.svg" },
        { name: "JEE Main", img: "/vercel.svg" },
        { name: "JEE Advanced", img: "/vercel.svg" },
      ],
    },
  },
  Defence: {
    tabs: {
      "All India Exams": [
        { name: "NDA", img: "/vercel.svg" },
        { name: "CDS", img: "/vercel.svg" },
        { name: "AFCAT", img: "/vercel.svg" },
      ],
      "Madhya Pradesh Exam": [{ name: "MP Police Constable", img: "/vercel.svg" }],
    },
  },
  "CLAT & Law Exams": {
    tabs: {
      "All India Exams": [
        { name: "CLAT UG", img: "/vercel.svg" },
        { name: "CLAT PG", img: "/vercel.svg" },
        { name: "AILET", img: "/vercel.svg" },
      ],
    },
  },
  Engineering: {
    tabs: {
      "All India Exams": [
        { name: "GATE", img: "/vercel.svg" },
        { name: "IES", img: "/vercel.svg" },
      ],
      "Uttar Pradesh Exams": [{ name: "UPPSC AE", img: "/vercel.svg" }],
    },
  },
  CUET: {
    tabs: {
      "All India Exams": [
        { name: "CUET UG", img: "/vercel.svg" },
        { name: "CUET PG", img: "/vercel.svg" },
      ],
    },
  },
};
const isLoggedIn = true;

export default function Header() {
  const { cart, storageCart, updateQuantity, removeFromCart, fetchCart, cartCount } = useCart();
  const [hideTopBar, setHideTopBar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examsMenuOpen, setExamsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [coursesMenu, setCoursesMenu] = useState(false)
  const [openTabs, setOpenTabs] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const lastScrollRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category)
  }


  // ✅ Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  const toggleTab = (category, tab) => {
    setOpenTabs((prev) => ({
      ...prev,
      [`${category}-${tab}`]: !prev[`${category}-${tab}`],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > lastScrollRef.current && currentScroll > 50) {
        setHideTopBar(true)
      } else if (currentScroll < lastScrollRef.current) {
        setHideTopBar(false)
      }
      lastScrollRef.current = currentScroll
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // const cartToDisplay = isLoggedIn ? cartItems : localCart;
  const total = cart?.reduce(
    (sum, item) => sum + ((item?.details?.discount_price || 0) * (item?.quantity || 1)),
    0
  );

  console.log("total = ", total);
  return (
    <>
      {/* Top Bar */}
      <div
        className={`bg-[#00316B] text-white text-sm border-b border-gray-100 transition-all duration-300 py-4 overflow-hidden ${hideTopBar ? "-translate-y-full" : "translate-y-0"
          }`}
        style={{ willChange: "transform" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Left */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-[#009FE3] transition-colors">
              <div className="p-1 bg-white/10 rounded-full">
                <Phone size={14} />
              </div>
              <span className="font-medium">+1 (396) 486 4709</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#009FE3] transition-colors">
              <div className="p-1 bg-white/10 rounded-full">
                <Mail size={14} />
              </div>
              <span className="font-medium">enquery@domain.com</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#009FE3] transition-colors">
              <div className="p-1 bg-white/10 rounded-full">
                <MapPin size={14} />
              </div>
              <span className="font-medium">795 South Park Avenue, CA</span>
            </div>
          </div>
          {/* Right */}
          <div className="flex items-center">
            {!isLoggedIn ? (
              <Link
                href="#"
                className="relative py-2 px-3 me-2 inline-flex gap-1"
                onClick={() => setIsModalOpen(true)}
              >
                <LogIn size={16} className="mt-1" />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="relative py-2 px-3 me-2 inline-flex gap-1"
              >
                <LogIn size={16} className="mt-1" />
                Logout
              </button>
            )}

            {isLoggedIn && (
              <Link
                href="/profile"
                className="relative py-2 px-3 inline-flex gap-1"
              >
                <User size={16} className="mt-1" />
                My Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white sticky top-0 z-50 border-b border-[#009FE3]/20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/Image/pv-logo.png"
                alt="PV classes"
                width={70}
                height={40}
                className="object-contain transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#009FE3]/10 to-[#87B105]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#204972]">
            <Link
              href="/"
              className="relative py-2 px-3 hover:text-[#009FE3] transition-all duration-200 text-base font-semibold group"
            >
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#87B105] group-hover:w-full transition-all duration-300"></div>
            </Link>
            <div
              className="relative group"
              onMouseEnter={() => setCoursesMenu(true)}
              onMouseLeave={() => setCoursesMenu(false)}
            >
              <button className="flex items-center gap-1 py-2 px-3 hover:text-[#009FE3] transition-all duration-200 text-base font-semibold relative">
                All Exams
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#87B105] group-hover:w-full transition-all duration-300"></div>
              </button>
              {coursesMenu && (
                <div className="absolute -left-75 top-full w-[1200px] z-50">
                  <ExamMegaMenu />
                </div>
              )}
            </div>
            <Link
              href="/previous-year-question"
              className="relative py-2 px-3 hover:text-[#009FE3] transition-all duration-200 text-base font-semibold group"
            >
              PYQs
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#87B105] group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/test-series"
              className="relative py-2 px-3 hover:text-[#009FE3] transition-all duration-200 text-base font-semibold group"
            >
              Test Series
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#87B105] group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/current-affairs"
              className="relative py-2 px-3 hover:text-[#009FE3] transition-all duration-200 text-base font-semibold group"
            >
              Current Affairs
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#87B105] group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="#"
              className="relative py-2 px-3 hover:text-[#009FE3] transition-all duration-200 text-base font-semibold group"
            >
              News
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#87B105] group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/book"
              className="relative py-2 px-3 hover:text-[#009FE3] transition-all duration-200 text-base font-semibold group"
            >
              Books
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#87B105] group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          <div className="flex items-center">
            {/* <button className="relative p-2 hover:bg-blue-100 rounded-full transition">
              <Tag size={20} />
            </button> */}
            <button className="relative p-2 hover:bg-blue-100 rounded-full transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-3 hover:bg-[#009FE3]/10 rounded-full transition-all duration-200 group"
            >
              <ShoppingCart size={20} className="text-[#204972] group-hover:text-[#009FE3]" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#87B105] to-[#ABC129] text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg">
                {cartCount}
              </span>
            </button>
            {isOpen && (
              <div
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 z-40"
              />
            )}

            {/* Offcanvas */}
            <div
              className={`fixed top-0 right-0 h-full bg-white w-70 md:w-100 shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}

            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-400 text-white bg-[#115D8E]">
                <h2 className="text-lg font-semibold ">Your Shopping Cart</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Cart Content */}
              <div className="flex flex-col h-[calc(100%-64px)] ">
                <div className="flex-1 overflow-y-auto p-6  hide-scrollbar">
                  {cart?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                        style={{ background: "rgba(157, 48, 137, 0.1)" }}
                      >
                        <ShoppingCart
                          className="w-10 h-10"
                          style={{ color: "rgb(157 48 137)" }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Add some items to get started!
                      </p>
                      <Link
                        href="/checkout"
                        className="flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-medium transition-colors bg-[#115D8E]"

                      >
                        Continue Shopping
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart?.map((item) => (
                        <div
                          key={item?.itemId}
                          className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 "
                        >
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item?.details
                                ?.full_image
                                ?.[0]}
                              alt={item?.details?.title
                              }
                              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h3 className="text-gray-800 font-semibold text-base sm:text-lg leading-snug line-clamp-2 mb-1">
                                {item?.details?.title}
                              </h3>
                              {item?.details?.book_category_id && (
                                <p className="text-xs text-gray-500 mb-3">
                                  {item?.details?.book_category_id?.name}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-sm sm:text-base mt-auto">
                              <span className="font-semibold text-[#115D8E]">
                                {/* ₹{item?.details?.discount_price.toLocaleString()} */}
                              </span>
                              <button
                                onClick={() => removeFromCart(item?.itemId)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                                <button
                                  onClick={() => updateQuantity(-1, item?.quantity, item?.itemId)}
                                  className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 transition"
                                  disabled={item?.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 text-sm font-medium min-w-[40px] text-center">
                                  {item?.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(1, item?.quantity, item?.itemId)}
                                  className="px-3 py-2 hover:bg-gray-100 transition"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <span className="text-sm font-medium text-gray-700 flex justify-end">
                                Total: ₹{(item?.details?.discount_price * item?.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {cart?.length > 0 && (
                        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                          <div className="space-y-3 mb-5">
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>
                                Subtotal{" "}
                                <span className="text-gray-400">({cart?.length} items)</span>
                              </span>
                              <span className="text-sm font-semibold text-gray-800">
                                ₹{total.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Shipping</span>
                              <span className="text-green-600 font-medium">Free</span>
                            </div>

                            <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between text-base font-bold text-gray-900">
                              <span>Total</span>
                              <span>₹{total.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Link
                              href="/checkout"
                              className="flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-medium transition-colors bg-[#115D8E]"

                            >
                              Proceed to Checkout
                              <ArrowRight className="w-4 h-4" />
                            </Link>

                            {/* <button
                  onClick={onClose}
                  className="w-full py-2 px-4 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </button> */}
                          </div>

                          <p className="text-center mt-4 text-xs text-gray-400">
                            Shipping and taxes calculated at checkout
                          </p>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#009FE3]/10 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} className="text-[#204972]" />
          </button>
        </div>
      </div>

      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />}

      {/* Offcanvas */}
      <div
        className={`fixed top-0 right-0 h-full bg-white w-80 md:w-96 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#009FE3]/20 text-white bg-gradient-to-r from-[#00316B] to-[#204972]">
          <h2 className="text-xl font-bold">Your Shopping Cart</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Cart Content */}
        <div className="flex flex-col h-[calc(100%-88px)]">
          <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
            {cart?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#009FE3]/10 to-[#87B105]/10 flex items-center justify-center mb-6">
                  <ShoppingCart className="w-12 h-12 text-[#204972]" />
                </div>
                <h3 className="text-xl font-bold text-[#00316B] mb-3">Your cart is empty</h3>
                <p className="text-[#204972] mb-8 text-lg">Add some items to get started!</p>
                <Link
                  href="/checkout"
                  className="flex items-center gap-2 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-[#00316B] to-[#204972] hover:from-[#204972] hover:to-[#009FE3] shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cart?.map((item) => (
                  <div
                    key={item?.itemId}
                    className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-[#009FE3]/20 bg-gradient-to-r from-white to-[#009FE3]/5 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-[#009FE3]/40"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item?.details?.full_image?.[0] || "/placeholder.svg"}
                        alt={item?.details?.title}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border-2 border-[#009FE3]/20"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-[#00316B] font-bold text-base sm:text-lg leading-snug line-clamp-2 mb-2">
                          {item?.details?.title}
                        </h3>
                        {item?.details?.book_category_id && (
                          <p className="text-sm text-[#204972] mb-3 font-medium">
                            {item?.details?.book_category_id?.name}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm sm:text-base mt-auto">
                        <span className="font-bold text-[#87B105] text-lg">
                          ₹{item?.details?.discount_price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(item?.itemId)}
                          className="p-2 text-[#204972] hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                        <div className="flex items-center border-2 border-[#009FE3]/20 rounded-xl overflow-hidden bg-white">
                          <button
                            onClick={() => updateQuantity(-1, item?.quantity, item?.itemId)}
                            className="px-3 py-2 hover:bg-[#009FE3]/10 disabled:opacity-50 transition-colors"
                            disabled={item?.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-[#204972]" />
                          </button>
                          <span className="px-4 text-sm font-bold min-w-[40px] text-center text-[#00316B]">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(1, item?.quantity, item?.itemId)}
                            className="px-3 py-2 hover:bg-[#009FE3]/10 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-[#204972]" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#00316B] flex justify-end">
                          Total: ₹{(item?.details?.discount_price * item?.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {cart?.length > 0 && (
                  <div className="bg-gradient-to-r from-white to-[#87B105]/5 p-6 rounded-2xl border-2 border-[#87B105]/20 shadow-lg">
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm text-[#204972]">
                        <span className="font-medium">
                          Subtotal <span className="text-[#204972]/70">({cart?.length} items)</span>
                        </span>
                        <span className="text-lg font-bold text-[#00316B]">₹{total.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-sm text-[#204972]">
                        <span className="font-medium">Shipping</span>
                        <span className="text-[#87B105] font-bold">Free</span>
                      </div>

                      <div className="border-t-2 border-dashed border-[#009FE3]/30 pt-4 flex justify-between text-xl font-bold text-[#00316B]">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/checkout"
                        className="flex items-center justify-center gap-3 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 bg-gradient-to-r from-[#00316B] to-[#204972] hover:from-[#204972] hover:to-[#009FE3] shadow-lg hover:shadow-xl transform hover:scale-105 w-full"
                      >
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>

                    <p className="text-center mt-4 text-xs text-[#204972]/70">
                      Shipping and taxes calculated at checkout
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${examsMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#00316B] to-[#204972] text-white shadow-lg">
          <h2 className="text-xl font-bold">All Exams</h2>
          <button
            onClick={() => setExamsMenuOpen(false)}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100%-88px)] p-4 space-y-4 custom-scrollbar">
          {Object.keys(examData).map((category) => (
            <div
              key={category}
              className="bg-gradient-to-r from-[#009FE3]/5 to-[#87B105]/5 rounded-xl shadow-sm border border-[#009FE3]/20"
            >
              {/* Category */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex justify-between items-center px-4 py-3 font-bold text-[#00316B] hover:bg-gradient-to-r hover:from-[#00316B] hover:to-[#204972] hover:text-white rounded-xl transition-all duration-200"
              >
                {category}
                {activeCategory === category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {/* Tabs */}
              {activeCategory === category && (
                <div className="mt-2 pl-4 space-y-2 pb-2">
                  {Object.keys(examData[category].tabs).map((tab) => (
                    <div key={tab} className="rounded-lg">
                      <button
                        onClick={() => toggleTab(category, tab)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-semibold text-[#204972] hover:bg-[#009FE3]/10 rounded-lg transition-colors"
                      >
                        {tab}
                        {openTabs[`${category}-${tab}`] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {openTabs[`${category}-${tab}`] && (
                        <ul className="mt-2 pl-4 space-y-2 text-sm text-[#204972]">
                          {examData[category].tabs[tab].map((exam) => (
                            <li
                              key={exam.name}
                              className="hover:text-[#00316B] hover:font-semibold py-1 px-2 hover:bg-[#87B105]/10 rounded cursor-pointer transition-all duration-200"
                              onClick={() => setExamsMenuOpen(false)}
                            >
                              {exam.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #00316B, #009FE3);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
        `}</style>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#00316B] to-[#204972] text-white shadow-lg">
          <span className="text-xl font-bold">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-3 text-[#00316B] font-semibold">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-gradient-to-r hover:from-[#00316B] hover:to-[#204972] hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3"
          >
            Home
          </Link>

          <button
            className="text-left hover:bg-gradient-to-r hover:from-[#00316B] hover:to-[#204972] hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3"
            onClick={() => {
              setMobileMenuOpen(false)
              setExamsMenuOpen(true)
            }}
          >
            All Exams
          </button>

          <Link
            href="/previous-year-question"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-gradient-to-r hover:from-[#00316B] hover:to-[#204972] hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3"
          >
            PYQs
          </Link>

          <Link
            href="/test-series"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-gradient-to-r hover:from-[#00316B] hover:to-[#204972] hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3"
          >
            Test Series
          </Link>

          <Link
            href="/current-affairs"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-gradient-to-r hover:from-[#00316B] hover:to-[#204972] hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3"
          >
            Current Affairs
          </Link>

          <Link
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-gradient-to-r hover:from-[#00316B] hover:to-[#204972] hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3"
          >
            News
          </Link>

          <Link
            href="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-gradient-to-r hover:from-[#00316B] hover:to-[#204972] hover:text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3"
          >
            Books
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {(mobileMenuOpen || examsMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => {
            setMobileMenuOpen(false)
            setExamsMenuOpen(false)
          }}
        ></div>
      )}
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
