class TTSService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  speak(text, lang = 'en-IN', onEnd = null, onError = null) {
    if (!this.synth) {
      if (onError) onError(new Error("Speech Synthesis not supported"));
      return;
    }

    this.cancel(); // Prevent overlap

    if (!text) {
      if (onEnd) onEnd();
      return;
    }

    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = lang;
    
    this.currentUtterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance.onerror = (e) => {
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    this.synth.speak(this.currentUtterance);
  }

  cancel() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }
}

export const ttsService = new TTSService();
