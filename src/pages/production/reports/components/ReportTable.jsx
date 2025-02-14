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
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record.orderId || Math.random()}>
                  <TableCell>{record.orderId || 'N/A'}</TableCell>
                  <TableCell>{record.jobName || 'N/A'}</TableCell>
                  <TableCell>{record.bagType || 'N/A'}</TableCell>
                  <TableCell>{record.quantity !== undefined ? record.quantity : 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status ? record.status.replace('_', ' ').toUpperCase() : 'UNKNOWN'}
                      color={getStatusColor(record.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{record.createdAt ? new Date(record.createdAt).toLocaleDateString() : '-'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
