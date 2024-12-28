import {
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

export default function ReportFilters({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Report Type</InputLabel>
            <Select
              name="reportType"
              value={filters.reportType}
              label="Report Type"
              onChange={handleChange}
            >
              <MenuItem value="stock">Stock Report</MenuItem>
              <MenuItem value="purchase">Purchase Orders Report</MenuItem>
              <MenuItem value="movement">Stock Movement Report</MenuItem>
              <MenuItem value="value">Inventory Value Report</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Date Range</InputLabel>
            <Select
              name="dateRange"
              value={filters.dateRange}
              label="Date Range"
              onChange={handleChange}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {filters.dateRange === 'custom' && (
          <>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                name="startDate"
                label="Start Date"
                value={filters.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                name="endDate"
                label="End Date"
                value={filters.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
}