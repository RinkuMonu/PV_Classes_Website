import { LANGUAGE_MODE } from '../constants/interviewConstants';

export const getInterviewerScript = (phase, data, languageMode) => {
  const isHindi = languageMode === LANGUAGE_MODE.HINDI;
  
  switch (phase) {
    case 'WELCOME':
      return isHindi 
        ? "नमस्ते, पीवी क्लासेज के मॉक इंटरव्यू में आपका स्वागत है। चलिए शुरू करते हैं।" 
        : "Hello, welcome to the PV Classes mock interview. Let's begin.";
        
    case 'QUESTION_INTRO':
      return isHindi ? "अगला प्रश्न है:" : "Here is your next question:";
      
    case 'QUESTION_TEXT':
      // Data is expected to be the bilingual text object
      if (!data) return "";
      return isHindi ? data.hindi : data.english;
      
    case 'LOCK_CONFIRMATION':
      return isHindi 
        ? `आपने विकल्प ${data} चुना है। क्या आप इसे लॉक करना चाहते हैं?` 
        : `You have selected option ${data}. Do you want to lock it?`;
        
    case 'CORRECT_FEEDBACK':
      return isHindi ? "बिल्कुल सही जवाब!" : "That is absolutely correct!";
      
    case 'INCORRECT_FEEDBACK':
      return isHindi ? "यह गलत जवाब है।" : "That is incorrect.";
      
    case 'EXPLANATION':
      if (!data) return "";
      return isHindi ? data.hindi : data.english;
      
    case 'TIMEOUT':
      return isHindi ? "समय समाप्त हो गया है।" : "Time is up.";
      
    case 'COMPLETED':
      return isHindi 
        ? "आपका इंटरव्यू समाप्त हो गया है। आपका रिपोर्ट तैयार है।" 
        : "Your interview is complete. Your report is ready.";
        
    default:
      return "";
  }
};
