/* ---------- Sidebar Card ---------- */
"use client"
function SidebarCard({ series, hasAccess }) {
  const { addToCart, loading } = useCart();
  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();
    const response = await addToCart({ itemType, itemId });
    if (response?.success) toast.success(response.message);
    else toast.error(response?.message || "Failed to add");
  };
  const img =
    series?.image_urls?.[0] ||
    (series?.images?.[0]
      ? `http://localhost:5000/uploads/testSeries/${series.images[0]}`
      : "/placeholder-test.jpg");
  return (
    <div className="sticky top-10 pt-6 pb-8 px-5 w-full h-fit bg-white rounded-2xl border border-gray-100 shadow-xl">
      <div className="relative h-64 rounded-xl overflow-hidden mb-5">
        <Image
          src={img}
          alt={series?.title}
          fill
          className="object-cover"
          // priority
        />
        <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          Test Series
        </span>
      </div>
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-800">{series?.title}</h2>
        <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Award size={16} className="text-indigo-600" />
          {series?.exam_id?.name}
        </p>
        <div className="flex items-center gap-4 text-sm mt-4 text-gray-600">
          <span className="flex items-center gap-1">
            <Clock size={16} className="text-blue-500" />
            {series?.validity}
          </span>
          <span className="flex items-center gap-1">
            <FileText size={16} className="text-green-500" />
            {series?.total_tests} Tests
          </span>
        </div>
        <hr className="my-5 border-gray-100" />
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="text-xs text-gray-500 line-through">
              ₹{series?.price}
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl font-bold text-green-600">
                ₹{series?.discount_price}
              </span>
              <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {Math.round((1 - series?.discount_price / series?.price) * 100)}
                % OFF
              </span>
            </div>
          </div>
        </div>
        {!hasAccess && (
          <button
            onClick={(e) => handleAdd(e, "testSeries", series?._id)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3.5 rounded-xl"
          >
            Add to Library
          </button>
        )}
        <div
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: series?.title,
                  text: "Check out this test series!",
                  url: window.location.href, 
                })
                .catch((err) => console.error("Share failed:", err));
            } else {
            
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard!");
            }
          }}
          className="mt-5 flex items-center justify-center gap-2 text-gray-600 cursor-pointer"
        >
          <Share2 size={18} className="text-blue-500" />
          <span className="text-sm font-medium">Share</span>
        </div>
      </div>
    </div>
  );
}