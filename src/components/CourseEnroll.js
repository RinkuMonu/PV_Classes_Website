import Image from "next/image";
import Link from "next/link";
export default function CourseEnroll() {
  return (
    <div className="px-4 md:px-10 lg:px-18 py-10">
      <section className="w-full overflow-hidden p-6 md:p-10 bg-[#E6EEF5] rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">

          {/* Left Content */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#00316b] font-bold leading-snug mb-4">
              Course select kar tayyari ki shuruaat karen...!
            </h2>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">
              Paayen Free Resources Current Affairs aur notes PDFs, Test Series,
              Video Lectures aur bhi bahut kuch...
            </p>
            <Link href="/courses" className="inline-block mb-4">
            <button className="bg-[#788406] text-white px-6 py-3 rounded-md font-medium hover:bg-[#00316b] transition-colors">
              Enroll Now
            </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/Image/pv-logo.png"
              alt="Course Illustration"
              width={300}
              height={300}
              className="max-w-full h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
