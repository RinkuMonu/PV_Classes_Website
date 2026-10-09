"use client";

import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import Swal from "sweetalert2";
import Image from "next/image";

export default function StudentResultForm() {
  const [formData, setFormData] = useState({
    name: "",
    mockInterview: "",
    contact: "",
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
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Submitted Successfully 🎉",
          text: "Your result has been saved",
        });

        setFormData({
          name: "",
          mockInterview: "",
          contact: "",
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
            🎓 KVS-NVS SPECIAL EDUCATOR MOCK INTERVIEW PROGRAM
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

            {/* Mock Interview */}
            <select
              name="mockInterview"
              value={formData.mockInterview}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#00316B]"
            >
              <option value="">Select Mock Interview Program</option>
              <option value="PRT Special Educator">PRT Special Educator</option>
              <option value="TGT Special Educator">TGT Special Educator</option>
            </select>

            {/* Contact */}
            <input
              type="text"
              name="contact"
              placeholder="Enter your contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#00316B] outline-none"
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