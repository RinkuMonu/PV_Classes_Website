"use client";
import React from "react";
import Image from "next/image";

export default function TermsOfUse() {
  return (
    <section>
      {/* Banner */}
      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-2">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/terms-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/terms-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      <div className="px-16 py-12 bg-[#E6EEF5]">
        <h1 className="text-4xl font-bold text-center text-[#204972] mb-4">
          Terms & Conditions
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Please read these terms and conditions carefully before using PV
          Classes services.
        </p>

        {/* Terms Acceptance */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Terms & Acceptance
          </h3>

          <p className="text-gray-700 mb-3">
            By accessing or using the PV Classes website and services, you agree
            to comply with and be bound by these Terms & Conditions. If you do
            not agree with any part of these terms, you should not use our
            website or services.
          </p>

          <p className="text-gray-700">
            PV Classes provides educational content, online courses, study
            materials, and related services to help students prepare for various
            competitive examinations.
          </p>
        </div>

        {/* User Responsibilities */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            User Responsibilities
          </h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              You agree to provide accurate and complete information while
              registering on PV Classes.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              You agree not to share, distribute, or reproduce any course
              content without permission.
            </li>
            <li>
              Any misuse of the platform may result in suspension or termination
              of your account.
            </li>
          </ul>
        </div>

        {/* Course Access */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Course Access
          </h3>

          <p className="text-gray-700 mb-3">
            When you purchase a course on PV Classes, you are granted access to
            the course content for personal learning purposes only.
          </p>

          <p className="text-gray-700">
            Course materials, videos, PDFs, and other content are the
            intellectual property of PV Classes and must not be copied,
            redistributed, or shared with others.
          </p>
        </div>

        {/* Payments */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Payments & Transactions
          </h3>

          <p className="text-gray-700 mb-3">
            All payments made for courses or services on PV Classes are
            processed through secure payment gateways.
          </p>

          <p className="text-gray-700">
            Once a course is purchased and access is provided, the payment is
            considered final and is subject to our Cancellation & Refund Policy.
          </p>
        </div>

        {/* Security */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Security
          </h3>

          <p className="text-gray-700 mb-3">
            PV Classes takes reasonable measures to protect your personal
            information and maintain the security of our platform.
          </p>

          <p className="text-gray-700">
            However, users are also responsible for safeguarding their login
            credentials and ensuring that their account is not accessed by
            unauthorized persons.
          </p>
        </div>

        {/* Changes */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Changes to Terms
          </h3>

          <p className="text-gray-700">
            PV Classes reserves the right to update or modify these Terms &
            Conditions at any time. Any changes will be posted on this page and
            will become effective immediately upon publication.
          </p>
        </div>
      </div>
    </section>
  );
}