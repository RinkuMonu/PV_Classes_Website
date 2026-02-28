


// "use client";

// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useCart } from "../../components/context/CartContext";
// import axiosInstance from "../axios/axiosInstance";

// function AddressShipping() {
//   const { cart, clearCart, setCartCount } = useCart();
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Calculate Total
//   useEffect(() => {
//     const total = cart?.reduce((sum, item) => {
//       const price =
//         item?.details?.discount_price > 0
//           ? item?.details?.discount_price
//           : item?.details?.price;

//       return sum + price * (item?.quantity || 1);
//     }, 0);

//     setTotalAmount(total);
//   }, [cart]);

//   // 🔹 MAIN PAYMENT FLOW
//   const handleCheckoutAndPay = async () => {
//     try {
//       if (!cart || cart.length === 0) {
//         toast.error("Cart is empty");
//         return;
//       }

//       setLoading(true);

//       // 1️⃣ Checkout API
//       const checkoutRes = await axiosInstance.post("/checkout", {
//         cart: cart.map((item) => ({
//           itemType: item.itemType,
//           itemId: item.itemId,
//           quantity: item.quantity,
//         })),
//         paymentMethod: "upi",
//         totalAmount: totalAmount,
//       });

//       const orderId = checkoutRes?.data?.order?._id;

//       if (!orderId) {
//         throw new Error("Order creation failed");
//       }

//       // 2️⃣ PayIn API
//       const payinRes = await axiosInstance.post("/payment/payin", {
//         orderId: orderId,
//       });

//       const redirectUrl =
//         payinRes?.data?.paymentData?.data?.redirectEx;

//       if (!redirectUrl) {
//         throw new Error("Payment URL not received");
//       }

//       // 3️⃣ Redirect to Gateway
//       window.location.href = redirectUrl;

//     } catch (error) {
//       console.error(error);
//       toast.error("Payment failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen py-10 px-4">
//       <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* LEFT SIDE */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-bold mb-4">Payment Method</h2>

//           <div className="p-4 border rounded-lg bg-purple-50 border-purple-500">
//             <span className="font-medium">UPI / Online Payment</span>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-lg font-bold mb-4">Order Summary</h2>

//           {cart?.map((item) => (
//             <div key={item.itemId} className="flex justify-between mb-3">
//               <span>{item?.details?.title}</span>
//               <span>
//                 ₹
//                 {(
//                   (item?.details?.discount_price > 0
//                     ? item?.details?.discount_price
//                     : item?.details?.price) *
//                   item.quantity
//                 )}
//               </span>
//             </div>
//           ))}

//           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>₹{totalAmount}</span>
//           </div>

//           <button
//             onClick={handleCheckoutAndPay}
//             disabled={loading}
//             className="w-full mt-6 bg-[#384D89] text-white py-3 rounded-lg hover:bg-[#2A4172] transition"
//           >
//             {loading ? "Processing..." : "Pay Now"}
//           </button>

//           <Link
//             href="/"
//             className="block text-center mt-4 text-sm text-gray-500"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddressShipping;



"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";
import { useCart } from "../../components/context/CartContext";
import axiosInstance from "../axios/axiosInstance";

function AddressShipping() {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

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
  }, [cart]);

  // 🔹 MAIN PAYMENT FLOW
  const handleCheckoutAndPay = async () => {
    try {
      const token = localStorage.getItem("token");

      // 🔴 If user not logged in
      if (!token) {
        toast.error("Please login to continue checkout");
        return;
      }

      if (!cart || cart.length === 0) {
        toast.error("Your cart is empty");
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
        totalAmount,
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
      toast.error("Something went wrong. Please try again.");
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

            {/* Total */}
            <div className="border-t pt-6 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-[#384D89]">
                ₹{totalAmount}
              </span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleCheckoutAndPay}
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
      </div>
    </div>
  );
}

export default AddressShipping;