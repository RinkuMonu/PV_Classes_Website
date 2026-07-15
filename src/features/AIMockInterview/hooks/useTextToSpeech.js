import { useState, useCallback, useEffect } from 'react';
import { ttsService } from '../services/ttsService';
import { getInterviewerScript } from '../utils/interviewerScript';
import { LANGUAGE_MODE } from '../constants/interviewConstants';

export const useTextToSpeech = (voiceLanguage) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getLangCode = useCallback(() => {
    // If bilingual mode, default to Hindi-Indian accent (since both texts will be spoken)
    if (voiceLanguage === 'Both' || voiceLanguage === LANGUAGE_MODE.BOTH) {
      return 'hi-IN'; // Use Hindi voice for better pronunciation of mixed text
    }
    return voiceLanguage === LANGUAGE_MODE.HINDI ? 'hi-IN' : 'en-IN';
  }, [voiceLanguage]);

  const speakText = useCallback((text) => {
    console.log('🔊 TTS Starting:', text.substring(0, 50) + '...');
    return new Promise((resolve) => {
      setIsSpeaking(true);
      
      ttsService.speak(
        text, 
        getLangCode(), 
        () => {
          console.log('✅ TTS Completed');
          setIsSpeaking(false);
          resolve(true);
        },
        (event) => {
          const errReason = event.error || "Unknown Error";
          console.error('❌ TTS Error:', errReason, event);
          
          if (errReason === 'canceled' || errReason === 'interrupted') {
            setIsSpeaking(false);
            resolve(false);
            return;
          }

          console.error("TTS Error:", errReason, event);
          setIsSpeaking(false);
          resolve(false);
        },
        (event) => {
          // Word boundary event - keeps isSpeaking true during speech
          if (event.name === 'word') {
            setIsSpeaking(true);
          }
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
