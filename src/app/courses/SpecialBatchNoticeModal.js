"use client";

import React from "react";
import { FiX, FiPhone, FiMessageCircle, FiInfo } from "react-icons/fi";

export default function SpecialBatchNoticeModal({
  open,
  onClose,
  onContinue,
  courseTitle = "This Course",
}) {
  if (!open) return null;

  const phone = "6375113285";
  const whatsappLink = `https://wa.me/91${phone}`;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden bg-white shadow-2xl relative">
        {/* Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          aria-label="Close"
        >
          <FiX className="text-xl" />
        </button>

        {/* Header */}
        <div className="relative bg-[#204972] px-6 py-5 text-white">
          <div className="pr-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium mb-3">
              <FiInfo />
              Important Update
            </div>

            <h2 className="text-2xl md:text-3xl font-bold leading-snug">
              Batch Seats Are Full
            </h2>
            <p className="text-white/90 mt-2 text-sm md:text-base">
              Thank you for your interest in this course.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 bg-white">
          <div className="rounded-2xl border border-[#d9e2ec] bg-[#f8fbff] p-5 md:p-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#204972] mb-3 leading-snug">
              {courseTitle}
            </h3>

            <p className="text-gray-700 text-[15px] md:text-base leading-7 mb-4">
              We would like to inform you that the seats for this batch have
              already been booked and admissions are currently closed for this
              course.
            </p>

            <p className="text-gray-700 text-[15px] md:text-base leading-7 mb-4">
              As soon as the next batch starts, we will inform you so that you
              can join without missing the opportunity.
            </p>

            <div className="rounded-xl border border-[#cfe0f2] bg-white p-4 md:p-5 mt-5">
              <h4 className="text-lg font-semibold text-[#204972] mb-3">
                For further assistance
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-10 w-10 rounded-full bg-[#204972] text-white flex items-center justify-center shrink-0">
                    <FiPhone />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us on</p>
                    <a
                      href="tel:6375113285"
                      className="text-lg font-bold text-[#204972] hover:underline"
                    >
                      6375113285
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 h-10 w-10 rounded-full bg-[#788406] text-white flex items-center justify-center shrink-0">
                    <FiMessageCircle />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      You can also message us on WhatsApp on the same number
                    </p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex mt-1 items-center rounded-lg bg-[#788406] px-4 py-2 text-white font-medium hover:opacity-90 transition"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                Close
              </button>

              <button
                onClick={onContinue}
                className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#204972] px-5 py-3 text-white font-semibold hover:bg-[#183a5c] transition"
              >
                Continue to Cart
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:6375113285"
                className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#204972] px-5 py-3 text-white font-semibold hover:bg-[#183a5c] transition"
              >
                Call Now
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#788406] px-5 py-3 text-white font-semibold hover:opacity-90 transition"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            We’ll be happy to help you with the next available batch.
          </p>
        </div>
      </div>
    </div>
  );
}