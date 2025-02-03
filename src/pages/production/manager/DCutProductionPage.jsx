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
    const [fullDetailsDialogOpen, setFullDetailsDialogOpen] = useState(false);
    const [orderIdForDialog, setOrderIdForDialog] = useState(null); // To store the selected orderId

    // Fetch records on mount
    useEffect(() => {
      fetchRecords();
    }, []);

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
        setRecords([]);
      } finally {
        setLoading(false);
      }
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

    const handleUpdate = (orderId) => {
      // Set the orderId immediately for dialog
      setOrderIdForDialog(orderId);

      // Fetch the production record before opening the dialog
      orderService.getProductionRecord(orderId)
        .then((record) => {
          setSelectedRecord(record); // Set the record from API response
          setDialogOpen(true); // Open the update dialog
        })
        .catch((error) => {
          console.error('Error fetching production record:', error);
        });
    };

    const handleSave = async (updatedRecord) => {
      try {
        const response = await orderService.updateDcutOrder(updatedRecord); // Assuming you have an update method
        if (response.data) {
          setRecords((prevRecords) =>
            prevRecords.map((record) =>
              record.orderId === updatedRecord.orderId ? updatedRecord : record
            )
          );
          setDialogOpen(false); // Close the dialog after saving
        }
      } catch (error) {
        console.error('Error saving updated record:', error);
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

        {/* Update Dialog */}
        <UpdateDetailsDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          record={selectedRecord}  // Pass the entire record object
          type={type}
          orderId={orderIdForDialog}
          onSave={handleSave}  // Pass the handleSave function to the dialog
        />

        {/* Full Details Dialog */}
        <FullDetailsDialog
          open={fullDetailsDialogOpen}
          onClose={() => setFullDetailsDialogOpen(false)}
          record={selectedRecord}
        />
      </Box>
    );
  }

  return <ProductionTable type="DCut" />;
}
