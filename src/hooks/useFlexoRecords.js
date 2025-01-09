import { useState, useEffect, useCallback } from 'react';
import flexoService from '../services/flexoService';

export function useFlexoRecords() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await flexoService.getRecords();
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const createRecord = async (data) => {
    try {
      const newRecord = await flexoService.createRecord(data);
      await fetchRecords();
      return newRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRecord = async (id, data) => {
    try {
      const updatedRecord = await flexoService.updateRecord(id, data);
      await fetchRecords();
      return updatedRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRecord = async (id) => {
    try {
      await flexoService.deleteRecord(id);
      await fetchRecords();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    records,
    isLoading,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
  };
}