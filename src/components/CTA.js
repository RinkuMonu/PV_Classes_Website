"use client";
import Image from "next/image";

export default function OfferSection() {
  return (
    <section id="cta" className="w-full flex justify-center items-center px-4 sm:px-8 md:px-16 pt-4 pb-14">
      <div className="w-full max-w-7xl rounded-2xl p-1 sm:p-10 bg-gradient-to-r from-[#00316b] to-[#616602] text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">


        <div className="w-full md:w-1/2 text-center md:text-left md:ml-16">
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mt-0 mt-5 leading-snug">
            Upgrade Your Skills, <br className="hidden sm:block" />
            Upgrade Your Future!
          </h3>
          <p className="text-base sm:text-lg mb-6 leading-relaxed">
            Get the most out of our teaching with Plus.
          </p>
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
            Claim Your Free Month
          </button>
        </div>


        <div className="w-full md:w-1/2 flex justify-center">
  <Image
    src="/Image/cta-vector.png"
    alt="CTA Vector"
    width={100}
    height={100}
    className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] h-auto object-contain"
  />
</div>

      </div>
    </section>
  );
}
