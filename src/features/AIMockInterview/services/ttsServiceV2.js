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

  // ── Main speak (Piper API -> Fallback) ────────────────────────────────────
  async speak(text, language = 'English', onStart = null, onEnd = null, onError = null, onBoundary = null) {
    if (this.synth) {
      this.synth.cancel();
    }
    this.cancel();
    if (!text) { onEnd?.(); return; }

    try {
      console.log('Piper TTS Started');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8001';
      console.log(`[TTS] 🎤 Requesting Piper TTS for language: ${language}`);
      
      const response = await fetch(`${baseUrl}/api/v1/speech/piper`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language })
      });

      if (!response.ok) {
        throw new Error(`Piper API failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.status !== 'success' || !data.audio_url) {
        throw new Error('Invalid response from Piper API');
      }

      // Play audio
      this.audioElement = new Audio(`${baseUrl}${data.audio_url}`);
      
      this.audioElement.onplay = () => {
        this._isPiperSpeaking = true;
        console.log('Piper Audio Playing');
        if (onStart) onStart();
        // Synthesize fake onBoundary events to keep lip-sync active while piper plays,
        // although useAvatarIdle primarily looks at `isSpeaking()` status.
        if (onBoundary) {
          // Just trigger it once at the start so state transitions correctly
          onBoundary({ name: 'word' });
        }
      };
      
      this.audioElement.onended = () => {
        this._isPiperSpeaking = false;
        this.audioElement = null;
        console.log('[TTS] ✅ Piper Audio finished');
        onEnd?.();
      };
      
      this.audioElement.onerror = (e) => {
        this._isPiperSpeaking = false;
        this.audioElement = null;
        throw new Error('Audio playback failed');
      };

      await this.audioElement.play();
      
    } catch (err) {
      console.error('[TTS] ⚠️ Piper TTS failed, falling back to browser SpeechSynthesis:', err);
      console.log('Browser Fallback Activated');
      // Fallback
      const fallbackLangCode = language === 'Hindi' ? 'hi-IN' : 'en-IN';
      this._speakFallback(text, fallbackLangCode, onStart, onEnd, onError, onBoundary);
    }
  }

  // ── Fallback speak ────────────────────────────────────────────────────────
  async _speakFallback(text, langCode = 'en-IN', onStart = null, onEnd = null, onError = null, onBoundary = null) {
    if (!this.synth) {
      onError?.(new Error('SpeechSynthesis not supported'));
      return;
    }

    const voices = await this._voicesReady;

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
      console.log('[TTS Fallback] Speaking:', text.substring(0, 80));
      if (onStart) onStart();
    };
    u.onend   = () => { this.currentUtterance = null; onEnd?.(); };
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
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
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
