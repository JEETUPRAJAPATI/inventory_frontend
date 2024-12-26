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
} from '@mui/material';
import FilterBar from '../../common/FilterBar';
import { deliveryRecords } from '../../../data/dummyData';

export default function DeliveryList() {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all'
  });

  const filterOptions = {
    status: ['Pending', 'In Transit', 'Delivered']
  };

  const filteredRecords = deliveryRecords.filter(record => {
    const matchesSearch = record.orderId.toLowerCase().includes(filters.search.toLowerCase()) ||
                         record.customerName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || record.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
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
                <TableCell>Delivery ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Job Name</TableCell>

                <TableCell>Dispatch Date</TableCell>
                <TableCell>Expected Delivery</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Courier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.orderId}</TableCell>
                  <TableCell>{record.customerName}</TableCell>
                  <TableCell>{record.jobName}</TableCell>
                  <TableCell>{record.dispatchDate}</TableCell>
                  <TableCell>{record.expectedDelivery}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      color={
                        record.status === 'Delivered' ? 'success' :
                        record.status === 'In Transit' ? 'warning' :
                        'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{record.courier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}