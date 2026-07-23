/**
 * ttsServiceV2.js
 *
 * Primary TTS engine using backend Piper API.
 * Shared playback service for both MCQ Mock Interview and AI Live Interview.
 * Browser fallback has been strictly removed to ensure voice consistency.
 */

class TTSServiceV2 {
  constructor() {
    this.audioElement = null;
    this._isPiperSpeaking = false;
    
    // Playback queue and locking mechanisms
    this.queue = [];
    this.isProcessingQueue = false;
    this.abortController = null;
    this.currentSpeakId = 0;
  }

  // ── Main speak (Queue system for text-based TTS generation) ───────────────
  async speak(text, language = 'English', onStart = null, onEnd = null, onError = null, onBoundary = null) {
    if (!text) { onEnd?.(); return; }
    
    this.queue.push({ type: 'text', text, language, onStart, onEnd, onError, onBoundary });
    this.processQueue();
  }

  // ── Queue system for playing pre-generated backend audio URLs ─────────────
  async playPreGeneratedAudio(audioUrl, onStart = null, onEnd = null, onError = null) {
    if (!audioUrl) { onEnd?.(); return; }

    this.queue.push({ type: 'url', audioUrl, onStart, onEnd, onError, onBoundary: null });
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessingQueue || this.queue.length === 0) return;
    this.isProcessingQueue = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (item.type === 'text') {
        await this._executeSpeak(item);
      } else if (item.type === 'url') {
        await this._executePlayUrl(item);
      }
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
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:8000` : "http://localhost:8000");
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
        
        await this._playAudio(data.audio_url, onStart, onEnd, onError, onBoundary, speakId);
        finish();
        
      } catch (err) {
        if (err.name === 'AbortError' || this.currentSpeakId !== speakId) {
          console.log('[TTS] 🛑 Piper TTS fetch aborted.');
          if (onError) onError(new Error('canceled'));
          return resolve();
        }
        
        console.error('[TTS] ❌ Piper TTS failed. No browser fallback is permitted.', err);
        if (onError) onError(new Error("Voice generation failed. Please try again."));
        finish();
      }
    });
  }

  async _executePlayUrl({ audioUrl, onStart, onEnd, onError, onBoundary }) {
    return new Promise(async (resolve) => {
      const speakId = ++this.currentSpeakId;
      this.abortController = new AbortController();

      const finish = () => {
        this.abortController = null;
        resolve();
      };
      
      try {
        await this._playAudio(audioUrl, onStart, onEnd, onError, onBoundary, speakId);
      } catch (err) {
        console.error('[TTS] ❌ Playback failed for pre-generated URL.', err);
        if (onError) onError(new Error("Voice playback failed. Please try again."));
      }
      finish();
    });
  }

  async _playAudio(audioUrl, onStart, onEnd, onError, onBoundary, speakId) {
    return new Promise((resolvePlay, rejectPlay) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:8000` : "http://localhost:8000");
        const fullUrl = audioUrl.startsWith('http') ? audioUrl : `${baseUrl}${audioUrl}`;
        
        this.audioElement = new Audio(fullUrl);
        
        // Requirements: Verify exactly before playing
        console.group('[TTS Verification] Audio Playback Trace');
        console.log(`[TTS] 🔗 Backend audio_url: ${audioUrl}`);
        console.log(`[TTS] 🔗 Resolved audio.src: ${this.audioElement.src}`);
        
        // Confirm matching
        const expectedResolved = new URL(fullUrl, window.location.origin).href;
        if (this.audioElement.src === expectedResolved) {
            console.log(`[TTS] ✅ MATCH CONFIRMED: audio.src exactly matches the backend audio_url (resolved).`);
        } else {
            console.warn(`[TTS] ❌ MISMATCH DETECTED!`);
            console.warn(`      Expected: ${expectedResolved}`);
            console.warn(`      Actual audio.src: ${this.audioElement.src}`);
            console.warn(`      Code modifying URL: Browser's URL resolution or unexpected interceptor.`);
        }
        console.log(`[TTS] 🎵 Current voice engine: PIPER TTS (Backend Generated)`);
        console.groupEnd();
        
        this.audioElement.onloadedmetadata = () => {
          console.log(`[TTS] ⏳ Audio loaded. Duration: ${this.audioElement.duration}s`);
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
          
          this.audioElement.onloadedmetadata = null;
          this.audioElement.onplay = null;
          this.audioElement.onended = null;
          this.audioElement.onerror = null;
          this.audioElement = null;
          
          console.log('[TTS] ⏹️ Audio ended');
          if (onEnd) onEnd();
          resolvePlay();
        };
        
        this.audioElement.onerror = (e) => {
          if (this.currentSpeakId !== speakId) return;
          this._isPiperSpeaking = false;
          
          const errMessage = e.target?.error?.message || e.message || 'Unknown Audio Error';
          const errCode = e.target?.error?.code || 'No Code';
          console.error(`[TTS] ❌ Audio playback failed: Code ${errCode}, Message: ${errMessage}`);
          
          this.audioElement.onloadedmetadata = null;
          this.audioElement.onplay = null;
          this.audioElement.onended = null;
          this.audioElement.onerror = null;
          this.audioElement = null;
          
          if (onError) onError(new Error(`Audio playback failed: ${errMessage}`));
          rejectPlay(new Error(errMessage));
        };

        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error(`[TTS] ❌ Playback rejected by browser (autoplay issue?):`, err);
            if (onError) onError(new Error("Voice generation failed. Please try again."));
            rejectPlay(err);
          });
        }
    });
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
      
      this.audioElement.onloadedmetadata = null;
      this.audioElement.onplay = null;
      this.audioElement.onended = null;
      this.audioElement.onerror = null;
      this.audioElement = null;
      this._isPiperSpeaking = false;
    }
  }

  isSpeaking() {
    return this._isPiperSpeaking;
  }
}

export const ttsServiceV2 = new TTSServiceV2();
