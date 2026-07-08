'use client';

import { useState, useRef, useEffect } from 'react';

// PV Classes - AI Mock Interview component
// Usage: import MockInterview from '@/components/MockInterview'
// Then render: <MockInterview questions={[...]} />
// If no `questions` prop is passed, default questions below are used.

const DEFAULT_QUESTIONS = [
  'Apne baare mein bataiye.',
  'Aap teacher kyun banna chahte hain?',
  'Ek mushkil classroom situation handle karne ka tareeqa bataiye.',
  'Aapki sabse badi strength kya hai?',
  'Aap students ko motivate kaise karte hain?',
];

const QUESTION_TIME_SECONDS = 30;

export default function MockInterview({ questions = DEFAULT_QUESTIONS, onComplete }) {
  const [stage, setStage] = useState('setup'); // setup | running | finished
  const [error, setError] = useState('');
  const [qIndex, setQIndex] = useState(0);
  const [status, setStatus] = useState('');
  const [transcript, setTranscript] = useState('');
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SECONDS);
  const [canProceed, setCanProceed] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const answersRef = useRef([]); // stores {question, answer} for each question

  // Cleanup camera + timer + recognition on unmount
  useEffect(() => {
    return () => {
      stopEverything();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attach the camera stream to the <video> tag only once it's mounted
  // (it only renders when stage === 'running', so attaching earlier fails silently)
  useEffect(() => {
    if (stage === 'running' && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [stage]);

  function stopEverything() {
    clearInterval(timerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
  }

  async function startInterview() {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      setStage('running');
      loadQuestion(0);
    } catch (err) {
      setError(
        'Camera/mic access nahi mila. Browser settings mein permission allow karein: ' +
          err.message
      );
    }
  }

  function loadQuestion(index) {
    setTranscript('');
    setCanProceed(false);
    setQIndex(index);
    speakQuestion(questions[index]);
  }

  function speakQuestion(text) {
    setStatus('AI bol raha hai...');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.onend = () => startListening();
      window.speechSynthesis.speak(utterance);
    } else {
      startListening();
    }
  }

  function startListening() {
    setStatus('Aapka jawab sun raha hai...');
    startTimer();

    const SpeechRecognitionAPI =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognitionAPI) {
      setTranscript(
        '(Is browser mein speech-to-text support nahi hai, lekin recording chal rahi hai)'
      );
      setCanProceed(true);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'hi-IN';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript + ' ';
      }
      setTranscript(text);
      setCanProceed(true);
    };

    recognition.onerror = () => setCanProceed(true);

    try {
      recognition.start();
    } catch (e) {}

    recognitionRef.current = recognition;
  }

  function startTimer() {
    let t = QUESTION_TIME_SECONDS;
    setTimeLeft(t);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      t -= 1;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(timerRef.current);
        setStatus('Time up');
        setCanProceed(true);
      }
    }, 1000);
  }

  function handleNext() {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    clearInterval(timerRef.current);

    answersRef.current.push({
      question: questions[qIndex],
      answer: transcript,
    });

    const next = qIndex + 1;
    if (next >= questions.length) {
      stopEverything();
      setStage('finished');
      setStatus('Interview complete');
      if (onComplete) onComplete(answersRef.current);
      return;
    }
    loadQuestion(next);
  }

  const mm = String(Math.floor(Math.max(timeLeft, 0) / 60)).padStart(2, '0');
  const ss = String(Math.max(timeLeft, 0) % 60).padStart(2, '0');

  return (
    <div style={styles.wrapper}>
      {stage === 'setup' && (
        <div style={styles.setupCard}>
          <p style={styles.setupTitle}>Mock interview practice</p>
          <p style={styles.setupSubtitle}>
            Camera aur mic access dena hoga. AI aapse questions bolke puchega.
          </p>
          <button style={styles.primaryBtn} onClick={startInterview}>
            Start interview
          </button>
          {error && <p style={styles.errorText}>{error}</p>}
        </div>
      )}

      {stage === 'running' && (
        <div>
          <div style={styles.videoBox}>
            <video ref={videoRef} autoPlay playsInline muted style={styles.video} />
            <div style={styles.recBadge}>Recording</div>
            <div style={styles.timerBadge}>
              {mm}:{ss}
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <span style={styles.panelMuted}>
                Question {qIndex + 1}/{questions.length}
              </span>
              <span style={styles.statusTag}>{status}</span>
            </div>
            <p style={styles.questionText}>{questions[qIndex]}</p>
            <div style={styles.transcriptBox}>
              <p style={styles.transcriptLabel}>Aapka jawab (live transcript)</p>
              <p style={styles.transcriptText}>{transcript || '-'}</p>
            </div>
            <button
              style={{
                ...styles.primaryBtn,
                marginTop: 12,
                opacity: canProceed ? 1 : 0.5,
                cursor: canProceed ? 'pointer' : 'not-allowed',
              }}
              disabled={!canProceed}
              onClick={handleNext}
            >
              {qIndex + 1 >= questions.length ? 'Finish interview' : 'Next question'}
            </button>
          </div>
        </div>
      )}

      {stage === 'finished' && (
        <div style={styles.setupCard}>
          <p style={styles.setupTitle}>Interview complete</p>
          <p style={styles.setupSubtitle}>
            Aapke {questions.length} jawab record ho gaye hain. Shukriya.
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { maxWidth: 680, margin: '0 auto', fontFamily: 'inherit' },
  setupCard: {
    background: '#f5f7f9',
    borderRadius: 12,
    padding: '2rem 1.5rem',
    textAlign: 'center',
  },
  setupTitle: { fontWeight: 600, fontSize: 18, margin: '0 0 6px', color: '#0f2540' },
  setupSubtitle: { fontSize: 14, color: '#5a6b7d', margin: '0 0 20px' },
  errorText: { fontSize: 13, color: '#c0392b', marginTop: 12 },
  primaryBtn: {
    background: '#12386b',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  videoBox: {
    position: 'relative',
    background: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: '16/9',
    marginBottom: 12,
  },
  video: { width: '100%', height: '100%', objectFit: 'cover' },
  recBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    background: 'rgba(192,57,43,0.9)',
    color: '#fff',
    fontSize: 11,
    padding: '2px 8px',
    borderRadius: 6,
  },
  timerBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    fontSize: 12,
    padding: '2px 8px',
    borderRadius: 6,
  },
  panel: { background: '#f5f7f9', borderRadius: 12, padding: '1rem 1.25rem' },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  panelMuted: { fontSize: 13, color: '#5a6b7d' },
  statusTag: { fontSize: 12, color: '#12386b', fontWeight: 500 },
  questionText: { fontSize: 15, fontWeight: 600, margin: '0 0 12px', color: '#0f2540' },
  transcriptBox: { borderTop: '1px solid #dde3e9', paddingTop: 10 },
  transcriptLabel: { fontSize: 12, color: '#8592a0', margin: '0 0 4px' },
  transcriptText: { fontSize: 14, minHeight: 40, margin: 0, color: '#1a1a1a' },
};