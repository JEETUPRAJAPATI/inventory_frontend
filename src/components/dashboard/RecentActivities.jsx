import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import {
  ShoppingCart,
  LocalShipping,
  Person,
  Assignment,
} from '@mui/icons-material';

const activities = [
  {
    id: 1,
    type: 'order',
    text: 'New order #1234 received',
    time: '5 minutes ago',
    icon: <ShoppingCart color="primary" />,
  },
  {
    id: 2,
    type: 'delivery',
    text: 'Order #1233 has been delivered',
    time: '2 hours ago',
    icon: <LocalShipping color="success" />,
  },
  {
    id: 3,
    type: 'user',
    text: 'New user registration',
    time: '3 hours ago',
    icon: <Person color="info" />,
  },
  {
    id: 4,
    type: 'task',
    text: 'Production task completed',
    time: '5 hours ago',
    icon: <Assignment color="warning" />,
  },
];

export default function RecentActivities() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        title="Recent Activities"
        sx={{ 
          '& .MuiCardHeader-title': {
            fontSize: '1.25rem',
            fontWeight: 600
          }
        }}
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        <List>
          {activities.map((activity, index) => (
            <Box key={activity.id}>
              <ListItem sx={{ px: 3, py: 2 }}>
                <ListItemIcon>
                  <Box
                    sx={{
                      backgroundColor: (theme) => theme.palette.grey[100],
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {activity.icon}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={activity.text}
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}