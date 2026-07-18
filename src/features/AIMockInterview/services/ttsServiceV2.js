/**
 * ttsServiceV2.js
 *
 * Primary TTS engine using FastAPI Piper API backend with automatic fallback
 * to Indian-accented Web Speech API (window.speechSynthesis).
 */

class TTSServiceV2 {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this._voicesReady = null;
    this.audioElement = null;
    this._isPiperSpeaking = false;
    
    // Playback queue and locking mechanisms
    this.queue = [];
    this.isProcessingQueue = false;
    this.abortController = null;
    this.currentSpeakId = 0;

    // Initialize browser voices for fallback
    if (this.synth) {
      this._voicesReady = new Promise((resolve) => {
        const tryResolve = () => {
          const v = this.synth.getVoices();
          if (v.length > 0) {
            this._logAll(v);
            resolve(v);
            return true;
          }
          return false;
        };

        if (tryResolve()) return;

        this.synth.onvoiceschanged = () => tryResolve();

        setTimeout(() => {
          const v = this.synth.getVoices();
          console.warn('[TTS Fallback] Voice load timeout, voices available:', v.length);
          resolve(v);
        }, 5000);
      });
    }
  }

  // ── Debug: print every voice ──────────────────────────────────────────────
  _logAll(voices) {
    console.group('[TTS Fallback] Available voices (' + voices.length + ')');
    voices.forEach((v, i) =>
      console.log(`  ${String(i).padStart(2)}. "${v.name}" | ${v.lang} | local:${v.localService}`)
    );
    console.groupEnd();
  }

  // ── Indian male voice names (exact or partial, lowercase) ─────────────────
  _isIndianMale(v) {
    const n = v.name.toLowerCase();
    return (
      n.includes('rishi')    ||   
      n.includes('hemant')   ||   
      n.includes('ravi')     ||   
      n.includes('prabhat')  ||   
      n.includes('heera')    ||   
      n.includes('aarav')    ||   
      n.includes('neerja')   ||   
      n.includes('kalpana')       
    );
  }

  // ── Known female voice names — used to EXCLUDE them ───────────────────────
  _isFemale(v) {
    const n = v.name.toLowerCase();
    return (
      n.includes('female')    ||
      n.includes('woman')     ||
      n.includes('zira')      ||   
      n.includes('hazel')     ||   
      n.includes('susan')     ||
      n.includes('samantha')  ||   
      n.includes('victoria')  ||
      n.includes('karen')     ||
      n.includes('moira')     ||
      n.includes('tessa')     ||
      n.includes('fiona')     ||
      n.includes('veena')     ||   
      n.includes('allison')   ||
      n.includes('ava')       ||
      n.includes('kate')      ||
      n.includes('serena')    ||
      n.includes('priya')     ||   
      n.includes('lekha')     ||   
      n.includes('aditi')     ||   
      n === 'google हिन्दी'
    );
  }

  // ── Voice selection — strict Indian male priority ─────────────────────────
  _pickVoice(voices, lang) {
    const t1 = voices.find(v => v.lang === lang && this._isIndianMale(v));
    if (t1) return t1;

    const fam = lang.split('-')[0];
    const t2 = voices.find(v => v.lang.startsWith(fam) && this._isIndianMale(v));
    if (t2) return t2;

    const indiaLangs = lang.startsWith('hi') ? ['hi-IN'] : ['en-IN'];
    const t3 = voices.find(v => indiaLangs.includes(v.lang) && !this._isFemale(v));
    if (t3) return t3;

    const t4 = voices.find(v => indiaLangs.includes(v.lang));
    if (t4) return t4;

    const t5 = voices.find(v => v.lang.startsWith(fam) && !this._isFemale(v));
    if (t5) return t5;

    return voices.find(v => v.lang.startsWith(fam)) || voices[0] || null;
  }

  // ── Main speak (Queue system) ─────────────────────────────────────────────
  async speak(text, language = 'English', onStart = null, onEnd = null, onError = null, onBoundary = null) {
    if (!text) { onEnd?.(); return; }
    
    this.queue.push({ text, language, onStart, onEnd, onError, onBoundary });
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessingQueue || this.queue.length === 0) return;
    this.isProcessingQueue = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      await this._executeSpeak(item);
    }

    this.isProcessingQueue = false;
  }

  async _executeSpeak({ text, language, onStart, onEnd, onError, onBoundary }) {
    return new Promise(async (resolve) => {
      const speakId = ++this.currentSpeakId;
      this.abortController = new AbortController();

      const finish = () => {
        this.abortController = null;
        resolve();
      };

      try {
        console.log('[TTS] ➡️ TTS request sent');
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8001';
        console.log(`[TTS] 🎤 Requesting Piper TTS for language: ${language}`);
        
        const response = await fetch(`${baseUrl}/api/v1/speech/piper`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, language }),
          signal: this.abortController.signal
        });

        if (this.currentSpeakId !== speakId) return resolve(); // Interrupted

        console.log(`[TTS] ⬅️ TTS response received (Status: ${response.status})`);
        if (!response.ok) {
          throw new Error(`Piper API failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (this.currentSpeakId !== speakId) return resolve(); // Interrupted

        if (data.status !== 'success' || !data.audio_url) {
          throw new Error(`Invalid response from Piper API: ${JSON.stringify(data)}`);
        }
        
        console.log(`[TTS] 🔗 Audio URL created: ${data.audio_url}`);
        this.audioElement = new Audio(`${baseUrl}${data.audio_url}`);
        
        this.audioElement.onloadeddata = () => {
          console.log('[TTS] ⏳ Audio loaded');
        };
        
        this.audioElement.onplay = () => {
          if (this.currentSpeakId !== speakId) return;
          this._isPiperSpeaking = true;
          console.log('[TTS] ▶️ Audio started');
          if (onStart) onStart();
          if (onBoundary) {
            onBoundary({ name: 'word' });
          }
        };
        
        this.audioElement.onended = () => {
          if (this.currentSpeakId !== speakId) return;
          this._isPiperSpeaking = false;
          
          this.audioElement.onloadeddata = null;
          this.audioElement.onplay = null;
          this.audioElement.onended = null;
          this.audioElement.onerror = null;
          this.audioElement = null;
          
          console.log('[TTS] ⏹️ Audio ended');
          if (onEnd) onEnd();
          finish();
        };
        
        this.audioElement.onerror = (e) => {
          if (this.currentSpeakId !== speakId) return;
          this._isPiperSpeaking = false;
          
          const errMessage = e.target?.error?.message || e.message || 'Unknown Audio Error';
          const errCode = e.target?.error?.code || 'No Code';
          console.error(`[TTS] ❌ Audio playback failed: Code ${errCode}, Message: ${errMessage}`);
          
          this.audioElement.onloadeddata = null;
          this.audioElement.onplay = null;
          this.audioElement.onended = null;
          this.audioElement.onerror = null;
          this.audioElement = null;
          
          throw new Error(`Audio playback failed: ${errMessage}`);
        };

        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error(`[TTS] ❌ Playback rejected by browser (autoplay issue?):`, err);
            throw err;
          });
        }
        
        
      } catch (err) {
        if (err.name === 'AbortError' || this.currentSpeakId !== speakId) {
          console.log('[TTS] 🛑 Piper TTS fetch aborted.');
          if (onError) onError(new Error('canceled'));
          return resolve();
        }
        
        console.error('[TTS] ⚠️ Piper TTS failed, falling back to browser SpeechSynthesis:', err);
        console.log('Browser Fallback Activated');
        const fallbackLangCode = language === 'Hindi' ? 'hi-IN' : 'en-IN';
        
        await new Promise((fallbackResolve) => {
          this._speakFallback(
            text, 
            fallbackLangCode, 
            onStart, 
            () => {
              if (onEnd) onEnd();
              fallbackResolve();
            }, 
            (e) => {
              if (onError) onError(e);
              fallbackResolve();
            }, 
            onBoundary,
            speakId
          );
        });
        finish();
      }
    });
  }

  // ── Fallback speak ────────────────────────────────────────────────────────
  async _speakFallback(text, langCode = 'en-IN', onStart = null, onEnd = null, onError = null, onBoundary = null, speakId = null) {
    if (!this.synth) {
      onError?.(new Error('SpeechSynthesis not supported'));
      return;
    }

    if (speakId && this.currentSpeakId !== speakId) return; // Interrupted

    const voices = await this._voicesReady;
    
    if (speakId && this.currentSpeakId !== speakId) return; // Interrupted

    const u = new SpeechSynthesisUtterance(text);
    u.lang   = langCode;      
    u.volume = 1.0;
    u.pitch  = 0.1;       
    u.rate   = langCode === 'hi-IN' ? 0.87 : 0.9;

    const chosen = this._pickVoice(voices, langCode);
    if (chosen) {
      u.voice = chosen;
      console.log(
        `[TTS Fallback] ✅ Using voice: "${chosen.name}" | lang:${chosen.lang}`
      );
    } else {
      console.warn('[TTS Fallback] ⚠️ No voice found — browser default');
    }

    if (onBoundary) u.onboundary = onBoundary;
    u.onstart = () => {
      if (speakId && this.currentSpeakId !== speakId) {
        this.synth.cancel();
        return;
      }
      console.log('[TTS Fallback] Speaking:', text.substring(0, 80));
      if (onStart) onStart();
    };
    u.onend   = () => { 
      if (speakId && this.currentSpeakId !== speakId) return;
      this.currentUtterance = null; 
      onEnd?.(); 
    };
    u.onerror = (e) => {
      this.currentUtterance = null;
      const errReason = e.error || 'Unknown Error';
      if (errReason === 'interrupted' || errReason === 'canceled') { onError?.(e); return; }
      console.error('[TTS Fallback] Error:', errReason);
      onError?.(e);
    };

    this.currentUtterance = u;
    this.synth.speak(u);
  }

  cancel() {
    this.queue = [];
    this.currentSpeakId++;

    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      
      this.audioElement.onplay = null;
      this.audioElement.onended = null;
      this.audioElement.onerror = null;
      this.audioElement = null;
      this._isPiperSpeaking = false;
    }
    
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking() {
    return this._isPiperSpeaking || !!this.synth?.speaking;
  }
}

export const ttsServiceV2 = new TTSServiceV2();
