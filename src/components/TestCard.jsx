"use client";
import { Star } from "lucide-react";
import Image from "next/image";

export default function TestSeriesCard({
  title,
  subtitle,
  tests,
  price,
  originalPrice,
  validity,
  image,
  badge,
  discount,
}) {
  return (
    <div className="w-full max-w-sm rounded-xl shadow-md border border-gray-200 overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Title + New Tag */}
      <div className="px-4 pt-4">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold leading-snug">{title}</h2>
          <span className="bg-yellow-400 text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
            NEW
          </span>
        </div>
        <p className="font-semibold text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Image */}
      <div className="relative w-full h-56 px-4 mt-3">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          {badge && (
            <div className="absolute bottom-2 left-3 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full shadow-md">
              {tests} Tests
            </div>
          )}
        </div>
      </div>

      {/* Validity */}
      <p className="px-4 mt-3 font-medium text-sm">
        Validity for {validity} days
      </p>

      {/* Price + Discount */}
      <div className="px-4 pb-4 mt-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-indigo-700 font-bold text-lg">₹{price}</span>
            <span className="text-gray-400 line-through text-sm ml-1">
              ₹{originalPrice}
            </span>
          </div>
          <div className="text-green-700 text-xs font-semibold bg-green-50 px-2 py-1 rounded-md">
            {discount}% OFF
          </div>
        </div>
      </div>
    </div>
  );
}
