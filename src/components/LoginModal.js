


// "use client"

// import { useState } from "react"
// import { X, Phone, Lock } from "lucide-react"
// import axiosInstance from "../app/axios/axiosInstance"
// import { toast } from "react-hot-toast"   // <-- toast added

// export default function LoginModal({ onClose, onRegisterClick, onForgotPasswordClick, onLoginSuccess }) {
//   const [formData, setFormData] = useState({
//     phone: "",
//     password: ""
//   })
//   const [isLoading, setIsLoading] = useState(false)

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     try {
//       const { data } = await axiosInstance.post("/users/login", {
//         phone: formData.phone,
//         password: formData.password
//       })

//       // Store token and user ID in localStorage
//       if (data?.token) localStorage.setItem("token", data.token)
//       if (data?.userId) localStorage.setItem("userId", data.userId)

//       toast.success(data.message || "Login successful!")  // <-- toast for success
//       if (onLoginSuccess) onLoginSuccess()

//     } catch (error) {
//       if (!error?.silent) {
//         toast.error(error?.response?.data?.message || "An error occurred during login") // <-- toast for error
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
//         <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#00316B] to-[#204972] text-white">
//           <h2 className="text-xl font-bold">Login to Your Account</h2>
//           <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
//             <X size={20} />
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {/* 🔹 Inline error box removed — toast will handle errors */}

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Phone Number</label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
//                 placeholder="Enter your phone number"
//               />
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>
          
//           <button
//             type="button"
//             onClick={onForgotPasswordClick}
//             className="text-sm text-[#009FE3] font-semibold hover:underline"
//           >
//             Forgot Password?
//           </button>
          
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 rounded-lg font-semibold hover:from-[#204972] hover:to-[#009FE3] transition-all duration-200 disabled:opacity-50"
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
          
//           <div className="text-center text-sm text-gray-600">
//             Don't have an account?{" "}
//             <button
//               type="button"
//               onClick={onRegisterClick}
//               className="text-[#009FE3] font-semibold hover:underline"
//             >
//               Register here
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { X, Phone, Lock } from "lucide-react"
import axiosInstance from "../app/axios/axiosInstance"
import { toast } from "react-hot-toast"   // <-- toast added

export default function LoginModal({ onClose, onRegisterClick, onForgotPasswordClick, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "phone") {
      // <-- added: only allow digits, validate first digit and max length
      let newVal = value.replace(/\D/g, "")         // remove non-digits
      if (newVal.length === 1 && !/[6-9]/.test(newVal)) {
        newVal = ""                                // clear if first digit not 6-9
      }
      if (newVal.length > 10) {
        newVal = newVal.slice(0, 10)               // limit to 10 digits
      }
      setFormData((prev) => ({ ...prev, phone: newVal }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // <-- added: validate phone format before submitting
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number starting with 6-9")
      setIsLoading(false)
      return
    }
    
    try {
      const { data } = await axiosInstance.post("/users/login", {
        phone: formData.phone,
        password: formData.password
      })

      // Store token and user ID in localStorage
      if (data?.token) localStorage.setItem("token", data.token)
      if (data?.userId) localStorage.setItem("userId", data.userId)

      toast.success(data.message || "Login successful!")  // <-- toast for success
      if (onLoginSuccess) onLoginSuccess()

    } catch (error) {
      if (!error?.silent) {
        toast.error(error?.response?.data?.message || "An error occurred during login") // <-- toast for error
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#00316B] to-[#204972] text-white">
          <h2 className="text-xl font-bold">Login to Your Account</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 🔹 Inline error box removed — toast will handle errors */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={10}   // <-- added as safety
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-sm text-[#009FE3] font-semibold hover:underline"
          >
            Forgot Password?
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 rounded-lg font-semibold hover:from-[#204972] hover:to-[#009FE3] transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Do not have an account?{" "}
            <button
              type="button"
              onClick={onRegisterClick}
              className="text-[#009FE3] font-semibold hover:underline"
            >
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
