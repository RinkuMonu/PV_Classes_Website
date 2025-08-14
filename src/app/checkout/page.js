"use client"
import { useState } from "react";

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [shippingMethod, setShippingMethod] = useState("free");
  const [paymentMethod, setPaymentMethod] = useState("upi1");
  const [orderNotes, setOrderNotes] = useState("");

  const orderItems = [
    { name: "CyberPower Line Interactive/Offline", qty: 2, price: 4180 },
    { name: "Camera", qty: 3, price: 3525 },
    { name: "Brother Ink Tank DCP-T730DW", qty: 2, price: 36398 },
    { name: "Noise Twist Go Round dial", qty: 1, price: 1519 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shippingCost = shippingMethod === "flat" ? 20 : 0;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log({
      selectedAddress,
      shippingMethod,
      paymentMethod,
      orderNotes,
      orderItems,
      total,
    });
    alert("Order placed successfully! (Integrate payment gateway next)");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left side: Checkout Form */}
        <div className="bg-white rounded-xl max-w-4xl shadow-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

          {/* Select Address */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Select Address</h2>
            <select
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="home">Home Address</option>
              <option value="office">Office Address</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Shipping Method */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Shipping Method</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-blue-400">
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={shippingMethod === "free"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="accent-blue-500"
                />
                Free Delivery – Free shipping
              </label>
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-blue-400">
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  checked={shippingMethod === "pickup"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="accent-blue-500"
                />
                Local Pickup – Free shipping
              </label>
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-blue-400">
                <input
                  type="radio"
                  name="shipping"
                  value="flat"
                  checked={shippingMethod === "flat"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="accent-blue-500"
                />
                Flat Rate – ₹20 – Fixed rate shipping
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Payment Method</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-blue-400">
                <input
                  type="radio"
                  name="payment"
                  value="upi1"
                  checked={paymentMethod === "upi1"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-blue-500"
                />
                UPI Gateway 1 – Pay using UPI Gateway 1
              </label>
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-blue-400">
                <input
                  type="radio"
                  name="payment"
                  value="upi2"
                  checked={paymentMethod === "upi2"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-blue-500"
                />
                UPI Gateway 2 – Pay using UPI Gateway 2
              </label>
            </div>
          </div>

          {/* Order Notes */}
          <div>
            <h2 className="font-semibold text-gray-700">Order Notes (Optional)</h2>
            <textarea
              placeholder="Notes about your order, e.g. special instructions for delivery"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition">
              Back to Cart
            </button>
            <button
              className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Right side: Sticky Order Summary */}
        <div className="bg-white rounded-xl max-w-1/2 shadow-lg p-8 space-y-6 self-start sticky top-10">
          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {orderItems.map((item, idx) => (
              <div key={idx} className="border-b pb-2 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold text-gray-800">₹{item.qty * item.price}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 mt-4 border-t pt-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Shipping fees will be calculated at checkout
          </p>
          <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
            Secure Checkout Guaranteed
          </button>
        </div>
      </div>
    </div>
  );
}
