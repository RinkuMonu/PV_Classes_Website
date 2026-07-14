import React from "react";

/**
 * FeedbackBadges
 * Renders two floating badges in the top-right corner of the viewport:
 *  • Posture badge
 *  • Eye Contact badge
 *
 * Props:
 *  posture    – { status: string, score: number }
 *  eyeContact – { status: string, score: number }
 */

const STATUS_CONFIG = {
    posture: {
        good: { icon: "✓", label: "Posture: Good", color: "#00d26a", bg: "#e6fff3", border: "#b3f5d6" },
        slouching: { icon: "⚠", label: "Seedhe baithiye", color: "#e6a817", bg: "#fff8e6", border: "#fde68a" },
        shoulder_tilt: { icon: "⚠", label: "Kandhe seedhe karein", color: "#e6a817", bg: "#fff8e6", border: "#fde68a" },
        head_forward: { icon: "⚠", label: "Sar peeche karein", color: "#e6a817", bg: "#fff8e6", border: "#fde68a" },
        no_detection: { icon: "…", label: "Posture: Detecting", color: "#8c8c8c", bg: "#f5f5f5", border: "#e0e0e0" },
    },
    eye: {
        good: { icon: "✓", label: "Eye Contact: Good", color: "#00d26a", bg: "#e6fff3", border: "#b3f5d6" },
        looking_away: { icon: "⚠", label: "Camera dekhein", color: "#e05b4b", bg: "#fff1f0", border: "#ffc9c5" },
        no_detection: { icon: "…", label: "Eye Contact: Detecting", color: "#8c8c8c", bg: "#f5f5f5", border: "#e0e0e0" },
    },
};

function Badge({ icon, label, color, bg, border, score }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: bg,
            border: `1.5px solid ${border}`,
            borderRadius: 10,
            padding: "8px 14px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            minWidth: 190,
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.3s ease",
        }}>
            <span style={{
                fontSize: 16,
                color,
                fontWeight: "bold",
                lineHeight: 1,
            }}>
                {icon}
            </span>
            <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1a1a1a",
                flex: 1,
            }}>
                {label}
            </span>
            {score !== undefined && score > 0 && (
                <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color,
                    backgroundColor: `${color}22`,
                    borderRadius: 6,
                    padding: "2px 7px",
                }}>
                    {score}%
                </span>
            )}
        </div>
    );
}

export function FeedbackBadges({ posture, eyeContact, visible }) {
    if (!visible) return null;

    const postureStatus = posture?.status || "no_detection";
    const eyeStatus = eyeContact?.status || "no_detection";

    const postureConf = STATUS_CONFIG.posture[postureStatus] || STATUS_CONFIG.posture.no_detection;
    const eyeConf = STATUS_CONFIG.eye[eyeStatus] || STATUS_CONFIG.eye.no_detection;

    return (
        <div style={{
            position: "fixed",
            top: 90,
            right: 20,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            pointerEvents: "none",
        }}>
            <Badge
                icon={postureConf.icon}
                label={postureConf.label}
                color={postureConf.color}
                bg={postureConf.bg}
                border={postureConf.border}
                score={posture?.score}
            />
            <Badge
                icon={eyeConf.icon}
                label={eyeConf.label}
                color={eyeConf.color}
                bg={eyeConf.bg}
                border={eyeConf.border}
                score={eyeContact?.score}
            />
        </div>
    );
}
