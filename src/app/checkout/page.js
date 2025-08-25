"use client"
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import CheckoutSuccessPopup from "../../components/CheckoutSuccessPopup";
// import QRCode from "react-qr-code"
import { ChevronLeft, Wallet, Check, CreditCard, Clock, Shield } from "lucide-react"
// import logo from "../assest/logo.jpg"
// import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Link from "next/link"
import { useCart } from "../../components/context/CartContext";
import axiosInstance from "../axios/axiosInstance";

// import { DotLottieReact } from "@lottiefiles/dotlottie-react"
// import LoginModal from "../components/loginModal/loginModal";
// import Login1 from "../pages/Login1";
// import Swal from 'sweetalert2';


function AddressShipping() {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [oldTotalPrice, setOldTotalPrice] = useState(0);
  const [disabled,setDisabled] = useState(false);
  const { cart,clearCart,setCartCount } = useCart();
  const [couponCode, setCouponCode] = useState({ code: "", discount: "",couponId: "" });
  useEffect(() => {
    setDisabled(!(cart && cart.length > 0));
  }, [cart]);

  const handleApplyCoupon = (discount) => {
    let discountedAmount = oldTotalPrice;
    const value = parseFloat(discount.replace(/[^0-9.]/g, ""));
    if (typeof discount === "string" && discount.includes("%")) {
      discountedAmount = oldTotalPrice - (oldTotalPrice * value) / 100;
    } else {
      discountedAmount = oldTotalPrice - value;
    }
    if (discountedAmount < 0) discountedAmount = 0;

    setTotalAmount(discountedAmount);
    toast.success(`✅ Coupon applied! Final amount: ₹${discountedAmount}`);
  };
  const [isNewAddress, setIsNewAddress] = useState(true)
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
  const [touchedFields, setTouchedFields] = useState({});
  const [coupon,setCoupon] = useState([]);
  const token = "zsdfgyxchh"
  const [totalAmount, setTotalAmount] = useState(0);
  let total = 0;
  useEffect(() => {
    const total = cart?.reduce(
      (sum, item) => {
        const price =
          item?.details?.discount_price > 0
            ? item?.details?.discount_price
            : item?.details?.price;

        return sum + (price * (item?.quantity || 1));
      },
      0
    );


    setTotalAmount(total);
    setOldTotalPrice(total);
  }, [cart]);

  console.log("total amount = ",totalAmount);
  const [userdata, setUserData] = useState({
    id:"",
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  });
  const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found!");
          return;
        }

        const { data } = await axiosInstance.get("/users/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data?.data) {
          setUserData({
            id: data.data._id || "",
            name: data.data.name || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            state: data.data.state || "",
            city: data.data.city || "",
            address: data.data.address || "",
            pincode: data.data.pincode || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
  };
  const checkout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to continue!");
        return;
      }
      const payload = totalOrder;

      const { data } = await axiosInstance.post("/checkout", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (couponCode?.couponId) {
        await axiosInstance.put(
          `/coupon/${couponCode.couponId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      
      // fetchCoupons();
      if (data.message == 'Checkout successful, order created, access granted!') {
        setOrderSuccess(true);
        clearCart();
        setCartCount(0);
        setDisabled(false);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
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

  // const handleAddressChange = (e) => {
  //   const value = e.target.value;    
  //   setSelectedAddress(value);
  //   setIsNewAddress(true);

  //   if (value === "new") {
  //     // Agar user new address dalna chahta hai toh saare fields empty ho jaye
  //     setUserData({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       state: "",
  //       city: "",
  //       address: "",
  //       pincode: "",
  //     });
  //     setIsNewAddress(true);
  //   } else if (value === "old") {
  //     fetchUserData();
  //     setIsNewAddress(true);
  //   }
  //   // Reset errors jab address type change ho
  //   if (value !== "new") {
  //     setErrors({});
  //   }
  // };

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
    } finally {
      setIsLoading(false)
    }
  }

  const handleonChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
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
  useEffect(() => {
    const fetchCoupons = async () => {
      const token = localStorage.getItem("token"); // token localStorage se nikal rahe ho
      try {
        const { data } = await axiosInstance.get("/coupon", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCoupon(data.data || []);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, []);

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
  const [totalOrder, setTotalOrder] = useState({
    cart: [],
    totalAmount: 0,
    paymentMethod: "cod",
  });
  useEffect(() => {
  setTotalOrder({
    cart: cart,
    totalAmount: totalAmount,
    paymentMethod: "cod",
    couponId: couponCode.couponId,
  });
}, [cart, totalAmount,couponCode]);
console.log("totalOrder = ", totalOrder);
  return (
    <> 
    {orderSuccess && (
      <CheckoutSuccessPopup message="Your order has been placed successfully. You'll receive updates soon 🚚" />
    )}
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <nav className="flex px-5 mb-4 text-sm text-gray-500 space-x-2">
            <Link href="/" className="hover:text-[#384D89]  transition-colors cursor-pointer">Home</Link>
            <span>/</span>
            {/* <Link href="/cart" className="hover:text-[#384D89]  transition-colors cursor-pointer">Cart</Link>
           <span>/</span> */}
            <Link href="/checkout" className="text-[#384D89] font-semibold">Checkout</Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2 px-4">
              <div className="bg-white rounded-lg shadow-sm border-2 border-gray-100 p-6 mb-6">               

                {/* Shipping Information */}
                {/* <div className="mb-8">
                  <div className="space-y-4">
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
                        <option value="old">Existing address</option>
                        <option value="new">Add new address</option>
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
                    
                  </div>
                </div>               */}
                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Payment Method</h2>
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <label
                        className={`flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 shadow-sm cursor-pointer border-purple-600 bg-purple-50 ring-2 ring-purple-300`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={true}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                          style={{ accentColor: "rgb(157 48 137)" }}
                        />
                        <div className="ml-3">
                          <span className="block font-medium text-gray-900">Cash on delivery</span>
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
              </div>             
            </div>
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow border border-gray-100 sticky top-8 overflow-hidden">
                <div className="bg-gradient-to-r from-[#384D89] to-[#2A4172] p-6 rounded-t-3xl">
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Cart Items */}
                  {cart && cart?.length > 0 ? (
                    cart?.map((item) => (
                      <div
                        key={item?.itemId}
                        className="flex gap-4 justify-between border-b pb-3"
                      >
                        <img
                          src={item?.details?.full_image?.[0]}
                          alt={item?.details?.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 text-right">
                          <h4 className="font-medium text-[#14263F] text-sm">
                            {item?.details?.title}
                          </h4>
                          <p className="text-xs text-gray-500">Qty: {item?.quantity}</p>
                          <p className="font-semibold text-[#384D89] text-sm">
                            ₹{
                              (
                                (item?.details?.discount_price > 0
                                  ? item?.details?.discount_price
                                  : item?.details?.price) * (item?.quantity || 1)
                              )?.toLocaleString()
                            }
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-6">
                      🛒 No items in your cart
                    </div>
                  )}
                  {/* Coupon Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-[#2A4172]">Available Coupons</h3>                    
                    <div className="space-y-4">
                      {/* Coupon List */}
                     {coupon?.length > 0 ? (
                        coupon.map((c) => (
                          <div
                            key={c?._id}
                            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                          >
                            <span className="text-sm font-medium text-[#14263F]">
                              {c?.code} (
                              {c?.discountType === "percentage"
                                ? `${c?.discountValue}%`
                                : `₹${c?.discountValue}`}
                              )
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(c?.code);
                                setCouponCode({
                                  code: c?.code,
                                  discount:
                                    c?.discountType === "percentage"
                                      ? `${c?.discountValue}%`
                                      : `₹${c?.discountValue}`,
                                  couponId: c?._id,
                                });
                              }}
                              className="text-xs bg-[#384D89] text-white px-3 py-1 rounded-lg hover:bg-[#2A4172] transition"
                            >
                              Copy
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">No coupons available</p>
                      )}


                      {/* Input + Apply Button */}
                     <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponCode.code}
                        onChange={(e) =>
                          setCouponCode((prev) => ({ ...prev, code: e.target.value }))
                        }
                        placeholder="Enter or paste coupon code"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#384D89]"
                      />
                      <button
                        onClick={() => handleApplyCoupon(couponCode.discount)}
                        disabled={disabled}
                        className={`text-sm px-4 py-2 rounded-lg transition ${
                          !couponCode.code?.trim()
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        Apply
                      </button>
                    </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2A4172]">Subtotal</span>
                      <span className="font-semibold text-[#14263F]">₹ {totalAmount}</span>
                    </div>

                    {/* {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#2A4172]">Discount</span>
                        <span className="text-[#A13C78] font-semibold">-₹{Math.trunc(discount).toLocaleString()}</span>
                      </div>
                    )} */}

                    <div className="flex justify-between text-sm">
                      <span className="text-[#2A4172]">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-[#14263F]">Total</span>
                        <span className="bg-gradient-to-r from-[#384D89] to-[#2A4172] bg-clip-text text-transparent">
                          ₹{totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Note */}
                  <div className="bg-gradient-to-r bg-[#384D89]/10 p-4 rounded-xl border border-[#384D89]/20">
                    <p className="text-sm text-[#384D89] italic">Shipping fees will be calculated at checkout</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={checkout}
                      disabled={disabled}
                      className={`block w-full py-4 px-6 text-white text-center font-semibold rounded-lg transition-all duration-300 shadow-xl cursor-pointer ${
                        cart?.length === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#384D89] hover:shadow-2xl transform hover:-translate-y-0.5"
                      }`}
                    >
                      Proceed to Checkout
                    </button>


                    <Link
                      href="/"
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