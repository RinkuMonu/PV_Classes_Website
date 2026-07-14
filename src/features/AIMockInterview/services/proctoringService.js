class ProctoringService {
  logEvent(sessionId, eventType, confidence = 1.0) {
    if (!sessionId) return;
    
    console.log(`[Proctoring] Session ${sessionId}: ${eventType} (confidence: ${confidence})`);
    
    try {
      const existing = JSON.parse(sessionStorage.getItem(`proctoring_events_${sessionId}`) || '[]');
      existing.push({ eventType, confidence, timestamp: new Date().toISOString() });
      sessionStorage.setItem(`proctoring_events_${sessionId}`, JSON.stringify(existing));
    } catch (e) {
      // ignore
    }
  }
}

export const proctoringService = new ProctoringService();
