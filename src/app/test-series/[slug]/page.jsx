

// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axiosInstance from "../../axios/axiosInstance";
// import Image from "next/image";
// import { Share2, Star, ChevronRight } from "lucide-react";

// // Sidebar Card
// const SidebarCard = ({ series }) => {
//   return (
//     <div className="sticky top-10 pt-10 pb-20 px-2 w-full h-fit bg-white rounded-2xl border border-gray-100 shadow-lg">
//       {/* Image with tag */}
//       <div className="relative h-56">
//         <Image
//           src={`http://localhost:5000/uploads/testSeries/${series?.images?.[0]}`}
//           alt={series?.title}
//           fill
//           className="object-cover rounded"
//         />
//         <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
//           Test Series
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <h2 className="text-lg font-bold text-gray-800">{series?.title}</h2>
//         <p className="text-sm text-gray-500 mt-1">{series?.exam_id?.name}</p>

//         <div className="flex items-center gap-4 text-sm mt-4">
//           <span className="text-gray-600">Validity: {series?.validity}</span>
//           <span className="text-gray-600">Tests: {series?.total_tests}</span>
//         </div>

//         <hr className="my-4 border-gray-100" />

//         <div className="flex items-center justify-between mb-4">
//           <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
//             ₹{series?.discount_price} (Discounted)
//           </span>
//           <span className="text-xs text-gray-500 line-through">₹{series?.price}</span>
//         </div>

//         <button className="w-full bg-[#00316B] text-white font-semibold py-3 rounded-lg">
//           Add to Library
//         </button>

//         <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 cursor-pointer">
//           <Share2 size={16} className="text-blue-500" />
//           <span className="text-sm font-medium">Share Course</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Page
// export default function TestSeriesDetails() {
//   const { slug } = useParams();
//   const [series, setSeries] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await axiosInstance.get(`/test-series/${slug}`);
//         if (res.data.success) {
//           setSeries(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching details:", error);
//       }
//     };
//     fetchDetails();
//   }, [slug]);

//   if (!series) return <p className="text-center py-10">Loading...</p>;

//   return (
//     <section className="relative z-10 pt-10 md:pt-6">
//       {/* Banner */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 rounded-2xl max-w-[1160px] mx-auto mb-8">
//         <h1 className="text-3xl font-bold">{series.title}</h1>
//         <p className="text-lg mt-2">{series.exam_id?.name}</p>
//         <div className="mt-3 flex items-center gap-4">
//           <span>📚 {series.total_tests} Tests</span>
//           <span>⏳ Validity: {series.validity}</span>
//         </div>
//       </div>

//       <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_360px]">
//         {/* LEFT */}
//         <div>
//           {/* Overview */}
//           <h2 className="text-2xl font-semibold mb-4">Overview</h2>
//           <p className="text-gray-600 mb-6">{series.description}</p>

//           {/* Subjects */}
//           <h3 className="text-xl font-semibold mb-2">Subjects</h3>
//           <ul className="list-disc ml-6 mb-6">
//             {series.subjects.map((sub) => (
//               <li key={sub._id}>
//                 {sub.name} - {sub.test_count} tests
//               </li>
//             ))}
//           </ul>

//           {/* Syllabus / Tests */}
//           <h3 className="text-xl font-semibold mb-2">Syllabus & Tests</h3>
//           <div className="space-y-3 mb-6">
//             {series.tests?.map((test) => (
//               <div
//                 key={test._id}
//                 className="border p-3 rounded-lg flex justify-between items-center"
//               >
//                 <span className="font-medium">{test.title}</span>
//                 <span className="text-sm text-gray-500">
//                   {test.questions_count} Questions
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* FAQs */}
//           {series.faqs?.length > 0 && (
//             <>
//               <h3 className="text-xl font-semibold mb-2">FAQs</h3>
//               <div className="space-y-3 mb-6">
//                 {series.faqs.map((faq, i) => (
//                   <div key={i} className="border p-4 rounded-lg">
//                     <p className="font-semibold">{faq.question}</p>
//                     <p className="text-gray-600">{faq.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Reviews */}
//           {series.reviews?.length > 0 && (
//             <>
//               <h3 className="text-xl font-semibold mb-2">Student Reviews</h3>
//               <div className="space-y-4">
//                 {series.reviews.map((rev, i) => (
//                   <div
//                     key={i}
//                     className="border p-4 rounded-lg flex flex-col gap-2"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Star className="text-yellow-500" size={16} />
//                       <span className="font-medium">{rev.user}</span>
//                     </div>
//                     <p className="text-gray-600">{rev.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* RIGHT */}
//         <SidebarCard series={series} />
//       </div>
//     </section>
//   );
// }




"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "../../axios/axiosInstance";
import Image from "next/image";
import { Share2, Star, ChevronRight, BookOpen, Clock, FileText, Award, HelpCircle } from "lucide-react";

