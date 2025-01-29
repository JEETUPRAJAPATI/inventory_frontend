import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import UpdateDetailsDialog from '../../../pages/production/manager/UpdateDetailsDialog';
import orderService from '/src/services/productionManagerService.js'; // Replace with the correct endpoint URL

export default function ProductionTable({ type }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  // Fetch records inside useEffect
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrders();
      console.log(response.data);
      setRecords(response.data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (record) => {
    setSelectedRecord(record);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {type} Production Records
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Bag Size</TableCell>
                <TableCell>GSM</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Print Colour</TableCell>
                <TableCell>Fabric Colour</TableCell>
                <TableCell>Fabric Quality</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.orderId}</TableCell>
                  <TableCell>{record.jobName || 'N/A'}</TableCell>
                  <TableCell>{record.bagDetails.size || 'N/A'}</TableCell>
                  <TableCell>{record.bagDetails.gsm || 'N/A'}</TableCell>
                  <TableCell>{record.quantity}</TableCell>
                  <TableCell>{record.bagDetails.printColor || 'N/A'}</TableCell>
                  <TableCell>{record.bagDetails.color || 'N/A'}</TableCell>
                  <TableCell>{record.fabricQuality || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleUpdate(record)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <UpdateDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        record={selectedRecord}
        type={type}
      />
    </Box>
  );
}
