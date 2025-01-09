import { Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const mockInventoryData = [
  {
    id: 1,
    category: 'Raw Materials',
    totalItems: 45,
    lowStock: 8,
    value: '₹65,000'
  },
  {
    id: 2,
    category: 'Finished Products',
    totalItems: 120,
    lowStock: 15,
    value: '₹1,25,000'
  },
  {
    id: 3,
    category: 'Packaging Materials',
    totalItems: 30,
    lowStock: 5,
    value: '₹15,000'
  }
];

export default function InventoryOverview() {
  return (
    <Card>
      <CardHeader title="Inventory Overview" />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Total Items</TableCell>
                <TableCell>Low Stock</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockInventoryData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.totalItems}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.lowStock}
                      color={row.lowStock > 10 ? 'error' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}