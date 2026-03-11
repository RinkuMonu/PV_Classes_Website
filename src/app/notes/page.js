
"use client";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaDownload,
  FaWhatsapp,
  FaFacebook,
  FaChevronRight,
  FaChevronDown,
  FaBook,
  FaFolder,
  FaFile,
  FaGraduationCap,
  FaArrowLeft
} from "react-icons/fa";
import axiosInstance from "../axios/axiosInstance";

export default function Notes() {
  const [groupedNotes, setGroupedNotes] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // ================= FETCH ALL NOTES =================
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes");

        // const notesArray = res.data;

        const notesArray = res.data.filter(note => note.isFree === true);
        console.log("notesss:-", notesArray);

        // 🔥 Transform array -> grouped object
        const transformed = {};

        notesArray.forEach((note) => {
          const courseTitle = note.course?.title || "Unknown Course";
          const groupName = note.noteTitle || "General";

          if (!transformed[courseTitle]) {
            transformed[courseTitle] = {};
          }

          if (!transformed[courseTitle][groupName]) {
            transformed[courseTitle][groupName] = [];
          }

          transformed[courseTitle][groupName].push(note);
        });

        setGroupedNotes(transformed);
        setCourses(Object.keys(transformed));

      } catch (err) {
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const toggleGroup = (groupName) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  const getShareLinks = (note) => {
    const pdfUrl = `${BACKEND_URL}/${note.pdfUrl}`;
    const text = encodeURIComponent(`Check out ${note.title}: ${pdfUrl}`);
    return {
      whatsapp: `https://wa.me/?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pdfUrl)}`
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      
      <section className="relative w-full h-[60vh] text-white mb-8">
        <Image
          src="/Image/Banner/pyq-banner.webp"
          alt="Banner"
          fill
          className="object-cover object-center"
          priority
        />
      </section>

      <div className="px-4 md:px-20 pb-16 max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00316B] to-[#009FE3] mb-4">
            Study Notes
          </h1>
          <p className="text-gray-600 text-lg">Access and download study materials for all your courses</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin h-16 w-16 border-4 border-[#00316B] border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600">Loading notes...</p>
          </div>
        ) : (
          <>
            {/* ================= COURSE LIST ================= */}
            {!selectedCourse && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <FaGraduationCap className="text-3xl text-[#00316B]" />
                  <h2 className="text-2xl font-semibold text-gray-800">Select Your Course</h2>
                  <span className="bg-[#00316B] text-white px-3 py-1 rounded-full text-sm">
                    {courses.length} Courses
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => {
                    const totalNotes = Object.values(groupedNotes[course] || {}).reduce(
                      (acc, notes) => acc + notes.length, 0
                    );

                    return (
                      <div
                        key={course}
                        onClick={() => setSelectedCourse(course)}
                        className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
                      >
                        <div className="bg-gradient-to-r from-[#00316B] to-[#009FE3] h-2"></div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <FaBook className="text-3xl text-[#00316B] group-hover:scale-110 transition" />
                            <span className="bg-blue-100 text-[#00316B] px-3 py-1 rounded-full text-sm font-medium">
                              {totalNotes} {totalNotes === 1 ? 'Note' : 'Notes'}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#00316B] transition">
                            {course}
                          </h2>
                          <p className="text-gray-500 text-sm mt-2">
                            Click to view notes and study materials
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ================= NOTES INSIDE COURSE ================= */}
            {selectedCourse && (
              <>
                <button
                  onClick={() => {
                    setSelectedCourse(null);
                    setExpandedGroup(null);
                  }}
                  className="group mb-6 flex items-center gap-2 text-[#00316B] hover:text-[#009FE3] transition font-medium"
                >
                  <FaArrowLeft className="group-hover:-translate-x-1 transition" />
                  Back to Courses
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-[#00316B] to-[#009FE3] p-4 rounded-xl">
                      <FaBook className="text-white text-3xl" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">{selectedCourse}</h2>
                      <p className="text-gray-500 mt-1">
                        {Object.keys(groupedNotes[selectedCourse]).length} chapters available
                      </p>
                    </div>
                  </div>
                </div>

                {Object.keys(groupedNotes[selectedCourse]).map((group) => (
                  <div key={group} className="mb-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    
                    <div
                      onClick={() => toggleGroup(group)}
                      className="flex justify-between items-center p-5 cursor-pointer bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <FaFolder className="text-[#00316B] text-xl" />
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {group}
                        </h3>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          {groupedNotes[selectedCourse][group].length} notes
                        </span>
                      </div>
                      <div className="text-[#00316B]">
                        {expandedGroup === group ? (
                          <FaChevronDown className="text-xl" />
                        ) : (
                          <FaChevronRight className="text-xl" />
                        )}
                      </div>
                    </div>

                    {expandedGroup === group && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
                        {groupedNotes[selectedCourse][group].map((note) => {
                          const shareLinks = getShareLinks(note);

                          return (
                            <div
                              key={note._id}
                              className="group bg-white rounded-xl p-5 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#00316B] hover:scale-105"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-bold text-gray-800 group-hover:text-[#00316B] transition">
                                  {note.title}
                                </h4>
                                <FaFile className="text-gray-400 group-hover:text-[#00316B] transition" />
                              </div>

                              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {note.description}
                              </p>

                              <div className="flex items-center justify-end pt-3 border-t border-gray-100">
                                <a
                                  href={note.full_pdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gradient-to-r from-[#00316B] to-[#009FE3] text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                                >
                                  <FaDownload />
                                  Download
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}