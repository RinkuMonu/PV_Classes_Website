import Image from "next/image";

export default function CourseHero({ bannerSrc = "/Image/courseBanner.jpg" }) {
    return (
        <section className="relative overflow-hidden bg-[#FAFBF6]">
            <Image
                src={bannerSrc}
                alt="Hero banner"
                width={920}
                height={520}
                priority
                className="relative z-[1] mx-auto w-full object-cover md:ml-auto" style={{height:"50vh"}}
            />

        </section>
    );
}
