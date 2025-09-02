

// "use client";
// import { FaQuestionCircle, FaTimes, FaEye, FaHistory, FaPaperPlane } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import axiosInstance from "../app/axios/axiosInstance";

// const WhatsAppButton = () => {
//   const [showDoubtModal, setShowDoubtModal] = useState(false);
//   const [showSolutionModal, setShowSolutionModal] = useState(false);
//   const [doubts, setDoubts] = useState([]);
//   const [selectedDoubt, setSelectedDoubt] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("submit");

//   useEffect(() => {
//     fetchDoubtsHistory();
//   }, []);

//   const fetchDoubtsHistory = async () => {
//     try {
//       const response = await axiosInstance.get("/doubt/his");
//       setDoubts(response.data.history || []);
//     } catch (error) {
//       console.error("Error fetching doubts:", error);
//     }
//   };

//   const handleSubmitDoubt = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axiosInstance.post("/doubt/create", formData);

//       if (response.status === 200 || response.status === 201) {
//         alert("Doubt submitted successfully!");
//         setFormData({ title: "", description: "" });
//         fetchDoubtsHistory();
//         setActiveTab("history");
//       } else {
//         alert("Failed to submit doubt");
//       }
//     } catch (error) {
//       console.error("Error submitting doubt:", error);
//       if (!error.silent) alert("An error occurred while submitting your doubt");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleViewSolutions = (doubt) => {
//     setSelectedDoubt(doubt);
//     setShowSolutionModal(true);
//     setShowDoubtModal(false); // FIX: Hide the doubt modal when solution modal opens
//   };

//   const handleCloseSolutionModal = () => {
//     setShowSolutionModal(false);
//     setShowDoubtModal(true); // FIX: Show the doubt modal back when closing solution modal
//   };

//   const getUnreadSolutionsCount = () => {
//     return doubts.filter((d) => d.status === "resolved" && !d.viewed).length;
//   };

//   const unreadCount = getUnreadSolutionsCount();
//   const resolvedDoubts = doubts.filter((doubt) => doubt.status === "resolved");

//   return (
//     <>
//       <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
//         {unreadCount > 0 && (
//           <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mb-1 shadow-lg">
//             {unreadCount}
//           </div>
//         )}

//         <button
//           onClick={() => setShowDoubtModal(true)}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
//           style={{
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
//           }}
//         >
//           <FaQuestionCircle size={30} />
//         </button>
//       </div>

//       {/* Doubt Submission Modal */}
//       {showDoubtModal && (
//         <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-[#00316B] to-[#204972] text-white p-4 relative">
//               <h2 className="text-2xl font-bold text-center">Doubt Assistant</h2>
//               <button
//                 onClick={() => setShowDoubtModal(false)}
//                 className="absolute top-4 right-4 text-white hover:text-gray-200"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-gray-200">
//               <button
//                 className={`flex-1 py-3 font-medium flex items-center justify-center ${
//                   activeTab === "submit"
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveTab("submit")}
//               >
//                 <FaPaperPlane className="mr-2" /> Ask Doubt
//               </button>
//               <button
//                 className={`flex-1 py-3 font-medium flex items-center justify-center ${
//                   activeTab === "history"
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveTab("history")}
//               >
//                 <FaHistory className="mr-2" /> Solutions
//                 {unreadCount > 0 && (
//                   <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {unreadCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             <div className="max-h-[60vh] overflow-y-auto p-6">
//               {/* Submit Doubt Form */}
//               {activeTab === "submit" && (
//                 <form onSubmit={handleSubmitDoubt} className="mb-4">
//                   <div className="mb-5">
//                     <label className="block text-gray-700 mb-2 font-medium" htmlFor="title">
//                       Doubt Title
//                     </label>
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter your doubt title"
//                       required
//                     />
//                   </div>

//                   <div className="mb-6">
//                     <label
//                       className="block text-gray-700 mb-2 font-medium"
//                       htmlFor="description"
//                     >
//                       Description
//                     </label>
//                     <textarea
//                       id="description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       rows="4"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Describe your doubt in detail"
//                       required
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 font-medium"
//                   >
//                     {loading ? "Submitting..." : "Submit Doubt"}
//                   </button>
//                 </form>
//               )}

//               {/* Resolved Doubts History */}
//               {activeTab === "history" && (
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-gray-800">
//                     Your Resolved Doubts
//                   </h3>
//                   {resolvedDoubts.length > 0 ? (
//                     <div className="space-y-4">
//                       {resolvedDoubts.map((doubt, index) => (
//                         <div
//                           key={doubt._id || index}
//                           className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                         >
//                           <p className="font-medium text-gray-800">{doubt.title}</p>
//                           <p className="text-sm text-gray-600 mt-2 line-clamp-2">
//                             {doubt.description}
//                           </p>
//                           <div className="flex justify-between items-center mt-3">
//                             <span className="text-xs text-gray-500">
//                               {new Date(doubt.createdAt).toLocaleDateString()}
//                             </span>
//                             <button
//                               onClick={() => handleViewSolutions(doubt)}
//                               className="text-blue-500 hover:text-blue-700 text-sm flex items-center font-medium"
//                             >
//                               <FaEye className="mr-1" /> View Solution
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8">
//                       <div className="text-gray-400 mb-2">
//                         <FaHistory size={40} className="mx-auto" />
//                       </div>
//                       <p className="text-gray-500">No resolved doubts yet.</p>
//                       <p className="text-gray-400 text-sm mt-1">Your solutions will appear here</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Solution Viewing Modal */}
//       {showSolutionModal && selectedDoubt && (
//         <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-[#00316B] to-[#204972] text-white p-4 relative">
//               <h2 className="text-xl font-bold">Solution for Your Doubt</h2>
//               <button
//                 onClick={handleCloseSolutionModal} // FIX: Use new close function
//                 className="absolute top-4 right-4 text-white hover:text-gray-200"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <div className="p-6 max-h-[70vh] overflow-y-auto">
//               <div className="mb-5">
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">
//                   {selectedDoubt.title}
//                 </h3>
//                 <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDoubt.description}</p>
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <h4 className="text-lg font-semibold mb-3 text-gray-800">Solution:</h4>
//                 {selectedDoubt.solution ? (
//                   <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//                     <p className="text-gray-700">{selectedDoubt.solution}</p>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 italic">No solution provided yet.</p>
//                 )}
//               </div>

