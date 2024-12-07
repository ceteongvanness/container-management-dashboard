// frontend/src/hooks/useWebSocket.ts
import { useState, useEffect } from 'react';

export function useWebSocket<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to parse WebSocket data'));
      }
    };

    ws.onerror = (event) => {
      setError(new Error('WebSocket error'));
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { data, error };
}