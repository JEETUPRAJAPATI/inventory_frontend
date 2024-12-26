import { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
} from '@mui/material';
import FilterBar from '../../common/FilterBar';
import { productionRecords } from '../../../data/dummyData';

export default function ProductionList({ type, category }) {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all'
  });

  const filterOptions = {
    status: ['Pending', 'In Progress', 'Completed']
  };

  const records = type === 'wCut'
    ? productionRecords.wCut[category]
    : productionRecords.dCut[category];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.orderId.toLowerCase().includes(filters.search.toLowerCase()) ||
                         record.operator.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || record.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {type === 'wCut' ? 'W-Cut' : 'D-Cut'} - {category === 'flexo' ? 'Flexo Printing' :
          category === 'opsert' ? 'Opsert Printing' : 'Bag Making'}
      </Typography>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
      />

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Production ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Stage</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Completion Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.orderId}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.stage}</TableCell>
                  <TableCell>{record.operator}</TableCell>
                  <TableCell>{record.startDate}</TableCell>
                  <TableCell>{record.completionDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      color={
                        record.status === 'Completed' ? 'success' :
                        record.status === 'In Progress' ? 'warning' :
                        'default'
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}