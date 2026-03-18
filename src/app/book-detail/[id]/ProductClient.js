
"use client";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHandshakeSimple, FaPlus, FaArrowRight, FaShop } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { GrSecure } from "react-icons/gr";
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import axiosInstance from "../../axios/axiosInstance";
import { useCart } from "../../../components/context/CartContext";
import { FaFilePdf } from "react-icons/fa";

export default function ProductPage() {
  const { addToCart, loading, isOpen, openCart, closeCart } = useCart();


  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  const checkBookAccess = async (bookId) => {
    try {
      const response = await axiosInstance.get(`/access/check/${bookId}`);

    console.log("HElllooooooooooo Access API:", response); // 👈 check this


      if (response?.data?.message?.includes("granted")) {
        setHasPurchased(true);
      } else {
        setHasPurchased(false);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        return null;
      } else if (error?.response?.status === 403) {
        setHasPurchased(false);
      }
    } finally {
      setCheckingAccess(false);
    }
  };


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
        setBooks(res.data.data);
        checkBookAccess(id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [id]);

  const features = [
    {
      icon: <FiHeadphones className="text-xl" />,
      title: "Easy Support",
      desc: "24/7 customer support"
    },
    {
      icon: <FiTruck className="text-xl" />,
      title: "Trusted Shipping",
      desc: "Free delivery on orders above ₹499"
    },
    {
      icon: <FiShield className="text-xl" />,
      title: "100% Safe & Secure",
      desc: "Secure payment options"
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
        setBooksData(res.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBook();
  }, []);

  return (
    <>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-5">
        {/* Breadcrumb */}


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:w-2/5">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto py-2 lg:py-0">
              {books?.full_image?.map((img, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${mainImage === img ? 'border-[#616602]' : 'border-gray-200'}`}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img ?? '/'}
                    alt="Book Thumbnail"
                    width={80}
                    height={100}
                    className="object-cover h-20 w-16 lg:h-24 lg:w-20"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <Image
                src={mainImage ?? '/'}
                alt="Main Book Image"
                width={400}
                height={500}
                className="object-contain rounded-lg shadow-md"
                style={{ height: '400px', width: 'auto' }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-3/5">
            <div className="mb-4">
              <span className="bg-[#616602] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Bestseller
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {books?.title}
            </h1>

            <p className="text-gray-500 mb-4">By PV Classes</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm">(42 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#204972]">₹{books?.discount_price}</span>
              {books?.discount_price && books?.price && (
                <>
                  <span className="line-through text-gray-400 text-xl">₹{books?.price}</span>
                  <span className="text-green-600 font-medium bg-green-100 px-2 py-1 rounded-md">
                    Save {Math.round(((books.price - books.discount_price) / books.price) * 100)}%
                  </span>
                </>
              )}
            </div>

            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${books?.stock > 0 ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`}>
                {books?.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {books?.book_description}
            </p>


            {/* PDF Section */}
            <div className="mt-6 space-y-3">

              {/* Free PDF */}
              {books?.free_pdf_url && (
                <a
                  href={books?.free_pdf_url}
                  target="_blank"
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <FaFilePdf className="text-red-500 text-xl" />
                    <span className="font-medium">Free Sample PDF</span>
                  </div>

                  <span className="text-sm text-green-600 font-semibold">
                    Download
                  </span>
                </a>
              )}

              {/* Paid PDF */}
              {books?.paid_pdf_url && (
                <div className="flex items-center justify-between p-3 border rounded-lg">

                  <div className="flex items-center gap-3">
                    <FaFilePdf className="text-red-500 text-xl" />
                    <span className="font-medium">Full Book PDF</span>
                  </div>

                  {hasPurchased ? (
                    <a
                      href={books?.paid_pdf_url}
                      target="_blank"
                      className="text-green-600 font-semibold"
                    >
                      Download
                    </a>
                  ) : (
                    <span 
                    
                      onClick={(e) => {
                  handleAdd(e, "book", books?._id);
                  openCart();
                }}
                    className="flex items-center gap-1 text-gray-500 cursor-pointer">
                      🔒 Locked
                    </span>
                  )}
                </div>
              )}

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 mt-4">
              <button
                onClick={(e) => {
                  handleAdd(e, "book", books?._id);
                  openCart();
                }}
                disabled={loading || books?.stock <= 0}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-[#616602] text-white rounded-lg font-semibold hover:bg-[#4d5501] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    ADDING...
                  </>
                ) : (
                  <>
                    <HiShoppingCart className="text-lg" />
                    ADD TO CART
                  </>
                )}
              </button>


              {/* <button className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-[#616602] text-[#616602] rounded-lg font-semibold hover:bg-[#616602] hover:text-white transition-colors">
                <BsStars className="text-lg" />
                BUY NOW
              </button> */}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#616602] text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Viewed Books */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recently Viewed Books</h2>
            <Link
              href="/book"
              className="flex items-center text-[#616602] font-medium hover:underline bg-green-200 px-3 py-1"
            >
              View All
              <FaArrowRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(booksData).slice(0, 1).map(([subCatId, subCatData]) => (
              subCatData?.books?.slice(0, 4).map((book) => (
                <div
                  key={book?._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <Link href={book?._id ? `/book-detail/${book?._id}` : '/'}>
                    <div className="relative">
                      {/* {book?.tag?.map((tag, index) => (
                        <div
                          key={index}
                          className="absolute top-3 left-3 bg-[#616602] text-white text-xs px-2 py-1 rounded-md font-semibold z-10"
                        >
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </div>
                      ))} */}

                      <div className="relative w-full h-60 bg-gray-100">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/book/${book?.images?.[0]}`}
                          alt={book?.title || "Book image"}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 h-12">
                        {book?.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-[#204972]">
                          ₹{book?.discount_price || book?.price}
                        </span>
                        {book?.discount_price && (
                          <span className="text-xs text-[#616602] font-medium bg-yellow-100 px-2 py-1 rounded">
                            {Math.round(((book.price - book.discount_price) / book.price) * 100)}% OFF
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

                  <div className="px-4 pb-4">
                    <button
                      onClick={(e) => handleAdd(e, "book", book?._id)}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-2 text-sm font-semibold rounded-lg hover:bg-[#616602] hover:text-white transition-colors disabled:opacity-50"
                    >
                      <FaPlus className="text-xs" />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))
            ))}
          </div>
        </section>
      </div>
    </>
  );
}