import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
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
    <Card>
      <CardHeader title="Recent Activities" />
      <CardContent>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemIcon>{activity.icon}</ListItemIcon>
              <ListItemText
                primary={activity.text}
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}