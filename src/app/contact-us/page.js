// "use client";
// import { useState } from "react";

// import { MessageCircle, MapPin, Phone } from "lucide-react";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validate = () => {
//     let newErrors = {};

//     // First name validation (only letters, min 2)
//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "First name is required.";
//     } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
//       newErrors.firstName = "First name must contain only letters.";
//     } else if (formData.firstName.length < 2) {
//       newErrors.firstName = "First name must be at least 2 characters.";
//     }

//     // Last name validation (only letters, min 2)
//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Last name is required.";
//     } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
//       newErrors.lastName = "Last name must contain only letters.";
//     } else if (formData.lastName.length < 2) {
//       newErrors.lastName = "Last name must be at least 2 characters.";
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Enter a valid email address.";
//     }

//     // Phone validation (only numbers & exactly 10 digits)
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required.";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits.";
//     }

//     // Message validation
//     if (!formData.message.trim() || formData.message.length < 10) {
//       newErrors.message = "Message must be at least 10 characters.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         message: "",
//       });
//       setErrors({});
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <section
//         className="text-white py-20"
//         style={{ background: "linear-gradient(to right, #0F437B, #13773E)" }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
//           <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
//             We'd love to hear from you. Send us a message and we'll respond as
//             soon as possible.
//           </p>
//           {/* <div className="flex justify-center space-x-8 opacity-90">
//             <div className="flex items-center">
//               <Phone className="w-5 h-5 mr-2" />
//               <span>24/7 Support</span>
//             </div>
//             <div className="flex items-center">
//               <MessageCircle className="w-5 h-5 mr-2" />
//               <span>Quick Response</span>
//             </div>
//             <div className="flex items-center">
//               <MapPin className="w-5 h-5 mr-2" />
//               <span>Multiple Locations</span>
//             </div>
//           </div> */}
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact us</h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Our friendly team would love to hear from you.
//           </p>
//         </div>

//         {/* Contact Form */}
//         <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2">
//             {/* Left: Form */}
//             <div className="p-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label
//                       htmlFor="firstName"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       First name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
//                         errors.firstName ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="First name"
//                     />
//                     {errors.firstName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.firstName}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="lastName"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Last name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
//                         errors.lastName ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="Last name"
//                     />
//                     {errors.lastName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.lastName}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
//                       errors.email ? "border-red-500" : "border-gray-300"
//                     }`}
//                     placeholder="you@example.com"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                   )}
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Phone number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     maxLength={10}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
//                       errors.phone ? "border-red-500" : "border-gray-300"
//                     }`}
//                     placeholder="+91-1234567890"
//                   />
//                   {errors.phone && (
//                     <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label
//                     htmlFor="message"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Message <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows={5}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors resize-vertical ${
//                       errors.message ? "border-red-500" : "border-gray-300"
//                     }`}
//                     placeholder="Leave us a message..."
//                   />
//                   {errors.message && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="w-full text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
//                   style={{
//                     backgroundColor: "#0F437B",
//                     "--tw-ring-color": "#13773E",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.backgroundColor = "#13773E")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.backgroundColor = "#0F437B")
//                   }
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             {/* Right: Map */}
//             <div className="h-[600px] w-full">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7122.572800535024!2d75.86883381574005!3d26.799007873509908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc94baba6edad%3A0xd9cda1cfd0d224a!2sSevenUnique%20Tech%20Solutions%20Pvt.%20Ltd.%20%7C%20Web%20%26%20App%20Development.!5e0!3m2!1sen!2sin!4v1756112039067!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               ></iframe>
//             </div>
//           </div>
//         </div>

//         {/* Our Corporate Offices section */}
//         <div className="mb-16 mt-10">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
//             Our Corporate Offices
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {/* Contact Support */}
//             <div className="text-center">
//               <div
//                 className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
//                 style={{ backgroundColor: "#13773E" }}
//               >
//                 <MessageCircle className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Contact support
//               </h3>
//               <p className="text-gray-600 mb-4">Speak to our friendly team.</p>
//               <a
//                 href="mailto:info@7unique.in"
//                 className="text-gray-900 font-medium hover:underline"
//               >
//                 info@7unique.in
//               </a>
//             </div>

