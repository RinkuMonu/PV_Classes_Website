import React from "react";
import Image from "next/image";

function BannerImg2() {
  return (
    <>
      <div className="row mt-3 py-4 md:mb-8">
        <div className="grid grid-cols-1">
          <Image
            src="/Image/banner-img2.jpg"
            alt="Special Offer Banner"
            width={1250}
            height={600}
            className="w-full md:h-[400px] transition"
          />
        </div>
      </div>
    </>
  );
}

export default BannerImg2;
