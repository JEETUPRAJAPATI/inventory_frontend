import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Divider,
    Chip,
    Box,
} from '@mui/material';

export default function FinishedProductModel({ open, production, onClose }) {

    if (!production || !production.data) {
        return null;
    }

    const productionData = production.data; // Extract correct data object

    const getStatusColor = (status) => {
        const colors = {
            Pending: 'warning',
            'In Transit': 'info',
            Delivered: 'success',
            Cancelled: 'error',
        };
        return colors[status] || 'default';
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ pb: 1 }}>Delivery Details</DialogTitle>
            <DialogContent>
                <Box>
                    {/* Order Info */}
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Order Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Order ID
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.order_id || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Order Price
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.orderPrice || 'N/A'}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Production Manager Info */}
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mt: 4 }}>
                        Production Manager Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Production Status
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.productionManagerDetails?.status || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Progress
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.productionManagerDetails?.production_details?.progress || 'N/A'}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Bag Details */}
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mt: 4 }}>
                        Bag Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Bag Type
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.bagDetails?.type || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Handle Color
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.bagDetails?.handleColor || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Size
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.bagDetails?.size || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Color
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.bagDetails?.color || 'N/A'}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Customer Info */}
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mt: 4 }}>
                        Customer Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Customer Name
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.customerName || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Customer Email
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.email || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Customer Mobile
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.mobileNumber || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Address
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.orderDetails?.address || 'N/A'}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Delivery Info */}
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mt: 4 }}>
                        Delivery Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Delivery Status
                            </Typography>
                            <Chip
                                label={productionData.deliveryDetails?.status || 'Unknown'}
                                color={getStatusColor(productionData.deliveryDetails?.status)}
                                size="medium"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Delivery Date
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.deliveryDetails?.deliveryDate
                                    ? new Date(productionData.deliveryDetails.deliveryDate).toLocaleDateString()
                                    : 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Driver Name
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.deliveryDetails?.driverName || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Driver Contact
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.deliveryDetails?.driverContact || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Vehicle No
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {productionData.deliveryDetails?.vehicleNo || 'N/A'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
