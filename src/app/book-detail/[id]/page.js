"use client";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHandshakeSimple } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { GrSecure } from "react-icons/gr";
import { FiShoppingBag } from "react-icons/fi";
import axiosInstance from "../../axios/axiosInstance";
import { useCart } from "../../../components/context/CartContext";

export default function ProductPage() {
  const { addToCart, loading } = useCart();
  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();
    const response = await addToCart({
      itemType,
      itemId,
    });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  const params = useParams();
  const id = params.id;
  const [books, setBooks] = useState([]);

  const [booksData, setBooksData] = useState({});


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get(`/books/${id}`);
        console.log("res = ", res.data.data);
        setBooks(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [id]);
  console.log("book details = ", books);

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
  const [mainImage, setMainImage] = useState();
  useEffect(() => {
    setMainImage(books?.full_image?.[0]);
  }, [books]);


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get("/books/");
        console.log("books = ", res.data.data);
        setBooksData(res.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBook();
  }, []);

  return (
    <>
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
                alt="Book Thumbnail"
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
            alt="Main Book Image"
            width={350}
            height={500}
            className="border rounded-lg object-cover md:ml-16"
          />

          <div className="flex gap-4 mt-6 md:ml-16">
            {/* Add to Bag */}
            <button onClick={(e) => handleAdd(e, "book", books?._id)} className="flex items-center gap-2 px-6 py-3 border-2 border-[#616602] rounded-md text-[#616602] font-semibold text-base hover:bg-yellow-50 transition-colors duration-200">
              <FiShoppingBag className="text-[#616602] text-lg" />
              <span className="text-[#616602]">Add To Cart</span>
            </button>           
          </div>

        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">
            {books?.title}
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
            className={`font-semibold ${books?.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
          >
            {books?.stock > 0 ? "In Stock" : "Out Stock"}
          </p>
          <div>

          </div>
          <div>
            <h2 className="text-lg font-semibold mt-4">
              {books?.title}
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
                    key={index}
                    className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-200 ${index === features.length - 1 ? "border-b-0" : ""
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


      {/* Recentally Books */}
      <section className="px-6 py-8 bg-white m-12">
        {Object.entries(booksData).map(([subCatId, subCatData]) => (
          <div key={subCatId} className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#204972]">
                {/* {subCatData.book_subcategory_name} */}
                Recently Books
              </h2>
              <Link
                href={`/book-category/${subCatData?.books?.[0]?.category?._id}`}
                className="flex items-center text-[#616602] font-medium hover:underline"
              >
                See All <span className="ml-1">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subCatData?.books?.map((book) => (
                <div
                  key={book?._id}
                  className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition relative"
                >
                  <Link href={book?._id ? `/book-detail/${book?._id}` : '/'}>
                    {book?.tag?.map((tag, index) => (
                      <div
                        key={index}
                        className="absolute top-0 left-0 bg-[#616602] text-white text-xs px-3 py-1 rounded-br-lg font-semibold z-10 shadow-md mr-1"
                        style={{ top: `${index * 24}px` }}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </div>
                    ))}

                    <div className="relative w-full h-64">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/book/${book?.images?.[0]}`}
                        alt={book?.title || "Book image"}
                        fill
                        className="object-cover p-2"
                      />

                    </div>

                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {book?.title}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-semibold text-[#204972]">
                          ₹{book?.discount_price || book?.price}
                        </span>
                        {book?.discount_price && (
                          <span className="text-sm text-[#204972] font-medium">
                            ({Math.round(((book.price - book.discount_price) / book.price) * 100)}% OFF)
                          </span>
                        )}
                      </div>

                      {book?.discount_price && (
                        <p className="text-gray-400 line-through text-sm">
                          ₹{book?.price}
                        </p>
                      )}
                    </div>
                  </Link>

                  {/* Button ko card ke andar rakha, but Link ke bahar */}
                  {/* <button
                      onClick={(e) => handleAdd(e, "book", book?._id, book)}
                      disabled={loading}
                      className="flex absolute bottom-2 right-2 bg-yellow-100 px-2 py-1 rounded-md text-[#616602] text-sm font-bold shadow cursor-pointer disabled:cursor-not-allowed"
                    >
                      <span className="mt-1 me-2">
                        <FaPlus />
                      </span>
                      {loading ? "ADDING..." : "ADD"}
                    </button> */}
                </div>
              ))}
            </div>

          </div>
        ))}
      </section>
    </>

  );
}
