import { Box, TextField, MenuItem, Button } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';

export default function FilterBar({ filters, onFilterChange, filterOptions }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField
        size="small"
        placeholder="Search..."
        name="search"
        value={filters.search}
        onChange={handleChange}
        InputProps={{
          startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
        }}
      />
      
      <TextField
        select
        size="small"
        name="status"
        value={filters.status}
        onChange={handleChange}
        sx={{ minWidth: 120 }}
        InputProps={{
          startAdornment: <FilterList sx={{ color: 'text.secondary', mr: 1 }} />,
        }}
      >
        <MenuItem value="all">All Status</MenuItem>
        {filterOptions.status.map(status => (
          <MenuItem key={status} value={status}>{status}</MenuItem>
        ))}
      </TextField>

      {filterOptions.types && (
        <TextField
          select
          size="small"
          name="type"
          value={filters.type}
          onChange={handleChange}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Types</MenuItem>
          {filterOptions.types.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>
      )}

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