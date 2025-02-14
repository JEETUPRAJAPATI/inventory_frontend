import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    Card,
    Box,
    Typography,
} from '@mui/material';
import { Print, Update, LocalShipping } from '@mui/icons-material';
import toast from 'react-hot-toast';
import OrderService from '../../../../src/services/wcutBagMakingServices';

export default function WcutBagMakingOrderList({ orders, status, noOrdersFound, onStatusUpdated, type }) {
    const getStatusColor = (status) => ({
        pending: 'warning',
        in_progress: 'info',
        completed: 'success',
    }[status] || 'default');

    const updateOrderStatus = (orderId, newStatus, remarks) => {
        OrderService.updateOrderStatus(orderId, newStatus, remarks)
            .then(() => {
                toast.success(`Order marked as ${newStatus.replace('_', ' ')}`);
                onStatusUpdated();
            })
            .catch(() => {
                toast.error('Failed to update order status');
            });
    };
    const handleMoveToDelivery = (orderId) => {
        OrderService.moveToDelivery(orderId)
            .then(() => {
                toast.success('Order moved to delivery');
                onStatusUpdated();
            })
            .catch((error) => {
                toast.error('Failed to move to delivery');
            });
    };

    return (
        <Box>
            {/* Desktop View */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <TableContainer component={Card}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Job Name</TableCell>
                                <TableCell>Bag Type</TableCell>
                                <TableCell>Bag Colour</TableCell>
                                <TableCell>Print Colour</TableCell>
                                <TableCell>Bag Size</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {noOrdersFound ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <Typography variant="body1" color="text.secondary">
                                            No Orders Found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.jobName}</TableCell>
                                        <TableCell>{order.bagDetails.type}</TableCell>
                                        <TableCell>{order.bagDetails.color}</TableCell>
                                        <TableCell>{order.bagDetails.printColor}</TableCell>
                                        <TableCell>{order.bagDetails.size}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={order.opsertDetails[0].status.replace('_', ' ').toUpperCase()}
                                                color={getStatusColor(order.opsertDetails[0].status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {order.opsertDetails[0].status === 'pending' && (
                                                <Button
                                                    startIcon={<Print />}
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => updateOrderStatus(order.orderId, 'in_progress', 'Printing started')}
                                                >
                                                    Start Printing
                                                </Button>
                                            )}
                                            {order.opsertDetails[0].status === 'in_progress' && (
                                                <Button
                                                    startIcon={<Update />}
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => updateOrderStatus(order.orderId, 'completed', 'Order completed')}
                                                >
                                                    Complete Order
                                                </Button>
                                            )}
                                            {order.opsertDetails[0].status === 'completed' && (
                                                <Button
                                                    startIcon={<LocalShipping />}
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleMoveToDelivery(order.orderId)}
                                                >
                                                    Move to Delivery
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
