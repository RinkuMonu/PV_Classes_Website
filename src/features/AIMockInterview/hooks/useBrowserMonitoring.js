import { useEffect } from 'react';
import { browserEventService } from '../services/browserEventService';

export const useBrowserMonitoring = (sessionId, isEnabled = true) => {
  useEffect(() => {
    if (!isEnabled || typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        browserEventService.logEvent(sessionId, 'TAB_HIDDEN');
      } else {
        browserEventService.logEvent(sessionId, 'TAB_VISIBLE');
      }
    };

    const handleBlur = () => {
      browserEventService.logEvent(sessionId, 'WINDOW_BLUR');
    };

    const handleFocus = () => {
      browserEventService.logEvent(sessionId, 'WINDOW_FOCUS');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [sessionId, isEnabled]);
};
