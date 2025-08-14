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
    "/Image/Banner/Faculty-1.jpg",
    "/Image/Banner/Faculty-2.jpg",
    "/Image/Banner/Faculty-3.jpg",
  ];

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {bannerImages.map((src, index) => (
          <div key={index} className="relative w-full h-[400px] md:h-[360px]">
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
