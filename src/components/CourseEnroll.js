import Image from "next/image";

export default function CourseEnroll() {
  return (

    <div className="p-18">
       <section className="w-full overflow-hidden p-8 bg-[#E6EEF5] rounded-2xl  shadow-blue-950">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="p-10">
          <h2 className="text-2xl md:text-4xl text-[#00316b] font-bold leading-snug mb-4">
            Course select kar tayyari ki shuruaat karen...!
          </h2>
          <p className=" mb-6 leading-relaxed">
            Paayen Free Resources Current Affairs aur notes PDFs, Test Series,
            Video Lectures aur bhi bahut kuch...
          </p>
          <button className="bg-[#788406] text-white px-6 py-2 rounded-md font-medium hover:bg-[#00316b] transition-colors">
            Enroll Now
          </button>
        </div>

        {/* Right Images */}
        <div className="flex items-end justify-center relative">
          {/* Phones */}
          <div className="grid grid-cols-1">
            <Image
              src="/Image/pv-logo.png"
              alt="Phone 1"
              width={320}
              height={300}
              className="drop-shadow-lg"
            />

          </div>



          </div>
        </div>

    </section>
    </div>

  );
}
