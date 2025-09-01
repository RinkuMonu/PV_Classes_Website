
// 'use client';

// import { useState } from 'react';

// const FAQs = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const faqData = [
//     {
//       question: "How do I create an account on your platform?",
//       answer: "To create an account, click on the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. You'll then have full access to all features."
//     },
//     {
//       question: "What payment methods do you accept?",
//       answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway."
//     },
//     {
//       question: "How can I reset my password?",
//       answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire after 24 hours for security reasons."
//     },
//     {
//       question: "Do you offer customer support?",
//       answer: "Yes, we offer 24/7 customer support via live chat and email. Our average response time is less than 15 minutes during business hours."
//     },
//     {
//       question: "Can I cancel my subscription anytime?",
//       answer: "Absolutely. You can cancel your subscription at any time from your account settings. After cancellation, you'll still have access until the end of your billing period."
//     }
//   ];

//   return (
//     <section className="w-full max-w-4xl mx-auto px-4 py-16">
//       <div className="text-center mb-16">
//         <div className="inline-flex items-center justify-center p-4 bg-[#009FE3]/10 rounded-full mb-6">
//           <svg className="w-8 h-8 text-[#009FE3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         <h2 className="text-4xl md:text-5xl font-bold text-[#00316B] mb-4">
//           Frequently Asked Questions
//         </h2>
//         <p className="text-xl text-[#204972] max-w-2xl mx-auto">
//           Find quick answers to common questions about our services and platform.
//         </p>
//       </div>

//       <div className="space-y-6">
//         {faqData.map((faq, index) => (
//           <div 
//             key={index}
//             className={`rounded-2xl overflow-hidden transition-all duration-300 ${
//               activeIndex === index 
//                 ? 'bg-white shadow-lg ring-2 ring-[#87B105]/20' 
//                 : 'bg-gradient-to-r from-[#009FE3]/5 to-[#87B105]/5 shadow-md hover:shadow-lg'
//             }`}
//           >
//             <button
//               className="flex justify-between items-center w-full p-6 text-left"
//               onClick={() => toggleFAQ(index)}
//               aria-expanded={activeIndex === index}
//             >
//               <span className={`font-semibold text-lg md:text-xl transition-colors duration-200 ${
//                 activeIndex === index ? 'text-[#00316B]' : 'text-[#204972]'
//               }`}>
//                 {faq.question}
//               </span>
//               <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
//                 activeIndex === index 
//                   ? 'bg-[#87B105] text-white rotate-180' 
//                   : 'bg-white text-[#0281AD]'
//               }`}>
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </div>
//             </button>
            
//             <div
//               className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                 activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//               }`}
//             >
//               <div className="px-6 pb-6">
//                 <div className="pl-4 border-l-4 border-[#87B105]">
//                   <p className="text-[#204972]">{faq.answer}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

    
//     </section>
//   );
// };

// export default FAQs;




'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../app/axios/axiosInstance';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData, setFaqData] = useState([]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

useEffect(() => {
  const fetchFAQs = async () => {
    try {
      const res = await axiosInstance.get('/faq');
      if (res.data && res.data.success && Array.isArray(res.data.faqs)) {
        setFaqData(res.data.faqs);
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    }
  };

  fetchFAQs();
}, []);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-[#009FE3]/10 rounded-full mb-6">
          <svg className="w-8 h-8 text-[#009FE3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#00316B] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-[#204972] max-w-2xl mx-auto">
          Find quick answers to common questions about our services and platform.
        </p>
      </div>

      <div className="space-y-6">
        {faqData.map((faq, index) => (
          <div 
            key={faq._id || index}
            className={`rounded-2xl overflow-hidden transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-white shadow-lg ring-2 ring-[#87B105]/20' 
                : 'bg-gradient-to-r from-[#009FE3]/5 to-[#87B105]/5 shadow-md hover:shadow-lg'
            }`}
          >
            <button
              className="flex justify-between items-center w-full p-6 text-left"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
            >
              <span className={`font-semibold text-lg md:text-xl transition-colors duration-200 ${
                activeIndex === index ? 'text-[#00316B]' : 'text-[#204972]'
              }`}>
                {faq.question}
              </span>
              <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-[#87B105] text-white rotate-180' 
                  : 'bg-white text-[#0281AD]'
              }`}>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6">
                <div className="pl-4 border-l-4 border-[#87B105]">
                  <p className="text-[#204972]">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default FAQs;
