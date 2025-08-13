"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Tag,
  Bell,
  ShoppingCart,
  Menu,
  X,
  ChevronUp,
  LogIn, UserPlus
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ExamMegaMenu from "./ExamMegaMenu";
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
      "Madhya Pradesh Exam": [
        { name: "MP Staff Nurse", img: "/vercel.svg" },
      ],
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
      "Rajasthan Exams": [
        { name: "Rajasthan Agriculture Officer", img: "/vercel.svg" },
      ],
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
      "Madhya Pradesh Exam": [
        { name: "MP Police Constable", img: "/vercel.svg" },
      ],
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
      "Uttar Pradesh Exams": [
        { name: "UPPSC AE", img: "/vercel.svg" },
      ],
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

export default function Header() {
  const [hideTopBar, setHideTopBar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examsMenuOpen, setExamsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [coursesMenu, setCoursesMenu] = useState(false)
  const [openTabs, setOpenTabs] = useState({});
  const lastScrollRef = useRef(0);

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const toggleTab = (category, tab) => {
    setOpenTabs((prev) => ({
      ...prev,
      [`${category}-${tab}`]: !prev[`${category}-${tab}`],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollRef.current && currentScroll > 50) {
        setHideTopBar(true);
      } else if (currentScroll < lastScrollRef.current) {
        setHideTopBar(false);
      }
      lastScrollRef.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div
        className={`bg-[#00316B] text-white text-sm border-b border-gray-100 transition-all duration-300 py-4 overflow-hidden ${hideTopBar ? "-translate-y-full" : "translate-y-0"}
          }`}
            style={{ willChange: "transform" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Left */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>+1 (396) 486 4709</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span>enquery@domain.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>795 South Park Avenue, CA</span>
            </div>
          </div>
          {/* Right */}
          <div className="flex items-center">
            <Link href="/login" className="relative py-2 px-3  me-2 inline-flex gap-1">
            <LogIn size={16} className="mt-1"/>

           Login
            </Link>
             <Link href="/register" className="relative py-2 px-3 inline-flex gap-1">
              <UserPlus size={16} className="mt-1"/>
           Register
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white sticky top-0 z-50 border-b py-2 border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 ">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Image/pv-logo.png"
              alt="PV classes"
              width={70}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-16 text-sm font-medium text-[#204972]">
            <Link href="/" className="hover:text-[#009FE3] text-base">
              Home
            </Link>
            <div
              className="relative group"
              onMouseEnter={() => setCoursesMenu(true)}
              onMouseLeave={() => setCoursesMenu(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#009FE3] transition text-base">
                All Exams
                <ChevronDown size={16} />
              </button>
              {coursesMenu && (
                <div className="absolute -left-75 top-full w-[800px] z-50">
                  <ExamMegaMenu />
                </div>
              )}
            </div>
            <Link href="/previous-year-question" className="hover:text-[#009FE3] text-base">
              PYQs
            </Link>
            <Link href="/test-series" className="hover:text-[#009FE3] text-base">
              Test Series
            </Link>
            <Link href="/current-affairs" className="hover:text-[#009FE3] text-base">
              Current Affairs
            </Link>
            <Link href="#" className="hover:text-[#009FE3] text-base">
              News
            </Link>
            <Link href="#" className="hover:text-[#009FE3] text-base">
              Books
            </Link>
          </nav>

            <div className="flex items-center">
            <button className="relative p-2 hover:bg-blue-100 rounded-full transition">
              <Tag size={20} />
            </button>
            <button className="relative p-2 hover:bg-blue-100 rounded-full transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="relative p-2 hover:bg-blue-100 rounded-full transition">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1 rounded-full">
                2
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* All Exams Offcanvas */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${examsMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#00316B] to-[#00529B] text-white shadow-md">
          <h2 className="text-lg font-semibold">All Exams</h2>
          <button
            onClick={() => setExamsMenuOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100%-64px)] p-4 space-y-4 custom-scrollbar">
          {Object.keys(examData).map((category) => (
            <div
              key={category}
              className="bg-gray-50 rounded-lg shadow-sm border border-gray-100"
            >
              {/* Category */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex justify-between items-center px-3 py-2 font-semibold text-[#00316B] hover:bg-[#00316B] hover:text-white rounded-lg transition"
              >
                {category}
                {activeCategory === category ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {/* Tabs */}
              {activeCategory === category && (
                <div className="mt-2 pl-3 space-y-2">
                  {Object.keys(examData[category].tabs).map((tab) => (
                    <div key={tab} className="rounded-md">
                      <button
                        onClick={() => toggleTab(category, tab)}
                        className="w-full flex justify-between items-center px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
                      >
                        {tab}
                        {openTabs[`${category}-${tab}`] ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      {openTabs[`${category}-${tab}`] && (
                        <ul className="mt-1 pl-4 space-y-1 text-sm text-gray-800">
                          {examData[category].tabs[tab].map((exam) => (
                            <li
                              key={exam.name}
                              className="hover:text-[#00316B] hover:font-medium my-2 text-gray-600 cursor-pointer transition"
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
      background-color: rgba(0, 49, 107, 0.5);
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
  `}</style>
      </div>


      {/* Mobile Offcanvas Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#00316B] to-[#004B99] text-white shadow-md">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-3 text-[#00316B] font-medium">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#00316B] hover:text-white px-3 py-2 rounded-md transition"
          >
            Home
          </Link>

          <button
            className="text-left hover:bg-[#00316B] hover:text-white px-3 py-2 rounded-md transition"
            onClick={() => {
              setMobileMenuOpen(false);
              setExamsMenuOpen(true);
            }}
          >
            All Exams
          </button>

          <Link
            href="/previous-year-question"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#00316B] hover:text-white px-3 py-2 rounded-md transition"
          >
            PYQs
          </Link>

          <Link
            href="/test-series"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#00316B] hover:text-white px-3 py-2 rounded-md transition"
          >
            Test Series
          </Link>

          <Link
            href="/current-affairs"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#00316B] hover:text-white px-3 py-2 rounded-md transition"
          >
            Current Affairs
          </Link>

          <Link
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#00316B] hover:text-white px-3 py-2 rounded-md transition"
          >
            News
          </Link>

          <Link
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:bg-[#00316B] hover:text-white px-3 py-2 rounded-md transition"
          >
            Books
          </Link>
        </nav>
      </div>


      {/* Overlay */}
      {(mobileMenuOpen || examsMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/10 z-40"
          onClick={() => {
            setMobileMenuOpen(false);
            setExamsMenuOpen(false);
          }}
        ></div>
      )}
    </>
  );
}
