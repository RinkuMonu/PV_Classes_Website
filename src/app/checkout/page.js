
"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";
import { useCart } from "../../components/context/CartContext";
import axiosInstance from "../axios/axiosInstance";
import Swal from "sweetalert2";

function AddressShipping() {
  const { cart } = useCart();

  const hasBook = cart?.some(item => item.itemType === "book");

  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState(null);
  const [finalAmount, setFinalAmount] = useState(0);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    district: "",
    pincode: ""
  });

  // 🔹 Calculate Total
  useEffect(() => {
    const total = cart?.reduce((sum, item) => {
      const price =
        item?.details?.discount_price > 0
          ? item?.details?.discount_price
          : item?.details?.price;

      return sum + price * (item?.quantity || 1);
    }, 0);

    setTotalAmount(total);
    setFinalAmount(total);
  }, [cart]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axiosInstance.get("/coupon?status=all");

        if (res?.data?.success) {
          setCoupons(res.data.data || []);
        }
      } catch (error) {
        console.log("Coupon fetch error");
      }
    };

    fetchCoupons();
  }, []);


  const handleApplyCoupon = async () => {
    try {
      if (!couponCode) {
        // toast.error("Enter coupon code");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Enter coupon code"
        });
        return;
      }

      setApplyingCoupon(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axiosInstance.post("/coupon/validate", {
        code: couponCode,
        // userId: user?._id,
        cartTotal: totalAmount,
      });

      setDiscount(res.data.discount);
      setCouponId(res.data.couponId);
      setFinalAmount(res.data.finalPrice);

      // toast.success("Coupon applied successfully");
      Swal.fire({
        icon: "success",
        title: "Coupon Applied",
        text: "Coupon applied successfully"
      });

    } catch (error) {
      // toast.error(
      //   error?.response?.data?.message || "Invalid coupon"
      // );
      Swal.fire({
        icon: "error",
        title: "Coupon Error",
        text: error?.response?.data?.message || "Invalid coupon"
      });
    } finally {
      setApplyingCoupon(false);
    }
  };

  // 🔹 MAIN PAYMENT FLOW
  const handleCheckoutAndPay = async () => {
    try {
      const token = localStorage.getItem("token");

      // 🔴 If user not logged in
      if (!token) {
        // toast.error("Please login to continue checkout");
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to continue checkout"
        });
        return;
      }

      if (!cart || cart.length === 0) {
        // toast.error("Your cart is empty");
        Swal.fire({
          icon: "warning",
          title: "Cart Empty",
          text: "Your cart is empty"
        });
        return;
      }

      setLoading(true);

      // 1️⃣ Checkout
      const checkoutRes = await axiosInstance.post("/checkout", {
        cart: cart.map((item) => ({
          itemType: item.itemType,
          itemId: item.itemId,
          quantity: item.quantity,
        })),
        paymentMethod: "upi",
        // totalAmount: finalAmount,
        couponId,
        // discountAmount: discount,
        shippingAddress

      });

      const orderId = checkoutRes?.data?.order?._id;

      if (!orderId) throw new Error("Order creation failed");

      // 2️⃣ PayIn
      const payinRes = await axiosInstance.post("/payment/payin", {
        orderId,
      });

      const redirectUrl =
        payinRes?.data?.paymentData?.data?.redirectEx;

      if (!redirectUrl) throw new Error("Payment URL not received");

      window.location.href = redirectUrl;

    } catch (error) {
      // toast.error("Something went wrong. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">

          {/* Payment Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-[#384D89] mb-6">
              Payment Method
            </h2>

            <div className="flex items-center gap-4 p-6 rounded-xl border border-[#384D89] bg-[#384D89]/5">
              <CreditCard className="text-[#384D89]" size={28} />
              <div>
                <p className="font-semibold text-gray-900">
                  UPI / Online Payment
                </p>
                <p className="text-sm text-gray-500">
                  Secure payment powered by trusted gateway
                </p>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-green-600" size={30} />
              <div>
                <h3 className="font-semibold text-lg">
                  100% Secure Payment
                </h3>
                <p className="text-gray-500 text-sm">
                  All transactions are encrypted and secure.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-10 h-fit">

          <div className="bg-gradient-to-r from-[#384D89] to-[#2A4172] p-6">
            <h2 className="text-xl font-bold text-white">
              Order Summary
            </h2>
          </div>

          <div className="p-6 space-y-6">

            {/* Cart Items */}
            {cart?.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.itemId}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item?.details?.full_image?.[0] || "/placeholder.svg"}
                      alt={item?.details?.title}
                      width={60}
                      height={60}
                      className="rounded-lg border"
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {item?.details?.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-[#384D89]">
                    ₹
                    {(
                      (item?.details?.discount_price > 0
                        ? item?.details?.discount_price
                        : item?.details?.price) *
                      item.quantity
                    )}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                Your cart is empty
              </p>
            )}

            {/* Coupon Apply */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />

              <button
                onClick={handleApplyCoupon}
                disabled={applyingCoupon}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                {applyingCoupon ? "Applying..." : "Apply"}
              </button>
            </div>

            {coupons.length > 0 && (
              <div className="border rounded-lg p-3 mt-3 bg-gray-50">
                <p className="text-sm font-semibold mb-2">Available Coupons</p>

                {coupons.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => setCouponCode(c.code)}
                    className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-gray-100"
                  >
                    <span className="text-sm font-medium">{c.code}</span>

                    <span className="text-xs text-green-600">
                      Save ₹{c.discountValue}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {discount > 0 && (
              <div className="flex justify-between text-green-600 text-sm">
                <span>Coupon Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}

            {/* Total */}
            <div className="border-t pt-6 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-[#384D89]">
                {/* ₹{totalAmount} */}
                ₹{finalAmount}
              </span>
            </div>

            {/* Pay Button */}
            <button
              // onClick={handleCheckoutAndPay}
              onClick={() => {
                const hasBook = cart?.some(item => item.itemType === "book");

                if (hasBook) {
                  setShowAddressModal(true);
                } else {
                  handleCheckoutAndPay();
                }
              }}
              disabled={loading}
              className="w-full mt-4 bg-[#384D89] hover:bg-[#2A4172] text-white py-4 rounded-xl font-semibold transition duration-300 shadow-lg"
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>

            <Link
              href="/"
              className="block text-center text-sm text-gray-500 hover:text-[#384D89] transition"
            >
              Continue Shopping
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
              <Lock size={14} />
              Secure checkout guaranteed
            </div>
          </div>
        </div>


        {showAddressModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">

              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 mb-2 rounded"
                value={shippingAddress.name}
                onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
              />

              <input
                type="text"
                placeholder="Phone"
                className="w-full border p-2 mb-2 rounded"
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
              />

              <textarea
                placeholder="Address"
                className="w-full border p-2 mb-2 rounded"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="City"
                  className="border p-2 rounded"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                />

                <input
                  placeholder="State"
                  className="border p-2 rounded"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                />
              </div>

              <input
                placeholder="Pincode"
                className="w-full border p-2 mt-2 rounded"
                value={shippingAddress.pincode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
              />

              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 bg-gray-300 py-2 rounded"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="flex-1 bg-[#384D89] text-white py-2 rounded"
                  onClick={() => {
                    setShowAddressModal(false);
                    handleCheckoutAndPay();
                  }}
                >
                  Continue
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>




  );
}

export default AddressShipping;