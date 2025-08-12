import Image from "next/image";

export default function CourseCard({ course, onSelect, ctaLabel = "View details" }) {
  const img = course.thumbnail || "/placeholder.jpg";
  const hasDiscount =
    typeof course.discountedPrice === "number" &&
    typeof course.price === "number" &&
    course.discountedPrice < course.price;

  const pctOff = hasDiscount
    ? Math.round((1 - course.discountedPrice / course.price) * 100)
    : 0;

  const formatINR = (n) =>
    typeof n === "number"
      ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
      : "—";

  return (
    <article className="group bg-white border rounded-xl overflow-hidden hover:shadow-lg transition">
      {/* Media */}
      <div className="relative aspect-[16/9]">
        <Image
          src={img}
          alt={course.shortTitle || course.title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          priority={false}
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="text-[11px] bg-white/90 border px-2 py-1 rounded shadow-sm">{course.category}</span>
          {hasDiscount && (
            <span className="text-[11px] bg-green-600 text-white px-2 py-1 rounded">
              {pctOff}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold leading-snug line-clamp-2">{course.title}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {(course.tags || []).slice(0, 3).map((t) => (
            <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>
          ))}
        </div>

        {/* Rating + Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative leading-none">
              <div className="text-gray-300 select-none">★★★★★</div>
              <div
                className="absolute inset-0 overflow-hidden text-yellow-500"
                style={{ width: `${Math.min(100, Math.max(0, (course.rating ?? 0) / 5 * 100))}%` }}
                aria-hidden
              >
                ★★★★★
              </div>
            </div>
            <span className="text-sm font-medium">{(course.rating ?? 0).toFixed(1)}</span>
          </div>

          <div className="text-right text-sm">
            {course.isFree ? (
              <span className="text-green-700 font-semibold">Free</span>
            ) : hasDiscount ? (
              <>
                <span className="line-through text-gray-400 me-2">{formatINR(course.price)}</span>
                <span className="font-semibold">{formatINR(course.discountedPrice)}</span>
              </>
            ) : (
              <span className="font-semibold">{formatINR(course.price)}</span>
            )}
          </div>
        </div>

        {/* Meta + CTA */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Updated{" "}
            {new Date(course.lastUpdated).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <button
            onClick={() => onSelect?.(course)}
            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
