import { useState, useEffect } from 'react';
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
import toast from 'react-hot-toast';
import deliveryService from '/src/services/deliveryService.js';

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all'
  });


  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await deliveryService.getDeliveries(filters);
      console.log('delivery', response.data);
      setDeliveries(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [filters]);

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
                <TableCell>Courier</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id || 'N/A'}</TableCell>
                  <TableCell>{record.orderId || 'N/A'}</TableCell>
                  <TableCell>{record.customer || 'N/A'}</TableCell>
                  <TableCell>{record.jobName || 'N/A'}</TableCell>
                  <TableCell>{record.dispatchDate ? new Date(record.dispatchDate).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>{record.expectedDelivery ? new Date(record.expectedDelivery).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>{record.courier || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status || 'N/A'}
                      color={
                        record.status === 'Delivered' ? 'success' :
                          record.status === 'In Transit' ? 'warning' :
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