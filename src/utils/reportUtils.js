import { 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  startOfYear, 
  endOfYear, 
  parseISO, 
  isWithinInterval 
} from 'date-fns';
import { formatDate } from './dateUtils';

export const filterRecords = (records, filters) => {
  return records.filter(record => {
    // Filter by status
    if (filters.status !== 'all' && record.status !== filters.status) {
      return false;
    }

    // Filter by date range
    const recordDate = parseISO(record.created_at);
    let startDate, endDate;

    switch (filters.dateRange) {
      case 'weekly':
        startDate = startOfWeek(new Date());
        endDate = endOfWeek(new Date());
        break;
      case 'monthly':
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      case 'yearly':
        startDate = startOfYear(new Date());
        endDate = endOfYear(new Date());
        break;
      case 'custom':
        if (filters.startDate && filters.endDate) {
          startDate = parseISO(filters.startDate);
          endDate = parseISO(filters.endDate);
        }
        break;
      default:
        return true;
    }

    if (startDate && endDate) {
      return isWithinInterval(recordDate, { start: startDate, end: endDate });
    }

    return true;
  });
};

export const groupRecordsByDate = (records) => {
  const grouped = records.reduce((acc, record) => {
    const date = formatDate(parseISO(record.created_at));
    if (!acc[date]) {
      acc[date] = { total: 0, completed: 0 };
    }
    acc[date].total++;
    if (record.status === 'completed') {
      acc[date].completed++;
    }
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([date, data]) => ({
      date,
      ...data
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};