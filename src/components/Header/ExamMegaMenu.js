"use client";

import { useState } from "react";
import Image from "next/image";

export default function ExamMegaMenu() {
const data = {
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

  // States
  const [activeCategory, setActiveCategory] = useState(Object.keys(data)[0]);
  const [activeTab, setActiveTab] = useState(
    Object.keys(data[Object.keys(data)[0]].tabs)[0]
  );

  return (
    <div className="w-full border border-gray-200 bg-white rounded-md shadow-lg flex overflow-hidden pt-2">
      {/* Left Category Menu */}
      <div className="w-60 border-r border-gray-200 bg-white">
        {Object.keys(data).map((cat) => (
          <button
            key={cat}
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
              activeCategory === cat ? "bg-gray-100 font-semibold" : ""
            }`}
            onMouseEnter={() => {
              setActiveCategory(cat);
              setActiveTab(Object.keys(data[cat].tabs)[0]); // reset to first tab
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white p-4">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-4 overflow-x-auto">
          {Object.keys(data[activeCategory].tabs).map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-gray-800 text-gray-900 font-semibold"
                  : "text-gray-600"
              }`}
              onMouseEnter={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-3 gap-4">
          {data[activeCategory].tabs[activeTab].map((exam) => (
            <div
              key={exam.name}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow"
            >
              <div className="w-10 h-10 relative">
                <Image
                  src={exam.img}
                  alt={exam.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-800">
                {exam.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
