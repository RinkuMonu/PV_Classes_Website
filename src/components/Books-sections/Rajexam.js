import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const books = [
  {
    title: "Rajasthan Geography Handwritten Notes-2025 By Narendra Choudhary",
    price: 114,
    oldPrice: 120,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },
  {
    title: "Rajasthan Current Affairs Half Yearly Magazine-2025",
    price: 190,
    oldPrice: 200,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },
  {
    title: "Rajasthan Jila Darshan (4th Edition)",
    price: 114,
    oldPrice: 120,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },
  {
    title: "Rajasthan Vaahan Chaalak Bhartee Pareeksha 2024 Complete Study Guide",
    price: 213,
    oldPrice: 225,
    discount: "5% OFF",
    img: "/image/book2.webp",
  },

];

export default function rajexambooks() {
  return (
    <section className="px-6 py-8 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#204972]">
          Popular Rajasthan Exam books
        </h2>
        <Link
          href="#"
          className="flex items-center text-[#616602] font-medium hover:underline"
        >
          See All <span className="ml-1">→</span>
        </Link>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >

            <div className="absolute bg-[#616602] text-white text-xs px-3 py-1 rounded-br-lg font-semibold z-10 shadow-md">
              New Arrivals
            </div>


            <div className="relative w-full h-64">
              <Image
                src={book.img}
                alt={book.title}
                 width={200}
              height={150}

                className="object-contain p-2"
              />
              <Link href="/" className="flex absolute -bottom-28 right-2 bg-yellow-100 px-2 py-1 rounded-md text-[#616602] text-sm font-bold shadow">
                <span className="mt-1 me-2"><FaPlus /></span>
                ADD
              </Link>
            </div>


            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 line-clamp-2">
                {book.title}
              </p>


              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-semibold text-[#204972]">
                  ₹{book.price}
                </span>
                <span className="text-sm text-[#204972] font-medium">
                  ({book.discount})
                </span>
              </div>
              <p className="text-gray-400 line-through text-sm">
                ₹{book.oldPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
