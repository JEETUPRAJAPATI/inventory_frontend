import { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { QrCode } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import FilterBar from '../../common/FilterBar';
import { salesOrders } from '../../../data/dummyData';

export default function SalesOrderList() {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all'
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filterOptions = {
    status: ['Pending', 'In Progress', 'Completed'],
    types: ['W-Cut', 'D-Cut']
  };

  const filteredOrders = salesOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         order.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    const matchesType = filters.type === 'all' || order.bagType === filters.type;

    return matchesSearch && matchesStatus && matchesType;
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
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Job Name</TableCell>

                <TableCell>Bag Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.jobName}</TableCell>
                  <TableCell>{order.bagType}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={order.status === 'Completed' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <QrCode />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Order QR Code - {selectedOrder?.id}</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          {selectedOrder && (
            <QRCodeSVG
              value={JSON.stringify(selectedOrder)}
              size={256}
              level="H"
              includeMargin
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}