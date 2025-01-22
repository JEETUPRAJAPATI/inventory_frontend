import { useState, useEffect, useCallback } from 'react';
import { adminProductionService } from '../services/adminProductionService';

export const useAdminProduction = (type, category) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all'
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let response;
      const params = {
        search: filters.search || undefined,
        status: filters.status === 'all' ? undefined : filters.status,
        page: pagination.page,
        limit: pagination.limit
      };

      switch (`${type}/${category}`) {
        case 'w-cut/flexo':
          response = await adminProductionService.getWCutFlexo(params);
          break;
        case 'w-cut/bag-making':
          response = await adminProductionService.getWCutBagMaking(params);
          break;
        case 'd-cut/opsert':
          response = await adminProductionService.getDCutOpsert(params);
          break;
        case 'd-cut/bag-making':
          response = await adminProductionService.getDCutBagMaking(params);
          break;
        default:
          throw new Error('Invalid production type/category');
      }

      const recordsWithIds = response.data.map((record, index) => ({
        ...record,
        id: record.id || `${record.orderId}-${index}`
      }));

      setData(recordsWithIds);
      setPagination(prev => ({
        ...prev,
        total: response.total
      }));
      setError(null);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [type, category, filters.search, filters.status, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const updatePagination = useCallback((newPage, newLimit) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
      limit: newLimit || prev.limit
    }));
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    updatePagination,
    refresh: fetchData
  };
};