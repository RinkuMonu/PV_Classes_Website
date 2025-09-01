// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
// import { FaLocationDot, FaArrowRightLong } from "react-icons/fa6";
// import { IoMail } from "react-icons/io5";
// import { IoMdCall } from "react-icons/io";
// import Link from "next/link";
// import axiosInstance from "../../app/axios/axiosInstance";

// export default function Footer() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/book-categories/");
//         setCategories(res.data.data);
//         console.log(res?.data?.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);
//   return (
//     <>
//       <footer className="relative bg-gradient-to-br from-[#616602] to-[#00316B] text-white">
//         <div className="w-full">
//           <div className="inset-0 bg-white opacity-20"></div>

//           <div className="relative z-10 flex flex-col px-12 md:px-12 py-12">
//             <div className="mb-16">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
//                 <div className="lg:pl-4">
//                   <Image
//                     src="/image/pv_footer_logo.png"
//                     alt="PV_Classes Logo"
//                     width={120}
//                     height={60}
//                     className="mb-5 md:ml-12"
//                   />

//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-start">
//                       <FaLocationDot className="text-3xl text-[#788406] mt-1" />
//                       <p className="pl-3 ">
//                         Plot No 97, Dakshinpuri - I, Shrikishan, Sanganer,
//                         Jagatpura, Jaipur Rajasthan, India, 302017
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <IoMail className="text-xl text-[#788406] mt-1" />
//                       <a
//                         href="mailto:info@7unique.in"
//                         className="pl-3 hover:underline"
//                       >
//                         info@7unique.in
//                       </a>
//                     </div>
//                     <div className="flex items-start">
//                       <IoMdCall className="text-xl text-[#788406] mt-1" />
//                       <a
//                         href="tel:01414511098"
//                         className="pl-3  hover:underline"
//                       >
//                         0141-4511098
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="lg:pl-6 mt-10 md:mt-0 md:ml-4">
//                   <h3 className="font-bold text-lg mb-4">Quick Links</h3>
//                   <ul className="space-y-2 text-base">
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/courses" className="hover:text-[#009fe3]">
//                         Courses
//                       </Link>
//                     </li>

//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/book" className="hover:text-[#009fe3]">
//                         Books
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/previous-year-question"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Previous Year Questions
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/test-series"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Online Test Series
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/current-affairs" className="hover:text-[#009fe3]">
//                         Current Affairs
//                       </Link>
//                     </li>

//                     {/* <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/#" className="hover:text-[#009fe3]">
//                         Career Guidance
//                       </Link>
//                     </li> */}
//                     {/* <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/#" className="hover:text-[#009fe3]">
//                         Success Stories
//                       </Link>
//                     </li> */}
//                   </ul>
//                 </div>

//                 <div className="mt-10 md:mt-0 md:ml-4">
//                   <h3 className="font-bold text-lg mb-4">Support</h3>
//                   <ul className="space-y-2 text-base">
//                     {/* <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/services/escrow"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Career
//                       </Link>
//                     </li> */}
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/about-us" className="hover:text-[#009fe3]">
//                         About Us
//                       </Link>
//                     </li>

//                     <li className="group transition-all duration-200 hover:pl-2">

//                       <Link href="/contact-us" className="hover:text-[#009fe3]">
//                         Contact Us
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/privacy-policy"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Privacy Policy
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/terms-of-use"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Terms of Use
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/cancellation-and-refund-policy"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Cancellation & Refund Policy
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="mt-10 md:mt-0">
//                   <h3 className="font-bold text-lg mb-4">Government Exam</h3>
//                   <ul className="space-y-2 text-base">
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/courses?exam=68ac2d4d817fec5058627684" className="hover:text-[#009fe3]">
//                         All India Exam
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/courses?exam=68ac3959a5a435b640ada607" className="hover:text-[#009fe3]">
//                         NDA Exams
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link href="/courses?exam=68ac3b89a5a435b640ada615" className="hover:text-[#009fe3]">
//                         Indian Coast Guard
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/current-affairs"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Current Affairs
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/courses?exam=68ac3c02a5a435b640ada61b"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Defence Exams
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/courses?exam=68ac372ea5a435b640ada605"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Banking Exams
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/current-affairs"
//                         className="hover:text-[#009fe3]"
//                       >
//                         Current Affairs
//                       </Link>
//                     </li>
//                     <li className="group transition-all duration-200 hover:pl-2">
//                       <Link
//                         href="/courses?exam=68ac3686a5a435b640ada5fd"
//                         className="hover:text-[#009fe3]"
//                       >
//                         RBI Exams
//                       </Link>
//                     </li>



//                   </ul>
//                   <div className="flex gap-4 mt-6 md:mt-12">
//                     <Link
//                       href=""
//                       className="text-gray-200 hover:text-[#009fe3] transition-colors"
//                     >
//                       <FaInstagram size={24} />
//                     </Link>
//                     <Link
//                       href=""
//                       className="text-gray-200 hover:text-[#009fe3] transition-colors"
//                     >
//                       <FaFacebook size={24} />
//                     </Link>
//                     <Link
//                       href="https://www.youtube.com/@pvclasses"
//                       target="blank"
//                       className="text-gray-200 hover:text-[#009fe3] transition-colors"
//                     >
//                       <FaYoutube size={24} />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t-2 border-[#788406] w-full mb-6"></div>


//             <div className="text-center text-base mt-auto">
//               © 2025 PV Classes . All rights reserved.
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }



"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

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
              <button
                className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition"
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>

        {/* ====== Top Info Section ====== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

          {/* Left Section */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Ready to learn?</h2>
            <p className="mb-5 text-gray-200 text-sm leading-relaxed">
              Take the first step toward achieving your educational goals.
              Whether you’re preparing for exams or expanding your knowledge,
              getting started is just a click away. Join us today and unlock
              your full potential.
            </p>
          
<Link href="/courses">
  <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
    Get Started →
  </button>
</Link>
          </div>

          {/* Right Section */}
          <div className="space-y-2 text-sm">
            <p>
              Plot No 97, Dakshinpuri - I, Shrikishan, Sanganer, Jagatpura,
              Jaipur Rajasthan, India, 302017
            </p>
            <p>
              <a href="mailto:info@7unique.in" className="hover:underline">
                info@7unique.in
              </a>
            </p>
            <p>
              <a href="tel:01414511098" className="hover:underline">
                0141-4511098
              </a>
            </p>
          </div>
        </div>

        {/* ====== Quick Links + Support + Social ====== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          <div>
            <img
              src="/image/pv_footer_logo.png"
              alt="PV Classes Logo"
              className="mb-4 w-24"
            />
            <p className="text-sm text-gray-200 leading-relaxed">
              PV Classes is dedicated to providing high quality education
              for competitive exams like UPSC, SSC, Defence, NEET, JEE, and
              more.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/book">Books</Link></li>
              <li><Link href="/previous-year-question">Previous Year Papers</Link></li>
              <li><Link href="/test-series">Online Test Series</Link></li>
              <li><Link href="/current-affairs">Current Affairs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use">Terms of Use</Link></li>
              <li><Link href="/cancellation-and-refund-policy">Cancellation & Refund Policy</Link></li>
            </ul>
          </div>



          <div>
            <h3 className="font-bold mb-4">FOLLOW US</h3>
            <div className="flex gap-4">
              <Link href="#"><FaFacebook size={22} /></Link>
              <Link href="#"><FaInstagram size={22} /></Link>
              <Link href="/" target="_blank">
                <FaYoutube size={22} />
              </Link>
            </div>
          </div>

        </div>

        {/* ====== Learning Resources ====== */}
        <div className="border-t border-gray-400 pt-10">
          <h3 className="font-bold text-lg mb-6">Learning Resources</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-sm">

            {/* Government Exam */}
            <div>
              <h4 className="font-semibold mb-3">Government Exam</h4>
              <ul className="space-y-2">
                <li><Link href="/courses?exam=68ac31d0a5a435b640ada5dd">Utarpardesh State</Link></li>
                <li><Link href="/courses?exam=68ac3177a5a435b640ada5d9">Punjab State</Link></li>
                <li><Link href="/courses?exam=68ac30c4a5a435b640ada5d5">Hariyana State</Link></li>
                <li><Link href="/courses?exam=68ac2d4d817fec5058627684">All India Exam</Link></li>
                <li><Link href="/courses?exam=68ad4356255f962ce73719c2">Rajasthan State</Link></li>
              </ul>
            </div>

            {/* Defence */}
            <div>
              <h4 className="font-semibold mb-3">Defence</h4>
              <ul className="space-y-2">
                <li><Link href="/courses?exam=68ac3c02a5a435b640ada61b">Territorial Army</Link></li>
                <li><Link href="/courses?exam=68ac3b89a5a435b640ada615">Indian Coast Guard</Link></li>
                <li><Link href="/courses?exam=68ac3affa5a435b640ada611">AFCAT</Link></li>
                <li><Link href="/courses?exam=68ac3a65a5a435b640ada60d">CDS</Link></li>
                <li><Link href="/courses?exam=68ac3959a5a435b640ada607">NDA</Link></li>
              </ul>
            </div>

            {/* Nursing */}
            <div>
              <h4 className="font-semibold mb-3">Banking</h4>
              <ul className="space-y-2">
                <li><Link href="courses?exam=68ac372ea5a435b640ada605">Banking/Insurance Exams</Link></li>
                <li><Link href="/courses?exam=68ac36f1a5a435b640ada601">NABARD Exams</Link></li>
                <li><Link href="/courses?exam=68ac3686a5a435b640ada5fd">RBI Exams</Link></li>
                <li><Link href="/courses?exam=68ac3634a5a435b640ada5f9">IBPS Exams</Link></li>
                <li><Link href="/courses?exam=68ac35e5a5a435b640ada5f5">SBI Exams</Link></li>
              </ul>
            </div>

            {/* Agriculture */}
            <div>
              <h4 className="font-semibold mb-3">REET</h4>
              <ul className="space-y-2">
                <li><Link href="/courses?exam=68ad4356255f962ce73719c2">3rd Grade Teacher Exam</Link></li>
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
                <li><Link href="/courses?exam=68ad4356255f962ce73719c2">3rd Grade Exam</Link></li>
                <li><Link href="/courses?exam=689dc5c896e7e5a6948099fa">Patwar Exam</Link></li>
                <li><Link href="/courses?exam=689c8a951914a3c05b945988">REET Exam</Link></li>
              </ul>
            </div>

            {/* NEET / JEE */}
            <div>
              <h4 className="font-semibold mb-3">Others Resources</h4>
              <ul className="space-y-2">
                <li><Link href="courses">All Exams</Link></li>
                <li><Link href="/previous-year-question">Download PDFs</Link></li>
                <li><Link href="/current-affairs">Current Affairs</Link></li>
                <li><Link href="/test-series">Test-Series</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* ====== Bottom ====== */}
        <div className="border-t border-gray-500 mt-10 pt-6 text-center text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/cancellation-and-refund-policy">Refund Policy</Link>
            <Link href="/terms-of-use">Terms & Conditions</Link>
            <Link href="#">Finance</Link>
          </div>
          <p>© 2025 PV Classes . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

