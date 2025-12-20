// components/CourseCard.jsx
import Image from "next/image";
import Link from "next/link";

function slugify(str = "") {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function CourseCard({ course, formatINR }) {
  const {
    id, title, shortTitle, thumbnail,
    validityDays, durationHours, rating,
    price, discountedPrice, isFree, slug,
  } = course;

  const href = `/courses/${slug || slugify(`${title}-${id}`)}`;

  return (
    <Link
      href={href}
      className="block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow transition"
    >
      <article>
        <div className="aspect-[4/5] w-full overflow-hidden rounded-b-none">
          <Image
width ={200}
height ={200}
            src={thumbnail}
            alt={`${shortTitle || title} thumbnail`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-5">
            {shortTitle || title}
          </h3>

          {/* validity line */}
          <div className="mt-2 text-sm">
            {typeof validityDays === "number" ? (
              <span className="text-sky-600 hover:underline cursor-default">
                Validity {validityDays} Days
              </span>
            ) : durationHours ? (
              <span className="text-sky-600 hover:underline cursor-default">
                Duration {durationHours} Hours
              </span>
            ) : null}
          </div>

          {/* price / free */}
          <div className="mt-1 flex items-end gap-2">
            {isFree ? (
              <span className="text-[13px] text-emerald-700">Free for Students</span>
            ) : (
              <>
                <span className="text-[15px] font-semibold">
                  {formatINR?.(discountedPrice ?? price)}
                </span>
                {price && discountedPrice && (
                  <span className="text-[13px] text-neutral-400 line-through">
                    {formatINR?.(price)}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