//               <div className="mt-5 text-sm text-gray-500 border-t border-gray-100 pt-3">
//                 Submitted on: {new Date(selectedDoubt.createdAt).toLocaleDateString()}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default WhatsAppButton;




"use client";
import { FaQuestionCircle, FaTimes, FaEye, FaHistory, FaPaperPlane } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from "../app/axios/axiosInstance";

const WhatsAppButton = () => {
  const [showDoubtModal, setShowDoubtModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [doubts, setDoubts] = useState([]);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("submit");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ new state

  useEffect(() => {
    // ✅ Check if token exists
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);

    if (token) {
      fetchDoubtsHistory();
    }
  }, []);

  const fetchDoubtsHistory = async () => {
    try {
      const response = await axiosInstance.get("/doubt/his");
      setDoubts(response.data.history || []);
    } catch (error) {
      console.error("Error fetching doubts:", error);
    }
  };

  const handleSubmitDoubt = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/doubt/create", formData);

      if (response.status === 200 || response.status === 201) {
        alert("Doubt submitted successfully!");
        setFormData({ title: "", description: "" });
        fetchDoubtsHistory();
        setActiveTab("history");
      } else {
        alert("Failed to submit doubt");
      }
    } catch (error) {
      console.error("Error submitting doubt:", error);
      if (!error.silent) alert("An error occurred while submitting your doubt");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewSolutions = (doubt) => {
    setSelectedDoubt(doubt);
    setShowSolutionModal(true);
    setShowDoubtModal(false);
  };

  const handleCloseSolutionModal = () => {
    setShowSolutionModal(false);
    setShowDoubtModal(true);
  };

  const getUnreadSolutionsCount = () => {
    return doubts.filter((d) => d.status === "resolved" && !d.viewed).length;
  };

  const unreadCount = getUnreadSolutionsCount();
  const resolvedDoubts = doubts.filter((doubt) => doubt.status === "resolved");

  // ✅ If not logged in → don't render anything
  if (!isLoggedIn) return null;

  return (
    <>
      <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
        {unreadCount > 0 && (
          <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mb-1 shadow-lg">
            {unreadCount}
          </div>
        )}

        <button
          onClick={() => setShowDoubtModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          style={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
          }}
        >
          <FaQuestionCircle size={30} />
        </button>
      </div>

      {/* Doubt Submission Modal */}
      {showDoubtModal && (
        <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00316B] to-[#204972] text-white p-4 relative">
              <h2 className="text-2xl font-bold text-center">Doubt Assistant</h2>
              <button
                onClick={() => setShowDoubtModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3 font-medium flex items-center justify-center ${
                  activeTab === "submit"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("submit")}
              >
                <FaPaperPlane className="mr-2" /> Ask Doubt
              </button>
              <button
                className={`flex-1 py-3 font-medium flex items-center justify-center ${
                  activeTab === "history"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("history")}
              >
                <FaHistory className="mr-2" /> Solutions
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6">
              {/* Submit Doubt Form */}
              {activeTab === "submit" && (
                <form onSubmit={handleSubmitDoubt} className="mb-4">
                  <div className="mb-5">
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="title">
                      Doubt Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your doubt title"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-700 mb-2 font-medium"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your doubt in detail"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#00316B] to-[#204972] text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 font-medium"
                  >
                    {loading ? "Submitting..." : "Submit Doubt"}
                  </button>
                </form>
              )}

              {/* Resolved Doubts History */}
              {activeTab === "history" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Your Resolved Doubts
                  </h3>
                  {resolvedDoubts.length > 0 ? (
                    <div className="space-y-4">
                      {resolvedDoubts.map((doubt, index) => (
                        <div
                          key={doubt._id || index}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <p className="font-medium text-gray-800">{doubt.title}</p>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {doubt.description}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-gray-500">
                              {new Date(doubt.createdAt).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => handleViewSolutions(doubt)}
                              className="text-blue-500 hover:text-blue-700 text-sm flex items-center font-medium"
                            >
                              <FaEye className="mr-1" /> View Solution
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">
                        <FaHistory size={40} className="mx-auto" />
                      </div>
                      <p className="text-gray-500">No resolved doubts yet.</p>
                      <p className="text-gray-400 text-sm mt-1">Your solutions will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Solution Viewing Modal */}
      {showSolutionModal && selectedDoubt && (
        <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00316B] to-[#204972] text-white p-4 relative">
              <h2 className="text-xl font-bold">Solution for Your Doubt</h2>
              <button
                onClick={handleCloseSolutionModal}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="mb-5">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {selectedDoubt.title}
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDoubt.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">Solution:</h4>
                {selectedDoubt.solution ? (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-gray-700">{selectedDoubt.solution}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No solution provided yet.</p>
                )}
              </div>

              <div className="mt-5 text-sm text-gray-500 border-t border-gray-100 pt-3">
                Submitted on: {new Date(selectedDoubt.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
