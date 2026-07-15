/**
 * interviewerScriptV2.js
 *
 * Generates TTS-ready script text for each interview phase.
 * - Only supports Hindi and English (no Bilingual mode).
 * - All numbers and math symbols are normalized via mathTextNormalizer
 *   so the voice never mixes languages mid-sentence.
 */

import { LANGUAGE_MODE } from '../constants/interviewConstants';
import { normalizeMathText } from './mathTextNormalizer';

/**
 * Returns the TTS lang code for a given voiceLanguage string.
 * @param {string} languageMode
 * @returns {'hi-IN'|'en-IN'}
 */
export const getLangCode = (languageMode) => {
  return languageMode === LANGUAGE_MODE.HINDI ? 'hi-IN' : 'en-IN';
};

/**
 * Builds the speakable script for a given interview phase.
 *
 * @param {'WELCOME'|'QUESTION_INTRO'|'QUESTION_TEXT'|'LOCK_CONFIRMATION'|
 *         'CORRECT_FEEDBACK'|'INCORRECT_FEEDBACK'|'EXPLANATION'|
 *         'TIMEOUT'|'COMPLETED'} phase
 * @param {any}    data         - Phase-specific payload (question obj, option key, etc.)
 * @param {string} languageMode - LANGUAGE_MODE.HINDI or LANGUAGE_MODE.ENGLISH
 * @returns {string}
 */
export const getInterviewerScriptV2 = (phase, data, languageMode) => {
  const isHindi = languageMode === LANGUAGE_MODE.HINDI;
  const lang = getLangCode(languageMode);

  console.log('🎙️ getInterviewerScriptV2:', { phase, languageMode, isHindi });

  const normalize = (text) => normalizeMathText(text, lang);

  switch (phase) {

    case 'WELCOME':
      return isHindi
        ? 'नमस्ते, पीवी क्लासेज के मॉक इंटरव्यू में आपका स्वागत है। चलिए शुरू करते हैं।'
        : 'Hello, welcome to the PV Classes mock interview. Let\'s begin.';

    case 'QUESTION_INTRO':
      return isHindi
        ? 'अगला प्रश्न है:'
        : 'Here is your next question:';

    case 'QUESTION_TEXT': {
      if (!data) {
        console.warn('⚠️ No question data provided');
        return '';
      }

      // Bilingual object with english/hindi keys
      if (typeof data === 'object' && (data.english || data.hindi)) {
        const raw = isHindi ? (data.hindi || data.english) : (data.english || data.hindi);
        const normalized = normalize(raw);
        console.log('✅ Speaking question text:', normalized);
        return normalized;
      }

      // Plain string fallback
      console.warn('⚠️ Question data is not bilingual object, using as-is:', data);
      return normalize(String(data));
    }

    case 'LOCK_CONFIRMATION':
      return isHindi
        ? `आपने विकल्प ${data} चुना है। क्या आप इसे लॉक करना चाहते हैं?`
        : `You have selected option ${data}. Do you want to lock it?`;

    case 'CORRECT_FEEDBACK':
      return isHindi
        ? 'बिल्कुल सही जवाब!'
        : 'That is absolutely correct!';

    case 'INCORRECT_FEEDBACK':
      return isHindi
        ? 'यह गलत जवाब है।'
        : 'That is incorrect.';

    case 'EXPLANATION': {
      if (!data) return '';

      if (typeof data === 'object' && (data.english || data.hindi)) {
        const raw = isHindi ? (data.hindi || data.english) : (data.english || data.hindi);
        return normalize(raw);
      }

      return normalize(String(data));
    }

    case 'TIMEOUT':
      return isHindi
        ? 'समय समाप्त हो गया है।'
        : 'Time is up.';

    case 'COMPLETED':
      return isHindi
        ? 'आपका इंटरव्यू समाप्त हो गया है। आपका रिपोर्ट तैयार है।'
        : 'Your interview is complete. Your report is ready.';

    default:
      return '';
  }
};
