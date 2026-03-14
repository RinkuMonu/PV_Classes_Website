"use client";
import React from "react";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <section>
      {/* Banner Section */}
      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-2">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/privacy-banner.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/privacy-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Content Section */}
      <div className="px-16 py-12 bg-[#E6EEF5]">
        <h1 className="text-4xl font-bold text-center text-[#204972] mb-4">
          Privacy Policy
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Your privacy is important to us. Please read this Privacy Policy
          carefully to understand how PV Classes collects, uses, and protects
          your information.
        </p>

        {/* Information We Collect */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Information We Collect
          </h3>

          <p className="text-gray-700 mb-3">
            When you register on PV Classes, we may collect personal information
            such as your name, phone number, email address, exam preference,
            and other details required to provide our educational services.
          </p>

          <p className="text-gray-700">
            We may also collect information related to your course purchases,
            learning activity, and interactions with our platform in order to
            improve our services and provide a better learning experience.
          </p>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            How We Use Your Information
          </h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>To create and manage your account on PV Classes.</li>
            <li>To provide access to purchased courses and study materials.</li>
            <li>To send important notifications, updates, and announcements.</li>
            <li>To improve our courses, services, and website performance.</li>
            <li>To process payments and manage transactions securely.</li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Data Security
          </h3>

          <p className="text-gray-700 mb-3">
            We take appropriate technical and organizational measures to protect
            your personal information from unauthorized access, misuse, or
            disclosure.
          </p>

          <p className="text-gray-700">
            All payment transactions are processed through secure payment
            gateways. PV Classes does not store your credit card or sensitive
            payment details on our servers.
          </p>
        </div>

        {/* Cookies */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Cookies and Tracking
          </h3>

          <p className="text-gray-700">
            Our website may use cookies and similar technologies to enhance your
            browsing experience, analyze website traffic, and improve our
            services. You can control cookie preferences through your browser
            settings.
          </p>
        </div>

        {/* Third Party Services */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Third-Party Services
          </h3>

          <p className="text-gray-700">
            PV Classes may use trusted third-party services such as payment
            gateways, analytics tools, and communication platforms to operate
            our services effectively. These third parties have their own
            privacy policies governing how they handle information.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">
            Contact Us
          </h3>

          <p className="text-gray-700">
            If you have any questions about this Privacy Policy or how your data
            is handled, please contact the PV Classes support team through our
            official website.
          </p>
        </div>
      </div>
    </section>
  );
}