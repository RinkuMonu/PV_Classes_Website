import { useState, useEffect, useRef, useCallback } from 'react';

export const useInterviewTimer = (initialTime, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const start = useCallback((timeOverride) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(timeOverride ?? initialTime);
    setIsActive(true);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsActive(false);
          if (onTimeout) onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [initialTime, onTimeout]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsActive(false);
  }, []);

  const reset = useCallback((newTime) => {
    stop();
    setTimeLeft(newTime ?? initialTime);
  }, [initialTime, stop]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { timeLeft, isActive, start, stop, reset };
};
