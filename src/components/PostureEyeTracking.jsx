import { useEffect, useRef, useCallback } from "react";
import { PoseLandmarker, FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

/**
 * PostureEyeTracker
 * - Accepts a live MediaStream (videoStream prop)
 * - Runs PoseLandmarker + FaceLandmarker on every animation frame
 * - Calls onPostureUpdate({ status, score }) and onEyeContactUpdate({ status, score })
 * - Completely invisible – no DOM element is rendered into the visible layout
 */
export function PostureEyeTracker({ videoStream, onPostureUpdate, onEyeContactUpdate, active }) {
    const videoRef = useRef(null);
    const poseLandmarkerRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    const rafRef = useRef(null);
    const lastVideoTimeRef = useRef(-1);
    const mountedRef = useRef(true);

    // ── Initialize MediaPipe models ────────────────────────────────────────────
    useEffect(() => {
        mountedRef.current = true;
        
        // Suppress MediaPipe INFO logs that Emscripten routes to console.error
        const originalConsoleError = console.error;
        console.error = (...args) => {
            if (args[0] && typeof args[0] === 'string' && args[0].includes('TensorFlow Lite XNNPACK delegate')) {
                return;
            }
            originalConsoleError(...args);
        };

        async function initModels() {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
                );

                const [pose, face] = await Promise.all([
                    PoseLandmarker.createFromOptions(vision, {
                        baseOptions: {
                            modelAssetPath:
                                "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
                            delegate: "GPU",
                        },
                        runningMode: "VIDEO",
                        numPoses: 1,
                    }),
                    FaceLandmarker.createFromOptions(vision, {
                        baseOptions: {
                            modelAssetPath:
                                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                            delegate: "GPU",
                        },
                        runningMode: "VIDEO",
                        numFaces: 1,
                        outputFaceBlendshapes: false,
                        outputFacialTransformationMatrixes: true,
                    }),
                ]);

                if (!mountedRef.current) {
                    pose.close();
                    face.close();
                    return;
                }

                poseLandmarkerRef.current = pose;
                faceLandmarkerRef.current = face;
            } catch (err) {
                originalConsoleError("[PostureEyeTracker] Model init error:", err);
            }
        }

        initModels();

        return () => {
            mountedRef.current = false;
            console.error = originalConsoleError;
            cancelAnimationFrame(rafRef.current);
            poseLandmarkerRef.current?.close();
            faceLandmarkerRef.current?.close();
        };
    }, []);

    // ── Attach stream to hidden video element ─────────────────────────────────
    useEffect(() => {
        if (videoRef.current && videoStream) {
            videoRef.current.srcObject = videoStream;
        }
    }, [videoStream]);

    // ── Analysis helpers ──────────────────────────────────────────────────────

    /**
     * Posture analysis using pose landmarks.
     * Checks:
     *  1. Shoulder level difference (one shoulder significantly lower)
     *  2. Shoulder-to-hip vertical offset vs expected (slouching)
     *  3. Nose forward relative to shoulders (head-forward posture)
     */
    const analyzePosture = useCallback((landmarks) => {
        if (!landmarks || landmarks.length === 0) {
            return { status: "no_detection", score: 0 };
        }

        const lm = landmarks[0];

        // Key landmark indices (MediaPipe Pose)
        const leftShoulder = lm[11];
        const rightShoulder = lm[12];
        const leftHip = lm[23];
        const rightHip = lm[24];
        const nose = lm[0];

        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || !nose) {
            return { status: "no_detection", score: 0 };
        }

        let issues = [];
        let score = 100;

        // 1. Shoulder tilt — y coords in normalised space (0=top, 1=bottom)
        const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
        if (shoulderDiff > 0.05) {
            issues.push("shoulder_tilt");
            score -= 30;
        }

        // 2. Slouch — mid-shoulder y vs mid-hip y; in a straight posture the
        //    vertical gap should be reasonably large. If too small → slouching.
        const midShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
        const midHipY = (leftHip.y + rightHip.y) / 2;
        const torsoHeight = midHipY - midShoulderY;
        if (torsoHeight < 0.15) {
            issues.push("slouching");
            score -= 35;
        }

        // 3. Head-forward — nose z vs shoulder z (visibility-weighted)
        //    MediaPipe provides z as depth; more-negative = closer to camera.
        const midShoulderZ = (leftShoulder.z + rightShoulder.z) / 2;
        if (nose.z < midShoulderZ - 0.12) {
            issues.push("head_forward");
            score -= 25;
        }

        score = Math.max(0, score);

        if (issues.length === 0) return { status: "good", score };
        if (issues.includes("slouching")) return { status: "slouching", score };
        if (issues.includes("head_forward")) return { status: "head_forward", score };
        return { status: "shoulder_tilt", score };
    }, []);

    /**
     * Eye-contact analysis using facial transformation matrix (yaw / pitch).
     * The matrix columns give us the rotation; we extract yaw and pitch.
     */
    const analyzeEyeContact = useCallback((transformationMatrixes) => {
        if (!transformationMatrixes || transformationMatrixes.length === 0) {
            return { status: "no_detection", score: 0 };
        }

        // 4×4 column-major matrix from MediaPipe
        const m = transformationMatrixes[0].data;
        if (!m || m.length < 16) return { status: "no_detection", score: 0 };

        // Extract yaw (rotation around Y) and pitch (rotation around X)
        // from the rotation sub-matrix (top-left 3×3 of column-major 4×4).
        const yaw = Math.atan2(m[8], m[10]) * (180 / Math.PI);   // left/right
        const pitch = Math.atan2(-m[9], Math.sqrt(m[1] * m[1] + m[5] * m[5])) * (180 / Math.PI); // up/down

        let score = 100;
        let looking_away = false;

        if (Math.abs(yaw) > 20) {
            score -= 40;
            looking_away = true;
        } else if (Math.abs(yaw) > 12) {
            score -= 20;
        }

        if (Math.abs(pitch) > 15) {
            score -= 30;
            looking_away = true;
        } else if (Math.abs(pitch) > 8) {
            score -= 15;
        }

        score = Math.max(0, score);

        return {
            status: looking_away ? "looking_away" : "good",
            score,
            yaw,
            pitch,
        };
    }, []);

    // ── Main detection loop ───────────────────────────────────────────────────
    useEffect(() => {
        if (!active) {
            cancelAnimationFrame(rafRef.current);
            return;
        }

        const video = videoRef.current;
        if (!video) return;

        let running = true;

        function detect() {
            if (!running) return;

            if (
                video.readyState >= 2 &&
                video.currentTime !== lastVideoTimeRef.current &&
                poseLandmarkerRef.current &&
                faceLandmarkerRef.current
            ) {
                lastVideoTimeRef.current = video.currentTime;
                const timestamp = performance.now();

                try {
                    const poseResult = poseLandmarkerRef.current.detectForVideo(video, timestamp);
                    const faceResult = faceLandmarkerRef.current.detectForVideo(video, timestamp);

                    const postureData = analyzePosture(poseResult.landmarks);
                    const eyeContactData = analyzeEyeContact(faceResult.facialTransformationMatrixes);

                    onPostureUpdate?.(postureData);
                    onEyeContactUpdate?.(eyeContactData);
                } catch (e) {
                    // Silently skip frames that error (e.g. model not ready yet)
                }
            }

            rafRef.current = requestAnimationFrame(detect);
        }

        rafRef.current = requestAnimationFrame(detect);

        return () => {
            running = false;
            cancelAnimationFrame(rafRef.current);
        };
    }, [active, analyzePosture, analyzeEyeContact, onPostureUpdate, onEyeContactUpdate]);

    // Hidden video element — off-screen, never visible to the user
    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
                position: "absolute",
                width: 1,
                height: 1,
                opacity: 0,
                pointerEvents: "none",
                top: -9999,
                left: -9999,
            }}
        />
    );
}
