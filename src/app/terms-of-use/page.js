"use client";
import React from "react";
import Image from "next/image"

export default function TermsOfUse() {
  return (
<section className="">
  <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] text-white mb-6 sm:mb-2">
            <div className="absolute inset-0 hidden sm:block">
              <Image
                src="/Image/Banner/terms-banner.webp"
                alt="Banner Desktop"
                fill
                className="object-cover object-center"
                // priority
              />
            </div>
            <div className="absolute inset-0 block sm:hidden">
              <Image
                src="/Image/pv-mobile/terms-mob.webp"
                alt="Banner Mobile"
                fill
                className="object-cover object-center"
                // priority
              />
            </div>
          </section>
 <div className="px-16 py-12 bg-[#E6EEF5]">

      <h1 className="text-4xl font-bold text-center text-[#204972] mb-4">

Terms & Conditions
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Please read our Privacy Policy carefully before using our services.
      </p>

      <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
        <h3 className="text-2xl font-semibold text-[#204972] mb-4">
         Terms & Acceptance
        </h3>
        <p className="text-gray-700 mb-3">
        Please read the following terms and conditions very carefully as your use of service is subject to your acceptance of and compliance with the following terms and conditions Terms.
         <br />

By subscribing to or using any of our services you agree that you have read, understood and are bound by the Terms, regardless of how you subscribe to or use the services. If you do not want to be bound by the Terms, you must not subscribe to or use our services.
 <br />Return will not be accepted if the customer does not like the color of the dress. We try our best to ensure exact colors as shown. However, 5–10% variation is unavoidable due to lighting effects.<br />

Return will not be accepted if the customer is not satisfied, as we commit to deliver what we have displayed and for the prices we have charged which is the best possible.
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


      <div className="bg-white shadow-md rounded-lg border-l-4 border-[#616602] p-6 mb-8">
        <h3 className="text-2xl font-semibold text-[#204972] mb-4">
          Advertising
        </h3>
        <p className="text-gray-700 mb-3">
          We use some third parties to administer a limited set of
          advertisements on our website and portals. During this process, no
          personal information is leaked.
        </p>
        <p className="text-gray-700">
          Aggregate profile information, such as user community, may be used in
          the selection of advertising to make sure that it has relevance to the
          user.
        </p>
      </div>
    </div>
</section>
  );
}
