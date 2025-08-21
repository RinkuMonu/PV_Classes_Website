/* =========================================================
   SINGLE COMPONENT: Details + Start Test + Attempt + Result
   FILE: app/test-series/[id]/page.jsx
   ========================================================= */
"use client";
import { useCart } from "../../../components/context/CartContext";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../axios/axiosInstance";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Share2,
  Clock,
  FileText,
  BookOpen,
  HelpCircle,
  Award,
  CheckCircle,
} from "lucide-react";

export default function TestSeriesUnified() {
  const params = useParams();
  const seriesParam = params?.id ?? params?.slug;
  const seriesId = Array.isArray(seriesParam) ? seriesParam[0] : seriesParam;
  // ---------- Details state ----------
  const [series, setSeries] = useState(null);
  // ---------- View mode ----------
  // 'details' | 'attempt' | 'result'
  const [mode, setMode] = useState("details");

  // ---------- Attempt state ----------
  const [selectedTest, setSelectedTest] = useState(null); // currently chosen embedded test
  const [attemptId, setAttemptId] = useState(null);
  const [q, setQ] = useState(null);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [perQTime, setPerQTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [numericAnswer, setNumericAnswer] = useState("");
  const [result, setResult] = useState(null);

  const timerRef = useRef(null);

  const [completedTests, setCompletedTests] = useState({});

  const [hasAccess, setHasAccess] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token"); // 🔑 localStorage से token लेना
        if (!token) {
          setHasAccess(false);
          return;
        }

        const res = await axiosInstance.get(`/access/check/${seriesId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.message === "Access granted") {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (err) {
        console.error("Access check failed:", err);
        setHasAccess(false);
      }
    })();
  }, [seriesId]);

  // ---------------- Fetch details ----------------
  console.log(series,"serise")
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get(`/test-series/${seriesId}`);
        if (res.data.success) setSeries(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load test series.");
      }
    })();
  }, [seriesId]);
 
useEffect(() => {
  if (series?.attempts) {
    const completed = {};
    // Count attempts per test
    const attemptCounts = {};
    
    series.attempts.forEach(attempt => {
      if (!attemptCounts[attempt.test_id]) {
        attemptCounts[attempt.test_id] = 0;
      }
      attemptCounts[attempt.test_id]++;
      
      // Mark as completed if it's submitted (not just ongoing)
      if (attempt.status === 'submitted') {
        completed[attempt.test_id] = true;
      }
    });
    
    setCompletedTests(completed);
  }
}, [series]);

  // ---------------- Timer helpers ----------------
  const startTimer = (sec) => {
    stopTimer();
    setTimeLeft(sec);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          handleNext(true); // auto-submit on timeout
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };
  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // ---------------- Start Test ----------------
  const handleStart = async (test) => {
    try {
      setSelectedTest(test);
      const res = await axiosInstance.post(
        `/test-series/${seriesId}/tests/${test._id}/start`
      );
      setAttemptId(res.data.attempt_id);
      setPerQTime(res.data.perQuestionTimeSec || 30);
      setIndex(res.data.currentIndex);
      setTotal(res.data.total);
      setQ(res.data.question);
      setSelectedOptions([]);
      setNumericAnswer("");
      setMode("attempt");
      startTimer(res.data.perQuestionTimeSec || 30);
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Unable to start test.");
    }
  };

  // ---------------- Refresh Current Q ----------------
  const refreshCurrent = async () => {
    if (!attemptId) return;
    try {
      const res = await axiosInstance.get(
        `/test-series/${seriesId}/attempts/${attemptId}/current`
      );
      setQ(res.data.question);
      setIndex(res.data.currentIndex);
      setPerQTime(res.data.perQuestionTimeSec || 30);
      setSelectedOptions([]);
      setNumericAnswer("");
      startTimer(res.data.perQuestionTimeSec || 30);
    } catch (e) {
      toast.error("Failed to refresh.");
    }
  };

  // ---------------- Submit & Next ----------------
  const handleNext = async () => {
    if (!attemptId || !q) return;
    stopTimer();
    try {
      const payload =
        q.type === "numeric"
          ? {
              numericAnswer:
                numericAnswer === "" ? undefined : Number(numericAnswer),
            }
          : { selectedOptions };

      const res = await axiosInstance.post(
        `/test-series/${seriesId}/attempts/${attemptId}/answer`,
        payload
      );

      if (res.data.done) {
        setResult(res.data.result);
        setMode("result");
        return;
      }

      setQ(res.data.question);
      setIndex(res.data.currentIndex);
      setSelectedOptions([]);
      setNumericAnswer("");
      setPerQTime(res.data.perQuestionTimeSec || perQTime);
      startTimer(res.data.perQuestionTimeSec || perQTime);
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Failed to submit answer.");
    }
  };

  // ---------------- Finish (submit all) ----------------
  const handleFinish = async () => {
    if (!attemptId) return;
    try {
      const res = await axiosInstance.post(
        `/test-series/${seriesId}/attempts/${attemptId}/finish`
      );
      setResult(res.data.result);
      stopTimer();
      setMode("result");
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Failed to finish.");
    }
  };

  // ---------------- Option toggles ----------------
  const toggleOption = (key) => {
    if (!q) return;
    if (q.type === "mcq_single") setSelectedOptions([key]);
    else {
      setSelectedOptions((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    }
  };

  // ---------------- Reset to details ----------------
  const backToDetails = () => {
    stopTimer();
    setMode("details");
    setAttemptId(null);
    setSelectedTest(null);
    setQ(null);
    setIndex(0);
    setTotal(0);
    setSelectedOptions([]);
    setNumericAnswer("");
    setResult(null);
  };

  // =================== RENDER ===================

  // if (loading) return <div className="p-6">Loading...</div>;

  if (!series) return <div className="p-6">Test series not found.</div>;

  const banner = (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10 px-8 rounded-2xl shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            {series.title_tag && (
              <span className="bg-white/20 text-xs font-bold px-3 py-1.5 rounded-full">
                {series.title_tag} PREPARATION
              </span>
            )}
            <span className="flex items-center gap-1 text-sm bg-white/10 px-3 py-1 rounded-full">
              <Clock size={14} /> {series.validity} Validity
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{series.title}</h1>
          <p className="text-xl mt-3 text-blue-100">{series.exam_id?.name}</p>
          <div className="flex flex-wrap items-center gap-4 mt-6 text-blue-50">
            <span className="flex items-center gap-2">
              <FileText size={18} className="text-blue-200" />
              {series.total_tests} Comprehensive Tests
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={18} className="text-blue-200" />
              Complete Syllabus Coverage
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const sidebar = <SidebarCard series={series} />;

  // ---------- Mode: DETAILS ----------
  if (mode === "details") {
    return (
      <section className="relative pt-6 md:pt-8 pb-16">
        {banner}
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}
          <div>
            {/* Overview */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {series.description}
              </p>
            </div>

            {/* Subjects */}
            {series.subjects?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileText size={24} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Subjects & Tests
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                  {series.subjects.map((subject) => (
                    <div
                      key={subject._id}
                      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-800">
                          {subject.name}
                        </h4>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
                          {subject.test_count}{" "}
                          {subject.test_count > 1 ? "Tests" : "Test"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Embedded Tests */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Available Tests</h3>
              <div className="space-y-3">
                {(series.tests || []).map((test) => (
                  <div
                    key={test._id}
                    className="border border-gray-100 p-4 rounded-xl flex flex-wrap gap-3 items-center justify-between hover:border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {test.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          Subject: {test.subject} •{" "}
                          {test.questions?.length || 0} Questions •{" "}
                          {test.perQuestionTimeSec || 30}s/Q
                        </div>
                      </div>
                    </div>

                    {hasAccess ? (
                      completedTests[test._id] ? (
                        <div className="flex gap-2">
                          <button
                            disabled
                            className="px-3 py-2 rounded-lg bg-green-100 text-green-700 font-semibold flex items-center gap-2 text-sm"
                          >
                            <CheckCircle size={14} /> Completed
                          </button>
                          <button
                            onClick={() => handleStart(test)}
                            className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 text-sm"
                          >
                            Retake
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStart(test)}
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                        >
                          Start
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 rounded-lg bg-gray-300 text-gray-600 font-semibold cursor-not-allowed flex items-center gap-2"
                      >
                        🔒 Locked
                      </button>
                    )}
                  </div>
                ))}

                {(!series.tests || series.tests.length === 0) && (
                  <div className="text-sm text-gray-500">
                    No tests added yet.
                  </div>
                )}
              </div>
            </div>

            {/* FAQs (static) */}
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <HelpCircle size={24} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-2">
                <div className="border-b border-gray-100 py-4">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    How can I access the tests?
                  </h4>
                  <p className="text-gray-600">
                    After purchase, you will find all tests here and in your
                    Library during your validity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:mt-0 mt-6">{sidebar}</div>
        </div>
      </section>
    );
  }

  // ---------- Mode: ATTEMPT ----------
  if (mode === "attempt") {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {selectedTest?.title} — Question {index + 1} / {total}
          </h2>
          <div className="font-mono text-xl">
            {String(timeLeft).padStart(2, "0")}s
          </div>
        </div>

        {q ? (
          <div className="p-4 border rounded-lg bg-white">
            <div className="mb-3 text-gray-800">{q.statement}</div>

            {q.type?.includes("mcq") && (
              <div className="space-y-2">
                {q.options?.map((op) => (
                  <label
                    key={op.key}
                    className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type={q.type === "mcq_single" ? "radio" : "checkbox"}
                      name="opt"
                      checked={selectedOptions.includes(op.key)}
                      onChange={() => toggleOption(op.key)}
                    />
                    <span className="font-medium">{op.key}.</span>
                    <span>{op.text}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === "numeric" && (
              <input
                type="number"
                className="border rounded-md p-2 w-full"
                placeholder="Enter your answer"
                value={numericAnswer}
                onChange={(e) => setNumericAnswer(e.target.value)}
              />
            )}
          </div>
        ) : (
          <div className="p-4 border rounded-lg bg-white">
            Loading question…
          </div>
        )}

        <div className="flex justify-between">
          <button
            className="px-4 py-2 rounded-lg border"
            onClick={refreshCurrent}
          >
            Refresh
          </button>
          <div className="space-x-2">
            <button
              className="px-4 py-2 rounded-lg border"
              onClick={handleFinish}
            >
              Finish
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
              onClick={handleNext}
            >
              {index + 1 === total ? "Submit" : "Save & Next"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Mode: RESULT ----------
  if (mode === "result") {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold">Result — {selectedTest?.title}</h2>
        {result ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Total" value={result.totalQuestions} />
              <Stat label="Correct" value={result.correctCount} />
              <Stat label="Wrong" value={result.wrongCount} />
              <Stat label="Unattempted" value={result.unattemptedCount} />
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-lg">
                Total Marks:{" "}
                <span className="font-bold">{result.totalMarks}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 border rounded-lg">No result data.</div>
        )}

        <div className="flex gap-3">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            onClick={backToDetails}
          >
            Back to Series
          </button>
        </div>
      </div>
    );
  }

  return null;
}

/* ---------- Sidebar Card ---------- */
function SidebarCard({ series }) {
  const { addToCart, loading } = useCart();
  const handleAdd = async (e, itemType, itemId) => {
    e.stopPropagation();
    const response = await addToCart({ itemType, itemId });
    if (response?.success) toast.success(response.message);
    else toast.error(response?.message || "Failed to add");
  };
  const img =
    series?.image_urls?.[0] ||
    (series?.images?.[0]
      ? `http://localhost:5000/uploads/testSeries/${series.images[0]}`
      : "/placeholder-test.jpg");
  return (
    <div className="sticky top-10 pt-6 pb-8 px-5 w-full h-fit bg-white rounded-2xl border border-gray-100 shadow-xl">
      <div className="relative h-64 rounded-xl overflow-hidden mb-5">
        <Image
          src={img}
          alt={series?.title}
          fill
          className="object-cover"
          priority
        />
        <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          Test Series
        </span>
      </div>
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-800">{series?.title}</h2>
        <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Award size={16} className="text-indigo-600" />
          {series?.exam_id?.name}
        </p>
        <div className="flex items-center gap-4 text-sm mt-4 text-gray-600">
          <span className="flex items-center gap-1">
            <Clock size={16} className="text-blue-500" />
            {series?.validity}
          </span>
          <span className="flex items-center gap-1">
            <FileText size={16} className="text-green-500" />
            {series?.total_tests} Tests
          </span>
        </div>
        <hr className="my-5 border-gray-100" />
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="text-xs text-gray-500 line-through">
              ₹{series?.price}
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl font-bold text-green-600">
                ₹{series?.discount_price}
              </span>
              <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {Math.round((1 - series?.discount_price / series?.price) * 100)}
                % OFF
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => handleAdd(e, "testSeries", series?._id)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3.5 rounded-xl"
        >
          Add to Library
        </button>
        <div className="mt-5 flex items-center justify-center gap-2 text-gray-600 cursor-pointer">
          <Share2 size={18} className="text-blue-500" />
          <span className="text-sm font-medium">Share</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small stat tile ---------- */
function Stat({ label, value }) {
  return (
    <div className="p-4 rounded-lg border bg-white">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
