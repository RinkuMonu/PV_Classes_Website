import React from "react";
import Image from "next/image";

function BannerImg2() {
  return (
    <div>
      <div className="row md:mx-7 mt-3 py-4 md:mb-8">
        <div className="grid grid-cols-1">
          <Image
            src="/Image/banner-img2.jpg"
            alt="Special Offer Banner"
            width={1200}
            height={440}
            className="w-full md:h-[340px] md:rounded-3xl transition"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerImg2;
