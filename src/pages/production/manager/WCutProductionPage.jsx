import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Engineering, Edit, Visibility } from '@mui/icons-material';

import UpdateDetailsDialog from './UpdateDetailsDialog';
import FullDetailsDialog from './FullDetailsDialog';
import orderService from '/src/services/productionManagerService.js';

export default function WCutProductionPage() {
  function ProductionTable({ type }) {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [fullDetailsDialogOpen, setFullDetailsDialogOpen] = useState(false);

    useEffect(() => {
      fetchRecords();
    }, []);

    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await orderService.getWcutOrders();
        setRecords(response.data || []);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleUpdate = (orderId) => {
      // Fetch the production record before opening the dialog
      orderService.getProductionRecord(orderId)
        .then((record) => {
          setSelectedRecord(record); // Set the record from API response
          setUpdateDialogOpen(true); // Open the update dialog
        })
        .catch((error) => {
          console.error('Error fetching production record:', error);
        });
    };

    const handleViewFullDetails = async (orderId) => {
      try {
        const fullDetails = await orderService.getFullOrderDetails(orderId);
        setSelectedRecord(fullDetails.data);
        setFullDetailsDialogOpen(true);
      } catch (error) {
        console.error('Error fetching full details:', error);
      }
    };

    return (
      <Box>
        <Typography variant="h6" gutterBottom>{type} Production Records</Typography>
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
                      <IconButton color="primary" size="small" onClick={() => handleUpdate(record.orderId)}>
                        <Edit />
                      </IconButton>
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
          open={fullDetailsDialogOpen}
          onClose={() => setFullDetailsDialogOpen(false)}
          record={selectedRecord}
        />
      </Box>
    );
  }

  return <ProductionTable type="WCut" />;
}
