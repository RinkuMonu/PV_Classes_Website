import React from "react";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaLocationDot, FaArrowRightLong } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gradient-to-br from-[#616602] to-[#00316B] text-white">
        <div className="w-full">
          <div className="inset-0 bg-white opacity-20"></div>

          <div className="relative z-10 flex flex-col px-12 md:px-12 py-12">
            <div className="mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                <div className="lg:pl-4">
                  <Image
                    src="/image/pv-logo.png"
                    alt="PV_Classes Logo"
                    width={120}
                    height={60}
                    className="mb-5 md:ml-12"
                  />

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                    <FaLocationDot className="text-3xl text-[#788406] mt-1" />
                    <p className="pl-3 hover:text-[#009fe3]">
                      Plot No 97, Dakshinpuri - I, Shrikishan, Sanganer,
                      Jagatpura, Jaipur Rajasthan, India, 302017
                    </p>
                  </div>
                  <div className="flex items-start">
                    <IoMail className="text-xl text-[#788406] mt-1" />
                    <p className="pl-3 hover:text-[#009fe3]">info@7unique.in</p>
                  </div>
                  <div className="flex items-start">
                    <IoMdCall className="text-xl text-[#788406] mt-1" />
                    <p className="pl-3 hover:text-[#009fe3]">0141-4511098</p>
                  </div>
                  </div>

                </div>

                <div className="lg:pl-6 mt-10 md:mt-0 md:ml-4">
                  <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-base">
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link href="/about" className="hover:text-[#009fe3]">
                        Courses
                      </Link>
                    </li>
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link
                        href="/services/switch"
                        className="hover:text-[#009fe3]"
                      >
                        Faculty
                      </Link>
                    </li>
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link href="" className="hover:text-[#009fe3]">
                        Books
                      </Link>
                    </li>
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link href="/blog" className="hover:text-[#009fe3]">
                        Previous Year Questions
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 md:mt-0 md:ml-4">
                  <h3 className="font-bold text-lg mb-4">Support</h3>
                  <ul className="space-y-2 text-base">
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link
                        href="/services/switch"
                        className="hover:text-[#009fe3]"
                      >
                        FAQs
                      </Link>
                    </li>
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link
                        href="/services/escrow"
                        className="hover:text-[#009fe3]"
                      >
                        Career
                      </Link>
                    </li>
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link
                        href="/services/connected-banking"
                        className="hover:text-[#009fe3]"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 md:mt-0">
                  <h3 className="font-bold text-lg mb-4">Governnment Exam</h3>
                   <ul className="space-y-2 text-base">
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link
                        href="/services/switch"
                        className="hover:text-[#009fe3]"
                      >
All India Exam
                      </Link>
                    </li>
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link
                        href="/services/escrow"
                        className="hover:text-[#009fe3]"
                      >
                        Rajasthan Exams
                      </Link>
                    </li>
                    <li className="group transition-all duration-200 hover:pl-2">
                      <Link
                        href="/services/connected-banking"
                        className="hover:text-[#009fe3]"
                      >
3<sup>rd</sup> Grade
                      </Link>
                    </li>
                     <li className="group transition-all duration-200 hover:pl-2">
                      <Link
                        href="/services/connected-banking"
                        className="hover:text-[#009fe3]"
                      >
Current Affairs
                      </Link>
                    </li>
                  </ul>
<div className="flex gap-4 mt-6 md:mt-12">
                    <Link
                      href=""
                      className="text-gray-200 hover:text-[#009fe3] transition-colors"
                    >
                      <FaInstagram size={24} />
                    </Link>
                    <Link
                      href=""
                      className="text-gray-200 hover:text-[#009fe3] transition-colors"
                    >
                      <FaFacebook size={24} />
                    </Link>
                    <Link
                      href=""
                      className="text-gray-200 hover:text-[#009fe3] transition-colors"
                    >
                      <FaYoutube size={24} />
                    </Link>
                  </div>
                </div>

              </div>

            </div>

            <div className="border-t-3 border-[#788406] w-full mb-6"></div>

            <div className="mb-6">
              <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 text-base text-center">
                <li>
                  <Link href="/privacypolicy" className="hover:text-[#788406]">
                    Privacy Policy
                  </Link>
                </li>
                <span className="hidden sm:inline">|</span>

                <li>
                  <Link href="/refundpolicy" className="hover:text-[#788406]">
                    Cancellation & Refund Policy
                  </Link>
                </li>
                <span className="hidden sm:inline">|</span>

                <li>
                  <Link href="/termsofuse" className="hover:text-[#788406]">
                    Terms of Use
                  </Link>
                </li>
                <span className="hidden sm:inline">|</span>

                <li>
                  <Link href="/kycpolicy" className="hover:text-[#788406]">
                    KYC Policy & Onboarding Process
                  </Link>
                </li>
                <span className="hidden sm:inline">|</span>

                <li>
                  <Link
                    href="/chargebackpolicy"
                    className="hover:text-[#788406]"
                  >
                    Chargeback & Cancellation Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center text-base mt-auto">
              © 2025 PV Classes . All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
