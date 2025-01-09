import { useState, useEffect, useCallback } from 'react';
import metricsService from '../services/metricsService';

export function useMetrics(machineType) {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await metricsService.getMetrics(machineType);
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMetrics(null);
    } finally {
      setIsLoading(false);
    }
  }, [machineType]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const updateMetrics = async (data) => {
    try {
      const updatedMetrics = await metricsService.updateMetrics(machineType, data);
      setMetrics(updatedMetrics);
      return updatedMetrics;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    metrics,
    isLoading,
    error,
    updateMetrics,
    refreshMetrics: fetchMetrics
  };
}