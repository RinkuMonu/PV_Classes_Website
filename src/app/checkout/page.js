"use client"
import { useEffect, useState } from "react"
// import QRCode from "react-qr-code"
import { ChevronLeft, Wallet, Check, CreditCard, Clock, Shield } from "lucide-react"
// import logo from "../assest/logo.jpg"
// import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Link from "next/link"
// import { DotLottieReact } from "@lottiefiles/dotlottie-react"
// import LoginModal from "../components/loginModal/loginModal";
// import Login1 from "../pages/Login1";
// import Swal from 'sweetalert2';


function AddressShipping() {
  const [isNewAddress, setIsNewAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("")
  const [selectedShipping, setSelectedShipping] = useState("1")
  const [selectedPayment, setSelectedPayment] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [upiIntent, setUpiIntent] = useState(null)
  const [isloading, setIsLoading] = useState(false)
  const [reference, setReference] = useState("")
  // const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const [pinCode, setPinCode] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const token = "zsdfgyxchh"
 const shippingMethods = [
  {
    id: "free",
    name: "Free Delivery",
    price: 0,
    description: "Get your order delivered in 5-7 business days at no extra cost.",
  },
  {
    id: "flat",
    name: "Flat Rate",
    price: 20,
    description: "Fast and reliable shipping at a fixed rate.",
  },
  {
    id: "express",
    name: "Express Delivery",
    price: 99,
    description: "Get your order delivered within 1-2 business days.",
  },
];
const addresses = [
  {
    id: "1",
    name: "Anisha Parmar",
    address: "123, Green Park Apartments, MG Road, Mumbai, Maharashtra - 400001",
    phone: "+91 9876543210",
    email: "anisha@example.com",
  },
  {
    id: "2",
    name: "Rohan Sharma",
    address: "45, Rosewood Society, Sector 21, Gurgaon, Haryana - 122016",
    phone: "+91 9123456789",
    email: "rohan@example.com",
  },
  {
    id: "3",
    name: "Priya Mehta",
    address: "Flat 301, Lake View Residency, Baner, Pune, Maharashtra - 411045",
    phone: "+91 9988776655",
    email: "priya@example.com",
  },
];
const cartItems = [
  {
    id: 1,
    name: "Floral Block Print Cotton Kurta",
    image: "test1.webp",
    quantity: 2,
    price: 1299,
  },
  {
    id: 2,
    name: "Handcrafted Wooden Serving Bowl",
    image: "test1.webp",
    quantity: 1,
    price: 899,
  },
  {
    id: 3,
    name: "Vintage Block Print Cushion Cover",
    image: "test1.webp",
    quantity: 3,
    price: 499,
  },
];




  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  })

  const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = []
  const total = subtotal + shipping

  // Validation functions
  const validateField = (fieldName, value) => {
    let error = ''

    switch (fieldName) {
      case 'name':
        if (!value.trim()) error = 'Full name is required'
        else if (value.length < 3) error = 'Name must be at least 3 characters'
        break

      case 'email':
        if (!value.trim()) error = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email'
        break

      case 'phone':
        if (!value.trim()) error = 'Phone number is required'
        else if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits'
        break

      case 'pinCode':
        if (!value.trim()) error = 'PIN code is required'
        else if (!/^\d{6}$/.test(value)) error = 'PIN code must be 6 digits'
        break

      case 'address':
        if (!value.trim()) error = 'Address is required'
        else if (value.length < 10) error = 'Address must be at least 10 characters'
        break
    }

    setErrors(prev => ({ ...prev, [fieldName]: error }))
    return !error
  }

  const validateForm = () => {
    const fieldsToValidate = isNewAddress ?
      ['name', 'email', 'phone', 'pinCode', 'address'] :
      ['email', 'phone'] // Basic validation if not new address

    const validationResults = fieldsToValidate.map(field => {
      const value = field === 'pinCode' ? pinCode : userdata[field]
      return validateField(field, value)
    })

    return validationResults.every(valid => valid)
  }

  const handleBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }))
    const value = fieldName === 'pinCode' ? pinCode : userdata[fieldName]
    validateField(fieldName, value)
  }

  const handleAddressChange = (e) => {
    const value = e.target.value
    setIsNewAddress(value === "new")
    setSelectedAddress(value)
    // Reset errors when changing address type
    if (value !== "new") {
      setErrors({})
    }
  }

  const generateReferenceNumber = () => {
    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 10000)
    return `${timestamp}${randomNum}`
  }

  const handlePayment = async () => {

    const isUserLoggedIn = !!localStorage.getItem("token");

    if (!isUserLoggedIn) {
  
      return;
    }
    if (!validateForm()) {
      // Mark all fields as touched to show errors
      const allFields = isNewAddress ?
        ['name', 'email', 'phone', 'pinCode', 'address'] :
        ['email', 'phone']
      setTouchedFields(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
      return
    }

    setIsLoading(true)
    const newRef = generateReferenceNumber()
    setReference(newRef)

    try {
      const gatewayConfigs = {
        upi1: {
          apiUrl: "https://api.worldpayme.com/",
          payload: {
            amount: total.toString(),
            reference: newRef,
            name: userdata.name,
            mobile: userdata.phone,
            email: userdata.email,
            userId: "67b6f05e6",
            myip: "666666",
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          extractIntent: (res) => res.data?.data?.upiIntent,
        },
        upi2: {
          apiUrl: "https://api.worldpayme.com/",
          payload: {
            amount: total.toString(),
            reference: newRef,
            name: userdata.name,
            mobile: userdata.phone,
            email: userdata.email,
            userId: "67b6f05e",
            myip: "666666",
          },
          headers: {
            Authorization: `Bearer -xebvWE39ZySDpB9DjLtQ4jxjQbyer6I`,
            "Content-Type": "application/json",
          },
          extractIntent: (res) => res.data?.data?.upiIntent || res.data?.upiUrl,
        },
      }

      if (!selectedPayment) {
        Swal.fire({
  title: 'Failed!',
  text: 'Please select a payment method.',
  icon: 'error',
  confirmButtonText: 'Retry',
});

        setIsLoading(false)
        return
      }

      const config = gatewayConfigs[selectedPayment]
      if (!config) throw new Error("Unsupported payment method")

      const response = await axios.post(config.apiUrl, config.payload, {
        headers: config.headers,
      })

      const rawLink = config.extractIntent(response)
      const cleanedLink = rawLink.replace(/\\/g, "")
      console.log("cleanedLink", rawLink)
      setUpiIntent(cleanedLink)
      setTimeLeft(240)
      setStartTimer(true)
    } catch (error) {
      console.error("Payment Error:", error)
      Swal.fire({
  title: 'Failed!',
  text: 'Payment initiation failed. Please try again.',
  icon: 'error',
  confirmButtonText: 'Retry',
});

      // Swal.fire("Payment initiation failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleonChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))

    // Validate field if it's been touched before
    if (touchedFields[name]) {
      validateField(name, value)
    }
  }

  const handlePinCodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6)
    setPinCode(val)

    // Validate if touched
    if (touchedFields.pinCode) {
      validateField('pinCode', val)
    }
  }

  useEffect(() => {
    if (pinCode.length === 6) {
      fetchLocation(pinCode)
    }
  }, [pinCode])

  const fetchLocation = async (pin) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`)
      console.log("API Response:", response.data)
      if (response.data[0].Status === "Success") {
        const location = response.data[0].PostOffice[0]
        setState(location.State)
        setCity(location.District)
        setUserData(prev => ({
          ...prev,
          state: location.State,
          city: location.District
        }))
      } else {
        setState("")
        setCity("")
        setUserData(prev => ({
          ...prev,
          state: "",
          city: ""
        }))
        console.warn("Invalid PIN code")
      }
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  // Payment status check effect (unchanged from your original code)
  let totalTime = 0
  useEffect(() => {
    if (!reference) return
    const maxDuration = 4 * 60 * 1000
    const intervalTime = 15000
    const interval = setInterval(async () => {
      totalTime += intervalTime
      try {
        setIsLoading(true)
        const response = await axios.get(
          `https://api.worldpayme.com/api/v1.1/payinTransactionCheckStatus/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${selectedPayment === "upi1"
                ? token
                : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiNzE1ZDJlODJiZTYxYzdiYjk1YzZhNDA0ZTdlYTNiZDRjOTNkYWRmNWEzYmJiYmExYmFhNTI2ZGIxNzVkNjhhNmI1YmZjZWU3N2ZmMTgwMDkiLCJpYXQiOjE3NDg1MTgwNTYuMjcyNDQyLCJuYmYiOjE3NDg1MTgwNTYuMjcyNDQ0LCJleHAiOjE3ODAwNTQwNTYuMjY5OTk3LCJzdWIiOiIzMDMiLCJzY29wZXMiOltdfQ.ElJzC40DRfPxMCJn8hKPJwOQqinyzK2yRONmLIky4IElGAeDJzghUbiBQg6uVIe0qMnQZCTY66trEbVh25TJZYpWv_rEyP4LYMhFNtyHOyEothKg-RAWt99y4baqf10wp5Mfl1YdUI3lQaYHKYF1B0y8gJFtLghvj8nxsWdi5a_V7TfkzcGGWy5HtqZnaYyDWxJCSIjm41E2mfJVoDrGz5_DMHCQq50JHN8rJwlx4R6pH4uD-D-xoYZsTgdg94ogkuuyWRpNpHTPx6ku9D6AVqO4gz8pGysphatUaIUeAHciNDNVW_hU3ReHMXUc6GsySmPjoogmRZJqtrtv432N4dhVZYZM8uPH8LmI437xsiT8Pwh8eigfJeiizElf0_sMgeNL7wwfkfsIkjWiNQlai9l0tgXpkSh_B4WHwbGMlhjN-xebvWE3NmiUu8Ut9m-aHyL-TCLX_hbkGepgEBilGiyqPzbpP9oNPXO7t3Js4MxAaFQjP4M2hHyHfxMPUUCbUEboS2cdL9uQpag_X9Z7w9cQMTaC6bFjv-RuAJhwGvSMHvs3paOZqdZxRd4bwybXUyCIisqdG1FHoFgPoz5tA5bYZ8CpILbYGuxPHeCpN51c0_QhOfGcEUT5st7PUadqwiQG1WJBOQ6XHquUNAt9ZySDpB9DjLtQ4jxjQbyer6I"
                }`,
              "Content-Type": "application/json",
            },
          },
        )
        console.log("responseeeeeeeeee", response.data)
        const { data } = response.data
        const txnStatus = data?.status || "Unknown"
        if (txnStatus === "Success" || txnStatus === "Failed") {
          clearInterval(interval)
          navigate(`/resultPage?status=${txnStatus}&txnId=${data.transactionNo}`)
        } else if (totalTime >= maxDuration) {
          clearInterval(interval)
          navigate(`/resultPage?status=timeout&txnId=${reference}`)
        }
      } catch (error) {
        console.error("Error fetching payout status:", error)
        clearInterval(interval)
      } finally {
        setIsLoading(false)
      }
    }, intervalTime)
    return () => clearInterval(interval)
  }, [reference])

  useEffect(() => {
    if (!startTimer || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [startTimer, timeLeft])

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const sec = (seconds % 60).toString().padStart(2, "0")
    return `${min}:${sec}`
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <nav className="flex px-5 mb-4 text-sm text-gray-500 space-x-2">
            <Link href="/" className="hover:text-purple-700 transition-colors cursor-pointer">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-purple-700 transition-colors cursor-pointer">Cart</Link>
           <span>/</span>
            <Link href="/checkout" className="text-purple-700 font-semibold">Checkout</Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2 px-4">
              <div className="bg-white rounded-lg shadow-sm border-2 border-gray-100 p-6 mb-6">
                {/* Logo */}
                <div className="mb-6">
                  <img src={ "/placeholder.svg"} alt="logo" className="w-32 h-auto" />
                </div>

                {/* Shipping Information */}
                <div className="mb-8">
                  {/* <h2 className="text-xl font-bold mb-4 text-gray-900">Shipping Information</h2> */}
                  <div className="space-y-4">
                    {/* Address Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Select Address
                      </label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={selectedAddress}
                          onChange={handleAddressChange}
                        >
                          <option value="">Select Address</option>
                          <option value="new">Add new address...</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>


                    {/* New Address Form */}
                    {isNewAddress && (
                      <div className="space-y-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
                        {/* Error summary */}
                        {Object.values(errors).some(error => error) && (
                          <div className="bg-red-100/60 border border-red-300 rounded-lg p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
                                <div className="mt-2 text-sm text-red-700">
                                  <ul className="list-disc pl-5 space-y-1">
                                    {errors.name && <li>{errors.name}</li>}
                                    {errors.email && <li>{errors.email}</li>}
                                    {errors.phone && <li>{errors.phone}</li>}
                                    {errors.pinCode && <li>{errors.pinCode}</li>}
                                    {errors.address && <li>{errors.address}</li>}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                              value={userdata.name}
                              onChange={handleonChange}
                              onBlur={() => handleBlur('name')}
                              placeholder="Enter your name"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500 italic">
                              {errors.name}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Phone *</label>
                            <input
                              type="tel"
                              name="phone"
                              className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                              value={userdata.phone}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "").slice(0, 10)
                                handleonChange({ target: { name: 'phone', value: val } })
                                if (touchedFields.phone) validateField('phone', val)
                              }}
                              onBlur={() => handleBlur('phone')}
                              placeholder="Enter phone number"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-1">Email *</label>
                          <input
                            type="email"
                            name="email"
                            className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                            value={userdata.email}
                            onChange={handleonChange}
                            onBlur={() => handleBlur('email')}
                            placeholder="Enter email address"
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">PIN Code *</label>
                            <input
                              type="text"
                              className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.pinCode ? 'border-red-500' : 'border-gray-300'} px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                              value={pinCode}
                              onChange={handlePinCodeChange}
                              onBlur={() => handleBlur('pinCode')}
                              placeholder="Enter PIN code"
                            />
                            {errors.pinCode && <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">State</label>
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 bg-gray-100"
                              value={state}
                              readOnly
                              placeholder="Auto-filled"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">City</label>
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 bg-gray-100"
                              value={city}
                              readOnly
                              placeholder="Auto-filled"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-1">Address *</label>
                          <textarea
                            name="address"
                            className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.address ? 'border-red-500' : 'border-gray-300'} px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                            rows={3}
                            value={userdata.address}
                            onChange={handleonChange}
                            onBlur={() => handleBlur('address')}
                            placeholder="Enter complete address (House no, Building, Street, Area)"
                          />
                          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                        </div>
                      </div>
                    )}

                    {/* Selected Address Display */}
                    {selectedAddress && selectedAddress !== "new" && (
                      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        {addresses
                          .filter((addr) => addr.id === selectedAddress)
                          .map((address) => (
                            <div key={address.id}>
                              <h3 className="font-semibold text-gray-900">{address.name}</h3>
                              <p className="text-gray-600 mt-1">{address.address}</p>
                              <p className="text-gray-600">
                                <span className="font-medium">Phone:</span> {address.phone}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Email:</span> {address.email}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Method</h2>
                  <div className="space-y-4 ">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {shippingMethods.map((method) => (

                        <label
                          key={method.id}
                          className={`flex items-start gap-4 p-2 rounded-xl border transition-all duration-300 shadow-sm cursor-pointer 
          ${selectedShipping === method.id
                              ? "border-purple-600 bg-purple-50 ring-2 ring-purple-300"
                              : "border-gray-200 hover:bg-gray-50"
                            }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={selectedShipping === method.id}
                            onChange={(e) => setSelectedShipping(e.target.value)}
                            className="mt-1 h-4 w-4 shrink-0 accent-purple-600"
                          />
                          <div className="flex-1">
                            <span className="block text-base font-semibold text-gray-800">
                              {method.name} {method.price > 0 && <span className="text-gray-600">– ₹{method.price}</span>}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Payment Method</h2>
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <label
                        className={`flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 shadow-sm cursor-pointer 
        ${selectedPayment === "upi1"
                            ? "border-purple-600 bg-purple-50 ring-2 ring-purple-300"
                            : "border-gray-200 hover:bg-gray-50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="upi1"
                          checked={selectedPayment === "upi1"}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                          style={{ accentColor: "rgb(157 48 137)" }}
                        />
                        <div className="ml-3">
                          <span className="block font-medium text-gray-900">UPI Gateway 1</span>
                          <span className="text-gray-500 text-sm">Pay using UPI Gateway 1</span>
                        </div>
                      </label>
                      <label
                        className={`flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 shadow-sm cursor-pointer 
        ${selectedPayment === "upi2"
                            ? "border-purple-600 bg-purple-50 ring-2 ring-purple-300"
                            : "border-gray-200 hover:bg-gray-50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="upi2"
                          checked={selectedPayment === "upi2"}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                          style={{ accentColor: "rgb(157 48 137)" }}
                        />
                        <div className="ml-3">
                          <span className="block font-medium text-gray-900">UPI Gateway 2</span>
                          <span className="text-gray-500 text-sm">Pay using UPI Gateway 2</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Order Notes <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition-all duration-200 ease-in-out focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
                    rows={4}
                    placeholder="Notes about your order, e.g. special instructions for delivery"
                  />
                </div>


                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8  pt-6">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 font-medium transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Cart
                  </Link>
                  {total === 0 ? (
                    <p className="text-sm text-gray-500 font-medium">Your Cart Is Empty - Please Add Something</p>
                  ) : (
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold px-6 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                      style={{ background: "rgb(157 48 137)" }}
                      onClick={handlePayment}
                      disabled={isloading || (isNewAddress && Object.values(errors).some(error => error))}
                    >
                      {isloading ? (
                        <DotLottieReact
                          src="https://lottie.host/faaf7fb5-6078-4f3e-9f15-05b0964cdb4f/XCcsBA5RNq.lottie"
                          loop
                          autoplay
                          style={{ width: 24, height: 24 }}
                        />
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Place Order
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* QR Code Section */}
              {upiIntent && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Complete Your Payment</h3>
                  <p className="text-gray-600 mb-6">Scan this QR code with any UPI app to complete your payment</p>
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                      <QRCode value={upiIntent} size={200} />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Clock className="w-5 h-5" style={{ color: "rgb(157 48 137)" }} />
                    <span className="text-lg font-semibold" style={{ color: "rgb(157 48 137)" }}>
                      Time remaining: {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-6 h-6 mx-auto mb-1" style={{ color: "rgb(157 48 137)" }} />
                      <p className="text-sm font-medium text-gray-900">Secure</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <CreditCard className="w-6 h-6 mx-auto mb-1" style={{ color: "rgb(157 48 137)" }} />
                      <p className="text-sm font-medium text-gray-900">UPI Payment</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Check className="w-6 h-6 mx-auto mb-1" style={{ color: "rgb(157 48 137)" }} />
                      <p className="text-sm font-medium text-gray-900">Instant</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
           <div className="lg:col-span-1">
  <div className="bg-white rounded-3xl shadow border border-gray-100 sticky top-8 overflow-hidden">
    <div className="bg-gradient-to-r from-[#384D89] to-[#2A4172] p-6 rounded-t-3xl">
      <h2 className="text-xl font-bold text-white">Order Summary</h2>
    </div>

    <div className="p-6 space-y-6">

      {/* Cart Items */}
   {cartItems.map((item) => (
  <div key={item.id} className="flex gap-4 justify-between border-b pb-3">
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 object-cover rounded-lg"
    />
    <div className="flex-1 text-right">
      <h4 className="font-medium text-[#14263F] text-sm">{item.name}</h4>
      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
      <p className="font-semibold text-[#384D89] text-sm">
        ₹{Math.trunc(item.price * item.quantity).toLocaleString()}
      </p>
    </div>
  </div>
))}


      {/* Price Summary */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-[#2A4172]">Subtotal</span>
          <span className="font-semibold text-[#14263F]">₹{Math.trunc(subtotal).toLocaleString()}</span>
        </div>

        {/* {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[#2A4172]">Discount</span>
            <span className="text-[#A13C78] font-semibold">-₹{Math.trunc(discount).toLocaleString()}</span>
          </div>
        )} */}

        <div className="flex justify-between text-sm">
          <span className="text-[#2A4172]">Shipping</span>
          <span className="font-semibold text-[#14263F]">{shipping === 0 ? 'Free' : `₹${Math.trunc(shipping)}`}</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-[#14263F]">Total</span>
            <span className="bg-gradient-to-r from-[#384D89] to-[#2A4172] bg-clip-text text-transparent">
              ₹{Math.trunc(total).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Note */}
      <div className="bg-gradient-to-r from-[#A13C78]/10 to-[#C1467F]/10 p-4 rounded-xl border border-[#A13C78]/20">
        <p className="text-sm text-[#872D67] italic">Shipping fees will be calculated at checkout</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Link
          href="/address"
          className="block w-full py-4 px-6 bg-gradient-to-r from-[#A13C78] to-[#872D67] text-white text-center font-semibold rounded-lg hover:from-[#872D67] hover:to-[#681853] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
        >
          Proceed to Checkout
        </Link>

        <Link
          href="/products"
          className="block w-full py-4 px-6 border border-gray-300 text-[#384D89] text-center font-semibold rounded-lg hover:bg-[#384D89] hover:text-white transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Footer Note */}
      <div className="text-xs text-[#2A4172] flex items-center justify-center gap-2 pt-2">
        <div className="w-2 h-2 bg-white border border-[#2A4172] rounded-full"></div>
        Secure checkout guaranteed
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
     
    </>
  )
}

export default AddressShipping