// Sidebar Card
const SidebarCard = ({ series }) => {
  return (
    <div className="sticky top-10 pt-6 pb-8 px-5 w-full h-fit bg-white rounded-2xl border border-gray-100 shadow-xl transition-all hover:shadow-2xl">
      {/* Image with tag */}
      <div className="relative h-64 rounded-xl overflow-hidden mb-5">
        <Image
          src={series?.image_urls?.[0] || "/placeholder-test.jpg"}
          alt={series?.title}
          fill
          className="object-cover"
          priority
        />
        <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          Test Series
        </span>
      </div>

      {/* Content */}
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
            <span className="text-xs text-gray-500 line-through">₹{series?.price}</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl font-bold text-green-600">₹{series?.discount_price}</span>
              <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {Math.round((1 - series?.discount_price / series?.price) * 100)}% OFF
              </span>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5">
          Add to Library
        </button>

        <div className="mt-5 flex items-center justify-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
          <Share2 size={18} className="text-blue-500" />
          <span className="text-sm font-medium">Share Course</span>
        </div>
      </div>
    </div>
  );
};

// Subject Card
const SubjectCard = ({ subject }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-gray-800">{subject.name}</h4>
      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
        {subject.test_count} {subject.test_count > 1 ? "Tests" : "Test"}
      </span>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {[...Array(subject.test_count)].map((_, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
          <span className="text-xs font-medium text-gray-600">Test {i + 1}</span>
        </div>
      ))}
    </div>
  </div>
);

// FAQ Card
const FAQCard = ({ faq, index }) => (
  <div className="border-b border-gray-100 py-5">
    <div className="flex items-start gap-3">
      <div className="bg-blue-50 p-2 rounded-full mt-0.5">
        <HelpCircle size={18} className="text-blue-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </div>
  </div>
);

// Review Card
const ReviewCard = ({ review }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
      <div>
        <h4 className="font-semibold text-gray-800">{review.user}</h4>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < review.rating ? "#F59E0B" : "none"}
              className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-600">{review.comment}</p>
  </div>
);

// Main Page
export default function TestSeriesDetails() {
  const { slug } = useParams();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for sections not in API response
  const mockTests = [
    { _id: "1", title: "Quantitative Aptitude - Test 1", questions_count: 25 },
    { _id: "2", title: "Logical Reasoning - Test 1", questions_count: 20 },
    { _id: "3", title: "English Language - Test 1", questions_count: 30 },
  ];

  const mockFAQs = [
    {
      question: "How can I access the test series?",
      answer: "After purchase, you'll find all tests in your library section accessible anytime during your validity period."
    },
    {
      question: "Can I attempt tests multiple times?",
      answer: "Yes, you can attempt each test multiple times during your validity period."
    }
  ];

  const mockReviews = [
    { user: "Rahul Sharma", rating: 5, comment: "Excellent test series! Helped me identify my weak areas." },
    { user: "Priya Patel", rating: 4, comment: "Questions are well-structured and match the actual exam difficulty." }
  ];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(`/test-series/${slug}`);
        if (res.data.success) {
          setSeries(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-xl mb-6"></div>
              
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!series) return <p className="text-center py-20 text-gray-500">Test series not found</p>;

  return (
    <section className="relative pt-6 md:pt-8 pb-16">
      {/* Banner */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10 px-8 rounded-2xl shadow-xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full">
                {series.title_tag} PREPARATION
              </span>
              <span className="flex items-center gap-1 text-sm bg-white/10 px-3 py-1 rounded-full">
                <Clock size={14} /> {series.validity} Validity
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{series.title}</h1>
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* LEFT CONTENT */}
        <div>
          {/* Overview */}
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{series.description}</p>
          </div>

          {/* Subjects */}
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText size={24} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Subjects & Tests</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {series.subjects.map((subject) => (
                <SubjectCard key={subject._id} subject={subject} />
              ))}
            </div>
          </div>

          {/* Syllabus / Tests */}
          {/* <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Test Structure</h2>
            <div className="space-y-4">
              {mockTests.map((test) => (
                <div
                  key={test._id}
                  className="border border-gray-100 p-4 rounded-xl flex justify-between items-center hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText size={20} className="text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">{test.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                      {test.questions_count} Questions
                    </span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* FAQs */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-2 rounded-lg">
                <HelpCircle size={24} className="text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2">
              {mockFAQs.map((faq, i) => (
                <FAQCard key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>

          {/* Reviews */}
          {/* <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Star size={24} className="text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Student Reviews</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mockReviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </div> */}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:mt-0 mt-6">
          <SidebarCard series={series} />
          
          {/* Additional Info Card */}
          <div className="mt-8 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">What's Included</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                </div>
                <span className="text-gray-600">Detailed performance analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                </div>
                <span className="text-gray-600">All India ranking</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                </div>
                <span className="text-gray-600">Section-wise breakdown</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                </div>
                <span className="text-gray-600">Previous year question patterns</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}