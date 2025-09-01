"use client";
import { useParams } from "next/navigation";

import { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHandshakeSimple } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { GrSecure } from "react-icons/gr";
import { FiShoppingBag } from "react-icons/fi";
import axiosInstance from "../axios/axiosInstance";

export default function ProductPage() {
    const params = useParams();
    const id = params.id;
    const [books, setBooks] = useState([]);
    useEffect(() => {    
        const fetchBooks = async () => {
          try {
            const res = await axiosInstance.get(`/books/${id}`);
            console.log("res = ",res.data.data);
            setBooks(res.data.data);
          } catch (error) {
            console.error(error);
          }
        };    
        fetchBooks();
    }, [id]);
    console.log("book details = ",books);

  const features = [
     {
      icon: <FaHandshakeSimple />,
      title: "Easy Support",
    },
    {
      icon: <VscWorkspaceTrusted />,
      title: "Trusted Shipping",
    },
    {
      icon: <GrSecure />,
      title: "100% Safe & Secure",
    },
  ];
  const [mainImage, setMainImage] = useState(books?.full_image?.[0]);
  return (
    <div className="flex gap-8 p-6">
      {/* Left Thumbnails */}
      <div className="flex flex-col gap-4">
        {books?.full_image?.map((img, index) => (
          <div
            key={index}
            className="border rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            onMouseEnter={() => setMainImage(img)}
          >
            <Image
              src={img ?? '/'}
              alt={`Thumbnail ${index + 1}`}
              width={70}
              height={100}
              className="object-cover"
            />
          </div>
        ))}
      </div>

        {/* Main Image */}
        <div className="flex-1">
            <Image
            src={mainImage ?? '/'}
            alt={books?.book_title}
            width={350}
            height={500}
            className="border rounded-lg object-cover md:ml-16"
            />

            <div className="flex gap-4 mt-6 md:ml-16">
            {/* Add to Bag */}
            <Link href="/addtocart" className="flex items-center gap-2 px-6 py-3 border-2 border-[#616602] rounded-md text-[#616602] font-semibold text-base hover:bg-yellow-50 transition-colors duration-200">
                <FiShoppingBag className="text-[#616602] text-lg" />
                <span className="text-[#616602]">Add To Bag</span>
            </Link>

            {/* Buy Now */}
            <Link href="/buynow" className="px-14 py-3 bg-[#616602] text-white font-medium rounded-md hover:bg-[#0281ad] transition-colors duration-200">
                Buy Now
            </Link>
            </div>

        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-semibold">
            {books?.book_title}
            </h1>
            <p className="text-gray-500">By PV Classes</p>
            <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold">₹{books?.discount_price}</span>
            <span className="line-through text-gray-400">₹{books?.price}</span>
                <span className="text-green-600 font-medium">
                    {books?.price && books?.discount_price
                        ? `(${Math.round(((books.price - books.discount_price) / books.price) * 100)}% OFF)`
                        : null}
                </span>
            </div>
            <p
            className={`font-semibold ${
                books?.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
            >
            {books?.stock > 0 ? "In Stock" : "Out Stock"}
            </p>
            <div>
            <p className="text-sm">Check Delivery/Cash on Delivery Availability</p>
            <div className="flex mt-1">
                <input
                type="text"
                placeholder="Enter Pincode"
                className="border rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#788406]"
                />
                <button className="bg-[#f5f0e1] text-[#616602] px-4 py-2 rounded-r-md">
                Check
                </button>
            </div>
            </div>
            <div>
            <h2 className="text-lg font-semibold mt-4">
            {books?.book_title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
            {books?.book_description}
            </p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Key Features</th>
                    </tr>
                    </thead>
                    <tbody>
                    {features.map((feature, index) => (
                        <tr
                        key={feature.id}
                        className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-200 ${
                            index === features.length - 1 ? "border-b-0" : ""
                        }`}
                        >
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                            {feature.title}
                            <span className="font-medium text-slate-700">{feature.title} {feature.value}</span>
                            </div>
                        </td>
                        
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-3 justify-center items-center gap-10 py-8">
                {features.map((feature, index) => (
                    <div
                    key={index}
                    className="flex flex-col items-center text-center px-4"
                    >
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#616602]">
                            <p className="text-3xl font-bold text-white">
                                {feature.icon}
                            </p>
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-800">
                            {feature.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
