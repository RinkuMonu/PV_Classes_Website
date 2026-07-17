import React, { useRef, useEffect, useState } from "react";

/**
 * CameraPreview
 * Small floating camera feed in the bottom-right corner.
 * Shows a live mirror of the user's webcam with a subtle border glow
 * that changes colour based on the current posture / eye-contact status.
 *
 * Props:
 *  videoStream  – MediaStream | null
 *  posture      – { status, score }
 *  eyeContact   – { status, score }
 *  visible      – boolean
 */
export function CameraPreview({ videoStream, posture, eyeContact, visible }) {
    const videoRef = useRef(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (videoRef.current && videoStream) {
            videoRef.current.srcObject = videoStream;
        }
    }, [videoStream]);

    if (!visible || !videoStream) return null;

    // Determine border glow colour from status
    const hasIssue =
        (posture?.status && posture.status !== "good" && posture.status !== "no_detection") ||
        (eyeContact?.status && eyeContact.status !== "good" && eyeContact.status !== "no_detection");

    const isDetecting =
        (!posture || posture.status === "no_detection") &&
        (!eyeContact || eyeContact.status === "no_detection");

    const glowColor = isDetecting ? "#8c8c8c" : hasIssue ? "#e6a817" : "#00d26a";

    const previewSize = expanded ? { width: 260, height: 195 } : { width: 160, height: 120 };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 9998,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: `0 0 0 3px ${glowColor}, 0 4px 20px rgba(0,0,0,0.35)`,
                cursor: "pointer",
                transition: "all 0.3s ease",
                ...previewSize,
            }}
            onClick={() => setExpanded((e) => !e)}
            title={expanded ? "Click to minimise" : "Click to expand"}
        >
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scaleX(-1)", // mirror effect
                    display: "block",
                }}
            />

            {/* Label strip */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
                padding: "6px 8px 5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <span style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                }}>
                    📷 You
                </span>
                <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: glowColor,
                    display: "inline-block",
                    boxShadow: `0 0 4px ${glowColor}`,
                }} />
            </div>
        </div>
    );
}
