"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiX,
  FiGift,
  FiPhone,
  FiMessageCircle,
} from "react-icons/fi";

export default function AnniversaryOfferModal() {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const now = new Date();

    // Offer Date
    const offerStart = new Date("2026-07-08T00:00:00");
    const offerEnd = new Date("2026-07-10T23:59:59");

    if (now < offerStart || now > offerEnd) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Auto Scroll Down & Up
  useEffect(() => {
    if (!open || !bodyRef.current) return;

    const body = bodyRef.current;

    const down = setTimeout(() => {
      body.scrollTo({
        top: body.scrollHeight,
        behavior: "smooth",
      });

      const up = setTimeout(() => {
        body.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);

      return () => clearTimeout(up);
    }, 1200);

    return () => clearTimeout(down);
  }, [open]);

  const closePopup = () => {
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
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
      >
        {/* Close */}

        <button
          onClick={closePopup}
          className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-100 flex items-center justify-center"
        >
          <FiX size={22} />
        </button>

        {/* Header */}

        <div className="bg-[#204972] text-white px-7 py-5">

          <div className="flex items-center gap-3">

            <div className="h-12 w-12 rounded-full bg-[#788406] flex items-center justify-center">
              <FiGift size={24} />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                स्थापना दिवस
              </h2>

              <p className="text-sm text-white/90">
                🎉 1 YEAR COMPLETE
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div
          ref={bodyRef}
          className="p-5 max-h-[70vh] overflow-y-auto scroll-smooth"
        >

          <p className="text-[14px] leading-6 text-gray-700">

            आज ही के दिन <b>07/07/2025</b> को
            <b> PV CLASSES </b>
            की डिजिटल शुरुआत हुई थी।

            <br />
            <br />

            आप सभी विद्यार्थियों के विश्वास,
            प्यार और सहयोग से हमने
            सफलतापूर्वक <b>1 वर्ष</b>
            का सफर पूरा किया है।

            <br />
            <br />

            💚 <b>आपका विश्वास, हमारी सबसे बड़ी ताकत है।</b>

          </p>

          {/* Offer */}

          <div className="mt-5 rounded-xl border bg-[#f8fbff] p-4">

            <h3 className="text-lg font-bold text-[#204972] mb-4">
              🎁 SPECIAL ANNIVERSARY OFFER
            </h3>

            <div className="flex justify-between items-center">

              <span className="font-semibold">
                ALL COURSES
              </span>

              <span className="text-xl font-bold text-red-600">
                25% OFF
              </span>

            </div>

            <div className="mt-4 rounded-lg bg-[#204972] text-white text-center py-2 font-semibold text-sm">

              📅 ऑफर केवल 10 जुलाई तक मान्य है।

            </div>

          </div>

          {/* Courses */}

          <div className="mt-5">

            <h3 className="text-base font-bold text-[#204972] mb-3">

              हमारे प्रमुख Courses

            </h3>

            <div className="grid grid-cols-2 gap-2 text-[14px] text-gray-700">

              <span>✔ CTET</span>
              <span>✔ DSSSB</span>

              <span>✔ KVS</span>
              <span>✔ NVS</span>

              <span>✔ REET</span>
              <span>✔ 3rd Grade</span>

              <span>✔ 2nd Grade</span>
              <span>✔ 1st Grade</span>

              <span className="col-span-2">
                ✔ Special Educator (PRT / TGT)
              </span>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">

            <h3 className="text-lg font-bold text-center text-[#204972]">

              हमारी तैयारी, आपकी सफलता

            </h3>

            <p className="text-center text-[14px] mt-2 text-gray-700">

              आइए, मिलकर सफलता की नई ऊँचाइयों को छुएँ।

            </p>

            <p className="text-center text-[14px] mt-3 font-semibold text-[#204972]">

              🙏 PV CLASSES परिवार की ओर से
              सभी विद्यार्थियों का दिल से धन्यवाद।

            </p>

          </div>

          {/* Buttons */}

          <div className="mt-6 grid grid-cols-3 gap-3">

            <a
              href="tel:6375113285"
              className="rounded-lg bg-[#204972] text-white py-2.5 flex justify-center items-center gap-2 font-semibold hover:bg-[#173c63]"
            >
              <FiPhone />
              Call
            </a>

            <a
              href="https://wa.me/916375113285"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#788406] text-white py-2.5 flex justify-center items-center gap-2 font-semibold hover:opacity-90"
            >
              <FiMessageCircle />
              WhatsApp
            </a>

            <button
              onClick={closePopup}
              className="rounded-lg bg-gray-200 py-2.5 font-semibold hover:bg-gray-300"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}