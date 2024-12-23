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
import { groupRecordsByDate } from '../../../../utils/reportUtils';

export default function ReportCharts({ records }) {
  const chartData = groupRecordsByDate(records);

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
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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