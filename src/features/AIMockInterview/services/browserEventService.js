class BrowserEventService {
  logEvent(sessionId, eventType) {
    if (!sessionId) return;
    
    // In MVP, log to console. Future: POST /api/v1/interviews/{sessionId}/browser-event
    console.log(`[Browser Monitoring] Session ${sessionId}: ${eventType} at ${new Date().toISOString()}`);
    
    // We could store it in sessionStorage for the final report.
    try {
      const existing = JSON.parse(sessionStorage.getItem(`browser_events_${sessionId}`) || '[]');
      existing.push({ eventType, timestamp: new Date().toISOString() });
      sessionStorage.setItem(`browser_events_${sessionId}`, JSON.stringify(existing));
    } catch (e) {
      // ignore
    }
  }
}

export const browserEventService = new BrowserEventService();
