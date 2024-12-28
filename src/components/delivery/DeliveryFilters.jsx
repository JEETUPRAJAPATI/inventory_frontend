import { Box, TextField, MenuItem } from '@mui/material';

export default function DeliveryFilters({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <TextField
        select
        size="small"
        name="status"
        label="Status"
        value={filters.status}
        onChange={handleChange}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="all">All Status</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="in_transit">In Transit</MenuItem>
        <MenuItem value="delivered">Delivered</MenuItem>
      </TextField>

      <TextField
        select
        size="small"
        name="dateRange"
        label="Date Range"
        value={filters.dateRange}
        onChange={handleChange}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="all">All Time</MenuItem>
        <MenuItem value="today">Today</MenuItem>
        <MenuItem value="week">This Week</MenuItem>
        <MenuItem value="month">This Month</MenuItem>
      </TextField>
    </Box>
  );
}