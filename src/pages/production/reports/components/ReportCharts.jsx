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

export default function ReportCharts({ records }) {
  // Transform records into chart data
  const chartData = records.reduce((acc, record) => {
    const date = record.completion_date || new Date().toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, total: 0, completed: 0 };
    }
    acc[date].total++;
    if (record.status === 'completed') {
      acc[date].completed++;
    }
    return acc;
  }, {});

  const data = Object.values(chartData).sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return (
    <Card>
      <CardHeader 
        title="Production Trends" 
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
                dataKey="total"
                stroke="#8884d8"
                name="Total Production"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#82ca9d"
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}