import { LANGUAGE_MODE } from '../constants/interviewConstants';

export const getInterviewerScript = (phase, data, languageMode) => {
  const isHindi = languageMode === LANGUAGE_MODE.HINDI;
  const isBoth = languageMode === 'Both' || languageMode === LANGUAGE_MODE.BOTH;
  
  console.log('🎙️ getInterviewerScript:', { phase, languageMode, isHindi, isBoth, data });
  
  switch (phase) {
    case 'WELCOME':
      if (isBoth) {
        return "नमस्ते, Hello, welcome to the PV Classes mock interview. पीवी क्लासेज के मॉक इंटरव्यू में आपका स्वागत है। Let's begin. चलिए शुरू करते हैं।";
      }
      return isHindi 
        ? "नमस्ते, पीवी क्लासेज के मॉक इंटरव्यू में आपका स्वागत है। चलिए शुरू करते हैं।" 
        : "Hello, welcome to the PV Classes mock interview. Let's begin.";
        
    case 'QUESTION_INTRO':
      if (isBoth) {
        return "अगला प्रश्न है, Here is your next question:";
      }
      return isHindi ? "अगला प्रश्न है:" : "Here is your next question:";
      
    case 'QUESTION_TEXT':
      // Data is expected to be the bilingual text object
      if (!data) {
        console.warn('⚠️ No question data provided');
        return "";
      }
      
      // Check if data has english/hindi properties
      if (typeof data === 'object' && (data.english || data.hindi)) {
        let text = '';
        
        if (isBoth) {
          // Speak both languages
          text = `${data.english} ${data.hindi}`;
        } else {
          text = isHindi ? data.hindi : data.english;
        }
        
        console.log('✅ Speaking question text:', text);
        return text;
      }
      
      // Fallback: if data is a string, return it as-is
      console.warn('⚠️ Question data is not bilingual object, using as-is:', data);
      return String(data);
      
    case 'LOCK_CONFIRMATION':
      if (isBoth) {
        return `आपने विकल्प ${data} चुना है। You have selected option ${data}. क्या आप इसे लॉक करना चाहते हैं? Do you want to lock it?`;
      }
      return isHindi 
        ? `आपने विकल्प ${data} चुना है। क्या आप इसे लॉक करना चाहते हैं?` 
        : `You have selected option ${data}. Do you want to lock it?`;
        
    case 'CORRECT_FEEDBACK':
      if (isBoth) {
        return "बिल्कुल सही जवाब! That is absolutely correct!";
      }
      return isHindi ? "बिल्कुल सही जवाब!" : "That is absolutely correct!";
      
    case 'INCORRECT_FEEDBACK':
      if (isBoth) {
        return "यह गलत जवाब है। That is incorrect.";
      }
      return isHindi ? "यह गलत जवाब है।" : "That is incorrect.";
      
    case 'EXPLANATION':
      if (!data) return "";
      
      // Check if data has english/hindi properties
      if (typeof data === 'object' && (data.english || data.hindi)) {
        if (isBoth) {
          return `${data.english} ${data.hindi}`;
        }
        return isHindi ? data.hindi : data.english;
      }
      
      // Fallback: return as-is
      return String(data);
      
    case 'TIMEOUT':
      if (isBoth) {
        return "समय समाप्त हो गया है। Time is up.";
      }
      return isHindi ? "समय समाप्त हो गया है।" : "Time is up.";
      
    case 'COMPLETED':
      if (isBoth) {
        return "आपका इंटरव्यू समाप्त हो गया है। Your interview is complete. आपका रिपोर्ट तैयार है। Your report is ready.";
      }
      return isHindi 
        ? "आपका इंटरव्यू समाप्त हो गया है। आपका रिपोर्ट तैयार है।" 
        : "Your interview is complete. Your report is ready.";
        
    default:
      return "";
  }
};
