"use client";

import React, { useRef, useEffect } from 'react';

export default function ConversationTimeline({ conversation }) {
  const bottomRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  return (
    <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-4 h-auto">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 border-b pb-2">
        Conversation Timeline
      </h3>

      <div className="space-y-6">
        {conversation && conversation.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
          >
            <div className="flex items-center gap-2 mb-1">
              {msg.role === 'assistant' ? (
                <>
                  <span className="text-lg">🤖</span>
                  <span className="text-xs font-bold text-gray-500 uppercase">AI Interviewer</span>
                </>
              ) : (
                <>
                  <span className="text-xs font-bold text-gray-500 uppercase">You</span>
                  <span className="text-lg">👤</span>
                </>
              )}
            </div>
            
            <div 
              className={`max-w-[95%] p-4 rounded-2xl ${
                msg.role === 'assistant' 
                  ? 'bg-gray-100 text-gray-800 rounded-tl-none' 
                  : 'bg-[#00316B] text-white rounded-tr-none shadow-md'
              }`}
            >
              <p className="leading-relaxed">{msg.message}</p>
            </div>
            
            {msg.timestamp && (
              <span className="text-[10px] text-gray-400 mt-1">{msg.timestamp}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
