import React, { useState } from 'react';

export default function CandidateDetailsStep({ sessionData, onNext, onBack }) {
  const { config, candidate } = sessionData;
  
  const [formData, setFormData] = useState({
    name: candidate.name || '',
    email: candidate.email || '',
    mobile: candidate.mobile || '',
    rollNumber: candidate.rollNumber || ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleContinue = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile Number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onNext({ candidate: formData });
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#00316B] px-8 py-6 text-white flex items-center gap-4">
        <span className="text-3xl">👤</span>
        <div>
          <h2 className="text-2xl font-bold">Candidate Details</h2>
          <p className="text-blue-200 text-sm mt-1">Please verify your information before proceeding.</p>
        </div>
      </div>
      
      <div className="p-8">
        
        {/* Read Only Config Details */}
        <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 mb-8">
          <h3 className="text-xs font-bold text-[#009FE3] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span>📋</span> Interview Configuration
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Target Exam</span>
              <span className="font-bold text-gray-800">{config.exam}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Subject</span>
              <span className="font-bold text-gray-800">{config.subject}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</span>
              <span className="font-bold text-gray-800">{config.duration}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Mode</span>
              <span className="font-bold text-gray-800">{config.mode}</span>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange}
              className={`w-full p-3.5 bg-gray-50 border rounded-xl outline-none transition-colors ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#009FE3] focus:bg-white'}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              className={`w-full p-3.5 bg-gray-50 border rounded-xl outline-none transition-colors ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#009FE3] focus:bg-white'}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number <span className="text-red-500">*</span></label>
            <input 
              type="tel" name="mobile" value={formData.mobile} onChange={handleChange}
              className={`w-full p-3.5 bg-gray-50 border rounded-xl outline-none transition-colors ${errors.mobile ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#009FE3] focus:bg-white'}`}
              placeholder="Enter mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
              <span>Roll Number</span>
              <span className="text-gray-400 font-medium text-xs">(Optional)</span>
            </label>
            <input 
              type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-colors focus:border-[#009FE3] focus:bg-white"
              placeholder="Enter exam roll number"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <button 
            onClick={onBack}
            className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            ← Cancel Setup
          </button>
          
          <button 
            onClick={handleContinue}
            className="px-8 py-3 bg-[#009FE3] hover:bg-blue-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
          >
            Save & Continue <span>→</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}
