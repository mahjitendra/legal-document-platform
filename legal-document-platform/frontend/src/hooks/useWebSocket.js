import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url, options = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const websocketRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    websocketRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      if (options.onOpen) options.onOpen();
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setLastMessage(message);
      if (options.onMessage) options.onMessage(message);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (options.onError) options.onError(error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      if (options.onClose) options.onClose();
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [url]);

  const sendMessage = (message) => {
    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      websocketRef.current.send(JSON.stringify(message));
    }
  };

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
};
