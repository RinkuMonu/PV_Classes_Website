"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Phone, Mail, MapPin, BookOpen, Award, ArrowLeft } from "lucide-react"
import axios from "axios"
import Swal from "sweetalert2"
import axiosInstance from "../axios/axiosInstance"
import Image from "next/image"

export default function OfflineEventRegisterPage() {
    const router = useRouter()

    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        fatherName: "",
        motherName: "",
        email: "",
        mobile: "",
        exam: "",
        rollNumber: "",
        qualification: "",
        city: "",
        state: "",
        teachingSubjects: [],
        disabilitySpecialization: ""
    })

    // UI states
    const [isLoading, setIsLoading] = useState(false)
    const [exams, setExams] = useState([])
    const [statesList, setStatesList] = useState([])
    const [citiesList, setCitiesList] = useState([])
    const [isFetchingCities, setIsFetchingCities] = useState(false)

    // Validation errors
    const [errors, setErrors] = useState({})

    // Fetch exams on mount
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await axiosInstance.get("/exams")
                setExams(res.data)
            } catch (error) {
                console.error("Failed to fetch exams:", error)
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load exams. Please refresh the page.",
                    confirmButtonColor: "#00316B"
                })
            }
        }
        fetchExams()
    }, [])

    // Fetch Indian states on mount
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const res = await axios.post(
                    "https://countriesnow.space/api/v0.1/countries/states",
                    { country: "India" }
                )
                setStatesList(res.data.data.states.map(s => s.name))
            } catch (error) {
                console.error("Failed to fetch states:", error)
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load states. Please refresh.",
                    confirmButtonColor: "#00316B"
                })
            }
        }
        fetchStates()
    }, [])

    // Fetch cities when state changes
    const handleStateChange = async (selectedState) => {
        setFormData(prev => ({ ...prev, state: selectedState, city: "" }))
        setCitiesList([])
        if (!selectedState) return

        setIsFetchingCities(true)
        try {
            const res = await axios.post(
                "https://countriesnow.space/api/v0.1/countries/state/cities",
                {
                    country: "India",
                    state: selectedState
                }
            )
            setCitiesList(res.data.data)
        } catch (error) {
            console.error("Failed to fetch cities:", error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load cities. Please select again.",
                confirmButtonColor: "#00316B"
            })
        } finally {
            setIsFetchingCities(false)
        }
    }

    // Handle input changes with validation
    const handleChange = (e) => {
        const { name, value } = e.target
        let newValue = value

        // Mobile validation: only digits, first digit 6-9, max 10 digits
        if (name === "mobile") {
            newValue = value.replace(/\D/g, "")
            if (newValue.length === 1 && !/[6-9]/.test(newValue)) {
                newValue = ""
            }
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10)
            }
        }

        // Subject selection (max 2)
        if (name === "teachingSubjects") {

            const value = e.target.value

            let updatedSubjects = [...formData.teachingSubjects]

            if (updatedSubjects.includes(value)) {
                updatedSubjects = updatedSubjects.filter(sub => sub !== value)
            } else {
                if (updatedSubjects.length < 2) {
                    updatedSubjects.push(value)
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Only 2 subjects allowed",
                        confirmButtonColor: "#00316B"
                    })
                    return
                }
            }

            setFormData(prev => ({ ...prev, teachingSubjects: updatedSubjects }))
            return
        }

        setFormData(prev => ({ ...prev, [name]: newValue }))

        // Clear specific field error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    // Form validation
    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) newErrors.name = "Full name is required"
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address"
        }
        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required"
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter a valid 10-digit mobile number starting with 6-9"
        }
        if (!formData.exam) newErrors.exam = "Please select an exam"
        if (!formData.rollNumber.trim()) newErrors.rollNumber = "Roll number is required"
        if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required"
        if (!formData.city.trim()) newErrors.city = "City is required"
        if (!formData.state) newErrors.state = "Please select a state"

        if (formData.teachingSubjects.length === 0) {
            newErrors.teachingSubjects = "Please select at least 1 subject"
        }

        if (!formData.disabilitySpecialization) {
            newErrors.disabilitySpecialization = "Please select disability specialization"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token");

        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login to continue",
                confirmButtonText: "OKay",
                showCancelButton: true,
            });

            return;
        }

        if (!validateForm()) {
            // Scroll to first error
            const firstErrorField = Object.keys(errors)[0]
            const element = document.getElementsByName(firstErrorField)[0]
            element?.scrollIntoView({ behavior: "smooth", block: "center" })
            return
        }

        setIsLoading(true)

        try {
            // const response = await axiosInstance.post("/offline-interview/register", {
            //     name: formData.name,
            //     fatherName: formData.fatherName,
            //     motherName: formData.motherName,
            //     email: formData.email,
            //     mobile: formData.mobile,
            //     exam: formData.exam,
            //     type: "test", // default type
            //     rollNumber: formData.rollNumber,
            //     qualification: formData.qualification,
            //     city: formData.city,
            //     state: formData.state,
            //     teachingSubjects: formData.teachingSubjects,
            //     disabilitySpecialization: formData.disabilitySpecialization
            // })

            const response = await axiosInstance.post("/offline-interview/register", {
                ...formData,
                type: "test"
            });

            const orderId = response.data.orderId;


            // 2️⃣ Direct PayIn call
            const payinRes = await axiosInstance.post("/payment/payin", {
                orderId
            });

            const redirectUrl =
                payinRes?.data?.paymentData?.data?.redirectEx;

            if (!redirectUrl) {
                throw new Error("Payment URL not received");
            }

            // 3️⃣ Redirect to payment page
            window.location.href = redirectUrl;


        } catch (error) {
            console.error("Registration error:", error)


            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: errorMessage,
                confirmButtonColor: "#00316B"
            })

        } finally {
            setIsLoading(false)
        }
    }

    // Go back
    const handleGoBack = () => {
        router.back()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Banner Section */}
            <section className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        // src="/Image/Banner/offline.jpeg"
                        // src="/Image/Banner/offlineTest.jpeg"
                        src="/Image/Banner/offlineTestBanner.jpeg"
                        alt="Offline Test Banner Desktop"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>

            </section>

            {/* Form Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-[#00316B] to-[#204972] px-6 sm:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleGoBack}
                                className="text-white/90 hover:text-white flex items-center gap-2 transition-colors bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2"
                            >
                                <ArrowLeft size={18} />
                                <span className="text-sm font-medium">Back</span>
                            </button>
                            <h2 className="text-xl sm:text-2xl font-semibold text-white">
                                Registration Form for Offline Test
                            </h2>
                            <div className="w-24" /> {/* spacer */}
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 2-Column Grid for form fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <User size={16} className="text-[#009FE3]" />
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`w-full px-4 py-2.5 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Mail size={16} className="text-[#009FE3]" />
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className={`w-full px-4 py-2.5 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                {/* Mobile Field */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Phone size={16} className="text-[#009FE3]" />
                                        Mobile Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter 10-digit mobile number"
                                        maxLength={10}
                                        className={`w-full px-4 py-2.5 border ${errors.mobile ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white`}
                                    />
                                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                                </div>

                                {/* Exam Selection */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <BookOpen size={16} className="text-[#009FE3]" />
                                        Select Exam <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="exam"
                                        value={formData.exam}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 border ${errors.exam ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white appearance-none cursor-pointer`}
                                    >
                                        <option value="">-- Choose an exam --</option>
                                        {exams.map((exam) => (
                                            <option key={exam._id} value={exam._id}>
                                                {exam.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.exam && <p className="text-red-500 text-xs mt-1">{errors.exam}</p>}
                                </div>

                                {/* Roll Number */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Award size={16} className="text-[#009FE3]" />
                                        Roll Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="rollNumber"
                                        value={formData.rollNumber}
                                        onChange={handleChange}
                                        placeholder="e.g., KVS2026-12345"
                                        className={`w-full px-4 py-2.5 border ${errors.rollNumber ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white`}
                                    />
                                    {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>}
                                </div>

                                {/* Qualification */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <User size={16} className="text-[#009FE3]" />
                                        Qualification <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        placeholder="e.g., B.Ed, M.Sc, etc."
                                        className={`w-full px-4 py-2.5 border ${errors.qualification ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white`}
                                    />
                                    {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
                                </div>


                                {/* Father Name */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Father Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleChange}
                                        placeholder="Enter father name"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* Mother Name */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Mother Name
                                    </label>
                                    <input
                                        type="text"
                                        name="motherName"
                                        value={formData.motherName}
                                        onChange={handleChange}
                                        placeholder="Enter mother name"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                {/* State */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <MapPin size={16} className="text-[#009FE3]" />
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={(e) => handleStateChange(e.target.value)}
                                        className={`w-full px-4 py-2.5 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white appearance-none cursor-pointer`}
                                    >
                                        <option value="">-- Select State --</option>
                                        {statesList.map((state, idx) => (
                                            <option key={idx} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>

                                {/* City */}
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <MapPin size={16} className="text-[#009FE3]" />
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    {formData.state ? (
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            disabled={isFetchingCities || citiesList.length === 0}
                                            className={`w-full px-4 py-2.5 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                        >
                                            <option value="">
                                                {isFetchingCities ? "Loading cities..." : "-- Select City --"}
                                            </option>
                                            {citiesList.map((city, idx) => (
                                                <option key={idx} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Enter city name"
                                            className={`w-full px-4 py-2.5 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent transition-all bg-gray-50/80 hover:bg-white`}
                                        />
                                    )}
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>

                                {/* Teaching Subjects */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Teaching Subjects (Select max 2)
                                    </label>

                                    <div className="flex flex-wrap gap-4">

                                        {["maths", "sst", "hindi", "english", "science"].map((sub) => (
                                            <label key={sub} className="flex items-center gap-2">

                                                <input
                                                    type="checkbox"
                                                    value={sub}
                                                    checked={formData.teachingSubjects.includes(sub)}
                                                    onChange={handleChange}
                                                    name="teachingSubjects"
                                                />

                                                <span className="capitalize">{sub}</span>

                                            </label>
                                        ))}

                                    </div>

                                    {errors.teachingSubjects && (
                                        <p className="text-red-500 text-xs">{errors.teachingSubjects}</p>
                                    )}
                                </div>

                                {/* Disability Specialization */}
                                <div className="md:col-span-2 space-y-1">

                                    <label className="text-sm font-semibold text-gray-700">
                                        Disability Specialization
                                    </label>

                                    <select
                                        name="disabilitySpecialization"
                                        value={formData.disabilitySpecialization}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                    >

                                        <option value="">-- Select Specialization --</option>
                                        <option value="Intellectual-Disability">Intellectual Disability (ID)</option>

                                    </select>

                                    {errors.disabilitySpecialization && (
                                        <p className="text-red-500 text-xs">{errors.disabilitySpecialization}</p>
                                    )}

                                </div>

                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3.5 rounded-xl font-bold text-lg hover:from-[#204972] hover:to-[#009FE3] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : (
                                        "Register for Offline Test"
                                    )}
                                </button>
                            </div>

                            {/* Offline Test Location */}
                            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                <p className="text-sm sm:text-base font-semibold text-[#00316B]">
                                    Offline Test Location :- <span className="text-[#009FE3]">Jagatpura, Jaipur</span>
                                </p>
                            </div>

                            {/* Note */}
                            <p className="text-xs text-gray-500 text-center mt-4">
                                Fields marked with <span className="text-red-500">*</span> are mandatory.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}