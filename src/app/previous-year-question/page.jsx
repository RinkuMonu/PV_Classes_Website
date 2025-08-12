"use client";
import { useState } from "react";
import { FaDownload, FaShareAlt } from "react-icons/fa";

export default function PreviousYearPapers() {
  const allPapers = [
    { exam: "BPSC CCE", desc: "BPSC CCE Previous Year Paper PDF with Solutions" },
    { exam: "SSC GD", desc: "SSC GD PYQ Papers with Solutions: Download PDF" },
    { exam: "IAF Agniveer Vayu", desc: "Indian Air Force Agniveer Previous Year Question Papers" },
    { exam: "UPPSC RO/ARO", desc: "UPPSC RO/ARO Previous Year Question Paper PDF" },
    { exam: "UPSC EPFO", desc: "UPSC EPFO Previous Year Question Paper PDFs (2013–2021)" },
    { exam: "ICG Navik", desc: "Indian Coast Guard Navik Previous Year Question Papers" },
    { exam: "MPPSC SSE", desc: "MPPSC SSE Previous Year Question Papers PDFs (2017–2021)" },
    { exam: "BSSC Inter Level", desc: "BSSC Inter Level Previous Question Year Paper PDFs" },
  ];

  const [search, setSearch] = useState("");

  const filteredPapers = allPapers.filter((paper) =>
    paper.exam.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-6 px-3 md:px-20 mx-auto">
      <div className="flex justify-between">
<h1 className="text-2xl font-bold mb-4">Previous Year Papers</h1>

   <div className="relative mb-4 w-full sm:w-1/3">
  <input
    type="text"
    placeholder="Search by exam..."
    className="w-full pl-10 pr-3 py-2 border border-[#00316B] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00316B] shadow-sm"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-[#00316B] absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110 4.5a7.5 7.5 0 016.65 12.15z" />
  </svg>
</div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#00316B] shadow-md">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#00316B] text-white">
              <th className="p-3 font-medium text-left">#</th>
              <th className="p-3 font-medium text-left">Exam</th>
              <th className="p-3 font-medium text-left">Description</th>
              <th className="p-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper, idx) => (
                <tr
                  key={idx}
                  className="transition hover:bg-blue-50 border-b border-gray-300"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3 font-medium">{paper.exam}</td>
                  <td className="p-3">{paper.desc}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button className="p-2 inline-flex hover:bg-blue-100 rounded transition text-[#00316B]">
                      <FaShareAlt className="mt-1 me-1"/> Share 
                    </button>
                    <button className="p-2 inline-flex bg-[#00316B] text-white rounded hover:bg-blue-900 transition">
                      <FaDownload className="mt-1 me-1"/> Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  No matching exams found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
