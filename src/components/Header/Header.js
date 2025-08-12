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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ExamMegaMenu from "./ExamMegaMenu";

export default function Header() {
  const [coursesMenu, setCoursesMenu] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const lastScrollRef = useRef(0);

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
      <div
        className={`bg-[#00316B] text-white text-sm border-b border-gray-100 transition-all duration-300 overflow-hidden ${
          hideTopBar ? "max-h-0 py-0" : "max-h-20 py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Left side */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Phone size={14}  />
              <span>+1 (396) 486 4709</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={14}  />
              <span>enquery@domain.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14}  />
              <span>795 South Park Avenue, CA</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Tag size={20} className="text-white" />
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell size={20} className="text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingCart size={20} className="text-white" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1 rounded-full">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="PV classes"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Menu */}
          <nav className="flex items-center gap-6 text-sm font-medium text-[#204972]">
            <Link href="/" className="hover:text-[#009FE3]">
              Home
            </Link>
            <div
              className="relative group"
              onMouseEnter={() => setCoursesMenu(true)}
              onMouseLeave={() => setCoursesMenu(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#009FE3] transition">
                All Exams
                <ChevronDown size={14} />
              </button>
              {coursesMenu && (
                <div className="absolute -left-75 top-full w-[800px] z-50">
                  <ExamMegaMenu />
                </div>
              )}
            </div>
            <Link href="#" className="hover:text-[#009FE3]">
              PYQs
            </Link>
            <Link href="/test-series" className="hover:text-[#009FE3]">
            Test Series
            </Link>
            <Link href="/current-affairs" className="hover:text-[#009FE3]">
             Current Affairs
            </Link>
            <Link href="#" className="hover:text-[#009FE3]">
              News
            </Link>
            <Link href="#" className="hover:text-[#009FE3]">
              Books
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
