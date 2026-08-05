import { useState, useEffect, useRef, useCallback } from 'react';
import { WebSocketEvent } from '../types/api';

interface UseWebSocketOptions {
  url: string;
  onOpen?: () => void;
  onMessage?: (event: WebSocketEvent) => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
}

export const useWebSocket = ({
  url,
  onOpen,
  onMessage,
  onClose,
  onError,
  reconnectAttempts = 5,
  reconnectInterval = 3000,
  heartbeatInterval = 30000,
}: UseWebSocketOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const [latency, setLatency] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pingTimestampRef = useRef<number>(0);

  // Store callbacks in refs so connect() doesn't depend on them
  const onOpenRef = useRef(onOpen);
  const onMessageRef = useRef(onMessage);
  const onCloseRef = useRef(onClose);
  const onErrorRef = useRef(onError);

  // Keep refs up to date
  useEffect(() => { onOpenRef.current = onOpen; }, [onOpen]);
  useEffect(() => { onMessageRef.current = onMessage; }, [onMessage]);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  }, []);

  const startHeartbeat = useCallback(() => {
    stopHeartbeat();
    heartbeatTimerRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        pingTimestampRef.current = Date.now();
        wsRef.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, heartbeatInterval);
  }, [heartbeatInterval, stopHeartbeat]);

  const connect = useCallback(() => {
    if (!url) return;

    // Don't open a second connection if one is already open/connecting
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      console.log('useWebSocket: Connecting to', url);
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('useWebSocket: Connected to', url);
        setIsConnected(true);
        reconnectCountRef.current = 0;
        onOpenRef.current?.();
        startHeartbeat();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'pong') {
            const currentLatency = Date.now() - pingTimestampRef.current;
            setLatency(currentLatency);
            return;
          }

          onMessageRef.current?.(data);
        } catch (err) {
          console.warn('Failed to parse WebSocket message', err);
        }
      };

      ws.onclose = (event) => {
        console.log('useWebSocket: Closed', event.code, event.reason);
        setIsConnected(false);
        wsRef.current = null;
        stopHeartbeat();
        onCloseRef.current?.();

        // Only reconnect if we didn't close intentionally
        if (reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current += 1;
          console.log(`useWebSocket: Reconnecting (${reconnectCountRef.current}/${reconnectAttempts})...`);
          reconnectTimerRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      ws.onerror = (error) => {
        console.error('useWebSocket: Error on', url);
        onErrorRef.current?.(error);
      };

    } catch (err) {
      console.error('useWebSocket: Setup error for', url, err);
    }
  }, [url, startHeartbeat, stopHeartbeat, reconnectAttempts, reconnectInterval]); // NO callback deps!

  const disconnect = useCallback(() => {
    reconnectCountRef.current = reconnectAttempts; // Prevent reconnect
    stopHeartbeat();
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, [reconnectAttempts, stopHeartbeat]);

  // Track if truly unmounting vs strict-mode remount
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    // Small delay to let strict-mode cleanup run first without killing a good connection
    const timer = setTimeout(() => {
      if (mountedRef.current && url) {
        connect();
      }
    }, 50);

    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
      // Don't aggressively close — only clean up reconnect timers
      stopHeartbeat();
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      // Let the connection survive strict-mode remount; it will be reused via the guard in connect()
    };
  }, [url]);


  const sendMessage = useCallback((type: string, payload: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket is not connected. Cannot send message:', type);
    }
  }, []);

  return {
    isConnected,
    latency,
    sendMessage,
    disconnect,
    connect
  };
};
