import { useState } from 'react';
import { Grid } from '@mui/material';
import ReportFilters from '../../components/inventory/reports/ReportFilters';
import ReportSummary from '../../components/inventory/reports/ReportSummary';
import ReportChart from '../../components/inventory/reports/ReportChart';

// Mock data for demonstration
const mockSummaryData = {
  totalValue: 1245650,
  valueChange: '+8%',
  totalItems: 1234,
  itemsChange: '+5%',
  lowStockItems: 23,
  lowStockChange: '-15%',
  purchaseOrders: 45,
  ordersChange: '+12%'
};

const mockChartData = [
  { date: '2024-01', value: 1000000, quantity: 1000 },
  { date: '2024-02', value: 1200000, quantity: 1200 },
  { date: '2024-03', value: 1150000, quantity: 1100 },
  { date: '2024-04', value: 1300000, quantity: 1300 },
  { date: '2024-05', value: 1250000, quantity: 1250 },
];

export default function InventoryReports() {
  const [filters, setFilters] = useState({
    reportType: 'stock',
    dateRange: 'monthly',
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ReportFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </Grid>

      <Grid item xs={12}>
        <ReportSummary data={mockSummaryData} />
      </Grid>

      <Grid item xs={12}>
        <ReportChart 
          data={mockChartData}
          type={filters.reportType}
        />
      </Grid>
    </Grid>
  );
}