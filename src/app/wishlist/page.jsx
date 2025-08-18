"use client"
import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { removeItemFromWishlist, clearWishlist, fetchWishlist } from "../reduxslice/WishlistSlice"
import { Trash2, Heart, ArrowLeft, ShoppingBag, Star, Eye } from "lucide-react"
import Link from "next/link"
// import { Link } from "react-router-dom"
 import Swal from "sweetalert2"

const Wishlist = () => {
//   const { items: wishlistItems, loading } = useSelector((state) => state.wishlist)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(fetchWishlist())
//   }, [dispatch])

  const handleRemove = (id) => {
    dispatch(removeItemFromWishlist(id)).then(() => {
      dispatch(fetchWishlist())
    })
  }
const wishlistItems = [
  {
    product: {
      _id: "p1",
      productName: "Floral Block Print Cotton Kurta",
      description: "Beautifully hand-printed kurta made from premium cotton fabric.",
      images: ["/uploads/products/floral_kurta.jpg"],
      discount: 20,
      rating: 4.5,
      actualPrice: 1299,
      price: 1599,
      category: { name: "Traditional Wear" },
    },
  },
  {
    product: {
      _id: "p2",
      productName: "Handcrafted Wooden Serving Bowl",
      description: "Elegant wooden bowl, perfect for serving salads and snacks.",
      images: ["/uploads/products/wooden_bowl.jpg"],
      discount: 15,
      rating: 4,
      actualPrice: 899,
      price: 1050,
      category: { name: "Home Decor" },
    },
  },
  {
    product: {
      _id: "p3",
      productName: "Vintage Block Print Cushion Cover",
      description: "Add a touch of tradition to your home with these cushion covers.",
      images: ["/uploads/products/cushion_cover.jpg"],
      discount: 10,
      rating: 4.2,
      actualPrice: 499,
      price: 555,
      category: { name: "Home Furnishings" },
    },
  },
];
const loading = false;

  const handleClear = () => {
  if (wishlistItems.length > 0) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to clear your entire wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearWishlist());
        Swal.fire('Cleared!', 'Your wishlist has been cleared.', 'success');
      }
    });
  }
};

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < Math.floor(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))
  }
  

 return (
    <div className="min-h-screen bg-gray-50 pb-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/abstract-pattern.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="container mx-auto py-12 px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-[#384D89]/20">
          <div>
            <h1 className="text-3xl font-bold mb-2 leading-tight flex items-center gap-3 bg-clip-text text-[#00316B]">
              <Heart className="fill-current text-[#00316B]" size={28} />
              Your Wishlist
            </h1>
            <p className="text-[#2A4172] text-base">
              <span className="font-semibold text-[#00316B]">{wishlistItems?.length || 0}</span>{" "}
              {wishlistItems?.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
          {wishlistItems && wishlistItems.length > 0 && (
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleClear}
                className="inline-flex items-center space-x-2 text-[#2A4172] hover:text-[#681853] transition-colors font-medium px-4 py-2 rounded-xl border-2 border-[#384D89]/20 hover:border-[#A13C78]/50 hover:bg-[#A13C78]/10 shadow-sm hover:shadow-md text-sm group"
              >
                <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-white/50">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#384D89] to-[#2A4172] text-white animate-pulse">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#14263F] mb-2">Loading your wishlist...</h3>
            <p className="text-[#2A4172]">Please wait while we gather your saved items</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && (!wishlistItems || wishlistItems.length === 0) && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-white/50">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#384D89]/20 to-[#2A4172]/20 text-[#384D89]">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#14263F] mb-2">Your wishlist is empty</h3>
            <p className="text-[#2A4172] mb-6 max-w-md mx-auto text-sm">
              Start adding items you love! Click the heart icon on any product to save it here for later.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#A13C78] to-[#872D67] text-white font-medium rounded-xl hover:from-[#872D67] hover:to-[#681853] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        )}

        {/* Wishlist Items */}
        {!loading && wishlistItems && wishlistItems.length > 0 && (
         <div className="space-y-6">
      {wishlistItems
        .filter((item) => item?.product)
        .map((item, index) => (
          <div
            key={item?.product?._id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50 p-6 transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="relative w-full lg:w-56 h-56 rounded-xl overflow-hidden bg-gray-50 p-4 border-2 border-[#384D89]/20 shadow-inner">
                  <img
                    src={
                      item?.product?.images?.[0]
                        ? `http://api.jajamblockprints.com${item.product.images[0]}`
                        : "/diverse-products-still-life.png"
                    }
                    alt={item?.product?.productName || "No image"}
                    className="w-full h-full object-contain rounded-md hover:scale-105 transition-transform duration-300"
                  />
                  {item?.product?.discount && (
                    <div
                      className="absolute top-4 left-4 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md bg-[#00316B]"
                    >
                      {item.product.discount}% OFF
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-grow">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-[#14263F]">
                      {item?.product?.productName || "Unnamed Product"}
                    </h3>
                    <p className="text-[#2A4172] mb-3 line-clamp-2 text-sm">
                      {item?.product?.description ||
                        "Premium quality traditional wear crafted with authentic techniques and finest materials."}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">{/* renderStars(item?.product?.rating || 4) */}</div>
                      <span className="text-sm text-[#2A4172]/70">(Reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center mb-4">
                      <span className="text-2xl font-bold mr-2 bg-gradient-to-r from-[#384D89] to-[#2A4172] bg-clip-text text-transparent">
                        ₹{item?.product?.actualPrice || "N/A"}
                      </span>
                      {item?.product?.price && item?.product?.price !== item?.product?.actualPrice && (
                        <span className="text-base text-[#2A4172]/60 line-through">₹{item.product.price}</span>
                      )}
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <span className="text-sm text-[#2A4172]">Category: </span>
                      <span className="font-medium text-[#00316B]">
                        {item?.product?.category?.name || "Traditional Wear"}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`/product/${item?.product?._id}`}
                        className="flex-1 flex items-center justify-center gap-2 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 bg-gradient-to-r bg-[#00316B] hover:bg-[#384D89] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                      >
                        View Product
                      </a>
                      <button
                        onClick={() => alert(`Removed ${item?.product?.productName}`)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-[#384D89]/20 rounded-xl font-semibold transition-all duration-300 text-[#384D89] hover:bg-[#384D89] hover:text-white shadow-sm hover:shadow-md text-sm group"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
        )}
        {/* Bottom Navigation */}
        {!loading && wishlistItems && wishlistItems.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-[#2A4172] hover:text-[#14263F] transition-colors font-medium px-5 py-2.5 rounded-xl border-2 border-[#384D89]/20 hover:border-[#384D89] hover:bg-[#384D89]/5 shadow-sm hover:shadow-md text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
            <div className="text-center">
              <p className="text-[#2A4172] mb-3 text-sm">Found something you love?</p>
              <Link
                href="/products"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r bg-[#00316B] text-white font-semibold rounded-xl hover:bg-[#384D89]transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Explore More</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
