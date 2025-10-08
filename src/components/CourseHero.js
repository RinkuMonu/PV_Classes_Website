import Image from "next/image";

export default function CourseHero({ bannerSrc = "/Image/Banner/courses-banner.webp" }) {
    return (
        <section className="relative w-full h-[80vh] sm:h-[60vh] lg:h-[60vh] overflow-hidden bg-[#FAFBF6]">
            <Image
                src={bannerSrc}
                alt="Hero banner"
                width={920}
                height={520}
                // priority
                className=" z-[1] mx-auto w-full object-cover md:ml-auto" style={{height:"60vh"}}
            />
 <div className="absolute inset-0 block sm:hidden">
          <Image
            src="/Image/pv-mobile/course-banner-mob.webp"
            alt="Banner Mobile"
            fill
            className="object-cover object-center"
            // priority
          />
        </div>
        </section>
    );
}
