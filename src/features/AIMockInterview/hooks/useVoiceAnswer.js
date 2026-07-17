import { useState, useCallback, useEffect, useRef } from 'react';
import { sttService } from '../services/sttService';
import { parseVoiceAnswer } from '../utils/voiceAnswerParser';
import { LANGUAGE_MODE } from '../constants/interviewConstants';

export const useVoiceAnswer = (voiceLanguage, isPaused, optionsTextMap = null) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsedIntent, setParsedIntent] = useState(null); // { option: 'A', isLockCommand: true }
  const isPausedRef = useRef(isPaused);
  const shouldListenRef = useRef(false); // Track if user wants it on

  useEffect(() => {
    isPausedRef.current = isPaused;
    if (isPaused) {
      if (isListening) {
        sttService.stop();
        setIsListening(false);
      }
    } else {
      if (shouldListenRef.current && !isListening) {
        startListening();
      }
    }
  }, [isPaused, isListening]);

  const startListening = useCallback(() => {
    shouldListenRef.current = true;
    if (isPausedRef.current) return;
    
    setTranscript('');
    setParsedIntent(null);
    
    const langCode = voiceLanguage === LANGUAGE_MODE.HINDI ? 'hi-IN' : 'en-IN';
    
    const started = sttService.start(
      langCode,
      (res) => {
        const text = res.finalTranscript || res.interimTranscript;
        setTranscript(text);
        
        if (res.finalTranscript) {
          const intent = parseVoiceAnswer(res.finalTranscript, optionsTextMap);
          if (intent.option || intent.isLockCommand) {
             setParsedIntent(intent);
          }
        }
      },
      (err) => {
        console.error("STT Error:", err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (started) {
      setIsListening(true);
    }
  }, [voiceLanguage]);

  const stopListening = useCallback(() => {
    shouldListenRef.current = false;
    sttService.stop();
    setIsListening(false);
  }, []);

  const resetIntent = useCallback(() => {
    setParsedIntent(null);
    setTranscript('');
  }, []);

  useEffect(() => {
    return () => stopListening();
  }, [stopListening]);

  return { 
    isListening, 
    isSupported: sttService.isSupported,
    transcript, 
    parsedIntent, 
    startListening, 
    stopListening,
    resetIntent
  };
};
