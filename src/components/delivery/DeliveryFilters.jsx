import { Box, TextField, MenuItem, Button } from '@mui/material';

export default function DeliveryFilters({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(prev => ({
      ...prev,
      [name]: value,
      page: 1, // Reset page when filters change
    }));
  };

  const handleReset = () => {
    // Reset to default filter values
    onFilterChange({
      search: '',
      status: 'all',
      timeRange: 'month', // Ensure 'timeRange' gets reset to default (e.g., 'all')
      page: 1,          // Optional: reset page to 1 when resetting filters
    });
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
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="in_transit">In Transit</MenuItem>
        <MenuItem value="delivered">Delivered</MenuItem>
        <MenuItem value="all">All</MenuItem> {/* Added 'All' option for resetting status */}
      </TextField>

      <TextField
        select
        size="small"
        name="timeRange"
        label="Time Range"
        value={filters.timeRange}
        onChange={handleChange}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="today">Today</MenuItem>
        <MenuItem value="week">This Week</MenuItem>
        <MenuItem value="month">This Month</MenuItem>
      </TextField>

      <Button
        variant="outlined"
        onClick={handleReset}
      >
        Reset
      </Button>
    </Box>
  );
}
