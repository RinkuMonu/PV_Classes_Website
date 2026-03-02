"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/courses?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded-lg w-64"
      />
      <button
        type="submit"
        className="bg-[#204972] text-white px-4 py-2 rounded-lg"
      >
        <FaSearch />
      </button>
    </form>
  );
}