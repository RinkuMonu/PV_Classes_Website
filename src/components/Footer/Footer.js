"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import pvLogo from "@/assets/pv_footer_logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#616602] to-[#00316B] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ====== Top Buttons ====== */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { name: "All Cources", href: "/courses" },
            { name: "Download PDFs", href: "/previous-year-question" },
            { name: "Current Affairs", href: "/current-affairs" },
            { name: "Test Series", href: "/test-series" },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">
                {item.name}
              </button>
            </Link>
          ))}
        </div>

        {/* ====== Quick Links + Support + Social ====== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Image
              src={pvLogo}
              alt="PV Classes Logo"
              className="mb-4 w-24"
              // width/height optional: Next nikaal leta hai metadata se
              // width={96} height={96}
            />
            <p className="text-sm text-gray-200 leading-relaxed">
              PV Classes is dedicated to providing high quality education for
              competitive exams like UPSC, SSC, Defence, NEET, JEE, and more.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/book">Books</Link>
              </li>
              <li>
                <Link href="/previous-year-question">Previous Year Papers</Link>
              </li>
              <li>
                <Link href="/test-series">Online Test Series</Link>
              </li>
              <li>
                <Link href="/current-affairs">Current Affairs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-use">Terms of Use</Link>
              </li>
              <li>
                <Link href="/cancellation-and-refund-policy">
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="space-y-2 text-sm">
              <p>
                Plot No 97, Dakshinpuri - I, Shrikishan, Sanganer, Jagatpura,
                Jaipur Rajasthan, India, 302017
              </p>
              <p>
                {/* <a href="mailto:Pvclasses01@gmail.com" className="hover:underline"> */}
                Pvclasses01@gmail.com
                {/* </a> */}
              </p>
              <p>
                <a href="tel:01414511098" className="hover:underline">
                  0141-4511098
                </a>
              </p>

              <div className="flex gap-4 mt-4">
                <Link href="https://www.facebook.com/PVCLASSES">
                  <FaFacebook size={22} />
                </Link>
                <Link href="https://www.instagram.com/PV_CLASSES">
                  <FaInstagram size={22} />
                </Link>
                <Link href="https://www.youtube.com/@pvclasses" target="_blank">
                  <FaYoutube size={22} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ====== Learning Resources ====== */}
        <div className="border-t border-gray-400 pt-10">
          <h3 className="font-bold text-lg mb-6">Learning Resources</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-sm">
            {/* Government Exam */}
            <div>
              <h4 className="font-semibold mb-3">10th Class </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses?exam=68b2e224993aca7bb0ab9b7e">
                    Math Exam
                  </Link>
                </li>
                <li>
                  <Link href="/courses?exam=68b2e1f5993aca7bb0ab9b72">
                    Science Exam
                  </Link>
                </li>
                <li>
                  <Link href="/courses?exam=68b2e00d993aca7bb0ab9a86">
                    English Exam
                  </Link>
                </li>
                {/* <li><Link href="/courses?exam=68ac2d4d817fec5058627684">All India Exam</Link></li> */}
                {/* <li><Link href="/courses?exam=68ad4356255f962ce73719c2">Rajasthan State</Link></li> */}
              </ul>
            </div>

            {/* Defence */}
            <div>
              <h4 className="font-semibold mb-3">12th Class</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses?exam=68b2deb3993aca7bb0ab9a41">
                    Science Exam
                  </Link>
                </li>
                <li>
                  <Link href="/courses?exam=68b2de31993aca7bb0ab9a23">
                    Math Exam
                  </Link>
                </li>
                {/* <li><Link href="/courses?exam=68ac3affa5a435b640ada611">AFCAT</Link></li> */}
                {/* <li><Link href="/courses?exam=68ac3a65a5a435b640ada60d">CDS</Link></li> */}
                {/* <li><Link href="/courses?exam=68ac3959a5a435b640ada607">NDA</Link></li> */}
              </ul>
            </div>

            {/* Nursing */}
            <div>
              <h4 className="font-semibold mb-3">9th Class</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses?exam=68b2e23f993aca7bb0ab9ba0">
                    Math Exams
                  </Link>
                </li>
                <li>
                  <Link href="/courses?exam=68b2e073993aca7bb0ab9aca">
                    Hindi Exams
                  </Link>
                </li>
                <li>
                  <Link href="/courses?exam=68b2e02b993aca7bb0ab9aa0">
                    Englsih Exams
                  </Link>
                </li>
                {/* <li><Link href="/courses?exam=68ac3634a5a435b640ada5f9">IBPS Exams</Link></li> */}
                {/* <li><Link href="/courses?exam=68ac35e5a5a435b640ada5f5">SBI Exams</Link></li> */}
              </ul>
            </div>

            {/* Agriculture */}
            <div>
              <h4 className="font-semibold mb-3">REET</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses?exam=68ad4356255f962ce73719c2">
                    3rd Grade Teacher Exam
                  </Link>
                </li>
                {/* <li><Link href="/agriculture/jet">JET</Link></li> */}
                {/* <li><Link href="/agriculture/veterinary-officer">Veterinary Officer</Link></li> */}
                {/* <li><Link href="/agriculture/up-lt-grade">UP LT Grade</Link></li> */}
                {/* <li><Link href="/agriculture/livestock-assistant">Livestock Assistant</Link></li> */}
                {/* <li className="text-gray-300"><Link href="/agriculture">Show More</Link></li> */}
              </ul>
            </div>

            {/* Engineering */}
            <div>
              <h4 className="font-semibold mb-3">Rajasthan Exams</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses?exam=68ad4356255f962ce73719c2">
                    3rd Grade Exam
                  </Link>
                </li>
                <li>
                  <Link href="/courses?exam=689c8a951914a3c05b945988">
                    2nd Grade Exam
                  </Link>
                </li>
                <li>
                  <Link href="/courses?exam=689dc5c896e7e5a6948099fa">
                    1st Grade Exam
                  </Link>
                </li>
              </ul>
            </div>

            {/* NEET / JEE */}
            <div>
              <h4 className="font-semibold mb-3">Others Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="courses">All Exams</Link>
                </li>
                <li>
                  <Link href="/previous-year-question">Download PDFs</Link>
                </li>
                <li>
                  <Link href="/current-affairs">Current Affairs</Link>
                </li>
                <li>
                  <Link href="/test-series">Test-Series</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ====== Bottom ====== */}
        <div className="border-t border-gray-500 mt-10 pt-6 text-center text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            {/* <Link href="/privacy-policy">Privacy Policy</Link> */}
            {/* <Link href="/cancellation-and-refund-policy">Refund Policy</Link> */}
            {/* <Link href="/terms-of-use">Terms & Conditions</Link> */}
            {/* <Link href="#">Finance</Link> */}
          </div>
          <p>© 2025 PV Classes . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
