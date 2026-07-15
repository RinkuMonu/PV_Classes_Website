/**
 * ttsServiceV2.js
 *
 * Indian-accented Male TTS using Web Speech API.
 *
 * Voice priority (Chrome on Windows — most common setup):
 *   Hindi  → "Google हिंदी"  (hi-IN, male-sounding) or "Hemant" (hi-IN male)
 *   English → "Google Rishi" (en-IN, Indian male)  or "Microsoft Ravi" (en-IN)
 *
 * Fallback chain:
 *   1. Exact Indian voice by known name  (Rishi / Hemant / Ravi / Prabhat)
 *   2. Any voice with lang en-IN / hi-IN  (Indian accent guaranteed)
 *   3. Any non-female voice in en / hi family
 *   4. Whatever exists — pitch forced to 0.1 (deepest possible)
 *
 * pitch = 0.1  →  browser minimum = deepest / most masculine sound possible
 */

class TTSServiceV2 {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this._voicesReady = null;

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

        // Hard timeout — 5 s
        setTimeout(() => {
          const v = this.synth.getVoices();
          console.warn('[TTS] Voice load timeout, voices available:', v.length);
          resolve(v);
        }, 5000);
      });
    }
  }

  // ── Debug: print every voice ──────────────────────────────────────────────
  _logAll(voices) {
    console.group('[TTS] Available voices (' + voices.length + ')');
    voices.forEach((v, i) =>
      console.log(`  ${String(i).padStart(2)}. "${v.name}" | ${v.lang} | local:${v.localService}`)
    );
    console.groupEnd();
  }

  // ── Indian male voice names (exact or partial, lowercase) ─────────────────
  // These are real voice names found on Windows + Chrome / Edge / Firefox
  _isIndianMale(v) {
    const n = v.name.toLowerCase();
    return (
      // Google Chrome built-in Indian voices (BEST for Indian accent)
      n.includes('rishi')    ||   // Google en-IN — Indian male English ★★★
      n.includes('hemant')   ||   // Google hi-IN — Indian male Hindi  ★★★
      // Microsoft / Windows Indian voices
      n.includes('ravi')     ||   // Microsoft en-IN male
      n.includes('prabhat')  ||   // Microsoft hi-IN male
      n.includes('heera')    ||   // Microsoft hi-IN (sometimes listed)
      // Edge neural Indian voices
      n.includes('aarav')    ||   // en-IN neural male
      n.includes('neerja')   ||   // hi-IN (check gender — can vary)
      n.includes('kalpana')       // hi-IN
    );
  }

  // ── Known female voice names — used to EXCLUDE them ───────────────────────
  _isFemale(v) {
    const n = v.name.toLowerCase();
    return (
      n.includes('female')    ||
      n.includes('woman')     ||
      n.includes('zira')      ||   // Windows en-US female
      n.includes('hazel')     ||   // Windows en-GB female
      n.includes('susan')     ||
      n.includes('samantha')  ||   // macOS en-US female
      n.includes('victoria')  ||
      n.includes('karen')     ||
      n.includes('moira')     ||
      n.includes('tessa')     ||
      n.includes('fiona')     ||
      n.includes('veena')     ||   // macOS hi-IN female
      n.includes('allison')   ||
      n.includes('ava')       ||
      n.includes('kate')      ||
      n.includes('serena')    ||
      n.includes('priya')     ||   // hi-IN female
      n.includes('lekha')     ||   // hi-IN female
      n.includes('aditi')     ||   // Amazon / some browsers hi-IN female
      // Google Chrome "Google हिन्दी" is female — exclude it
      // (Hemant is the male one — already in _isIndianMale)
      n === 'google हिन्दी'
    );
  }

  // ── Voice selection — strict Indian male priority ─────────────────────────
  _pickVoice(voices, lang) {
    // ── Tier 1: Known Indian male, exact lang ─────────────────────────────
    const t1 = voices.find(v => v.lang === lang && this._isIndianMale(v));
    if (t1) return t1;

    // ── Tier 2: Known Indian male, same language family ───────────────────
    const fam = lang.split('-')[0]; // 'hi' or 'en'
    const t2 = voices.find(v => v.lang.startsWith(fam) && this._isIndianMale(v));
    if (t2) return t2;

    // ── Tier 3: Any Indian-locale voice that is not female ────────────────
    //    en-IN or hi-IN guarantees Indian accent even if gender unknown
    const indiaLangs = lang.startsWith('hi') ? ['hi-IN'] : ['en-IN'];
    const t3 = voices.find(v => indiaLangs.includes(v.lang) && !this._isFemale(v));
    if (t3) return t3;

    // ── Tier 4: Any Indian-locale voice ───────────────────────────────────
    const t4 = voices.find(v => indiaLangs.includes(v.lang));
    if (t4) return t4;

    // ── Tier 5: Any same-language non-female voice ────────────────────────
    const t5 = voices.find(v => v.lang.startsWith(fam) && !this._isFemale(v));
    if (t5) return t5;

    // ── Tier 6: Absolute last resort ─────────────────────────────────────
    return voices.find(v => v.lang.startsWith(fam)) || voices[0] || null;
  }

  // ── Main speak ────────────────────────────────────────────────────────────
  async speak(text, lang = 'en-IN', onEnd = null, onError = null, onBoundary = null) {
    if (!this.synth) {
      onError?.(new Error('SpeechSynthesis not supported'));
      return;
    }

    this.cancel();
    if (!text) { onEnd?.(); return; }

    const voices = await this._voicesReady;

    const u = new SpeechSynthesisUtterance(text);
    u.lang   = lang;      // en-IN or hi-IN — tells browser to use Indian accent
    u.volume = 1.0;
    u.pitch  = 0.1;       // 0.1 = deepest possible = most masculine
    u.rate   = lang === 'hi-IN' ? 0.87 : 0.9;

    const chosen = this._pickVoice(voices, lang);
    if (chosen) {
      u.voice = chosen;
      console.log(
        `[TTS] ✅ Using voice: "${chosen.name}" | lang:${chosen.lang}` +
        ` | Indian-male:${this._isIndianMale(chosen)} | female:${this._isFemale(chosen)}`
      );
    } else {
      console.warn('[TTS] ⚠️ No voice found — browser default (pitch 0.1 applied)');
    }

    if (onBoundary) u.onboundary = onBoundary;
    u.onstart = () => console.log('[TTS] Speaking:', text.substring(0, 80));
    u.onend   = () => { this.currentUtterance = null; onEnd?.(); };
    u.onerror = (e) => {
      this.currentUtterance = null;
      if (e.error === 'interrupted' || e.error === 'canceled') { onError?.(e); return; }
      console.error('[TTS] Error:', e.error);
      onError?.(e);
    };

    this.currentUtterance = u;
    this.synth.speak(u);
  }

  cancel() {
    if (this.synth?.speaking) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking() {
    return !!this.synth?.speaking;
  }
}

export const ttsServiceV2 = new TTSServiceV2();
