import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

export default function SummaryCard({ title, value, increase, color }) {
  const isPositive = increase.startsWith('+');

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          {isPositive ? (
            <TrendingUp color="success" />
          ) : (
            <TrendingDown color="error" />
          )}
          <Typography
            variant="body2"
            color={isPositive ? 'success.main' : 'error.main'}
            sx={{ ml: 1 }}
          >
            {increase} from last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}