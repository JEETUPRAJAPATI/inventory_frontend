import { Box, TextField, MenuItem, Button } from '@mui/material';

export default function DeliveryFilters({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset page when filters change
    }));
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
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Transit">In Transit</MenuItem>
        <MenuItem value="Delivered">Delivered</MenuItem>
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
        onClick={() => onFilterChange({
          search: '',
          status: 'all',
          type: 'all'
        })}
      >
        Reset
      </Button>
    </Box>
  );
}