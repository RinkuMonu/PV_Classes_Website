"use client";

import React, { useEffect, useRef } from "react";
import { Bot, User, Loader2 } from "lucide-react";

export default function ChatWindow({ messages, isLoading, isStreaming }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isStreaming]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar">
      {isLoading ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Loading conversation...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <Bot size={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome to Doubt Solver
            </h2>
            <p className="text-gray-500 max-w-sm mt-2 text-sm">
              Ask any question about your syllabus, study material, or general doubts, and our AI tutor will help you out.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 pb-4">
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={index}
                className={`flex w-full ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[85%] md:max-w-[75%] space-x-3 ${
                    isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isUser
                        ? "bg-gray-800 text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    {isUser ? <User size={16} /> : <Bot size={16} />}
                  </div>

                  <div
                    className={`p-4 rounded-2xl ${
                      isUser
                        ? "bg-gray-100 text-gray-800 rounded-tr-sm"
                        : "bg-primary/5 border border-primary/10 text-gray-800 rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {isStreaming && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-[85%] md:max-w-[75%] space-x-3 flex-row">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-gray-800 rounded-tl-sm shadow-sm flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
