import { useState, useEffect } from 'react';
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
    Box,
    Button,
} from '@mui/material';
import { Visibility, CheckCircle, Cancel } from '@mui/icons-material';

import toast from 'react-hot-toast';
import deliveryService from '../../services/deliveryService';

export default function DeliveryList() {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);


    const fetchDeliveries = async () => {
        try {
            setLoading(true);
            const response = await deliveryService.getDeliveries();
            setDeliveries(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeliveries();
    }, []);



    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'warning',
            'In Transit': 'info',
            'Delivered': 'success'
        };
        return colors[status] || 'default';
    };

    return (
        <>
            <Card>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Delivery Management</Typography>
                </Box>

                <TableContainer>
                    {loading ? (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography>Loading...</Typography>
                        </Box>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Contact</TableCell>
                                    <TableCell>Delivery Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {deliveries.map((delivery) => (
                                    <TableRow key={delivery._id}>
                                        <TableCell>{delivery.customer}</TableCell>
                                        <TableCell>{delivery.contact}</TableCell>
                                        <TableCell>
                                            {new Date(delivery.delivery_date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={delivery.status}
                                                color={getStatusColor(delivery.status)}
                                                size="small"
                                            />
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </Card>


        </>
    );
}