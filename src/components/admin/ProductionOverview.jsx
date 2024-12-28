import { Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const mockProductionData = [
  {
    id: 1,
    type: 'Flexo',
    pendingOrders: 5,
    inProgress: 3,
    completed: 12,
    efficiency: '85%'
  },
  {
    id: 2,
    type: 'Opsert',
    pendingOrders: 3,
    inProgress: 2,
    completed: 8,
    efficiency: '78%'
  },
  {
    id: 3,
    type: 'D-Cut',
    pendingOrders: 4,
    inProgress: 2,
    completed: 10,
    efficiency: '82%'
  },
  {
    id: 4,
    type: 'W-Cut',
    pendingOrders: 6,
    inProgress: 4,
    completed: 15,
    efficiency: '88%'
  }
];

export default function ProductionOverview() {
  return (
    <Card>
      <CardHeader title="Production Overview" />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>In Progress</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Efficiency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockProductionData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.pendingOrders} 
                      color="warning" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={row.inProgress} 
                      color="info" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={row.completed} 
                      color="success" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{row.efficiency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}