


// "use client"

// import { useState } from "react"
// import { X, Phone, Lock } from "lucide-react"
// import axiosInstance from "../app/axios/axiosInstance"
// import { toast } from "react-hot-toast"   // <-- added toast

// export default function ForgotPasswordModal({ onClose, onLoginClick, onPasswordResetSuccess }) {
//   const [step, setStep] = useState(1) // 1: Request OTP, 2: Reset Password
//   const [formData, setFormData] = useState({
//     phone: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: ""
//   })
//   const [isLoading, setIsLoading] = useState(false)

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleRequestOTP = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     try {
//       const { data } = await axiosInstance.post("/users/forgot-password", {
//         phone: formData.phone
//       })

//       toast.success(data.message || "OTP sent to your phone number")  // <-- success toast
//       setStep(2)
//     } catch (error) {
//       if (!error?.silent) {
//         toast.error(error?.response?.data?.message || "Failed to send OTP")  // <-- error toast
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleResetPassword = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     if (formData.newPassword !== formData.confirmPassword) {
//       toast.error("Passwords do not match")   // <-- error toast
//       setIsLoading(false)
//       return
//     }
    
//     try {
//       const { data } = await axiosInstance.post("/users/reset-password", {
//         phone: formData.phone,
//         otp: formData.otp,
//         newPassword: formData.newPassword
//       })

//       toast.success(data.message || "Password reset successfully")  // <-- success toast
//       setTimeout(() => {
//         if (onPasswordResetSuccess) onPasswordResetSuccess()
//       }, 1500)
//     } catch (error) {
//       if (!error?.silent) {
//         toast.error(error?.response?.data?.message || "Failed to reset password")  // <-- error toast
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
//         <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#00316B] to-[#204972] text-white">
//           <h2 className="text-xl font-bold">
//             {step === 1 ? "Forgot Password" : "Reset Password"}
//           </h2>
//           <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
//             <X size={20} />
//           </button>
//         </div>
        
//         <form onSubmit={step === 1 ? handleRequestOTP : handleResetPassword} className="p-6 space-y-4">
//           {/* 🔹 Removed inline error/message boxes — toast will handle these */}
          
//           {step === 1 ? (
//             <div className="space-y-4">
//               <p className="text-gray-600">Enter your phone number to receive a verification code</p>
              
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 rounded-lg font-semibold hover:from-[#204972] hover:to-[#009FE3] transition-all duration-200 disabled:opacity-50"
//               >
//                 {isLoading ? "Sending OTP..." : "Send Verification Code"}
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <p className="text-gray-600">Enter the verification code sent to your phone and your new password</p>
              
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Verification Code</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     name="otp"
//                     value={formData.otp}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
//                     placeholder="Enter verification code"
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">New Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="password"
//                     name="newPassword"
//                     value={formData.newPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
//                     placeholder="Enter new password"
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
//                     placeholder="Confirm new password"
//                   />
//                 </div>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 rounded-lg font-semibold hover:from-[#204972] hover:to-[#009FE3] transition-all duration-200 disabled:opacity-50"
//               >
//                 {isLoading ? "Resetting Password..." : "Reset Password"}
//               </button>
//             </div>
//           )}
          
//           <div className="text-center text-sm text-gray-600">
//             Remember your password?{" "}
//             <button
//               type="button"
//               onClick={onLoginClick}
//               className="text-[#009FE3] font-semibold hover:underline"
//             >
//               Login here
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
import { toast } from "react-hot-toast"   // <-- added toast

export default function ForgotPasswordModal({ onClose, onLoginClick, onPasswordResetSuccess }) {
  const [step, setStep] = useState(1) // 1: Request OTP, 2: Reset Password
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    // <-- added: phone validation for typing
    if (name === "phone") {
      let newVal = value.replace(/\D/g, "")      // remove non-digits
      if (newVal.length === 1 && !/[6-9]/.test(newVal)) {
        newVal = ""                             // clear if first digit not 6-9
      }
      if (newVal.length > 10) {
        newVal = newVal.slice(0, 10)            // limit to 10 digits
      }
      setFormData((prev) => ({ ...prev, phone: newVal }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRequestOTP = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // <-- added: validate phone before sending OTP
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number starting with 6-9")
      setIsLoading(false)
      return
    }
    
    try {
      const { data } = await axiosInstance.post("/users/forgot-password", {
        phone: formData.phone
      })

      toast.success(data.message || "OTP sent to your phone number")  // <-- success toast
      setStep(2)
    } catch (error) {
      if (!error?.silent) {
        toast.error(error?.response?.data?.message || "Failed to send OTP")  // <-- error toast
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match")   // <-- error toast
      setIsLoading(false)
      return
    }
    
    try {
      const { data } = await axiosInstance.post("/users/reset-password", {
        phone: formData.phone,
        otp: formData.otp,
        newPassword: formData.newPassword
      })

      toast.success(data.message || "Password reset successfully")  // <-- success toast
      setTimeout(() => {
        if (onPasswordResetSuccess) onPasswordResetSuccess()
      }, 1500)
    } catch (error) {
      if (!error?.silent) {
        toast.error(error?.response?.data?.message || "Failed to reset password")  // <-- error toast
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#00316B] to-[#204972] text-white">
          <h2 className="text-xl font-bold">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={step === 1 ? handleRequestOTP : handleResetPassword} className="p-6 space-y-4">
          {/* 🔹 Removed inline error/message boxes — toast will handle these */}
          
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-gray-600">Enter your phone number to receive a verification code</p>
              
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
                    maxLength={10}   // <-- safety limit
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 rounded-lg font-semibold hover:from-[#204972] hover:to-[#009FE3] transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "Sending OTP..." : "Send Verification Code"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">Enter the verification code sent to your phone and your new password</p>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Verification Code</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
                    placeholder="Enter verification code"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009FE3] focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 rounded-lg font-semibold hover:from-[#204972] hover:to-[#009FE3] transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </div>
          )}
          
          <div className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <button
              type="button"
              onClick={onLoginClick}
              className="text-[#009FE3] font-semibold hover:underline"
            >
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
