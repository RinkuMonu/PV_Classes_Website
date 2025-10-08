"use client"
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const sectionRefs = useRef([]);
  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const articles = {
    toc: [
      "Trypanosomiasis (HAT) – Causes, Spread and Risk Areas",
      "happy ets WHO Certificate for Eliminating Trachoma",
      "enthosiusm Gets WHO Certificate for Eliminating Trachoma",
      "life Gets WHO Certificate for Eliminating Trachoma",
      "India Gets WHO Certificate for Eliminating Trachoma",


    ],
    sections: [
      {
        heading: "Trypanosomiasis (HAT) – Causes, Spread and Risk Areas",
        content: [
          "HAT is a vector-borne disease caused by the blood parasite Trypanosoma brucei.",
          "It spreads to humans through the bite of tsetse flies that have acquired the parasite from infected humans or animals.",
        ],
      },
      {
        heading: "happy ets WHO Certificate for Eliminating Trachoma",
        content: [
          "At the 78th World Health Assembly held in Geneva, WHO awarded India a certificate for the elimination of trachoma.",
        ],
      },
      {
        heading: "enthosiusm Gets WHO Certificate for Eliminating Trachoma",
        content: [
          "At the 78th World Health Assembly held in Geneva, WHO awarded India a certificate for the elimination of trachoma.",
        ],
      }, {
        heading: "life Gets WHO Certificate for Eliminating Trachoma",
        content: [
          "At the 78th World Health Assembly held in Geneva, WHO awarded India a certificate for the elimination of trachoma.",
        ],
      },
      {
        heading: "India Gets WHO Certificate for Eliminating Trachoma",
        content: [
          "At the 78th World Health Assembly held in Geneva, WHO awarded India a certificate for the elimination of trachoma.",
        ],
      },
    ],
  };

  const article = {
    title:
      "WHO Declares Kenya Free from Trypanosomiasis / Sleeping Sickness",
    author: "Utkarsh Classes",
    date: "12 Aug 2025",
    readTime: "3 Min Read",
    sections: [
      {
        heading: "Trypanosomiasis (HAT) – Causes, Spread and Risk Areas",
        content: [
          "HAT is a vector-borne disease caused by the blood parasite Trypanosoma brucei.",
          "It spreads to humans through the bite of tsetse flies that have acquired the parasite from infected humans or animals.",
          "Rural populations dependent on farming, fishing, livestock rearing, or hunting are at the highest risk of infection.",
        ],
      },
      {
        heading: "India Gets WHO Certificate for Eliminating Trachoma",
        content: [
          "At the 78th World Health Assembly held in Geneva, the World Health Organization (WHO) awarded India a certificate for the elimination of trachoma as a public health problem.",
        ],
      },
    ],
    toc: [
      "Trypanosomiasis (HAT) – Causes, Spread and Risk Areas",
      "India Gets WHO Certificate for Eliminating Trachoma",
      "WHO Adopts First Global Pandemic Agreement at 78th Assembly",
    ],
  };

  const topPosts = [
    {
      image: "/test1.webp",
      tag: "Place in News",
      date: "12 Aug 2025",
      title: "IIT Delhi and IIT Gandhinagar launch District Flood Severity Index",
    },
    {
      image: "/test1.webp",
      tag: "Award and Honour",
      date: "12 Aug 2025",
      title: "First Global M.S. Swaminathan Food & Peace Award Winner",
    },
    {
      image: "/test1.webp",
      tag: "Transport",
      date: "12 Aug 2025",
      title: "Indian Railways Trials Asia's Longest Freight Train 'Rudrastra'",
    }, {
      image: "/test1.webp",
      tag: "Award and Honour",
      date: "12 Aug 2025",
      title: "First Global M.S. Swaminathan Food & Peace Award Winner",
    },
    {
      image: "/test1.webp",
      tag: "Transport",
      date: "12 Aug 2025",
      title: "Indian Railways Trials Asia's Longest Freight Train 'Rudrastra'",
    },
  ];

  const tags = [
    "Health and Disease",
    "Important Day",
    "Science",
    "Person in News",
    "Place in News",
    "International news",
  ];


  return (
    <div className="bg-white min-h-screen">
      {/* Container */}
      <div className="max-w-7xl mx-auto p-4 md:flex gap-6">

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="text-gray-400 font-semibold text-sm mb-6">
            {article.author} • {article.date} • {article.readTime}
          </div>
          <div className="mb-6 relative w-full aspect-[16/9]">
            <Image
              src="/test1.webp"
              alt="Banner"
              fill
              className="rounded-md object-cover"
              // priority
              sizes="100vw"
            />
          </div>

          <div className=" p-5 rounded-xl mb-6 shadow-md border border-gray-200">
            <h2 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
              Table of Contents
            </h2>

            <ul className="space-y-2">
              {articles.toc.map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-sm hover:-translate-y-[1px]"
                  onClick={() => scrollToSection(idx)}
                >
                  <span className="flex-1 text-gray-700 group-hover:text-black transition-colors font-medium">
                    {item}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>


          {/* Article Sections */}
          {articles.sections.map((sec, idx) => (
            <div
              key={idx}
              ref={(el) => (sectionRefs.current[idx] = el)}
              className="mb-6 scroll-mt-20"
            >
              <h2 className="text-xl font-semibold mb-2">{sec.heading}</h2>
              {sec.content.map((p, i) => (
                <p key={i} className="mb-2 text-gray-700">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        <aside className="w-full md:w-80 flex-shrink-0 mt-10 md:mt-3">
          <div className="sticky top-24">
            <div className="mb-6 bg-gray-50 rounded-2xl shadow p-4">
              <h3 className="font-semibold text-lg mb-4">Top Posts</h3>
              <div className="space-y-4">
                {topPosts.map((post, idx) => (
                  <Link href="/current-affairs" key={idx} className="flex gap-3 border-b border-gray-200 pb-4 last:border-0">
                    <Image
                      width={40}
                      height={40}
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex items-center justify-between">
                        <span className="bg-yellow-100 text-yellow-600 font-semibold text-xs px-2 py-0.5 rounded-md truncate max-w-[110px]">
                          {post.tag}
                        </span>
                        <span className="text-gray-400 text-xs font-semibold">{post.date}</span>
                      </div>
                      <p className="text-sm font-medium hover:underline cursor-pointer line-clamp-2">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags */}

            <div className="bg-gray-50 rounded-2xl shadow p-4 ">
              <h3 className="font-semibold text-lg mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <Link
                    href="/current-affairs"
                    key={idx}
                    className="bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600  rounded-full cursor-pointer hover:bg-gray-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

    </div>

  );
}
