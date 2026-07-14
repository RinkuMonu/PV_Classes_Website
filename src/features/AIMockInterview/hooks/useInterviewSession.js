import { useState, useEffect } from 'react';

// Phase 1 MVP: Browser sessionStorage for Temporary Persistence
const getSessionData = (sessionId) => {
  if (typeof window === 'undefined') return null;
  const data = sessionStorage.getItem(sessionId);
  return data ? JSON.parse(data) : null;
};

const saveSessionData = (sessionId, data) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(sessionId, JSON.stringify(data));
};

export const useInterviewSession = (sessionId) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      const data = getSessionData(sessionId);
      setSession(data);
    }
    setLoading(false);
  }, [sessionId]);

  const updateSession = (updates) => {
    setSession(prev => {
      const updated = { ...prev, ...updates };
      saveSessionData(sessionId, updated);
      return updated;
    });
  };

  return { session, loading, updateSession };
};
