"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Globe } from "lucide-react";

export default function ChatInput({ onSendMessage, disabled, language = 'hi', onLanguageChange }) {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const finalTextRef = useRef(""); // accumulate all final speech results

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [text]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, []);

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    isListeningRef.current = false;
    setIsListening(false);
    finalTextRef.current = "";
    if (typeof window !== "undefined" && window.silenceTimeout) {
      clearTimeout(window.silenceTimeout);
    }
  };

  const startMic = () => {
    setMicError(null);

    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setMicError(language === 'hi'
        ? "आपका ब्राउज़र वॉइस इनपुट को सपोर्ट नहीं करता।"
        : "Your browser does not support voice input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;  // keep listening until user stops
    recognition.maxAlternatives = 1;

    // Append to existing text rather than overwriting
    finalTextRef.current = text ? text + " " : "";

    let hasDetectedSpeech = false;

    recognition.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
      
      // Warn user if no speech is detected after 7 seconds
      window.silenceTimeout = setTimeout(() => {
        if (isListeningRef.current && !hasDetectedSpeech) {
          setMicError(language === 'hi' 
            ? "कोई आवाज़ नहीं मिली। कृपया अपना माइक चेक करें।" 
            : "No voice detected. Is your microphone muted or wrong mic selected?");
        }
      }, 7000);
    };

    recognition.onresult = (event) => {
      hasDetectedSpeech = true;
      if (window.silenceTimeout) {
        clearTimeout(window.silenceTimeout);
        window.silenceTimeout = null;
        setMicError(null); // Clear any previous timeout error
      }
      
      let interim = "";
      // Accumulate all new final results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTextRef.current += transcript + " ";
        } else {
          interim += transcript;
        }
      }
      // Show final text + any current interim text
      setText((finalTextRef.current + interim).trim());
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition event:", event.error);
      if (window.silenceTimeout) {
        clearTimeout(window.silenceTimeout);
      }
      if (event.error === "not-allowed" || event.error === "permission-denied") {
        setMicError(language === 'hi'
          ? "माइक्रोफोन एक्सेस की अनुमति दें।"
          : "Please allow microphone access in your browser.");
      } else if (event.error === "no-speech") {
        // User didn't speak — silently reset, no error shown
      } else if (event.error === "network") {
        setMicError(language === 'hi' ? "नेटवर्क एरर। इंटरनेट चेक करें।" : "Network error. Check internet connection.");
      } else {
        setMicError(language === 'hi' ? "वॉइस एरर। दोबारा कोशिश करें।" : "Voice error. Try again.");
      }
      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      if (window.silenceTimeout) {
        clearTimeout(window.silenceTimeout);
      }
      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      console.error("Recognition start error:", err);
      setMicError(language === 'hi' ? "माइक्रोफोन शुरू नहीं हो सका।" : "Could not start microphone. Try again.");
      setIsListening(false);
      recognitionRef.current = null;
    }
  };

  const toggleMic = () => {
    if (isListeningRef.current) {
      stopMic();
    } else {
      startMic();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    stopMic();
    onSendMessage(text);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative">
      {/* Language Toggle */}
      <div className="flex items-center gap-2 mb-2">
        <Globe size={14} className="text-gray-400" />
        <span className="text-xs text-gray-400">Language:</span>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { stopMic(); onLanguageChange('hi'); }}
            className={`px-3 py-1 transition-colors cursor-pointer ${
              language === 'hi'
                ? 'bg-[#00316B] text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => { stopMic(); onLanguageChange('en'); }}
            className={`px-3 py-1 transition-colors cursor-pointer ${
              language === 'en'
                ? 'bg-[#00316B] text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            English
          </button>
        </div>
        {isListening && (
          <span className="flex items-center gap-1 text-xs text-red-500 animate-pulse font-medium">
            <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            {language === 'hi' ? 'सुन रहा है...' : 'Listening...'}
          </span>
        )}
      </div>

      {/* Input Row */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-[#00316B] transition-all duration-200 shadow-sm"
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            language === 'hi'
              ? 'अपना सवाल यहाँ लिखें...'
              : 'Ask your question here...'
          }
          className="w-full max-h-[150px] bg-transparent resize-none py-3 px-4 outline-none text-sm text-gray-700 disabled:opacity-50 hide-scrollbar"
          rows={1}
        />

        <div className="p-2 flex-shrink-0 flex items-center gap-1">
          {/* Mic Button */}
          <button
            type="button"
            onClick={toggleMic}
            disabled={disabled}
            title={
              isListening
                ? language === 'hi' ? 'रोकें' : 'Stop recording'
                : language === 'hi' ? 'बोलकर पूछें' : 'Speak your question'
            }
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
              isListening
                ? 'bg-red-500 text-white shadow-md shadow-red-200 scale-105'
                : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-[#00316B]'
            }`}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() || disabled}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#00316B] text-white disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-800 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            <Send size={16} className="ml-0.5" />
          </button>
        </div>
      </form>

      {/* Error message */}
      {micError && (
        <p className="text-[11px] text-red-500 mt-1 text-center">{micError}</p>
      )}

      <div className="text-center mt-2">
        <p className="text-[11px] text-gray-400">
          {language === 'hi'
            ? 'AI कभी-कभी गलती कर सकता है। महत्वपूर्ण जानकारी जांचें।'
            : 'AI Tutor can make mistakes. Verify important information.'}
        </p>
      </div>
    </div>
  );
}
