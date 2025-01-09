import { useState, useEffect, useCallback } from 'react';
import reportService from '../services/reportService';

export function useReports() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await reportService.getReports();
      setReports(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const createReport = async (reportData) => {
    try {
      const newReport = await reportService.createReport(reportData);
      await fetchReports();
      return newReport;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateReport = async (reportId, reportData) => {
    try {
      const updatedReport = await reportService.updateReport(reportId, reportData);
      await fetchReports();
      return updatedReport;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteReport = async (reportId) => {
    try {
      await reportService.deleteReport(reportId);
      await fetchReports();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    reports,
    isLoading,
    error,
    createReport,
    updateReport,
    deleteReport,
  };
}