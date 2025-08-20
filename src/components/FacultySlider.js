"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FacultySlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  const bannerImages = [
    "/Image/Banner/faculty-1.webp",
    "/Image/Banner/faculty-2.webp",
    "/Image/Banner/faculty-3.webp",
    "/Image/Banner/faculty-4.webp",
  ];

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {bannerImages.map((src, index) => (
          <div
            key={index}
            className="relative w-full h-[250px] sm:h-[300px] md:h-[360px] lg:h-[400px]"
          >
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              priority
              className="object-contain md:object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
