export const parseVoiceAnswer = (transcript, optionsTextMap = null) => {
  if (!transcript) return { option: null, isLockCommand: false };
  
  const text = transcript.toLowerCase().trim();
  
  let option = null;
  let isLockCommand = false;

  // Detect lock intent
  if (
    text.includes("lock") || 
    text.includes("लॉक") || 
    text.includes("submit") || 
    text.includes("confirm") ||
    text.includes("final")
  ) {
    isLockCommand = true;
  }

  // Detect exact text match from options
  if (optionsTextMap) {
    for (const [key, value] of Object.entries(optionsTextMap)) {
      if (text.includes(value.toLowerCase().trim())) {
        option = key;
        isLockCommand = true; // Auto-lock if they speak the exact answer
        return { option, isLockCommand };
      }
    }
  }

  // Detect A
  if (
    /\b(a|ay|option a|विकल्प ए|ए)\b/.test(text)
  ) {
    option = 'A';
  }
  // Detect B
  else if (
    /\b(b|bee|be|option b|विकल्प बी|बी)\b/.test(text)
  ) {
    option = 'B';
  }
  // Detect C
  else if (
    /\b(c|see|sea|option c|विकल्प सी|सी)\b/.test(text)
  ) {
    option = 'C';
  }
  // Detect D
  else if (
    /\b(d|dee|de|option d|विकल्प डी|डी)\b/.test(text)
  ) {
    option = 'D';
  }

  return { option, isLockCommand };
};
