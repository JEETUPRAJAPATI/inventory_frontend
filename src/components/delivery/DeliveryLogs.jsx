import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from '@mui/material';

const mockLogs = [
  { 
    id: 1, 
    orderNumber: 'ORD-001',
    action: 'Delivery Started',
    status: 'Success',
    timestamp: '2024-02-10 09:30 AM',
    user: 'John Driver'
  },
  { 
    id: 2, 
    orderNumber: 'ORD-002',
    action: 'Package Picked Up',
    status: 'Success',
    timestamp: '2024-02-10 10:15 AM',
    user: 'Mike Handler'
  },
];

export default function DeliveryLogs() {
  return (
    <Card>
      <div className="p-4">
        <Typography variant="h6">Delivery Logs</Typography>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.orderNumber}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>
                  <Chip 
                    label={log.status} 
                    color={log.status === 'Success' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}