//             {/* Visit Us */}
//             <div className="text-center">
//               <div
//                 className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
//                 style={{ backgroundColor: "#0F437B" }}
//               >
//                 <MapPin className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Visit us
//               </h3>
//               <p className="text-gray-600 mb-4">Visit our office HQ.</p>
//               <div className="text-gray-900">
//                 <p className="font-medium">
//                   Plot No 97, Dakshinpuri - I, Shrikishan
//                 </p>
//                 <p>Sanganer, Jagatpura, Jaipur Rajasthan,</p>
//                 <p>India, 302017</p>
//               </div>
//             </div>

//             {/* Call Us */}
//             <div className="text-center">
//               <div
//                 className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
//                 style={{ backgroundColor: "#13773E" }}
//               >
//                 <Phone className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Call us
//               </h3>
//               <p className="text-gray-600 mb-4">Mon-Sat from 9am to 6pm.</p>
//               <a
//                 href="tel:0141-4511098"
//                 className="text-gray-900 font-medium hover:underline"
//               >
//                 0141-4511098
//               </a>
//             </div>
//           </div>
//         </div>
//         {/* Support Text */}
//         <div className="text-center mt-12">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Need Help? We are Just a Message Away!
//           </h2>
//           <p className="text-gray-600">
//             Drop us a message and we will get back to you.
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { MessageCircle, MapPin, Phone } from "lucide-react";
import axiosInstance from "../axios/axiosInstance";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only letters.";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only letters.";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSuccessMessage("");
  //   setErrorMessage("");

  //   if (validate()) {
  //     try {
  //       setLoading(true);
  //       const res = await fetch("http://localhost:5000/api/contacts", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       const data = await res.json();

  //       if (res.ok) {
  //         setSuccessMessage("Your message has been sent successfully!");
  //         setFormData({
  //           firstName: "",
  //           lastName: "",
  //           email: "",
  //           phone: "",
  //           message: "",
  //         });
  //       } else {
  //         setErrorMessage(data?.message || "Something went wrong. Please try again.");
  //       }
  //     } catch (error) {
  //       setErrorMessage("Failed to send message. Server error.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");
  setErrorMessage("");

  if (validate()) {
    try {
      setLoading(true);

      const res = await axiosInstance.post("/contacts", formData);

      if (res.data) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="text-white py-20"
        style={{ background: "linear-gradient(to right, #0F437B, #13773E)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our friendly team would love to hear from you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  {/* Last name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+91-1234567890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors resize-vertical ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Leave us a message..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Success / Error Messages */}
                {successMessage && (
                  <p className="text-green-600 text-sm">{successMessage}</p>
                )}
                {errorMessage && (
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
                  style={{
                    backgroundColor: "#0F437B",
                    "--tw-ring-color": "#13773E",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#13773E")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0F437B")
                  }
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right: Map */}
            <div className="h-[600px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7122.572800535024!2d75.86883381574005!3d26.799007873509908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc94baba6edad%3A0xd9cda1cfd0d224a!2sSevenUnique%20Tech%20Solutions%20Pvt.%20Ltd.%20%7C%20Web%20%26%20App%20Development.!5e0!3m2!1sen!2sin!4v1756112039067!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mb-16 mt-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Corporate Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#13773E" }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Contact support
              </h3>
              <p className="text-gray-600 mb-4">Speak to our friendly team.</p>
              <a
                href="mailto:info@7unique.in"
                className="text-gray-900 font-medium hover:underline"
              >
                info@7unique.in
              </a>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#0F437B" }}
              >
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Visit us
              </h3>
              <p className="text-gray-600 mb-4">Visit our office HQ.</p>
              <div className="text-gray-900">
                <p className="font-medium">
                  Plot No 97, Dakshinpuri - I, Shrikishan
                </p>
                <p>Sanganer, Jagatpura, Jaipur Rajasthan,</p>
                <p>India, 302017</p>
              </div>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#13773E" }}
              >
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Call us
              </h3>
              <p className="text-gray-600 mb-4">Mon-Sat from 9am to 6pm.</p>
              <a
                href="tel:0141-4511098"
                className="text-gray-900 font-medium hover:underline"
              >
                0141-4511098
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Need Help? We are Just a Message Away!
          </h2>
          <p className="text-gray-600">
            Drop us a message and we will get back to you.
          </p>
        </div>
      </main>
    </div>
  );
}
