"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../axios/axiosInstance";


export default function CurrentAffairsDetails() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const sectionRefs = useRef([]);
    const scrollToSection = (index) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    };

    const [topPosts, setTopPosts] = useState([]);
    const [tags, setTags] = useState([]);

    // Fetch data
    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                // const res = await fetch(`http://localhost:5000/api/current-affairs/${slug}`);
                // const data = await res.json();
                 const res = await axiosInstance.get(`/current-affairs/${slug}`);
                setArticle(res.data);

                // Example: Fetch related posts & tags if you have endpoints
                // const topPostsRes = await fetch("http://localhost:5000/api/current-affairs?limit=5");
                // const topPostsData = await topPostsRes.json();
                    const topPostsRes = await axiosInstance.get(`/current-affairs`, { params: { limit: 5 } });
                setTopPosts(topPostsRes.data);

                // setTags(data.tags || []);
                setTags(res.data.tags || []);

            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    if (!article) {
        return <div className="p-10 text-center">Article not found.</div>;
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto p-4 md:flex gap-6">
                {/* Main content */}
                <div className="flex-1 overflow-hidden">
                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                    <div className="text-gray-400 font-semibold text-sm mb-6">
                        {article.category?.name} •{" "}
                        {new Date(article.publishDate).toLocaleDateString()} •
                        {article.readTime || "3 Min Read"}
                    </div>

                    <div className="mb-6 relative w-full aspect-[16/9]">
                        <Image
                            //   src={article.image}
                            // src={`http://localhost:5000${article.image}`}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${article.image}`}
                            alt={article.title}
                            fill
                            className="rounded-md object-cover"
                            priority
                            sizes="100vw"
                        />
                    </div>

                    {/* Table of Contents */}
                    {article.sections && article.sections.length > 0 && (
                        <div className="p-5 rounded-xl mb-6 shadow-md border border-gray-200">
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
                                {article.sections.map((sec, idx) => (
                                    <li
                                        key={idx}
                                        className="group flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-sm hover:-translate-y-[1px]"
                                        onClick={() => scrollToSection(idx)}
                                    >
                                        <span className="flex-1 text-gray-700 group-hover:text-black transition-colors font-medium">
                                            {sec.heading}
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Article Sections */}
                    {article.sections ? (
                        article.sections.map((sec, idx) => (
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
                        ))
                    ) : (
                        <p className="text-gray-700">{article.content}</p>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="w-full md:w-80 flex-shrink-0 mt-10 md:mt-3">
                    <div className="sticky top-24">
                        {/* Top Posts */}
                        <div className="mb-6 bg-gray-50 rounded-2xl shadow p-4">
                            <h3 className="font-semibold text-lg mb-4">Top Posts</h3>
                            <div className="space-y-4">
                                {topPosts.map((post) => (
                                    <Link
                                        key={post._id}
                                        href={`/current-affairs/${post.slug}`}
                                        className="flex gap-3 border-b border-gray-200 pb-4 last:border-0"
                                    >
                                        <Image
                                            width={40}
                                            height={40}
                                            //   src={post.image}
                                            // src={`http://localhost:5000${post.image}`}
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.image}`}
                                            alt={post.title}
                                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                        />
                                        <div className="flex flex-col justify-between w-full">
                                            <div className="flex items-center justify-between">
                                                <span className="bg-yellow-100 text-yellow-600 font-semibold text-xs px-2 py-0.5 rounded-md truncate max-w-[110px]">
                                                    {post.category?.name}
                                                </span>
                                                <span className="text-gray-400 text-xs font-semibold">
                                                    {new Date(post.publishDate).toLocaleDateString()}
                                                </span>
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
                        <div className="bg-gray-50 rounded-2xl shadow p-4">
                            <h3 className="font-semibold text-lg mb-4">Popular Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600 rounded-full hover:bg-gray-200"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
}
