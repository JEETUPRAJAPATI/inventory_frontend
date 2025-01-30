import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import orderService from '/src/services/productionManagerService.js';
import UpdateDetailsDialog from './UpdateDetailsDialog';
import FullDetailsDialog from './FullDetailsDialog';

export default function DCutProductionPage() {

  function ProductionTable({ type }) {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [fullDetailsDialogOpen, setFullDetailsDialogOpen] = useState(false); // Separate state for full details dialog

    useEffect(() => {
      fetchRecords();
    }, []);

    // Fetch records inside useEffect
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await orderService.getDcutOrders();
        if (response.data && Array.isArray(response.data)) {
          setRecords(response.data);
        } else {
          console.error('Invalid response format:', response.data);
          setRecords([]);
        }
      } catch (error) {
        console.error('Error fetching records:', error);
        setRecords([]); // Ensure empty array is set on error
      } finally {
        setLoading(false);
      }
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
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
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

  return <ProductionTable type="DCut" />;
}
