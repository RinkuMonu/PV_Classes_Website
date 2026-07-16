/**
 * useTextToSpeechV2.js
 *
 * Drop-in replacement for useTextToSpeech.
 * - Uses interviewerScriptV2 (no bilingual, math normalized)
 * - Supports only 'Hindi' and 'English' voice languages
 * - Passes the correct lang code to ttsService so the right voice is selected
 */

import { useState, useCallback, useEffect } from 'react';
import { ttsServiceV2 } from '../services/ttsServiceV2';
import { getInterviewerScriptV2, getLangCode } from '../utils/interviewerScriptV2';

export const useTextToSpeechV2 = (voiceLanguage) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Derive the browser lang code from the voiceLanguage setting
  const langCode = getLangCode(voiceLanguage);

  const speakText = useCallback((text) => {
    console.log('🔊 [V2] TTS Starting:', text.substring(0, 60) + '...');
    return new Promise((resolve) => {
      ttsServiceV2.speak(
        text,
        voiceLanguage, // "Hindi" or "English" for Piper
        () => {
          // onStart
          setIsSpeaking(true);
        },
        () => {
          console.log('✅ [V2] TTS Completed');
          setIsSpeaking(false);
          resolve(true);
        },
        (event) => {
          const errReason = event?.error || event?.message || 'Unknown Error';
          if (errReason === 'canceled' || errReason === 'interrupted') {
            setIsSpeaking(false);
            resolve(false);
            return;
          }

          console.error('❌ [V2] TTS Error:', errReason, event);

          setIsSpeaking(false);
          resolve(false);
        },
        (event) => {
          if (event && event.name === 'word') {
            setIsSpeaking(true);
          }
        }
      );
    });
  }, [voiceLanguage]);

  /**
   * Speak a named interview phase.
   * Numbers and math symbols in question/explanation text are fully
   * normalized to words in the chosen language before being spoken.
   */
  const speakScriptPhase = useCallback(async (phase, data) => {
    const text = getInterviewerScriptV2(phase, data, voiceLanguage);
    if (!text) return;
    await speakText(text);
  }, [speakText, voiceLanguage]);

  const cancelSpeech = useCallback(() => {
    ttsServiceV2.cancel();
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelSpeech();
  }, [cancelSpeech]);

  return { isSpeaking, speakText, speakScriptPhase, cancelSpeech };
};
