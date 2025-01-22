import { useState, useEffect, useCallback } from 'react';
import adminService from '../services/adminService';
import toast from 'react-hot-toast';

export function useAdminData(endpoint, initialParams = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async () => {
    if (!endpoint || !adminService[endpoint]) {
      console.error(`Invalid endpoint: ${endpoint}`);
      return;
    }

    try {
      setLoading(true);
      const response = await adminService[endpoint](params);
      setData(response);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch data';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data: data || {},
    loading,
    error,
    updateParams,
    refetch
  };
}