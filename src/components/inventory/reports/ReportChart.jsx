import { Card, CardContent, CardHeader, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function ReportChart({ data, type }) {
  const getChartTitle = () => {
    switch (type) {
      case 'stock':
        return 'Stock Level Trends';
      case 'purchase':
        return 'Purchase Orders Trends';
      case 'movement':
        return 'Stock Movement Trends';
      case 'value':
        return 'Inventory Value Trends';
      default:
        return 'Inventory Trends';
    }
  };

  return (
    <Card>
      <CardHeader 
        title={getChartTitle()}
        sx={{ 
          '& .MuiCardHeader-title': {
            fontSize: '1.25rem',
            fontWeight: 600
          }
        }}
      />
      <CardContent>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                name="Value"
              />
              <Line
                type="monotone"
                dataKey="quantity"
                stroke="#82ca9d"
                name="Quantity"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}