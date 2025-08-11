"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    ChevronDown,
    Globe,
    Search,
    Phone,
    Bell,
    ShoppingCart,
    Tag
} from "lucide-react";
import ExamMegaMenu from "./ExamMegaMenu";

export default function Header() {
    const [coursesMenu, setCoursesMenu] = useState(false);
    return (
        <nav className="border-b border-gray-200 bg-white shadow-sm relative">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 gap-6">
                <div className="flex items-center">
                    <Image
                        src="/utkarsh-logo.png"
                        alt="Utkarsh Classes"
                        width={70}
                        height={70}
                        className="object-contain"
                    />
                </div>
                <div className="flex-1 max-w-lg relative">
                    <Search
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                        <Tag size={20} className="text-gray-700" />
                    </button>
                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                        <Bell size={20} className="text-gray-700" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                        <ShoppingCart size={20} className="text-gray-700" />
                        <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1 rounded-full">
                            2
                        </span>
                    </button>
                    <Link
                        href="#"
                        className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-medium px-5 py-2 rounded-full transition"
                    >
                        Login
                    </Link>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-evenly gap-6 text-sm font-medium text-gray-700">
                <Link href="#" className="hover:text-yellow-500 transition">Home</Link>
                <div
                    className="relative group"
                    onMouseEnter={() => setCoursesMenu(true)}
                    onMouseLeave={() => setCoursesMenu(false)}
                >
                    <button className="flex items-center gap-1 hover:text-yellow-500 transition">
                        All Exams
                        <ChevronDown size={14} />
                    </button>
                    {coursesMenu && (
                        <div className="absolute left-0 top-full w-[900px] z-50">
                            <ExamMegaMenu />
                        </div>
                    )}
                </div>
                <Link href="#" className="hover:text-yellow-500 transition">Courses</Link>
                <Link href="#" className="hover:text-yellow-500 transition">PYQs</Link>
                <Link href="#" className="hover:text-yellow-500 transition">Test Series</Link>
                <Link href="#" className="hover:text-yellow-500 transition">Current Affairs</Link>
                <Link href="#" className="hover:text-yellow-500 transition">Daily Quiz</Link>
                <Link href="#" className="hover:text-yellow-500 transition">News</Link>
                <Link href="#" className="hover:text-yellow-500 transition">Book</Link>
            </div>
        </nav>
    );
}
