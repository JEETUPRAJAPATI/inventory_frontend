import { useState, useEffect } from 'react';
import {
  Card, CardHeader, CardContent, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Typography
} from '@mui/material';
import flexoService from '../../services/flexoService.js';
import OrderService from '../../services/adminService.js';
import DcutOpsert from '../../services/dcutOpsertService.js';

export default function ProductionOverview() {
  const [productionData, setProductionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductionData = async () => {
      try {
        const flexo = await flexoService.getRecords();
        const opsert = await OrderService.getDCutOpsert('');
        const dcut = await OrderService.getDCutBagMaking('');
        const wcut = await OrderService.getWCutBagMaking('');

        console.log('opsert', opsert.data);
        console.log('flexo', flexo.data);
        console.log('dcut', dcut.data);
        console.log('wcut', wcut.data);

        const updatedData = [
          {
            id: 1,
            type: 'Flexo',
            pendingOrders: flexo.data.filter(order => order.status === 'pending').length || 0,
            inProgress: flexo.data.filter(order => order.status === 'in_progress').length || 0,
            completed: flexo.data.filter(order => order.status === 'completed').length || 0,
            efficiency: flexo.data.efficiency || 'N/A',
          },
          {
            id: 2,
            type: 'Opsert',
            pendingOrders: opsert.data.filter(order => order.status === 'pending').length || 0,
            inProgress: opsert.data.filter(order => order.status === 'in_progress').length || 0,
            completed: opsert.data.filter(order => order.status === 'completed').length || 0,
            efficiency: opsert.efficiency || 'N/A',
          },
          {
            id: 3,
            type: 'D-Cut',
            pendingOrders: dcut.data.filter(order => order.status === 'pending').length || 0,
            inProgress: dcut.data.filter(order => order.status === 'in_progress').length || 0,
            completed: dcut.data.filter(order => order.status === 'completed').length || 0,
            efficiency: dcut.efficiency || 'N/A',
          },
          {
            id: 4,
            type: 'W-Cut',
            pendingOrders: wcut.data.filter(order => order.status === 'pending').length || 0,
            inProgress: wcut.data.filter(order => order.status === 'in_progress').length || 0,
            completed: wcut.data.filter(order => order.status === 'delivered').length || 0,
            efficiency: wcut.efficiency || 'N/A',
          },
        ];

        setProductionData(updatedData);
      } catch (err) {
        setError('Failed to fetch production data');
      }
    };

    fetchProductionData();
  }, []);

  return (
    <Card>
      <CardHeader title="Production Overview" />
      <CardContent>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
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
                {productionData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Chip label={row.pendingOrders} color="warning" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={row.inProgress} color="info" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={row.completed} color="success" size="small" />
                    </TableCell>
                    <TableCell>{row.efficiency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}
