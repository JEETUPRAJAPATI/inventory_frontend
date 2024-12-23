import { Card, CardContent, CardHeader, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 198 },
  { name: 'Mar', revenue: 2000, orders: 167 },
  { name: 'Apr', revenue: 2780, orders: 189 },
  { name: 'May', revenue: 1890, orders: 145 },
  { name: 'Jun', revenue: 2390, orders: 178 },
];

export default function ChartCard() {
  return (
    <Card>
      <CardHeader 
        title="Revenue & Orders Overview" 
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
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Revenue (₹)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#82ca9d"
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}