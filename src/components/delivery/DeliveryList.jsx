import { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DeliveryStatusTabs from './DeliveryStatusTabs';
import DeliveryTable from './DeliveryTable';
import toast from 'react-hot-toast';

// Mock data - replace with actual API call
const mockDeliveries = [
  {
    id: 'DEL001',
    orderId: 'ORD-001',
    customerName: 'John Doe',
    address: '123 Main St, City',
    deliveryDate: '2024-02-25',
    status: 'pending',
    contact: '+1234567890'
  },
  {
    id: 'DEL002',
    orderId: 'ORD-002',
    customerName: 'Jane Smith',
    address: '456 Oak Ave, Town',
    deliveryDate: '2024-02-26',
    status: 'in_transit',
    contact: '+0987654321'
  },
  {
    id: 'DEL003',
    orderId: 'ORD-003',
    customerName: 'Mike Johnson',
    address: '789 Pine St, Village',
    deliveryDate: '2024-02-24',
    status: 'delivered',
    contact: '+1122334455'
  }
];

export default function DeliveryList() {
  const [activeStatus, setActiveStatus] = useState('pending');

  const filteredDeliveries = useMemo(() => {
    if (activeStatus === 'pending') {
      return mockDeliveries.filter(d => ['pending', 'in_transit'].includes(d.status));
    }
    return mockDeliveries.filter(d => d.status === 'delivered');
  }, [activeStatus]);

  const handleStatusUpdate = (deliveryId, newStatus) => {
    // Replace with actual API call
    toast.success(`Delivery ${deliveryId} status updated to ${newStatus}`);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Delivery Management
      </Typography>
      
      <DeliveryStatusTabs
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />
      
      <DeliveryTable
        deliveries={filteredDeliveries}
        onStatusUpdate={handleStatusUpdate}
        viewOnly={true} // Delivery users can only view and update status
      />
    </Box>
  );
}