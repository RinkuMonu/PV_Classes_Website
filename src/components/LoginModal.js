"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "../app/axios/axiosInstance";
import toast from "react-hot-toast";
import { useCart } from "../components/context/CartContext";
import Image from "next/image";


export default function LoginModal({ onClose }) {
  const [rememberMe, setRememberMe] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({ phone: "", otp: "" });
  const router = useRouter();
  const { addToCart, loading } = useCart();

  const sendOtp = async () => {
    setOtpSent(false);
    if (!phone || !/^\+?\d{10,15}$/.test(phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Enter a valid phone number before requesting OTP.",
      }));
      return;
    }
    setErrors({ phone: "", otp: "" });

    try {
      const res = await axiosInstance.post("users/get-otp", { phone });
      // console.log("OTP response:", res);

      
      if (res.data?.message) {
        setOtpSent(true);
        toast.success(
          `${res.data.message}`,
          { autoClose: 4000 }
        );
      } else {
        setErrors((prev) => ({
          ...prev,
          phone: "Failed to send OTP.",
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { phone: "", otp: "" };

    if (!otp) {
      newErrors.otp = "OTP is required.";
      valid = false;
    } else if (otp.length < 5) {
      newErrors.otp = "OTP must be 5 digits.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const response = await axiosInstance.post("/users/login", { phone, otp });
      console.log("logged in = ", response);

      if (response.data.message) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        let Cart = JSON.parse(localStorage.getItem("cart")) || [];
        await Promise.all(
          Cart.map(async (item) => {
            try {
              const res = await addToCart({
                itemType: item.itemType,
                itemId: item.itemId,
                quantity: item.quantity,
              });
              if (res?.success) {
                Cart = Cart.filter(
                  (c) => !(c.itemId === item.itemId && c.itemType === item.itemType)
                );
                localStorage.setItem("cart", JSON.stringify(Cart));
              }

              console.log("res", res);
            } catch (error) {
              console.error("Error syncing item:", item, error);
            }
          })
        );
        toast.success(response.data.message);
        //  router.push("/");
        window.location.href = "/";
        router.refresh();
        onClose();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(82,93,101,0.6)]">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <Link href="/" className="flex items-center justify-center gap-2 pb-4">
          <Image
            src="/Image/pv-logo.png"
            alt="PV classes"
            width={170}
            height={40}
            className="object-contain"
          />
        </Link>
        <h2 className="text-2xl font-semibold text-center mb-1">
          Welcome back to <span className="text-[#115D8E] font-bold">PV classes</span>
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Your data stays protected while you stay connected.
        </p>

        <form className="space-y-4" onSubmit={handleVerifyOtp}>
          {/* Phone Number */}
          <div className="relative w-full">
            <label
              htmlFor="phone"
              className="absolute font-semibold left-4 top-2 text-sm text-[#115D8E] pointer-events-none"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                if (digits.length <= 10) {
                  setPhone(digits);
                }
              }}
              placeholder="e.g. 9876543210"
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              className="w-full pt-6 pb-2 px-4 border-2 border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#115D8E]"
            />

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Send OTP Button */}
          {!otpSent && (
            <button
              type="button"
              onClick={sendOtp}
              className="w-full px-4 py-2 rounded-lg bg-[#115D8E] text-white font-medium hover:opacity-90 transition"
            >
              Send OTP
            </button>
          )}


          {otpSent && (
            <>
              <div className="relative w-full">
                {/* <Link href="/" className="flex items-center justify-center gap-2">
                  <Image
                    src="/Image/pv-logo.png"
                    alt="PV classes"
                    width={170}
                    height={40}
                    className="object-contain"
                  />
                </Link> */}
                <label
                  htmlFor="otp"
                  className="absolute left-4 top-2 text-sm font-semibold text-[#115D8E] pointer-events-none"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter OTP"
                  inputMode="numeric"
                  pattern="\d*"
                  className="w-full pt-6 pb-2 px-4 text-gray-900 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#115D8E]"
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-4xl text-white font-semibold bg-[#115D8E] hover:opacity-90 transition"
              >
                Verify OTP
              </button>
              <button className="flex justify-end text-sm text-[#115D8E]">Resend Opt</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
