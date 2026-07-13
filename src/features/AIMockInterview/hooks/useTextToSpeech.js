import { useState, useCallback, useEffect } from 'react';
import { ttsService } from '../services/ttsService';
import { getInterviewerScript } from '../utils/interviewerScript';
import { LANGUAGE_MODE } from '../constants/interviewConstants';

export const useTextToSpeech = (voiceLanguage) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getLangCode = useCallback(() => {
    return voiceLanguage === LANGUAGE_MODE.HINDI ? 'hi-IN' : 'en-IN';
  }, [voiceLanguage]);

  const speakText = useCallback((text) => {
    return new Promise((resolve) => {
      setIsSpeaking(true);
      ttsService.speak(
        text, 
        getLangCode(), 
        () => {
          setIsSpeaking(false);
          resolve(true);
        },
        (event) => {
          // event is a SpeechSynthesisErrorEvent
          const errReason = event.error || "Unknown Error";
          
          if (errReason === 'canceled' || errReason === 'interrupted') {
            // This happens when ttsService.cancel() is called, completely normal.
            setIsSpeaking(false);
            resolve(false);
            return;
          }

          console.error("TTS Error:", errReason, event);
          setIsSpeaking(false);
          resolve(false);
        }
      );
    });
  }, [getLangCode]);

  const speakScriptPhase = useCallback(async (phase, data) => {
    const text = getInterviewerScript(phase, data, voiceLanguage);
    await speakText(text);
  }, [speakText, voiceLanguage]);

  const cancelSpeech = useCallback(() => {
    ttsService.cancel();
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelSpeech();
  }, [cancelSpeech]);

  return { isSpeaking, speakText, speakScriptPhase, cancelSpeech };
};
