"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

const quizData = [
  {
    id: 1,
    title: "Daily Health Knowledge Quiz",
    date: "2025-08-10",
    category: "Health",
    image: "/test1.webp",
    link: "/quiz/health",
  },
  {
    id: 2,
    title: "Sports Trivia Challenge",
    date: "2025-08-09",
    category: "Sports",
    image: "/test1.webp",
    link: "/quiz/sports",
  },
  {
    id: 3,
    title: "Science Facts Quiz",
    date: "2025-08-08",
    category: "Science",
    image: "/test1.webp",
    link: "/quiz/science",
  },
  {
    id: 4,
    title: "Science Facts Quiz",
    date: "2025-08-08",
    category: "Science",
    image: "/test1.webp",
    link: "/quiz/science",
  },
];

export default function QuizCard() {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-6">
        {quizData.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="flex-shrink-0 w-64 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <CalendarDays size={16} />
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <h2 className="text-base font-semibold line-clamp-2 mb-3">
                {item.title}
              </h2>
              <button className="bg-yellow-400 w-full text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-300 transition">
                Start Quiz
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
