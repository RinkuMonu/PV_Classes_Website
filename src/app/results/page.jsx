"use client";

import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import Swal from "sweetalert2";
import Image from "next/image";

export default function StudentResultForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    examType: "",
    marks: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosInstance.post("/results", {
        ...formData,
        marks: Number(formData.marks),
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Submitted Successfully 🎉",
          text: "Your result has been saved",
        });

        setFormData({
          name: "",
          category: "",
          examType: "",
          marks: "",
          message: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">

      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">

        {/* 🔵 Left Side Image */}
        <div className="relative hidden md:block">
          <Image
            src="/Image/study.jpeg"
            alt="Study"
            fill
            className="object-cover"
          />

        </div>

        {/* 🟢 Right Side Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#00316B] mb-6 text-center">
            🎓 KVS-NVS SPECIAL EDUCATOR EXAM SCORE
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#00316B] outline-none"
            />

            {/* Category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#00316B]"
            >
              <option value="">Select Category</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="GENERAL">GENERAL</option>
              <option value="EWS">EWS</option>
            </select>

            {/* Exam Type */}
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#00316B]"
            >
              <option value="">Select Exam Type</option>
              <option value="PRT">PRT</option>
              <option value="TGT">TGT</option>
            </select>

            {/* Marks */}
            <input
              type="number"
              name="marks"
              placeholder="Marks (out of 60)"
              value={formData.marks}
              onChange={handleChange}
              required
              min="0"
              max="60"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#00316B]"
            />

            <textarea
              name="message"
              placeholder="How was your exam experience?"
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00316B] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              {loading ? "Submitting..." : "Submit Result"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}