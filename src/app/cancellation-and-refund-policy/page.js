"use client";
import React from "react";
import Image from "next/image"

export default function RefundPolicy() {
  return (
    <section className="">
      <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-2">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/Image/Banner/refund.webp"
            alt="Banner Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/refund-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>
      <div className="px-16 py-12 bg-[#E6EEF5]">

        <h1 className="text-4xl font-bold text-center text-[#204972] mb-4">

          Cancellation & Refund Policy
        </h1>
        <p className="text-center text-gray-600 mb-10">
Please read our cancellation and refund policy carefully before purchasing any course.
        </p>

      <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
  <h3 className="text-2xl font-semibold text-[#204972] mb-4">
    Refund Policy
  </h3>

  <p className="text-gray-700 mb-3">
    All courses available on the PV Classes website are digital learning
    products. Once a course is purchased and access is provided to the user,
    the payment is considered final.
  </p>

  <p className="text-gray-700 mb-3">
    We do not offer any refunds, cancellations, or exchanges after the purchase
    of a course under any circumstances. We strongly recommend that users read
    the course details, description, and syllabus carefully before making a
    purchase.
  </p>

  <p className="text-gray-700 mb-3">
    Once the course access has been granted to your account, it cannot be
    transferred, canceled, or refunded. This policy helps us maintain the
    integrity of our digital learning platform.
  </p>

  <p className="text-gray-700">
    If you face any technical issues while accessing the course, you may contact
    our support team, and we will assist you in resolving the issue as soon as
    possible.
  </p>
</div>


        <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
          <h3 className="text-2xl font-semibold text-[#204972] mb-4">Security</h3>
          <p className="text-gray-700 mb-3">
            The security of your personal information is very important to us. We
            use physical, administrative and technical safeguards to protect your
            personal data from unauthorized access.
          </p>
          <p className="text-gray-700 mb-3">
            In addition, we use standard security protocols and mechanisms to
            exchange the transmission of sensitive data such as credit card
            details.
          </p>
          <p className="text-gray-700">
            In the event of any breach of your personal information, we will
            notify you by email or fax and restore the integrity of the data
            system.
          </p>
        </div>


    
      </div>
    </section>
  );
}
