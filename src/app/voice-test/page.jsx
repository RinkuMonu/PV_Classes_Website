"use client";
/**
 * /voice-test
 *
 * Open this page in your browser to see ALL available voices.
 * Click any voice to hear it speak a test sentence.
 * This tells us the exact name of the male voice available on your machine.
 *
 * After finding the male voice name, add it to ttsServiceV2.js _isMaleVoice()
 */

import { useEffect, useState } from 'react';

export default function VoiceTestPage() {
  const [voices, setVoices] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) setVoices(v);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, []);

  const speak = (voice) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      voice.lang.startsWith('hi')
        ? 'नमस्ते, यह एक परीक्षण है। पी वी क्लासेज में आपका स्वागत है।'
        : 'Hello, this is a test. Welcome to PV Classes mock interview.'
    );
    u.voice = voice;
    u.lang = voice.lang;
    u.pitch = 0.85;
    u.rate = 0.9;
    u.onstart = () => setPlaying(voice.name);
    u.onend = () => setPlaying(null);
    window.speechSynthesis.speak(u);
  };

  const filtered = voices.filter(v =>
    v.name.toLowerCase().includes(filter.toLowerCase()) ||
    v.lang.toLowerCase().includes(filter.toLowerCase())
  );

  const hiVoices = filtered.filter(v => v.lang.startsWith('hi'));
  const enINVoices = filtered.filter(v => v.lang === 'en-IN');
  const enVoices = filtered.filter(v => v.lang.startsWith('en') && v.lang !== 'en-IN');
  const otherVoices = filtered.filter(v => !v.lang.startsWith('hi') && !v.lang.startsWith('en'));

  const Section = ({ title, list, color }) => list.length === 0 ? null : (
    <div className="mb-8">
      <h2 className={`text-lg font-bold mb-3 ${color}`}>{title} ({list.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {list.map((v, i) => (
          <button
            key={i}
            onClick={() => speak(v)}
            className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all
              ${playing === v.name
                ? 'bg-green-100 border-green-400 shadow-md'
                : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50'}`}
          >
            <div>
              <p className="font-semibold text-gray-800 text-sm">{v.name}</p>
              <p className="text-xs text-gray-500">{v.lang} {v.localService ? '• Local' : '• Network'}</p>
            </div>
            <span className="text-xl">{playing === v.name ? '🔊' : '▶'}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#00316B] mb-2">Voice Inspector</h1>
        <p className="text-gray-600 mb-6">
          Click any voice to hear it. Find the male Hindi/English voice and note its exact name.
          Total voices available: <strong>{voices.length}</strong>
        </p>

        <input
          type="text"
          placeholder="Filter voices by name or language..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-8 outline-none focus:ring-2 focus:ring-[#00316B]"
        />

        {voices.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Loading voices... (may take 1–2 seconds on Chrome)
          </div>
        )}

        <Section title="🇮🇳 Hindi Voices" list={hiVoices} color="text-orange-700" />
        <Section title="🇮🇳 English (India) Voices" list={enINVoices} color="text-blue-700" />
        <Section title="🌍 English (Other) Voices" list={enVoices} color="text-purple-700" />
        <Section title="🌐 Other Languages" list={otherVoices} color="text-gray-600" />

        <div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-bold text-yellow-800 mb-2">📋 All Voice Names (copy for debugging)</h3>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all bg-white p-3 rounded border max-h-48 overflow-y-auto">
            {voices.map(v => `${v.name} | ${v.lang} | local:${v.localService}`).join('\n')}
          </pre>
        </div>
      </div>
    </div>
  );
}
