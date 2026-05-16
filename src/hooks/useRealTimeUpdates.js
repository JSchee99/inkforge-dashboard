import { useEffect, useCallback, useState } from 'react';

export const useRealTimeUpdates = (refreshInterval = 30, onUpdate) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isPolling, setIsPolling] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Start polling
  const startPolling = useCallback(() => {
    setIsPolling(true);
  }, []);

  // Stop polling
  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  // Trigger update
  const triggerUpdate = useCallback(() => {
    setLastUpdate(new Date());
    if (onUpdate) {
      onUpdate();
    }
  }, [onUpdate]);

  // Set up polling interval
  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      try {
        // In production, would fetch actual data here
        // const response = await fetch('/api/pipeline/status');
        // const data = await response.json();
        
        triggerUpdate();
        setConnectionStatus('connected');
      } catch (error) {
        console.error('Real-time update error:', error);
        setConnectionStatus('disconnected');
      }
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isPolling, refreshInterval, triggerUpdate]);

  return {
    lastUpdate,
    isPolling,
    connectionStatus,
    startPolling,
    stopPolling,
    triggerUpdate,
  };
};

export default useRealTimeUpdates;
