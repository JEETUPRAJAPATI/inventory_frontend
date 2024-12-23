import { useState, useEffect, useCallback } from 'react';
import opsertService from '../services/opsertService';

export function useOpsertRecords() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await opsertService.getRecords();
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
      const newRecord = await opsertService.createRecord(data);
      await fetchRecords();
      return newRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRecord = async (id, data) => {
    try {
      const updatedRecord = await opsertService.updateRecord(id, data);
      await fetchRecords();
      return updatedRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRecord = async (id) => {
    try {
      await opsertService.deleteRecord(id);
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