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

export default function ReportTable({ records }) {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <Card>
      <div className="p-4">
        <Typography variant="h6">Production Records</Typography>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Bag Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Completion Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.order_id}</TableCell>
                <TableCell>{record.job_name}</TableCell>
                <TableCell>{record.bag_type}</TableCell>
                <TableCell>{record.quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={record.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(record.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{record.completion_date || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}