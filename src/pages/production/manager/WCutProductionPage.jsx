import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Engineering, Edit, Visibility } from '@mui/icons-material'; // Add Visibility icon for viewing

import UpdateDetailsDialog from './UpdateDetailsDialog';
import FullDetailsDialog from './FullDetailsDialog';  // New Dialog Component
import orderService from '/src/services/productionManagerService.js';

export default function WCutProductionPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Engineering fontSize="large" color="primary" />
        <Typography variant="h4">W-Cut Production Dashboard</Typography>
      </Box>

      {/* Rendering Production Table for W-Cut Orders */}
      <ProductionTable type="W-Cut" />
    </Box>
  );
}

function ProductionTable({ type }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false); // Separate state for update dialog
  const [fullDetailsDialogOpen, setFullDetailsDialogOpen] = useState(false); // Separate state for full details dialog

  useEffect(() => {
    fetchRecords();
  }, []);

  // Fetch records inside useEffect
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await orderService.getWcutOrders();
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
    setUpdateDialogOpen(true);
  };

  const handleViewFullDetails = async (orderId) => {
    try {
      const fullDetails = await orderService.getFullOrderDetails(orderId);
      setSelectedRecord(fullDetails.data); // Set the full details data to selectedRecord
      setFullDetailsDialogOpen(true); // Open the full details dialog
    } catch (error) {
      console.error('Error fetching full details:', error);
    }
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
                  <TableCell>{record.bagDetails?.size || 'N/A'}</TableCell>
                  <TableCell>{record.bagDetails?.gsm || 'N/A'}</TableCell>
                  <TableCell>{record.quantity}</TableCell>
                  <TableCell>{record.bagDetails?.printColor || 'N/A'}</TableCell>
                  <TableCell>{record.bagDetails?.color || 'N/A'}</TableCell>
                  <TableCell>{record.fabricQuality || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" size="small" onClick={() => handleUpdate(record)}>
                      <Edit />
                    </IconButton>
                    {/* View Full List button */}
                    <IconButton color="secondary" size="small" onClick={() => handleViewFullDetails(record.orderId)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <UpdateDetailsDialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        record={selectedRecord}
        type={type}
        orderId={selectedRecord?.orderId}
      />

      <FullDetailsDialog
        open={fullDetailsDialogOpen} // Use separate state for full details dialog
        onClose={() => setFullDetailsDialogOpen(false)} // Close full details dialog when clicked
        record={selectedRecord}
      />

    </Box>
  );
}
