
"use client"

import { useState, useEffect } from "react"
import { X, User, Phone, Lock } from "lucide-react"
import axiosInstance from "../app/axios/axiosInstance"
import { toast } from "react-hot-toast"
import axios from "axios";

export default function RegisterModal({ onClose, onLoginClick, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    state: "",
    district: "",
    exam: ""

  })
  const [isLoading, setIsLoading] = useState(false)

  const [states, setStates] = useState([])
  const [districts, setDistricts] = useState([])
  const [exams, setExams] = useState([])

  useEffect(() => {

    const fetchExams = async () => {
      try {

        const res = await axiosInstance.get("/exams")
        setExams(res.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchExams()

  }, [])


  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          { country: "India" }
        )

        setStates(res.data.data.states)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStates()
  }, [])


  const handleStateChange = async (e) => {
    const state = e.target.value

    setFormData((prev) => ({ ...prev, state }))

    try {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: "India",
          state
        }
      )

      setDistricts(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "phone") {
      // Allow only digits
      let newVal = value.replace(/\D/g, "")

      // Restrict first digit 6-9
      if (newVal.length === 1 && !/[6-9]/.test(newVal)) {
        newVal = ""   // clear if first digit not 6-9
      }

      // Limit to 10 digits
      if (newVal.length > 10) {
        newVal = newVal.slice(0, 10)
      }

      setFormData((prev) => ({ ...prev, phone: newVal }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number starting with 6-9")
      setIsLoading(false)
      return
    }

    try {
      const { data } = await axiosInstance.post("/users/register", {
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        state: formData.state,
        district: formData.district,
        exam: formData.exam

      })

      toast.success(data.message || "Registration successful!")
      if (onRegisterSuccess) onRegisterSuccess()

    } catch (error) {
      if (!error?.silent) {
        toast.error(error?.response?.data?.message || "An error occurred during registration")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    //   <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
    //     <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#00316B] to-[#204972] text-white">
    //       <h2 className="text-xl font-bold">Create Account</h2>
    //       <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
    //         <X size={20} />
    //       </button>
    //     </div>

    //     <form onSubmit={handleSubmit} className="px-4 py-2 space-y-3">
    //       {/* 🔹 Inline error box removed — toast will handle errors */}

    //       <div className="space-y-2">
    //         <label className="text-sm font-medium text-gray-700">Full Name</label>
    //         <div className="relative">
    //           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    //           <input
    //             type="text"
    //             name="name"
    //             value={formData.name}
    //             onChange={handleChange}
    //             required
    //             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
    //             placeholder="Enter your full name"
    //           />
    //         </div>
    //       </div>

    //       <div className="space-y-2">
    //         <label className="text-sm font-medium text-gray-700">Phone Number</label>
    //         <div className="relative">
    //           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    //           <input
    //             type="tel"
    //             name="phone"
    //             value={formData.phone}
    //             onChange={handleChange}
    //             required
    //             maxLength={10}  // <-- added as safety
    //             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
    //             placeholder="Enter your phone number"
    //           />
    //         </div>
    //       </div>

    //       <div className="space-y-2">
    //         <label className="text-sm font-medium text-gray-700">Password</label>
    //         <div className="relative">
    //           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    //           <input
    //             type="password"
    //             name="password"
    //             value={formData.password}
    //             onChange={handleChange}
    //             required
    //             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
    //             placeholder="Create a password"
    //           />
    //         </div>
    //       </div>

    //       <div className="space-y-2">
    //         <label className="text-sm font-medium text-gray-700">Confirm Password</label>
    //         <div className="relative">
    //           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    //           <input
    //             type="password"
    //             name="confirmPassword"
    //             value={formData.confirmPassword}
    //             onChange={handleChange}
    //             required
    //             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
    //             placeholder="Confirm your password"
    //           />
    //         </div>
    //       </div>

    //       <select
    //         name="state"
    //         value={formData.state}
    //         onChange={handleStateChange}
    //         required
    //         className="w-full border p-2 rounded"
    //       >
    //         <option value="">Select State</option>
    //         {states.map((s, i) => (
    //           <option key={i} value={s.name}>
    //             {s.name}
    //           </option>
    //         ))}
    //       </select>


    //       <select
    //         name="district"
    //         value={formData.district}
    //         onChange={handleChange}
    //         required
    //         className="w-full border p-2 rounded"
    //       >
    //         <option value="">Select District</option>
    //         {districts.map((d, i) => (
    //           <option key={i} value={d}>
    //             {d}
    //           </option>
    //         ))}
    //       </select>

    //       <select
    //         name="exam"
    //         value={formData.exam}
    //         onChange={handleChange}
    //         required
    //         className="w-full border p-2 rounded"
    //       >
    //         <option value="">Select Exam</option>

    //         {exams.map((exam) => (
    //           <option key={exam._id} value={exam._id}>
    //             {exam.name}
    //           </option>
    //         ))}

    //       </select>

    //       <button
    //         type="submit"
    //         disabled={isLoading}
    //         className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 rounded-lg font-semibold hover:from-[#204972] hover:to-[#009FE3] transition-all duration-200 disabled:opacity-50"
    //       >
    //         {isLoading ? "Creating Account..." : "Create Account"}
    //       </button>

    //       <div className="text-center text-sm text-gray-600">
    //         Already have an account?{" "}
    //         <button
    //           type="button"
    //           onClick={onLoginClick}
    //           className="text-[#009FE3] font-semibold hover:underline"
    //         >
    //           Login here
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 h-[95vh] relative">
          <img
            // src="/Image/study.jpeg" // apni image daal dena
            src="/Image/pic2.jpeg" // apni image daal dena
            alt="register"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00316B]/90 via-[#00316B]/60 to-transparent flex flex-col justify-end p-6 text-white">
            <h2 className="text-2xl font-bold">Start Your Journey 🚀</h2>
            <p className="text-sm opacity-90">
              Join PV Classes & crack your dream exam
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#00316B]">
              Create Account
            </h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#009FE3]"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#009FE3]"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#009FE3]"
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#009FE3]"
            />

            {/* State */}
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select State</option>
              {states.map((s, i) => (
                <option key={i} value={s.name}>{s.name}</option>
              ))}
            </select>

            {/* District */}
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select District</option>
              {districts.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>

            {/* Exam */}
            <select
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Exam</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.name}
                </option>
              ))}
            </select>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#00316B] to-[#87B105] hover:opacity-90 transition"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="text-sm text-center">
              Already have account?{" "}
              <span
                onClick={onLoginClick}
                className="text-[#009FE3] cursor-pointer font-semibold"
              >
                Login
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}
