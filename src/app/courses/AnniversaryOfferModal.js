"use client";

import { useEffect, useState } from "react";
import { FiX, FiGift, FiPhone, FiMessageCircle } from "react-icons/fi";

export default function AnniversaryOfferModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const now = new Date();

    const offerStart = new Date("2026-07-08T00:00:00");
    const offerEnd = new Date("2026-07-10T23:59:59");

    if (now < offerStart || now > offerEnd) return;

    const today = now.toDateString();
    const lastClosed = localStorage.getItem("ANNIVERSARY_POPUP");

    if (lastClosed === today) return;

    const timer = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    localStorage.setItem(
      "ANNIVERSARY_POPUP",
      new Date().toDateString()
    );
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/60 flex items-center justify-center p-4"
      onClick={closePopup}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute right-4 top-4 z-20 h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-100 flex items-center justify-center"
        >
          <FiX size={22} />
        </button>

        {/* Header */}
        <div className="bg-[#204972] text-white px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#788406] flex items-center justify-center">
              <FiGift size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                🎉 स्थापना दिवस
              </h2>
              <p className="text-white/90 text-sm">
                1 YEAR COMPLETE
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto max-h-[65vh]">

          <p className="text-gray-700 leading-7 text-[15px]">
            आज ही के दिन <b>07/07/2025</b> को
            <b> PV CLASSES </b>की डिजिटल शुरुआत हुई थी।
            <br /><br />

            आप सभी विद्यार्थियों के विश्वास, प्यार और सहयोग से
            हमने सफलतापूर्वक <b>1 वर्ष</b> का सफर पूरा किया है।
            <br /><br />

            💚 <b>आपका विश्वास हमारी सबसे बड़ी ताकत है।</b>
          </p>

          <div className="mt-6 rounded-xl border bg-[#f7fbff] p-5">

            <h3 className="text-xl font-bold text-[#204972] mb-4">
              🎁 SPECIAL ANNIVERSARY OFFER
            </h3>

            <div className="flex justify-between border-b pb-3">
              <span>ALL COURSES</span>
              <span className="font-bold text-red-600">
                20% OFF
              </span>
            </div>

            <div className="flex justify-between pt-3">
              <span>Interview Courses</span>
              <span className="font-bold text-red-600">
                25% OFF
              </span>
            </div>

            <div className="mt-5 rounded-lg bg-[#204972] text-white text-center py-3 font-semibold">
              Offer Valid Till 10 July • 11:59 PM
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-bold text-[#204972] mb-2">
              Major Courses
            </h4>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <span>✔ CTET</span>
              <span>✔ DSSSB</span>
              <span>✔ KVS</span>
              <span>✔ NVS</span>
              <span>✔ REET</span>
              <span>✔ 3rd Grade</span>
              <span>✔ 2nd Grade</span>
              <span>✔ 1st Grade</span>
              <span>✔ Special Educator</span>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3">

            <a
              href="tel:6375113285"
              className="rounded-lg bg-[#204972] text-white py-3 flex justify-center items-center gap-2 font-semibold"
            >
              <FiPhone />
              Call
            </a>

            <a
              href="https://wa.me/916375113285"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#788406] text-white py-3 flex justify-center items-center gap-2 font-semibold"
            >
              <FiMessageCircle />
              WhatsApp
            </a>

            <button
              onClick={closePopup}
              className="rounded-lg bg-gray-200 py-3 font-semibold hover:bg-gray-300"
            >
              Close
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}