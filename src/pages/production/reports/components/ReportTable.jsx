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
import { getStatusColor } from '../../../../utils/statusColors';

export default function ReportTable({ records }) {
  return (
    <Card>
      <div className="p-4">
        <Typography variant="h6">Production Records</Typography>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Name</TableCell>
              <TableCell>Print Color</TableCell>
              <TableCell>Bag Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.job_name}</TableCell>
                <TableCell>{record.print_color}</TableCell>
                <TableCell>{record.bag_type}</TableCell>
                <TableCell>{record.quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={record.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(record.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{record.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}