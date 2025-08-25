import Image from "next/image"
import Link from "next/link"

export default function CourseEnroll() {
  return (
    <div className="px-4 md:px-6 lg:px-10 py-8">
      <section className="w-full overflow-hidden p-8 md:p-6 md:px-12 bg-[#dee9f3] rounded-xl border border-border shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#204972] font-bold leading-tight">
              Course select kar tayyari ki shuruaat karen...!
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Paayen Free Resources Current Affairs aur notes PDFs, Test Series, Video Lectures aur bhi bahut kuch...
            </p>
            <Link href="/courses" className="inline-block">
              <button className="bg-[#87b105] text-primary-foreground  md:px-6 md:py-2 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Enroll Now
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl transform scale-110"></div>
              <Image
                src="/Image/Banner/faculties-grp.webp"
                alt="Course Illustration"
                width={360}
                height={360}
                className="relative max-w-full h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
