import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

export default function SummaryCard({ title, value, increase = '0%', color }) {
  const isPositive = increase?.startsWith('+');

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: (theme) => `${theme.palette[color].main}15`,
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
        }}
      />
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        {increase && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isPositive ? (
              <TrendingUp color="success" sx={{ mr: 0.5 }} />
            ) : (
              <TrendingDown color="error" sx={{ mr: 0.5 }} />
            )}
            <Typography
              variant="body2"
              color={isPositive ? 'success.main' : 'error.main'}
            >
              {increase} from last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}