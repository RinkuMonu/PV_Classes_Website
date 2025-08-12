import GKbooks from "../../components/Books-sections/GKbooks";
import Rajexam from "../../components/Books-sections/Rajexam";
import Popularmagazines from "../../components/Books-sections/Popularmagazines";
import Image from "next/image";
import Link from "next/link";

export default function Book() {

  const sidebarItems = [
    { img: "/image/img1.jpg", label: "UGC-NET" },
    { img: "/image/img2.jpg", label: "Kumar Gaurav Sir" },
    { img: "/image/img3.jpg", label: "REET Exam Special" },
    { img: "/image/img1.jpg", label: "Popular Item's" },
    { img: "/image/img2.jpg", label: "Magazines" },
    { img: "/image/img3.jpg", label: "Rajasthan Exams" },
    { img: "/image/img1.jpg", label: "Rajasthan Civil" },
    { img: "/image/img2.jpg", label: "U.P. Civil" },
    { img: "/image/img3.jpg", label: "M.P. Civil" },
    { img: "/image/img2.jpg", label: "Magazines" },
    { img: "/image/img3.jpg", label: "Rajasthan Exams" },
    { img: "/image/img1.jpg", label: "Rajasthan Civil" },
    { img: "/image/img2.jpg", label: "U.P. Civil" },
    { img: "/image/img3.jpg", label: "M.P. Civil" },
  ];

  return (
    <div className="flex gap-6 p-4">
      <aside className="bg-[#204972] text-white rounded-lg p-4 w-56 flex flex-col gap-4 sticky top-4 h-fit">
  {sidebarItems.map((item, index) => (
    <Link href="/book-category"
      key={index}
      className="flex items-center gap-3 hover:scale-105 transition"
    >
      <Image
        src={item.img}
        alt={item.label}
        width={40}
        height={40}
        className="rounded-md"
      />
      <span className="text-sm">{item.label}</span>
    </Link>
  ))}
</aside>



      <main className="flex-1 space-y-8">
        <GKbooks />
        <Rajexam />
        <Popularmagazines />
      </main>
    </div>
  );
}
