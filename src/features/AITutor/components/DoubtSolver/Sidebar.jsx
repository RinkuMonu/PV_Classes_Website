"use client";

import React from "react";
import { MessageSquare, Plus, Trash2, Loader2 } from "lucide-react";

export default function Sidebar({
  chatHistory,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  isLoading,
}) {
  return (
    <div className="w-64 lg:w-72 bg-gray-50 h-full flex flex-col border-r border-gray-200 flex-shrink-0 transition-all duration-300">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium shadow-sm cursor-pointer"
        >
          <Plus size={18} />
          <span>New Doubt</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
          Previous Doubts
        </h3>

        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          </div>
        ) : chatHistory.length === 0 ? (
          <p className="text-sm text-gray-500 text-center px-4 py-8">
            No previous doubts yet. Start a new one!
          </p>
        ) : (
          chatHistory.map((session) => (
            <div
              key={session.session_id}
              onClick={() => onSelectSession(session.session_id)}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                currentSessionId === session.session_id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-gray-100 text-gray-700 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <MessageSquare
                  size={16}
                  className={`flex-shrink-0 ${
                    currentSessionId === session.session_id
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-sm truncate font-medium">
                  {session.title || "New Doubt"}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.session_id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-destructive hover:bg-red-50 rounded-md transition-all duration-200 cursor-pointer"
                title="Delete chat"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
