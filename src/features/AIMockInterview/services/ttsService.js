class TTSService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.onBoundaryCallback = null;
    this.voicesLoaded = false;
    
    console.log('🎙️ TTS Service Initialized');
    
    // Load voices when available
    if (this.synth) {
      console.log('✅ Speech Synthesis API available');
      
      // Chrome loads voices asynchronously
      if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          this.voicesLoaded = true;
          const voices = this.synth.getVoices();
          console.log('✅ Voices loaded:', voices.length);
          console.log('📋 Available voices:', voices.map(v => `${v.name} (${v.lang})`));
        };
      }
      
      // Some browsers have voices immediately
      const immediateVoices = this.synth.getVoices();
      if (immediateVoices.length > 0) {
        this.voicesLoaded = true;
        console.log('✅ Voices immediately available:', immediateVoices.length);
        console.log('📋 Available voices:', immediateVoices.map(v => `${v.name} (${v.lang})`));
      } else {
        console.log('⏳ Waiting for voices to load...');
      }
    } else {
      console.error('❌ Speech Synthesis API NOT available');
    }
  }

  speak(text, lang = 'en-IN', onEnd = null, onError = null, onBoundary = null) {
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
    this.currentUtterance.rate = lang === 'hi-IN' ? 0.9 : 0.95; // Slower for Hindi
    this.currentUtterance.pitch = lang === 'hi-IN' ? 1.05 : 1.0; // Slightly higher pitch for Hindi
    this.currentUtterance.volume = 1.0;
    
    // Try to select the best MALE voice for the language
    if (this.synth.getVoices) {
      const voices = this.synth.getVoices();
      
      // Helper: check if a voice is male by its name keywords
      const isMaleVoice = (voice) => {
        const name = voice.name.toLowerCase();
        return name.includes('male') || 
               name.includes('man') ||
               name.includes('guy') ||
               name.includes('david') || 
               name.includes('james') ||
               name.includes('daniel') ||
               name.includes('mark') ||
               name.includes('george') ||
               name.includes('rishi') ||    // Google en-IN male voice
               name.includes('hemant');     // Google hi-IN male voice
      };

      // For Hindi, prefer Google Hindi male voices
      if (lang === 'hi-IN') {
        const hindiMaleVoice = 
          voices.find(v => v.lang === 'hi-IN' && v.name.includes('Google') && isMaleVoice(v)) ||
          voices.find(v => v.lang === 'hi-IN' && isMaleVoice(v)) ||
          voices.find(v => v.lang === 'hi-IN' && v.name.includes('Google')) ||
          voices.find(v => v.lang === 'hi-IN') ||
          voices.find(v => v.lang.startsWith('hi'));
        
        if (hindiMaleVoice) {
          this.currentUtterance.voice = hindiMaleVoice;
          console.log('🔊 Selected Hindi male voice:', hindiMaleVoice.name, hindiMaleVoice.lang);
        }
      } else {
        // For English or other languages — prefer male voice
        const malevoice = 
          voices.find(v => v.lang === lang && isMaleVoice(v)) ||
          voices.find(v => v.lang.startsWith(lang.split('-')[0]) && isMaleVoice(v)) ||
          voices.find(v => v.lang === lang) ||
          voices.find(v => v.lang.startsWith(lang.split('-')[0]));
        
        if (malevoice) {
          this.currentUtterance.voice = malevoice;
          console.log('🔊 Selected male voice:', malevoice.name, malevoice.lang);
        }
      }
      
      if (!this.currentUtterance.voice) {
        console.warn('⚠️ No male voice found for language:', lang, '— using browser default');
      }
    }
    
    // Add boundary event for word-level sync
    if (onBoundary) {
      this.currentUtterance.onboundary = (event) => {
        onBoundary(event);
      };
    }
    
    this.currentUtterance.onstart = () => {
      console.log('🔊 TTS Started speaking in', lang, ':', text.substring(0, 50) + '...');
    };
    
    this.currentUtterance.onend = () => {
      console.log('✅ TTS Finished speaking');
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance.onerror = (e) => {
      console.error('❌ TTS Error:', e.error);
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    console.log('🎙️ Speaking text in', lang, ':', text.substring(0, 100) + '...');
    this.synth.speak(this.currentUtterance);
  }

  cancel() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }
  
  isSpeaking() {
    return this.synth && this.synth.speaking;
  }
}

export const ttsService = new TTSService();
