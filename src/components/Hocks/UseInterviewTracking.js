import { useState, useRef, useCallback } from "react";

/**
 * useInterviewTracking
 *
 * Manages per-question posture & eye-contact score accumulation.
 *
 * Returns:
 *  posture            – latest posture result  { status, score }
 *  eyeContact         – latest eye-contact result { status, score }
 *  questionScores     – array of { questionIndex, avgPosture, avgEye, samples }
 *  overallPosture     – average posture score across ALL frames so far
 *  overallEye         – average eye-contact score across ALL frames so far
 *  handlePostureUpdate(data)    – call from PostureEyeTracker callback
 *  handleEyeContactUpdate(data) – call from PostureEyeTracker callback
 *  startQuestion(idx)  – call when a new question begins
 *  endQuestion(idx)    – call when a question ends (or before next starts)
 */
export function useInterviewTracking() {
    const [posture, setPosture] = useState({ status: "no_detection", score: 0 });
    const [eyeContact, setEyeContact] = useState({ status: "no_detection", score: 0 });
    const [communication, setCommunication] = useState({ status: "good", score: 85 }); // Mocked for POC
    const [questionScores, setQuestionScores] = useState([]);

    // Running accumulators for current question
    const currentQuestion = useRef(-1);
    const postureAcc = useRef({ sum: 0, count: 0 });
    const eyeAcc = useRef({ sum: 0, count: 0 });

    // Overall accumulators
    const overallPostureAcc = useRef({ sum: 0, count: 0 });
    const overallEyeAcc = useRef({ sum: 0, count: 0 });
    const overallCommAcc = useRef({ sum: 0, count: 0 });

    const [overallPosture, setOverallPosture] = useState(0);
    const [overallEye, setOverallEye] = useState(0);
    const [overallCommunication, setOverallCommunication] = useState(85);

    // Called every frame by PostureEyeTracker
    const handlePostureUpdate = useCallback((data) => {
        if (!data || data.status === "no_detection") return;
        setPosture(data);

        // Accumulate for current question
        if (data.score > 0) {
            postureAcc.current.sum += data.score;
            postureAcc.current.count += 1;

            overallPostureAcc.current.sum += data.score;
            overallPostureAcc.current.count += 1;
            setOverallPosture(
                Math.round(overallPostureAcc.current.sum / overallPostureAcc.current.count)
            );
        }
    }, []);

    const handleEyeContactUpdate = useCallback((data) => {
        if (!data || data.status === "no_detection") return;
        setEyeContact(data);

        if (data.score > 0) {
            eyeAcc.current.sum += data.score;
            eyeAcc.current.count += 1;

            overallEyeAcc.current.sum += data.score;
            overallEyeAcc.current.count += 1;
            setOverallEye(
                Math.round(overallEyeAcc.current.sum / overallEyeAcc.current.count)
            );
        }
    }, []);

    /**
     * Call this when a new question begins.
     * Saves the previous question's scores first (if any).
     */
    const startQuestion = useCallback((idx) => {
        // Save outgoing question first
        const prevIdx = currentQuestion.current;
        if (prevIdx >= 0 && (postureAcc.current.count > 0 || eyeAcc.current.count > 0)) {
            const avgPosture = postureAcc.current.count > 0
                ? Math.round(postureAcc.current.sum / postureAcc.current.count) : 0;
            const avgEye = eyeAcc.current.count > 0
                ? Math.round(eyeAcc.current.sum / eyeAcc.current.count) : 0;
            const avgComm = Math.floor(Math.random() * (95 - 75 + 1)) + 75; // Simulated communication score

            setQuestionScores((prev) => {
                // Replace if entry already exists for prevIdx
                const filtered = prev.filter((s) => s.questionIndex !== prevIdx);
                return [
                    ...filtered,
                    {
                        questionIndex: prevIdx,
                        avgPosture,
                        avgEye,
                        avgComm,
                        samples: postureAcc.current.count,
                    },
                ];
            });
            
            // Update overall communication
            overallCommAcc.current.sum += avgComm;
            overallCommAcc.current.count += 1;
            setOverallCommunication(Math.round(overallCommAcc.current.sum / overallCommAcc.current.count));
        }

        // Reset accumulators for new question
        currentQuestion.current = idx;
        postureAcc.current = { sum: 0, count: 0 };
        eyeAcc.current = { sum: 0, count: 0 };
    }, []);

    /**
     * Call this when the interview finishes.
     * Finalises the last question's scores.
     */
    const endQuestion = useCallback(() => {
        const idx = currentQuestion.current;
        if (idx < 0) return;

        const avgPosture = postureAcc.current.count > 0
            ? Math.round(postureAcc.current.sum / postureAcc.current.count) : 0;
        const avgEye = eyeAcc.current.count > 0
            ? Math.round(eyeAcc.current.sum / eyeAcc.current.count) : 0;
        const avgComm = Math.floor(Math.random() * (95 - 75 + 1)) + 75;

        if (postureAcc.current.count > 0 || eyeAcc.current.count > 0) {
            setQuestionScores((prev) => {
                const filtered = prev.filter((s) => s.questionIndex !== idx);
                return [
                    ...filtered,
                    {
                        questionIndex: idx,
                        avgPosture,
                        avgEye,
                        avgComm,
                        samples: postureAcc.current.count,
                    },
                ];
            });
            
            overallCommAcc.current.sum += avgComm;
            overallCommAcc.current.count += 1;
            setOverallCommunication(Math.round(overallCommAcc.current.sum / overallCommAcc.current.count));
        }

        currentQuestion.current = -1;
    }, []);

    return {
        posture,
        eyeContact,
        communication,
        questionScores,
        overallPosture,
        overallEye,
        overallCommunication,
        handlePostureUpdate,
        handleEyeContactUpdate,
        startQuestion,
        endQuestion,
    };
}
