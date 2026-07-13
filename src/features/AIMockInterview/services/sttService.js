class STTService {
  constructor() {
    this.recognition = null;
    this.isSupported = false;
    
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.isSupported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true; // Keep listening
        this.recognition.interimResults = true; // Get real-time updates
      }
    }
  }

  start(lang = 'en-IN', onResult, onError, onEnd) {
    if (!this.isSupported || !this.recognition) return false;

    this.recognition.lang = lang;
    
    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (onResult) onResult({ finalTranscript, interimTranscript });
    };

    this.recognition.onerror = (event) => {
      if (event.error === 'no-speech') return; // Ignore silent periods
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      console.warn("STT already started or failed to start", e);
      return false;
    }
  }

  stop() {
    if (this.isSupported && this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
    }
  }

  abort() {
    if (this.isSupported && this.recognition) {
      try {
        this.recognition.abort();
      } catch(e) {}
    }
  }
}

export const sttService = new STTService();
