"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import axios from "axios";
import { toast } from "react-toastify";

const aiAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

export default function DoubtSolverLayout({ isModal = false }) {
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [language, setLanguage] = useState('hi'); // 'hi' = Hindi, 'en' = English
  
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // Fetch chat history
  const fetchHistory = async () => {
    try {
      setIsHistoryLoading(true);
      const res = await aiAxios.get("/ai-tutor/chat/history");
      if (res.data?.sessions) {
        setChatHistory(res.data.sessions);
      } else if (Array.isArray(res.data)) {
        setChatHistory(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Fetch messages when session changes
  useEffect(() => {
    if (currentSessionId) {
      const loadSessionMessages = async () => {
        try {
          setIsMessagesLoading(true);
          const res = await aiAxios.get(`/ai-tutor/chat/${currentSessionId}`);
          if (res.data?.messages) {
            setMessages(res.data.messages);
          }
        } catch (error) {
          console.error("Failed to load messages", error);
          toast.error("Failed to load chat messages.");
        } finally {
          setIsMessagesLoading(false);
        }
      };
      loadSessionMessages();
    } else {
      setMessages([]);
    }
  }, [currentSessionId]);

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
  };

  const handleSelectSession = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await aiAxios.delete(`/ai-tutor/chat/${sessionId}`);
      toast.success("Chat deleted successfully");
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setMessages([]);
      }
      fetchHistory();
    } catch (error) {
      toast.error("Failed to delete chat");
      console.error("Delete error:", error);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Optimistically add user message
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    try {
      const payload = {
        question: text,
        language: language,
      };
      if (currentSessionId) {
        payload.session_id = currentSessionId;
      }

      // Using /ai-tutor/chat as per the doubt_solver router
      const res = await aiAxios.post("/ai-tutor/chat", payload);
      
      const newSessionId = res.data.session_id;
      
      if (res.data.messages) {
        setMessages(res.data.messages);
      }
      
      if (newSessionId && newSessionId !== currentSessionId) {
        setCurrentSessionId(newSessionId);
        fetchHistory();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className={`flex ${isModal ? 'h-full w-full' : 'h-[calc(100vh-80px)] max-w-7xl mx-auto my-4 rounded-xl border border-gray-200'} bg-gray-50 overflow-hidden shadow-sm`}>
      <Sidebar
        chatHistory={chatHistory}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        isLoading={isHistoryLoading}
      />
      
      <div className="flex-1 flex flex-col h-full bg-white relative shadow-sm rounded-r-xl lg:rounded-none border-l border-gray-200 overflow-hidden">
        <ChatWindow 
          messages={messages} 
          isLoading={isMessagesLoading}
          isStreaming={isStreaming}
        />
        <div className="p-4 bg-white border-t border-gray-100">
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={isMessagesLoading || isStreaming}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>
      </div>
    </div>
  );
}
