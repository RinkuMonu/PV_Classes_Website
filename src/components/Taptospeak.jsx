"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

export default function TapToSpeakCTA() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const techRoles = [
    "Software Engineer",
    "App Development",
    "SEO Specialist",
    "Testing/QA",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
  ];

  const handleStartInterview = () => {
    if (selectedRole) {
      router.push(`/mock-interview?role=${encodeURIComponent(selectedRole)}&autostart=true`);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready for Your AI Mock Interview?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Practice with our AI interviewer - MCQ based technical questions
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="group relative px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl"
          >
            <Mic className="w-6 h-6 group-hover:animate-pulse" />
            Tap to Speak - Start Interview
          </button>
        </div>
      </section>

      {/* Role Selection Modal */}
      {showModal && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 20,
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              background: "#1b1e27",
              borderRadius: 16,
              padding: 32,
              maxWidth: 500,
              width: "100%",
              border: "1px solid #333747",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              color: "#e9e7e1", 
              marginBottom: 20,
              textAlign: "center"
            }}>
              Select Your Tech Role
            </h3>
            
            <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
              {techRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  style={{
                    padding: "12px 16px",
                    background: selectedRole === role ? "#b8925a" : "#242835",
                    color: selectedRole === role ? "#1a1408" : "#e9e7e1",
                    border: `1px solid ${selectedRole === role ? "#d4ac78" : "#333747"}`,
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: selectedRole === role ? 600 : 400,
                    cursor: "pointer",
                    transition: "all .2s",
                    textAlign: "left",
                  }}
                >
                  {role}
                </button>
              ))}
            </div>

            <button
              onClick={handleStartInterview}
              disabled={!selectedRole}
              style={{
                width: "100%",
                padding: "14px",
                background: selectedRole ? "#4a8b8f" : "#333747",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: selectedRole ? "pointer" : "not-allowed",
                opacity: selectedRole ? 1 : 0.5,
              }}
            >
              Start Interview
            </button>
          </div>
        </div>
      )}
    </>
  );
}
